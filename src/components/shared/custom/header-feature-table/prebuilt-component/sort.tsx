import { Skeleton } from "@/components/shared/ui/skeleton";

import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/ui/select";
import { Typography } from "@/components/shared/ui/typography";
import { cn } from "@/libs/utils/taildwind";

export const HeaderSort = ({
  className,
  options,
  onChange,
  isLoading,
}: {
  className?: string;
  options: Array<{ label: string; value: string }>;
  onChange?: (value: string) => void;
  isLoading?: boolean;
}) => {
  if (isLoading) return <Skeleton className="h-10 w-40 rounded-full" />;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Typography variant="small" color="submerged" className="hidden w-20 md:block">
        Sort by
      </Typography>
      <Select onValueChange={onChange} defaultValue={options[0]?.value}>
        {/* <SelectTrigger className="max-w-20 rounded-full md:min-w-40 md:max-w-40"> */}
        <SelectTrigger className="rounded-full">
          <SelectValue placeholder={options[0]?.label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
