import { Suspense } from "react";
import HomeRedirectClient from "./home-redirect-client";

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">載入中...</p>
      </div>
    }>
      <HomeRedirectClient />
    </Suspense>
  );
}
