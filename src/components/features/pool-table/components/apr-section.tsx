"use client";

import { Badge } from "@/components/shared/ui/badge";
import { Typography } from "@/components/shared/ui/typography";
import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shared/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { TokenIcon } from "@/components/shared/custom/token-icon";
import CountUp from "react-countup";
import { cn } from "@/libs/utils/taildwind";
import { useMobile } from "@/hooks/shared/use-mobile";
import { FarmingPoolUI } from "@/store/types/farming-pool.type";
import { useBoundStore } from "@/store";

export const AprSection = ({ row }: { row: Row<FarmingPoolUI> }) => {
  const isMobile = useMobile();
  const updateBorrowTokens = useBoundStore(state => state.farmingPoolState.updateBorrowTokens);

  return (
    <div className={cn("fcol-jcenter items-end gap-1 w-[300px]", isMobile && "my-2 rounded-xl bg-third p-2 w-auto")}>
      {/* APR Breakdown */}
      <div className="fcol h-16 w-full gap-1 border-b border-white/20 pb-1">
        {/* Yield Farming */}
        <div className="frow-between w-full ps-8">
          <Typography variant="small" color="submerged">
            Yield Farming
          </Typography>
          <Typography variant="small" className="text-right">
            <CountUp end={row.original.apr.yieldFarming} decimals={2} duration={2} suffix="%" preserveValue={true} />
          </Typography>
        </div>

        {/* Protocol rewards */}
        <div className="frow-between w-full ps-8">
          <Typography variant="small" color="submerged">
            Protocol Rewards
          </Typography>
          <Typography variant="small" className="text-right">
            <CountUp end={row.original.apr.protocolRewards} decimals={2} duration={2} suffix="%" preserveValue={true} />
          </Typography>
        </div>

        {/* Borrowing Interest */}
        <div className="frow-between w-full">
          <div className="frow-icenter">
            <Typography variant="small" color="submerged" className="w-8 text-center">
              -
            </Typography>
            <Typography variant="small" color="submerged">
              Borrowing Interest
            </Typography>
            <DropdownMenu>
              <DropdownMenuTrigger className="frow-icenter bg-background-secondary gap-0.5 rounded-3xl px-2 py-0.5">
                <TokenIcon symbol={row.original.borrowTokens.selected} size={16} />
                <ChevronDownIcon className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {row.original.borrowTokens.options.map((token) => (
                  <DropdownMenuItem 
                    key={token} 
                    onSelect={() => updateBorrowTokens(token, row.original.id)}
                  >
                    <div className="frow-icenter gap-2">
                      <TokenIcon symbol={token} size={16} />
                      <span>{token.toUpperCase()}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Typography variant="small" className="text-right">
            <CountUp end={row.original.apr.borrowingInterest} decimals={2} duration={2} suffix="%" preserveValue={true} />
          </Typography>
        </div>
      </div>

      {/* Total APR */}
      <div className="frow-between w-full">
        <div className="frow-icenter">
          <Typography variant="small" color="submerged" className="w-8 text-center">
            =
          </Typography>
          <Typography variant="small" color="submerged">
            Total APR
          </Typography>
        </div>
        <Typography variant="small" className="text-right">
          <CountUp end={row.original.apr.total} decimals={2} duration={2} suffix="%" preserveValue={true} />
        </Typography>
      </div>

      {/* Daily APR */}
      <Badge variant="secondary" className="rounded-full px-2 py-0.5">
        <Typography variant="small">
          Daily APR <CountUp end={row.original.apr.daily} decimals={2} duration={2} suffix="%" preserveValue={true} />
        </Typography>
      </Badge>
    </div>
  );
};
