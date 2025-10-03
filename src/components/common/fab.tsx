"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const FAB = () => {
  const router = useRouter();
  const session = useSession();
  const isAuthenticated = session?.data?.user?.email;

  // 只在已登入且手機版時顯示
  if (!isAuthenticated) {
    return null;
  }

  const handleCreate = () => {
    router.push("/dashboard/create");
  };

  return (
    <Button
      onClick={handleCreate}
      size="icon"
      className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-xl md:hidden"
      aria-label="建立任務"
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
};
