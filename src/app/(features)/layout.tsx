"use client";

import { Suspense } from "react";
import Loading from "@/app/loading";

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
