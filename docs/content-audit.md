# コンテンツ監査レポート

調査日: 2026-04-17
目的: Tips集（150個）と事例集（80件）の統合に向けた現状把握

---

## 1. ディレクトリ構造

```
src/pages/
├── tips/
│   ├── index.astro      (61,597 bytes) — Tips一覧ページ（150件のデータ + フィルタUI + JS）
│   └── [slug].astro     (123,590 bytes) — Tips詳細ページ（150件の詳細データ + テンプレート）
├── cases/
│   ├── index.astro      (36,170 bytes) — 事例一覧ページ（80件のデータ + フィルタUI + JS）
│   └── [slug].astro     (38,561 bytes) — 事例詳細ページ（80件の詳細データ + テンプレート）
└── (その他のページ)

src/content/  → 存在しない（Content Collections未使用）
src/data/     → 存在しない（外部データファイル未使用）
```

**結論: 全データはAstroファイル内のJavaScript配列として直接記述されている。**

---

## 2. データソースの特定

### Tips集
- **形式**: JavaScript配列（`<script>`タグ内 + frontmatter内）
- **一覧データ**: `src/pages/tips/index.astro` 内の `const TIPS = [...]`（101〜271行目）
  - フィールド: `{id, cat, title, level, impact, desc, code?}`
- **詳細データ**: `src/pages/tips/[slug].astro` 内の `const T = [...]`（frontmatter内）
  - フィールド: `{id, slug, cat, title, level, impact, summary, scenes[], steps[], code, advanced, related[], caution, exercise}`
- **問題点**: 同一Tipのデータが2ファイルに重複して存在する（一覧用の簡易版 + 詳細版）

### 事例集
- **形式**: JavaScript配列（`<script>`タグ内 + frontmatter内）
- **一覧データ**: `src/pages/cases/index.astro` 内の `const D = [...]`（65〜148行目）
  - フィールド: `{id, t, job, cat, lv, b, h, a, p, tags[], src, dt, intl}`
- **詳細データ**: `src/pages/cases/[slug].astro` 内の `const D = [...]`（frontmatter内）
  - フィールド: `{id, t, job, cat, lv, b, h, a, p, tags[], src, dt, app, rel[]}`
- **問題点**: 同一事例のデータが2ファイルに重複して存在する（一覧用 + 詳細用は応用アイデア・関連事例が追加）

---

## 3. Tips全150個の一覧

### UI・操作（19件: id 1〜19）

| ID | タイトル | カテゴリ | 難易度 | 効果度 |
|----|---------|---------|--------|--------|
| 1 | Shift+Tab でPermission mode即切替 | ui | 初級 | 高 |
| 2 | Ctrl+R でコマンド履歴を逆検索 | ui | 初級 | 中 |
| 3 | Ctrl+O でトランスクリプトビューア表示 | ui | 中級 | 高 |
| 4 | バックスラッシュ+Enter で複数行入力 | ui | 初級 | 高 |
| 5 | Ctrl+V で画像をクリップボードから貼付 | ui | 中級 | 高 |
| 6 | Ctrl+B でバックグラウンドタスク実行 | ui | 中級 | 中 |
| 7 | Ctrl+T でタスクリスト表示/非表示 | ui | 中級 | 中 |
| 8 | Alt+P でモデルを即切替 | ui | 中級 | 高 |
| 9 | Alt+T で Extended Thinking を切替 | ui | 中級 | 中 |
| 10 | Alt+O で高速モード（Fast Mode）切替 | ui | 初級 | 中 |
| 11 | Ctrl+G で外部エディタでプロンプト編集 | ui | 上級 | 低 |
| 12 | Ctrl+X Ctrl+K で全バックグラウンドエージェント終了 | ui | 上級 | 低 |
| 13 | /config → Vim Mode を有効化 | ui | 中級 | 中 |
| 14 | Vim modeとCtrlショートカットは独立動作 | ui | 中級 | 低 |
| 15 | VS Code拡張でエディタから直接起動 | ui | 初級 | 高 |
| 16 | JetBrains拡張でIntelliJ/WebStorm連携 | ui | 初級 | 高 |
| 17 | Desktop版のSide Chats機能 | ui | 中級 | 中 |
| 18 | Desktop版のLive App Preview | ui | 中級 | 高 |
| 19 | Desktop版のVisual Diff Review | ui | 中級 | 高 |

