"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/libs/utils/taildwind";

const CountUpLib = dynamic(() => import("react-countup"), {
  ssr: false,
});

interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
  enableScrollSpy?: boolean;
  scrollSpyDelay?: number;
}

export default function CountUp({
  value,
  suffix = "",
  prefix = "$",
  duration = 2.5,
  decimals = 0,
  className = "",
  enableScrollSpy = true,
  scrollSpyDelay = 0,
}: CountUpProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <span className={cn("font-bold", className)}>
        {prefix}
        {value.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        {suffix}
      </span>
    );
  }

  return (
    <span className={cn("font-bold", className)}>
      <CountUpLib
        end={value}
        duration={duration}
        decimals={decimals}
        separator=","
        prefix={prefix}
        suffix={suffix}
        enableScrollSpy={enableScrollSpy}
        scrollSpyDelay={scrollSpyDelay}
      />
    </span>
  );
}
