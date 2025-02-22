import { LendingPoolSliceCreator } from "@/store/types/lending-pool.type";

export const createLendingPoolSlice: LendingPoolSliceCreator = (set) => ({
  reserves: [],
  reservesWithBalance: [],
  updateReserves: (reserves) => set({ reserves }),
  updateReservesWithBalance: (reservesWithBalance) => set({ reservesWithBalance }),
});
