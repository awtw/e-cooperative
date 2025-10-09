"use client";

import dynamic from "next/dynamic";
// 動態載入地圖元件 (避免 SSR 問題)
const KmlMapComponent = dynamic(() => import("@/components/map/kml-map"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[600px] bg-gray-100">
      <p className="text-gray-600">載入地圖元件中...</p>
    </div>
  ),
});

export default function MapPage() {
  const dataSource = "local";

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">受災範圍</h1>

      {/* 地圖顯示 */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <KmlMapComponent dataSource={dataSource} />
      </div>

      {/* 說明 */}
      <div className="mt-6 bg-blue-50/80 dark:bg-slate-700/70 p-4 rounded-lg ring-1 ring-blue-100/50 dark:ring-white/5">
        <h2 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
          使用說明:
        </h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>使用滑鼠滾輪縮放,拖曳平移地圖</li>
        </ul>
      </div>
    </div>
  );
}
