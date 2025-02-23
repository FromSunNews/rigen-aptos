"use client";
import React from "react";
import { Typography } from "@/components/shared/ui/typography";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useBoundStore } from "@/store";
import { FarmingStat, LendingStat } from "@/store/types/banner.type";
import LendingStatsItem from "@/components/shared/custom/banner-yield-stats/lending-stats-item";
import FarmingStatsItem from "@/components/shared/custom/banner-yield-stats/farming-stats-item";
import { cn } from "@/libs/utils/taildwind";

const bannerData = [
  [
    {
      image: "/images/banner/layer.png",
      position: "-bottom-10 -right-4",
      size: 181,
    },
  ],
  [
    {
      image: "/images/banner/usd_token.png",
      position: "right-0",
      size: 181,
    },
  ],
  [
    {
      image: "/images/banner/usd_token.png",
      position: "bottom-3 right-[100px]",
      size: 181,
    },
    {
      image: "/images/banner/aptos_token.png",
      position: "top-3 -right-10",
      size: 181,
    },
  ],
];

export default function YieldStatsSection() {
  const BANNER_COUNT = bannerData.length;
  const yieldStats = useBoundStore((state) => state.bannerData!.yieldStats);
  const pathname = usePathname();
  const [currentBannerIndex, setCurrentBannerIndex] = React.useState(0);

  const rotateBanner = React.useCallback(() => {
    setCurrentBannerIndex((prev) => (prev + 1) % BANNER_COUNT);
  }, [BANNER_COUNT]);

  React.useEffect(() => {
    const interval = setInterval(rotateBanner, 3000);
    return () => clearInterval(interval);
  }, [rotateBanner]);

  const isLendingPath = pathname.includes("/lend");
  const currentData = isLendingPath ? yieldStats?.lendingStats : yieldStats?.farmingStats;

  return (
    <div className="frow-icenter relative h-full w-full overflow-hidden ps-2 lg:ps-10">
      <div className="fcol gap-2">
        <Typography variant="p" color="submerged">
          Earn up to
        </Typography>

        {/* Desktop View */}
        <div className="hidden lg:block">
          <div className="frow-icenter gap-4">
            {currentData.map((item, index) => {
              if (isLendingPath) {
                return <LendingStatsItem key={index} {...(item as LendingStat)} />;
              }
              return <FarmingStatsItem key={index} {...(item as FarmingStat)} />;
            })}
          </div>
        </div>
      </div>

      {bannerData[currentBannerIndex].map((banner, index) => (
        <Image
          key={index}
          alt="banner"
          src={banner.image}
          width={banner.size}
          height={banner.size}
          className={cn(banner.position, "absolute z-[-5] object-contain opacity-50 transition-opacity duration-500")}
        />
      ))}
    </div>
  );
}
