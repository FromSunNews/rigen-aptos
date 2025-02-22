import { ClosedPosition } from "./columns";

export const closedPositions: ClosedPosition[] = [
  {
    id: "1",
    poolId: "1235",
    platform: "Thala",
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
    capital: {
      total: "~$1,500.00",
      token1Amount: "100.00 USDC",
      token2Amount: "100.00 USDC",
    },
    finalPosition: {
      total: "~$1,500.00",
      token1Amount: "100.00 USDC",
      token2Amount: "100.00 USDC",
    },
    returnedEquity: {
      total: "~$1,500.00",
    },
    txRecord: "0x1234...5678",
  },
  {
    id: "2",
    poolId: "1235",
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
    capital: {
      total: "~$1,500.00",
      token1Amount: "100.00 USDC",
      token2Amount: "100.00 USDC",
    },
    finalPosition: {
      total: "~$1,500.00",
      token1Amount: "100.00 USDC",
      token2Amount: "100.00 USDC",
    },
    returnedEquity: {
      total: "~$1,500.00",
    },
    txRecord: "0x1234...5678",
  },
];
