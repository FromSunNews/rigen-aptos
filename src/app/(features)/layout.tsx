"use client";

import { Suspense } from "react";
import Loading from "@/app/loading";
import { Header } from "@/components/shared/layout/header";

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="mt-[var(--header-height)]">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </>
  );
}
