"use client";

import { cn } from "@/libs/utils/taildwind";
import { Typography } from "@/components/shared/ui/typography";
import { TrendingUp, Users, Shield, Clock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/shared/ui/tooltip";
import { UILendingReserveData } from "@/clients/types/view/pool/lending";
import { Row } from "@tanstack/react-table";
import { useMemo } from "react";
import { TokenIcon } from "@/components/shared/custom/token-icon";
import DepositDialog from "../deposit-dialog";

interface LendingPoolCardProps {
  token: UILendingReserveData;
  className?: string;
}

export function LendingPoolCard({ token, className }: LendingPoolCardProps) {
  // Create a Row-like object to pass to DepositDialog
  const rowData = useMemo(() => {
    return {
      original: token,
      // Add other required Row properties as needed
      id: token.symbol,
      index: 0,
      depth: 0,
      subRows: [],
      getParentRow: () => null,
      getLeafRows: () => [],
      getAllCells: () => [],
      getValue: () => null,
      renderValue: () => null,
      getIsSelected: () => false,
      getIsSomeSelected: () => false,
      getIsAllSubRowsSelected: () => false,
      getCanSelect: () => true,
      getCanMultiSelect: () => true,
      getCanSelectSubRows: () => true,
      toggleSelected: () => {},
      getToggleSelectedHandler: () => () => {},
      getIsGrouped: () => false,
      getIsAggregated: () => false,
      getIsPlaceholder: () => false,
      getCanExpand: () => false,
      getIsExpanded: () => false,
      toggleExpanded: () => {},
      getToggleExpandedHandler: () => () => {},
    } as unknown as Row<UILendingReserveData>;
  }, [token]);

  // Format data for display
  const utilizationRate = `${token.progress.toFixed(0)}%`;
  const tvl = `$${token.totalLiquidity.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  const totalBorrowed = `$${token.totalVariableDebt.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  const depositLimit = `$${(token.totalLiquidity * 1.5).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  const collateralFactor = "80%"; // Assuming this is fixed or not available in token data

  return (
    <div className={cn("group relative w-full max-w-[420px]", className)}>
      {/* Main Card Container */}
      <div className="relative h-auto overflow-hidden rounded-[32px] transition-transform duration-300 ease-in-out group-hover:scale-[1.02]">
        {/* Base Background Layer */}
        <div className="absolute inset-0">
          {/* Primary background with blur */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(
                  165deg,
                  rgba(29, 46, 64, 0.6) 0%,
                  rgba(29, 46, 64, 0.4) 50%,
                  rgba(29, 46, 64, 0.2) 100%
                )
              `,
              backdropFilter: "blur(20px)",
            }}
          />

          {/* Radial highlight at corner */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(
                  circle at 0 0,
                  rgba(82, 174, 255, 0.8) 0%,
                  rgba(82, 174, 255, 0.3) 40%,
                  rgba(82, 174, 255, 0.1) 80%,
                  transparent 80%
                )
              `,
              opacity: "0.35",
            }}
          />

          {/* Subtle overlay gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(
                  to bottom,
                  transparent,
                  rgba(29, 46, 64, 0.3)
                )
              `,
            }}
          />
        </div>

        {/* Border Gradient */}
        <div
          className="absolute inset-0 rounded-[32px]"
          style={{
            background: `
              linear-gradient(
                145deg,
                rgba(255, 255, 255, 0.4) 0%,
                rgba(255, 255, 255, 0.1) 30%,
                transparent 60%
              )
            `,
            maskImage: "linear-gradient(145deg, white 0%, transparent 60%)",
            WebkitMaskImage: "linear-gradient(145deg, white 0%, transparent 60%)",
            opacity: "0.5",
          }}
        />

        {/* Card Content */}
        <div className="relative flex h-full flex-col p-8">
          {/* Token Info Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="relative flex h-16 w-16 items-center justify-center">
                <TokenIcon symbol={token.symbol} size={64} className="rounded-full" />
              </div>
              <div>
                <Typography variant="h3" className="text-3xl font-bold">
                  {token.symbol}
                </Typography>
                <Typography color="submerged">
                  {token.balance > 0 ? `${token.balance.toFixed(2)} ${token.symbol}` : `0 ${token.symbol}`}
                </Typography>
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="rounded-xl bg-white/5 px-4 py-2">
                    <Typography className="text-base font-medium text-green-400">
                      {token.liquidityRate.toFixed(2)}% APR
                    </Typography>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Annual Percentage Rate</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Key Metrics Grid */}
          <div className="mt-8 space-y-4">
            {/* TVL & Utilization */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-[120px] items-center gap-3">
                  <Users className="h-5 w-5 shrink-0 text-submerged" />
                  <Typography color="submerged">TVL</Typography>
                </div>
                <Typography className="text-right">{tvl}</Typography>
              </div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-[120px] items-center gap-3">
                  <TrendingUp className="h-5 w-5 shrink-0 text-submerged" />
                  <Typography color="submerged">Utilization</Typography>
                </div>
                <Typography className="text-right">{utilizationRate}</Typography>
              </div>
            </div>

            {/* Safety Metrics */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-[120px] items-center gap-3">
                  <Shield className="h-5 w-5 shrink-0 text-submerged" />
                  <Typography color="submerged">Collateral Factor</Typography>
                </div>
                <Typography className="text-right">{collateralFactor}</Typography>
              </div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-[120px] items-center gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-submerged" />
                  <Typography color="submerged">Total Borrowed</Typography>
                </div>
                <Typography className="text-right">{totalBorrowed}</Typography>
              </div>
            </div>

            {/* Utilization Progress Bar */}
            <div className="space-y-2 pt-3">
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#52AEFF] to-[#52AEFF]/70"
                  style={{ width: utilizationRate }}
                />
              </div>

              <div className="flex items-center justify-between">
                <Typography color="submerged">Pool Utilization</Typography>
                <Typography className="text-right">{utilizationRate}</Typography>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8">
            <DepositDialog row={rowData} />
          </div>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 z-[1] -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:animate-shine group-hover:opacity-100" />
      </div>
    </div>
  );
}
