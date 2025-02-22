"use client";

import { Typography } from "@/components/shared/ui/typography";
import { FarmingPosition } from "@/components/features/farming-position-table/default/columns";
import PairToken from "@/components/shared/custom/pair-token";
import { Icons } from "../../base-icon";
import { capitalize } from "@/libs/utils/string";

export function FarmingContent({ data, isMobile }: { data: FarmingPosition; isMobile: boolean }) {
  return (
    <>
      <div className="frow-icenter gap-2 md:gap-4">
        <Typography className="text-xs md:text-base">APR</Typography>
        <Typography className="font text-2xl text-primary md:text-5xl">{data.earn.apr}%</Typography>
      </div>

      <div className="frow-icenter gap-2 md:gap-4">
        <PairToken symbols={[data.tokens[0].symbol, data.tokens[1].symbol]} size={isMobile ? 15 : 30} />
        <div className="fcol gap-1">
          <Typography className="text-sm md:text-lg">
            {data.tokens[0].symbol.toUpperCase()}.e-${data.tokens[1].symbol.toUpperCase()}
          </Typography>
          <div className="frow-center gap-1 rounded-lg bg-third px-2 py-1">
            <Icons.Thala className="size-3.5" color="embossed" />
            <Typography className="text-xs md:text-base">{capitalize(data.platform)}</Typography>
          </div>
        </div>
      </div>

      <div className="frow-between w-[80%] items-center bg-secondary px-4 py-2">
        <div className="fcol gap-1">
          <Typography className="text-sm">Position Value</Typography>
          <Typography className="text-xs md:text-base">{data.position.total}</Typography>
        </div>
        <div className="fcol gap-1">
          <Typography className="text-sm">Daily Earning</Typography>
          <Typography className="text-xs md:text-base">{data.earn.daily.amount}</Typography>
        </div>
      </div>
    </>
  );
}
