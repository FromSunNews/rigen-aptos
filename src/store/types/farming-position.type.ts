import { StateCreator } from "zustand";
import { RootState } from "@/store/types";
import { SummaryData } from "./summary.type";

export interface FarmingPositionSlice {
  depositAmount: {
    usdc: number;
    aptos: number;
  };
  summaryData: SummaryData | null;
  updateDepositAmount: (token: "usdc" | "aptos", amount: number) => void;
  updateSummaryData: (data: SummaryData | null) => void;
}

export type FarmingPositionSliceCreator = StateCreator<RootState, [], [], FarmingPositionSlice>;
