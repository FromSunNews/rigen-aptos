"use client";

import { Typography } from "@/components/shared/ui/typography";
import { UIPostionReserveData } from "@/clients/types/view/pool/position";
import { TokenIcon } from "../../token-icon";

export function LendingContent({ data, isMobile }: { data: UIPostionReserveData; isMobile: boolean }) {
  return (
    <>
      <div className="frow-icenter gap-2 md:gap-4">
        <Typography className="text-xs md:text-base">APY</Typography>
        <Typography className="font text-2xl text-primary md:text-5xl">{data.liquidityRate}%</Typography>
      </div>

      <div className="frow-icenter gap-2 md:gap-4">
        <TokenIcon symbol={data.symbol} size={isMobile ? 15 : 30} isPlatform={true} />
        <Typography className="text-sm md:text-lg">{data.symbol} Lending</Typography>
      </div>

      <div className="frow-between w-[80%] items-center bg-secondary px-4 py-2">
        <div className="fcol gap-1">
          <Typography className="text-sm">Duration</Typography>
          <Typography className="text-xs md:text-base">3 Day 1 Hr 38 Minutes</Typography>
        </div>
        <div className="fcol gap-1">
          <Typography className="text-sm">Since</Typography>
          <Typography className="text-xs md:text-base">November 26, 2024 11:07am</Typography>
        </div>
      </div>
    </>
  );
}
