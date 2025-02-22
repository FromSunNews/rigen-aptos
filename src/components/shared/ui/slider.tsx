"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/libs/utils/taildwind";
import { Typography } from "./typography";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    steps?: number;
    showLabel?: boolean;
    marks?: { value: number; label: string }[];
  }
>(({ className, steps = 4, marks, showLabel = true, ...props }, ref) => {
  const totalPoints = steps + 1;
  const points = Array.from({ length: totalPoints }, (_, i) => i * (100 / (totalPoints - 1)));

  return (
    <div className="fcol gap-4">
      <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-third/80">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
          {points.map((position) => (
            <div
              key={position}
              className="absolute h-1.5 w-1.5 rounded-full bg-third-foreground/30"
              style={{ left: `${position}%`, transform: "translateX(-100%)" }}
            />
          ))}
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-4 w-4 cursor-pointer rounded-full bg-third-foreground shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>

      <div className="frow-between w-full items-center">
        {showLabel &&
          marks &&
          marks.map((mark: { value: number | string; label: string }) => (
            <Typography key={mark.label} variant="small">
              {mark.label}
            </Typography>
          ))}
      </div>
    </div>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
