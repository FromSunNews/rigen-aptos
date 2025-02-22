import { Typography } from "@/components/shared/ui/typography";
import { cn } from "@/libs/utils/taildwind";
import { useBoundStore } from "@/store";
import { selectUpdateAmountByPercentage } from "@/store/selectors/open-position.selector";

interface PercentageButtonsProps {
  token: "usdc" | "aptos";
  currentAmount: number;
  maxAmount: number;
}

export const PercentageButtons = ({ token, currentAmount, maxAmount }: PercentageButtonsProps) => {
  const updateAmountByPercentage = useBoundStore(selectUpdateAmountByPercentage);

  const getCurrentPercentage = () => {
    if (maxAmount === 0) return 0;
    return Math.round((currentAmount / maxAmount) * 100);
  };

  const currentPercentage = getCurrentPercentage();

  return (
    <div className="frow gap-2.5">
      {[25, 50, 75, 100].map((percent) => (
        <div
          key={percent}
          className={cn(
            "f1 fcenter h-6 cursor-pointer rounded-lg px-2 py-1",
            currentPercentage === percent ? "bg-primary/30" : "bg-third"
          )}
          onClick={() => updateAmountByPercentage(token, percent)}
        >
          <Typography
            variant="small"
            color={currentPercentage === percent ? "primary" : "embossed"}
            className="sm:text-xs"
          >
            {percent}%
          </Typography>
        </div>
      ))}
    </div>
  );
};
