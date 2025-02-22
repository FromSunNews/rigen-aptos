import { LendingPositionSliceCreator } from "@/store/types/lending-position.type";

export const createLendingPositionSlice: LendingPositionSliceCreator = (set) => ({
  positionData: [],
  updatePositionData: (positionData) => set({ positionData }),
});
