import { Switch } from "@/components/shared/ui/switch";
import { Typography } from "@/components/shared/ui/typography";
import { cn } from "@/libs/utils/taildwind";
import { useBoundStore } from "@/store";

export const StrategySection = () => {
  const selectedStrategy = useBoundStore((state) => state.selectedStrategy);
  const isStrategyEnabled = useBoundStore((state) => state.isStrategyEnabled);
  const updateStrategy = useBoundStore((state) => state.updateStrategy);
  const toggleStrategy = useBoundStore((state) => state.toggleStrategy);
  const updateLeverage = useBoundStore((state) => state.updateLeverage);

  const onCheckedChange = () => {
    const newEnabled = !isStrategyEnabled;
    toggleStrategy(newEnabled);
    if (!newEnabled) {
      updateStrategy("");
      updateLeverage(1);
    } else {
      updateStrategy("Neutral (Pseudo)");
      updateLeverage(2.5);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-2 border-b px-5 py-4 sm:flex-row sm:justify-between">
      <div className="frow-icenter gap-3">
        <Typography variant="small" weight="medium">
          Enable Strategy
        </Typography>
        <Switch id="strategy-switch" checked={isStrategyEnabled} onCheckedChange={onCheckedChange} />
      </div>
      <div className={cn("frow-icenter gap-3", !isStrategyEnabled && "opacity-50")}>
        <Typography variant="small" weight="medium">
          Default strategy
        </Typography>
        {["Neutral (Pseudo)", "Long", "Short"].map((strategy) => (
          <div
            key={strategy}
            className={cn(
              "fcenter cursor-pointer rounded-3xl px-3 py-0.5",
              selectedStrategy === strategy ? "bg-primary/30" : "bg-third",
              !isStrategyEnabled && "pointer-events-none"
            )}
            onClick={() => isStrategyEnabled && updateStrategy(strategy)}
          >
            <Typography variant="small" color={selectedStrategy === strategy ? "primary" : "embossed"} weight="medium">
              {strategy}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
