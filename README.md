# 光復 e 互助平台

一個專為花蓮光復鄉災害應變設計的數位互助平台，透過高效、可靠的數位平台優化災害應變流程。

## 專案概述

我們的願景是透過高效、可靠的數位平台，徹底優化花蓮光復鄉的災害應變流程。我們相信準確的數據是救災成功的基石。團隊目標是將複雜的物資需求與緊急通報系統整合簡化，讓工程師的技術專長與在地聯繫窗口的溝通能力發揮最大效用，確保在極端條件下，救援資訊的傳遞零延誤、高效率。

## 主要功能

- **任務管理系統**：支援清理、救援、物資配送、醫療支援、收容所支援等任務類型
- **志工協調**：志工報名、任務分配、進度追蹤
- **權限管理**：基於角色的存取控制
- **即時通知**：任務狀態更新與緊急通知
- **響應式設計**：支援桌面與行動裝置

## 技術棧

- **前端框架**：Next.js 15.5.4 (App Router)
- **UI 框架**：React 19.1.0 + TypeScript
- **樣式**：TailwindCSS 4 + shadcn/ui
- **狀態管理**：Zustand + TanStack Query
- **表單處理**：React Hook Form + Zod
- **認證**：NextAuth.js
- **主題**：next-themes (深色/淺色模式)

## 快速開始

### 環境需求

- Node.js 18+
- npm/yarn/pnpm

### 安裝依賴

```bash
npm install
```

### 開發環境

```bash
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 查看結果。

### 建置生產版本

```bash
npm run build
npm start
```

## 專案結構

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 認證相關頁面
│   ├── dashboard/         # 儀表板頁面
│   └── login/             # 登入頁面
├── components/            # React 元件
│   ├── common/           # 通用元件
│   ├── task/             # 任務相關元件
│   └── ui/               # shadcn/ui 元件
├── constant/             # 常數定義
├── lib/                  # 工具函數
└── types/                # TypeScript 類型定義
```

## API 文檔

後端 API 文檔：http://hanservice.synology.me:8923/api/v1/openapi.json

## 開發規範

- 使用 shadcn/ui 元件庫
- 遵循 DRY 原則，優化程式碼可讀性與重用性
- 使用 TypeScript 確保型別安全
- 實作無障礙功能
- 使用 TailwindCSS 進行樣式設計

## 部署

建議使用 [Vercel](https://vercel.com) 進行部署，或參考 [Next.js 部署文檔](https://nextjs.org/docs/app/building-your-application/deploying)。

## 授權

此專案為私有專案。
