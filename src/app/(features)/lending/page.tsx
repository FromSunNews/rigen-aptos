"use client";

import { LendCard } from "@/components/features/lend-table/card";
import { Typography } from "@/components/shared/ui/typography";
import { cn } from "@/libs/utils/taildwind";
import { CircleDollarSign, Coins, Timer } from "lucide-react";

const TOKENS = [
  {
    title: "0 THL",
    value: "$0.00",
    icon: "/images/token/thl.png",
    earnings: "0 THL",
    apr: "4.59%",
  },
  {
    title: "0 STAPT",
    value: "$0.00",
    icon: "/images/token/stapt.png",
    earnings: "0 STAPT",
    apr: "4.59%",
  },
  {
    title: "0 USDT",
    value: "$0.00",
    icon: "/images/token/zusdt.png",
    earnings: "0 USDT",
    apr: "4.59%",
  },
  {
    title: "0 APTOS",
    value: "$0.00",
    icon: "/images/token/aptos.png",
    earnings: "0 APT",
    apr: "4.59%",
  },
  {
    title: "0 USDC",
    value: "$0.00",
    icon: "/images/token/usdc.png",
    earnings: "0 USDC",
    apr: "4.59%",
  },
  {
    title: "0 DAI",
    value: "$0.00",
    icon: "/images/token/dai.png",
    earnings: "0 DAI",
    apr: "4.59%",
  },
  {
    title: "0 CELL",
    value: "$0.00",
    icon: "/images/token/cell.png",
    earnings: "0 CELL",
    apr: "4.59%",
  },
  {
    title: "0 GUI",
    value: "$0.00",
    icon: "/images/token/gui.png",
    earnings: "0 GUI",
    apr: "4.59%",
  },
];

// Banner stats data
const BANNER_STATS = [
  {
    icon: <CircleDollarSign className="h-8 w-8 text-[#4ADE80]" />,
    label: "Total Lendings",
    value: "$569,206,205",
    tooltip: "Total value of all assets currently being lent",
    iconBg: "bg-[#4ADE80]/10",
  },
  {
    value: "$0.00",
    className: "text-center text-4xl font-bold tracking-tight",
  },
  {
    icon: <Coins className="h-8 w-8 text-[#FFB547]" />,
    label: "Liquidity Total Supply",
    value: "$1,526,576,902",
    tooltip: "Total value of all available liquidity",
    iconBg: "bg-[#FFB547]/10",
  },
];

export default function LendingPage() {
  return (
    <div className="relative mx-auto mt-[160px] max-w-[1440px] px-4 md:px-6 md:pt-12">
      {/* Content */}
      <div className="space-y-12">
        {/* Header Section */}
        <div className="flex flex-col items-center space-y-8">
          {/* Title Group */}
          <div className="flex flex-col items-center space-y-3">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#52AEFF]/10 shadow-lg shadow-[#52AEFF]/20">
                <Timer className="h-8 w-8 text-[#52AEFF]" />
              </div>
              <Typography
                variant="h1"
                className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-6xl font-bold tracking-tight text-transparent"
              >
                Lending
              </Typography>
            </div>
            <Typography className="max-w-lg text-center text-xl font-medium text-muted-foreground/80">
              The Best DeFi Yields In 1-Click
            </Typography>
          </div>

          {/* Stats Banner */}
          <div className="relative w-full max-w-4xl rounded-[32px] bg-[#1D2E40]/40 backdrop-blur-xl before:absolute before:inset-0 before:-z-10 before:rounded-[32px] before:bg-gradient-to-r before:from-[#52AEFF]/10 before:to-transparent before:content-['']">
            <div className="flex items-center justify-between px-10 py-8">
              {/* Left Stat */}
              <div className="flex items-center gap-6">
                <div
                  className={cn(
                    "group flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg",
                    "bg-[#4ADE80]/10",
                    "hover:shadow-[#4ADE80]/20"
                  )}
                >
                  <CircleDollarSign className="h-8 w-8 text-[#4ADE80]" />
                </div>
                <div className="flex flex-col gap-2">
                  <Typography className="text-base font-medium text-muted-foreground/70">Total Lendings</Typography>
                  <Typography className="text-4xl font-bold tracking-tight">$569,206,205</Typography>
                </div>
              </div>

              {/* Center Value */}
              <div className="text-center">
                <Typography className="text-4xl font-bold tracking-tight">$0.00</Typography>
              </div>

              {/* Right Stat */}
              <div className="flex items-center gap-6">
                <div
                  className={cn(
                    "group flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg",
                    "bg-[#FFB547]/10",
                    "hover:shadow-[#FFB547]/20"
                  )}
                >
                  <Coins className="h-8 w-8 text-[#FFB547]" />
                </div>
                <div className="flex flex-col gap-2">
                  <Typography className="text-base font-medium text-muted-foreground/70">
                    Liquidity Total Supply
                  </Typography>
                  <Typography className="text-4xl font-bold tracking-tight">$1,526,576,902</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 place-items-center gap-8 pb-12 sm:grid-cols-2 md:px-16 lg:grid-cols-3">
          {TOKENS.map((token, index) => (
            <LendCard key={index} {...token} />
          ))}
        </div>
      </div>
    </div>
  );
}
