# 🔐 GitHubへのプッシュ手順

## 現在の状況
- ✅ Gitリポジトリは初期化済み
- ✅ コミット済み
- ✅ リモートリポジトリは設定済み
- ⚠️ 認証が必要です

## 認証エラーの解決方法

認証エラーが出ているため、以下のいずれかの方法で認証してください。

---

## 方法1: GitHub CLIを使う（推奨・簡単）

### ステップ1: GitHub CLIでログイン

ターミナルで以下を実行:

```bash
gh auth login
```

1. **GitHub.com** を選択
2. **HTTPS** を選択
3. **Login with a web browser** を選択（または認証トークンを入力）
4. ブラウザで認証

### ステップ2: プッシュ

```bash
cd /Users/sakurairintaro/jewelry-ec
git push -u origin main
```

---

## 方法2: Personal Access Tokenを使う

### ステップ1: Personal Access Tokenを作成

1. GitHubにログイン
2. 右上のアイコン → **Settings**
3. 左側の **Developer settings**
4. **Personal access tokens** → **Tokens (classic)**
5. **Generate new token (classic)**
6. **Note**: `jewelry-ec-deploy`（任意の名前）
7. **Expiration**: 90 days（または任意）
8. **Select scopes**: `repo` にチェック
9. **Generate token** をクリック
10. **トークンをコピー**（一度しか表示されません！）

### ステップ2: プッシュ

ターミナルで以下を実行:

```bash
cd /Users/sakurairintaro/jewelry-ec
git push -u origin main
```

パスワードを求められたら、**Personal Access Tokenを貼り付け**してください。

---

## 方法3: SSHを使う（既にSSHキーを設定している場合）

### ステップ1: リモートURLをSSHに変更

```bash
cd /Users/sakurairintaro/jewelry-ec
git remote set-url origin git@github.com:sakura1999126-lgtm/jewelry-ec.git
```

### ステップ2: プッシュ

```bash
git push -u origin main
```

---

## ✅ プッシュが成功したら

Cloudflare Pagesダッシュボードで:

1. **「Create a project」をクリック**
2. **「Connect to Git」をクリック**
3. **「Continue with GitHub」をクリック**
4. **リポジトリ「jewelry-ec」を選択**
5. **「Begin setup」をクリック**
6. **設定**:
   - Framework preset: `None`（空白）
   - Build command: （空白）
   - Build output directory: （空白）
7. **「Save and Deploy」をクリック**

完了です！🎉

