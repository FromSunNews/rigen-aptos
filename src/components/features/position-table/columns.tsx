"use client";

import { SharingDialog } from "@/components/shared/custom/sharing-dialog";
import { LendingContent } from "@/components/shared/custom/sharing-dialog/contents/lending";
import { Typography } from "@/components/shared/ui/typography";
import { Skeleton } from "@/components/shared/ui/skeleton";
import { TokenIcon } from "@/components/shared/custom/token-icon";
import { UIPostionReserveData } from "@/clients/types/view/pool/position";
import { Button } from "@/components/shared/ui/button";
import { ColumnDef, Row } from "@tanstack/react-table";
import DepositDialog from "./dialog";

export const columns: ColumnDef<UIPostionReserveData>[] = [
  {
    accessorKey: "token",
    header: () => "Token",
    cell: ({ row }: { row: Row<UIPostionReserveData> }) => {
      const token = row.original;
      return (
        <div className="frow-icenter min-w-[100px] max-w-[200px] gap-2">
          <TokenIcon symbol={token.symbol} size={32} />
          <Typography>{token.symbol}</Typography>
        </div>
      );
    },
    meta: {
      skeleton: (
        <div className="frow-icenter gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
      ),
    },
  },
  {
    accessorKey: "liquidityRate",
    header: () => "APY",
    cell: ({ row }: { row: Row<UIPostionReserveData> }) => {
      return (
        <Typography className="min-w-[100px] max-w-[200px] text-primary">{row.original.liquidityRate}%</Typography>
      );
    },
    meta: {
      skeleton: <Skeleton className="h-4 w-16" />,
    },
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }: { row: Row<UIPostionReserveData> }) => {
      return (
        <div className="fcol-jcenter min-w-[100px] max-w-[200px]">
          <div className="frow-icenter gap-1">
            <Typography>{row.original.currentBalance}</Typography>
            <Typography color="submerged">{row.original.symbol}</Typography>
          </div>
          <Typography variant="small" className="text-primary">
            {"+"}
            {row.original.profit} {row.original.symbol}
          </Typography>
          <Typography variant="small" color="primary">
            (+{row.original.profitPercentage}%)
          </Typography>
        </div>
      );
    },
    meta: {
      skeleton: (
        <div className="fcol gap-1">
          <div className="frow-icenter gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      ),
    },
  },
  {
    id: "actions",
    cell: ({ row }: { row: Row<UIPostionReserveData> }) => {
      return (
        <div className="frow-icenter justify-end gap-2">
          <DepositDialog row={row} className="w-32" />
          <SharingDialog
            className="w-32"
            type="lending"
            data={row.original}
            renderContent={(data, isMobile) => <LendingContent data={data} isMobile={isMobile} />}
          />
        </div>
      );
    },
    meta: {
      isHiddenMobile: true,
      skeleton: (
        <div className="frow-icenter gap-4">
          <Skeleton className="h-9 w-[72px] rounded-full" />
          <Skeleton className="h-9 w-[72px] rounded-full" />
        </div>
      ),
      belowRowMobile: (row: Row<UIPostionReserveData>) => (
        <div className="frow-icenter flex w-full gap-4">
          <DepositDialog row={row} className="f1" />

          <SharingDialog
            className="f1"
            type="lending"
            data={row.original}
            renderContent={(data, isMobile) => <LendingContent data={data} isMobile={isMobile} />}
          />
        </div>
      ),
    },
  },
];
