"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 修正 Leaflet 預設圖示問題
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// 定義資料類型
interface PlacemarkData {
  name: string;
  coordinates: [number, number][];
  color?: string;
}

interface KmlMapProps {
  dataSource: "local";
  apiEndpoint?: string;
}

// KML 解析函數
function parseKmlToPlacemarks(kmlText: string): PlacemarkData[] {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(kmlText, "text/xml");

    // 檢查解析錯誤
    const parserError = xmlDoc.querySelector("parsererror");
    if (parserError) {
      console.error("XML 解析錯誤:", parserError.textContent);
      throw new Error("KML 解析失敗：無效的 XML 格式");
    }

    const placemarks: PlacemarkData[] = [];
    const placemarksNodes = xmlDoc.querySelectorAll("Placemark");

    if (placemarksNodes.length === 0) {
      console.warn("未找到任何 Placemark 節點");
    }

    placemarksNodes.forEach((placemark, index) => {
      const nameNode = placemark.querySelector("name");
      const coordinatesNode = placemark.querySelector("coordinates");
      const styleUrlNode = placemark.querySelector("styleUrl");

      if (coordinatesNode?.textContent) {
        const coordText = coordinatesNode.textContent.trim();

        // 解析座標 (格式: lng,lat 或 lng,lat,alt)
        const coords = coordText
          .split(/\s+/)
          .map((coord) => {
            const parts = coord.trim().split(",");
            if (parts.length < 2) return null;

            const lng = parseFloat(parts[0]);
            const lat = parseFloat(parts[1]);

            // 驗證座標有效性
            if (isNaN(lat) || isNaN(lng)) return null;
            if (lat < -90 || lat > 90) return null;
            if (lng < -180 || lng > 180) return null;

            return [lat, lng] as [number, number];
          })
          .filter((coord): coord is [number, number] => coord !== null);

        if (coords.length > 0) {
          const nameText =
            nameNode?.textContent?.trim() || `未命名區域 ${index + 1}`;

          // 根據名稱或 styleUrl 決定顏色（預設為暗紅）
          let color = "#8B0000"; // 左岸預設深紅
          try {
            if (
              nameText.includes("右") ||
              (styleUrlNode && styleUrlNode.textContent?.includes("1"))
            ) {
              color = "#1E40AF"; // 右岸：深藍
            } else if (
              nameText.includes("左") ||
              (styleUrlNode && styleUrlNode.textContent?.includes("0"))
            ) {
              color = "#8B0000"; // 左岸：深紅
            }
          } catch (e) {
            /* ignore */
          }

          placemarks.push({
            name: nameText,
            coordinates: coords,
            color,
          });
        } else {
          console.warn(`Placemark ${index} 沒有有效座標`);
        }
      }
    });

    if (placemarks.length === 0) {
      throw new Error("未找到有效的地圖資料");
    }

    return placemarks;
  } catch (error) {
    console.error("KML 解析詳細錯誤:", error);
    throw error;
  }
}

// 自動調整地圖視角的元件
function AutoFitBounds({ placemarks }: { placemarks: PlacemarkData[] }) {
  const map = useMap();

  useEffect(() => {
    if (placemarks.length > 0) {
      const allCoords = placemarks.flatMap((p) => p.coordinates);
      if (allCoords.length > 0) {
        const bounds = L.latLngBounds(allCoords);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [placemarks, map]);

  return null;
}

// KML 檔案
const LOCAL_KML_PATH = "/kml/placemarks.kml";

export default function KmlMap({ dataSource }: KmlMapProps) {
  const [placemarks, setPlacemarks] = useState<PlacemarkData[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);

  // 解析 KML 資料
  useEffect(() => {
    setParseError(null);

    try {
      const loadLocalKml = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        try {
          const res = await fetch(LOCAL_KML_PATH, {
            signal: controller.signal,
          });
          clearTimeout(timeoutId);

          if (!res.ok) throw new Error(`HTTP ${res.status}`);

          const text = await res.text();
          if (!text.includes("<kml") && !text.includes("<?xml")) {
            throw new Error("載入的本地 KML 檔案格式不正確");
          }

          const parsed = parseKmlToPlacemarks(text);
          setPlacemarks(parsed);
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error("載入本地 KML 失敗:", msg);
          setParseError(msg);
        }
      };

      if (dataSource === "local") {
        void loadLocalKml();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "未知錯誤";
      console.error("KML 解析錯誤:", errorMessage);
      setParseError(errorMessage);
    }
  }, [dataSource]);

  // 無資料狀態
  if (placemarks.length === 0) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-100 dark:bg-slate-900 rounded-lg">
        <p className="text-gray-500 dark:text-gray-300">暫無地圖資料</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] relative rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[23.68, 121.43]}
        zoom={13}
        className="h-full w-full"
        style={{ zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {placemarks.map((placemark, index) => (
          <Polygon
            key={`${placemark.name}-${index}`}
            positions={placemark.coordinates}
            pathOptions={{
              color: placemark.color ?? "#8B0000",
              fillColor: "#0000ff",
              fillOpacity: 0,
              weight: 3,
            }}
          ></Polygon>
        ))}

        <AutoFitBounds placemarks={placemarks} />
      </MapContainer>

      {/* 圖例 */}
      <div className="absolute bottom-6 right-4 bg-white/95 dark:bg-slate-700/90 p-3 rounded-lg shadow-lg z-[1000] ring-1 ring-gray-100 dark:ring-gray-700">
        <h3 className="font-semibold mb-2 text-sm text-gray-800 dark:text-gray-100">
          圖例
        </h3>
        {placemarks.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-sm mb-1 text-gray-700 dark:text-gray-200"
          >
            <div
              className="w-4 h-0.5"
              style={{ backgroundColor: p.color ?? "#8B0000" }}
            ></div>
            <span>{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
