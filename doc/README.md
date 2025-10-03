# 光復 e 互助平台 - 文件中心

**建立日期**: 2025-10-03_00:36:04
**最後更新**: 2025-10-03_18:35:50

---

## 📚 文件導覽

本文件中心包含光復 e 互助平台的完整技術與產品文件,依照不同角色與需求分類整理。

---

## 🎯 快速開始

### 我是產品經理 / PM
- 📋 [產品需求文件 (PRD)](./pm/01_product_requirements.md) - 了解產品規格、使用者角色與功能需求
- 🔄 [使用者流程文件](./pm/02_user_flow.md) - 查看各角色的使用流程與頁面架構

### 我是開發者 / Developer
- 🏗️ [技術架構文件](./dev/01_technical_architecture.md) - 了解系統架構與技術棧
- 🔌 [API 整合指南](./dev/02_api_integration.md) - 學習如何整合後端 API
- 💻 [開發指南](./dev/03_development_guide.md) - 開發環境設定與程式碼規範

### 我是設計師 / Designer
- 🎨 [設計規範文件](./design/README.md) - 查看設計系統與色彩規範
- 🌈 [色彩系統與登入 UX](./design/2025-10-03_18:35:50_color-system-and-login-ux.md) - 完整的色彩系統與互動設計

### 我是分析師 / Analyst
- 📊 [需求分析文件](./analyst/) - 查看需求分析與解決方案

---

## 📂 文件結構

```
doc/
├── README.md                          # 📖 文件中心首頁 (本頁)
│
├── pm/                                # 📋 產品管理文件
│   ├── 01_product_requirements.md    # 產品需求規格
│   └── 02_user_flow.md               # 使用者流程
│
├── dev/                               # 💻 開發文件
│   ├── 01_technical_architecture.md  # 技術架構
│   ├── 02_api_integration.md         # API 整合
│   └── 03_development_guide.md       # 開發指南
│
├── analyst/                           # 📊 需求分析文件
│   ├── README.md                      # 分析文件索引
│   ├── 2025-10-03_18:18:34_homepage-authentication-requirement.md
│   └── 2025-10-03_18:30:31_authentication-ux-pattern-analysis.md
│
├── changelog/                         # 📝 變更日誌
│   ├── 2025-10-03_00:36:04_initial-documentation.md
│   └── 2025-10-03_17:38:27_ui-refactor-and-routing.md
│
└── design/                            # 🎨 設計文件
    ├── README.md                      # 設計系統索引
    └── 2025-10-03_18:35:50_color-system-and-login-ux.md
```

---

## 📋 產品管理文件 (PM)

### [01. 產品需求文件 (PRD)](./pm/01_product_requirements.md)
完整的產品規格說明,包含:
- 專案概述與願景
- 使用者角色與權限矩陣
- 核心功能需求 (FR)
- 使用者故事
- 功能優先級 (P0-P3)
- 非功能性需求 (NFR)
- 第一階段 MVP 範圍

**適合對象**: PM、PO、Stakeholders、開發團隊

### [02. 使用者流程文件](./pm/02_user_flow.md)
詳細的使用者互動流程,包含:
- 核心使用者流程 (註冊、登入)
- 受災戶流程 (提出需求、追蹤進度)
- 志工流程 (瀏覽任務、認領任務、執行任務)
- 管理員流程 (審核任務、審核組織)
- 組織流程 (組織申請、建立任務)
- 頁面結構與導航
- 關鍵頁面線框圖

**適合對象**: PM、UX Designer、開發團隊

---

## 📊 需求分析文件 (ANALYST)

### [身份切換與登入互動模式 UX 分析](./analyst/2025-10-03_18:30:31_authentication-ux-pattern-analysis.md)
**分析時間**: 18:30:31 | **優先級**: P0

UX 互動模式分析,包含:
- Tab 切換 vs 登入按鈕比較
- 推薦方案: 單純登入按鈕 (方案 B)
- 符合使用者心智模型與業界慣例
- 行動裝置友善設計
- 完整 UI 規格與實作建議

