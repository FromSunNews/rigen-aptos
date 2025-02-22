import { FarmingPositionSliceCreator } from "@/store/types/farming-position.type";

export const createFarmingPositionSlice: FarmingPositionSliceCreator = (set) => ({
  depositAmount: {
    usdc: 0,
    aptos: 0,
  },
  summaryData: null,
  updateDepositAmount: (token: "usdc" | "aptos", amount: number) =>
    set((state) => ({
      depositAmount: {
        ...state.depositAmount,
        [token]: amount,
      },
    })),
  updateSummaryData: (data) => set({ summaryData: data }),
});
