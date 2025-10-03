"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Logo } from "./logo";
import { COMPANY_NAME } from "@/constant";

export const Header = () => {
  const session = useSession();
  const isAuthenticated = session?.data?.user?.email;
  const router = useRouter();
  const handleOnClick = () => {
    if (isAuthenticated) {
      signOut();
    } else {
      router.push("/login");
    }
  };
  return (
    <header className="flex justify-between items-center p-2">
      <div className="flex items-center gap-2">
        <Logo />
        <h1 className="text-xl font-bold">{COMPANY_NAME}</h1>
      </div>
      <Button onClick={handleOnClick}>
        {isAuthenticated ? "登出" : "登入"}
      </Button>
    </header>
  );
};
