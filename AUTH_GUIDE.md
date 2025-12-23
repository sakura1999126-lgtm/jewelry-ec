# 🔐 GitHub認証ガイド

## 方法1: GitHub CLIでブラウザ認証（推奨）

ブラウザが自動的に開きます。以下の手順に従ってください：

1. **ブラウザで表示されるコードを確認**（ターミナルにも表示されます）

2. **GitHubの認証ページでコードを入力**

3. **「Authorize github」をクリック**

4. **認証が完了したら、ターミナルに戻る**

5. **プッシュを実行**:
   ```bash
   cd /Users/sakurairintaro/jewelry-ec
   git push -u origin main
   ```

---

## 方法2: Personal Access Tokenを使う

ブラウザが開かない場合は、Personal Access Tokenを使います：

### ステップ1: Token作成ページを開く

ブラウザで以下にアクセス:
https://github.com/settings/tokens/new

### ステップ2: Tokenを設定

- **Note**: `jewelry-ec-deploy`
- **Expiration**: `90 days`
- **Select scopes**: `repo` にチェック ✅
- **「Generate token」をクリック**

### ステップ3: Tokenをコピー

表示されたトークン（`ghp_`で始まる文字列）をコピー

### ステップ4: プッシュ

ターミナルで:
```bash
cd /Users/sakurairintaro/jewelry-ec
git push -u origin main
```

- Username: `sakura1999126-lgtm`
- Password: コピーしたTokenを貼り付け

---

## ✅ プッシュ成功後

Cloudflare Pagesで:
1. 「Create a project」
2. 「Connect to Git」→「Continue with GitHub」
3. リポジトリ「jewelry-ec」を選択
4. 設定（全て空白のまま）
5. 「Save and Deploy」

完了です！🎉

