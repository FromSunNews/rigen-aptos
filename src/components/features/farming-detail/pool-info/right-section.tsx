"use client";

import { PlusIcon } from "@/components/shared/custom/plus-icon/plus-icon";
import { Typography } from "@/components/shared/ui/typography";
import CountUp from "react-countup";
import { FarmingPoolUI } from "@/store/types/farming-pool.type";

interface RightSectionProps {
  poolData: FarmingPoolUI;
}

export const RightSection = ({ poolData }: RightSectionProps) => {
  return (
    <div className="grid w-full grid-cols-3 border-t py-3 sm:w-[40%] sm:border-l sm:border-t-0 sm:py-0">
      <div className="fcol-center relative gap-[9px]">
        <PlusIcon position="start-x" color="primary" className="hidden sm:block" />
        <Typography variant="small" color="submerged">
          TVL
        </Typography>
        <div className="flex items-center text-base">
          <span>$</span>
          <CountUp
            end={poolData.tvl}
            preserveValue
            duration={1}
            separator=","
            formattingFn={(value) => (value / 1000000).toFixed(2) + "M"}
          />
        </div>
      </div>

      <div className="fcol-center relative gap-[9px] border-l">
        <PlusIcon position="start-x" color="primary" className="hidden sm:block" />
        <Typography variant="small" color="submerged">
          APY (3x)
        </Typography>
        <div className="flex items-center text-base">
          <CountUp end={poolData.apr.total} preserveValue duration={1} decimals={2} />
          <span>%</span>
        </div>
      </div>

      <div className="fcol-center relative gap-[9px] border-l">
        <PlusIcon position="start-x" color="primary" className="hidden sm:block" />
        <Typography variant="small" color="submerged">
          DEX
        </Typography>
        <Typography>{poolData.platform}</Typography>
      </div>
    </div>
  );
};
