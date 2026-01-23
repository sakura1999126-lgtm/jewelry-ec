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
    setTimeout(() => {
        initializeApp();
    }, 200);
});

// アプリケーションの初期化
async function initializeApp() {
    // スプラッシュスクリーンの表示（初回セッションのみ）
    showSplashScreen();
    
    // カートをローカルストレージから読み込み
    loadCart();
    
    // 商品データを取得（この中でdisplayProductsが呼ばれる）
    await fetchProducts();
    
    // イベントリスナーの設定
    setupEventListeners();
    
    // アニメーション開始
    startAnimations();
    
    // スクロールイベントの設定
    setupScrollAnimation();
}

// スプラッシュスクリーンを表示
function showSplashScreen() {
    // sessionStorageでセッション中にすでに表示したかチェック
    if (sessionStorage.getItem('splashShown')) {
        // すでに表示済みの場合はスプラッシュスクリーンを非表示にして終了
        const splashScreen = document.getElementById('splashScreen');
        if (splashScreen) {
            splashScreen.style.display = 'none';
        }
        // メインコンテンツを即座に表示
        document.body.classList.add('splash-complete');
        return;
    }
    
    // 初回セッションの場合のみ表示
    const splashScreen = document.getElementById('splashScreen');
    if (!splashScreen) {
        // スプラッシュスクリーンが存在しない場合もメインコンテンツを表示
        document.body.classList.add('splash-complete');
        return;
    }
    
    // セッションストレージに表示済みフラグを設定
    sessionStorage.setItem('splashShown', 'true');
    
    // 3秒後にフェードアウト
    setTimeout(() => {
        splashScreen.classList.add('hide');
        // フェードアウトアニメーション後に要素を削除し、メインコンテンツを表示
        setTimeout(() => {
            splashScreen.style.display = 'none';
            document.body.classList.add('splash-complete');
        }, 500); // アニメーション時間と同じ
    }, 3000); // 3秒表示
}

