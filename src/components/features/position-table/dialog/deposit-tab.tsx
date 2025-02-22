"use client";

import React from "react";
import { Button } from "@/components/shared/ui/button";
import { Row } from "@tanstack/react-table";
import { UIPostionReserveData } from "@/clients/types/view/pool/position";
import { Typography } from "@/components/shared/ui/typography";
import { TokenIcon } from "@/components/shared/custom/token-icon";
import { Input } from "@/components/shared/ui/input";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { AccountAddress } from "@aptos-labs/ts-sdk";
import { useDeposit } from "@/hooks/contracts/lending-page/entry/use-deposit";

export default function DepositTab({ row, onClose }: { row: Row<UIPostionReserveData>; onClose: () => void }) {
  const { account } = useWallet();

  const [depositAmount, setDepositAmount] = React.useState<string>(
    (Number(row.original.underlyingBalance) * 0.25).toFixed(row.original.decimals)
  );
  const [depositPercent, setDepositPercent] = React.useState<number>(25);
  const { mutate: depositMutation, isPending: isDepositPending } = useDeposit();

  const data = {
    asset: row.original.tokenAddress,
    apy: row.original.liquidityRate,
    decimals: row.original.decimals,
    symbol: row.original.symbol,
    address: AccountAddress.fromString(account?.address || "0x0"),
    referralCode: 0,
    availableAmount: row.original.underlyingBalance,
    currentBalance: row.original.currentBalance,
  };

  const handlePercentChange = (percent: number) => {
    setDepositPercent(percent);
    const amount = (data.availableAmount * percent) / 100;
    setDepositAmount(amount.toFixed(data.decimals));
  };

  const handleMaxClick = () => {
    setDepositPercent(100);
    setDepositAmount(data.availableAmount.toFixed(data.decimals));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDepositAmount(value);
    const percent = (Number(value) / data.availableAmount) * 100;
    setDepositPercent(Math.min(100, Math.round(percent)));
  };

  const handleDeposit = () => {
    depositMutation({
      asset: data.asset,
      amount: depositAmount,
      decimals: data.decimals,
      address: data.address,
      referralCode: data.referralCode,
      onClose: onClose,
    });
  };

  return (
    <div className="fcol mt-6 gap-4 pb-4">
      <div className="fcol gap-2">
        <div className="frow-between">
          <Typography className="text-sm">Position: {data.currentBalance}</Typography>
          <Typography className="text-sm">Available: {data.availableAmount}</Typography>
        </div>
        <div className="frow-icenter gap-4 rounded-3xl border p-4">
          <TokenIcon symbol={data.symbol} size={24} />
          <div className="frow-between f1 items-center">
            <div className="fcol f1 gap-1">
              <Input
                type="number"
                value={depositAmount}
                onChange={handleAmountChange}
                className="h-auto w-36 border py-1 text-base"
                placeholder="0.00"
              />
              <div className="text-sm text-muted-foreground">${depositAmount}</div>
            </div>

            <div className="fcol gap-1 text-end">
              <div className="text-base">{data.symbol}</div>
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
                depositPercent === percent ? "border-secondary bg-secondary" : ""
              }`}
              onClick={() => handlePercentChange(percent)}
            >
              {percent}%
            </div>
          ))}
        </div>
      </div>

      <div className="frow items-center justify-between rounded-full bg-secondary px-4 py-2">
        <p className="text-sm text-primary">APY</p>
        <p className="text-lg text-primary">{data.apy}%</p>
      </div>

      <Button onClick={handleDeposit} className="py-5 text-base" disabled={isDepositPending}>
        {isDepositPending ? "Depositing..." : `Deposit ${data.symbol}`}
      </Button>
    </div>
  );
}