### プロンプト・指示（30件: id 20〜49）

| ID | タイトル | カテゴリ | 難易度 | 効果度 |
|----|---------|---------|--------|--------|
| 20 | /compact [指示] で焦点を絞って圧縮 | prompt | 初級 | 高 |
| 21 | /batch で大規模変更を並列処理 | prompt | 上級 | 高 |
| 22 | /review でPRレビューを自動実行 | prompt | 初級 | 高 |
| 23 | /security-review でセキュリティ監査 | prompt | 中級 | 高 |
| 24 | /init でCLAUDE.mdを自動生成 | prompt | 初級 | 高 |
| 25 | /diff でインタラクティブdiffビューア | prompt | 中級 | 中 |
| 26 | /cost でトークン使用量を確認 | prompt | 初級 | 中 |
| 27 | /context でコンテキスト使用状況を可視化 | prompt | 中級 | 中 |
| 28 | /effort [level] で推論の深さを調整 | prompt | 中級 | 中 |
| 29 | /branch で会話をブランチ分岐 | prompt | 上級 | 中 |
| 30 | /export で会話をテキスト出力 | prompt | 初級 | 低 |
| 31 | /insights でセッション使用分析 | prompt | 中級 | 低 |
| 32 | /team-onboarding でチーム用ガイド生成 | prompt | 中級 | 中 |
| 33 | /simplify でコード品質を自動改善 | prompt | 中級 | 中 |
| 34 | @ファイルパス でファイルを明示参照 | prompt | 初級 | 高 |
| 35 | @フォルダ/ でディレクトリ全体を参照 | prompt | 初級 | 高 |
| 36 | @URL でWebページを参照 | prompt | 中級 | 中 |
| 37 | ! でBashコマンドを直接実行 | prompt | 初級 | 中 |
| 38 | 「テストも書いて」の一文を追加 | prompt | 初級 | 高 |
| 39 | 「最小限の変更で」と明示する | prompt | 初級 | 高 |
| 40 | 番号付きステップで段階的に指示 | prompt | 初級 | 高 |
| 41 | 「〜の観点で」とレビュー観点を限定 | prompt | 中級 | 高 |
| 42 | ネガティブ制約を明示する | prompt | 中級 | 中 |
| 43 | CLAUDE.mdに @ファイル名 でインポート | prompt | 中級 | 高 |
| 44 | サブディレクトリにCLAUDE.mdを配置 | prompt | 中級 | 中 |
| 45 | CLAUDE.local.md で個人設定を分離 | prompt | 中級 | 中 |
| 46 | CLAUDE.mdの4段階優先順位を理解する | prompt | 上級 | 中 |
| 47 | 開発コマンド一覧をCLAUDE.mdに記載 | prompt | 初級 | 高 |
| 48 | /debug でデバッグログを有効化 | prompt | 中級 | 中 |
| 49 | /copy [N] で応答をクリップボードコピー | prompt | 初級 | 中 |

### ワークフロー（17件: id 50〜66）

| ID | タイトル | カテゴリ | 難易度 | 効果度 |
|----|---------|---------|--------|--------|
| 50 | claude -w でworktree隔離セッション | workflow | 上級 | 高 |
| 51 | --tmux でtmuxペイン付きworktree | workflow | 上級 | 中 |
| 52 | .worktreeinclude で.envを自動コピー | workflow | 上級 | 高 |
| 53 | symlinkDirectories でnode_modules共有 | workflow | 上級 | 中 |
| 54 | claude -c で最新セッションを即再開 | workflow | 初級 | 高 |
| 55 | --resume で名前付きセッション復帰 | workflow | 中級 | 高 |
| 56 | claude -n でセッション名を指定して開始 | workflow | 中級 | 中 |
| 57 | /color でセッションの色を変更 | workflow | 初級 | 低 |
| 58 | 「並列で実行して」と明示的に指示 | workflow | 中級 | 高 |
| 59 | 「調査→実装」の2フェーズで進める | workflow | 中級 | 高 |
| 60 | ディレクトリ単位でタスクを分割 | workflow | 中級 | 高 |
| 61 | /loop で定期実行タスクを設定 | workflow | 上級 | 中 |
| 62 | claude --remote でクラウドセッション | workflow | 上級 | 高 |
| 63 | /teleport でクラウド→ローカルにハンドオフ | workflow | 上級 | 中 |
| 64 | /autofix-pr でPR自動修正（Web版） | workflow | 上級 | 高 |
| 65 | /ultraplan でクラウド計画立案（Web版） | workflow | 上級 | 中 |
| 66 | /ultrareview で多エージェントPRレビュー（Web版） | workflow | 上級 | 高 |

