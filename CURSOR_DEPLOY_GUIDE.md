# 🚀 CursorでCloudflare Pagesにデプロイする手順

## ✅ CursorのGit機能を使ってGitHubにアップロード

### ステップ1: CursorでGitを初期化

1. **Cursorの左サイドバーで「Source Control」アイコンをクリック**（Ctrl+Shift+G / Cmd+Shift+G）

2. **「Initialize Repository」をクリック**
   - または、ターミナルで `git init` を実行

### ステップ2: ファイルをステージング

1. **Source Controlパネルで「+」ボタンをクリック**（すべてのファイルをステージング）
   - または、各ファイルの横の「+」をクリックして個別に追加

2. **コミットメッセージを入力**（例: "Initial commit"）

3. **「✓ Commit」ボタンをクリック**

### ステップ3: GitHubリポジトリを作成

1. **ブラウザで https://github.com にアクセスしてログイン**

2. **右上の「+」→「New repository」をクリック**

3. **リポジトリ名**: `jewelry-ec`（任意の名前）

4. **「Create repository」をクリック**

5. **表示されたURLをコピー**（例: `https://github.com/あなたのユーザー名/jewelry-ec.git`）

### ステップ4: CursorでGitHubにプッシュ

1. **CursorのSource Controlパネルで「...」（三点リーダー）をクリック**

2. **「Remote」→「Add Remote...」を選択**

3. **Remote name**: `origin`

4. **Remote URL**: ステップ3でコピーしたURLを貼り付け

5. **「✓」をクリック**

6. **「...」→「Push」→「origin」を選択**

7. **ブランチ名を入力**（例: `main`）

8. **プッシュが完了するまで待つ**

---

## 🌐 Cloudflare Pagesでデプロイ

### ステップ1: Cloudflareアカウント作成

1. **ブラウザで https://dash.cloudflare.com/sign-up にアクセス**

2. **メールアドレスでアカウント作成**（無料）

### ステップ2: Pagesプロジェクト作成

1. **Cloudflareダッシュボード左側の「Pages」をクリック**

2. **「Create a project」→「Connect to Git」をクリック**

3. **「Continue with GitHub」をクリック**

4. **GitHubアカウントでログイン**

5. **リポジトリ「jewelry-ec」を選択**

6. **「Begin setup」をクリック**

### ステップ3: プロジェクト設定

1. **Project name**: `jewelry-ec`（任意の名前）

2. **Production branch**: `main`

3. **Framework preset**: `None`（または選択しない）

4. **Build command**: （空白のまま）

5. **Build output directory**: （空白のまま）

6. **「Save and Deploy」をクリック**

### ステップ4: デプロイ完了

1. **1-2分待つ**（デプロイが完了します）

2. **表示されたURLを確認**（例: `https://jewelry-ec.pages.dev`）

3. **このURLを友達にシェア！** 🎉

---

## 🔄 コードを更新する場合（Cursorで）

### 更新手順

1. **ファイルを編集**

2. **Source Controlパネルを開く**（Ctrl+Shift+G / Cmd+Shift+G）

3. **変更されたファイルをステージング**（「+」ボタンをクリック）

4. **コミットメッセージを入力**（例: "Update design"）

5. **「✓ Commit」をクリック**

6. **「...」→「Push」→「origin」をクリック**

7. **Cloudflare Pagesが自動的に再デプロイします**（30秒以内）

---

## 💡 Cursorの便利なショートカット

- **Source Control**: `Ctrl+Shift+G`（Mac: `Cmd+Shift+G`）
- **コミット**: `Ctrl+Enter`（Mac: `Cmd+Enter`）
- **ターミナル**: `` Ctrl+` ``（Mac: `` Cmd+` ``）

---

## ⚠️ 注意点

1. **動画ファイルが大きい場合**
   - GitHubには100MB以下のファイルを推奨
   - 動画が大きい場合は、Cloudflare R2などの外部サービスを使用

2. **初回デプロイ時**
   - デプロイが完了するまで1-2分かかることがあります
   - ビルドログでエラーがないか確認してください

---

## 🎉 完了！

これで永久無料・スリープなし・超高速でサイトが公開されます！

