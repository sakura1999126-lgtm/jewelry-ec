# 🚀 Cloudflare Pagesで公開する手順（永久無料・スリープなし・超高速）

## ✅ Cloudflare Pagesの特徴（永久無料）
- ✅ **スリープなし** - 常に超高速アクセス可能
- ✅ **永久無料** - 無制限の帯域幅・無制限のビルド
- ✅ **HTTPS自動** - セキュリティも完璧
- ✅ **超高速CDN** - 世界中で高速アクセス可能
- ✅ **無制限の帯域幅** - アクセス数に制限なし

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

### ステップ2: Cloudflare Pagesでデプロイ

1. **Cloudflareアカウント作成**
   - https://dash.cloudflare.com/sign-up にアクセス
   - メールアドレスでアカウント作成（無料）

2. **Pagesにアクセス**
   - ダッシュボード左側の「Pages」をクリック
   - 「Create a project」→「Connect to Git」をクリック

3. **GitHub連携**
   - 「Continue with GitHub」をクリック
   - GitHubアカウントでログイン
   - リポジトリ「jewelry-ec」を選択して「Begin setup」

4. **プロジェクト設定**
   - **Project name**: `jewelry-ec`（任意）
   - **Production branch**: `main`
   - **Framework preset**: `None`（または空欄のまま）
   - **Build command**: （空白のまま）
   - **Build output directory**: （空白のまま）
   - 「Save and Deploy」をクリック

5. **デプロイ完了を待つ**
   - 1-2分でデプロイが完了します

### ステップ3: URLをシェア！

デプロイ完了後、以下のようなURLが表示されます：
```
https://jewelry-ec.pages.dev
```

このURLを友達にシェアできます！🎉

---

## 🔄 コードを更新する場合

```bash
git add .
git commit -m "Update"
git push
```

Cloudflare Pagesが自動的に再デプロイします（通常30秒以内）。

---

## 🌐 カスタムドメイン（オプション）

無料でもカスタムドメインを設定できます：
1. プロジェクトページ →「Custom domains」
2. 「Set up a custom domain」をクリック
3. ドメイン名を入力
4. DNS設定を指示に従って変更（Cloudflareにドメインを移管する場合、DNS設定は自動）

---

## ⚠️ 注意点

1. **動画ファイルが大きい場合**
   - GitHubには100MB以下のファイルを推奨
   - 動画が大きい場合は、Cloudflare R2（ストレージサービス）を使用することをおすすめします

2. **静的ファイルのみ**
   - Cloudflare Pagesは静的サイトホスティングなので、`server.js`は動作しません
   - 商品データは`products.json`を直接読み込むように変更済みです

---

## 🎉 完了！

これで永久無料・スリープなし・超高速でサイトが公開されます！
URLは永久にアクセス可能です。

---

## 📊 他のサービスとの比較

| サービス | スリープ | 帯域幅 | 速度 | おすすめ度 |
|---------|---------|--------|------|-----------|
| **Cloudflare Pages** | ❌ なし | ✅ 無制限 | ⚡ 超高速 | ★★★★★ |
| Vercel | ❌ なし | ⚠️ 100GB/月 | ⚡ 高速 | ★★★★☆ |
| Render | ⚠️ 15分でスリープ | ✅ 無制限 | 🐌 初回遅い | ★★★☆☆ |

**Cloudflare Pagesが最もおすすめです！**