### 設定・カスタマイズ（18件: id 67〜84）

| ID | タイトル | カテゴリ | 難易度 | 効果度 |
|----|---------|---------|--------|--------|
| 67 | plan モードで計画だけ立てさせる | config | 中級 | 高 |
| 68 | allow/deny でツール単位の細かい制御 | config | 中級 | 高 |
| 69 | deny で危険なコマンドをブロック | config | 中級 | 高 |
| 70 | auto モードでバックグラウンド安全チェック | config | 上級 | 中 |
| 71 | .claude/skills/ でスキルを作成（推奨） | config | 中級 | 高 |
| 72 | $ARGUMENTS で引数を受け取る | config | 中級 | 高 |
| 73 | $0, $1 で複数引数を分解 | config | 上級 | 中 |
| 74 | allowed-tools でスキル内のツール制限 | config | 上級 | 中 |
| 75 | ユーザースキル vs プロジェクトスキル | config | 中級 | 中 |
| 76 | PreToolUse フックで危険操作をブロック | config | 中級 | 高 |
| 77 | PostToolUse フックで自動lint実行 | config | 中級 | 高 |
| 78 | UserPromptSubmit フックでプロンプト検証 | config | 上級 | 中 |
| 79 | SessionStart フックで環境初期化 | config | 上級 | 中 |
| 80 | Notification フックでデスクトップ通知 | config | 中級 | 中 |
| 81 | PermissionRequest フックで権限オーバーライド | config | 上級 | 中 |
| 82 | matcher で正規表現パターンを使用 | config | 上級 | 中 |
| 83 | 終了コード2でHookからブロック | config | 上級 | 高 |
| 84 | ${CLAUDE_SESSION_ID} でログ管理 | config | 上級 | 低 |

### 外部ツール連携（16件: id 85〜100）

| ID | タイトル | カテゴリ | 難易度 | 効果度 |
|----|---------|---------|--------|--------|
| 85 | /mcp で接続中MCPサーバーを管理 | external | 中級 | 中 |
| 86 | .mcp.json でプロジェクト固有MCP設定 | external | 中級 | 高 |
| 87 | --mcp-config でMCP設定ファイルを指定 | external | 上級 | 中 |
| 88 | 公式MCPサーバー4種を活用 | external | 中級 | 高 |
| 89 | 複数MCPの組み合わせワークフロー | external | 上級 | 高 |
| 90 | 管理者MCP設定で組織的に制御 | external | 上級 | 中 |
| 91 | claude -p で非対話モードCI実行 | external | 中級 | 高 |
| 92 | --output-format json で構造化出力 | external | 中級 | 高 |
| 93 | --max-turns N でターン数制限 | external | 中級 | 高 |
| 94 | --max-budget-usd N でコスト上限設定 | external | 中級 | 高 |
| 95 | --no-session-persistence でセッション非保存 | external | 中級 | 中 |
| 96 | パイプでファイル内容を直接投入 | external | 中級 | 高 |
| 97 | --json-schema で出力スキーマを強制 | external | 上級 | 高 |
| 98 | CLAUDE_CODE_USE_BEDROCK でAWS経由 | external | 上級 | 中 |
| 99 | CLAUDE_CODE_USE_VERTEX でGCP経由 | external | 上級 | 中 |
| 100 | settings.jsonのenvキーで環境変数管理 | external | 中級 | 中 |

### トラブルシューティング（13件: id 101〜113）

