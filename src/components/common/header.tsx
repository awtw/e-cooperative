"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Logo } from "./logo";
import { COMPANY_NAME } from "@/constant";
import { LogIn, LogOut, User, Settings, Info } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  const session = useSession();
  const isAuthenticated = session?.data?.user?.email;
  const userName = session?.data?.user?.name || session?.data?.user?.email;
  const router = useRouter();

  const handleLogout = () => {
    signOut();
  };

  const handleLogin = () => {
    router.push("/login");
  };

  // 取得使用者名稱縮寫 (用於 Avatar)
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    const names = name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* Logo 與標題 */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Logo 前往首頁 */}
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* 標題前往列表頁 */}
          <Link href="/list" className="text-lg font-bold md:text-xl">
            {COMPANY_NAME}
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              關於平台
            </Link>
          </nav>
        </div>

        {/* 登入狀態 */}
        {isAuthenticated ? (
          // 已登入 - 顯示使用者 Dropdown
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-auto gap-2 rounded-full px-2 md:px-3"
                aria-label="使用者選單"
              >
                <Avatar className="h-7 w-7 md:h-8 md:w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {getInitials(userName)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block text-sm font-medium">
                  {userName}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>我的帳號</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                <User className="mr-2 h-4 w-4" />
                <span>我的任務</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/create")}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>建立任務</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push("/about")}
                className="md:hidden"
              >
                <Info className="mr-2 h-4 w-4" />
                <span>關於平台</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>登出</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          // 未登入 - 顯示登入按鈕
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogin}
            className="h-8 gap-1.5 px-3 text-sm md:h-9 md:gap-2 md:px-4"
          >
            <LogIn className="h-4 w-4" />
            <span>組織登入</span>
          </Button>
        )}
      </div>
    </header>
  );
};
