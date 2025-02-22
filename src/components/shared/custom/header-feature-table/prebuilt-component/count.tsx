import { Typography } from "@/components/shared/ui/typography";

import { cn } from "@/libs/utils/taildwind";

import { Skeleton } from "@/components/shared/ui/skeleton";

export const HeaderCount = ({
  value,
  className,
  isLoading,
}: {
  value: number;
  className?: string;
  isLoading?: boolean;
}) => {
  if (isLoading) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  return (
    <div className={cn("fcenter h-8 w-6 rounded-full bg-muted-foreground/10 md:h-10 md:w-8", className)}>
      <Typography variant="small" color="primary">
        {value}
      </Typography>
    </div>
  );
};
