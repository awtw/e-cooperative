// Google Analytics utilities
// Prefer configuring GA via env: NEXT_PUBLIC_GA_ID. Falls back to provided GAID.

export const GA_ID: string | undefined =
  process.env.NEXT_PUBLIC_GA_ID || "G-LX6EPYGE00";

export const isProduction = process.env.NODE_ENV === "production";

type GTagConfig = {
  page_path?: string;
  debug_mode?: boolean;
  [key: string]: unknown;
};

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js",
      targetIdOrEventName: string | Date,
      config?: GTagConfig
    ) => void;
    dataLayer?: unknown[];
  }
}

export const sendPageview = (url: string): void => {
  if (!GA_ID) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("config", GA_ID, {
    page_path: url,
    debug_mode: !isProduction,
  });
};

export const sendEvent = (
  eventName: string,
  params?: Record<string, unknown>
): void => {
  if (!GA_ID) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, {
    debug_mode: !isProduction,
    ...params,
  } as GTagConfig);
};


