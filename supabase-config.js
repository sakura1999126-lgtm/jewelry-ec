// Supabase設定ファイル
// このファイルにあなたのSupabase接続情報を入力してください

const SUPABASE_CONFIG = {
    // Supabaseダッシュボードの Settings > API から取得
    url: 'https://vewdsawoqblftnxgnjgd.supabase.co',  // 例: 'https://xxxxx.supabase.co'
    anonKey: 'sb_publishable_dCtprp8B03kQsm-nCFATMg_1sBQxZU4'  // 例: 'eyJhbGc...'（長い文字列）
};

// Supabaseクライアントの初期化
// CDNから読み込まれたSupabaseライブラリを使用
let supabase = null;

// CDNから読み込まれたSupabaseライブラリを取得
// UMDビルドの場合、グローバル変数として利用可能
// CDNの場合は window.supabase または supabase として利用可能
const getSupabaseLib = () => {
    if (typeof window !== 'undefined') {
        // CDNから読み込まれた場合
        if (window.supabase) return window.supabase;
        // またはグローバルスコープに直接定義されている場合
        if (typeof supabase !== 'undefined' && supabase.createClient) return supabase;
    }
    return null;
};

const supabaseLib = getSupabaseLib();

if (supabaseLib && SUPABASE_CONFIG.url !== 'YOUR_SUPABASE_URL' && SUPABASE_CONFIG.anonKey !== 'YOUR_SUPABASE_ANON_KEY') {
    try {
        supabase = supabaseLib.createClient(
            SUPABASE_CONFIG.url,
            SUPABASE_CONFIG.anonKey
        );
        console.log('Supabase接続成功');
    } catch (error) {
        console.error('Supabase接続エラー:', error);
    }
} else if (SUPABASE_CONFIG.url === 'YOUR_SUPABASE_URL' || SUPABASE_CONFIG.anonKey === 'YOUR_SUPABASE_ANON_KEY') {
    console.warn('Supabase設定が完了していません。supabase-config.jsを編集してください。');
} else {
    console.warn('Supabaseライブラリが読み込まれていません。');
}
