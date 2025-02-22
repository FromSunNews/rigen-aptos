import { StateCreator } from "zustand";
import { RootState } from "@/store/types";

export interface PoolData {
  tvl: number;
  apy: number;
  dex: string;
  price: number;
  token1: string;
  token2: string;
  token1Logo: string;
  token2Logo: string;
}

export interface PoolState {
  isLoading: boolean;
  poolData: PoolData | null;
  setLoading: (loading: boolean) => void;
  updatePoolData: (data: PoolData) => void;
  startPoolDataUpdates: () => void;
  stopPoolDataUpdates: () => void;
}

export type PoolSliceCreator = StateCreator<RootState, [], [], PoolState>;
