"use client";

import dynamic from "next/dynamic";
import { farmingPositions } from "@/components/features/farming-position-table/default/data";

const BannerLayout = dynamic(() => import("@/components/features/banner/layout"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const PoolTablePage = dynamic(() => import("@/components/features/pool-table"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const FarmingPositionTablePage = dynamic(() => import("@/components/features/farming-position-table"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function FarmPage() {
  return (
    <div className="mx-auto space-y-6">
      {/* banner */}
      <BannerLayout />

      {/* farming position table */}
      <FarmingPositionTablePage data={farmingPositions} />

      {/* pool table */}
      <PoolTablePage />
    </div>
  );
}
