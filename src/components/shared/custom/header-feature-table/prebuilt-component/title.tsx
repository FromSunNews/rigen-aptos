import { cn } from "@/libs/utils/taildwind";

import { Typography } from "@/components/shared/ui/typography";

export const HeaderTitle = ({ text, className }: { text: string; className?: string }) => {
  return <Typography className={cn("text-base md:text-base", className)}>{text}</Typography>;
};
