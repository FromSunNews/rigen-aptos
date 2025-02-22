"use client";

import { FourCornerPlusIcon } from "@/components/shared/custom/plus-icon/partial-plus-icon";
import { LeftSection } from "./left-section";
import { RightSection } from "./right-section";
import { farmingDetailSelector } from "@/store/selectors/farming-detail.selector";

export const PoolInfo = () => {
  const { poolSelected } = farmingDetailSelector();
  // if (isLoading) {
  //   return <PoolInfoSkeleton />;
  // }

  if (!poolSelected) return null;

  return (
    <div className="relative flex w-full flex-col items-center border sm:flex-row sm:items-stretch">
      {/* plus icons for 4 corners*/}
      <FourCornerPlusIcon />

      {/* Left section with pool info */}
      <LeftSection poolData={poolSelected} />

      {/* Right section with stats */}
      <RightSection poolData={poolSelected} />
    </div>
  );
};