| ID | タイトル | カテゴリ | 難易度 | 効果度 |
|----|---------|---------|--------|--------|
| 101 | /doctor で環境を自動診断・修正 | trouble | 初級 | 高 |
| 102 | /terminal-setup でShift+Enterを修正 | trouble | 初級 | 高 |
| 103 | --debug でデバッグモード有効化 | trouble | 上級 | 高 |
| 104 | --debug-file でログをファイル出力 | trouble | 上級 | 中 |
| 105 | コンテキスト80%超えたら /compact | trouble | 初級 | 高 |
| 106 | /clear で完全リセット（復帰可能） | trouble | 初級 | 高 |
| 107 | CLAUDE.mdはcompact後も保持される | trouble | 中級 | 高 |
| 108 | サブディレクトリCLAUDE.mdの再読み込み | trouble | 上級 | 中 |
| 109 | 「変更前にgit statusを確認して」と指示 | trouble | 初級 | 高 |
| 110 | plan モードで確認してから実行 | trouble | 中級 | 高 |
| 111 | .claude/settings.json をgitにコミット | trouble | 中級 | 高 |
| 112 | --system-prompt で行動制約を追加 | trouble | 上級 | 中 |
| 113 | --append-system-prompt-file でルール適用 | trouble | 上級 | 中 |

### 隠れた便利機能（9件: id 114〜122）

| ID | タイトル | カテゴリ | 難易度 | 効果度 |
|----|---------|---------|--------|--------|
| 114 | --bare で最小限モード起動 | hidden | 上級 | 中 |
| 115 | --add-dir で追加ディレクトリをコンテキストに | hidden | 中級 | 高 |
| 116 | /copy [N] で過去の応答をコピー | hidden | 初級 | 中 |
| 117 | --fork-session でセッションを分岐 | hidden | 上級 | 中 |
| 118 | DISABLE_GIT_INSTRUCTIONS で自動指示無効化 | hidden | 上級 | 低 |
| 119 | Dispatch from Phone（Desktop版） | hidden | 中級 | 中 |
| 120 | --remote-control でWeb版から監視・操作 | hidden | 上級 | 中 |
| 121 | /plugin でプラグイン管理 | hidden | 上級 | 低 |
| 122 | sparsePaths でworktreeの部分チェックアウト | hidden | 上級 | 中 |

### 追加Tips A: 公式ドキュメント精査（12件: id 123〜134）

| ID | タイトル | カテゴリ | 難易度 | 効果度 |
|----|---------|---------|--------|--------|
| 123 | /plan でプロンプト付き計画モード開始 | prompt | 初級 | 高 |
| 124 | /fast でFast Mode即切替 | ui | 初級 | 中 |
| 125 | /recap でセッション概要を手動生成 | workflow | 初級 | 中 |
| 126 | /release-notes で変更履歴を確認 | hidden | 初級 | 低 |
| 127 | /powerup で対話的機能チュートリアル | ui | 初級 | 中 |
| 128 | /less-permission-prompts で権限プロンプト削減 | config | 中級 | 高 |
| 129 | claude update でCLI自動更新 | config | 初級 | 高 |
| 130 | claude setup-token でCI用トークン生成 | external | 中級 | 高 |
| 131 | --from-pr でPR関連セッションを再開 | workflow | 中級 | 高 |
| 132 | --fallback-model で自動フォールバック | config | 上級 | 中 |
| 133 | Agent Teams で複数エージェント並列定義 | workflow | 上級 | 高 |
| 134 | Ctrl+J で改行（全ターミナル対応） | ui | 初級 | 高 |

### 追加Tips B: ヘビーユーザー視点（7件: id 135〜141）

| ID | タイトル | カテゴリ | 難易度 | 効果度 |
|----|---------|---------|--------|--------|
| 135 | 複数プロジェクト間のコンテキスト予算管理 | workflow | 中級 | 高 |
| 136 | 大量生成タスクの /batch + /loop 使い分け | workflow | 上級 | 高 |
| 137 | Glob→Grepの2段階検索で高速化 | prompt | 中級 | 高 |
| 138 | 長時間セッション(5h+)のcompact戦略 | trouble | 上級 | 高 |
| 139 | PR規模別の /review vs /ultrareview 選択 | workflow | 中級 | 高 |
| 140 | Extended Thinkingで複雑な問題の品質向上 | prompt | 中級 | 高 |
| 141 | Glob+Grepの型指定でファイル絞り込み | hidden | 中級 | 中 |

### 追加Tips C: 非エンジニア向け（9件: id 142〜150）

