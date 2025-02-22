import { cn } from "@/libs/utils/taildwind";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-third-foreground/10", className)} {...props} />;
}

export { Skeleton };
