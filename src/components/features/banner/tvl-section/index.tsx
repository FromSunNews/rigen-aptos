"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { PlusIcon } from "@/components/shared/custom/plus-icon/plus-icon";
import { Typography } from "@/components/shared/ui/typography";
import { useBoundStore } from "@/store";

const CountUp = dynamic(() => import("react-countup"), {
  ssr: false,
});

export default function TVLSection() {
  const bannerData = useBoundStore((state) => state.bannerData);
  const startBannerUpdates = useBoundStore((state) => state.startBannerUpdates);
  const stopBannerUpdates = useBoundStore((state) => state.stopBannerUpdates);

  useEffect(() => {
    startBannerUpdates();
    return () => stopBannerUpdates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fcol-center relative w-full gap-1 bg-secondary/5 lg:w-[30%] lg:border-r 2xl:w-[35%]">
      {/* plus icons for 2 top/bottom right corners */}
      <PlusIcon position="end-x" color="primary" className="hidden lg:block" />
      <Typography className="text-lg lg:text-base" color="submerged">
        Total Value Locked
      </Typography>
      <Typography variant="h1">
        <CountUp prefix="$" separator="," decimals={0} duration={2} end={bannerData?.tvl || 0} preserveValue />
      </Typography>
    </div>
  );
}
