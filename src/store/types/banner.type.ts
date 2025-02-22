import { StateCreator } from "zustand";
import { RootState } from "@/store/types";

export interface FarmingStat {
  apy: number;
  balance: number;
  symbol: string;
}

export interface LendingStat {
  apy: number;
  platform: string;
  tokens: string[];
}

export interface BannerState {
  isLoading: boolean;
  bannerData: {
    tvl: number;
    yieldStats: {
      totalValueLocked: number;
      totalBorrowed: number;
      totalSupplied: number;
      utilizationRate: number;
      farmingStats: FarmingStat[];
      lendingStats: LendingStat[];
    };
  } | null;
  setLoading: (loading: boolean) => void;
  updateBannerData: (data: BannerState["bannerData"]) => void;
  startBannerUpdates: () => void;
  stopBannerUpdates: () => void;
}

export type BannerSliceCreator = StateCreator<RootState, [], [], BannerState>;
