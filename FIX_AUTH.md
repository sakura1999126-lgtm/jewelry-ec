# 🔧 認証エラーの修正方法

## 問題
現在、間違ったGitHubアカウント（sakura1114jf-cmd）で認証されていますが、リポジトリは別のアカウント（sakura1999126-lgtm）のものです。

## 解決方法: Personal Access Tokenを使う

### ステップ1: Personal Access Tokenを作成

1. **ブラウザで以下にアクセス**:
   https://github.com/settings/tokens/new

2. **設定**:
   - Note: `jewelry-ec-deploy`
   - Expiration: `90 days`（お好みで）
   - Select scopes: **`repo`** にチェック ✅

3. **「Generate token」をクリック**

4. **表示されたトークンをコピー**（`ghp_`で始まる文字列）
   - ⚠️ 一度しか表示されません！

### ステップ2: リモートURLを更新（トークンを含める）

ターミナルで以下を実行（`YOUR_TOKEN`をコピーしたトークンに置き換え）:

```bash
cd /Users/sakurairintaro/jewelry-ec
git remote set-url origin https://YOUR_TOKEN@github.com/sakura1999126-lgtm/jewelry-ec.git
git push -u origin main
```

または、トークンを直接入力する方法:

```bash
cd /Users/sakurairintaro/jewelry-ec
git push -u origin main
```

プロンプトが表示されたら:
- Username: `sakura1999126-lgtm`
- Password: コピーしたPersonal Access Tokenを貼り付け

---

## 別の方法: GitHub CLIで認証

1. **ターミナルで**:
   ```bash
   gh auth login
   ```

2. **以下のように選択**:
   - `GitHub.com`
   - `HTTPS`
   - `Login with a web browser`
   - ブラウザでコードを入力して認証

3. **認証後、プッシュ**:
   ```bash
   cd /Users/sakurairintaro/jewelry-ec
   git push -u origin main
   ```

---

## ✅ 成功したら

Cloudflare Pagesでデプロイを続けます！

