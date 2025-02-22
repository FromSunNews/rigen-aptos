import { UILendingReserveData } from "@/clients/types/view/pool/lending";
import { StateCreator } from "zustand";
import { RootState } from "@/store/types";

export interface LendingPoolSlice {
  reserves: UILendingReserveData[];
  updateReserves: (reserves: UILendingReserveData[]) => void;
  reservesWithBalance: UILendingReserveData[];
  updateReservesWithBalance: (balances: UILendingReserveData[]) => void;
}

export type LendingPoolSliceCreator = StateCreator<RootState, [], [], LendingPoolSlice>;
