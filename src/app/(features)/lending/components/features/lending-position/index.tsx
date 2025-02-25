"use client";

import { Typography } from "@/components/shared/ui/typography";
import { Wallet } from "lucide-react";
import { LendingPositionCard } from "../../commons/lending-position-card";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { usePositionReserves } from "@/hooks/contracts/lending-page/view/use-position-reserves";
import { useBoundStore } from "@/store";
import { Skeleton } from "@/components/shared/ui/skeleton";

export default function LendingPosition() {
  const { connected } = useWallet();
  const { isLoading } = usePositionReserves();
  const { positionData } = useBoundStore();

  if (!connected) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#4ADE80]/20 to-[#4ADE80]/5 shadow-lg shadow-[#4ADE80]/10">
            <Wallet className="h-6 w-6 text-[#4ADE80]" />
          </div>
          <div>
            <Typography variant="h2" className="text-3xl font-bold md:text-4xl">
              MY POSITION
            </Typography>
            <Typography className="text-lg text-submerged md:text-xl">
              Daily Earning: ~${positionData[0]?.profit || 0}
            </Typography>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          // Skeleton loading state
          Array(3)
            .fill(0)
            .map((_, index) => <LendingPositionCardSkeleton key={index} />)
        ) : positionData && positionData.length > 0 ? (
          // Render actual position cards
          positionData.map((position, index) => (
            <LendingPositionCard
              key={index}
              tokenInfo={{
                symbol: position.symbol,
                amount: Number(position.currentBalance),
                usdValue: Number(position.currentBalance) * 10,
                imageUrl: `/images/token/${position.symbol.toLowerCase()}.png`,
                priceChangePercent: Number(position.profitPercentage),
                tokenAddress: position.tokenAddress.toString(),
                decimals: position.decimals,
              }}
              stats={{
                totalEarnings: {
                  amount: Number(position.profit),
                  usdValue: Number(position.profit) * 10,
                },
                netApr: Number(position.liquidityRate),
                depositDate: {
                  date: "Mar 15, 2024",
                  daysAgo: 14,
                },
                healthFactor: 1.85,
                availableAmount: Number(position.underlyingBalance),
              }}
            />
          ))
        ) : (
          // No positions state
          <div className="col-span-full flex flex-col items-center justify-center rounded-2xl bg-third p-8 text-center">
            <Typography variant="h3" className="mb-2">
              No Positions Found
            </Typography>
            <Typography color="submerged">You don&apos;t have any active lending positions yet.</Typography>
          </div>
        )}
      </div>
    </div>
  );
}

// Skeleton component for loading state
function LendingPositionCardSkeleton() {
  return (
    <div className="relative h-auto overflow-hidden rounded-[32px]">
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(29,46,64,0.6)] to-[rgba(29,46,64,0.2)]"></div>
      <div className="relative flex flex-col space-y-8 p-8">
        {/* Token Info Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-[60px] w-[60px] rounded-full" />
            <div>
              <Skeleton className="h-8 w-32" />
              <Skeleton className="mt-2 h-6 w-24" />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="mt-1 h-4 w-20" />
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-2 h-6 w-20" />
              <Skeleton className="mt-1 h-4 w-16" />
            </div>
            <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-2 h-6 w-16" />
              <Skeleton className="mt-1 h-4 w-24" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-2 h-6 w-24" />
              <Skeleton className="mt-1 h-4 w-20" />
            </div>
            <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-2 h-6 w-16" />
              <Skeleton className="mt-1 h-4 w-24" />
            </div>
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex gap-4">
          <Skeleton className="h-14 w-full rounded-[24px]" />
          <Skeleton className="h-14 w-full rounded-[24px]" />
        </div>
      </div>
    </div>
  );
}
