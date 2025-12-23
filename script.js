// グローバル変数
let products = [];
let cart = [];
let currentCategory = 'all';

// DOM要素の取得
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const categoryButtons = document.querySelectorAll('.category-btn');
const productsContainer = document.getElementById('productsContainer');
const cartIcon = document.getElementById('cartIcon');
const cartPanel = document.getElementById('cartPanel');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartBadge = document.getElementById('cartBadge');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const logo = document.getElementById('logo');
const logoLink = document.getElementById('logoLink');
const heroSection = document.getElementById('heroSection');
const mainContent = document.querySelector('.main-content');
const productModal = document.getElementById('productModal');
const productModalOverlay = document.getElementById('productModalOverlay');
const productModalClose = document.getElementById('productModalClose');
const productDetailImage = document.getElementById('productDetailImage');
const productDetailName = document.getElementById('productDetailName');
const productDetailDescription = document.getElementById('productDetailDescription');
const productDetailPrice = document.getElementById('productDetailPrice');
const productDetailStock = document.getElementById('productDetailStock');
const productDetailAddCart = document.getElementById('productDetailAddCart');
const productDetailDetailedDescription = document.getElementById('productDetailDetailedDescription');
const productDetailSizeSection = document.getElementById('productDetailSizeSection');
const productDetailSizes = document.getElementById('productDetailSizes');
const productImageThumbnails = document.getElementById('productImageThumbnails');
const productImagePrev = document.getElementById('productImagePrev');
const productImageNext = document.getElementById('productImageNext');
let currentDetailProduct = null;
let currentDetailImageIndex = 0;
let currentSelectedSize = null;

// ページロード時の初期化
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// アプリケーションの初期化
async function initializeApp() {
    // カートをローカルストレージから読み込み
    loadCart();
    
    // 商品データを取得
    await fetchProducts();
    
    // イベントリスナーの設定
    setupEventListeners();
    
    // アニメーション開始
    startAnimations();
    
    // 商品を表示
    displayProducts();
}

// 商品データを取得
async function fetchProducts() {
    try {
        // Cloudflare Pages用: products.jsonを直接読み込む
        const response = await fetch('/products.json');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        products = data.products || [];
        displayProducts(products);
    } catch (error) {
        console.error('Failed to fetch product data:', error);
        productsContainer.innerHTML = '<p class="loading">商品の読み込みに失敗しました</p>';
    }
}

// イベントリスナーの設定
function setupEventListeners() {
    // サイドバートグル
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // カテゴリボタン
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            selectCategory(category);
        });
    });
    
    // カートアイコン
    if (cartIcon) {
        cartIcon.addEventListener('click', openCart);
    }
    
    // カートを閉じる
    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }
    
    // 決済ボタン
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', goToCheckout);
    }
    
    // メインコンテンツをクリックしたらサイドバーを閉じる
    if (mainContent) {
        mainContent.addEventListener('click', (e) => {
            // サイドバーが開いていて、サイドバー自体をクリックしていない場合
            if (sidebar && sidebar.classList.contains('active')) {
                // サイドバー内の要素をクリックした場合は閉じない
                if (!sidebar.contains(e.target) && e.target !== sidebarToggle) {
                    closeSidebar();
                }
            }
        });
    }
    
    // タッチイベントも同様に処理（モバイル対応）
    if (mainContent) {
        mainContent.addEventListener('touchstart', (e) => {
            if (sidebar && sidebar.classList.contains('active')) {
                if (!sidebar.contains(e.target) && e.target !== sidebarToggle) {
                    closeSidebar();
                }
            }
        });
    }
    
    // 要素選択機能（開発モード） - キーボードショートカットで有効化
    setupElementSelection();
    
    // 商品詳細モーダルのイベントリスナー
    if (productModalOverlay) {
        productModalOverlay.addEventListener('click', closeProductDetail);
    }
    
    if (productModalClose) {
        productModalClose.addEventListener('click', closeProductDetail);
    }
    
    if (productDetailAddCart) {
        productDetailAddCart.addEventListener('click', () => {
            if (currentDetailProduct) {
                // サイズが選択されている場合は、価格とサイズ情報を含めてカートに追加
                const productToAdd = currentSelectedSize 
                    ? { ...currentDetailProduct, price: currentSelectedSize.price, selectedSize: currentSelectedSize.name }
                    : currentDetailProduct;
                addToCart(productToAdd);
                closeProductDetail();
            }
        });
    }
    
    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && productModal && productModal.classList.contains('active')) {
            closeProductDetail();
        }
    });
}

