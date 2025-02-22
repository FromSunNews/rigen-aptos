import { BorrowSliceCreator, TokenStates } from "@/store/types/borrow.type";

const initialTokenStates: TokenStates = {
  APTOS: {
    value: 50,
    amount: 100,
    usdValue: "500.00",
  },
  USDC: {
    value: 50,
    amount: 100,
    usdValue: "500.00",
  },
};

export const createBorrowSlice: BorrowSliceCreator = (set) => ({
  leverage: 1,
  tokenStates: initialTokenStates,
  selectedStrategy: "",
  isStrategyEnabled: false,
  investDays: 180,
  simulatorValue: 0,
  updateLeverage: (value) => set({ leverage: value }),
  updateTokenState: (token, value) =>
    set((state) => ({
      tokenStates: {
        ...state.tokenStates,
        [token]: {
          value,
          amount: value * 2,
          usdValue: (value * 10).toFixed(2),
        },
      },
    })),
  updateStrategy: (strategy) => set({ selectedStrategy: strategy }),
  toggleStrategy: (enabled) => set({ isStrategyEnabled: enabled }),
  updateInvestDays: (days) => set({ investDays: days }),
  updateSimulatorValue: (value) => set({ simulatorValue: value }),
});
