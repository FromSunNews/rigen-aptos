import { cn } from "@/libs/utils/taildwind";

export const PoolInfoSkeleton = () => {
  return (
    <div className="relative flex w-full animate-pulse flex-col items-center border sm:flex-row sm:items-stretch">
      {/* Left section skeleton */}
      <div className="flex w-full flex-1 items-center gap-4 p-4 sm:ps-10">
        <div className="flex items-center">
          {/* Token pair skeleton */}
          <div className="relative h-9 w-16">
            <div className="absolute left-0 h-9 w-9 rounded-full bg-third" />
            <div className="absolute right-0 h-9 w-9 rounded-full bg-third" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-8 w-48 rounded-lg bg-third" />
          <div className="h-4 w-32 rounded-lg bg-third" />
        </div>
      </div>

      {/* Right section skeleton */}
      <div className="grid w-full grid-cols-3 border-t py-3 sm:w-[40%] sm:border-l sm:border-t-0 sm:py-0">
        {[0, 1, 2].map((index) => (
          <div key={index} className={cn("fcol-center relative gap-[9px]", index > 0 && "border-l")}>
            <div className="h-4 w-16 rounded-lg bg-third" />
            <div className="h-6 w-24 rounded-lg bg-third" />
          </div>
        ))}
      </div>
    </div>
  );
};
