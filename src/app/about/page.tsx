import type { Metadata } from "next";
import {
  AlertCircle,
  Users,
  Package,
  Wrench,
  User,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "關於平台 - 光復 e 互助",
  description:
    "光復 e 互助 — 數據驅動的高效率災害應變數位平台。準確的數據是救災成功的基石,實現零延誤、高效率的救援資訊傳遞。",
  keywords: "災害應變, 志工平台, 物資管理, 花蓮光復, 救災系統",
};

const painPoints = [
  {
    id: 1,
    problem: "資訊分散與需求更新不及時",
    solution: "建立受災戶專屬帳號,主動發布並即時更新需求",
    icon: AlertCircle,
  },
  {
    id: 2,
    problem: "志工組織任務分配與管理不易",
    solution: "平台直接發布任務、認領需求、進度追蹤",
    icon: Users,
  },
  {
    id: 3,
    problem: "物資發放與盤點流程繁瑣",
    solution: "整合募集、盤點與分配物資流程",
    icon: Package,
  },
  {
    id: 4,
    problem: "自主團隊缺乏任務管理工具",
    solution: "開設專屬帳號,提供任務管理權限",
    icon: Wrench,
  },
];

const roleFeatures = [
  {
    role: "victim",
    title: "受災戶",
    subtitle: "需求發布者",
    icon: User,
    features: [
      "精確發布需求 (地點、物資、協助項目)",
      "即時編輯需求進度 (待處理、進行中、完成)",
    ],
  },
  {
    role: "volunteer",
    title: "志工與組織",
    subtitle: "支援執行者",
    icon: Users,
    features: [
      "發起志工任務 (人數、地點、工作項目)",
      "認領受災戶需求",
      "查看需求清單並認領物資運送",
    ],
  },
  {
    role: "supply",
    title: "物資管理",
    subtitle: "資源供應者",
    icon: Package,
    features: [
      "管理物資品項與站點",
      "接收志工物資需求",
      "預訂、領取、運輸標準化流程",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
              光復 e 互助
            </h1>
            <p className="mb-6 text-xl text-muted-foreground md:text-2xl">
              數據驅動的高效率災害應變數位平台
            </p>
            <div className="mx-auto max-w-2xl">
              <p className="mb-8 text-base leading-relaxed text-foreground/80 md:text-lg">
                我們堅信,
                <span className="font-semibold text-primary">
                  準確的數據是救災成功的基石
                </span>
                。我們的團隊目標是將複雜的物資需求與緊急通報系統整合簡化,讓救援資訊的傳遞達到
                <span className="font-semibold text-secondary">
                  零延誤、高效率
                </span>
                。
              </p>
            </div>
            <Link href="/list">
              <Button size="lg" className="gap-2">
                開始使用平台
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              我們解決了哪些痛點?
            </h2>
            <p className="text-muted-foreground">
              在傳統的救災行動中,資訊分散與流程繁瑣往往延誤了寶貴的救援時間
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {painPoints.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-start gap-4">
                      <div className="rounded-lg bg-warning/10 p-3">
                        <Icon className="h-6 w-6 text-warning" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 font-semibold text-warning">
                          {item.problem}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-lg bg-success/5 p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                      <p className="text-sm text-foreground/80">
                        {item.solution}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features by Role Section */}
      <section className="bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              精準連結需求與資源
            </h2>
            <p className="text-muted-foreground">
              為所有參與救災的角色提供精確的工具與權限
            </p>
          </div>

          <Tabs defaultValue="victim" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {roleFeatures.map((role) => {
                const Icon = role.icon;
                return (
                  <TabsTrigger
                    key={role.role}
                    value={role.role}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden md:inline">{role.title}</span>
                    <span className="md:hidden">{role.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {roleFeatures.map((role) => {
              const Icon = role.icon;
              return (
                <TabsContent
                  key={role.role}
                  value={role.role}
                  className="mt-6"
                >
                  <Card>
                    <CardContent className="p-6 md:p-8">
                      <div className="mb-6 flex items-center gap-4">
                        <div className="rounded-lg bg-primary/10 p-3">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{role.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {role.subtitle}
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {role.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                            <span className="text-foreground/80">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* Platform Vision Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-2xl font-bold md:text-3xl">
              我們的願景
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-foreground/80">
              我們是「光復 e 互助平台」團隊,由
              <span className="font-semibold text-primary">民間力量發起</span>
              ,並與
              <span className="font-semibold text-primary">
                花蓮縣地方政府合作
              </span>
              。我們的核心願景是透過高效、可靠的數位平台,
              <span className="font-semibold text-secondary">
                徹底優化花蓮光復鄉的災害應變流程
              </span>
              。
            </p>
            <p className="text-base text-muted-foreground">
              我們整合了工程師的技術專長與在地聯繫窗口的溝通能力,以發揮最大的救災效益
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              立即開始使用
            </h2>
            <p className="mb-8 text-muted-foreground">
              加入光復 e 互助平台,一起為更高效的災害應變貢獻力量
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/list">
                <Button size="lg" className="gap-2">
                  瀏覽任務列表
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="gap-2">
                  組織登入
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
