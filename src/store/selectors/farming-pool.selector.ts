import { useBoundStore } from "@/store";
import { FarmingPoolSlice } from "@/store/types/farming-pool.type";

export const useFarmingPoolSelector = () => {
  const {
    filteredPools,
    isLoading,
    fetchPoolData,
    filterByPlatform,
    startTVLUpdates,
    updatePlatformSelected,
    platformSelected,
    updateLeverage,
    updateBorrowTokens,
  } = useBoundStore((state: FarmingPoolSlice) => state.farmingPoolState);

  return {
    filteredPools,
    isLoading,
    fetchPoolData,
    filterByPlatform,
    startTVLUpdates,
    updatePlatformSelected,
    platformSelected,
    updateLeverage,
    updateBorrowTokens,
  };
};
