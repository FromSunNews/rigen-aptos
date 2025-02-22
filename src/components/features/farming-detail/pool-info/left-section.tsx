"use client";

import { Typography } from "@/components/shared/ui/typography";
import PairToken from "@/components/shared/custom/pair-token";
import CountUp from "react-countup";
import { FarmingPoolUI } from "@/store/types/farming-pool.type";
import { useMultipleTokenPrices, useTokenPrice } from "@/hooks/apis/use-token-price";
import { Skeleton } from "@/components/shared/ui/skeleton";

interface LeftSectionProps {
  poolData: FarmingPoolUI;
}

export const LeftSection = ({ poolData }: LeftSectionProps) => {
  const { data: prices, isLoading } = useMultipleTokenPrices(poolData.pairTokens);
  console.log("prices", prices);
  
  return (
    <div className="flex w-full flex-1 items-center gap-4 p-4 sm:ps-10">
      <div className="flex items-center">
        <PairToken symbols={[poolData.pairTokens[0], poolData.pairTokens[1]]} size={36} intersectSize={5} />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-4">
          <Typography variant="h2">
            Farm {poolData.pairTokens[0].toUpperCase()} - {poolData.pairTokens[1].toUpperCase()} Pool
          </Typography>
        </div>
        <div className="flex items-center gap-1 text-submerged">
          <span>1 {poolData.pairTokens[0]} = </span>
          {
            isLoading ? (
              <Skeleton className="h-4 w-4" />
            ) : (
              <CountUp 
                decimals={5} 
                duration={1} 
                end={prices && prices.length > 0
                  ? Number((prices[poolData.pairTokens[1]] / prices[poolData.pairTokens[0]]).toFixed(5))
                  : 0
                } 
                preserveValue 
                className="text-sm" 
              />
            )
          }
          <span> {poolData.pairTokens[1]}</span>
        </div>
      </div>
    </div>
  );
};
