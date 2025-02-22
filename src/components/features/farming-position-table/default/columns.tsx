"use client";

import { ColumnDef, CellContext, Row } from "@tanstack/react-table";
import { Typography } from "@/components/shared/ui/typography";
import { Skeleton } from "@/components/shared/ui/skeleton";
import { Button } from "@/components/shared/ui/button";
import { ChevronDown } from "lucide-react";
import PairToken from "@/components/shared/custom/pair-token";
import { Badge } from "@/components/shared/ui/badge";
import { Icons } from "@/components/shared/custom/base-icon";
import { Separator } from "@radix-ui/react-separator";
import React from "react";
import { SharingDialog } from "@/components/shared/custom/sharing-dialog";
import { FarmingContent } from "@/components/shared/custom/sharing-dialog/contents/farming";
import { useRouter } from "next/navigation";
import { TokenIcon } from "@/components/shared/custom/token-icon";
import { capitalize } from "@/libs/utils/string";
import { useMobile } from "@/hooks/shared/use-mobile";
import { cn } from "@/libs/utils/taildwind";

export interface FarmingPosition {
  id: string;
  poolId: string;
  leverage: string;
  platform: string;
  tokens: {
    symbol: string;
    amount: string;
  }[];
  position: {
    total: string;
    token1Amount: string;
    token2Amount: string;
  };
  equityValue: {
    total: string;
    amount: string;
    percent: string;
  };
  earn: {
    apr: number;
    farm: string;
    daily: {
      percent: number;
      amount: string;
    };
  };
  buffer: {
    percent: string;
    debtRatio: string;
  };
}

interface CustomCellContext extends CellContext<FarmingPosition, any> {
  toggleExpand?: () => void;
  isExpanded?: boolean;
}

