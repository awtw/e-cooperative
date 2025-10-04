import type { Metadata } from "next";
import ContactContent from "./contact-content";

export const metadata: Metadata = {
  title: "聯絡通訊資訊 - 光復 e 互助",
  description:
    "花蓮縣光復鄉馬太鞍溪堰塞湖救災相關聯絡資訊彙整：安心專線、心理諮詢、志工媒合、物資據點、地政/稅務/監理單位等。",
  keywords: [
    "光復",
    "聯絡",
    "通訊",
    "救災",
    "志工",
    "物資",
    "花蓮",
  ],
};

export default function ContactPage() {
  return <ContactContent />;
}


