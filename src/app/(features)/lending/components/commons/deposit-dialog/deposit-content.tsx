"use client";

import { Button } from "@/components/shared/ui/button";
import { Row } from "@tanstack/react-table";
import React from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Input } from "@/components/shared/ui/input";
import { Typography } from "@/components/shared/ui/typography";
import { AccountAddress } from "@aptos-labs/ts-sdk";

import { UILendingReserveData } from "@/clients/types/view/pool/lending";
import { useDeposit } from "@/hooks/contracts/lending-page/entry/use-deposit";

export default function DepositContent({ row, onClose }: { row: Row<UILendingReserveData>; onClose: () => void }) {
  const { account } = useWallet();

  const data = {
    asset: row.original.tokenAddress,
    totalSupply: row.original.totalLiquidity,
    totalBorrow: row.original.totalVariableDebt,
    walletBalance: row.original.balance,
    apy: row.original.liquidityRate,
    decimals: row.original.decimals,
    symbol: row.original.symbol,
    address: AccountAddress.fromString(account?.address || "0x0"),
    referralCode: 0,
    availableAmount: row.original.totalLiquidity - row.original.totalVariableDebt,
  };

  const [depositAmount, setDepositAmount] = React.useState<string>(
    ((data.availableAmount * 25) / 100).toFixed(data.decimals)
  );
  const [depositPercent, setDepositPercent] = React.useState<number>(25);
  const { mutate: depositMutation, isPending: isDepositPending } = useDeposit();

  const handlePercentChange = (percent: number) => {
    setDepositPercent(percent);
    const amount = (data.availableAmount * percent) / 100;
    setDepositAmount(amount.toFixed(data.decimals));
  };

  const handleMaxClick = () => {
    setDepositPercent(100);
    const amount = data.availableAmount;
    setDepositAmount(amount.toFixed(data.decimals));
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
    <div className="flex flex-1 flex-col space-y-8">
      {/* Asset info */}
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <Typography color="submerged" className="mb-2 text-sm">
            Your Assets
          </Typography>
          <Typography className="text-3xl font-bold">${(data.walletBalance * 1).toFixed(2)}</Typography>
          <Typography color="submerged" className="mt-1 text-sm">
            {data.walletBalance.toFixed(2)} {data.symbol}
          </Typography>
        </div>
        <div className="flex flex-col rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/20 to-primary/5 p-5 backdrop-blur-sm">
          <Typography color="submerged" className="mb-2 text-sm">
            APR
          </Typography>
          <Typography className="text-3xl font-bold text-primary">{data.apy.toFixed(2)}%</Typography>
          <Typography color="submerged" className="mt-1 text-sm">
            Annual Percentage Rate
          </Typography>
        </div>
      </div>

      {/* Deposit input */}
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <Typography className="text-lg font-medium">Deposit</Typography>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
            <Typography color="submerged" className="text-xs">
              Available:
            </Typography>
            <Typography className="text-sm font-medium text-primary">
              {data.availableAmount.toFixed(2)} {data.symbol}
            </Typography>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          {/* Subtle gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

          <div className="relative flex items-center justify-between">
            <div className="flex flex-1 flex-col gap-1">
              <Input
                value={depositAmount}
                onChange={handleAmountChange}
                className="h-auto w-full border-none bg-transparent p-0 !text-3xl font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="0.00"
              />
              <Typography color="submerged" className="text-sm">
                ${(Number(depositAmount) * 1).toFixed(2)}
              </Typography>
            </div>

            <div className="flex items-center gap-3">
              <Typography className="text-xl font-medium">{data.symbol}</Typography>
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-lg border-white/20 px-4 py-0 text-xs font-medium hover:bg-white/10"
                onClick={handleMaxClick}
              >
                MAX
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Percentage buttons */}
      <div className="grid grid-cols-4 gap-3">
        {[25, 50, 75, 100].map((percent) => (
          <Button
            key={percent}
            variant={depositPercent === percent ? "third" : "outline"}
            size="sm"
            className={`h-10 w-full border-white/20 text-sm font-medium ${depositPercent === percent ? "shadow-md shadow-primary/20" : "hover:bg-white/10"}`}
            onClick={() => handlePercentChange(percent)}
          >
            {percent}%
          </Button>
        ))}
      </div>

      {/* Pool info */}
      <div className="mt-4 grid grid-cols-2 gap-6">
        <div className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <Typography color="submerged" className="mb-1 text-sm">
            Vault Total
          </Typography>
          <Typography className="text-xl font-medium">
            ${data.totalSupply.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </Typography>
          <Typography color="submerged" className="mt-1 text-xs">
            {data.totalSupply.toLocaleString(undefined, { maximumFractionDigits: 2 })} {data.symbol}
          </Typography>
        </div>
        <div className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <Typography color="submerged" className="mb-1 text-sm">
            Layer Total
          </Typography>
          <Typography className="text-xl font-medium">
            ${(data.totalSupply * 1.05).toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </Typography>
          <Typography color="submerged" className="mt-1 text-xs">
            {(data.totalSupply * 1.05).toLocaleString(undefined, { maximumFractionDigits: 2 })} {data.symbol}
          </Typography>
        </div>
      </div>

      {/* Deposit button */}
      <Button
        disabled={isDepositPending || !Number(depositAmount)}
        onClick={handleDeposit}
        className="mt-4 h-14 w-full bg-gradient-to-r from-primary to-primary/80 text-base font-medium uppercase hover:from-primary/90 hover:to-primary/70"
        ripple={true}
      >
        {isDepositPending ? "Depositing..." : "Deposit"}
      </Button>
    </div>
  );
}
