import { Image } from "@/components/shared/ui/image";
import { Typography } from "@/components/shared/ui/typography";
import CountUp from "react-countup";
import { useBoundStore } from "@/store";

interface AssetDisplayProps {
  amount: number;
  symbol: string;
}

export const AssetDisplay = ({ amount, symbol }: AssetDisplayProps) => {
  const poolData = useBoundStore((state) => state.poolData);

  if (!poolData) {
    return null;
  }

  const getTokenLogo = () => {
    if (symbol === poolData.token1) {
      return poolData.token1Logo;
    }
    if (symbol === poolData.token2) {
      return poolData.token2Logo;
    }
    return "";
  };

  const tokenLogo = getTokenLogo();

  return (
    <div className="frow-between items-center gap-1">
      {/* <div className="w-[18px] h-[18px] rounded-[100px] justify-center items-center flex">
        <div className="w-[18px] h-[18px] relative" />
      </div> */}
      {tokenLogo && <Image src={tokenLogo} alt={symbol.toLowerCase()} width={18} height={18} />}
      <Typography variant="small" color="embossed" weight="medium">
        <CountUp end={amount} decimals={2} duration={1} separator="," /> {symbol}
      </Typography>
    </div>
  );
};
