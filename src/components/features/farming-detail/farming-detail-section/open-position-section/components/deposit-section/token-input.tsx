import { Image } from "@/components/shared/ui/image";
import { Typography } from "@/components/shared/ui/typography";
import { cn } from "@/libs/utils/taildwind";
import { formatNumber } from "@/libs/utils/number";
import { useTokenPrice } from "@/hooks/apis/use-token-price";
import { useBoundStore } from "@/store";
import { TokenInfo } from "@/store/types/open-position.type";

interface TokenInputProps {
  token: "token1" | "token2";
  amount: number;
  tokenInfo: TokenInfo;
  onMaxClick: () => void;
  className?: string;
}

export const TokenInput = ({ token, amount, tokenInfo, onMaxClick, className }: TokenInputProps) => {
  const poolData = useBoundStore((state) => state.poolData);
  const { data: tokenPrice = 1 } = useTokenPrice(tokenInfo.symbol);
  const usdValue = amount * tokenPrice;

  if (!poolData) {
    return null;
  }

  return (
    <div className={cn("frow-icenter gap-4 rounded-xl border px-5 py-2.5 sm:px-3", className)}>
      <Image src={tokenInfo.logo} alt={token} width={36} height={36} className="rounded-full sm:h-8 sm:w-8" />
      <div className="f1 fcol gap-[5px]">
        <div className="frow-between items-baseline">
          <Typography weight="medium" className="sm:text-sm">
            {formatNumber(amount)}
          </Typography>
          <Typography variant="small">{tokenInfo.symbol}</Typography>
        </div>
        <div className="frow-between items-center">
          <Typography variant="small" color="submerged" className="sm:text-xs">
            ${formatNumber(usdValue)}
          </Typography>
          <div className="fcenter cursor-pointer rounded-lg bg-third px-2 py-1" onClick={onMaxClick}>
            <Typography variant="small" className="sm:text-xs">
              max
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
