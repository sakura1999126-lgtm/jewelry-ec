// Supabase設定ファイル
// このファイルにあなたのSupabase接続情報を入力してください

const SUPABASE_CONFIG = {
    // Supabaseダッシュボードの Settings > API から取得
    url: 'YOUR_SUPABASE_URL',  // 例: 'https://xxxxx.supabase.co'
    anonKey: 'YOUR_SUPABASE_ANON_KEY'  // 例: 'eyJhbGc...'（長い文字列）
};

// Supabaseクライアントの初期化
// CDNから読み込まれたSupabaseライブラリを使用
let supabase = null;

if (typeof supabaseLib !== 'undefined' && SUPABASE_CONFIG.url !== 'YOUR_SUPABASE_URL') {
    supabase = supabaseLib.createClient(
        SUPABASE_CONFIG.url,
        SUPABASE_CONFIG.anonKey
    );
} else if (SUPABASE_CONFIG.url === 'YOUR_SUPABASE_URL') {
    console.warn('Supabase設定が完了していません。supabase-config.jsを編集してください。');
}
