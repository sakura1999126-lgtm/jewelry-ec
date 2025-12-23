# 🔧 Cloudflare Pages デプロイ修正

## 修正内容

### 1. パス修正
- `/public/images/` → `/images/`
- `/public/videos/` → `/videos/`

Cloudflare Pagesでは`public`フォルダの中身がルートに配置されるため、パスから`/public`を削除しました。

### 2. リダイレクト設定
`_redirects`ファイルを追加して、すべてのルートを`index.html`にリダイレクトするように設定しました（SPA対応）。

---

## ⚠️ 重要な設定確認

Cloudflare Pagesダッシュボードで以下を確認してください：

### Build設定
- **Framework preset**: `None`（空白）
- **Build command**: （**空白**）
- **Build output directory**: （**空白**）
- **Root directory**: （**空白**）

### ⚠️ Deploy commandが設定されていないか確認
- 「Deploy command」フィールドが表示されている場合、**空白にしてください**

---

## 📁 ファイル構造

Cloudflare Pagesにデプロイする際、以下の構造になります：

```
/
├── index.html
├── checkout.html
├── script.js
├── styles.css
├── products.json
├── _redirects
├── images/
│   └── IMG_7300.png
└── videos/
    └── background-video.mp4
```

---

## ✅ 次のステップ

1. **変更をコミット&プッシュ**:
   ```bash
   git add .
   git commit -m "Fix paths for Cloudflare Pages"
   git push
   ```

2. **Cloudflare Pagesで再デプロイ**
   - 自動的に再デプロイされるはずです
   - または手動で「Retry deployment」をクリック

3. **デプロイが成功したら確認**
   - URLが表示されます（例: `https://jewelry-ec.pages.dev`）