// 商品データを取得
async function fetchProducts() {
    try {
        // products.jsonから読み込む
        const response = await fetch('/products.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        products = data.products || [];
        
        if (products.length === 0) {
            if (productsContainer) {
                productsContainer.innerHTML = '<p class="loading">商品が見つかりませんでした</p>';
            }
            return;
        }
        
        // displayProductsは引数を受け取らないので、呼び出しのみ
        displayProducts();
    } catch (error) {
        console.error('Failed to fetch product data:', error);
        if (productsContainer) {
            productsContainer.innerHTML = '<p class="loading">商品の読み込みに失敗しました。ページを再読み込みしてください。</p>';
        }
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
    
    // console.log('要素編集モードが無効になりました');
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
            // console.log('要素編集モードが無効です');
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
        
        // console.log('要素をクリック:', target);
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
    
    // console.log('要素編集モードが有効になりました (Ctrl+Shift+E で無効化)');
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
    
    // 背景動画の設定
    const bgVideo = document.getElementById('bgVideo');
    const videoBackground = document.getElementById('videoBackground');
    
    console.log('🎬 動画背景の初期化を開始');
    console.log('bgVideo要素:', bgVideo ? '存在' : '不存在');
    console.log('videoBackground要素:', videoBackground ? '存在' : '不存在');
    
    if (bgVideo && videoBackground) {
        // 動画ファイルのパス（優先順位順）
        const videoPaths = [
            '/public/videos/video-output-89612E44-DF59-414E-B8F0-781525F2B34D.mp4',
            '/public/videos/background-video.mp4',
            '/videos/background-video.mp4'
        ];
        
        // 動画ファイルの存在確認と読み込み
        async function checkAndLoadVideo(index) {
            if (index >= videoPaths.length) {
                console.error('❌ すべての動画パスを試しましたが、見つかりませんでした');
                console.error('試したパス:', videoPaths);
                console.error('動画ファイルがRenderにデプロイされているか確認してください');
                return;
            }
            
            const videoPath = videoPaths[index];
            const fullUrl = window.location.origin + videoPath;
            
            console.log(`🔍 動画ファイルを確認中 (${index + 1}/${videoPaths.length}): ${videoPath}`);
            console.log(`   完全なURL: ${fullUrl}`);
            
            try {
                // 動画ファイルの存在確認
                const response = await fetch(videoPath, { method: 'HEAD' });
                
                if (response.ok) {
                    console.log(`✅ 動画ファイルが見つかりました: ${videoPath}`);
                    console.log(`   ステータス: ${response.status}`);
                    console.log(`   コンテンツタイプ: ${response.headers.get('content-type')}`);
                    console.log(`   ファイルサイズ: ${response.headers.get('content-length')} bytes`);
                    
                    // 動画を設定
                    setupVideoElement(videoPath);
                } else {
                    console.warn(`⚠️ 動画ファイルが見つかりません (ステータス: ${response.status}): ${videoPath}`);
                    // 次のパスを試す
                    checkAndLoadVideo(index + 1);
                }
            } catch (error) {
                console.error(`❌ 動画ファイルの確認中にエラーが発生: ${videoPath}`);
                console.error('   エラー詳細:', error);
                console.error('   エラーメッセージ:', error.message);
                console.error('   エラースタック:', error.stack);
                // 次のパスを試す
                checkAndLoadVideo(index + 1);
            }
        }
        
        // 動画要素を設定する関数
        function setupVideoElement(videoPath) {
            console.log(`🎥 動画要素を設定中: ${videoPath}`);
            
            const ext = videoPath.split('.').pop().toLowerCase();
            
            // .movファイルはブラウザで直接再生できないため、背景画像として使用
            if (ext === 'mov' || ext === 'jpeg' || ext === 'jpg' || ext === 'png') {
                console.log(`📷 画像として使用: ${videoPath}`);
                videoBackground.style.backgroundImage = `url(${videoPath})`;
                videoBackground.style.backgroundSize = 'cover';
                videoBackground.style.backgroundPosition = 'center';
                bgVideo.style.display = 'none';
                return;
            }
            
            // .mp4などの動画ファイルの場合
            console.log(`🎬 MP4動画として設定: ${videoPath}`);
            
            // 音量を完全に無効化（音声なし）
            bgVideo.muted = true;
            bgVideo.volume = 0;
            bgVideo.setAttribute('muted', 'true');
            console.log('   音量設定: muted=true, volume=0');
            
            // 既存のsource要素をクリア
            bgVideo.innerHTML = '';
            
            const source = document.createElement('source');
            source.src = videoPath;
            source.type = `video/${ext}`;
            bgVideo.appendChild(source);
            console.log(`   <source>要素を追加: src="${videoPath}", type="video/${ext}"`);
            
            // イベントリスナーの設定
            const onLoadedMetadata = () => {
                console.log('✅ 動画のメタデータが読み込まれました');
                console.log(`   動画の長さ: ${bgVideo.duration}秒`);
                console.log(`   動画の幅: ${bgVideo.videoWidth}px`);
                console.log(`   動画の高さ: ${bgVideo.videoHeight}px`);
            };
            
            const onLoadedData = () => {
                console.log('✅ 動画データが読み込まれました');
                bgVideo.play().then(() => {
                    console.log('▶️ 動画の再生を開始しました');
                }).catch(err => {
                    console.error('❌ 動画の再生に失敗:', err);
                    console.error('   エラー詳細:', err.message);
                });
            };
            
            const onCanPlay = () => {
                console.log('✅ 動画の再生準備が整いました');
            };
            
            const onPlay = () => {
                console.log('▶️ 動画が再生中です');
            };
            
            const onError = (e) => {
                console.error('❌ 動画の読み込みエラーが発生しました');
                console.error('   エラーコード:', bgVideo.error ? bgVideo.error.code : 'unknown');
                console.error('   エラーメッセージ:', bgVideo.error ? bgVideo.error.message : 'unknown');
                console.error('   イベント:', e);
                console.error('   動画パス:', videoPath);
            };
            
            // イベントリスナーを追加
            bgVideo.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
            bgVideo.addEventListener('loadeddata', onLoadedData, { once: true });
            bgVideo.addEventListener('canplay', onCanPlay, { once: true });
            bgVideo.addEventListener('play', onPlay, { once: true });
            bgVideo.addEventListener('error', onError, { once: true });
            
            // 動画の読み込みを開始
            console.log('📥 動画の読み込みを開始...');
            bgVideo.load();
            
            // 再生開始を試みる（autoplay属性があるので自動再生されるはず）
            setTimeout(() => {
                bgVideo.play().then(() => {
                    console.log('▶️ 動画の自動再生を開始しました');
                }).catch(err => {
                    console.warn('⚠️ 自動再生に失敗（ブラウザのポリシーによる可能性）:', err.message);
                    console.log('   loadeddataイベントで再試行します');
                });
            }, 100);
        }
        
        // 最初の動画パスから確認を開始
        checkAndLoadVideo(0);
    } else {
        console.error('❌ 動画要素が見つかりません');
        console.error('   bgVideo:', bgVideo);
        console.error('   videoBackground:', videoBackground);
    }
}

// スクロールアニメーションの設定
function setupScrollAnimation() {
    const heroSection = document.getElementById('heroSection');
    const productsSection = document.querySelector('.products-section');
    
    if (!heroSection || !productsSection) return;
    
    let ticking = false;
    
    function handleScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY || window.pageYOffset;
                const windowHeight = window.innerHeight;
                const heroHeight = heroSection.offsetHeight;
                
                // グラデーション遷移のためのスクロール位置調整
                const fadeStartPoint = windowHeight * 0.4;
                const fadeEndPoint = windowHeight * 0.85;
                
                // Hero section を段階的にフェードアウト
                if (scrollY > fadeStartPoint) {
                    const fadeProgress = Math.min((scrollY - fadeStartPoint) / (fadeEndPoint - fadeStartPoint), 1);
                    heroSection.style.opacity = 1 - fadeProgress;
                    heroSection.style.transform = `translateY(${fadeProgress * 20}px)`;
                } else {
                    heroSection.style.opacity = 1;
                    heroSection.style.transform = 'translateY(0)';
                }
                
                // Products section をグラデーションでフェードイン（黒背景への自然な遷移）
                const productsFadeStart = windowHeight * 0.5;
                const productsFadeEnd = windowHeight * 0.9;
                
                if (scrollY > productsFadeStart) {
                    const productsFadeProgress = Math.min((scrollY - productsFadeStart) / (productsFadeEnd - productsFadeStart), 1);
                    // スムーズなグラデーション遷移
                    productsSection.style.opacity = productsFadeProgress;
                    productsSection.style.transform = `translateY(${(1 - productsFadeProgress) * 15}px)`;
                } else {
                    productsSection.style.opacity = 0;
                    productsSection.style.transform = 'translateY(15px)';
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 初回チェック
    handleScroll();
}

// サイドバーの開閉
function toggleSidebar() {
    if (sidebar) {
        sidebar.classList.toggle('active');
        // デスクトップ用: bodyにクラスを追加してメインコンテンツのマージンを制御
        document.body.classList.toggle('sidebar-open', sidebar.classList.contains('active'));
    }
}

// サイドバーを閉じる
function closeSidebar() {
    if (sidebar) {
        sidebar.classList.remove('active');
        document.body.classList.remove('sidebar-open');
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
    
    // サイドバーを閉じる（全画面サイズ）
    closeSidebar();
    
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
    
    // 既存の商品カードをフェードアウト（アニメーションを防ぐため）
    const existingCards = productsContainer.querySelectorAll('.product-card');
    if (existingCards.length > 0) {
        // 2回目以降の表示
        displayProductsCallCount++;
        productsContainer.style.opacity = '0';
        setTimeout(() => {
            // 商品カードを生成（アニメーションなし）
            productsContainer.innerHTML = filteredProducts.map((product, index) => {
                return createProductCard(product, index);
            }).join('');
            productsContainer.style.opacity = '1';
            attachProductCardListeners();
        }, 150);
    } else {
        // 初回表示時のみアニメーションあり
        displayProductsCallCount = 0;
        productsContainer.innerHTML = filteredProducts.map((product, index) => {
            return createProductCard(product, index);
        }).join('');
        attachProductCardListeners();
        displayProductsCallCount = 1; // 次回からはアニメーションなし
    }
}

// 商品カードのイベントリスナーを設定（重複を防ぐため別関数に）
function attachProductCardListeners() {
    // コンテナ内の全ての.product-cardを取得（横スライド形式でもグリッド形式でも対応）
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
                // サイズがある商品の場合は商品詳細モーダルを開く
                if (product.sizes && product.sizes.length > 0) {
                    showProductDetail(product);
                } else {
                    // サイズがない商品の場合は直接カートに追加
                    addToCart(product);
                }
            }
        });
    });
}

