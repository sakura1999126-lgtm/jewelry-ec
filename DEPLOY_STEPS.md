# 無料サーバーで公開する手順（Vercel - 永久無料、スリープなし）

## ✅ Vercelの特徴
- **永久無料**（制限内で）
- **スリープなし** - 常に高速アクセス可能
- **HTTPS自動** - セキュリティも完璧
- **月間100GB帯域幅** - 小規模サイトなら十分

---

## 📋 デプロイ手順

### ステップ1: GitHubにアップロード

#### 1-1. Gitリポジトリを初期化（まだの場合）
```bash
cd /Users/sakurairintaro/jewelry-ec
git init
git add .
git commit -m "Initial commit"
```

#### 1-2. GitHubでリポジトリを作成
1. https://github.com にログイン
2. 右上の「+」→「New repository」をクリック
3. リポジトリ名を入力（例: `jewelry-ec`）
4. 「Public」または「Private」を選択
5. 「Create repository」をクリック

#### 1-3. コードをプッシュ
GitHubで表示されるコマンドを実行：

```bash
git remote add origin https://github.com/あなたのユーザー名/jewelry-ec.git
git branch -M main
git push -u origin main
```

### ステップ2: Vercelでデプロイ

#### 2-1. Vercelにアクセス
1. https://vercel.com にアクセス
2. 「Sign Up」→「Continue with GitHub」をクリック
3. GitHubアカウントでログイン

#### 2-2. プロジェクトをインポート
1. 「Add New...」→「Project」をクリック
2. GitHubリポジトリから「jewelry-ec」を選択
3. 「Import」をクリック

#### 2-3. 設定（そのままでOK）
- Framework Preset: Other
- Root Directory: ./
- Build Command: （空白のまま）
- Output Directory: （空白のまま）
- Install Command: （空白のまま）

#### 2-4. デプロイ実行
1. 「Deploy」をクリック
2. 1-2分待つ

#### 2-5. URL確認
デプロイ完了後、以下のようなURLが表示されます：
```
https://jewelry-ec-xxxxx.vercel.app
```

このURLを友達にシェアできます！

---

## 🔄 更新方法

コードを更新したら：

```bash
git add .
git commit -m "Update site"
git push
```

Vercelが自動的に再デプロイしてくれます。

---

## 🌐 カスタムドメイン（オプション）

無料でもカスタムドメインを設定できます：
1. Vercelのプロジェクトページ → Settings → Domains
2. ドメイン名を入力
3. DNS設定を指示に従って変更

---

## ⚠️ 注意事項

1. **動画ファイルが大きい場合**
   - GitHubには100MB以下のファイルを推奨
   - 動画が大きい場合は、Cloudinaryなどの外部サービスを使用

2. **環境変数（今後Stripeを使う場合）**
   - Vercelのプロジェクト設定 → Environment Variables で設定
   - 公開されないよう注意

---

## 💡 トラブルシューティング

### デプロイが失敗する場合
- `package.json`が正しく配置されているか確認
- `server.js`がルートにあるか確認

### サイトが表示されない場合
- ビルドログを確認（Vercelのダッシュボード）
- `vercel.json`の設定を確認

---

## 🎉 完了！

これで永久無料でサイトが公開されます！
URLをブックマークして、いつでもアクセスできます。

