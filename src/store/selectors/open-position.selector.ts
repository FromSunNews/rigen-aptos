import { RootState } from "../types";

// Token info selectors
export const selectToken1 = (state: RootState) => state.token1;
export const selectToken2 = (state: RootState) => state.token2;

// Deposit amount selectors
export const selectDepositAmount = (state: RootState) => state.depositAmount;

// Borrow section selectors
export const selectLeverage = (state: RootState) => state.leverage;
export const selectIsSimpleBorrow = (state: RootState) => state.isSimpleBorrow;
export const selectSelectedStrategy = (state: RootState) => state.selectedStrategy;

// Modal selector
export const selectIsModalOpen = (state: RootState) => state.isModalOpen;

// Actions selectors
export const selectUpdateDepositAmount = (state: RootState) => state.updateDepositAmount;
export const selectSetMaxAmount = (state: RootState) => state.setMaxAmount;
export const selectUpdateAmountByPercentage = (state: RootState) => state.updateAmountByPercentage;
export const selectSetLeverage = (state: RootState) => state.setLeverage;
export const selectSetIsSimpleBorrow = (state: RootState) => state.setIsSimpleBorrow;
export const selectSetSelectedStrategy = (state: RootState) => state.setSelectedStrategy;
export const selectSetIsModalOpen = (state: RootState) => state.setIsModalOpen;
export const selectResetState = (state: RootState) => state.resetState;
