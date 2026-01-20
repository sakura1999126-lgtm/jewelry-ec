# Vercelデプロイガイド

## 🚀 Vercelとは

- **無料プラン**: 永久無料
- **サーバー**: Node.jsサーバーが動作可能
- **自動デプロイ**: GitHubと連携して自動デプロイ
- **カスタムドメイン**: 無料で設定可能
- **HTTPS**: 自動でSSL証明書を発行

---

## 📋 デプロイ手順

### ステップ1: Vercelアカウント作成

1. **ブラウザで https://vercel.com/signup にアクセス**
2. **GitHubアカウントでログイン**（推奨）
   - 「Continue with GitHub」をクリック
   - GitHubの認証画面で「Authorize Vercel」をクリック
   - リポジトリへのアクセス権限を許可

---

### ステップ2: GitHubとVercelを接続（初回のみ）

1. **Vercelダッシュボードにアクセス**
   - https://vercel.com/dashboard

2. **GitHubとの接続を確認**
   - 初回の場合、「Continue with GitHub」をクリック
   - または、右上のプロフィールアイコン → 「Settings」→ 「Git」でGitHubアカウントを接続

3. **権限を許可**
   - GitHubの認証画面で「Authorize Vercel」をクリック
   - リポジトリへのアクセス権限を許可

### ステップ3: Vercelにデプロイ

1. **Vercelダッシュボードにアクセス**
   - https://vercel.com/dashboard

2. **「Add New...」→「Project」をクリック**

3. **GitHubリポジトリを選択**
   
   **リポジトリが表示されない場合:**
   
   a. **「Configure GitHub App」をクリック**
      - または「Settings」→「Git」でGitHub接続を確認
   
   b. **GitHubアプリの設定を開く**
      - 「Configure」または「Install Vercel for GitHub」をクリック
      - GitHubの認証画面が開きます
   
   c. **アクセス権限を設定**
      - 「Only select repositories」を選択
      - `jewelry-ec` または `sakura1999126-lgtm/jewelry-ec` を選択
      - 「Install」をクリック
   
   d. **Vercelダッシュボードに戻る**
      - 「Add New...」→「Project」を再度クリック
      - リポジトリ一覧に `jewelry-ec` が表示されるはずです
   
   **リポジトリが見つかったら:**
   - `jewelry-ec` または `sakura1999126-lgtm/jewelry-ec` を選択
   - 「Import」をクリック

4. **プロジェクト設定**
   - **Framework Preset**: そのまま（自動検出）
   - **Root Directory**: `./`（そのまま）
   - **Build Command**: （空白、そのまま）
   - **Output Directory**: （空白、そのまま）
   - **Install Command**: `npm install`（自動）

5. **Environment Variables（環境変数）**
   - 今は設定しなくてOK
   - Stripe実装時に `STRIPE_SECRET_KEY` を追加

6. **「Deploy」をクリック**

7. **デプロイ完了まで待つ**（約1-2分）

8. **デプロイ完了後、URLが表示されます**
   - 例: `https://jewelry-ec-xxxxx.vercel.app`

---

## 🔧 設定の確認

### 自動設定された内容

- ✅ `/api/*` → Serverless Functions（`api/`ディレクトリ）
- ✅ `/*` → 静的ファイル（`index.html`など）
- ✅ CORS設定済み

---

## 📝 Stripe実装時の手順

### 1. Stripe APIキーを取得

1. https://stripe.com でアカウント作成
2. ダッシュボード → Developers → API keys
3. **Secret key**をコピー

### 2. Vercelに環境変数を設定

1. **Vercelダッシュボードでプロジェクトを開く**
2. **Settings → Environment Variables**
3. **「Add New」をクリック**
4. 以下を追加:
   - **Name**: `STRIPE_SECRET_KEY`
   - **Value**: StripeのSecret key
   - **Environment**: Production, Preview, Development すべてにチェック
5. **「Save」をクリック**

### 3. `api/checkout.js`を有効化

`api/checkout.js`のコメントアウト部分を有効化：

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const session = await stripe.checkout.sessions.create({
  // ... 設定
});
```

### 4. Stripeパッケージをインストール

Vercelは自動で`package.json`から依存関係をインストールしますが、念のため確認：

```bash
npm install stripe
```

その後、GitHubにプッシュしてVercelが自動再デプロイします。

---

## 🌐 カスタムドメイン設定

1. **Vercelダッシュボードでプロジェクトを開く**
2. **Settings → Domains**
3. **ドメイン名を入力**（例: `jewelry.example.com`）
4. **DNS設定の指示に従う**

---

## ✅ 確認事項

### デプロイ後の確認

- ✅ サイトが表示される
- ✅ `/api/checkout`エンドポイントが動作する
- ✅ 商品が表示される
- ✅ カート機能が動作する

### テスト方法

```bash
# APIエンドポイントをテスト
curl -X POST https://your-project.vercel.app/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"lineItems": [], "successUrl": "https://example.com/success", "cancelUrl": "https://example.com/cancel"}'
```

---

## 🔄 Cloudflare PagesからVercelへの移行

### 現在の状態

- **Cloudflare Pages**: 静的サイトのみ（`server.js`は動作しない）
- **Vercel**: サーバーサイドコードが動作可能

### 移行後のURL

- **Cloudflare Pages**: `https://jewelry-ec.sakura1114jf.workers.dev/`
- **Vercel**: `https://jewelry-ec-xxxxx.vercel.app`（自動生成）

両方同時に存在可能ですが、Vercelを使用する場合は、VercelのURLを使用してください。

---

## 💡 メリット

### Vercelを使うメリット

- ✅ **無料でサーバーサイドコードが動作**
- ✅ **自動デプロイ**（GitHubにプッシュするだけ）
- ✅ **無料のカスタムドメイン**
- ✅ **自動HTTPS**
- ✅ **グローバルCDN**
- ✅ **Stripe実装が簡単**

---

## 📚 参考リンク

- Vercel公式: https://vercel.com
- Vercelドキュメント: https://vercel.com/docs
- Stripe統合: https://stripe.com/docs/payments/checkout
