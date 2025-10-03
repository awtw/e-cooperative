# Changelog - 變更日誌

**最後更新**: 2025-10-03_19:00:00

---

## 📖 關於 Changelog

此目錄記錄光復 e 互助平台的所有重大變更,包含新功能、重構、Bug 修復等。每次重大更新都會建立獨立的 changelog 文件。

---

## 📝 Changelog 規範

### 檔案命名格式
```
YYYY-MM-DD_HH:MM:SS_brief-description.md
```

**範例**:
- `2025-10-03_17:38:27_ui-refactor-and-routing.md`
- `2025-10-05_10:00:00_api-integration.md`

### 文件結構
每個 changelog 應包含:

1. **標題與元資訊**
   - 日期時間戳記
   - 版本號
   - 變更類型

2. **變更概要**
   - 簡短描述本次變更

3. **貢獻者**
   - 參與開發的成員

4. **主要變更**
   - 詳細的功能說明
   - 程式碼範例
   - 檔案變更清單

5. **影響範圍**
   - 檔案變更統計
   - Breaking Changes
   - 相容性說明

6. **測試建議**
   - 需要測試的項目

7. **部署注意事項**
   - 環境變數
   - 資料庫遷移
   - 相依套件

---

## 📅 變更歷史

### 2025-10-03

#### [v0.3.0 - 設計系統實作與登入 UX 優化](./2025-10-03_19:00:00_design-system-implementation.md)
**時間**: 19:00:00
**貢獻者**: August

**重點變更**:
- 🎨 實作完整色彩系統 (Light/Dark Mode)
- ✨ Header 組件重構 (Dropdown + 響應式)
- 📱 新增 FAB 組件 (手機版快速建立任務)
- ♿ 無障礙設計優化 (WCAG 2.1 AA)
- 🌈 品牌色定義 (Hope Blue + Energy Orange)

**檔案變更**: +2 新增, ~4 修改

---

#### [v0.2.0 - UI 重構與路由優化](./2025-10-03_17:38:27_ui-refactor-and-routing.md)
**時間**: 17:38:27
**貢獻者**: WeiLocus, August

**重點變更**:
- ✨ 新增卡片式任務列表 (TasksCards)
- 🔄 優化任務詳情頁路由結構
- 🎨 改善行動裝置體驗
- 📱 響應式網格佈局 (1-4 欄位)

**檔案變更**: +3 新增, ~2 修改

---

#### [v0.1.0 - 專案文件建立](./2025-10-03_00:36:04_initial-documentation.md)
**時間**: 00:36:04
**貢獻者**: August

**重點變更**:
- 📋 建立完整 PM 規格文件
- 💻 建立開發者技術文件
- 🏗️ 建立文件架構 (pm/dev/design)
- 📚 API 整合指南

**檔案變更**: +165 新增

---

## 🏷️ 版本命名規則

我們使用 [Semantic Versioning](https://semver.org/) 語義化版本:

```
MAJOR.MINOR.PATCH

例如: v1.2.3
```

- **MAJOR** (主版本): 重大功能更新或不向下相容的變更
- **MINOR** (次版本): 新增功能,向下相容
- **PATCH** (修訂版本): Bug 修復,向下相容

### 版本號規則
- `v0.x.x` - 開發階段 (MVP)
- `v1.x.x` - 第一個正式版本
- `v2.x.x` - 第二代重大更新

---

## 🏷️ 變更類型標籤

使用以下標籤標示變更類型:

- ✨ `Feature` - 新功能
- 🐛 `Bug Fix` - Bug 修復
- 🔄 `Refactor` - 程式碼重構
- 📝 `Documentation` - 文件更新
- 🎨 `Style` - UI/UX 調整
- ⚡ `Performance` - 效能優化
- 🔒 `Security` - 安全性修復
- 🗃️ `Database` - 資料庫變更
- 🔧 `Configuration` - 設定檔調整
- 📦 `Dependencies` - 依賴套件更新
- ♻️ `Breaking Change` - 不向下相容的變更

---

## 📊 統計資訊

### 總覽
- **總版本數**: 3
- **總變更檔案數**: 176+
- **總貢獻者**: 2

### 變更類型分布
- Feature: 3
- Documentation: 1
- Refactor: 1
- Style/UX: 1

---

## 🔍 如何查看變更記錄

### 查看最新變更
```bash
ls -t doc/changelog/*.md | head -1 | xargs cat
```

### 查看所有變更
```bash
ls -t doc/changelog/*.md
```

### 搜尋特定類型的變更
```bash
grep -l "Feature" doc/changelog/*.md
```

---

## 📝 如何撰寫 Changelog

### 1. 確定變更類型
判斷本次更新屬於哪種類型 (Feature / Bug Fix / Refactor 等)

### 2. 收集變更資訊
```bash
# 查看最近的 commit
git log --oneline -10

# 查看檔案變更
git diff HEAD~3 HEAD --stat

# 查看詳細變更
git show <commit-hash>
```

### 3. 建立 Changelog 文件
```bash
# 取得時間戳記
date "+%Y-%m-%d_%H:%M:%S"

# 建立檔案 (使用範本)
cp doc/changelog/template.md doc/changelog/YYYY-MM-DD_HH:MM:SS_description.md
```

### 4. 填寫內容
參考現有的 changelog 文件格式,填寫完整資訊

### 5. 更新本 README
在「變更歷史」章節新增最新記錄

---

## 🔗 相關資源

- [Git Commit 規範](../dev/03_development_guide.md#commit-訊息規範)
- [專案文件中心](../README.md)
- [版本發布流程](../dev/03_development_guide.md#部署檢查清單)

---

## 📮 回饋與建議

如果你對 changelog 的格式或內容有任何建議,歡迎提出 Issue 或 PR!

---

**Changelog 索引結束**
