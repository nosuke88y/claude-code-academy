# Claude Code Academy ビジネス職・エンジニアコース 品質レビューレポート

レビュー実施日: 2026-04-17
対象: BizLesson1〜18 / EngLesson1〜18（全36レッスン）
レビュアー: エージェントA（初心者役）/ B（技術レビュー）/ C（教育設計）

---

## 全体サマリー

| 優先度 | 件数 | 主な傾向 |
|--------|------|----------|
| **高** | 4件 | BizLesson7-9コンテンツ重複、ターミナル操作説明不足、nodeコマンド唐突 |
| **中** | 13件 | 未説明用語、Claude Code仕様の不正確さ、難易度ジャンプ、クイズ重複 |
| **低** | 18件 | 細かな用語補足、コード品質、トーン統一 |

---

## 最優先修正（高優先度 4件）

### [高-1] BizLesson7/8/9 コンテンツ重複・消失
- **指摘元**: B + C 一致
- **問題**: BizLesson8（本来ch3-l1「議事録・報告書の自動生成」）の内容がBizLesson9（ch3-l2「Excelデータ分析」）と完全に同一。議事録レッスンの内容が消失している
- **影響**: Ch.3が実質2レッスン+クイズになり、1レッスン分の学習内容が欠落
- **修正案**: BizLesson8を「議事録・報告書の自動生成」の正しい内容で再作成

### [高-2] BizLesson5 ターミナルの開き方が説明不足
- **指摘元**: A + C
- **問題**: 非エンジニア向けコースなのに「ターミナルを開いて」だけで具体手順がない
- **修正案**: 「Windowsキー→PowerShellと検索→起動」「Mac: Cmd+Space→Terminal」を追加

### [高-3] BizLesson6 Claude Code操作の基本説明がない
- **指摘元**: A
- **問題**: 入力後にEnterを押すこと、許可を求められたらYを押すことが未説明
- **修正案**: 操作手順（Enter送信・Y許可）を冒頭に追加

### [高-4] BizLesson15/16 nodeコマンド実行が唐突
- **指摘元**: A + C
- **問題**: Ch.4まではClaude Code内で完結していたが、Ch.5で突然`node daily-report.js`をターミナルで実行する。非エンジニアは混乱する
- **修正案**: 「Claude Codeに実行してもらう」方法を主軸にし、ターミナル実行は「補足」として記載

---

## 中優先度（13件）

### ビジネス職コース

| # | ファイル | 指摘元 | 指摘内容 | 修正案 |
|---|---------|--------|----------|--------|
| 1 | BizLesson2 | A | 「スクリプト」が未説明 | 「スクリプト（パソコンへの命令を書いたファイル）」と補足 |
| 2 | BizLesson5 | A | npm/グローバルインストール/-gが未説明 | 本文中に「npm = ソフト管理ツール」「-g = 全体で使えるオプション」を追加 |
| 3 | BizLesson5 | A | Mac向けHomebrewが唐突 | 「Homebrew（Mac用ソフト管理ツール）」補足、nodejs.org直ダウンロードを第一選択に |
| 4 | BizLesson6 | A | CSVファイルの保存場所・開き方が不明 | 「Claude Code起動フォルダに作られます」を追加 |
| 5 | BizLesson9 | A | 「Chart.js」が唐突 | 「Claude Codeが自動で使う無料グラフツール」と補足 or 技術名を省く |
| 6 | BizLesson11 | C | Q3がBizLesson4 Q2とテーマ重複 | Q3をCh.3固有の内容に変更 |
| 7 | BizLesson12 | C | Ch.3→Ch.4の難易度ジャンプ | SWOT/3Cフレームワークの簡易説明を追加 |
| 8 | BizLesson15 | C | 抽象度が急に上がり具体演習なし | 業務分析のミニ演習を追加 |
| 9 | BizLesson18 | A | 「エラーハンドリング」「config.json」が未説明 | 括弧書きで補足 |

### エンジニアコース

