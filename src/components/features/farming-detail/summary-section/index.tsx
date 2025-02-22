import { Typography } from "@/components/shared/ui/typography";
import { Image } from "@/components/shared/ui/image";

import { HiOutlineArrowSmRight } from "react-icons/hi";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { AssetDisplay } from "./asset-display";
import { APRSection } from "./apr-section";

// Interface remains the same
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

export const FarmingSummarySection = ({ ...props }: SummaryProps) => {
  return (
    <div className="fcol rounded-3xl bg-third">
      <div className="fcol gap-2 rounded-md px-6 py-3">
        <Typography variant="h5" color="embossed" weight="medium" className="font-mono leading-9">
          Summary
        </Typography>
        <div className="inline-flex self-stretch rounded-xl border border-primary bg-primary/20 p-2.5">
          <APRSection label="Total APR" value={props.totalAPR} newValue={props.totalAPR} />
          <APRSection label="Total APY" value={props.totalAPY} newValue={props.totalAPY} />
          <APRSection label="Daily APR" value={props.dailyAPR} newValue={props.dailyAPR} />
        </div>
      </div>

      <div className="fcol gap-3 rounded-md px-6 py-3">
        <div className="frow-between w-full items-center">
          <Typography variant="small" color="submerged" weight="medium">
            Reinvestment Fee
          </Typography>
          <Typography variant="small" color="embossed" weight="medium" className="underline decoration-dotted">
            {props.reinvestmentFee}
          </Typography>
        </div>

        <div className="frow-between w-full items-center">
          <Typography variant="small" color="submerged" weight="medium">
            Borrowing Fee
          </Typography>
          <Typography variant="small" color="embossed" weight="medium" className="underline decoration-dotted">
            {props.borrowingFee}
          </Typography>
        </div>

        <div className="frow-between w-full items-center">
          <Typography variant="small" color="submerged" weight="medium">
            Liquidation Prices (Estimated)
          </Typography>
          <div className="fcol items-center justify-center gap-2">
            <div className="frow-between items-center gap-1">
              {/* <div className="w-4 h-4 relative">
                  <div className="w-4 h-4 left-0 top-0 absolute rounded-[100px] justify-center items-center inline-flex" />
                </div> */}
              <Image src="/images/token/aptos.png" alt="aptos" width={18} height={18} />

              <Typography variant="small" color="embossed" weight="medium">
                1 {props.liquidationPrice.token1} = {props.liquidationPrice.price} {props.liquidationPrice.token2}
              </Typography>
              <LiaExchangeAltSolid size={16} />
            </div>
          </div>
        </div>

        <div className="frow-between w-full items-start">
          <Typography variant="small" color="submerged" weight="medium">
            Net Exposure
          </Typography>
          <div className="fcol gap-2">
            <div className="frow-between items-center gap-1">
              <div className="fcenter flex h-5 w-14 gap-2 rounded-xl bg-primary/20">
                <Typography variant="small" color="embossed" weight="medium" className="text-right">
                  Long
                </Typography>
              </div>
              {/* <div className="w-[18px] h-[18px] rounded-[100px] justify-center items-center flex" /> */}
              <div className="frow-between items-center gap-1">
                <Image src="/images/token/usdc.png" alt="usdc" width={18} height={18} />
                <Typography variant="small" color="embossed" weight="medium">
                  {props.netExposure.long}
                </Typography>
              </div>
            </div>
            <div className="frow-between items-center gap-1">
              <div className="fcenter flex h-5 w-14 gap-2 rounded-xl bg-destructive">
                <Typography variant="small" color="embossed" weight="medium" className="text-center">
                  Short
                </Typography>
              </div>
              {/* <div className="w-[18px] h-[18px] rounded-[100px] justify-center items-center flex" /> */}
              <div className="frow-between items-center gap-1">
                <Image src="/images/token/aptos.png" alt="" width={18} height={18} />
                <Typography variant="small" color="embossed" weight="medium">
                  {props.netExposure.short}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fcol gap-3 rounded-md px-6 py-3">
        <div className="frow-between gap-2 pb-2">
          <Typography color="embossed" weight="medium" className="font-mono">
            Position
          </Typography>
        </div>

        <div className="frow-between w-full items-center">
          <Typography variant="small" color="submerged" weight="medium">
            Leverage
          </Typography>
          <div className="frow-between items-center gap-2">
            <Typography variant="small" color="embossed" weight="medium">
              {props.leverage.current}
            </Typography>
            <HiOutlineArrowSmRight size={16} />
            <Typography variant="small" color="primary" weight="medium">
              {props.leverage.target}
            </Typography>
          </div>
        </div>

        {/* Assets Supplied Section */}
        <div className="frow-between w-full items-start">
          <Typography variant="small" color="submerged" weight="medium">
            Assets Supplied
          </Typography>
          <div className="fcol items-end justify-center">
            <div className="frow-between items-start gap-2">
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

        {/* Assets Borrowed Section */}
        <div className="frow-between w-full items-start">
          <Typography variant="small" color="submerged" weight="medium">
            Assets Borrowed
          </Typography>
          <div className="fcol items-end justify-center">
            <div className="frow-between items-start gap-2">
              <AssetDisplay amount={props.assetsBorrowed.token1Amount} symbol="USDC" />
              <Typography variant="small" color="embossed" weight="medium">
                +
              </Typography>
              <AssetDisplay amount={props.assetsBorrowed.token2Amount} symbol="APTOS" />
            </div>
            <Typography variant="small" color="submerged" weight="medium">
              ~ ${props.assetsBorrowed.totalUSD}
            </Typography>
          </div>
        </div>

        <div className="frow-between w-full items-end">
          <Typography variant="small" color="submerged" weight="medium">
            Price Impact
          </Typography>
          <Typography variant="small" color="destructive" weight="medium">
            {props.priceImpact}
          </Typography>
        </div>

        <div className="frow-between w-full items-center">
          <Typography variant="small" color="submerged" weight="medium">
            Swap Cost ({props.swapFee.percentage} fee)
          </Typography>
          <Typography variant="small" color="destructive" weight="medium">
            {props.swapFee.percentage} (${props.swapFee.amount})
          </Typography>
        </div>

        <div className="h-[0px] self-stretch border border-embossed/20"></div>

        <div className="frow-between w-full items-start">
          <Typography variant="small" color="submerged" weight="medium">
            Position Value
          </Typography>
          <div className="fcol items-end justify-center">
            <div className="frow-between items-start gap-2">
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
