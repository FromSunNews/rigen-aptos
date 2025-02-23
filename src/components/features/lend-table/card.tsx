"use client";

import { cn } from "@/libs/utils/taildwind";
import { Typography } from "@/components/shared/ui/typography";
import Image from "next/image";
import { Info, TrendingUp } from "lucide-react";

interface CardProps {
  title: string;
  value: string;
  icon: string;
  earnings: string;
  apr: string;
  className?: string;
}

export function LendCard({ title, value, icon, earnings, apr, className }: CardProps) {
  return (
    <div className={cn("group relative w-full max-w-[360px]", className)}>
      {/* Main Card Container */}
      <div className="relative h-[400px] overflow-hidden rounded-[24px] transition-transform duration-300 ease-in-out group-hover:scale-[1.02]">
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
          className="absolute inset-0 rounded-[24px]"
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
        <div className="relative flex h-full flex-col p-6">
          {/* Token Info */}
          <div className="flex flex-col space-y-1">
            <Typography variant="h3" className="font-roboto text-center text-2xl">
              {title}
            </Typography>
            <Typography variant="h4" className="font-roboto text-center text-xl text-white/80">
              {value}
            </Typography>
          </div>

          {/* Token Icon */}
          <div className="relative mx-auto mt-6 h-20 w-20 overflow-hidden rounded-full">
            <Image src={icon} alt={title} fill className="object-cover" />
          </div>

          {/* Stats Box */}
          <div className="mt-auto rounded-[24px] border border-white/60 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <Typography className="font-roboto text">Earnings</Typography>
              <div className="flex items-center gap-2">
                <Typography className="font-roboto text">{earnings}</Typography>
                <Info className="h-4 w-4 text-white/60" />
              </div>
            </div>

            <div className="my-3 h-[1px] w-full bg-white/20" />

            <div className="flex items-center justify-between">
              <Typography className="font-roboto text">Net APR</Typography>
              <div className="flex items-center gap-2">
                <Typography className="font-roboto text">{apr}</Typography>
                <TrendingUp className="h-4 w-4 text-white/60" />
              </div>
            </div>
          </div>

          {/* Deposit Button - Remove backdrop-blur from button */}
          <button className="mt-4 h-[48px] w-full rounded-[24px] bg-[#52AEFF] font-bold uppercase tracking-wide transition-all hover:bg-[#52AEFF]/90">
            DEPOSIT
          </button>
        </div>

        {/* Shine effect on hover */}
        <div className="group-hover:animate-shine absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </div>
  );
}