| # | ファイル | 指摘元 | 指摘内容 | 修正案 |
|---|---------|--------|----------|--------|
| 10 | EngLesson2 | A | plan modeの起動方法が未説明 | 「Shift+Tabで切替」を追記 |
| 11 | EngLesson4 | B | `.claudeignore`が公式未サポートの可能性 | `.gitignore`+CLAUDE.mdでの除外方法に修正 |
| 12 | EngLesson4 | B | `@git:diff HEAD~3`構文が不正確 | 「git diff HEAD~3の結果をレビューして」に変更 |
| 13 | EngLesson12 | B+A | GitHub Actions `anthropics/claude-code-action@v1`の正確性+gh CLI前提条件 | 公式リポジトリ名を確認・ghインストール手順追記 |

---

## 低優先度（18件）

| # | ファイル | 指摘内容 |
|---|---------|----------|
| 1 | BizLesson1 | 時間短縮の数値に「慣れると」「目安として」の注記 |
| 2 | BizLesson1-4 | ファイル末尾の`</output>`タグ残留を削除 |
| 3 | BizLesson3 | マーケタブ「CPA・ROAS・CVR」に括弧書き補足 |
| 4 | BizLesson4 | Q2のダミー選択肢をよりもっともらしく |
| 5 | BizLesson5 | 料金に「最新はclaude.aiを確認」を追記 |
| 6 | BizLesson9 | 「クロス集計」に補足 |
| 7 | BizLesson17 | BizLesson8修正時にテーマ重複を整理 |
| 8 | EngLesson1 | 「Sub-agent」「worktree」「monorepo」に補足 |
| 9 | EngLesson2 | Hooksの設定場所（settings.json）言及 |
| 10 | EngLesson2 | `/plan`→Shift+Tabに表記統一 |
| 11 | EngLesson4 | `@https://URL`の正確性を確認 |
| 12 | EngLesson5 | 「Atomic Design」「cyclomatic complexity」補足 |
| 13 | EngLesson6 | 「RFC 7807」「Result型パターン」補足 |
| 14 | EngLesson7 | Q1解説の`.claudeignore`と選択肢の`.gitignore`不整合 |
| 15 | EngLesson8 | TDDの動機付けを強化 |
| 16 | EngLesson12 | APIキーのGitHub Secrets設定手順を補足 |
| 17 | EngLesson16 | 「zod」「supertest」「SPA」に補足 |
| 18 | EngLesson17 | 「2-3セッションに分けて取り組む」注記 |

---

## カリキュラム全体の総評

### 強み
1. **ターゲットに合ったトーンの書き分け** — ビジネス職「です/ます調」、エンジニア「である調」で適切にフィット
2. **具体的なプロンプト例が豊富** — 「読んだらすぐ試せる」設計
3. **段階的な難易度設計** — 概念理解→体験→実践→応用の流れが明確
4. **UIデザインの統一感** — 3コース共通のTailwind CSSコンポーネント

### 最優秀レッスン
- **EngLesson1** — ツール比較テーブルが明快
- **EngLesson4** — コンテキスト最適化の実務知識が凝縮
- **EngLesson16** — REST API開発のステップバイステップが再現性高い
- **BizLesson3** — 4職種タブ切替のインタラクティブUI

### 最も改善が必要なレッスン
1. **BizLesson8** — ファイル内容が壊れている（最優先修正）
2. **BizLesson15** — 抽象度が急に上がり具体演習なし
3. **BizLesson16** — nodeコマンド実行が非エンジニアに難しい

---

## 修正優先順位

### Phase 1（必須）
1. BizLesson8を「議事録・報告書の自動生成」で再作成
2. BizLesson5にターミナルの開き方を追加
3. BizLesson6にEnter送信・Y許可の操作説明を追加
4. BizLesson16のnode実行を「Claude Code内で完結」に修正

### Phase 2（重要）
5. 未説明用語13件に括弧書き補足
6. EngLesson4の.claudeignore/@git:diff修正
7. BizLesson11のクイズ重複解消
8. EngLesson2のplan mode起動方法追記

### Phase 3（改善）
9. 低優先度18件の用語補足・コード品質改善
