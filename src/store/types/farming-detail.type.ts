import { StateCreator } from "zustand";
import { RootState } from "@/store/types";
import { FarmingPoolUI } from "./farming-pool.type";

export interface FarmingDetailState {
  poolSelected: FarmingPoolUI | null;
  setPoolSelected: (pool: FarmingPoolUI) => void;
}

export interface FarmingDetailSlice {
  farmingDetailState: FarmingDetailState;
}

export type FarmingDetailSliceCreator = StateCreator<RootState, [], [], FarmingDetailSlice>;