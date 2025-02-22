import { Typography } from "@/components/shared/ui/typography";
import TvlSection from "./tvl-section";
import YieldStatsSection from "./yield-stats-section";
import { FourCornerPlusIcon } from "@/components/shared/custom/plus-icon/partial-plus-icon";
import { FarmingStat } from "@/store/types/banner.type";
import { useBoundStore } from "@/store";
import { usePathname } from "next/navigation";
import LendingStatsItem from "@/components/shared/custom/banner-yield-stats/lending-stats-item";
import { LendingStat } from "@/store/types/banner.type";
import FarmingStatsItem from "@/components/shared/custom/banner-yield-stats/farming-stats-item";

export default function BannerLayout() {
  const yieldStats = useBoundStore((state) => state.bannerData!.yieldStats);
  const pathname = usePathname();
  // const [currentIndex, setCurrentIndex] = useState(0);

  const isLendingPath = pathname.includes("/lend");
  const currentData = isLendingPath ? yieldStats?.lendingStats : yieldStats?.farmingStats;
  return (
    <div className="fcol">
      <div className="frow relative h-[100px] w-full max-w-full border-b border-t bg-grid-black/[0.2] lg:h-[144px] dark:bg-grid-white/[0.2]">
        {/* plus icons for 4 corners*/}
        <FourCornerPlusIcon />

        {/* TVL section */}
        <TvlSection />

        {/* yield stats section */}
        <div className="hidden h-full w-full lg:block">
          <YieldStatsSection />
        </div>
      </div>
      <div className="w-full py-4 lg:hidden">
        <Typography variant="h4" color="submerged" className="mb-2 text-center">
          Earn up to
        </Typography>
        <div className="w-full overflow-x-auto">
          <div className="frow no-scrollbar flex-nowrap gap-4 px-4 py-2">
            {currentData.map((item, index) => {
              if (isLendingPath) {
                return (
                  <div key={index} className="shrink-0">
                    <LendingStatsItem {...(item as LendingStat)} />
                  </div>
                );
              }
              return (
                <div key={index} className="shrink-0">
                  <FarmingStatsItem {...(item as FarmingStat)} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
