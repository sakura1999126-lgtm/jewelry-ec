# Supabaseに商品・画像を追加する方法（超簡単ガイド）

## 📦 商品を追加する方法

### 方法1: Table Editorから追加（一番簡単！）

#### ステップ1: Table Editorを開く
1. Supabaseダッシュボードにログイン
2. プロジェクト「jewelry-ec」を選択
3. 左メニューの「Table Editor」をクリック
4. 「products」テーブルをクリック

#### ステップ2: 商品を追加
1. 右上の「+ Insert row」ボタンをクリック
2. 以下の情報を入力：

| 項目 | 説明 | 例 |
|------|------|-----|
| **id** | 商品ID（ユニークな文字列） | `prod_earring_005` |
| **name** | 商品名 | `ダイヤモンドイヤリング` |
| **category** | カテゴリ | `earrings`（イヤリング）<br>`necklace`（ネックレス）<br>`bracelet`（ブレスレット） |
| **price** | 価格（数値のみ） | `29900` |
| **currency** | 通貨 | `JPY` |
| **image** | メイン画像URL | `https://example.com/image.jpg` |
| **description** | 商品説明（短い） | `10Kゴールドの美しいイヤリング` |
| **detailed_description** | 詳細説明（長い） | `素材や特徴の詳細説明...` |
| **stock** | 在庫数 | `10` |

3. 「Save」ボタンをクリック

#### ステップ3: サイズを追加（サイズがある場合）
1. 「product_sizes」テーブルをクリック
2. 「+ Insert row」をクリック
3. 以下を入力：
   - **product_id**: 商品ID（例: `prod_earring_005`）
   - **name**: サイズ名（例: `S (直径15mm)`）
   - **price**: 価格（例: `29900`）
   - **stock**: 在庫数（例: `5`）
4. 「Save」をクリック

#### ステップ4: 画像を追加（複数画像がある場合）
1. 「product_images」テーブルをクリック
2. 「+ Insert row」をクリック
3. 以下を入力：
   - **product_id**: 商品ID（例: `prod_earring_005`）
   - **image_url**: 画像URL（例: `https://example.com/image1.jpg`）
   - **display_order**: 表示順（例: `0`が最初）
4. 「Save」をクリック
5. 他の画像も同様に追加

---

### 方法2: CSVファイルから一括インポート（商品が多い場合）

#### ステップ1: CSVファイルを作成
ExcelやGoogleスプレッドシートで以下の形式で作成：

```csv
id,name,category,price,currency,image,description,stock
prod_earring_005,ダイヤモンドイヤリング,earrings,29900,JPY,https://example.com/image.jpg,10Kゴールドの美しいイヤリング,10
prod_necklace_006,ゴールドネックレス,necklace,49900,JPY,https://example.com/necklace.jpg,14Kゴールドのネックレス,5
```

#### ステップ2: Supabaseにインポート
1. Table Editorで「products」テーブルを開く
2. 右上の「Import data」をクリック
3. CSVファイルを選択
4. インポート設定を確認して「Import」をクリック

---

## 🖼️ 画像を追加する方法

### 画像の保存場所

#### オプション1: 外部ストレージ（推奨）
- **Cloudflare R2**（無料プランあり）
- **AWS S3**
- **Google Cloud Storage**
- **画像ホスティングサービス**（Imgur、Cloudinaryなど）

#### オプション2: Supabase Storage（簡単！）
1. Supabaseダッシュボードで「Storage」をクリック
2. 「Create bucket」をクリック
3. バケット名を入力（例: `product-images`）
4. 「Public bucket」にチェックを入れる
5. 画像をアップロード
6. 画像URLをコピーして商品データに貼り付け

---

## 📝 実際の手順（具体例）

### 例：新しいイヤリングを追加する

1. **Supabase Table Editorを開く**
   - 「products」テーブルをクリック

2. **商品を追加**
   ```
   id: prod_earring_006
   name: パールイヤリング
   category: earrings
   price: 19900
   currency: JPY
   image: https://example.com/pearl-earring.jpg
   description: 上品なパールのイヤリング
   stock: 8
   ```

3. **画像をアップロード**
   - Supabase Storageに画像をアップロード
   - または外部ストレージにアップロード
   - 画像URLをコピー

4. **画像URLを設定**
   - 「image」カラムに画像URLを貼り付け
   - 複数画像がある場合は「product_images」テーブルにも追加

5. **保存**
   - 「Save」をクリック

6. **確認**
   - サイトを開いて商品が表示されるか確認

---

## ✅ チェックリスト

商品を追加する際の確認項目：

- [ ] 商品IDがユニークか（重複していないか）
- [ ] 商品名が入力されている
- [ ] カテゴリが正しい（`earrings`、`necklace`、`bracelet`のいずれか）
- [ ] 価格が数値で入力されている
- [ ] 画像URLが正しい（画像が表示されるか確認）
- [ ] 在庫数が入力されている

---

## 🎯 まとめ

**Supabaseに商品を追加するのは超簡単！**

1. **Table Editorを開く**（3クリック）
2. **「+ Insert row」をクリック**（1クリック）
3. **情報を入力**（コピペでOK）
4. **「Save」をクリック**（1クリック）

**たったこれだけ！** Excelやスプレッドシートを使うのと同じ感覚です。

---

## 💡 便利な機能

### 商品を一括編集
- Table Editorで複数の商品を選択して一括編集可能

### 商品を検索
- Table Editorの上部に検索ボックスがある
- 商品名やIDで検索可能

### 商品を削除
- 商品の行を選択して「Delete」ボタンをクリック

---

## ❓ よくある質問

### Q: 画像はどこに保存すればいい？
A: Supabase Storage（無料プランあり）または外部ストレージ（Cloudflare R2など）がおすすめです。

### Q: 商品を削除しても大丈夫？
A: はい。削除するとサイトからも消えます。注文履歴には残ります。

### Q: 在庫数を自動で減らすことはできる？
A: はい。注文が入ると自動で在庫が減るように実装できます（今後実装予定）。

### Q: 商品を一括で追加したい
A: CSVファイルからインポートできます（Table Editorの「Import data」から）。

---

**商品追加は本当に簡単です！** 試してみてください。
