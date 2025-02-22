import { BsSearch } from "react-icons/bs";

import { Skeleton } from "@/components/shared/ui/skeleton";

import { Input } from "@/components/shared/ui/input";
import { cn } from "@/libs/utils/taildwind";

export const HeaderSearch = ({
  className,
  placeholder,
  onChange,
  isLoading,
}: {
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  isLoading?: boolean;
}) => {
  if (isLoading) {
    return <Skeleton className="w-18 h-8 rounded-full md:h-10 md:w-40" />;
  }

  return (
    <div className={cn("relative", className)}>
      <Input
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        // className="md:min-w-43 max-w-20 truncate rounded-full pe-8 text-sm md:max-w-40"
        className="relative truncate rounded-full pe-8 text-sm"
      />
      <BsSearch className="absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 md:h-4 md:w-4" />
    </div>
  );
};
