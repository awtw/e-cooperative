import { Button } from "@/components/ui/button";
import { ChartNoAxesColumn, Plus } from "lucide-react";
import Link from "next/link";

export default function OrganizationPage() {
  return (
  <div>
    <p>組織頁面: 顯示管理任務列表 點擊新增、或是任務會進入到各自內頁</p>
    <Link href="/dashboard/create">
    <Button>新增任務 <Plus /></Button></Link>
    <Link href="/dashboard/1">
    <Button>任務詳細頁面 <ChartNoAxesColumn /></Button></Link>
  </div>);
}