// 要素選択機能の変数
let selectionModeActive = false;
let highlightDiv = null;
let currentElement = null;
let selectionHandlers = {
    mouseover: null,
    mouseout: null,
    click: null,
    touch: null,
    touchmove: null
};

// 要素選択機能をセットアップ
function setupElementSelection() {
    document.addEventListener('keydown', (e) => {
        // Ctrl + Shift + E または Cmd + Shift + E で要素選択モードをトグル
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const modifierKey = isMac ? e.metaKey : e.ctrlKey;
        
        if (modifierKey && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
            e.preventDefault();
            e.stopPropagation();
            
            if (selectionModeActive) {
                disableElementSelection();
            } else {
                enableElementSelection();
            }
        }
    });
    
    // デバッグ用: コンソールにメッセージを表示
    console.log('要素選択機能がセットアップされました。ショートカット: ' + 
                (navigator.platform.toUpperCase().indexOf('MAC') >= 0 ? 'Cmd' : 'Ctrl') + '+Shift+E');
}

// 要素選択機能を無効化
function disableElementSelection() {
    selectionModeActive = false;
    document.body.classList.remove('element-selection-mode');
    
    if (highlightDiv) {
        highlightDiv.style.display = 'none';
    }
    
    // 編集パネルを非表示
    const editPanel = document.getElementById('element-edit-panel');
    if (editPanel) {
        editPanel.style.display = 'none';
    }
    
    // イベントリスナーを削除
    if (selectionHandlers.mouseover) {
        document.removeEventListener('mouseover', selectionHandlers.mouseover, true);
        document.removeEventListener('mouseout', selectionHandlers.mouseout, true);
        document.removeEventListener('click', selectionHandlers.click, true);
        document.removeEventListener('touchend', selectionHandlers.touch, true);
        if (selectionHandlers.touchmove) {
            document.removeEventListener('touchmove', selectionHandlers.touchmove, true);
        }
        selectionHandlers.mouseover = null;
        selectionHandlers.mouseout = null;
        selectionHandlers.click = null;
        selectionHandlers.touch = null;
        selectionHandlers.touchmove = null;
    }
    
    console.log('要素編集モードが無効になりました');
}

