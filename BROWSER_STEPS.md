# 🌐 ブラウザでGitHub認証する手順

## 最も簡単な方法: Personal Access Token

### ステップ1: Personal Access Tokenを作成

1. **新しいタブで https://github.com/settings/tokens にアクセス**
   - ログインが必要な場合はログインしてください

2. **「Generate new token」→「Generate new token (classic)」をクリック**

3. **設定を入力**:
   - **Note**: `jewelry-ec-deploy`（任意の名前）
   - **Expiration**: `90 days`（お好みで変更可）
   - **Select scopes**: 下にスクロールして **`repo`** にチェック ✅
     - これで全てのリポジトリへのアクセス権限が付与されます

4. **ページ最下部の「Generate token」をクリック**

5. **表示されたトークンをコピー**
   - ⚠️ **重要**: このトークンは一度しか表示されません！
   - 必ずコピーして安全な場所に保存してください
   - 例: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### ステップ2: ターミナルでプッシュ

トークンをコピーしたら、Cursorのターミナル（`` Cmd + Shift + ` ``）で以下を実行:

```bash
cd /Users/sakurairintaro/jewelry-ec
git push -u origin main
```

**Username**: `sakura1999126-lgtm` を入力  
**Password**: コピーしたPersonal Access Tokenを貼り付け

これでプッシュできます！

---

## 代替方法: GitHub CLIで認証（対話的）

もしGitHub CLIを使いたい場合:

1. **ターミナルで以下を実行**:
   ```bash
   gh auth login
   ```

2. **表示される指示に従う**:
   - `GitHub.com` を選択
   - `HTTPS` を選択
   - `Login with a web browser` を選択
   - コードが表示されるので、そのコードをコピー
   - ブラウザが開くので、コードを入力して認証
   - 「Authorize GitHub CLI」をクリック

3. **認証後、プッシュ**:
   ```bash
   cd /Users/sakurairintaro/jewelry-ec
   git push -u origin main
   ```

---

## ✅ プッシュ成功後の次のステップ

1. **Cloudflare Pagesダッシュボードに戻る**
   - https://dash.cloudflare.com/5357b339f87312a8e265dd6f09d2d41c/workers-and-pages

2. **「Create a project」をクリック**

3. **「Connect to Git」→「Continue with GitHub」**

4. **リポジトリ「jewelry-ec」を選択**

5. **設定**:
   - Framework preset: `None`（空白のまま）
   - Build command: （空白のまま）
   - Build output directory: （空白のまま）

6. **「Save and Deploy」をクリック**

7. **1-2分待つと、URLが表示されます！**

完了です！🎉

