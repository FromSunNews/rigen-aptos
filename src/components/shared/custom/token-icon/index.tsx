import { FC } from "react";
import { Image } from "../../ui/image";

interface TokenIconProps {
  symbol: string;
  size?: number;
  className?: string;
  isPlatform?: boolean;
}

export const TokenIcon: FC<TokenIconProps> = ({
  symbol,
  size = 24,
  className = "rounded-full",
  isPlatform = false,
}) => {
  const TOKEN_ICONS: Record<string, string> = {
    aptos: `/images/token/aptos.png`,
    usdc: `/images/token/usdc.png`,
    zusdt: `/images/token/zusdt.png`,
    dai: `/images/token/dai.png`,
    cell: `/images/token/cell.png`,
    stapt: `/images/token/stapt.png`,
    thala: `/images/token/thl.png`,
    gui: `/images/token/gui.png`,
  };
  const PLATFORM_ICONS: Record<string, string> = {
    thala: `/images/platform/thala.png`,
    liquid: `/images/platform/liquid.png`,
    cellana: `/images/platform/cellana.png`,
  };
  const normalizedSymbol = symbol.toLowerCase();
  const iconPath = isPlatform ? PLATFORM_ICONS[normalizedSymbol] : TOKEN_ICONS[normalizedSymbol];

  return (
    <Image src={iconPath || null} fallbackName={symbol} alt={symbol} width={size} height={size} className={className} />
  );
};
