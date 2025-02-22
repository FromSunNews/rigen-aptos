import { cn } from "@/libs/utils/taildwind";
import { TokenIcon } from "../token-icon";

interface PairTokenProps extends React.HTMLAttributes<HTMLDivElement> {
  symbols: string[];
  size?: number;
  intersectSize?: number;
  className?: string;
}

export default function PairToken({ className, symbols, size = 20, intersectSize = 4, ...props }: PairTokenProps) {
  return (
    <div
      className={cn("frow-center relative", className)}
      style={{
        height: "auto",
        width: `${(size - intersectSize) * 2}px`,
      }}
      {...props}
    >
      {symbols.map((symbol, index) => (
        <div key={symbol} className={cn("absolute", index === 0 ? "left-0" : "right-0")}>
          <TokenIcon symbol={symbol} size={size} className={className} />
        </div>
      ))}
    </div>
  );
}
