import { FarmingPoolUI } from "@/store/types/farming-pool.type";

export const dataPoolTable: FarmingPoolUI[] = [
  // Thala Pools
  {
    id: "1",
    pairTokens: ["usdc", "aptos"],
    tvl: 10870000,
    platform: "thala",
    boosted: true,
    apy: {
      min: 130.5,
      max: 130.5,
    },
    apr: {
      yieldFarming: 80,
      protocolRewards: 30,
      borrowingInterest: 0,
      total: 130.5,
      daily: 130.5 / 365,
    },
    leverage: {
      min: 1,
      max: 2,
      selected: 1,
    },
    borrowTokens: {
      selected: "usdc",
      options: ["usdc", "aptos"],
    },
  },
  {
    id: "4",
    pairTokens: ["usdc", "zusdt"],
    tvl: 12300000,
    platform: "thala",
    boosted: false,
    apy: {
      min: 118.7,
      max: 135.4,
    },
    apr: {
      yieldFarming: 70,
      protocolRewards: 28,
      borrowingInterest: 0,
      total: 118.7,
      daily: 118.7 / 365,
    },
    leverage: {
      min: 1,
      max: 5,
      selected: 1,
    },
    borrowTokens: {
      selected: "usdc",
      options: ["usdc", "zusdt"],
    },
  },

  // Liquid Pools
  {
    id: "5",
    pairTokens: ["aptos", "usdc"],
    tvl: 9500000,
    platform: "liquid",
    boosted: true,
    apy: {
      min: 142.3,
      max: 142.3,
    },
    apr: {
      yieldFarming: 85,
      protocolRewards: 42,
      borrowingInterest: 0,
      total: 142.3,
      daily: 142.3 / 365,
    },
    leverage: {
      min: 1,
      max: 1,
      selected: 1,
    },
    borrowTokens: {
      selected: "usdc",
      options: ["usdc", "aptos"],
    },
  },
  {
    id: "6",
    pairTokens: ["zusdt", "usdc"],
    tvl: 7800000,
    platform: "liquid",
    boosted: false,
    apy: {
      min: 115.6,
      max: 128.9,
    },
    apr: {
      yieldFarming: 65,
      protocolRewards: 35,
      borrowingInterest: 0,
      total: 115.6,
      daily: 115.6 / 365,
    },
    leverage: {
      min: 1,
      max: 3,
      selected: 1,
    },
    borrowTokens: {
      selected: "usdc",
      options: ["usdc", "zusdt"],
    },
  },

  // Cellana Pools
  {
    id: "2",
    pairTokens: ["zusdt", "usdc"],
    tvl: 8500000,
    platform: "cellana",
    boosted: false,
    apy: {
      min: 125.3,
      max: 140.2,
    },
    apr: {
      yieldFarming: 75,
      protocolRewards: 35,
      borrowingInterest: 0,
      total: 125.3,
      daily: 125.3 / 365,
    },
    leverage: {
      min: 1,
      max: 2,
      selected: 1,
    },
    borrowTokens: {
      selected: "usdc",
      options: ["usdc", "zusdt"],
    },
  },
  {
    id: "3",
    pairTokens: ["thala", "usdc"],
    tvl: 15200000,
    platform: "cellana",
    boosted: true,
    apy: {
      min: 145.8,
      max: 145.8,
    },
    apr: {
      yieldFarming: 90,
      protocolRewards: 40,
      borrowingInterest: 0,
      total: 145.8,
      daily: 145.8 / 365,
    },
    leverage: {
      min: 1,
      max: 4,
      selected: 1,
    },
    borrowTokens: {
      selected: "usdc",
      options: ["usdc", "thala"],
    },
  },
];
