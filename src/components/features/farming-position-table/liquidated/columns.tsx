"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Typography } from "@/components/shared/ui/typography";
import { Skeleton } from "@/components/shared/ui/skeleton";
import { Button } from "@/components/shared/ui/button";
import { Icons } from "@/components/shared/custom/base-icon";
import PairToken from "@/components/shared/custom/pair-token";
import { Badge } from "@/components/shared/ui/badge";
import { Separator } from "@radix-ui/react-separator";
import { CornerUpRight } from "lucide-react";
import { TokenIcon } from "@/components/shared/custom/token-icon";
import { capitalize } from "@/libs/utils/string";

export interface LiquidatedPosition {
  id: string;
  poolId: string;
  platform: string;
  tokens: {
    symbol: string;
    amount: string;
  }[];
  capital: {
    total: string;
    token1Amount: string;
    token2Amount: string;
  };
  finalPosition: {
    total: string;
    token1Amount: string;
    token2Amount: string;
  };
  returnedEquity: {
    total: string;
  };
  txRecord: string;
}

export const liquidatedPositionColumns: ColumnDef<LiquidatedPosition>[] = [
  {
    accessorKey: "pool",
    header: () => "Pool/ TVL",
    cell: ({ row }) => {
      const position = row.original;
      return (
        <div className="fcol min-w-[100px] gap-1">
          <div className="frow-icenter gap-4">
            <PairToken symbols={[position.tokens[0].symbol, position.tokens[1].symbol]} size={36} intersectSize={5} />
            <div className="fcol gap-0.5">
              <Typography>{`${position.tokens[0].symbol.toUpperCase()}.e-${position.tokens[1].symbol.toUpperCase()}`}</Typography>
              <Typography variant="small" color="submerged" className="font-mono">
                #{position.poolId}
              </Typography>
              <Badge variant="third" className="frow-center h-[24px] w-[80px] gap-1">
                <Icons.Thala className="size-3.5" color="embossed" />
                <Typography variant="small">{capitalize(position.platform)}</Typography>
              </Badge>
            </div>
          </div>
        </div>
      );
    },
    meta: {
      skeleton: (
        <div className="fcol min-w-[100px] gap-4">
          <div className="frow gap-4">
            <div className="frow-center relative w-[62px]">
              <Skeleton className="absolute right-0 h-9 w-9 rounded-full" />
              <Skeleton className="absolute left-0 h-9 w-9 rounded-full" />
            </div>
            <div className="fcol gap-0.5">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    accessorKey: "capital",
    header: () => "Capital",
    cell: ({ row }) => {
      const position = row.original;
      return (
        <div className="fcol min-w-[120px] gap-0.5">
          <Typography>{position.capital.total}</Typography>
          <Separator className="my-1 border-t" />
          <div className="fcol gap-0.5">
            <div className="frow-icenter gap-1">
              <TokenIcon symbol={position.tokens[0].symbol} size={18} />
              <Typography variant="small" color="submerged">
                {position.capital.token1Amount}
              </Typography>
            </div>
            <div className="frow-icenter gap-1">
              <TokenIcon symbol={position.tokens[1].symbol} size={18} />
              <Typography variant="small" color="submerged">
                {position.capital.token2Amount}
              </Typography>
            </div>
          </div>
        </div>
      );
    },
    meta: {
      skeleton: (
        <div className="fcol min-w-[120px] gap-0.5">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-1 w-full rounded-full" />
          <div className="fcol gap-0.5">
            <div className="frow gap-1">
              <Skeleton className="h-[18px] w-[18px] rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="frow gap-1">
              <Skeleton className="h-[18px] w-[18px] rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    accessorKey: "finalPosition",
    header: () => "Total Final Position",
    cell: ({ row }) => {
      const position = row.original;
      return (
        <div className="fcol min-w-[120px] gap-0.5">
          <Typography>{position.finalPosition.total}</Typography>
          <Separator className="my-1 border-t" />
          <div className="fcol gap-0.5">
            <div className="frow-icenter gap-1">
              <TokenIcon symbol={position.tokens[0].symbol} size={18} />
              <Typography variant="small" color="submerged">
                {position.finalPosition.token1Amount}
              </Typography>
            </div>
            <div className="frow-icenter gap-1">
              <TokenIcon symbol={position.tokens[1].symbol} size={18} />
              <Typography variant="small" color="submerged">
                {position.finalPosition.token2Amount}
              </Typography>
            </div>
          </div>
        </div>
      );
    },
    meta: {
      skeleton: (
        <div className="fcol min-w-[120px] gap-0.5">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-1 w-full rounded-full" />
          <div className="fcol gap-0.5">
            <div className="frow gap-1">
              <Skeleton className="h-[18px] w-[18px] rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="frow gap-1">
              <Skeleton className="h-[18px] w-[18px] rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    accessorKey: "returnedEquity",
    header: () => "Returned Equity Value",
    cell: ({ row }) => {
      const position = row.original;
      return (
        <div className="fcol min-w-[120px] gap-0.5">
          <Typography>{position.returnedEquity.total}</Typography>
        </div>
      );
    },
    meta: {
      skeleton: (
        <div className="fcol min-w-[120px] gap-0.5">
          <Skeleton className="h-5 w-24" />
        </div>
      ),
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const position = row.original;
      return (
        <Button
          variant="outline"
          className="border-success/20 rounded-full bg-[#14191c] px-3 py-2.5"
          onClick={() => window.open(position.txRecord, "_blank")}
        >
          <div className="frow-icenter gap-2">
            <Typography variant="small" className="font-mono">
              Tx Record
            </Typography>
            <CornerUpRight className="size-4" />
          </div>
        </Button>
      );
    },
    meta: {
      skeleton: (
        <div className="frow-icenter">
          <Skeleton className="h-9 w-[100px] rounded-full" />
        </div>
      ),
    },
  },
];
