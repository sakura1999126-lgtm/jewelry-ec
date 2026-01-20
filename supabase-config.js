// Supabase設定ファイル
// このファイルにあなたのSupabase接続情報を入力してください

const SUPABASE_CONFIG = {
    // Supabaseダッシュボードの Settings > API から取得
    url: 'https://vewdsawoqblftnxgnjgd.supabase.co',  // 例: 'https://xxxxx.supabase.co'
    anonKey: 'sb_publishable_dCtprp8B03kQsm-nCFATMg_1sBQxZU4'  // 例: 'eyJhbGc...'（長い文字列）
};

// Supabaseクライアントの初期化
// CDNから読み込まれたSupabaseライブラリを使用
// グローバルスコープで利用可能にする
var supabase = null;

// Supabaseライブラリが読み込まれるまで待つ
function initializeSupabase() {
    // CDNから読み込まれたSupabaseライブラリを取得
    // UMDビルドの場合、グローバル変数として利用可能
    let supabaseLib = null;
    
    // 複数の可能性をチェック（より広範囲に）
    if (typeof window !== 'undefined') {
        // 1. window.supabase として利用可能な場合（最も一般的）
        if (window.supabase) {
            if (typeof window.supabase.createClient === 'function') {
                supabaseLib = window.supabase;
            } else if (window.supabase.default && typeof window.supabase.default.createClient === 'function') {
                // default export の場合
                supabaseLib = window.supabase.default;
            } else if (window.supabase.supabase && typeof window.supabase.supabase.createClient === 'function') {
                // ネストされた構造の場合
                supabaseLib = window.supabase.supabase;
            }
        }
        // 2. グローバルスコープの supabase 変数
        if (!supabaseLib && typeof window.supabaseLib !== 'undefined' && typeof window.supabaseLib.createClient === 'function') {
            supabaseLib = window.supabaseLib;
        }
        // 3. @supabase/supabase-js が直接エクスポートしている場合
        if (!supabaseLib && window.supabasejs && typeof window.supabasejs.createClient === 'function') {
            supabaseLib = window.supabasejs;
        }
        // 4. グローバルスコープで直接利用可能な場合
        if (!supabaseLib && typeof createClient !== 'undefined') {
            // createClientが直接利用可能な場合、ラッパーオブジェクトを作成
            supabaseLib = { createClient: createClient };
        }
    }
    
    // デバッグ用: 利用可能な変数を確認（常に実行）
    console.log('Supabaseライブラリ検出: 利用可能な変数を確認中...');
    console.log('window.supabase:', window.supabase);
    if (window.supabase) {
        console.log('window.supabase の型:', typeof window.supabase);
        console.log('window.supabase のキー:', Object.keys(window.supabase));
        console.log('window.supabase.createClient:', window.supabase.createClient);
        console.log('window.supabase.createClient の型:', typeof window.supabase.createClient);
        
        // window.supabaseがオブジェクトの場合、すべてのプロパティを確認
        if (typeof window.supabase === 'object') {
            for (let key in window.supabase) {
                if (typeof window.supabase[key] === 'function' && key.toLowerCase().includes('client')) {
                    console.log(`✓ 見つかった関数: window.supabase.${key}`);
                }
            }
        }
    }
    console.log('window.supabasejs:', typeof window.supabasejs);
    console.log('createClient:', typeof createClient);
    
    // window.supabaseがオブジェクトの場合、createClientを直接探す（再チェック）
    if (!supabaseLib && window.supabase && typeof window.supabase === 'object') {
        // createClientが直接プロパティとして存在するか確認
        if (typeof window.supabase.createClient === 'function') {
            console.log('✓ window.supabase.createClient が見つかりました（再チェック）');
            supabaseLib = window.supabase;
        } else {
            // もしかしたら default export の可能性
            if (window.supabase.default && typeof window.supabase.default.createClient === 'function') {
                console.log('✓ window.supabase.default.createClient が見つかりました');
                supabaseLib = window.supabase.default;
            }
        }
    }
    
    // Supabaseライブラリが見つかった場合
    if (supabaseLib && SUPABASE_CONFIG.url && SUPABASE_CONFIG.url !== 'YOUR_SUPABASE_URL' && 
        SUPABASE_CONFIG.anonKey && SUPABASE_CONFIG.anonKey !== 'YOUR_SUPABASE_ANON_KEY') {
        try {
            supabase = supabaseLib.createClient(
                SUPABASE_CONFIG.url,
                SUPABASE_CONFIG.anonKey
            );
            // グローバルスコープでも利用可能にする
            if (typeof window !== 'undefined') {
                window.supabaseClient = supabase;
            }
            console.log('Supabase接続成功');
            return true;
        } catch (error) {
            console.error('Supabase接続エラー:', error);
            return false;
        }
    } else if (!supabaseLib) {
        console.warn('Supabaseライブラリが読み込まれていません。CDNの読み込みを確認してください。');
        console.warn('ヒント: ブラウザのネットワークタブで supabase.min.js が読み込まれているか確認してください。');
        return false;
    } else {
        console.warn('Supabase設定が完了していません。supabase-config.jsを編集してください。');
        return false;
    }
}

// 複数回試行して初期化（CDNの読み込みを待つ）
let initAttempts = 0;
const maxAttempts = 10;

function tryInitializeSupabase() {
    initAttempts++;
    const success = initializeSupabase();
    
    if (!success && initAttempts < maxAttempts) {
        // まだ読み込まれていない場合、少し待ってから再試行
        setTimeout(tryInitializeSupabase, 200);
    } else if (!success && initAttempts >= maxAttempts) {
        console.error('Supabaseの初期化に失敗しました。CDNの読み込みを確認してください。');
    }
}

// Supabaseスクリプトの読み込み完了を待つ（最大20回、100ms間隔）
let waitAttempts = 0;
const maxWaitAttempts = 20;

function waitForSupabaseScript() {
    waitAttempts++;
    
    // スクリプトが読み込まれたか確認
    if (window.supabase && typeof window.supabase === 'object') {
        // スクリプトが読み込まれた後、少し待ってから初期化
        console.log('Supabaseスクリプトが検出されました。初期化を開始します...');
        setTimeout(tryInitializeSupabase, 100);
    } else if (waitAttempts < maxWaitAttempts) {
        // まだ読み込まれていない場合、再試行
        setTimeout(waitForSupabaseScript, 100);
    } else {
        // 最大試行回数に達した場合、エラーを表示
        console.error('Supabaseスクリプトの読み込みがタイムアウトしました。CDNのURLを確認してください。');
        console.error('確認URL: https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js');
    }
}

// DOMContentLoadedまたは即座に初期化を試みる
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // DOMContentLoaded後、少し待ってからSupabaseスクリプトの読み込みを待つ
        setTimeout(waitForSupabaseScript, 100);
    });
} else {
    // 既に読み込み済みの場合、Supabaseスクリプトの読み込みを待つ
    setTimeout(waitForSupabaseScript, 100);
}
