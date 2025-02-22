import { Typography } from "@/components/shared/ui/typography";
import { cn } from "@/libs/utils/taildwind";

interface TradeProps {
  selectedTrade: "minimize" | "usdc" | "aptos";
  onTradeSelect: (trade: "minimize" | "usdc" | "aptos") => void;
}

export const TradeSection = ({ selectedTrade, onTradeSelect }: TradeProps) => {
  const trades = [
    { value: "minimize", label: "Minimize Trading" },
    { value: "usdc", label: "Trade USDC" },
    { value: "aptos", label: "Trade APTOS" },
  ] as const;

  return (
    <div className="fcol gap-2">
      <Typography variant="small" weight="medium">
        Trade
      </Typography>
      <div className="frow gap-2">
        {trades.map(({ value, label }) => (
          <div
            key={value}
            className={cn(
              "f1 fcenter cursor-pointer rounded-xl border px-4 py-2",
              selectedTrade === value ? "border-primary bg-primary/30" : ""
            )}
            onClick={() => onTradeSelect(value)}
          >
            <Typography variant="small" color={selectedTrade === value ? "primary" : "secondary"} weight="medium">
              {label}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