| ID | タイトル | カテゴリ | 難易度 | 効果度 |
|----|---------|---------|--------|--------|
| 142 | 初めてのClaude Code：起動から最初の操作まで | ui | 初級 | 高 |
| 143 | 日本語でのファイル操作指示パターン集 | prompt | 初級 | 高 |
| 144 | 日本語プロンプトを正確に伝える3つのコツ | prompt | 初級 | 高 |
| 145 | 初心者がやりがちな5つの失敗パターン | trouble | 初級 | 高 |
| 146 | コード不要で使えるユースケース10選 | workflow | 初級 | 高 |
| 147 | Excel/CSVデータ処理の実践パターン | prompt | 初級 | 高 |
| 148 | Claude.ai（チャット）vs Claude Code の使い分け | ui | 初級 | 高 |
| 149 | ビジネス職が知るべきセキュリティ3点 | config | 初級 | 高 |
| 150 | Claude Codeの「できる/できない」境界線 | ui | 初級 | 高 |

---

## 4. 事例全80件の一覧

| ID | タイトル | カテゴリ | 職種 | 難易度 | 削減率 | 出典 | 海外 |
|----|---------|---------|------|--------|--------|------|------|
| 1 | 税理士事務所の自動仕訳処理 | auto | non | 中級 | 83% | 税理士事務所 | - |
| 2 | 営業のExcel月次集計を93%削減 | auto | biz | 初級 | 93% | 一般企業 | - |
| 3 | CS返信作成時間を80%削減 | auto | biz | 初級 | 80% | EC企業 | - |
| 4 | 経理の請求書確認を87%削減 | auto | biz | 初級 | 87% | 一般企業 | - |
| 5 | 商談準備を30分→2分に短縮 | auto | biz | 初級 | 93% | 営業担当者 | - |
| 6 | ServiceNow 29,000人展開 | auto | biz | 中級 | 95% | ServiceNow | 海外 |
| 7 | 非エンジニアが21業務統合 | auto | non | 上級 | 88% | 個人事業主 | - |
| 8 | データ入力60-70%削減 | auto | biz | 初級 | 65% | バックオフィス | 海外 |
| 9 | Eコマース事業者が週15-25時間削減 | auto | non | 中級 | 50% | Eコマース事業者 | 海外 |
| 10 | Excel週次集計を92%削減 | auto | biz | 初級 | 92% | バックオフィス | - |
| 11 | ソロ開発者が24人月を2人月で完了 | dev | eng | 上級 | 92% | ソロエンジニア | 海外 |
| 12 | Anthropic社内PRマージ率67%向上 | dev | eng | 中級 | 67% | Anthropic | 海外 |
| 13 | Claude Code採用チームでPR47%増 | dev | eng | 中級 | 47% | Faros AI | 海外 |
| 14 | LINEヤフーPRレビュー自動化 | dev | eng | 上級 | 75% | LINEヤフー | - |
| 15 | 3人で週30PRを安定処理 | dev | eng | 中級 | 60% | Tokium | - |
| 16 | テストコード拡充を2ヶ月前倒し | dev | eng | 中級 | 33% | セーフィー | - |
| 17 | 在庫管理システム開発40%削減 | dev | eng | 中級 | 40% | 受託開発企業 | - |
| 18 | REST API開発を45%削減 | dev | eng | 中級 | 45% | IT企業 | - |
| 19 | バグ修正を半日→1.5時間に短縮 | dev | eng | 初級 | 70% | エンジニア個人 | - |
| 20 | Intercom開発チーム30名の工数40%削減 | dev | eng | 中級 | 40% | Intercom | 海外 |
| 21 | HooksでQAチェック工数40%削減 | dev | eng | 中級 | 40% | 企業開発チーム | 海外 |
| 22 | テスト自動生成で95%カバレッジ | dev | eng | 中級 | 70% | 開発チーム | 海外 |
| 23 | Firecracker社で生産性10倍 | dev | eng | 中級 | 90% | Firecracker | - |
| 24 | CS学生がSaaSを3日で構築 | dev | eng | 中級 | 90% | CS学生 | 海外 |
| 25 | 請求書管理MVPを1日・$3.65で構築 | dev | eng | 中級 | 95% | エンジニア個人 | 海外 |
| 26 | 広告分析を3-5時間→7分に短縮 | data | biz | 中級 | 97% | Rimo | - |
| 27 | マーケ分析レポート95%短縮 | data | biz | 初級 | 95% | マーケアナリスト | 海外 |
| 28 | 経理レポート6時間→12分 | data | biz | 初級 | 97% | 経理担当者 | 海外 |
| 29 | 7時間の自律作業で精度99.9% | data | eng | 上級 | 95% | データエンジニア | 海外 |
| 30 | マーケターが事業KPI4ヶ月で300%成長 | content | non | 中級 | 97% | スマートバンク | - |
| 31 | 営業提案書の作成78%削減 | content | biz | 中級 | 78% | IT/コンサル | - |
| 32 | 提案書5分・LP30分で完成 | content | non | 中級 | 96% | 小規模IT企業 | - |
| 33 | 1人で全マーケティングチャネル運用 | content | non | 上級 | 90% | Anthropic社内マーケ | 海外 |
| 34 | 非エンジニアのマーケターが週15時間自動化 | content | non | 初級 | 75% | デジタルマーケター | 海外 |
| 35 | 技術リサーチ時間を80%削減 | data | eng | 初級 | 80% | Anthropic全職種 | 海外 |
| 36 | Stripe Scala→Java 10,000行移行 | dev | eng | 上級 | 96% | Stripe | 海外 |
| 37 | Wiz Python→Go 5万行移行を20時間 | dev | eng | 上級 | 97% | Wiz | 海外 |
| 38 | Wiz C++→Goアセンブリ移行を2日 | dev | eng | 上級 | 98% | Wiz | 海外 |
| 39 | Rakuten 機能デリバリー79%短縮 | dev | eng | 中級 | 79% | Rakuten | 海外 |
| 40 | Ramp インシデント調査時間80%削減 | dev | eng | 中級 | 80% | Ramp | 海外 |
| 41 | Zapier 800+AIエージェント展開 | auto | biz | 中級 | 89% | Zapier | 海外 |
| 42 | TELUS 50万時間節約 | auto | biz | 上級 | 30% | TELUS | 海外 |
| 43 | Augment Code 4-8ヶ月→2週間 | dev | eng | 上級 | 94% | Augment Code | 海外 |
| 44 | Cognizant 35万人展開 | dev | eng | 上級 | 18% | Cognizant | 海外 |
| 45 | Tobeva 2ヶ月で500PR作成 | dev | eng | 上級 | 90% | Tobeva | 海外 |
| 46 | Googleエンジニア 1年の設計を1時間で再現 | dev | eng | 上級 | 99% | Google | 海外 |
| 47 | ソロ開発者 38,632行SaaSを8週間 | dev | eng | 中級 | 75% | 個人開発者 | 海外 |
| 48 | PointFive コンテンツワークフロー月額$5 | auto | biz | 中級 | 90% | PointFive | 海外 |
| 49 | BIダッシュボードでレポート98%短縮 | data | biz | 中級 | 98% | Kaizen AI | 海外 |
| 50 | Stanford研究 コンテンツ制作127%向上 | content | biz | 初級 | 56% | Stanford GSB | 海外 |
| 51 | エンジニアチーム スプリント40時間節約 | dev | eng | 中級 | 70% | Medium記事 | 海外 |
| 52 | COBOL→Java レガシー移行を自動化 | dev | eng | 上級 | 90% | Anthropicデモ | 海外 |
| 53 | Eコマース在庫管理の日次作業を自動化 | auto | biz | 初級 | 85% | AdventurePPC | 海外 |
| 54 | YC W25 スタートアップの25%がAI生成コード95% | dev | eng | 中級 | 95% | Y Combinator | 海外 |
| 55 | RevOps ワークフロー短縮 | auto | biz | 中級 | 80% | Landbase | 海外 |
| 56 | PMのPRD→チケット自動生成 | auto | biz | 中級 | 80% | Sachin Rekhi | 海外 |
| 57 | CRED フィンテック 開発速度2倍 | dev | eng | 中級 | 50% | CRED | 海外 |
| 58 | Vulcan Technologies 非技術者2名で州契約 | auto | non | 中級 | 27% | Vulcan Technologies | 海外 |
| 59 | 非技術者が4時間・$20でSaaSアプリ構築 | dev | non | 初級 | 95% | Steve Glaveski | 海外 |
| 60 | ソロ開発者 3週間分を4日で完了 | dev | eng | 中級 | 60% | 個人開発者 | 海外 |
| 61 | HUB International 2万人展開 | auto | biz | 中級 | 85% | HUB International | 海外 |
| 62 | ゴールドマン・サックス 経理自動化 | auto | biz | 上級 | 30% | Goldman Sachs | 海外 |
| 63 | Faros AI 技術的負債解消 | dev | eng | 中級 | 50% | Faros AI | 海外 |
| 64 | Faros AI測定 PR1件$37.50のROI | data | eng | 中級 | 75% | Faros AI | 海外 |
| 65 | 顧客類似リード自動発掘エージェント | auto | biz | 中級 | 80% | Elaine Zelby | 海外 |
| 66 | LinkedIn広告競合分析を5分で | data | biz | 中級 | 90% | Kamil Rextin | 海外 |
| 67 | Animalz スタイルガイド自動チェック | content | biz | 中級 | 80% | Animalz | 海外 |
| 68 | デジタル広告代理店 月次レポート2日→40分 | auto | biz | 初級 | 97% | AdventurePPC | 海外 |
| 69 | Ambral ソロCTOでAIアカウント管理 | auto | eng | 上級 | 80% | Ambral (YC W25) | 海外 |
| 70 | Anthropic調査 中央値84%の時間削減 | data | eng | 中級 | 84% | Anthropic Research | 海外 |
| 71 | Fountain 開発速度50%向上 | dev | eng | 中級 | 50% | Fountain | 海外 |
| 72 | AIプロジェクトマネージャーで週15時間節約 | auto | non | 中級 | 37% | Every.to | 海外 |
| 73 | MindStudio 請求書処理をComputer Use | auto | biz | 初級 | 50% | MindStudio | 海外 |
| 74 | 非技術者が1時間で見積もりツール構築 | dev | non | 初級 | 90% | Kaizen AI | 海外 |
| 75 | Accenture 3万人にClaude Code訓練 | dev | eng | 中級 | 50% | Accenture | 海外 |
| 76 | Altana サプライチェーン開発2-10倍 | dev | eng | 中級 | 80% | Altana | 海外 |
| 77 | Sanity上級エンジニア 並列インスタンス | dev | eng | 上級 | 60% | Sanity | 海外 |
| 78 | Behavox 全社go-toペアプログラマー | dev | eng | 中級 | 50% | Behavox | 海外 |
| 79 | HumanLayer チーム全体でAI開発スケール | dev | eng | 上級 | 70% | HumanLayer (YC F24) | 海外 |
| 80 | 全社導入2週間で採用基準が変わった | auto | biz | 中級 | 50% | malna株式会社 | - |

