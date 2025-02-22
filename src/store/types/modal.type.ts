import { StateCreator } from "zustand";
import { RootState } from "@/store/types";

export interface ModalSlice {
  isWalletOpen: boolean;
  openWalletModal: () => void;
  closeWalletModal: () => void;
  setWalletModalOpen: (isOpen: boolean) => void;
}

export type ModalSliceCreator = StateCreator<RootState, [], [], ModalSlice>;
