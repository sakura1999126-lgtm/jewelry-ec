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
    
    // 複数の可能性をチェック
    if (typeof window !== 'undefined') {
        // window.supabase として利用可能な場合
        if (window.supabase && window.supabase.createClient) {
            supabaseLib = window.supabase;
        }
        // グローバルスコープに直接定義されている場合（ただし、このファイル内の変数と競合しないように）
        else if (typeof window.supabaseLib !== 'undefined' && window.supabaseLib.createClient) {
            supabaseLib = window.supabaseLib;
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
        return false;
    } else {
        console.warn('Supabase設定が完了していません。supabase-config.jsを編集してください。');
        return false;
    }
}

// DOMContentLoadedまたは即座に初期化を試みる
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSupabase);
} else {
    // 既に読み込み済みの場合、少し待ってから初期化（CDNの読み込みを待つ）
    setTimeout(initializeSupabase, 100);
}
