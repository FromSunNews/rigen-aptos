import { useMemo } from "react";
import { TokenOption } from "@/components/features/pool-table/types";
import { FarmingPoolUI } from "@/store/types/farming-pool.type";
interface UsePoolCalculationsProps {
  pool: FarmingPoolUI;
  leverage: number;
  selectedToken: TokenOption;
}

export const usePoolCalculations = ({ pool, leverage, selectedToken }: UsePoolCalculationsProps) => {
  const calculatedAPR = useMemo(() => {
    // Base APR values
    const baseYieldFarming = pool.apr.yieldFarming;
    const baseProtocolRewards = pool.apr.protocolRewards;

    // Using borrowing rate from the selected token
    const baseBorrowingInterest = selectedToken.borrowingRate;

    // Calculate adjusted values based on leverage
    const adjustedYieldFarming = baseYieldFarming * leverage;
    const adjustedProtocolRewards = baseProtocolRewards * leverage;

    // Calculate borrowing interest based on leverage and selected token
    // Only calculate borrowing interest on the borrowed capital (leverage - 1)
    const adjustedBorrowingInterest = baseBorrowingInterest * (leverage - 1);

    // Calculate total APR
    const totalAPR = adjustedYieldFarming + adjustedProtocolRewards - adjustedBorrowingInterest;

    // Calculate daily APR
    const dailyAPR = totalAPR / 365;

    return {
      yieldFarming: Number(adjustedYieldFarming.toFixed(2)),
      protocolRewards: Number(adjustedProtocolRewards.toFixed(2)),
      borrowingInterest: Number(adjustedBorrowingInterest.toFixed(2)),
      total: Number(totalAPR.toFixed(2)),
      daily: Number(dailyAPR.toFixed(2)),
    };
  }, [pool, leverage, selectedToken]);

  return {
    calculatedAPR,
  };
};
