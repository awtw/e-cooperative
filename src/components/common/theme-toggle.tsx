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
  const isDark = currentTheme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      aria-label={isDark ? "切換為淺色" : "切換為深色"}
      className="h-8 gap-1.5 px-3 text-sm md:h-9 md:gap-2 md:px-4"
    >
      {mounted ? (
        isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="hidden md:inline-block">{isDark ? "淺色" : "深色"}</span>
    </Button>
  );
};

export default ThemeToggle;


