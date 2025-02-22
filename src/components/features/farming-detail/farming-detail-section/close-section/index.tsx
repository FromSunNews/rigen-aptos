"use client";

import { Typography } from "@/components/shared/ui/typography";
import { Slider } from "@/components/shared/ui/slider";
import { TokenIcon } from "@/components/shared/custom/token-icon";
import { useState } from "react";
import { cn } from "@/libs/utils/taildwind";
import PositionModal from "./position-modal";

type TradeType = "minimize" | "usdc" | "aptos";

export const CloseSection = () => {
  const [selectedTrade, setSelectedTrade] = useState<TradeType>("minimize");
  const [sliderValue, setSliderValue] = useState(0.75);

  const handleTradeSelect = (type: TradeType) => {
    setSelectedTrade(type);
  };

  return (
    <div className="space-y-4">
      <Typography variant="h4" color="primary">
        Withdraw
      </Typography>

      <div className="space-y-4 rounded-3xl border px-5 py-6">
        <div className="frow-between flex h-[90px] w-full gap-4">
          <div
            className={cn(
              "fcol-jcenter f1 cursor-pointer items-start justify-start space-y-1 rounded-2xl px-3 py-2.5",
              selectedTrade === "minimize" ? "border border-primary bg-primary/20" : "bg-third"
            )}
            onClick={() => handleTradeSelect("minimize")}
          >
            <Typography variant="small" size="base" color="embossed">
              Minimize Trade
            </Typography>
            {selectedTrade === "minimize" && (
              <div className="fcenter gap-2 rounded-xl bg-white/20 px-2">
                <Typography variant="small" color="embossed">
                  Suggested
                </Typography>
              </div>
            )}
          </div>

          <div
            className={cn(
              "frow-icenter f1 cursor-pointer items-start justify-start gap-2 space-y-1 rounded-2xl px-3 py-2.5",
              selectedTrade === "usdc" ? "border border-primary bg-primary/20" : "bg-third"
            )}
            onClick={() => handleTradeSelect("usdc")}
          >
            <TokenIcon symbol="USDC" size={36} />
            <Typography color="embossed" className="mb-1">
              Convert to USDC
            </Typography>
          </div>

          <div
            className={cn(
              "frow-icenter f1 cursor-pointer items-start justify-start gap-2 space-y-1 rounded-2xl px-3 py-2.5",
              selectedTrade === "aptos" ? "border border-primary bg-primary/20" : "bg-third"
            )}
            onClick={() => handleTradeSelect("aptos")}
          >
            <TokenIcon symbol="APT" size={36} />
            <Typography color="embossed" className="mt-1">
              Convert to APTOS
            </Typography>
          </div>
        </div>
        <div className="frow-between w-full items-center">
          <Typography variant="p" color="embossed">
            Withdraw
          </Typography>
          <div className="fcenter rounded-full border border-ring/20 px-4 py-2">
            <Typography variant="small" weight="medium">
              {(sliderValue * 100).toFixed(0)}%
            </Typography>
          </div>
        </div>
        <Slider
          defaultValue={[0.75]}
          max={1}
          min={0}
          step={0.25}
          className="w-full"
          marks={[
            { value: 0, label: "0%" },
            { value: 0.25, label: "25%" },
            { value: 0.5, label: "50%" },
            { value: 0.75, label: "75%" },
            { value: 1, label: "100%" },
          ]}
          value={[sliderValue]}
          onValueChange={(value: number[]) => {
            setSliderValue(value[0]);
          }}
        />
        <div>
          <Typography variant="small" color="submerged" className="w-full">
            To minimize the cost of borrowing fees, it&#39;s advised to avoid opening and closing positions in a very
            short span of time. If rebalancing is required, consider adjusting your existing position rather than
            closing and reopening it.
          </Typography>
        </div>
      </div>

      <PositionModal selectedTrade={selectedTrade} sliderValue={sliderValue} />
    </div>
  );
};
