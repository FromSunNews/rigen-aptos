import { OpenPositionSliceCreator } from "@/store/types/open-position.type";

const initialState = {
  token1: {
    current: 0,
    available: 1000,
    isStableCoin: true,
    symbol: "USDC",
    logo: "/images/token/usdc.png",
  },
  token2: {
    current: 0,
    available: 500,
    isStableCoin: false,
    symbol: "APTOS",
    logo: "/images/token/aptos.png",
  },
  depositAmount: {
    usdc: 0,
    aptos: 0,
  },
  isSimpleBorrow: true,
  leverage: 1,
  selectedStrategy: "Neutral",
  isModalOpen: false,
  farmData: null,
};

export const createOpenPositionSlice: OpenPositionSliceCreator = (set, get) => ({
  ...initialState,

  updateDepositAmount: (token, amount) => {
    const state = get();
    const tokenInfo = token === "usdc" ? state.token1 : state.token2;

    // Validate amount
    if (amount < 0) amount = 0;
    if (amount > tokenInfo.available) amount = tokenInfo.available;

    set((state) => ({
      depositAmount: {
        ...state.depositAmount,
        [token]: amount,
      },
    }));
  },

  setMaxAmount: (token) => {
    const state = get();
    const tokenInfo = token === "usdc" ? state.token1 : state.token2;
    set((state) => ({
      depositAmount: {
        ...state.depositAmount,
        [token]: tokenInfo.available,
      },
    }));
  },

  updateAmountByPercentage: (token, percentage) => {
    const state = get();
    const tokenInfo = token === "usdc" ? state.token1 : state.token2;
    const amount = (tokenInfo.available * Math.min(Math.max(percentage, 0), 100)) / 100;
    set((state) => ({
      depositAmount: {
        ...state.depositAmount,
        [token]: amount,
      },
    }));
  },

  setLeverage: (leverage) => {
    // Limit leverage from 1x to 5x
    // Only allow valid values
    const validLeverage = Math.min(Math.max(leverage, 1), 5);
    set({ leverage: validLeverage });
  },

  setIsSimpleBorrow: (isSimple) => set({ isSimpleBorrow: isSimple }),

  setSelectedStrategy: (strategy) => {
    // Only allow valid values
    const validStrategies = ["Neutral", "Long", "Short"];
    if (validStrategies.includes(strategy)) {
      set({ selectedStrategy: strategy });
    }
  },

  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),

  setOpenPositionData: (data) => set({ farmData: data }),

  resetState: () => set(initialState),
});
