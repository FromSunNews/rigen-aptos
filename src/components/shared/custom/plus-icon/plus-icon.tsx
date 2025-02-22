import { cn } from "@/libs/utils/taildwind";
import { Icons } from "../base-icon";

interface CornerPlusIconProps {
  position: "start-x" | "end-x" | "start-y" | "end-y" | "top-right" | "bottom-right" | "top-left" | "bottom-left";
  className?: string;
  color?: string;
}

export function PlusIcon({ position, className, color = "primary" }: CornerPlusIconProps) {
  const singlePositionClasses = {
    "top-right": "-top-3 -right-3",
    "bottom-right": "-bottom-3 -right-3",
    "top-left": "-top-3 -left-3",
    "bottom-left": "-bottom-3 -left-3",
  };

  const colorClasses = {
    primary: "text-primary",
    submerged: "text-submerged",
    embossed: "text-embossed",
  };

  if (position in singlePositionClasses) {
    return (
      <Icons.Plus
        className={cn(
          "absolute h-6 w-6",
          singlePositionClasses[position as keyof typeof singlePositionClasses],
          colorClasses[color as keyof typeof colorClasses],
          className
        )}
      />
    );
  }

  const doublePositionComponents = {
    "start-x": (
      <>
        <Icons.Plus
          className={cn("absolute -left-3 -top-3 h-6 w-6", colorClasses[color as keyof typeof colorClasses], className)}
        />
        <Icons.Plus
          className={cn(
            "absolute -bottom-3 -left-3 h-6 w-6",
            colorClasses[color as keyof typeof colorClasses],
            className
          )}
        />
      </>
    ),
    "end-x": (
      <>
        <Icons.Plus
          className={cn(
            "absolute -right-3 -top-3 h-6 w-6",
            colorClasses[color as keyof typeof colorClasses],
            className
          )}
        />
        <Icons.Plus
          className={cn(
            "absolute -bottom-3 -right-3 h-6 w-6",
            colorClasses[color as keyof typeof colorClasses],
            className
          )}
        />
      </>
    ),
    "start-y": (
      <>
        <Icons.Plus
          className={cn("absolute -left-3 -top-3 h-6 w-6", colorClasses[color as keyof typeof colorClasses], className)}
        />
        <Icons.Plus
          className={cn(
            "absolute -right-3 -top-3 h-6 w-6",
            colorClasses[color as keyof typeof colorClasses],
            className
          )}
        />
      </>
    ),
    "end-y": (
      <>
        <Icons.Plus
          className={cn(
            "absolute -bottom-3 -left-3 h-6 w-6",
            colorClasses[color as keyof typeof colorClasses],
            className
          )}
        />
        <Icons.Plus
          className={cn(
            "absolute -bottom-3 -right-3 h-6 w-6",
            colorClasses[color as keyof typeof colorClasses],
            className
          )}
        />
      </>
    ),
  };

  return doublePositionComponents[position as keyof typeof doublePositionComponents];
}
