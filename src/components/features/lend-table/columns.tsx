"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Progress } from "@/components/shared/ui/progress";
import DepositDialog from "./deposit-dialog";
import { Typography } from "@/components/shared/ui/typography";
import { Skeleton } from "@/components/shared/ui/skeleton";
import { useMobile } from "@/hooks/shared/use-mobile";
import { TokenIcon } from "@/components/shared/custom/token-icon";
import { sortNumber } from "@/libs/utils/sort";
import { UILendingReserveData } from "@/clients/types/view/pool/lending";
import { cn } from "@/libs/utils/taildwind";

const TokenCell = ({ row }: { row: Row<UILendingReserveData> }) => {
  const isMobile = useMobile();
  const token = row.original;

  return (
    // <div className="frow-between min-w-[160px] max-w-[200px] gap-2">
    <div className="frow-between gap-2">
      <div className="frow-icenter gap-2">
        <TokenIcon symbol={token.symbol} className="rounded-full" size={32} />
        <Typography>{token.symbol}</Typography>
      </div>
      {/* {isMobile && <DepositDialog row={row} />} */}
    </div>
  );
};

const ApyCell = ({ row }: { row: Row<UILendingReserveData> }) => {
  const isMobile = useMobile();
  return (
    <Typography className={cn("text-primary", isMobile ? "text-center" : "text-left")}>
      {row.original.liquidityRate}%
    </Typography>
  );
};

const TotalBorrowCell = ({ row }: { row: Row<UILendingReserveData> }) => {
  const isMobile = useMobile();
  return (
    <div className={cn("fcol gap-1", isMobile ? "items-end" : "items-start")}>
      <Typography>
        {row.original.totalVariableDebt.toFixed(2)} / {row.original.totalLiquidity.toFixed(2)}
      </Typography>

      {!isMobile && <Progress value={Number(row.original.progress)} className="h-1 w-[60%]" />}

      <Typography variant="small" color="submerged">
        {row.original.progress.toFixed(2)}% / 100%
      </Typography>
    </div>
  );
};

export const columns: ColumnDef<UILendingReserveData>[] = [
  {
    accessorKey: "token",
    header: () => "Token",
    cell: TokenCell,
    meta: {
      skeleton: (
        <div className="frow-icenter gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
      ),
      // cellPosition: "left",
      mobileCellPosition: "left",
    },
    filterFn: (row: Row<UILendingReserveData>, columnId: string, filterValue: string) => {
      const token = row.original.symbol;
      return token.toLowerCase().includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: "apy",
    header: () => "APY",
    cell: ApyCell,
    meta: {
      cellPosition: "left",
      mobileCellPosition: "center",
      showSortable: true,
      skeleton: <Skeleton className="h-4 w-16" />,
    },
    sortingFn: (rowA: Row<UILendingReserveData>, rowB: Row<UILendingReserveData>) =>
      sortNumber(rowA.original.liquidityRate, rowB.original.liquidityRate),
  },
  {
    accessorKey: "totalBorrow",
    header: "Total Borrow/Supply",
    cell: TotalBorrowCell,
    meta: {
      cellPosition: "left",
      mobileCellPosition: "right",
      showSortable: true,
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
    sortingFn: (rowA: Row<UILendingReserveData>, rowB: Row<UILendingReserveData>) =>
      sortNumber(rowA.original.progress, rowB.original.progress),
  },
  {
    accessorKey: "walletBalance",
    header: "Wallet Balance",
    cell: ({ row }: { row: Row<UILendingReserveData> }) => {
      return <Typography className="min-w-[160px] max-w-[200px]">{row.original.balance}</Typography>;
    },
    meta: {
      isHiddenMobile: true,
      showSortable: true,
      skeleton: <Skeleton className="h-4 w-24" />,
      annotation: "Your current balance of this token",
    },
    sortingFn: (rowA: Row<UILendingReserveData>, rowB: Row<UILendingReserveData>) =>
      sortNumber(rowA.original.balance, rowB.original.balance),
  },
  {
    id: "actions",
    cell: ({ row }: { row: Row<UILendingReserveData> }) => {
      return (
        <div className="flex w-[120px] justify-end">
          <DepositDialog row={row} />
        </div>
      );
    },
    meta: {
      isHiddenMobile: true,
      skeleton: <div className="flex justify-end"></div>,
      belowRowMobile: (row: Row<UILendingReserveData>) => <DepositDialog row={row} />,
    },
  },
];
