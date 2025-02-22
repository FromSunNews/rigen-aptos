import { PoolSliceCreator } from "@/store/types/pool.type";

const getRandomChange = () => {
  return Math.random() * 0.02 - 0.01; // Random -1% to +1%
};

export const createPoolSlice: PoolSliceCreator = (set, get) => {
  let intervalId: NodeJS.Timeout | null = null;

  return {
    isLoading: true,
    poolData: null,

    setLoading: (loading) => set({ isLoading: loading }),

    updatePoolData: (data) => set({ poolData: data }),

    startPoolDataUpdates: () => {
      if (intervalId) return;

      intervalId = setInterval(() => {
        const { poolData } = get();
        if (!poolData) return;

        const newData = {
          ...poolData,
          tvl: poolData.tvl * (1 + getRandomChange()),
          apy: poolData.apy * (1 + getRandomChange()),
          price: poolData.price * (1 + getRandomChange()),
        };
        get().updatePoolData(newData);
      }, 3000);
    },

    stopPoolDataUpdates: () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    },
  };
};