// 商品を表示した回数を追跡
let displayProductsCallCount = 0;

// スクロール位置を保存する変数
let savedScrollPosition = 0;

// 商品カードの生成
function createProductCard(product, index) {
    // 初回のみアニメーション遅延を適用、2回目以降は即座に表示
    const delay = displayProductsCallCount === 0 ? index * 0.1 : 0;
    const animationStyle = displayProductsCallCount === 0 
        ? `animation: fadeInUp 0.6s ease ${delay}s forwards;` 
        : `opacity: 1; animation: none;`;
    
    // サイズ情報を取得（mm表記のみ抽出し、見切れないよう1行内で折り返し可）
    let sizeInfo = '';
    if (product.sizes && product.sizes.length > 0) {
        const formatSizeName = (name) => {
            // 15mm / 15.5mm などの mm 表記のみを抽出、なければ元の名称を返す
            const mmMatch = name.match(/([0-9]+(?:\\.[0-9]+)?mm)/i);
            return mmMatch ? `${mmMatch[1].replace(/mm/i, 'mm')}` : name;
        };

        const sizeList = product.sizes.map(size => formatSizeName(size.name)).join(' / ');
        sizeInfo = `<div class="product-size-wrapper"><span class="product-size">${sizeList}</span></div>`;
    }
    
    // 画像URLが無効な場合（via.placeholder.comなど）は画像を表示しないが、スペースは確保
    const imageUrl = product.image || '';
    // 空文字列やplaceholder.comを含むURLは無効とみなす
    const shouldShowImage = imageUrl && 
                          imageUrl.trim() !== '' && 
                          !imageUrl.includes('via.placeholder.com') && 
                          !imageUrl.includes('placeholder.com');
    
    const imageHtml = shouldShowImage 
        ? `<img src="${imageUrl}" alt="${product.name}" class="product-image" onerror="this.style.display='none'; this.onerror=null;">`
        : '<div class="product-image product-image-placeholder"></div>';
    
    // 在庫チェック（サイズがある場合はすべてのサイズの在庫を確認）
    let isSoldOut = false;
    if (product.sizes && product.sizes.length > 0) {
        isSoldOut = product.sizes.every(size => (size.stock || 0) <= 0);
    } else {
        isSoldOut = (product.stock || 0) <= 0;
    }
    
    // カートに入っている商品の個数を確認（同じ商品の異なるサイズも合計）
    const cartItemsForProduct = cart.filter(item => item.id === product.id);
    const cartQuantity = cartItemsForProduct.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadgeHtml = cartQuantity > 0 ? `<span class="product-cart-badge">${cartQuantity}</span>` : '';
    
    const soldOutBadge = isSoldOut ? '<span class="product-soldout-badge">売り切れ</span>' : '';
    const soldOutClass = isSoldOut ? 'product-card-soldout' : '';
    
    return `
        <div class="product-card ${soldOutClass}" style="${animationStyle}" data-product-id="${product.id}">
            ${imageHtml}
            ${soldOutBadge}
            ${cartBadgeHtml}
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                ${sizeInfo}
                <div class="product-footer">
                    <span class="product-price">¥${product.price.toLocaleString()}</span>
                    <button class="add-to-cart-btn" data-product-id="${product.id}" aria-label="カートに追加">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// 商品詳細を表示
function showProductDetail(product) {
    if (!productModal || !product) return;
    
    // 現在のスクロール位置を保存
    savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    currentDetailProduct = product;
    currentDetailImageIndex = 0;
    currentSelectedSize = null;
    
    // 画像の設定（複数画像対応）
    // via.placeholder.comの画像を除外
    const allImages = product.images && product.images.length > 0 
        ? product.images 
        : [product.image];
    const images = allImages.filter(img => img && !img.includes('via.placeholder.com') && !img.includes('placeholder.com'));
    
    updateProductImages(images);
    
    // 商品情報を設定
    if (productDetailName) {
        productDetailName.textContent = product.name;
    }
    
    // 説明文は非表示
    if (productDetailDescription) {
        productDetailDescription.style.display = 'none';
    }
    
    // 詳細説明も非表示
    if (productDetailDetailedDescription) {
        productDetailDetailedDescription.style.display = 'none';
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
    document.body.style.top = `-${savedScrollPosition}px`;
    document.body.style.width = '100%';
}

// 商品画像を更新
function updateProductImages(images) {
    if (!productDetailImage || !productImageThumbnails || images.length === 0) return;
    
    // 有効な画像のみをフィルタリング（via.placeholder.comを除外）
    const validImages = images.filter(img => img && !img.includes('via.placeholder.com') && !img.includes('placeholder.com'));
    
    if (validImages.length === 0) {
        // 有効な画像がない場合は画像セクションを非表示
        if (productDetailImage.parentElement) {
            productDetailImage.parentElement.style.display = 'none';
        }
        return;
    }
    
    // メイン画像を設定
    productDetailImage.src = validImages[0];
    productDetailImage.alt = currentDetailProduct?.name || '';
    productDetailImage.onerror = function() {
        this.style.display = 'none';
        this.onerror = null; // エラーハンドラーを削除して無限ループを防ぐ
    };
    
    // サムネイル画像を生成
    productImageThumbnails.innerHTML = validImages.map((img, index) => `
        <div class="product-image-thumbnail ${index === 0 ? 'active' : ''}" data-image-index="${index}">
            <img src="${img}" alt="${currentDetailProduct?.name || ''} ${index + 1}" onerror="this.style.display='none'; this.onerror=null;">
        </div>
    `).join('');
    
    // サムネイルクリックイベント
    const thumbnails = productImageThumbnails.querySelectorAll('.product-image-thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            currentDetailImageIndex = index;
            productDetailImage.src = validImages[index];
            productDetailImage.onerror = function() {
                this.style.display = 'none';
                this.onerror = null;
            };
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });
    
    // 前/次のボタンイベント
    if (productImagePrev) {
        productImagePrev.style.display = validImages.length > 1 ? 'flex' : 'none';
        productImagePrev.onclick = () => {
            currentDetailImageIndex = (currentDetailImageIndex - 1 + validImages.length) % validImages.length;
            productDetailImage.src = validImages[currentDetailImageIndex];
            productDetailImage.onerror = function() {
                this.style.display = 'none';
                this.onerror = null;
            };
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnails[currentDetailImageIndex].classList.add('active');
        };
    }
    
    if (productImageNext) {
        productImageNext.style.display = validImages.length > 1 ? 'flex' : 'none';
        productImageNext.onclick = () => {
            currentDetailImageIndex = (currentDetailImageIndex + 1) % validImages.length;
            productDetailImage.src = validImages[currentDetailImageIndex];
            productDetailImage.onerror = function() {
                this.style.display = 'none';
                this.onerror = null;
            };
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnails[currentDetailImageIndex].classList.add('active');
        };
    }
}

// サイズ選択オプションをレンダリング
function renderSizeOptions(sizes) {
    if (!productDetailSizes) return;
    
    // 在庫が0でも選択可能にする
    productDetailSizes.innerHTML = sizes.map((size, index) => `
        <div class="product-size-option" 
             data-size-index="${index}" 
             data-size-price="${size.price}"
             data-size-stock="${size.stock}">
            <span class="product-size-name">${size.name}</span>
            ${size.price !== currentDetailProduct?.price ? `<span class="product-size-price">¥${size.price.toLocaleString()}</span>` : ''}
        </div>
    `).join('');
    
    // サイズ選択イベント（在庫が0でも選択可能）
    const sizeOptions = productDetailSizes.querySelectorAll('.product-size-option');
    sizeOptions.forEach((option, index) => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            currentSelectedSize = sizes[index];
            updateProductPrice(currentDetailProduct, sizes[index]);
            updateProductStock(currentDetailProduct, sizes[index]);
        });
    });
    
    // デフォルトで最初のサイズを選択（在庫が0でも可）
    if (sizes.length > 0) {
        const firstSize = sizes[0];
        sizeOptions[0]?.classList.add('active');
        currentSelectedSize = firstSize;
        updateProductPrice(currentDetailProduct, firstSize);
        updateProductStock(currentDetailProduct, firstSize);
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
    let stockText = '';
    let stockColor = '';
    let stockNote = '';
    
    if (stock > 0) {
        stockText = `在庫あり (残り${stock}点)`;
        stockColor = 'rgba(255, 255, 255, 0.8)';
    } else {
        stockText = '売り切れ';
        stockColor = 'rgba(255, 215, 0, 0.8)';
        stockNote = '購入できますが発送までに2-3週間かかります';
    }
    
    productDetailStock.innerHTML = stockText + (stockNote ? `<br><span style="font-size: 0.85rem; color: rgba(255, 215, 0, 0.7);">${stockNote}</span>` : '');
    productDetailStock.style.color = stockColor;
    
    // 在庫が0でも購入可能にする
    if (productDetailAddCart) {
        productDetailAddCart.disabled = false;
        productDetailAddCart.style.opacity = '1';
        productDetailAddCart.style.cursor = 'pointer';
    }
}

// 商品詳細を閉じる
function closeProductDetail() {
    if (!productModal) return;
    
    productModal.classList.remove('active');
    // スクロールを再有効化（モバイル対応）
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    // スクロール位置を復元
    window.scrollTo(0, savedScrollPosition);
    currentDetailProduct = null;
}

// カートに追加
function addToCart(product) {
    // サイズ情報を取得（selectedSizeがあれば使用、なければnull）
    const sizeName = product.selectedSize || product.size_name || null;
    
    // 商品IDとサイズ名の組み合わせで一意のキーを生成
    const cartKey = sizeName ? `${product.id}_${sizeName}` : product.id;
    
    // 同じ商品かつ同じサイズのアイテムを検索
    const existingItem = cart.find(item => {
        const itemSizeName = item.size_name || null;
        const itemCartKey = itemSizeName ? `${item.id}_${itemSizeName}` : item.id;
        return itemCartKey === cartKey;
    });
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // カートに追加する際に、無効な画像URLは保存しない
        const imageUrl = product.image || '';
        const validImage = imageUrl && !imageUrl.includes('via.placeholder.com') && !imageUrl.includes('placeholder.com') 
            ? imageUrl 
            : '';
        
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: validImage,
            quantity: 1,
            size_name: sizeName || undefined
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
function removeFromCart(cartKey) {
    // cartKeyは商品IDまたは商品ID_サイズ名の形式
    cart = cart.filter(item => {
        const itemSizeName = item.size_name || null;
        const itemCartKey = itemSizeName ? `${item.id}_${itemSizeName}` : item.id;
        return itemCartKey !== cartKey;
    });
    saveCart();
    updateCartUI();
    renderCartItems();
}

// 数量を更新
function updateQuantity(cartKey, change) {
    // cartKeyは商品IDまたは商品ID_サイズ名の形式
    const item = cart.find(item => {
        const itemSizeName = item.size_name || null;
        const itemCartKey = itemSizeName ? `${item.id}_${itemSizeName}` : item.id;
        return itemCartKey === cartKey;
    });
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(cartKey);
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
    
    // 商品一覧のカートバッジを更新
    updateProductCartBadges();
}

// 商品一覧のカートバッジを更新
function updateProductCartBadges() {
    if (!productsContainer) return;
    
    const productCards = productsContainer.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const productId = card.dataset.productId;
        
        // 同じ商品IDのすべてのカートアイテム（異なるサイズ含む）の数量を合計
        const cartItemsForProduct = cart.filter(item => item.id === productId);
        const cartQuantity = cartItemsForProduct.reduce((sum, item) => sum + item.quantity, 0);
        
        // 既存のカートバッジを削除
        const existingBadge = card.querySelector('.product-cart-badge');
        if (existingBadge) {
            existingBadge.remove();
        }
        
        // カートに入っている場合はバッジを追加
        if (cartQuantity > 0) {
            const badge = document.createElement('span');
            badge.className = 'product-cart-badge';
            badge.textContent = cartQuantity.toString();
            card.appendChild(badge);
        }
    });
}

// カートアイテムを描画
function renderCartItems() {
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">カートは空です</p>';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => {
        // 画像URLが無効な場合（via.placeholder.comなど）は画像を表示しない
        const imageUrl = item.image || '';
        const shouldShowImage = imageUrl && !imageUrl.includes('via.placeholder.com') && !imageUrl.includes('placeholder.com');
        const imageHtml = shouldShowImage 
            ? `<img src="${imageUrl}" alt="${item.name}" class="cart-item-image" onerror="this.style.display='none'; this.onerror=null;">`
            : '';
        
        // 商品データを取得して詳細表示に遷移できるようにする
        const product = products.find(p => p.id === item.id);
        
        // カートキーを生成（商品IDとサイズ名の組み合わせ）
        const itemSizeName = item.size_name || null;
        const cartKey = itemSizeName ? `${item.id}_${itemSizeName}` : item.id;
        
        return `
            <div class="cart-item" data-cart-product-id="${item.id}" data-cart-key="${cartKey}" style="cursor: pointer;">
                ${imageHtml}
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    ${item.size_name ? `<p class="cart-item-size">サイズ: ${item.size_name}</p>` : ''}
                    <p class="cart-item-price">¥${(item.price * item.quantity).toLocaleString()}</p>
                    <div class="cart-item-quantity" onclick="event.stopPropagation();">
                        <button class="quantity-btn" onclick="updateQuantity('${cartKey}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${cartKey}', 1)">+</button>
                    </div>
                    <button class="cart-item-remove" onclick="event.stopPropagation(); removeFromCart('${cartKey}')" aria-label="削除">×</button>
                </div>
            </div>
        `;
    }).join('');
    
    // カートアイテムのクリックイベントを設定
    const cartItemElements = cartItems.querySelectorAll('.cart-item');
    cartItemElements.forEach(cartItem => {
        cartItem.addEventListener('click', (e) => {
            // 数量変更ボタンや削除ボタンをクリックした場合は詳細表示しない
            if (e.target.closest('.quantity-btn') || e.target.closest('.cart-item-remove')) {
                return;
            }
            
            const productId = cartItem.dataset.cartProductId;
            const product = products.find(p => p.id === productId);
            if (product) {
                closeCart();
                showProductDetail(product);
            }
        });
    });
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

