"use client";

import { CircleDollarSign, Coins, Timer } from "lucide-react";
import { Typography } from "@/components/shared/ui/typography";

export function LendingHeader() {
  return (
    <div className="flex flex-col items-center space-y-8 md:space-y-10">
      {/* Title Group */}
      <div className="flex flex-col items-center space-y-6">
        {/* Main Title with Icon */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#52AEFF]/20 to-[#52AEFF]/10 shadow-lg shadow-[#52AEFF]/20 backdrop-blur-sm">
            <Timer className="h-10 w-10 text-[#52AEFF]" />
          </div>
          <div className="text-center">
            <Typography
              variant="h1"
              className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-6xl font-bold tracking-tight text-transparent md:text-7xl lg:text-8xl"
            >
              Lending Pool
            </Typography>
          </div>
        </div>

        {/* Subtitle Group */}
        <div className="flex max-w-2xl flex-col items-center space-y-4 text-center">
          <Typography className="text-2xl font-medium text-white/90 md:text-3xl">
            Earn Passive Income with DeFi
          </Typography>
          <Typography className="max-w-[720px] text-center text-lg text-submerged md:text-xl">
            Deposit your assets into our lending pools to earn competitive yields. Automated strategies ensure optimal
            returns while maintaining security.
          </Typography>
        </div>

        {/* Quick Stats */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-8 text-center">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-400"></div>
            <Typography className="text-lg text-submerged">
              <span className="mr-2 text-white">4.59% - 12.8%</span>
              APY Range
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-400"></div>
            <Typography className="text-lg text-submerged">
              <span className="mr-2 text-white">$1.52B</span>
              Total Value Locked
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-purple-400"></div>
            <Typography className="text-lg text-submerged">
              <span className="mr-2 text-white">8</span>
              Supported Assets
            </Typography>
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="relative w-full max-w-4xl rounded-[24px] bg-[#1D2E40]/40 p-4 backdrop-blur-xl md:rounded-[28px] md:p-6 lg:rounded-[32px] lg:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Left Stat */}
          <div className="flex items-center gap-4 md:gap-5 lg:gap-6">
            <div className="lg:h-18 lg:w-18 group flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4ADE80]/10 transition-all duration-300 hover:scale-105 hover:shadow-lg md:h-16 md:w-16">
              <CircleDollarSign className="h-7 w-7 text-[#4ADE80] md:h-8 md:w-8 lg:h-9 lg:w-9" />
            </div>
            <div className="flex flex-col gap-1 md:gap-2">
              <Typography className="text-base font-medium text-submerged md:text-lg lg:text-xl">
                Total Lendings
              </Typography>
              <Typography className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                $569,206,205
              </Typography>
            </div>
          </div>

          {/* Center Value */}
          <div className="text-center">
            <Typography className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">$0.00</Typography>
          </div>

          {/* Right Stat */}
          <div className="flex items-center gap-4 md:gap-5 lg:gap-6">
            <div className="lg:h-18 lg:w-18 group flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFB547]/10 transition-all duration-300 hover:scale-105 hover:shadow-lg md:h-16 md:w-16">
              <Coins className="h-7 w-7 text-[#FFB547] md:h-8 md:w-8 lg:h-9 lg:w-9" />
            </div>
            <div className="flex flex-col gap-1 md:gap-2">
              <Typography className="text-base font-medium text-submerged md:text-lg lg:text-xl">
                Liquidity Total Supply
              </Typography>
              <Typography className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                $1,526,576,902
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
