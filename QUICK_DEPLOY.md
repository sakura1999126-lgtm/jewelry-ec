# 🚀 無料サーバー（Render）で公開する簡単手順

## ✅ Renderの特徴
- ✅ **永久無料** - 制限内で無料で使い続けられます
- ⚠️ **スリープあり** - 15分間非アクティブでスリープ（最初のアクセスが少し遅い）
- ✅ **HTTPS自動** - セキュリティも完璧
- ✅ **Node.js対応** - 現在のコードをそのまま使えます

---

## 📋 3ステップで公開！

### ステップ1: GitHubにアップロード

ターミナルで以下を実行：

```bash
cd /Users/sakurairintaro/jewelry-ec
git init
git add .
git commit -m "Initial commit"
```

次に、GitHubで：
1. https://github.com にログイン
2. 右上の「+」→「New repository」をクリック
3. リポジトリ名: `jewelry-ec`（任意）
4. 「Create repository」をクリック
5. 表示されるコマンドを実行：

```bash
git remote add origin https://github.com/あなたのユーザー名/jewelry-ec.git
git branch -M main
git push -u origin main
```

### ステップ2: Renderでデプロイ

1. https://render.com にアクセス
2. 「Get Started for Free」→「Continue with GitHub」でログイン
3. 「New +」→「Web Service」をクリック
4. GitHubリポジトリ「jewelry-ec」を選択
5. 以下の設定を入力：
   - **Name**: `jewelry-ec`（任意の名前）
   - **Environment**: `Node`
   - **Build Command**: （空白のまま）
   - **Start Command**: `node server.js`
   - **Plan**: `Free`
6. 「Create Web Service」をクリック
7. 数分待つ（初回ビルドには少し時間がかかります）

### ステップ3: URLをシェア！

デプロイ完了後、以下のようなURLが表示されます：
```
https://jewelry-ec.onrender.com
```

このURLを友達にシェアできます！🎉

**注意**: 15分間アクセスがないとスリープします。最初のアクセス時に30秒程度かかる場合があります。

---

## 🔄 コードを更新する場合

```bash
git add .
git commit -m "Update"
git push
```

Renderが自動的に再デプロイします。

---

## 💡 スリープを防ぐ方法（オプション）

無料プランでは15分間非アクティブでスリープしますが、以下の方法で回避できます：

1. **UptimeRobot（無料）**を使う
   - https://uptimerobot.com に登録
   - 5分ごとにサイトにアクセスするように設定
   - これで常に起動状態を保てます

2. **有料プランにアップグレード**（$7/月）
   - スリープなし
   - より多くのリソース

---

## ⚠️ 注意点

- 大きな動画ファイル（100MB以上）はGitHubにアップロードしないでください
- 動画が大きい場合は、Cloudinaryなどの外部サービスを使うことをおすすめします

---

## 🎉 完了！

これで無料でサイトが公開されます！
URLは永久にアクセス可能です（スリープ時は少し時間がかかります）。
