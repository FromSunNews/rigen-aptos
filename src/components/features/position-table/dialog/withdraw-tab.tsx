"use client";

import { Button } from "@/components/shared/ui/button";
import { Row } from "@tanstack/react-table";
import { UIPostionReserveData } from "@/clients/types/view/pool/position";
import React from "react";
import { Typography } from "@/components/shared/ui/typography";
import { TokenIcon } from "@/components/shared/custom/token-icon";
import { Input } from "@/components/shared/ui/input";
import { AccountAddress } from "@aptos-labs/ts-sdk";
import { useWithdraw } from "@/hooks/contracts/lending-page/entry/use-withdraw";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { formatNumber } from "@/libs/utils/number";
import { useTokenPrice } from "@/hooks/apis/use-token-price";

export default function WithdrawTab({ row, onClose }: { row: Row<UIPostionReserveData>; onClose: () => void }) {
  const { account } = useWallet();

  const [withdrawAmount, setWithdrawAmount] = React.useState<number>(Number(row.original.currentBalance) * 0.25);
  const [withdrawPercent, setWithdrawPercent] = React.useState<number>(25);

  const { mutate: withdrawMutation, isPending: isWithdrawPending } = useWithdraw();
  const { data: tokenPrice = 1 } = useTokenPrice(row.original.symbol);

  const handlePercentChange = (percent: number) => {
    setWithdrawPercent(percent);
    const amount = (Number(row.original.currentBalance) * percent) / 100;
    setWithdrawAmount(amount);
  };

  const handleMaxClick = () => {
    setWithdrawPercent(100);
    setWithdrawAmount(Number(row.original.currentBalance));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) {
      setWithdrawAmount(0);
      setWithdrawPercent(0);
      return;
    }
    setWithdrawAmount(value);
    const percent = (value / Number(row.original.currentBalance)) * 100;
    setWithdrawPercent(Math.min(100, Math.round(percent)));
  };

  const handleWithdraw = () => {
    withdrawMutation({
      asset: row.original.tokenAddress,
      amount: withdrawAmount.toString(),
      decimals: row.original.decimals,
      address: AccountAddress.fromString(account?.address || "0x0"),
      onClose: onClose,
    });
  };

  return (
    <div className="fcol gap-6 p-6">
      <div className="fcol gap-2">
        <div className="frow-between">
          <Typography className="text-sm">Position: {row.original.currentBalance}</Typography>
          <Typography className="text-sm">Available: {row.original.underlyingBalance}</Typography>
        </div>
        <div className="frow-icenter gap-4 rounded-3xl border p-4">
          <TokenIcon symbol={row.original.symbol} size={24} />
          <div className="frow-between f1 items-center">
            <div className="fcol f1 gap-1">
              <Input
                type="number"
                value={withdrawAmount}
                onChange={handleAmountChange}
                className="h-auto w-36 border py-1 text-base"
                placeholder="0.00"
              />
              <div className="text-sm text-muted-foreground">≈ ${formatNumber(withdrawAmount * tokenPrice)} USD</div>
            </div>

            <div className="fcol gap-1 text-end">
              <div className="text-base">{row.original.symbol}</div>
              <div
                className="cursor-pointer rounded-lg bg-accent px-2 py-1 text-sm hover:bg-secondary"
                onClick={handleMaxClick}
              >
                max
              </div>
            </div>
          </div>
        </div>
        <div className="frow gap-3">
          {[25, 50, 75, 100].map((percent) => (
            <div
              key={percent}
              className={`f1 cursor-pointer rounded-lg border bg-accent px-2 py-1 text-center text-sm hover:border-ring hover:text-primary ${
                withdrawPercent === percent ? "border-secondary bg-secondary" : ""
              }`}
              onClick={() => handlePercentChange(percent)}
            >
              {percent}%
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handleWithdraw} className="py-5 text-base" disabled={isWithdrawPending}>
        {isWithdrawPending ? "Withdrawing..." : `Withdraw ${row.original.symbol}`}
      </Button>
    </div>
  );
}
