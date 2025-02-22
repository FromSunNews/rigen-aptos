export interface Pool {
  id: string;
  tokens: string[];
  tvl: number;
  platform: string;
  boosted?: boolean;
  apy: {
    min: number;
    max: number;
  };
  apr: {
    yieldFarming: number;
    protocolRewards: number;
    borrowingInterest: number;
    total: number;
  };
  leverage: number;
}

export interface TokenOption {
  symbol: string;
  borrowingRate: number;
}

export interface CalculatedAPR {
  yieldFarming: number;
  protocolRewards: number;
  borrowingInterest: number;
  total: number;
  daily: number;
}

export interface FarmData {
  poolId: string;
  tokens: string[];
  platform: string;
  selectedToken: TokenOption;
  apr: {
    yieldFarming: number;
    protocolRewards: number;
    borrowingInterest: number;
    total: number;
  };
  leverage: number;
  tvl: number;
}