---

## 5. カテゴリ体系

### Tips カテゴリ（8カテゴリ）

| カテゴリID | 表示名 | 件数 | 比率 |
|-----------|--------|------|------|
| ui | UI・操作 | 27 | 18.0% |
| prompt | プロンプト | 35 | 23.3% |
| workflow | ワークフロー | 22 | 14.7% |
| config | 設定 | 21 | 14.0% |
| external | 外部連携 | 17 | 11.3% |
| trouble | トラブル | 15 | 10.0% |
| hidden | 隠れ機能 | 13 | 8.7% |
| **合計** | | **150** | **100%** |

### Tips 難易度分布

| 難易度 | 件数 | 比率 |
|--------|------|------|
| 初級 | 44 | 29.3% |
| 中級 | 64 | 42.7% |
| 上級 | 42 | 28.0% |

### Tips 効果度分布

| 効果度 | 件数 | 比率 |
|--------|------|------|
| 高 | 85 | 56.7% |
| 中 | 53 | 35.3% |
| 低 | 12 | 8.0% |

### 事例 カテゴリ（4カテゴリ）

| カテゴリID | 表示名 | 件数 | 比率 |
|-----------|--------|------|------|
| dev | 開発効率化 | 35 | 43.8% |
| auto | 業務自動化 | 28 | 35.0% |
| data | データ分析 | 10 | 12.5% |
| content | コンテンツ | 7 | 8.8% |
| **合計** | | **80** | **100%** |

