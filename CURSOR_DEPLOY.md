# 🚀 Cursorだけでデプロイする手順

## 📋 CursorのSource Control機能を使う

### ステップ1: Gitリポジトリを初期化（Cursorで）

1. **Cursorでコマンドパレットを開く**
   - Mac: `Cmd + Shift + P`
   - Windows/Linux: `Ctrl + Shift + P`

2. **「Git: Initialize Repository」と入力して実行**

3. **プロジェクトフォルダを選択**（`jewelry-ec`フォルダ）

### ステップ2: ファイルをコミット（Cursorで）

1. **左サイドバーのSource Controlアイコンをクリック**（Gitアイコン）
   - または `Cmd + Shift + G`（Mac）/ `Ctrl + Shift + G`（Windows）

2. **「+」ボタンをクリック**（すべてのファイルをステージング）

3. **コミットメッセージを入力**（例: "Initial commit"）

4. **「✓ Commit」ボタンをクリック**

### ステップ3: GitHubリポジトリを作成（ブラウザで）

1. https://github.com にアクセスしてログイン

2. 右上の「+」→「New repository」

3. リポジトリ名: `jewelry-ec`

4. 「Create repository」をクリック

5. **URLをコピー**（例: `https://github.com/あなたのユーザー名/jewelry-ec.git`）

### ステップ4: GitHubにプッシュ（Cursorで）

#### 方法A: コマンドパレットから

1. **コマンドパレットを開く**（`Cmd + Shift + P` / `Ctrl + Shift + P`）

2. **「Git: Add Remote」と入力**

3. **Remote name**: `origin`

4. **Remote URL**: ステップ3でコピーしたURLを貼り付け

5. **コマンドパレットで「Git: Push」と入力**

6. **「origin」を選択**

7. **ブランチ名**: `main`（または `master`）

#### 方法B: Source Controlパネルから

1. **Source Controlパネル下部の「...」（三点リーダー）をクリック**

2. **「Remote」→「Add Remote...」**

3. **Remote name**: `origin`、URLを入力

4. **「...」→「Push」→「origin」を選択**

---

## 🌐 Cloudflare Pagesでデプロイ（ブラウザで）

### ステップ1: Cloudflareアカウント作成

1. https://dash.cloudflare.com/sign-up にアクセス
2. メールアドレスでアカウント作成（無料）

### ステップ2: Pagesプロジェクト作成

1. ダッシュボード左側の「Pages」をクリック
2. 「Create a project」→「Connect to Git」
3. 「Continue with GitHub」でログイン
4. リポジトリ「jewelry-ec」を選択
5. 「Begin setup」をクリック

### ステップ3: 設定

- **Project name**: `jewelry-ec`
- **Production branch**: `main`
- **Framework preset**: `None`（空白）
- **Build command**: （空白）
- **Build output directory**: （空白）
- **「Save and Deploy」をクリック**

### ステップ4: 完了！

1-2分でデプロイ完了。URLが表示されます：
```
https://jewelry-ec.pages.dev
```

このURLをシェアできます！🎉

---

## 🔄 更新する場合（Cursorで）

1. **ファイルを編集**
2. **Source Controlパネルを開く**（`Cmd + Shift + G`）
3. **変更ファイルをステージング**（「+」ボタン）
4. **コミットメッセージを入力**
5. **「✓ Commit」をクリック**
6. **「...」→「Push」をクリック**
7. **Cloudflare Pagesが自動再デプロイ**（約30秒）

---

## 💡 Cursorの便利なショートカット

- **Source Control**: `Cmd + Shift + G`（Mac）/ `Ctrl + Shift + G`（Win）
- **コマンドパレット**: `Cmd + Shift + P`（Mac）/ `Ctrl + Shift + P`（Win）
- **コミット**: `Cmd + Enter`（コミットメッセージ入力後）

---

## ✅ 完了！

これで永久無料・スリープなし・超高速で公開されます！

