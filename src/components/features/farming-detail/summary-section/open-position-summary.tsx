import { Typography } from "@/components/shared/ui/typography";
import { Image } from "@/components/shared/ui/image";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { AssetDisplay } from "./asset-display";
import { APRSection } from "./apr-section";
import CountUp from "react-countup";
import { useBoundStore } from "@/store";
import { useEffect } from "react";
import { useTokenPrice } from "@/hooks/apis/use-token-price";

/**
 * OpenPositionSummary displays real-time position metrics and updates based on user actions:
 *
 * 1. Deposit Changes:
 *    - Updates Assets Supplied section
 *    - Recalculates Position Value
 *    - Affects Borrowed amounts when leveraged
 *
 * 2. Strategy Changes:
 *    - Updates Net Exposure ratios
 *    - Modifies APR/APY calculations
 *    - Adjusts Price Impact
 *
 * 3. Leverage Adjustments:
 *    - Updates Liquidation Price
 *    - Modifies Assets Borrowed amounts
 *    - Changes total Position Value
 *
 * 4. Token Distribution Changes:
 *    - Updates Net Exposure ratios
 *    - Affects Price Impact
 *    - Modifies Swap Fees
 *
 * All numeric values use CountUp for smooth transitions, providing
 * visual feedback for value changes. The component automatically
 * recalculates all metrics when any input parameter changes.
 */

const formatUSD = (value: string) => {
  const numValue = parseFloat(value.replace(/,/g, ""));
  return isNaN(numValue) ? 0 : numValue;
};