### 事例 職種分布

| 職種ID | 表示名 | 件数 | 比率 |
|--------|--------|------|------|
| eng | エンジニア | 39 | 48.8% |
| biz | ビジネス職 | 28 | 35.0% |
| non | 非エンジニア | 13 | 16.3% |

### 事例 難易度分布

| 難易度 | 件数 | 比率 |
|--------|------|------|
| 初級 | 14 | 17.5% |
| 中級 | 43 | 53.8% |
| 上級 | 23 | 28.8% |

### 事例 国内/海外分布

| 区分 | 件数 | 比率 |
|------|------|------|
| 国内 | 16 | 20.0% |
| 海外 | 64 | 80.0% |

---

## 6. 既存リンク構造

### Tips → 他ページへのリンク

| リンク元 | リンク先 | 種別 | 件数 |
|---------|---------|------|------|
| tips/index.astro | /tips/tip-{id} | 一覧→詳細 | 150（各カード「詳しく見る →」） |
| tips/[slug].astro | /tips/tip-{id} | 詳細→関連Tips | 各Tipに2〜3件のrelated |
| tips/[slug].astro | /tips | 詳細→一覧（パンくず・戻る） | 2 |
| tips/[slug].astro | /tips/tip-{prev} | 前のTip | 1 |
| tips/[slug].astro | /tips/tip-{next} | 次のTip | 1 |

