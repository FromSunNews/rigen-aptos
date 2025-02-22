import { Typography } from "@/components/shared/ui/typography";

import { AssetDisplay } from "./asset-display";

interface SummaryProps {
  totalAPR: string;
  totalAPY: string;
  dailyAPR: string;
  reinvestmentFee: string;
  borrowingFee: string;
  liquidationPrice: {
    token1: string;
    token2: string;
    price: string;
  };
  netExposure: {
    long: number;
    short: number;
  };
  leverage: {
    current: string;
    target: string;
  };
  assetsSupplied: {
    token1Amount: number;
    token2Amount: number;
    totalUSD: string;
  };
  assetsBorrowed: {
    token1Amount: number;
    token2Amount: number;
    totalUSD: string;
  };
  priceImpact: string;
  swapFee: {
    percentage: string;
    amount: string;
  };
  positionValue: {
    token1Amount: number;
    token2Amount: number;
    totalUSD: string;
  };
}

export const CloseSummary = ({ ...props }: SummaryProps) => {
  return (
    <div className="fcol inline-flex rounded-3xl bg-third">
      <div className="fcol gap-3 self-stretch rounded-md px-6 py-3">
        <div className="py-2">
          <Typography color="embossed" weight="medium" className="font-mono">
            Position
          </Typography>
        </div>

        <div className="inline-flex items-start justify-between self-stretch">
          <Typography variant="small" color="submerged" weight="medium" className="f1">
            Updated Position
          </Typography>
          <div className="inline-flex flex-col items-end justify-center">
            <div className="inline-flex items-start justify-end gap-2">
              <AssetDisplay amount={props.assetsSupplied.token1Amount} symbol="USDC" />
              <Typography variant="small" color="embossed" weight="medium">
                +
              </Typography>
              <AssetDisplay amount={props.assetsSupplied.token2Amount} symbol="APTOS" />
            </div>
            <Typography variant="small" color="submerged" weight="medium">
              ~ ${props.assetsSupplied.totalUSD}
            </Typography>
          </div>
        </div>

        <div className="inline-flex items-end justify-between self-stretch">
          <Typography variant="small" color="submerged" weight="medium" className="f1">
            Updated Debt Value
          </Typography>
          <Typography variant="small" color="destructive" weight="medium">
            {props.priceImpact}
          </Typography>
        </div>

        <div className="inline-flex items-center justify-between self-stretch">
          <Typography variant="small" color="submerged" weight="medium">
            Swap Cost ({props.swapFee.percentage} fee)
          </Typography>
          <Typography variant="small" color="destructive" weight="medium">
            {props.swapFee.percentage} (${props.swapFee.amount})
          </Typography>
        </div>

        <div className="inline-flex items-center justify-between self-stretch">
          <Typography variant="small" color="submerged" weight="medium">
            Price Impact
          </Typography>
          <Typography variant="small" color="embossed" weight="medium">
            --
          </Typography>
        </div>

        <div className="h-[0px] self-stretch border border-embossed/20"></div>

        <div className="inline-flex items-start justify-between self-stretch">
          <Typography variant="small" color="submerged" weight="medium" className="f1">
            Receivable
          </Typography>
          <div className="inline-flex flex-col items-end justify-center">
            <div className="inline-flex items-start justify-end gap-2">
              <AssetDisplay amount={props.positionValue.token1Amount} symbol="USDC" />
              <Typography variant="small" color="embossed" weight="medium">
                +
              </Typography>
              <AssetDisplay amount={props.positionValue.token2Amount} symbol="APTOS" />
            </div>
            <Typography variant="small" color="submerged" weight="medium">
              ~ ${props.positionValue.totalUSD}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
