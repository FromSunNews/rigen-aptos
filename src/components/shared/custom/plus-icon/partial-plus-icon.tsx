import { cn } from "@/libs/utils/taildwind";

interface PartialPlusIconProps {
  className?: string;
  position: "top-right" | "bottom-right" | "top-left" | "bottom-left";
}

export function PartialPlusIcon({ position, className }: PartialPlusIconProps) {
  const positionClasses = {
    "top-right": {
      vertical: "-top-[6.5px] right-0",
      horizontal: "-top-[1.5px] right-0",
    },
    "bottom-right": {
      vertical: "-bottom-[6.5px] right-0",
      horizontal: "-bottom-[1.5px] right-0",
    },
    "top-left": {
      vertical: "-top-[6.5px] left-0",
      horizontal: "-top-[1.5px] left-0",
    },
    "bottom-left": {
      vertical: "-bottom-[6.5px] left-0",
      horizontal: "-bottom-[1.5px] left-0",
    },
  };

  return (
    <>
      <div
        className={cn("absolute h-3 w-[1.5px] rounded-full bg-primary", positionClasses[position].vertical, className)}
      />
      <div
        className={cn(
          "absolute h-[1.5px] w-2 rounded-full bg-primary",
          positionClasses[position].horizontal,
          className
        )}
      />
    </>
  );
}

export function FourCornerPlusIcon() {
  return (
    <>
      <PartialPlusIcon position="top-right" />
      <PartialPlusIcon position="bottom-right" />
      <PartialPlusIcon position="top-left" />
      <PartialPlusIcon position="bottom-left" />
    </>
  );
}
