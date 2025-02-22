import { StateCreator } from "zustand";
import { RootState } from "@/store/types";

export interface TokenInfo {
  current: number;
  available: number;
  isStableCoin: boolean;
  symbol: string;
  logo: string;
}

export interface DepositAmount {
  usdc: number;
  aptos: number;
}

export interface FarmData {
  poolId: string;
  tokens: string[];
  platform: string;
  selectedToken: {
    symbol: string;
    borrowingRate: number;
  };
  apr: {
    yieldFarming: number;
    protocolRewards: number;
    borrowingInterest: number;
    total: number;
  };
  leverage: number;
  tvl: number;
}

export interface OpenPositionState {
  // Deposit section
  token1: TokenInfo;
  token2: TokenInfo;
  depositAmount: DepositAmount;

  // Borrow section
  isSimpleBorrow: boolean;
  leverage: number;
  selectedStrategy: string;

  // Modal
  isModalOpen: boolean;

  // Farm data
  farmData: FarmData | null;

  // Actions
  updateDepositAmount: (token: "usdc" | "aptos", amount: number) => void;
  setMaxAmount: (token: "usdc" | "aptos") => void;
  updateAmountByPercentage: (token: "usdc" | "aptos", percentage: number) => void;
  setLeverage: (leverage: number) => void;
  setIsSimpleBorrow: (isSimple: boolean) => void;
  setSelectedStrategy: (strategy: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setOpenPositionData: (data: FarmData) => void;
  resetState: () => void;
}

export type OpenPositionSliceCreator = StateCreator<RootState, [], [], OpenPositionState>;
