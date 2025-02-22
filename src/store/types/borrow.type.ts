import { StateCreator } from "zustand";
import { RootState } from "@/store/types";

export interface TokenSliderState {
  value: number;
  amount: number;
  usdValue: string;
}

export interface TokenStates {
  [key: string]: TokenSliderState;
}

export interface BorrowSlice {
  leverage: number;
  tokenStates: TokenStates;
  selectedStrategy: string;
  isStrategyEnabled: boolean;
  investDays: number;
  simulatorValue: number;
  updateLeverage: (value: number) => void;
  updateTokenState: (token: string, value: number) => void;
  updateStrategy: (strategy: string) => void;
  toggleStrategy: (enabled: boolean) => void;
  updateInvestDays: (days: number) => void;
  updateSimulatorValue: (value: number) => void;
}

export type BorrowSliceCreator = StateCreator<RootState, [], [], BorrowSlice>;
