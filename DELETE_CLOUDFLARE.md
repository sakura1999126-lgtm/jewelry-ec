# Cloudflare Pagesプロジェクトの削除手順

## 🗑️ プロジェクトを削除する方法

### ステップ1: Cloudflareダッシュボードにアクセス

1. **ブラウザで https://dash.cloudflare.com/ にアクセス**
2. **ログイン**（`sakura1114jf@gmail.com`）

### ステップ2: Workers & Pagesに移動

1. **左サイドバーから「Workers & Pages」をクリック**
2. **「Pages」をクリック**（「Workers」ではない）

### ステップ3: プロジェクトを選択

1. **プロジェクト一覧から「jewelry-ec」をクリック**
   - または `https://jewelry-ec.sakura1114jf.workers.dev/` のプロジェクト

### ステップ4: 設定画面を開く

1. **プロジェクトページの上部にある「Settings」タブをクリック**

### ステップ5: プロジェクトを削除

1. **ページを一番下までスクロール**
2. **「Danger Zone」セクションを見つける**（赤い背景のセクション）
3. **「Delete project」ボタンをクリック**
4. **確認画面でプロジェクト名を入力**: `jewelry-ec`
5. **「Delete」ボタンをクリック**

---

## ✅ 削除完了

これでCloudflare Pagesプロジェクトが削除されます。

---

## 📝 注意事項

- **削除すると元に戻せません**
- **URL（`https://jewelry-ec.sakura1114jf.workers.dev/`）は使用できなくなります**
- **Renderのサイト（`https://jewelry-ec.onrender.com`）は影響を受けません**

---

## 🔄 削除後

削除後は、Renderのサイトのみを使用します：

- **サイトURL**: `https://jewelry-ec.onrender.com`
- **サーバーサイドコード**: 動作中
- **APIエンドポイント**: 動作中

---

## 💡 削除しなくても問題ない場合

- Cloudflare Pagesプロジェクトは無料なので、削除しなくても問題ありません
- ただし、混乱を避けるために削除することをおすすめします
