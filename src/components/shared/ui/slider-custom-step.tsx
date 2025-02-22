"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/libs/utils/taildwind";

interface SliderCustomStepProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, "onValueChange"> {
  values?: number[];
  showLabel?: boolean;
  onValueChange?: (value: number) => void;
}

const SliderCustomStep = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderCustomStepProps>(
  ({ className, values = [0, 30, 90, 180, 360], showLabel = true, onValueChange, ...props }, ref) => {
    const max = Math.max(...values);

    const findClosestValue = (value: number) => {
      const closestValue = values.reduce((prev, curr) => {
        return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
      });
      return closestValue;
    };

    const [currentValue, setCurrentValue] = React.useState(props.defaultValue?.[0] || values[0]);

    const getPercentage = (value: number) => (value / max) * 100;

    const handleValueChange = (newValues: number[]) => {
      const snappedValue = findClosestValue(newValues[0]);
      setCurrentValue(snappedValue);
      onValueChange?.(snappedValue);
    };

    return (
      <div className="relative mb-10 pt-2">
        <SliderPrimitive.Root
          ref={ref}
          min={0}
          max={max}
          value={[currentValue]}
          onValueChange={handleValueChange}
          className={cn("relative flex w-full touch-none select-none items-center", className)}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-third/80">
            <SliderPrimitive.Range className="absolute h-full bg-primary" />
            {values.map((value) => (
              <div
                key={value}
                className="absolute h-1.5 w-1.5 rounded-full bg-third-foreground/30"
                style={{
                  left: `${getPercentage(value)}%`,
                  transform: "translateX(-100%)",
                }}
              />
            ))}
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-primary bg-primary shadow transition-colors focus-visible:outline-none" />
        </SliderPrimitive.Root>

        {showLabel && (
          <div className="absolute bottom-0 left-0 top-8 w-full">
            {values.map((value) => (
              <p
                key={value}
                className="absolute text-center text-sm text-submerged"
                style={{
                  left: `${getPercentage(value)}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {value}d
              </p>
            ))}
          </div>
        )}
      </div>
    );
  }
);
SliderCustomStep.displayName = "SliderCustomStep";

export { SliderCustomStep };
