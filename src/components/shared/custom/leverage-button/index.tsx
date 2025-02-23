import { PlusIcon, MinusIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { Button } from "../../ui/button";
import { Typography } from "../../ui/typography";
import React from "react";
import { useMobile } from "@/hooks/shared/use-mobile";
import { useFarmingPoolSelector } from "@/store/selectors/farming-pool.selector";
import { FarmingPoolUI } from "@/store/types/farming-pool.type";

export default function LeverageButton({ row }: { row: Row<FarmingPoolUI> }) {
  const isMobile = useMobile();
  const minLeverage = row.original.leverage.min;
  const maxLeverage = row.original.leverage.max;
  const selectedLeverage = row.original.leverage.selected;
  const step = 0.5;
  const { updateLeverage } = useFarmingPoolSelector();

  const increment = () => {
    if (selectedLeverage < maxLeverage) {
      const newValue = Math.min(maxLeverage, selectedLeverage + step);
      updateLeverage(newValue, row.original.id);
    }
  };

  const decrement = () => {
    if (selectedLeverage > minLeverage) {
      const newValue = Math.max(minLeverage, selectedLeverage - step);
      updateLeverage(newValue, row.original.id);
    }
  };

  if (isMobile) {
    return (
      <div className="frow-center gap-2 rounded-full border border-ring/40 px-4 py-1">
        <Typography className="text-center">{selectedLeverage.toFixed(1)}x</Typography>
        <div className="fcol-center gap-1">
          <Button
            variant="none"
            size="icon"
            onClick={increment}
            disabled={selectedLeverage >= maxLeverage}
            className="h-3 w-3 p-0"
          >
            <ChevronUpIcon />
          </Button>
          <Button
            variant="none"
            size="icon"
            onClick={decrement}
            disabled={selectedLeverage <= minLeverage}
            className="h-3 w-3 p-0"
          >
            <ChevronDownIcon />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="frow-icenter gap-2">
      <Button
        variant="third"
        size="icon"
        className="h-8 w-8 rounded-full disabled:bg-background"
        onClick={decrement}
        disabled={selectedLeverage <= minLeverage}
      >
        <MinusIcon className="h-4 w-4" />
      </Button>

      <Typography className="min-w-[40px] text-center">{selectedLeverage.toFixed(1)}x</Typography>

      <Button
        variant="third"
        size="icon"
        className="h-8 w-8 rounded-full disabled:bg-background"
        onClick={increment}
        disabled={selectedLeverage >= maxLeverage}
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