**適合對象**: UX Designer、PM、前端開發

### [首頁公開化與志工登入入口分析](./analyst/2025-10-03_18:18:34_homepage-authentication-requirement.md)
**分析時間**: 18:18:34 | **優先級**: P0

需求分析與解決方案,包含:
- 需求背景與現況分析
- 多方案設計與比較
- 推薦實施方案 (方案 A - 最小改動)
- 詳細實作步驟與檢查清單
- UI/UX 設計建議
- 行動版優化重點
- 安全性考量
- 測試計劃與成效評估

**適合對象**: PM、分析師、開發團隊、設計師

---

## 📝 變更日誌 (CHANGELOG)

### [v0.2.0 - UI 重構與路由優化](./changelog/2025-10-03_17:38:27_ui-refactor-and-routing.md)
WeiLocus 協同開發的 UI 重構,包含:
- 卡片式任務列表組件
- 路由結構優化
- 響應式設計改進

### [v0.1.0 - 初始專案文件](./changelog/2025-10-03_00:36:04_initial-documentation.md)
專案文件系統建立,包含:
- PM 規格文件
- 開發技術文件
- 文件架構設計

---

## 💻 開發文件 (DEV)

### [01. 技術架構文件](./dev/01_technical_architecture.md)
系統技術架構說明,包含:
- 系統架構概覽
- 前後端技術棧
- 專案目錄結構
- 前端架構 (App Router、組件層級)
- 後端整合 (API Client、Type Generation)
- 狀態管理 (React Query、Zustand)
- 認證與授權 (NextAuth.js)
- 部署架構

**適合對象**: 前端開發、後端開發、架構師

### [02. API 整合指南](./dev/02_api_integration.md)
完整的 API 使用手冊,包含:
- API 基礎設定與型別生成
- 認證流程 (註冊、登入、JWT)
- 資料模型定義 (UserRole、TaskType、TaskStatus)
- 常用 API 範例
  - 任務管理 (CRUD、認領、審核)
  - 組織管理 (申請、審核)
  - 使用者管理 (權限控制)
- 錯誤處理策略
- API Hooks 實作範例

**適合對象**: 前端開發、後端開發

### [03. 開發指南](./dev/03_development_guide.md)
開發流程與規範,包含:
- 開發環境設定 (安裝步驟、VSCode 設定)
- Git 工作流程 (分支策略、Commit 規範)
- 程式碼規範
  - TypeScript 規範
  - React 規範
  - CSS/TailwindCSS 規範
  - 檔案組織規範
- 元件開發指南
  - 組件結構範本
  - 表單處理
  - 效能優化技巧
- 常見問題 FAQ
- 除錯技巧
- 部署檢查清單

**適合對象**: 所有開發者 (前端、後端)

---

## 🎨 設計文件 (DESIGN)

### [色彩系統與登入按鈕 UX](./design/2025-10-03_18:35:50_color-system-and-login-ux.md)
**設計時間**: 18:35:50 | **設計師**: August

完整的設計系統規範,包含:

**1. 色彩系統**
- 🎨 品牌色定義 (Hope Blue 主色 + Energy Orange 次色)
- 🌈 語意色系統 (成功、警示、警告、資訊)
- 📊 狀態色 (6 種任務狀態)
- 🎯 優先級色 (1-5 級)
- 🌓 Light/Dark Mode 完整定義
- ♿ 符合 WCAG 2.1 AA 標準

**2. 登入按鈕 UX**
- 設計策略:「低干擾、高可及」
- 手機版: 精簡登入按鈕 + FAB (建立任務)
- 桌面版: Outline 按鈕 + 使用者 Dropdown
- 完整互動狀態設計
- 動畫與過渡效果

**3. 響應式設計**
- 手機版優先 (< 768px)
- 平板優化 (768-1023px)
- 桌面完整版 (≥ 1024px)

**4. 無障礙設計**
- 觸控目標 ≥ 44px
- 色彩對比度 > 4.5:1
- 鍵盤導航支援
- Screen Reader 友善

