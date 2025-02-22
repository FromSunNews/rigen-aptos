"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Typography } from "../../ui/typography";

const CountUpLib = dynamic(() => import("react-countup"), {
  ssr: false,
});

interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  color?: any;
  className?: string;
  variant?: any;
}

export default function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 1,
  decimals = 2,
  color,
  className = "",
  variant = "default",
}: CountUpProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Typography variant={variant} color={color} className={className}>
        {prefix}
        {value.toFixed(decimals)}
        {suffix}
      </Typography>
    );
  }

  return (
    <Typography variant={variant} color={color} className={className}>
      <CountUpLib end={value} duration={duration} decimals={decimals} separator="," prefix={prefix} suffix={suffix} />
    </Typography>
  );
}
