# Supabase設定手順（超わかりやすく）

## 📍 ステップ1: Supabaseの接続情報を取得する

### 1-1. ブラウザでSupabaseを開く
1. ブラウザを開く
2. アドレスバーに以下を入力してEnter:
   ```
   https://supabase.com/dashboard
   ```
3. ログインする（GitHubアカウントまたはメールアドレス）

### 1-2. プロジェクトを選択
1. 画面左側にプロジェクト一覧が表示されます
2. **「jewelry-ec」**というプロジェクトを**クリック**

### 1-3. 設定画面を開く
1. 画面左側のメニューを見る
2. 一番下の方にある**「⚙️ Settings」**（歯車のアイコン）を**クリック**
3. サブメニューが開くので、**「API」**を**クリック**

### 1-4. 接続情報をコピー
画面に2つの重要な情報が表示されます：

#### ① Project URL
- **見つけ方**: 画面の上の方に「Project URL」という項目がある
- **値の例**: `https://abcdefghijklmnop.supabase.co`
- **やること**: この文字列を**すべてコピー**（Ctrl+C または Cmd+C）

#### ② Publishable key（anon public keyと同じ）
- **見つけ方**: 画面に「Publishable key」という項目がある（「anon public key」と表示されている場合もある）
- **値の例**: `sb_publishable_dCtprp8B03kQsm-nCFATMg_1sBQxZU4` または `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`（長い文字列）
- **やること**: この文字列を**すべてコピー**（Ctrl+C または Cmd+C）
- **注意**: 「Publishable key」と「anon public key」は同じものです。どちらか一方だけ表示されている場合は、それをコピーしてください

---

## 📍 ステップ2: プロジェクトのファイルを編集する

### 2-1. ファイルを開く
1. エディタ（Cursor）で `supabase-config.js` というファイルを開く
2. ファイルが見つからない場合は、プロジェクトフォルダ内を探す

### 2-2. 値を置き換える
ファイルの中に以下のようなコードがあります：

```javascript
const SUPABASE_CONFIG = {
    url: 'YOUR_SUPABASE_URL',  // ← ここを変更
    anonKey: 'YOUR_SUPABASE_ANON_KEY'  // ← ここを変更
};
```

#### ① urlを変更
- **見つける**: `'YOUR_SUPABASE_URL'` という部分
- **やること**: 
  - `'YOUR_SUPABASE_URL'` を削除
  - ステップ1-4でコピーした**Project URL**を貼り付け（Ctrl+V または Cmd+V）
  - 例: `url: 'https://abcdefghijklmnop.supabase.co',`

#### ② anonKeyを変更
- **見つける**: `'YOUR_SUPABASE_ANON_KEY'` という部分
- **やること**: 
  - `'YOUR_SUPABASE_ANON_KEY'` を削除
  - ステップ1-4でコピーした**Publishable key**を貼り付け（Ctrl+V または Cmd+V）
  - 例: `anonKey: 'sb_publishable_dCtprp8B03kQsm-nCFATMg_1sBQxZU4',` または `anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',`

### 2-3. 完成例
正しく設定すると、このようになります：

```javascript
const SUPABASE_CONFIG = {
    url: 'https://abcdefghijklmnop.supabase.co',  // ← あなたのProject URL
    anonKey: 'sb_publishable_dCtprp8B03kQsm-nCFATMg_1sBQxZU4'  // ← あなたのPublishable key（anon keyと同じ）
};
```

### 2-4. ファイルを保存
- **Ctrl+S**（Windows）または **Cmd+S**（Mac）で保存

---

## 📍 ステップ3: 変更をアップロードする

### 3-1. ターミナルを開く
1. エディタの下部にあるターミナルを開く
2. または、新しいターミナルウィンドウを開く

### 3-2. コマンドを実行
以下のコマンドを1つずつ実行（コピー&ペーストしてEnter）：

```bash
cd /Users/sakurairintaro/jewelry-ec
git add supabase-config.js
git commit -m "Add Supabase connection settings"
git push
```

### 3-3. 完了を待つ
- 「Success」や「Pushed」と表示されれば完了
- 1-2分待つ（Cloudflare Pagesが自動でデプロイします）

---

## 📍 ステップ4: 動作確認

### 4-1. サイトを開く
1. ブラウザで以下を開く:
   ```
   https://jewelry-ec.sakura1114jf.workers.dev/
   ```
2. ページが読み込まれるまで待つ

### 4-2. 開発者ツールを開く
1. **F12キー**を押す（または右クリック→「検証」）
2. 画面下部または右側に開発者ツールが開く
3. **「Console」**タブをクリック

### 4-3. 確認
- ✅ **成功**: 「Supabase接続成功」と表示され、商品が表示される
- ❌ **失敗**: エラーメッセージが表示される

---

## ❓ よくある質問

### Q: Supabaseダッシュボードが開けない
A: ログインしているか確認。ログインしていない場合は https://supabase.com からログイン

### Q: Settingsが見つからない
A: プロジェクトを選択しているか確認。左側のメニューに「Settings」があります

### Q: APIキーが長すぎてコピーできない
A: キーの右側に「コピー」ボタンがあるので、それをクリック

### Q: ファイルを保存できない
A: ファイルの編集権限があるか確認。エディタでファイルを開き直してみる

### Q: 商品が表示されない
A: 
1. SupabaseのTable Editorで商品データが存在するか確認
2. ブラウザのコンソールでエラーメッセージを確認
3. `supabase-config.js`の値が正しいか再確認

---

## 📝 チェックリスト

完了した項目にチェックを入れましょう：

- [ ] Supabaseダッシュボードにログイン
- [ ] プロジェクト「jewelry-ec」を選択
- [ ] Settings > API を開く
- [ ] Project URLをコピー
- [ ] Publishable key（anon public key）をコピー
- [ ] `supabase-config.js`ファイルを開く
- [ ] `YOUR_SUPABASE_URL`をProject URLに置き換え
- [ ] `YOUR_SUPABASE_ANON_KEY`をPublishable keyに置き換え
- [ ] ファイルを保存
- [ ] git add, commit, pushを実行
- [ ] サイトで動作確認

---

## 🎯 まとめ

**やることは3つだけ：**
1. Supabaseから接続情報をコピー（Settings > API）
2. `supabase-config.js`に貼り付け
3. 保存してアップロード（git push）

これだけです！