**適合對象**: UI/UX Designer、前端開發、產品經理

### [設計系統總覽](./design/README.md)
設計系統文件中心,包含:
- 設計原則與流程
- 色彩、字體、間距、圓角系統
- 組件設計規範 (Button, Card, Input 等)
- 互動設計指南
- 響應式設計規範
- 設計檢查清單

**適合對象**: UI/UX Designer、前端開發

---

## 🔄 文件版本管理

### 更新紀錄

| 版本 | 日期 | 說明 | 作者 |
|------|------|------|------|
| v1.2 | 2025-10-03_18:35 | 新增設計系統文件 (色彩系統、登入 UX) | August |
| v1.1 | 2025-10-03_18:30 | 新增 UX 分析文件 (身份切換互動模式) | August |
| v1.0 | 2025-10-03_00:36 | 初始版本,建立完整文件架構 | Claude |

### 文件維護規範

1. **更新頻率**
   - 重大功能變更時必須更新文件
   - 每月檢視一次文件是否過時

2. **版本號規則**
   - Major (x.0.0): 重大架構變更
   - Minor (0.x.0): 新增功能或章節
   - Patch (0.0.x): 內容修正與優化

3. **更新流程**
   - 修改文件後更新「最後更新」時間戳記
   - 在更新紀錄表格中新增變更記錄
   - 提交 PR 時標註文件變更

---

## 📌 相關資源

### 專案資源
- [GitHub Repository](https://github.com/your-org/e-cooperative) (請替換實際連結)
- [後端 API 文件](http://hanservice.synology.me:8923/api/v1/openapi.json)
- [Figma 設計稿](https://figma.com/...) (待補充)

### 技術文件
- [Next.js 官方文件](https://nextjs.org/docs)
- [React 官方文件](https://react.dev)
- [TailwindCSS 文件](https://tailwindcss.com/docs)
- [shadcn/ui 文件](https://ui.shadcn.com)
- [TanStack Query 文件](https://tanstack.com/query)

### 團隊資源
- Slack Channel: #e-cooperative
- 每週會議: 週一 10:00 AM
- Sprint Planning: 每兩週一次

---

## 🤝 貢獻指南

### 如何貢獻文件

1. **發現問題**
   - 文件有錯誤或過時內容
   - 需要補充說明的地方

2. **提出改進**
   - 在 GitHub 建立 Issue 描述問題
   - 或直接建立 PR 修正

3. **撰寫新文件**
   - 遵循現有文件格式
   - 使用 Markdown 語法
   - 包含時間戳記與版本號
   - 更新本 README 的導覽連結

### 文件撰寫規範

- **語言**: 使用繁體中文
- **格式**: Markdown (.md)
- **結構**: 使用清晰的標題階層
- **程式碼**: 使用程式碼區塊並標註語言
- **圖片**: 放在 `/doc/assets/images/` 目錄
- **連結**: 使用相對路徑

---

## 📞 聯絡資訊

如有任何文件相關問題,請聯繫:

- **技術問題**: tech@example.com
- **產品問題**: product@example.com
- **設計問題**: design@example.com

---

## 📝 待辦事項

### 高優先級
- [x] 補充設計規範文件 ✅ (2025-10-03_18:35:50 完成)
- [ ] 實作色彩系統到 globals.css
- [ ] 重構 Header 組件 (依照設計規範)
- [ ] 建立 FAB 組件 (手機版建立任務按鈕)
- [ ] 新增 API 測試範例
- [ ] 建立部署流程文件

### 中優先級
- [ ] 新增故障排除手冊
- [ ] 建立效能優化指南
- [ ] 補充安全性最佳實踐

### 低優先級
- [ ] 建立貢獻者指南
- [ ] 新增歷史變更紀錄
- [ ] 多語系文件支援

---

**感謝您閱讀光復 e 互助平台文件!**

如有任何問題或建議,歡迎隨時提出。讓我們一起打造更好的災害應變平台! 💪