const ActionCell = ({ row, toggleExpand, isExpanded }: CustomCellContext) => {
  const navigate = useRouter();
  const isMobile = useMobile();

  return (
    <div className={cn("frow-icenter gap-2", !isMobile && "justify-end")}>
      <Button
        className="flex-1"
        variant="secondary"
        onClick={() =>
          navigate.push(
            `/farming-detail/${row.original.tokens[0].symbol.toLowerCase()}-${row.original.tokens[1].symbol.toLowerCase()}/add`
          )
        }
      >
        Edit
      </Button>
      <SharingDialog
        className="flex-1"
        type="farming"
        data={row.original}
        renderContent={(data, isMobile) => <FarmingContent data={data} isMobile={isMobile} />}
      />
      {toggleExpand && (
        <Button
          variant={isExpanded ? "secondary" : "ring"}
          size="icon"
          onClick={toggleExpand}
          className={isMobile ? "flex-[0.5]" : "flex-1"}
        >
          <ChevronDown
            className="size-4 transition-transform duration-200"
            style={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </Button>
      )}
    </div>
  );
};

const PositionCell = ({ row }: { row: Row<FarmingPosition> }) => {
  const position = row.original;
  const isMobile = useMobile();
  return (
    <div className="w-min-[252px] frow">
      <div className="frow relative gap-4 self-start">
        <PairToken
          symbols={[position.tokens[0].symbol, position.tokens[1].symbol]}
          size={isMobile ? 30 : 36}
          intersectSize={5}
        />
        <div className="fcol gap-0.5">
          <Typography>{`${position.tokens[0].symbol.toUpperCase()}.e-${position.tokens[1].symbol.toUpperCase()}`}</Typography>
          <Typography variant="small" color="submerged" className="font-mono">
            #{position.poolId} {position.leverage}
          </Typography>
          <Badge variant="third" className="frow-center h-[24px] w-[80px] gap-1">
            <Icons.Thala className="size-3.5" color="embossed" />
            <Typography variant="small" className="mt-[1px]">
              {capitalize(position.platform)}
            </Typography>
          </Badge>
        </div>
      </div>
    </div>
  );
};

export const farmingPositionColumns: ColumnDef<FarmingPosition, any>[] = [
  {
    accessorKey: "pool",
    header: () => "Pool/ TVL",
    cell: ({ row }) => <PositionCell row={row} />,
    meta: {
      skeleton: (
        <div className="w-min-[252px] fcol relative h-16 justify-center gap-4">
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
    accessorKey: "position",
    header: () => "Position",
    cell: ({ row }) => {
      const position = row.original;
      return (
        <div className="fcol min-w-[120px] gap-0.5">
          <Typography>{position.position.total}</Typography>
          <Separator className="my-1 border-t" />
          <div className="fcol gap-0.5">
            <div className="frow-icenter gap-1">
              <TokenIcon symbol={position.tokens[0].symbol} size={18} />
              <Typography variant="small" color="submerged">
                {position.tokens[0].amount}
              </Typography>
            </div>
            <div className="frow-icenter gap-1">
              <TokenIcon symbol={position.tokens[1].symbol} size={18} />
              <Typography variant="small" color="submerged">
                {position.tokens[1].amount}
              </Typography>
            </div>
          </div>
        </div>
      );
    },
    meta: {
      isHiddenMobile: true,
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
    accessorKey: "equityValue",
    header: () => "Equity Value",
    cell: ({ row }) => {
      const position = row.original;
      return (
        <div className="fcol min-w-[120px] gap-0.5">
          <Typography variant="small">{position.equityValue.total}</Typography>
          <Separator className="my-1 border-t" />
          <div className="frow-between">
            <Typography variant="small" color="primary">
              {position.equityValue.amount}
            </Typography>
            <Button variant="none" size="icon" className="h-auto w-auto">
              <Icons.Change />
            </Button>
          </div>
          <Typography variant="small" color="primary">
            {position.equityValue.percent}
          </Typography>
        </div>
      );
    },
    meta: {
      skeleton: (
        <div className="fcol min-w-[120px] gap-0.5">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-1 w-full rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>
      ),
    },
  },
  {
    accessorKey: "earn",
    header: () => "Earn",
    cell: ({ row }) => {
      const position = row.original;
      return (
        <div className="fcol min-w-[190px] gap-0.5">
          <div className="frow-between">
            <Typography variant="small" color="submerged">
              APR
            </Typography>
            <Typography variant="small">{position.earn.apr}%</Typography>
          </div>
          <Separator className="my-1 border-t border-dashed" />
          <div>
            <div className="frow-between">
              <Typography variant="small" color="submerged">
                Farm
              </Typography>
              <Typography variant="small">{position.earn.farm}</Typography>
            </div>
            <div className="frow-between">
              <Typography variant="small" color="submerged">
                Daily
              </Typography>
              <Typography variant="small">
                {position.earn.daily.percent}% ({position.earn.daily.amount})
              </Typography>
            </div>
          </div>
        </div>
      );
    },
    meta: {
      isHiddenMobile: true,
      skeleton: (
        <div className="fcol min-w-[190px] gap-0.5">
          <div className="frow-between">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-1 w-full rounded-full" />
          <div className="fcol gap-0.5">
            <div className="frow-between">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="frow-between">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    accessorKey: "buffer",
    header: () => "Buffer",
    cell: ({ row }) => {
      const position = row.original;
      return (
        <div className="fcol gap-0.5">
          <Typography variant="small">{position.buffer.percent}</Typography>
          <Typography variant="small" color="submerged">
            Debt Ratio: {position.buffer.debtRatio}
          </Typography>
        </div>
      );
    },
    meta: {
      isHiddenMobile: true,
      skeleton: (
        <div className="fcol gap-0.5">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
      ),
    },
  },
  {
    id: "actions",
    cell: (props: CustomCellContext) => <ActionCell {...props} />,
    meta: {
      isHiddenMobile: true,
      skeleton: (
        <div className="frow-icenter gap-4">
          <Skeleton className="h-9 w-[72px] rounded-full" />
          <Skeleton className="h-9 w-[72px] rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      ),
      belowRowMobile: {
        requiresExpand: true,
        render: (row: Row<FarmingPosition>, props?: { toggleExpand: () => void; isExpanded: boolean }) => (
          <ActionCell
            row={row}
            toggleExpand={props?.toggleExpand}
            isExpanded={props?.isExpanded}
            cell={null as any}
            column={null as any}
            getValue={null as any}
            renderValue={null as any}
            table={null as any}
          />
        ),
      },
    },
  },
  {
    id: "rowStyling",
    enableHiding: true,
    meta: {
      rowClassName: () => cn("py-5"),
    },
  },
];
