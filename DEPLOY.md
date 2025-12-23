# デプロイガイド - 無料サーバーでサイトを公開する方法

## 方法1: Vercel（推奨 - 最も簡単）

### 手順

1. **GitHubにコードをアップロード**
   ```bash
   # まだGitリポジトリを初期化していない場合
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **GitHubリポジトリを作成**
   - GitHubにログイン
   - 新しいリポジトリを作成（例: `jewelry-ec`）
   - リポジトリを作成した後、表示されるコマンドを実行してコードをプッシュ

3. **Vercelでデプロイ**
   - https://vercel.com にアクセス
   - GitHubアカウントでログイン
   - "New Project"をクリック
   - 先ほど作成したリポジトリを選択
   - "Deploy"をクリック
   - 数分でデプロイが完了します！

4. **URLを友達にシェア**
   - デプロイが完了すると、`https://your-project-name.vercel.app` のようなURLが発行されます
   - このURLを友達にシェアできます

---

## 方法2: Render（Node.jsサーバーに最適）

### 手順

1. **GitHubにコードをアップロード**（方法1と同じ）

2. **Renderでデプロイ**
   - https://render.com にアクセス
   - GitHubアカウントでログイン
   - "New +" → "Web Service"を選択
   - リポジトリを選択
   - 設定:
     - **Name**: jewelry-ec（任意の名前）
     - **Environment**: Node
     - **Build Command**: （空白のまま）
     - **Start Command**: `node server.js`
     - **Plan**: Free
   - "Create Web Service"をクリック

3. **環境変数の設定（必要に応じて）**
   - Renderのダッシュボードで、Environment タブを開く
   - `PORT` は自動で設定されるので追加不要

4. **URLを友達にシェア**
   - `https://your-project-name.onrender.com` のようなURLが発行されます

---

## 方法3: Netlify（静的サイトとして - APIはNetlify Functionsを使用）

Netlifyは主に静的サイト用ですが、APIエンドポイントはNetlify Functionsで実装できます。
ただし、現在のコードを少し変更する必要があります。

---

## 注意事項

1. **背景動画ファイル**
   - 大きな動画ファイルはGitHubにアップロードしない方が良い場合があります
   - 動画ファイルはGit LFSを使うか、別の場所（Cloudinaryなど）にアップロードすることを検討してください

2. **無料プランの制限**
   - Vercel: 月間100GB帯域、無制限のデプロイ
   - Render: 15分間非アクティブでスリープ（最初のアクセス時に少し時間がかかる場合あり）

3. **カスタムドメイン**
   - 両方のサービスで無料でカスタムドメインを設定できます

---

## トラブルシューティング

### ポート番号のエラー
- `server.js`は既に`process.env.PORT`を使用するように修正済みなので問題ありません

### 静的ファイルが見つからない
- `public`フォルダ内のファイルが正しく配信されているか確認してください

### APIエンドポイントが動作しない
- `/api/products`などのエンドポイントが正しく動作しているか確認してください