### 事例 → 他ページへのリンク

| リンク元 | リンク先 | 種別 | 件数 |
|---------|---------|------|------|
| cases/index.astro | /cases/case-{id} | 一覧→詳細 | 80（各カード全体がリンク） |
| cases/[slug].astro | /cases/case-{id} | 詳細→関連事例 | 各事例に1〜3件のrel |
| cases/[slug].astro | /cases | 詳細→一覧（パンくず・戻る） | 2 |
| cases/[slug].astro | /cases/case-{prev} | 前の事例 | 1 |
| cases/[slug].astro | /cases/case-{next} | 次の事例 | 1 |
| cases/[slug].astro | /track/engineer | エンジニアコースへ | eng事例のみ |
| cases/[slug].astro | /track/business | ビジネスコースへ | biz/non事例 |
| cases/[slug].astro | /tips | Tips集を見る | 全事例 |

### Tips ↔ 事例 間のリンク

- **Tips → 事例**: 0件（直接リンクなし）
- **事例 → Tips**: 事例詳細ページに「Tips集を見る」ボタンあり（/tipsへ。個別Tipへのリンクは無し）

### コースレッスン → Tips/事例

- **レッスン → Tips**: 0件（コースレッスンからTips個別ページへの参照なし）
- **レッスン → 事例**: 0件（コースレッスンから事例個別ページへの参照なし）
- **Sidebar**: Tips集（/tips）と事例集（/cases）のメニューリンクあり

### その他のページ → Tips/事例

| リンク元 | リンク先 |
|---------|---------|
| Sidebar.astro | /tips, /cases |

---

## 7. 統合に向けた所見

### データ構造の課題
1. **データの重複**: Tips・事例ともに一覧ページと詳細ページで同じデータが2重管理されている
2. **Astroファイルの肥大化**: tips/[slug].astroは123KB、単一ファイルで150件の詳細データを保持
3. **Content Collections未使用**: Astro標準のコンテンツ管理機構を使わず、全てインラインJS
4. **フィールド名の不統一**: 事例データは短縮キー（t, b, h, a, p等）を使用し可読性が低い

### コンテンツの接続性の課題
1. **Tips ↔ 事例の相互リンクがゼロ**: 関連する内容でも相互に参照していない
2. **コースレッスンからの参照がゼロ**: 150 Tips + 80事例がコース学習の流れから完全に独立
3. **事例→Tipsのリンクが一括のみ**: 各事例に関連するTip番号を紐付ければ学習効果が向上する

### ファイルサイズ

| ファイル | サイズ |
|---------|--------|
| tips/index.astro | 61,597 bytes |
| tips/[slug].astro | 123,590 bytes |
| cases/index.astro | 36,170 bytes |
| cases/[slug].astro | 38,561 bytes |
| **合計** | **259,918 bytes（約254KB）** |
