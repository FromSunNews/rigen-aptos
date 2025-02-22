import axios from "axios";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";
const API_KEY = "CG-4c8XSwRHakEwPAr2Hnt4nxJF";

const coingeckoApi = axios.create({
  baseURL: COINGECKO_API_URL,
  headers: {
    "x-cg-api-key": API_KEY,
  },
});

export interface TokenPrice {
  [key: string]: {
    usd: number;
  };
}

export const coingeckoService = {
  getTokenPrice: async (tokenId: string): Promise<number> => {
    try {
      const response = await coingeckoApi.get<TokenPrice>("/simple/price", {
        params: {
          ids: tokenId,
          vs_currencies: "usd",
        },
      });
      return response.data[tokenId]?.usd || 0;
    } catch (error) {
      console.error("Error fetching token price:", error);
      return 0;
    }
  },

  getMultipleTokenPrices: async (tokenIds: string[]): Promise<Record<string, number>> => {
    try {
      const response = await coingeckoApi.get<TokenPrice>("/simple/price", {
        params: {
          ids: tokenIds.join(","),
          vs_currencies: "usd",
        },
      });
      
      return tokenIds.reduce((acc, tokenId) => {
        acc[tokenId] = response.data[tokenId]?.usd || 0;
        return acc;
      }, {} as Record<string, number>);
    } catch (error) {
      console.error("Error fetching multiple token prices:", error);
      return {};
    }
  },
};
