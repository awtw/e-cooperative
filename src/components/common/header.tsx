"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export const Header = () => {
    const session = useSession();
  return (
    <header className="flex justify-between items-center">
        歡迎回來, {session?.data?.user?.email}!
      <Button onClick={() => signOut()}>登出</Button>
    </header>
  );
};