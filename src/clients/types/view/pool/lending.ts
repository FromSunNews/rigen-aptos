import { PickProperties } from "@/clients/helper/type-factory";
import { AccountAddress } from "@aptos-labs/ts-sdk";

export type EntryLendingReserveData = {
  reserveFactor: number;
  unbacked: number;
  accruedToTreasuryScaled: number;
  availableLiquidity: number;
  totalLiquidity: number;
  borrowUsageRatio: number;
  supplyUsageRatio: number;
  totalVariableDebt: number;
  liquidityRate: number;
  variableBorrowRate: number;
  liquidityIndex: number;
  variableBorrowIndex: number;
  lastUpdateTimestamp: number;
  scaledVariableDebt: number;
  tokenAddress: AccountAddress;
  aTokenAddress: AccountAddress;
  symbol: string;
  progress: number;
  decimals: number;
  balance: number;
};

export const pickUILendingReserveData = [
  "tokenAddress",
  "symbol",
  "decimals",
  "liquidityRate",
  "totalVariableDebt",
  "totalLiquidity",
  "balance",
  "progress",
] as const;
export type UILendingReserveData = PickProperties<
  EntryLendingReserveData,
  (typeof pickUILendingReserveData)[number]
> & {
  variableBorrowRate: number;
  baseLTVasCollateral: number;
  reserveLiquidationThreshold: number;
};
