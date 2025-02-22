import { useQuery } from "@tanstack/react-query";
import { coingeckoService } from "@/services/coingecko";

const tokenSymbolToId: Record<string, string> = {
  APT: "aptos",
  CELL: "cellena-finance",
  DAI: "dai",
  GUI: "gui-inu",
  STAPT: "amnis-staked-aptos-coin",
  THL: "thala",
  USDC: "usd-coin",
  ZUSDT: "tether",
};

// Hook for only a token
export function useTokenPrice(symbol: string) {
  const tokenId = tokenSymbolToId[symbol.toUpperCase()] || symbol.toLowerCase();
  console.log("tokenId", tokenId);
  return useQuery({
    queryKey: ["tokenPrice", tokenId],
    queryFn: () => coingeckoService.getTokenPrice(tokenId),
    // staleTime: 30 * 1000, // Cache in 30 seconds
    gcTime: 5 * 60 * 1000, // Keep cache in 5 minutes
  });
}

// Hook for multiple tokens
export function useMultipleTokenPrices(symbols: string[]) {
  const tokenIds = symbols.map(
    (symbol) => tokenSymbolToId[symbol.toUpperCase()] || symbol.toLowerCase()
  );

  return useQuery({
    queryKey: ["tokenPrices", tokenIds],
    queryFn: () => coingeckoService.getMultipleTokenPrices(tokenIds),
    gcTime: 5 * 60 * 1000,
  });
}
