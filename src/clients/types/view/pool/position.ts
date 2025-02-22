import { PickProperties } from "@/clients/helper/type-factory";
import { AccountAddress } from "@aptos-labs/ts-sdk";

export interface PositionReserveData {
  profit: number;
  profitPercentage: number;
  initialLiquidityIndex: number;
  currentLiquidityIndex: number;
  initialBalance: number;
  currentBalance: number;
  tokenAddress: AccountAddress;
  aTokenAddress: AccountAddress;
  symbol: string;
  decimals: number;
  underlyingBalance: number;
  liquidityRate: number;
}

export const pickUIPostionReserveData = [
  "profit",
  "profitPercentage",
  "initialBalance",
  "currentBalance",
  "tokenAddress",
  "aTokenAddress",
  "symbol",
  "decimals",
  "underlyingBalance",
  "liquidityRate",
] as const;
export type UIPostionReserveData = PickProperties<PositionReserveData, (typeof pickUIPostionReserveData)[number]>;
