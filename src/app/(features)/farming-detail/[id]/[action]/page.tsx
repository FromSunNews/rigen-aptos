"use client";

import { BackButton } from "@/components/features/farming-detail/back-button";
import { PoolInfo } from "@/components/features/farming-detail/pool-info";
import { FarmingDetailSection } from "@/components/features/farming-detail/farming-detail-section";
export default function FarmingDetailPage() {
  return (
    <div className="space-y-4 pt-4">
      <BackButton />
      <PoolInfo />
      <FarmingDetailSection />
    </div>
  );
}
