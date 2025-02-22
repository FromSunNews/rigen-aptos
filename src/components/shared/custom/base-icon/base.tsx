import { cn } from "@/libs/utils/taildwind";

export const BaseIcon = ({
  width = 20,
  height = 20,
  className,
  color,
  viewBox = "0 0 20 20",
  children,
  ...props
}: React.SVGProps<SVGSVGElement> & { children: React.ReactNode }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(color && `fill-${color}`, className)}
      {...props}
    >
      {children}
    </svg>
  );
};
