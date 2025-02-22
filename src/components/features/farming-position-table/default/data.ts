export const farmingPositions = [
  {
    id: "1",
    poolId: "1235",
    leverage: "3x",
    platform: "thala",
    tokens: [
      {
        symbol: "usdc",
        amount: "100.00 USDC",
      },
      {
        symbol: "aptos",
        amount: "100.00 USDC",
      },
    ],
    position: {
      total: "$1,500.00",
      token1Amount: "100.00 USDC",
      token2Amount: "100.00 USDC",
    },
    equityValue: {
      total: "~$1,500.00",
      amount: "+10.03USDC",
      percent: "(+10.03%)",
    },
    earn: {
      apr: 30.0,
      farm: "$10.03",
      daily: {
        percent: 0.05,
        amount: "$10.55",
      },
    },
    buffer: {
      percent: "50.00%",
      debtRatio: "30%",
    },
  },
  {
    id: "2",
    poolId: "1236",
    leverage: "2x",
    platform: "thala",
    tokens: [
      {
        symbol: "zusdt",
        amount: "200.00 USDT",
      },
      {
        symbol: "gui",
        amount: "0.005 GUI",
      },
    ],
    position: {
      total: "~$2,000.00",
      token1Amount: "200.00 USDT",
      token2Amount: "0.005 GUI",
    },
    equityValue: {
      total: "~$2,000.00",
      amount: "+15.50USDT",
      percent: "(+7.75%)",
    },
    earn: {
      apr: 25.0,
      farm: "$15.50",
      daily: {
        percent: 0.07,
        amount: "$12.35",
      },
    },
    buffer: {
      percent: "45.00%",
      debtRatio: "25%",
    },
  },
];
