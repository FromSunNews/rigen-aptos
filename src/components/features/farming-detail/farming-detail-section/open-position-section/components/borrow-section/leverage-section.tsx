import { Typography } from "@/components/shared/ui/typography";
import { Slider } from "@/components/shared/ui/slider";
import { Image } from "@/components/shared/ui/image";
import { useBoundStore } from "@/store";
import { cn } from "@/libs/utils/taildwind";

interface LeverageProps {
  isStrategyEnabled: boolean;
}

export const LeverageSection = ({ isStrategyEnabled }: LeverageProps) => {
  const leverage = useBoundStore((state) => state.leverage);
  const tokenStates = useBoundStore((state) => state.tokenStates);
  const updateLeverage = useBoundStore((state) => state.updateLeverage);
  const updateTokenState = useBoundStore((state) => state.updateTokenState);

  return (
    <div className="fcol gap-4">
      {/* Leverage Section - always display */}
      <div className={cn("fcol w-full gap-3 rounded", !isStrategyEnabled && "opacity-50")}>
        <div className="frow-between w-full items-center">
          <Typography variant="h3">Customise Leverage</Typography>
          <div className="fcenter rounded-full border border-ring/20 px-4 py-2">
            <Typography variant="small" weight="medium">
              {leverage.toFixed(1)}x
            </Typography>
          </div>
        </div>
        <Slider
          value={[leverage]}
          max={3}
          min={1}
          step={0.5}
          className="w-full"
          disabled={!isStrategyEnabled}
          marks={[
            { value: 1, label: "1x" },
            { value: 1.5, label: "1.5x" },
            { value: 2, label: "2x" },
            { value: 2.5, label: "2.5x" },
            { value: 3, label: "3x" },
          ]}
          onValueChange={(values) => updateLeverage(values[0])}
        />
        <Typography variant="small" color="submerged" className="w-full">
          Please keep in mind that when you leverage above 2x, you will have a slight short on the borrowed asset. The
          other paired asset will have typical long exposure, so choose which asset you borrow wisely.
        </Typography>
      </div>

      {/* Token Cards - UI change based on isStrategyEnabled */}
      <div className={cn("flex w-full flex-col gap-3 sm:flex-row", !isStrategyEnabled && "opacity-50")}>
        {["APTOS", "USDC"].map((token) => (
          <div key={token} className="f1 fcol gap-3.5 overflow-hidden rounded-xl border">
            <div className="frow gap-4 self-stretch bg-third px-3 py-2.5">
              <Image
                src={`/images/token/${token.toLowerCase()}.png`}
                alt={token.toLowerCase()}
                width={36}
                height={36}
                className="rounded-full"
              />
              <div className="fcol f1 gap-[5px]">
                <div className="frow-between items-baseline self-stretch">
                  <Typography>{!isStrategyEnabled ? 0 : tokenStates[token].amount}</Typography>
                  <Typography variant="small">{token}</Typography>
                </div>
                <Typography variant="small" color="submerged">
                  ${!isStrategyEnabled ? "0.00" : tokenStates[token].usdValue}
                </Typography>
                <div className="frow gap-2 self-start rounded-xl bg-third-foreground/20 px-2 py-0.5">
                  <Typography variant="small" color="submerged">
                    Borrowing Interest: 20%
                  </Typography>
                </div>
              </div>
            </div>
            {isStrategyEnabled && (
              <div className="frow-between w-full items-center px-3 pb-2.5">
                <div className="w-[80%]">
                  <Slider
                    value={[tokenStates[token].value]}
                    max={100}
                    min={0}
                    step={25}
                    marks={[
                      { value: 0, label: "0%" },
                      { value: 25, label: "25%" },
                      { value: 50, label: "50%" },
                      { value: 75, label: "75%" },
                      { value: 100, label: "100%" },
                    ]}
                    onValueChange={(values) => updateTokenState(token, values[0])}
                  />
                </div>
                <div className="rounded-base fcenter border border-ring/20 px-2 py-1">
                  <Typography variant="small" weight="medium">
                    {tokenStates[token].value}%
                  </Typography>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
