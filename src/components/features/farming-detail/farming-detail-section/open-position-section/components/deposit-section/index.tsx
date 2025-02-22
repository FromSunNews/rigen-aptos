import { Typography } from "@/components/shared/ui/typography";
import { TokenInput } from "./token-input";
import { PercentageButtons } from "./percentage-buttons";
import { useBoundStore } from "@/store";
import { formatNumber } from "@/libs/utils/number";

export const DepositSection = () => {
  const token1 = useBoundStore((state) => state.token1);
  const token2 = useBoundStore((state) => state.token2);
  const depositAmount = useBoundStore((state) => state.depositAmount);
  const updateDepositAmount = useBoundStore((state) => state.updateDepositAmount);

  return (
    <div className="fcol gap-2">
      <Typography variant="h4" color="primary">
        Deposit
      </Typography>
      <div className="flex w-full flex-col gap-4 rounded-3xl border p-5 sm:flex-row sm:items-center sm:justify-between">
        {/* USDC Section */}
        <div className="f1 fcol gap-2 sm:w-full">
          <div className="frow-between items-center">
            <div className="frow gap-2 rounded-lg bg-secondary px-2 py-0.5">
              <Typography variant="small" color="primary">
                {token1.isStableCoin ? "Stable Coin" : "Coin"}
              </Typography>
            </div>
            <Typography variant="small">
              Available{" "}
              {token1.available.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </div>
          <TokenInput
            token="token1"
            amount={depositAmount.usdc}
            tokenInfo={token1}
            onMaxClick={() => updateDepositAmount("usdc", token1.available)}
          />
          <PercentageButtons token="usdc" currentAmount={depositAmount.usdc} maxAmount={token1.available} />
        </div>

        {/* Divider */}
        <Typography variant="small" className="text-center sm:py-2">
          and/or
        </Typography>

        {/* APTOS Section */}
        <div className="f1 fcol gap-2 sm:w-full">
          <div className="frow-between items-center">
            <div className="frow gap-2 rounded-lg bg-secondary px-2 py-0.5">
              <Typography variant="small" color="primary">
                {token2.isStableCoin ? "Stable Coin" : "Coin"}
              </Typography>
            </div>
            <Typography variant="small">Available {formatNumber(token2.available)}</Typography>
          </div>
          <TokenInput
            token="token2"
            amount={depositAmount.aptos}
            tokenInfo={token2}
            onMaxClick={() => updateDepositAmount("aptos", token2.available)}
          />
          <PercentageButtons token="aptos" currentAmount={depositAmount.aptos} maxAmount={token2.available} />
        </div>
      </div>
    </div>
  );
};
