"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentTheme = (resolvedTheme ?? theme) as string | undefined;
  // Only determine dark mode after the component is mounted on the client.
  // This prevents SSR/client markup mismatch (hydration errors).
  const isDark = mounted ? currentTheme === "dark" : undefined;

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      aria-label={mounted ? (isDark ? "切換為淺色" : "切換為深色") : "切換主題"}
      className="h-8 gap-1.5 px-3 text-sm md:h-9 md:gap-2 md:px-4"
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )
      ) : (
        // Render a stable placeholder icon on the server to avoid mismatch.
        <Sun className="h-4 w-4" />
      )}
      <span className="hidden md:inline-block">
        {mounted ? (isDark ? "淺色" : "深色") : null}
      </span>
    </Button>
  );
};

export default ThemeToggle;
