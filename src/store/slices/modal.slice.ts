import { StateCreator } from "zustand";
import { RootState } from "../types";
import { ModalSlice } from "@/store/types/modal.type";

export const createModalSlice: StateCreator<RootState, [], [], ModalSlice> = (set) => ({
  isWalletOpen: false,
  openWalletModal: () => set((state) => ({ isWalletOpen: true })),
  closeWalletModal: () => set((state) => ({ isWalletOpen: false })),
  setWalletModalOpen: (isOpen: boolean) => set((state) => ({ isWalletOpen: isOpen })),
});
