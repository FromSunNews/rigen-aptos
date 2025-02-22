import { StateCreator } from "zustand";
import { RootState } from "@/store/types";

export interface SummaryData {
  totalAPR: string;
  totalAPY: string;
  dailyAPR: string;
  reinvestmentFee: string;
  borrowingFee: string;
  liquidationPrice: {
    token1: string;
    token2: string;
    price: string;
  };
  netExposure: {
    long: number;
    short: number;
  };
  leverage: {
    current: string;
    target: string;
  };
  assetsSupplied: {
    token1Amount: number;
    token2Amount: number;
    totalUSD: string;
  };
  assetsBorrowed: {
    token1Amount: number;
    token2Amount: number;
    totalUSD: string;
  };
  priceImpact: string;
  swapFee: {
    percentage: string;
    amount: string;
  };
  positionValue: {
    token1Amount: number;
    token2Amount: number;
    totalUSD: string;
  };
}

export interface SummarySlice {
  summaryData: SummaryData | null;
  updateSummaryData: (data: SummaryData | null) => void;
  calculateSummaryData: () => void;
}

export type SummarySliceCreator = StateCreator<RootState, [], [], SummarySlice>;