export const OpenPositionSummary = () => {
  const depositAmount = useBoundStore((state) => state.depositAmount);
  const summaryData = useBoundStore((state) => state.summaryData);
  const calculateSummaryData = useBoundStore((state) => state.calculateSummaryData);
  const leverage = useBoundStore((state) => state.leverage);
  const selectedStrategy = useBoundStore((state) => state.selectedStrategy);
  const isSimpleBorrow = useBoundStore((state) => state.isSimpleBorrow);
  const poolData = useBoundStore((state) => state.poolData);

  // Get real-time token prices for both tokens in the pool
  const { data: token1Price = 0 } = useTokenPrice(poolData?.token1 || "");
  const { data: token2Price = 0 } = useTokenPrice(poolData?.token2 || "");

  // Calculate USD values
  const calculateUSDValue = (amount: number, isToken2: boolean) => {
    return amount * (isToken2 ? token2Price : token1Price);
  };

  // Recalculate all metrics when relevant values change
  useEffect(() => {
    calculateSummaryData();
  }, [depositAmount, leverage, selectedStrategy, isSimpleBorrow, calculateSummaryData]);

  // Calculate total position value in USD
  const totalPositionValueUSD =
    calculateUSDValue(summaryData?.assetsSupplied.token1Amount || 0, false) +
    calculateUSDValue(summaryData?.assetsSupplied.token2Amount || 0, true);

  // Calculate total borrowed value in USD
  const totalBorrowedValueUSD =
    calculateUSDValue(summaryData?.assetsBorrowed.token1Amount || 0, false) +
    calculateUSDValue(summaryData?.assetsBorrowed.token2Amount || 0, true);

  if (!poolData) {
    return null;
  }

  return (
    <div className="fcol rounded-3xl bg-third">
      {/* APR Section */}
      <div className="fcol gap-2 rounded-md px-6 py-3">
        <Typography variant="h5" color="embossed" weight="medium" className="font-mono leading-9">
          Summary
        </Typography>
        <div className="inline-flex self-stretch rounded-xl border border-primary bg-primary/20 p-2.5">
          <APRSection
            label="Total APR"
            value={summaryData?.totalAPR || "--"}
            newValue={summaryData?.totalAPR || "--"}
          />
          <APRSection
            label="Total APY"
            value={summaryData?.totalAPY || "--"}
            newValue={summaryData?.totalAPY || "--"}
          />
          <APRSection
            label="Daily APR"
            value={summaryData?.dailyAPR || "--"}
            newValue={summaryData?.dailyAPR || "--"}
          />
        </div>
      </div>

      {/* Fees Section */}
      <div className="fcol gap-3 rounded-md px-6 py-3">
        <div className="frow-between w-full items-center">
          <Typography variant="small" color="submerged" weight="medium">
            Reinvestment Fee
          </Typography>
          <Typography variant="small" color="embossed" weight="medium" className="underline decoration-dotted">
            {summaryData?.reinvestmentFee || "--"}
          </Typography>
        </div>

        <div className="frow-between w-full items-center">
          <Typography variant="small" color="submerged" weight="medium">
            Borrowing Fee
          </Typography>
          <Typography variant="small" color="embossed" weight="medium" className="underline decoration-dotted">
            {summaryData?.borrowingFee || "--"}
          </Typography>
        </div>

        {/* Liquidation Prices */}
        <div className="frow-between w-full items-center">
          <Typography variant="small" color="submerged" weight="medium">
            Liquidation Prices (Estimated)
          </Typography>
          <div className="fcol items-end justify-center gap-2">
            <div className="frow-between items-center gap-1">
              <Image src={poolData.token1Logo} alt={poolData.token1} width={18} height={18} />
              <Typography variant="small" color="embossed" weight="medium">
                1 {poolData.token1} = <CountUp end={token1Price} decimals={2} duration={1} separator="," />{" "}
                {poolData.token2}
              </Typography>
              <LiaExchangeAltSolid size={16} />
            </div>
          </div>
        </div>

        {/* Net Exposure */}
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
              <div className="frow-between items-center gap-1">
                <Image src={poolData.token1Logo} alt={poolData.token1} width={18} height={18} />
                <Typography variant="small" color="embossed" weight="medium">
                  <CountUp end={summaryData?.netExposure.long || 0} duration={1} />
                </Typography>
              </div>
            </div>
            <div className="frow-between items-center gap-1">
              <div className="fcenter flex h-5 w-14 gap-2 rounded-xl bg-destructive">
                <Typography variant="small" color="embossed" weight="medium" className="text-center">
                  Short
                </Typography>
              </div>
              <div className="frow-between items-center gap-1">
                <Image src={poolData.token2Logo} alt={poolData.token2} width={18} height={18} />
                <Typography variant="small" color="embossed" weight="medium">
                  <CountUp end={summaryData?.netExposure.short || 0} duration={1} />
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Position Section */}
      <div className="fcol gap-3 rounded-md px-6 py-3">
        <div className="frow-between gap-2 pb-2">
          <Typography color="embossed" weight="medium" className="font-mono">
            Position
          </Typography>
        </div>

        {/* Leverage */}
        <div className="frow-between w-full items-center">
          <Typography variant="small" color="submerged" weight="medium">
            Leverage
          </Typography>
          <div className="frow-between items-center gap-2">
            <Typography variant="small" color="embossed" weight="medium">
              <CountUp
                end={parseFloat(summaryData?.leverage.current?.replace("x", "") || "1")}
                decimals={1}
                duration={1}
              />
              x
            </Typography>
            <HiOutlineArrowSmRight size={16} />
            <Typography variant="small" color="primary" weight="medium">
              {summaryData?.leverage.target || "1x"}
            </Typography>
          </div>
        </div>

        {/* Assets Supplied */}
        <div className="frow-between w-full items-start">
          <Typography variant="small" color="submerged" weight="medium">
            Assets Supplied
          </Typography>
          <div className="fcol items-end justify-center">
            <div className="frow-between items-start gap-2">
              <AssetDisplay amount={summaryData?.assetsSupplied.token1Amount || 0} symbol={poolData.token1} />
              <Typography variant="small" color="embossed" weight="medium">
                +
              </Typography>
              <AssetDisplay amount={summaryData?.assetsSupplied.token2Amount || 0} symbol={poolData.token2} />
            </div>
            <Typography variant="small" color="submerged" weight="medium">
              ~ $
              <CountUp end={totalPositionValueUSD} decimals={2} duration={1} separator="," />
            </Typography>
          </div>
        </div>

        {/* Assets Borrowed */}
        <div className="frow-between w-full items-start">
          <Typography variant="small" color="submerged" weight="medium">
            Assets Borrowed
          </Typography>
          <div className="fcol items-end justify-center">
            <div className="frow-between items-start gap-2">
              <AssetDisplay amount={summaryData?.assetsBorrowed.token1Amount || 0} symbol={poolData.token1} />
              <Typography variant="small" color="embossed" weight="medium">
                +
              </Typography>
              <AssetDisplay amount={summaryData?.assetsBorrowed.token2Amount || 0} symbol={poolData.token2} />
            </div>
            <Typography variant="small" color="submerged" weight="medium">
              ~ $
              <CountUp end={totalBorrowedValueUSD} decimals={2} duration={1} separator="," />
            </Typography>
          </div>
        </div>

        {/* Price Impact */}
        <div className="frow-between w-full items-end">
          <Typography variant="small" color="submerged" weight="medium">
            Price Impact
          </Typography>
          <Typography variant="small" color="destructive" weight="medium">
            {summaryData?.priceImpact || "0%"}
          </Typography>
        </div>

        {/* Swap Fee */}
        <div className="frow-between w-full items-center">
          <Typography variant="small" color="submerged" weight="medium">
            Swap Cost ({summaryData?.swapFee.percentage || "0%"} fee)
          </Typography>
          <Typography variant="small" color="destructive" weight="medium">
            {summaryData?.swapFee.percentage || "0%"} ($
            <CountUp end={formatUSD(summaryData?.swapFee.amount || "0")} decimals={2} duration={1} separator="," />)
          </Typography>
        </div>

        <div className="h-[0px] self-stretch border border-embossed/20"></div>

        {/* Position Value */}
        <div className="frow-between w-full items-start">
          <Typography variant="small" color="submerged" weight="medium">
            Position Value
          </Typography>
          <div className="fcol items-end justify-center">
            <div className="frow-between items-start gap-2">
              <AssetDisplay amount={summaryData?.positionValue.token1Amount || 0} symbol={poolData.token1} />
              <Typography variant="small" color="embossed" weight="medium">
                +
              </Typography>
              <AssetDisplay amount={summaryData?.positionValue.token2Amount || 0} symbol={poolData.token2} />
            </div>
            <Typography variant="small" color="submerged" weight="medium">
              ~ $
              <CountUp
                end={formatUSD(summaryData?.positionValue.totalUSD || "0")}
                decimals={2}
                duration={1}
                separator=","
              />
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
