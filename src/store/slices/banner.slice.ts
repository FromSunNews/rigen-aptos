import { BannerSliceCreator } from "@/store/types/banner.type";

const getRandomChange = () => {
  return Math.random() * 0.02 - 0.01; // Random -1% to +1%
};

const initialState = {
  isLoading: true,
  bannerData: {
    tvl: 160513391,
    yieldStats: {
      totalValueLocked: 160513391,
      totalBorrowed: 85000000,
      totalSupplied: 120000000,
      utilizationRate: 70.83,
      farmingStats: [
        {
          apy: 97.3,
          balance: 1500,
          symbol: "usdc",
        },
        {
          apy: 60.5,
          balance: 800,
          symbol: "thala",
        },
        {
          apy: 71.9,
          balance: 1200,
          symbol: "gui",
        },
      ],
      lendingStats: [
        {
          apy: 97.3,
          platform: "thala",
          tokens: ["usdc", "aptos"],
        },
        {
          apy: 56.8,
          platform: "cellana",
          tokens: ["cell", "aptos"],
        },
        {
          apy: 34.3,
          platform: "thala",
          tokens: ["aptos", "thala"],
        },
      ],
    },
  },
};

export const createBannerSlice: BannerSliceCreator = (set, get) => {
  let intervalId: NodeJS.Timeout | null = null;

  return {
    ...initialState,

    setLoading: (loading) => set({ isLoading: loading }),

    updateBannerData: (data) => set({ bannerData: data }),

    startBannerUpdates: () => {
      if (intervalId) return;

      intervalId = setInterval(() => {
        const { bannerData } = get();
        if (!bannerData) return;

        const newData = {
          tvl: bannerData.tvl * (1 + getRandomChange()),
          yieldStats: {
            totalValueLocked: bannerData.yieldStats.totalValueLocked * (1 + getRandomChange()),
            totalBorrowed: bannerData.yieldStats.totalBorrowed * (1 + getRandomChange()),
            totalSupplied: bannerData.yieldStats.totalSupplied * (1 + getRandomChange()),
            utilizationRate: Math.min(
              100,
              Math.max(0, bannerData.yieldStats.utilizationRate * (1 + getRandomChange()))
            ),
            farmingStats: bannerData.yieldStats.farmingStats.map((stat) => ({
              ...stat,
              apy: Number(Math.max(0, stat.apy * (1 + getRandomChange())).toFixed(2)),
              balance: stat.balance * (1 + getRandomChange()),
            })),
            lendingStats: bannerData.yieldStats.lendingStats.map((stat) => ({
              ...stat,
              apy: Number(Math.max(0, stat.apy * (1 + getRandomChange())).toFixed(2)),
            })),
          },
        };
        get().updateBannerData(newData);
      }, 3000);
    },

    stopBannerUpdates: () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    },
  };
};
