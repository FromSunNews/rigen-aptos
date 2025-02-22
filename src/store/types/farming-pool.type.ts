import { StateCreator } from "zustand";
import { RootState } from "@/store/types";

export interface FarmingPoolUI {
  id: string;
  pairTokens: string[];
  tvl: number;
  platform: string;
  boosted: boolean;
  apy: {
    min: number;
    max: number;
  };
  apr: {
    yieldFarming: number;
    protocolRewards: number;
    borrowingInterest: number;
    total: number;
    daily: number;
  };
  leverage: {
    min: number;
    max: number;
    selected: number;
  };
  borrowTokens: {
    selected: string;
    options: string[];
  };
}

export interface FarmingPoolState {
  pools: FarmingPoolUI[];
  filteredPools: FarmingPoolUI[];
  isLoading: boolean;
  platformSelected: string;
  fetchPoolData: () => Promise<void>;
  filterByPlatform: (platform: string) => void;
  updatePoolsTVL: () => Promise<void>;
  startTVLUpdates: () => () => void;
  updatePlatformSelected: (platform: string) => void;
  updateLeverage: (leverage: number, poolId: string) => void;
  updateBorrowTokens: (selectedBorrowToken: string, poolId: string) => void;
}

export interface PoolCalculation {
  yieldFarming: number;
  protocolRewards: number;
  leverage: number;
  selectedToken: string;
}


export interface FarmingPoolSlice {
  farmingPoolState: FarmingPoolState;
}

export type FarmingPoolSliceCreator = StateCreator<RootState, [], [], FarmingPoolSlice>;
