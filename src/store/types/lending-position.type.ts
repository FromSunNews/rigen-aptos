import { StateCreator } from "zustand";
import { RootState } from "@/store/types";
import { UIPostionReserveData } from "@/clients/types/view/pool/position";

export interface LendingPositionSlice {
  positionData: UIPostionReserveData[];
  updatePositionData: (positionData: UIPostionReserveData[]) => void;
}

export type LendingPositionSliceCreator = StateCreator<RootState, [], [], LendingPositionSlice>;
