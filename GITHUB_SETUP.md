# GitHubリポジトリ確認・設定ガイド

## ✅ 現在の状態

リポジトリは既に設定されています：
- **リポジトリURL**: `https://github.com/sakura1999126-lgtm/jewelry-ec`
- **リモート**: `origin` に設定済み
- **ブランチ**: `main` で同期済み

---

## 🔍 GitHubで確認する方法

### ステップ1: GitHubでリポジトリを確認

1. **ブラウザで以下のURLにアクセス**:
   ```
   https://github.com/sakura1999126-lgtm/jewelry-ec
   ```

2. **確認すること**:
   - ✅ リポジトリが存在するか
   - ✅ プライベートかパブリックか
   - ✅ ファイルがアップロードされているか

---

## 🔓 リポジトリを公開する（パブリックにする）

### Renderデプロイにはパブリックリポジトリが必要

1. **GitHubでリポジトリを開く**
   - https://github.com/sakura1999126-lgtm/jewelry-ec

2. **「Settings」タブをクリック**（リポジトリの右上）

3. **ページの一番下までスクロール**

4. **「Danger Zone」セクションを見つける**

5. **「Change visibility」をクリック**

6. **「Change to public」を選択**

7. **確認画面でリポジトリ名を入力**

8. **「I understand, change repository visibility.」をクリック**

---

## 📤 もしリポジトリが存在しない場合

### 新しいリポジトリを作成

1. **GitHubで https://github.com/new にアクセス**

2. **リポジトリ情報を入力**:
   - **Repository name**: `jewelry-ec`
   - **Description**: `ジュエリーECサイト`
   - **Public** を選択（Renderデプロイに必要）
   - ✅ **Add a README file** のチェックを**外す**（既にファイルがあるため）

3. **「Create repository」をクリック**

4. **既存のリポジトリをプッシュ**（ターミナルで実行）:
   ```bash
   cd /Users/sakurairintaro/jewelry-ec
   git remote set-url origin https://github.com/sakura1999126-lgtm/jewelry-ec.git
   git push -u origin main
   ```

---

## 🔄 リモートリポジトリを変更する場合

### 新しいリポジトリURLを設定

```bash
# 現在のリモートを確認
git remote -v

# リモートURLを変更
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# プッシュ
git push -u origin main
```

---

## ✅ 確認チェックリスト

### GitHubリポジトリが準備できているか確認

- [ ] リポジトリが存在する
- [ ] リポジトリが**パブリック**である（Renderデプロイに必要）
- [ ] ファイルがアップロードされている（`index.html`, `server.js` など）
- [ ] `render.yaml` がリポジトリにある

---

## 🚀 次のステップ

GitHubリポジトリが準備できたら、`RENDER_DEPLOY.md` の手順に従ってRenderにデプロイしてください。

---

## 💡 よくある質問

### Q: プライベートリポジトリではRenderにデプロイできない？
A: プライベートリポジトリでも可能ですが、Renderの無料プランでは制限があります。パブリックリポジトリの方が簡単です。

### Q: リポジトリが見つからない？
A: 別のアカウントでログインしている可能性があります。正しいアカウント（`sakura1999126-lgtm`）でログインしているか確認してください。

### Q: ファイルがアップロードされていない？
A: 以下のコマンドでプッシュしてください：
```bash
git push origin main
```
