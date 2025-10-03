import { Providers } from "@/components/common/providers";
import "./globals.css";
import type { Metadata } from "next";

import Script from "next/script";
import { COMPANY_NAME } from "@/constant";
import { Toaster } from "sonner";
import { Header } from "@/components/common";
import { FAB } from "@/components/common/fab";

export const metadata: Metadata = {
  title: COMPANY_NAME,
  description:
    "我們的願景是透過高效、可靠的數位平台，徹底優化花蓮光復鄉的災害應變流程。我們相信準確的數據是救災成功的基石。團隊目標是將複雜的物資需求與緊急通報系統整合簡化，讓工程師的技術專長與在地聯繫窗口的溝通能力發揮最大效用，確保在極端條件下，救援資訊的傳遞零延誤、高效率。",
  icons: {
    icon: "/icon.jpg",
    shortcut: "/icon.jpg",
  },
};

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

const LIGHT_THEME_COLOR = "hsl(0 0% 100%)";
const DARK_THEME_COLOR = "hsl(240deg 10% 3.92%)";
const THEME_COLOR_SCRIPT = `\
(function() {
  var html = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  function updateThemeColor() {
    var isDark = html.classList.contains('dark');
    meta.setAttribute('content', isDark ? '${DARK_THEME_COLOR}' : '${LIGHT_THEME_COLOR}');
  }
  var observer = new MutationObserver(updateThemeColor);
  observer.observe(html, { attributes: true, attributeFilter: ['class'] });
  updateThemeColor();
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // `next-themes` injects an extra classname to the body element to avoid
      // visual flicker before hydration. Hence the `suppressHydrationWarning`
      // prop is necessary to avoid the React hydration mismatch warning.
      // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_COLOR_SCRIPT,
          }}
        />
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-5J72011VLV"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              gtag('config', 'G-5J72011VLV');
            `,
          }}
        />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
          <FAB />
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