// 要素選択機能を有効化（編集可能）
function enableElementSelection() {
    if (selectionModeActive) return;
    
    selectionModeActive = true;
    document.body.classList.add('element-selection-mode');
    
    // ハイライト用のdivを作成
    if (!highlightDiv) {
        highlightDiv = document.createElement('div');
        highlightDiv.id = 'element-highlight';
        highlightDiv.style.cssText = `
            position: absolute;
            pointer-events: none;
            border: 2px solid #ffd700;
            background: rgba(255, 215, 0, 0.1);
            z-index: 10000;
            display: none;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        `;
        document.body.appendChild(highlightDiv);
    }
    
    // 編集パネルを作成
    let editPanel = document.getElementById('element-edit-panel');
    if (!editPanel) {
        editPanel = document.createElement('div');
        editPanel.id = 'element-edit-panel';
        editPanel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(15, 35, 28, 0.95);
            border: 2px solid #ffd700;
            border-radius: 8px;
            padding: 1.5rem;
            z-index: 10001;
            min-width: 300px;
            display: none;
            color: #fff;
            font-family: 'Noto Sans JP', sans-serif;
        `;
        editPanel.innerHTML = `
            <h3 style="margin: 0 0 1rem 0; color: #ffd700;">要素編集</h3>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem;">テキスト:</label>
                <textarea id="edit-text" style="width: 100%; min-height: 60px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,215,0,0.3); border-radius: 4px; padding: 0.5rem; color: #fff; font-family: inherit;"></textarea>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button id="edit-save" style="flex: 1; background: #ffd700; color: #000; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer; font-weight: bold;">保存</button>
                <button id="edit-cancel" style="flex: 1; background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,215,0,0.3); padding: 0.5rem; border-radius: 4px; cursor: pointer;">キャンセル</button>
            </div>
        `;
        document.body.appendChild(editPanel);
        
        // 保存ボタン
        document.getElementById('edit-save').addEventListener('click', () => {
            if (currentElement) {
                const newText = document.getElementById('edit-text').value;
                if (currentElement.textContent !== undefined) {
                    currentElement.textContent = newText;
                } else if (currentElement.innerHTML !== undefined) {
                    currentElement.innerHTML = newText;
                }
            }
            editPanel.style.display = 'none';
            disableElementSelection();
        });
        
        // キャンセルボタン
        document.getElementById('edit-cancel').addEventListener('click', () => {
            editPanel.style.display = 'none';
            disableElementSelection();
        });
    }
    
    // マウスオーバー/タッチで要素をハイライト
    selectionHandlers.mouseover = (e) => {
        if (!selectionModeActive) return;
        const target = e.target || e.currentTarget;
        if (target === highlightDiv || target === document.body || target === document.documentElement || target.closest('#element-edit-panel')) return;
        
        currentElement = target;
        const rect = currentElement.getBoundingClientRect();
        
        highlightDiv.style.display = 'block';
        highlightDiv.style.left = rect.left + window.scrollX + 'px';
        highlightDiv.style.top = rect.top + window.scrollY + 'px';
        highlightDiv.style.width = rect.width + 'px';
        highlightDiv.style.height = rect.height + 'px';
    };
    
    // タッチでハイライト
    const touchMoveHandler = (e) => {
        if (!selectionModeActive) return;
        const touch = e.touches[0];
        if (!touch) return;
        
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element && element !== highlightDiv && element !== document.body && element !== document.documentElement && !element.closest('#element-edit-panel')) {
            currentElement = element;
            const rect = currentElement.getBoundingClientRect();
            
            highlightDiv.style.display = 'block';
            highlightDiv.style.left = rect.left + window.scrollX + 'px';
            highlightDiv.style.top = rect.top + window.scrollY + 'px';
            highlightDiv.style.width = rect.width + 'px';
            highlightDiv.style.height = rect.height + 'px';
        }
    };
    
    document.addEventListener('touchmove', touchMoveHandler, true);
    selectionHandlers.touchmove = touchMoveHandler;
    
    // マウスアウトでハイライトを非表示
    selectionHandlers.mouseout = (e) => {
        if (!selectionModeActive) return;
        if (e.target !== currentElement || e.target.closest('#element-edit-panel')) return;
        if (highlightDiv) highlightDiv.style.display = 'none';
    };
    
    // クリックで要素を編集
    selectionHandlers.click = (e) => {
        if (!selectionModeActive) {
            console.log('要素編集モードが無効です');
            return;
        }
        
        const target = e.target;
        if (target === highlightDiv || target.closest('#element-edit-panel')) {
            return;
        }
        
        // 編集可能な要素のみ処理
        if (target === document.body || target === document.documentElement || 
            target === highlightDiv || target.id === 'element-edit-panel') {
            return;
        }
        
        console.log('要素をクリック:', target);
        e.preventDefault();
        e.stopPropagation();
        
        currentElement = target;
        
        // 編集パネルを表示
        const textArea = document.getElementById('edit-text');
        const currentText = target.textContent?.trim() || target.innerText?.trim() || target.value || target.alt || target.title || '';
        textArea.value = currentText;
        editPanel.style.display = 'block';
        
        // テキストエリアにフォーカス
        setTimeout(() => {
            textArea.focus();
            textArea.select();
        }, 100);
    };
    
    // タッチイベントハンドラー（タップで要素を編集）
    selectionHandlers.touch = (e) => {
        if (!selectionModeActive) return;
        
        const touch = e.changedTouches[0];
        if (!touch) return;
        
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        
        if (!element || element === highlightDiv || element.closest('#element-edit-panel') || 
            element === document.body || element === document.documentElement) {
            return;
        }
        
        e.preventDefault();
        e.stopPropagation();
        
        currentElement = element;
        
        // 編集パネルを表示
        const textArea = document.getElementById('edit-text');
        const currentText = element.textContent?.trim() || element.innerText?.trim() || element.value || element.alt || '';
        textArea.value = currentText;
        editPanel.style.display = 'block';
        
        setTimeout(() => {
            textArea.focus();
            textArea.select();
        }, 100);
    };
    
    document.addEventListener('mouseover', selectionHandlers.mouseover, true);
    document.addEventListener('mouseout', selectionHandlers.mouseout, true);
    document.addEventListener('click', selectionHandlers.click, true);
    document.addEventListener('touchend', selectionHandlers.touch, true);
    
    console.log('要素編集モードが有効になりました (Ctrl+Shift+E で無効化)');
}

// アニメーション開始
function startAnimations() {
    // ロゴのアニメーション
    if (logoLink) {
        setTimeout(() => {
            logoLink.style.opacity = '1';
        }, 500);
    }
    
    // ヒーローセクションのアニメーション
    if (heroSection) {
        const heroTitle = heroSection.querySelector('.hero-title');
        const heroSubtitle = heroSection.querySelector('.hero-subtitle');
        
        if (heroTitle) {
            setTimeout(() => {
                heroTitle.style.opacity = '1';
            }, 800);
        }
        
        if (heroSubtitle) {
            setTimeout(() => {
                heroSubtitle.style.opacity = '1';
            }, 1200);
        }
    }
    
    // 背景動画の再生確認
    const bgVideo = document.getElementById('bgVideo');
    if (bgVideo) {
        bgVideo.play().catch(err => {
            console.log('Video autoplay was blocked:', err);
        });
    }
}

// サイドバーの開閉
function toggleSidebar() {
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// サイドバーを閉じる
function closeSidebar() {
    if (sidebar) {
        sidebar.classList.remove('active');
    }
}

// カテゴリ選択
function selectCategory(category) {
    currentCategory = category;
    
    // ボタンのアクティブ状態を更新
    categoryButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    // サイドバーを閉じる（モバイル用）
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
    }
    
    // 商品を再表示
    displayProducts();
}

// 商品を表示
function displayProducts() {
    if (!productsContainer) return;
    
    // フィルタリング
    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(p => p.category === currentCategory);
    
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = '<p class="loading">商品が見つかりません</p>';
        return;
    }
    
    // 商品カードを生成
    productsContainer.innerHTML = filteredProducts.map((product, index) => {
        return createProductCard(product, index);
    }).join('');
    
    // 商品カードクリックで詳細表示
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card) => {
        card.addEventListener('click', (e) => {
            // カート追加ボタンをクリックした場合は詳細表示しない
            if (e.target.closest('.add-to-cart-btn')) {
                return;
            }
            const productId = card.dataset.productId;
            const product = products.find(p => p.id === productId);
            if (product) {
                showProductDetail(product);
            }
        });
        
        // カーソルをポインターに変更
        card.style.cursor = 'pointer';
    });
    
    // カート追加ボタンのイベントリスナーを設定
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // カードクリックイベントの伝播を防ぐ
            const productId = btn.dataset.productId;
            const product = products.find(p => p.id === productId);
            if (product) {
                addToCart(product);
            }
        });
    });
}

// 商品カードの生成
function createProductCard(product, index) {
    const delay = index * 0.1;
    return `
        <div class="product-card" style="animation-delay: ${delay}s" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">¥${product.price.toLocaleString()}</span>
                    <button class="add-to-cart-btn" data-product-id="${product.id}">
                        カートに追加
                    </button>
                </div>
            </div>
        </div>
    `;
}

// 商品詳細を表示
function showProductDetail(product) {
    if (!productModal || !product) return;
    
    currentDetailProduct = product;
    currentDetailImageIndex = 0;
    currentSelectedSize = null;
    
    // 画像の設定（複数画像対応）
    const images = product.images && product.images.length > 0 
        ? product.images 
        : [product.image];
    
    updateProductImages(images);
    
    // 商品情報を設定
    if (productDetailName) {
        productDetailName.textContent = product.name;
    }
    
    if (productDetailDescription) {
        productDetailDescription.textContent = product.description;
    }
    
    // 詳細説明の設定
    if (productDetailDetailedDescription) {
        if (product.detailedDescription) {
            productDetailDetailedDescription.textContent = product.detailedDescription;
            productDetailDetailedDescription.style.display = 'block';
        } else {
            productDetailDetailedDescription.style.display = 'none';
        }
    }
    
    // サイズ選択の設定
    if (product.sizes && product.sizes.length > 0) {
        renderSizeOptions(product.sizes);
        if (productDetailSizeSection) {
            productDetailSizeSection.style.display = 'block';
        }
    } else {
        if (productDetailSizeSection) {
            productDetailSizeSection.style.display = 'none';
        }
    }
    
    updateProductPrice(product);
    updateProductStock(product);
    
    // モーダルを表示
    productModal.classList.add('active');
    // スクロールを無効化（モバイル対応）
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
}

// 商品画像を更新
function updateProductImages(images) {
    if (!productDetailImage || !productImageThumbnails || images.length === 0) return;
    
    // メイン画像を設定
    productDetailImage.src = images[0];
    productDetailImage.alt = currentDetailProduct?.name || '';
    
    // サムネイル画像を生成
    productImageThumbnails.innerHTML = images.map((img, index) => `
        <div class="product-image-thumbnail ${index === 0 ? 'active' : ''}" data-image-index="${index}">
            <img src="${img}" alt="${currentDetailProduct?.name || ''} ${index + 1}">
        </div>
    `).join('');
    
    // サムネイルクリックイベント
    const thumbnails = productImageThumbnails.querySelectorAll('.product-image-thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            currentDetailImageIndex = index;
            productDetailImage.src = images[index];
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });
    
    // 前/次のボタンイベント
    if (productImagePrev) {
        productImagePrev.style.display = images.length > 1 ? 'flex' : 'none';
        productImagePrev.onclick = () => {
            currentDetailImageIndex = (currentDetailImageIndex - 1 + images.length) % images.length;
            productDetailImage.src = images[currentDetailImageIndex];
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnails[currentDetailImageIndex].classList.add('active');
        };
    }
    
    if (productImageNext) {
        productImageNext.style.display = images.length > 1 ? 'flex' : 'none';
        productImageNext.onclick = () => {
            currentDetailImageIndex = (currentDetailImageIndex + 1) % images.length;
            productDetailImage.src = images[currentDetailImageIndex];
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnails[currentDetailImageIndex].classList.add('active');
        };
    }
}

// サイズ選択オプションをレンダリング
function renderSizeOptions(sizes) {
    if (!productDetailSizes) return;
    
    productDetailSizes.innerHTML = sizes.map((size, index) => `
        <div class="product-size-option ${size.stock <= 0 ? 'disabled' : ''}" 
             data-size-index="${index}" 
             data-size-price="${size.price}"
             data-size-stock="${size.stock}">
            <span class="product-size-name">${size.name}</span>
            ${size.price !== currentDetailProduct?.price ? `<span class="product-size-price">¥${size.price.toLocaleString()}</span>` : ''}
        </div>
    `).join('');
    
    // サイズ選択イベント
    const sizeOptions = productDetailSizes.querySelectorAll('.product-size-option:not(.disabled)');
    sizeOptions.forEach((option, index) => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            currentSelectedSize = sizes[index];
            updateProductPrice(currentDetailProduct, sizes[index]);
            updateProductStock(currentDetailProduct, sizes[index]);
        });
    });
    
    // デフォルトで最初の在庫ありサイズを選択
    const firstAvailableSize = sizes.find(s => s.stock > 0);
    if (firstAvailableSize) {
        const firstAvailableIndex = sizes.indexOf(firstAvailableSize);
        sizeOptions[firstAvailableIndex]?.classList.add('active');
        currentSelectedSize = firstAvailableSize;
        updateProductPrice(currentDetailProduct, firstAvailableSize);
        updateProductStock(currentDetailProduct, firstAvailableSize);
    }
}

// 商品価格を更新
function updateProductPrice(product, selectedSize = null) {
    if (!productDetailPrice) return;
    
    const price = selectedSize ? selectedSize.price : product.price;
    productDetailPrice.textContent = `¥${price.toLocaleString()}`;
}

// 商品在庫を更新
function updateProductStock(product, selectedSize = null) {
    if (!productDetailStock) return;
    
    const stock = selectedSize ? selectedSize.stock : product.stock;
    const stockText = stock > 0 
        ? `在庫あり (残り${stock}点)`
        : '在庫切れ';
    productDetailStock.textContent = stockText;
    productDetailStock.style.color = stock > 0 
        ? 'rgba(255, 255, 255, 0.8)'
        : 'rgba(255, 71, 87, 0.8)';
    
    if (productDetailAddCart) {
        productDetailAddCart.disabled = stock <= 0;
        productDetailAddCart.style.opacity = stock > 0 ? '1' : '0.5';
        productDetailAddCart.style.cursor = stock > 0 ? 'pointer' : 'not-allowed';
    }
}

// 商品詳細を閉じる
function closeProductDetail() {
    if (!productModal) return;
    
    productModal.classList.remove('active');
    // スクロールを再有効化（モバイル対応）
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    currentDetailProduct = null;
}

// カートに追加
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    
    // カートパネルを開く（モバイル用）
    if (window.innerWidth <= 768) {
        openCart();
    }
}

// カートから削除
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    renderCartItems();
}

// 数量を更新
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
            renderCartItems();
        }
    }
}

// カートを保存
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// カートを読み込み
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartUI();
}

// カートUIを更新
function updateCartUI() {
    // バッジを更新
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    // 合計金額を更新
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) {
        cartTotal.textContent = `¥${total.toLocaleString()}`;
    }
    
    // 決済ボタンの有効/無効
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
    }
    
    // カートアイテムを再描画
    renderCartItems();
}

// カートアイテムを描画
function renderCartItems() {
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">カートは空です</p>';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => {
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/80x80?text=No+Image'">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">¥${(item.price * item.quantity).toLocaleString()}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" aria-label="削除">×</button>
                </div>
            </div>
        `;
    }).join('');
}

// カートを開く
function openCart() {
    renderCartItems();
    if (cartPanel) cartPanel.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// カートを閉じる
function closeCart() {
    if (cartPanel) cartPanel.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// 決済ページに遷移
function goToCheckout() {
    if (cart.length === 0) return;
    window.location.href = '/checkout.html';
}

// グローバル関数として公開（HTMLから呼び出し可能にするため）
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;

