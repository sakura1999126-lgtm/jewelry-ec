# 🚀 Render デプロイガイド（最も簡単）

## Renderとは

- ✅ **無料プラン**: 永久無料（スリープあり）
- ✅ **超簡単**: GitHubリポジトリのURLを貼るだけ
- ✅ **Node.js対応**: server.jsがそのまま動作
- ✅ **自動デプロイ**: GitHubにプッシュすると自動デプロイ
- ✅ **カスタムドメイン**: 無料で設定可能

---

## 📋 デプロイ手順（3ステップ）

### ステップ1: Renderアカウント作成

1. **ブラウザで https://render.com にアクセス**
2. **「Get Started for Free」をクリック**
3. **GitHubアカウントでログイン**（1クリックで完了）

### ステップ2: Webサービスを作成

1. **Renderダッシュボードで「New +」ボタンをクリック**
   - 画面右上の青い「New +」ボタン

2. **「Web Service」を選択**
   - メニューから「Web Service」をクリック

3. **GitHubアカウントを接続**（初回のみ）

   **【もし「Connect GitHub」ボタンが表示されている場合】**
   - 「Connect GitHub」ボタンをクリック
   - GitHubのログイン画面が開きます
   - GitHubのユーザー名とパスワードを入力
   - 「Authorize Render」ボタンをクリック（権限を許可）
   - Renderダッシュボードに戻ります

   **【もしすでにGitHubが接続されている場合】**
   - このステップはスキップして、次のステップに進みます

4. **リポジトリを選択**

   **方法A: 検索して選択（推奨）**
   - 「Connect a repository」の下に検索ボックスがあります
   - `jewelry-ec` と入力して検索
   - 見つかったら、`sakura1999126-lgtm/jewelry-ec` をクリックして選択

   **方法B: URLを直接入力**
   - 「Public Git repository」という入力欄があります
   - そこに以下のURLをコピー&ペースト:
     ```
     https://github.com/sakura1999126-lgtm/jewelry-ec
     ```
   - または、「Use this repository」ボタンをクリック

### ステップ3: 設定（ほぼ自動）

**Renderが自動で設定してくれます！**

- **Name**: `jewelry-ec`（そのまま）
- **Runtime**: `Node`（自動検出）
- **Build Command**: `npm install`（自動）
- **Start Command**: `node server.js`（自動）
- **Environment**: `Node`（自動）

**「Create Web Service」をクリック**

**完了！** 約2-3分でデプロイ完了します。

---

## ✅ デプロイ後のURL

- **自動でURLが生成されます**: `https://jewelry-ec.onrender.com`
- **またはカスタム名**: 設定で変更可能

---

## 🔧 Stripe実装時（後で）

### 1. Stripe APIキーを取得
- https://stripe.com でアカウント作成
- Secret keyをコピー

### 2. Renderに環境変数を設定

1. **Renderダッシュボードでプロジェクトを開く**
2. **「Environment」タブをクリック**
3. **「Add Environment Variable」をクリック**
4. **以下を追加**:
   - **Key**: `STRIPE_SECRET_KEY`
   - **Value**: StripeのSecret key
5. **「Save Changes」をクリック**
6. **自動で再デプロイされます**

### 3. コードを有効化

`api/checkout.js` のコメントアウト部分を有効化（後で）

---

## 🌐 カスタムドメイン設定

1. **Renderダッシュボードでプロジェクトを開く**
2. **「Settings」タブをクリック**
3. **「Custom Domains」セクション**
4. **ドメイン名を入力**
5. **DNS設定の指示に従う**

---

## 💡 メリット

### Renderを使うメリット

- ✅ **超簡単**: URLを貼るだけで完了
- ✅ **無料**: 永久無料プラン
- ✅ **自動デプロイ**: GitHubにプッシュするだけ
- ✅ **Node.js対応**: server.jsがそのまま動作
- ✅ **環境変数**: 簡単に設定可能
- ✅ **ログ確認**: ダッシュボードで簡単確認

### 注意点

- ⚠️ **スリープ**: 無料プランは15分間アクセスがないとスリープ（初回起動に30秒かかる）
- ⚠️ **制限**: 月750時間まで無料

本番で使う場合、有料プラン（$7/月）でスリープなしにできます。

---

## 🔄 現在のCloudflare Pagesから移行

### 両方同時に使用可能

- **Cloudflare Pages**: `https://jewelry-ec.sakura1114jf.workers.dev/`（静的ファイルのみ）
- **Render**: `https://jewelry-ec.onrender.com`（サーバーサイドコードも動作）

Renderを使用する場合は、RenderのURLを使用してください。

---

## ✅ 確認事項

### デプロイ後の確認

1. ✅ サイトが表示される
2. ✅ `/api/products` が動作する（商品データ取得）
3. ✅ `/api/checkout` が動作する（Stripe実装後に動作）

### テスト方法

ブラウザで以下にアクセス:
```
https://your-app.onrender.com/api/products
```

JSONデータが返ってくれば成功！

---

## 📚 参考リンク

- Render公式: https://render.com
- Renderドキュメント: https://render.com/docs
- Stripe統合: https://stripe.com/docs/payments/checkout
