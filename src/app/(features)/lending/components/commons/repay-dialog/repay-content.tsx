"use client";

import { Button } from "@/components/shared/ui/button";
import { Row } from "@tanstack/react-table";
import React from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Input } from "@/components/shared/ui/input";
import { Typography } from "@/components/shared/ui/typography";
import { AccountAddress } from "@aptos-labs/ts-sdk";

import { UILendingReserveData } from "@/clients/types/view/pool/lending";
import { useRepay } from "@/hooks/contracts/lending-page/entry/use-repay";
import { useUserDebt } from "@/hooks/contracts/lending-page/view/use-user-debt";

export default function RepayContent({ row, onClose }: { row: Row<UILendingReserveData>; onClose: () => void }) {
  const { account } = useWallet();
  const userAddress = account ? AccountAddress.fromString(account.address) : undefined;

  // Sử dụng hook để lấy thông tin nợ
  const { data: userDebtData, isLoading: isLoadingDebt } = useUserDebt(userAddress);

  // Tìm khoản nợ của token hiện tại
  const currentTokenDebt = userDebtData?.detailedDebts.find(
    (debt) => debt.token.address.toString() === row.original.tokenAddress.toString()
  );

  const data = {
    asset: row.original.tokenAddress,
    totalSupply: row.original.totalLiquidity,
    totalBorrow: row.original.totalVariableDebt,
    walletBalance: row.original.balance,
    apy: (row.original as any).variableBorrowRate || 0,
    decimals: row.original.decimals,
    symbol: row.original.symbol,
    address: AccountAddress.fromString(account?.address || "0x0"),
    borrowedAmount: currentTokenDebt?.amount || 0, // Sử dụng thông tin nợ thực tế
    interestRate: currentTokenDebt?.interestRate || (row.original as any).variableBorrowRate || 0,
  };

  const [repayAmount, setRepayAmount] = React.useState<string>((data.borrowedAmount * 0.25).toFixed(data.decimals));
  const [repayPercent, setRepayPercent] = React.useState<number>(25);
  const { mutate: repayMutation, isPending: isRepayPending } = useRepay();

  const handlePercentChange = (percent: number) => {
    setRepayPercent(percent);
    const amount = (data.borrowedAmount * percent) / 100;
    setRepayAmount(amount.toFixed(data.decimals));
  };

  const handleMaxClick = () => {
    setRepayPercent(100);
    setRepayAmount(data.borrowedAmount.toFixed(data.decimals));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRepayAmount(value);
    const percent = (Number(value) / data.borrowedAmount) * 100;
    setRepayPercent(Math.min(100, Math.round(percent)));
  };

  const handleRepay = () => {
    repayMutation({
      asset: data.asset,
      amount: repayAmount,
      decimals: data.decimals,
      interestRateMode: 2, // Variable rate
      onBehalfOf: data.address,
      onClose: onClose,
    });
  };

  return (
    <div className="flex flex-1 flex-col space-y-8">
      {/* Loan info */}
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <Typography color="submerged" className="mb-2 text-sm">
            Your Debt
          </Typography>
          <Typography className="text-3xl font-bold">${(data.borrowedAmount * 1).toFixed(2)}</Typography>
          <Typography color="submerged" className="mt-1 text-sm">
            {data.borrowedAmount.toFixed(2)} {data.symbol}
          </Typography>
        </div>
        <div className="flex flex-col rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/20 to-primary/5 p-5 backdrop-blur-sm">
          <Typography color="submerged" className="mb-2 text-sm">
            Interest Rate
          </Typography>
          <Typography className="text-3xl font-bold text-primary">{data.interestRate.toFixed(2)}%</Typography>
          <Typography color="submerged" className="mt-1 text-sm">
            Variable Interest Rate
          </Typography>
        </div>
      </div>

      {/* Repay input */}
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <Typography className="text-lg font-medium">Repay Amount</Typography>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
            <Typography color="submerged" className="text-xs">
              Total Debt:
            </Typography>
            <Typography className="text-sm font-medium text-primary">
              {data.borrowedAmount.toFixed(2)} {data.symbol}
            </Typography>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          {/* Subtle gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

          <div className="relative flex items-center justify-between">
            <div className="flex flex-1 flex-col gap-1">
              <Input
                value={repayAmount}
                onChange={handleAmountChange}
                className="h-auto w-full border-none bg-transparent p-0 !text-3xl font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="0.00"
              />
              <Typography color="submerged" className="text-sm">
                ${(Number(repayAmount) * 1).toFixed(2)}
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
            variant={repayPercent === percent ? "third" : "outline"}
            size="sm"
            className={`h-10 w-full border-white/20 text-sm font-medium ${repayPercent === percent ? "shadow-md shadow-primary/20" : "hover:bg-white/10"}`}
            onClick={() => handlePercentChange(percent)}
          >
            {percent}%
          </Button>
        ))}
      </div>

      {/* Repay button */}
      <Button
        disabled={isRepayPending || !Number(repayAmount) || Number(repayAmount) > data.borrowedAmount}
        onClick={handleRepay}
        className="mt-4 h-14 w-full bg-gradient-to-r from-primary to-primary/80 text-base font-medium uppercase hover:from-primary/90 hover:to-primary/70"
        ripple={true}
      >
        {isRepayPending ? "Repaying..." : "Repay"}
      </Button>
    </div>
  );
}
