import { SummaryData } from "@/store/types/summary.type";
import { SummarySliceCreator } from "@/store/types/summary.type";
import { RootState } from "@/store/types";

const defaultSummaryData: SummaryData = {
  totalAPR: "--",
  totalAPY: "--",
  dailyAPR: "--",
  reinvestmentFee: "--",
  borrowingFee: "--",
  liquidationPrice: {
    token1: "APTOS",
    token2: "USDC",
    price: "0.00",
  },
  netExposure: {
    long: 0,
    short: 0,
  },
  leverage: {
    current: "1x",
    target: "3x",
  },
  assetsSupplied: {
    token1Amount: 0,
    token2Amount: 0,
    totalUSD: "0.00",
  },
  assetsBorrowed: {
    token1Amount: 0,
    token2Amount: 0,
    totalUSD: "0.00",
  },
  priceImpact: "0%",
  swapFee: {
    percentage: "0%",
    amount: "0.00",
  },
  positionValue: {
    token1Amount: 0,
    token2Amount: 0,
    totalUSD: "0.00",
  },
};

export const createSummarySlice: SummarySliceCreator = (set, get) => ({
  summaryData: defaultSummaryData,
  updateSummaryData: (data) => set({ summaryData: data }),
  calculateSummaryData: () => {
    const state = get() as RootState;
    const { depositAmount, leverage, selectedStrategy, isSimpleBorrow } = state;

    // Calculate total deposit in USD (assuming 1 APTOS = 5 USDC for example)
    const totalDepositUSD = depositAmount.usdc + depositAmount.aptos * 5;

    // Calculate borrowed amount based on leverage
    const borrowedAmount = totalDepositUSD * (leverage - 1);

    // Calculate fees
    const borrowingFeePercentage = 0.1; // 0.1%
    const borrowingFeeAmount = (borrowedAmount * borrowingFeePercentage) / 100;

    // Calculate exposure based on strategy
    let longExposure = totalDepositUSD / 2;
    let shortExposure = totalDepositUSD / 2;

    switch (selectedStrategy) {
      case "Long":
        longExposure = totalDepositUSD * 0.7;
        shortExposure = totalDepositUSD * 0.3;
        break;
      case "Short":
        longExposure = totalDepositUSD * 0.3;
        shortExposure = totalDepositUSD * 0.7;
        break;
      // Neutral remains 50/50
    }

    // Calculate APR/APY
    const baseAPR = 10; // 10%
    const strategyMultiplier = isSimpleBorrow ? 1 : 1.2;
    const leverageMultiplier = leverage;
    const totalAPR = baseAPR * strategyMultiplier * leverageMultiplier;

    const newSummaryData: SummaryData = {
      totalAPR: `${totalAPR.toFixed(2)}%`,
      totalAPY: `${(totalAPR * 1.1).toFixed(2)}%`, // Simple compound interest approximation
      dailyAPR: `${(totalAPR / 365).toFixed(2)}%`,
      reinvestmentFee: "0.1%",
      borrowingFee: `${borrowingFeeAmount.toFixed(2)} USDC (${borrowingFeePercentage}%)`,
      liquidationPrice: {
        token1: "APTOS",
        token2: "USDC",
        price: (5 * (1 + 0.8 / leverage)).toFixed(2), // Example liquidation price calculation
      },
      netExposure: {
        long: longExposure,
        short: shortExposure,
      },
      leverage: {
        current: `${leverage}x`,
        target: `${leverage}x`,
      },
      assetsSupplied: {
        token1Amount: depositAmount.usdc,
        token2Amount: depositAmount.aptos,
        totalUSD: totalDepositUSD.toFixed(2),
      },
      assetsBorrowed: {
        token1Amount: borrowedAmount / 2, // Split borrowed amount between assets
        token2Amount: borrowedAmount / (2 * 5), // Convert USDC to APTOS
        totalUSD: borrowedAmount.toFixed(2),
      },
      priceImpact: `${(0.1 * leverage).toFixed(2)}%`, // Example price impact calculation
      swapFee: {
        percentage: "0.3%",
        amount: (totalDepositUSD * 0.003).toFixed(2),
      },
      positionValue: {
        token1Amount: depositAmount.usdc + borrowedAmount / 2,
        token2Amount: depositAmount.aptos + borrowedAmount / (2 * 5),
        totalUSD: (totalDepositUSD + borrowedAmount).toFixed(2),
      },
    };

    set({ summaryData: newSummaryData });
  },
});
