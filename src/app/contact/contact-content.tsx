"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy, Phone, MapPin, MessageCircle } from "lucide-react";
import { useCallback } from "react";
import { LINE_OFFICIAL_URL } from "@/constant";

type PhoneEntry = {
  label: string;
  phones: string[];
  note?: string;
  address?: string;
  hours?: string;
};

type Category = {
  title: string;
  entries: PhoneEntry[];
};

const categories: Category[] = [
  {
    title: "衛生福利部 24 小時免費安心專線",
    entries: [
      { label: "安心專線", phones: ["1925"], note: "(依舊愛我)" },
    ],
  },
  {
    title: "社區心理衛生中心（心理諮詢）",
    entries: [
      { label: "花蓮市", phones: ["03-835-1885", "03-831-1636"] },
      { label: "鳳林鎮", phones: ["03-876-0208"] },
      { label: "玉里鎮", phones: ["03-888-8002"] },
    ],
  },
  {
    title: "大體停放及火化查詢專線",
    entries: [
      {
        label: "查詢專線",
        phones: ["0933-543-303"],
        hours: "8:00-18:00",
        note: "（0923 馬太鞍溪堰塞湖潰壩）",
      },
    ],
  },
  {
    title: "災害藥品諮詢專線",
    entries: [
      { label: "花蓮縣衛生局", phones: ["03-822-4750"] },
    ],
  },
  {
    title: "志工/物資聯繫",
    entries: [
      {
        label:
          "便當餐食需求、捐贈便當、光復車站志工報到聯繫",
        phones: ["0972-223-409", "0972-223-410"],
      },
      { label: "志工媒合專線", phones: ["0975-769-035"], note: "（24 小時）" },
      {
        label: "光復物資據點：光復糖廠",
        phones: ["0966-589-021"],
        address: "光復鄉大進村糖廠街 19 號",
      },
      { label: "車輛安置（大農大富平地森林園區停車場）", phones: ["0910-614-250"] },
      {
        label: "受災戶室內水電修繕",
        phones: ["0972-223-364", "03-822-7171 #423", "03-822-7171 #424"],
        hours: "8:00-12:00、13:30-17:30",
      },
      {
        label: "志工/機具進入災區窗口",
        phones: ["03-870-2025", "0928-249-610"],
        note: "（花蓮縣府前進指揮所 / 花蓮縣警察局顏科長）",
      },
      { label: "山貓、夾子車、怪手、清溝車機具支援", phones: ["0972-223-415"] },
    ],
  },
  {
    title:
      "災民申辦地政業務（權利書狀補發、地籍謄本、測量、複丈、繼承登記免收規費）",
    entries: [
      { label: "花蓮縣政府地政處地籍科", phones: ["03-822-4926"] },
      { label: "花蓮地政事務所", phones: ["03-822-5135 #101"] },
      { label: "鳳林地政事務所", phones: ["03-876-1103 #113"] },
      { label: "玉里地政事務所", phones: ["03-888-3171 #125"] },
      { label: "花蓮縣衛生局", phones: ["03-822-6975"] },
      { label: "發放慰問金專線", phones: ["03-823-0400"] },
    ],
  },
  {
    title: "災害損失稅捐減免與監理單位",
    entries: [
      {
        label: "花蓮縣地方稅務局（總局）",
        phones: [
          "03-822-621",
          "地價稅 #182-187",
          "房屋稅 #232-239",
          "娛樂稅 #148",
          "使用牌照稅 #242-248",
        ],
      },
      {
        label: "花蓮縣地方稅務局（玉里分局）",
        phones: [
          "03-888-2047",
          "地價稅 #222,#253",
          "房屋稅 #212,#213",
          "娛樂稅 #231,#233",
          "使用牌照稅 #231,#233",
        ],
      },
      { label: "財政部北區國稅局花蓮分局", phones: ["03-8311860"] },
      { label: "玉里稽徵所", phones: ["03-888-1070"] },
      { label: "臺北區監理所 花蓮監理站", phones: ["03-8523-166"] },
      { label: "玉里監理分站", phones: ["03-888-3161"] },
    ],
  },
];

const normalizeTelHref = (raw: string) => {
  const onlyDigitsAndPlus = raw.replace(/[^0-9+#]/g, "");
  return onlyDigitsAndPlus.replace(/#/g, ",");
};

const ContactContent = () => {
  const handleCopy = useCallback((text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
  }, []);

  return (
    <main className="min-h-screen py-10 md:py-14">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
        <header className="mb-8 md:mb-10">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            各大聯絡專線
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            花蓮縣光復鄉馬太鞍溪堰塞湖救災相關專線整理。點擊電話即可撥打。
          </p>
        </header>

        {/* LINE 官方帳號 CTA */}
        <Card className="mb-6">
          <CardContent className="flex flex-col items-start justify-between gap-3 p-5 md:flex-row md:items-center md:gap-4 md:p-6">
            <div className="flex items-start gap-3">
              <div className="rounded-md bg-primary/10 p-2 text-primary">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">加入 LINE 官方帳號</p>
                <p className="text-sm text-muted-foreground">
                  即時接收最新通知與聯繫方式，掃描或點擊連結加入。
                </p>
              </div>
            </div>
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="加入 LINE 官方帳號 (另開新視窗)"
            >
              <Button className="w-full md:w-auto">
                <MessageCircle className="h-4 w-4" />
                <span>加入 LINE 官方帳號</span>
              </Button>
            </a>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {categories.map((category) => (
            <Card key={category.title}>
              <CardContent className="p-5 md:p-6">
                <h2 className="mb-3 text-lg font-semibold md:text-xl">
                  {category.title}
                </h2>
                <Separator className="mb-4" />

                <ul className="space-y-4">
                  {category.entries.map((entry) => (
                    <li key={entry.label} className="flex flex-col gap-2">
                      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="font-medium">
                            {entry.label}
                            {entry.note ? (
                              <span className="ml-2 text-muted-foreground">
                                {entry.note}
                              </span>
                            ) : null}
                          </p>
                          {entry.address ? (
                            <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{entry.address}</span>
                            </p>
                          ) : null}
                          {entry.hours ? (
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              營業/服務時間：{entry.hours}
                            </p>
                          ) : null}
                        </div>

                        <div className="mt-2 grid grid-cols-1 gap-2 md:mt-0 md:grid-cols-2">
                          {entry.phones.map((p) => (
                            <div key={p} className="flex items-center gap-2">
                              <a
                                href={`tel:${normalizeTelHref(p)}`}
                                className="inline-flex items-center gap-1.5 text-primary hover:underline"
                                aria-label={`撥打 ${p}`}
                              >
                                <Phone className="h-4 w-4" />
                                <span>{p}</span>
                              </a>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2 text-xs"
                                aria-label={`複製電話 ${p}`}
                                onClick={() => handleCopy(p)}
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ContactContent;


