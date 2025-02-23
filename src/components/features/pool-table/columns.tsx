"use client";

import { Typography } from "@/components/shared/ui/typography";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Skeleton } from "@/components/shared/ui/skeleton";
import LeverageButton from "@/components/shared/custom/leverage-button";
import { AprSection } from "./components/apr-section";
import { FarmButton } from "./components/farm-button";
import { TvlSection } from "./components/tvl-section";
import { cn } from "@/libs/utils/taildwind";
import { FarmingPoolUI } from "@/store/types/farming-pool.type";

// Columns definition
export const columnsPoolTable: ColumnDef<FarmingPoolUI>[] = [
  {
    accessorKey: "tvl",
    sortingFn: (a: Row<FarmingPoolUI>, b: Row<FarmingPoolUI>) => Number(a.original.tvl) - Number(b.original.tvl),
    header: "TVL",
    cell: ({ row }: { row: Row<FarmingPoolUI> }) => <TvlSection row={row} />,
    meta: {
      showSortable: true,
      annotation: "Total Value Locked - The total amount of assets in the pool",
      skeleton: (
        <div className="fcol relative h-16 justify-center gap-4">
          <div className="frow gap-4">
            <div className="frow-center relative w-[62px]">
              <Skeleton className="absolute right-0 h-9 w-9 rounded-full" />
              <Skeleton className="absolute left-0 h-9 w-9 rounded-full" />
            </div>
            <div className="fcol gap-0.5">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-20" />
              <div className="frow gap-1">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    accessorKey: "apy",
    header: "APY",
    sortingFn: (a: Row<FarmingPoolUI>, b: Row<FarmingPoolUI>) =>
      Number(a.original.apy.max) - Number(b.original.apy.max),
    cell: ({ row }: { row: Row<FarmingPoolUI> }) => {
      const { min, max } = row.original.apy;
      return (
        <div className="fcol min-w-[100px] max-w-[200px] gap-1">
          <Typography variant="small" color="submerged">
            from {min}% to{" "}
          </Typography>
          <Typography color="primary">{max}%</Typography>
        </div>
      );
    },
    meta: {
      showSortable: true,
      annotation: "Annual Percentage Yield - The estimated yearly return",
      skeleton: (
        <div className="fcol min-w-[100px] max-w-[200px] gap-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
      ),
    },
  },
  {
    accessorKey: "apr",
    header: "APR",
    sortingFn: (a: Row<FarmingPoolUI>, b: Row<FarmingPoolUI>) =>
      Number(a.original.apr.total) - Number(b.original.apr.total),
    cell: ({ row }: { row: Row<FarmingPoolUI> }) => <AprSection row={row} />,
    meta: {
      isHiddenMobile: true,
      showSortable: true,
      annotation: "Annual Percentage Yield - The estimated yearly return",
      skeleton: (
        <div className="fcol-jcenter h-28 min-w-[250px] max-w-[300px] items-end gap-1">
          <div className="fcol h-16 w-full gap-1">
            <div className="frow-between w-full ps-8">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="frow-between w-full ps-8">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="frow-between w-full items-center">
              <div className="frow-icenter gap-2">
                <Skeleton className="h-4 w-6" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
          <Skeleton className="h-1 w-full rounded-full" />
          <div className="frow-between w-full">
            <div className="frow-icenter gap-2">
              <Skeleton className="h-4 w-6" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      ),
      belowRowMobile: (row: Row<FarmingPoolUI>) => <AprSection row={row} />,
      fullWidthMobile: true,
    },
  },
  {
    accessorKey: "leverage",
    header: "Leverage",
    cell: ({ row }: { row: Row<FarmingPoolUI> }) => (
      <div className="flex w-full justify-center">
        <LeverageButton row={row} />
      </div>
    ),
    meta: {
      cellPosition: "center",
      skeleton: <Skeleton className="h-4 w-8" />,
      annotation: "Leverage - The amount of assets borrowed relative to the amount of assets deposited",
    },
  },
  {
    id: "actions",
    cell: ({ row }: { row: Row<FarmingPoolUI> }) => (
      <div className="flex w-full justify-end">
        <FarmButton row={row} selectedToken={(row as any).selectedToken} />
      </div>
    ),
    meta: {
      isHiddenMobile: true,
      skeleton: (
        <div className="flex w-full justify-end">
          <Skeleton className="h-9 w-20 rounded-full" />
        </div>
      ),
      belowRowMobile: (row: Row<FarmingPoolUI>) => (
        <div className="flex w-full">
          <FarmButton className="w-full" row={row} selectedToken={(row as any).selectedToken} />
        </div>
      ),
    },
  },
  // column hidden for search
  {
    id: "tokens",
    accessorFn: (originalRow: FarmingPoolUI) => `${originalRow.pairTokens[0]} ${originalRow.pairTokens[1]}`,
    filterFn: (row: Row<FarmingPoolUI>, columnId: string, filterValue: string) => {
      const tokens = row.getValue(columnId) as string;
      return tokens.toLowerCase().includes(filterValue.toLowerCase());
    },
    enableHiding: true,
  },
  // Hidden column for row styling
  {
    id: "rowStyling",
    enableHiding: true,
    meta: {
      rowClassName: (row: Row<FarmingPoolUI>) =>
        cn(
          row.original.boosted && "bg-boosted"
          // Add other className conditions if needed
        ),
    },
  },
];
