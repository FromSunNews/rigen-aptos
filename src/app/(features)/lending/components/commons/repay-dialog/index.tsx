"use client";

import { Button } from "@/components/shared/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/shared/ui/dialog";
import React from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { TokenIcon } from "@/components/shared/custom/token-icon";
import { Input } from "@/components/shared/ui/input";
import { Typography } from "@/components/shared/ui/typography";
import { AccountAddress } from "@aptos-labs/ts-sdk";
import { useBoundStore } from "@/store";
import { useRepay } from "@/hooks/contracts/lending-page/entry/use-repay";

interface RepayDialogProps {
  tokenInfo: {
    symbol: string;
    tokenAddress: AccountAddress;
    decimals: number;
    borrowedAmount: number;
    interestRate: number;
  };
}

function RepayContent({ tokenInfo, onClose }: { tokenInfo: RepayDialogProps["tokenInfo"]; onClose: () => void }) {
  const { account } = useWallet();

  const [repayAmount, setRepayAmount] = React.useState<string>(
    (tokenInfo.borrowedAmount * 0.25).toFixed(tokenInfo.decimals)
  );
  const [repayPercent, setRepayPercent] = React.useState<number>(25);
  const { mutate: repayMutation, isPending: isRepayPending } = useRepay();

  const handlePercentChange = (percent: number) => {
    setRepayPercent(percent);
    const amount = (tokenInfo.borrowedAmount * percent) / 100;
    setRepayAmount(amount.toFixed(tokenInfo.decimals));
  };

  const handleMaxClick = () => {
    setRepayPercent(100);
    setRepayAmount(tokenInfo.borrowedAmount.toFixed(tokenInfo.decimals));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRepayAmount(value);
    const percent = (Number(value) / tokenInfo.borrowedAmount) * 100;
    setRepayPercent(Math.min(100, Math.round(percent)));
  };

  const handleRepay = () => {
    repayMutation({
      asset: tokenInfo.tokenAddress,
      amount: repayAmount,
      decimals: tokenInfo.decimals,
      interestRateMode: 2, // Variable rate
      onBehalfOf: AccountAddress.fromString(account?.address || "0x0"),
      onClose: onClose,
    });
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header with token info */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 shadow-lg shadow-primary/10 backdrop-blur-sm">
            <TokenIcon symbol={tokenInfo.symbol} size={48} className="rounded-full" />
          </div>
          <div>
            <Typography variant="h2" className="text-3xl font-bold">
              {tokenInfo.symbol}
            </Typography>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col space-y-8">
        {/* Loan info */}
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <Typography color="submerged" className="mb-2 text-sm">
              Your Debt
            </Typography>
            <Typography className="text-3xl font-bold">${(tokenInfo.borrowedAmount * 1).toFixed(2)}</Typography>
            <Typography color="submerged" className="mt-1 text-sm">
              {tokenInfo.borrowedAmount.toFixed(2)} {tokenInfo.symbol}
            </Typography>
          </div>
          <div className="flex flex-col rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/20 to-primary/5 p-5 backdrop-blur-sm">
            <Typography color="submerged" className="mb-2 text-sm">
              Interest Rate
            </Typography>
            <Typography className="text-3xl font-bold text-primary">{tokenInfo.interestRate.toFixed(2)}%</Typography>
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
                {tokenInfo.borrowedAmount.toFixed(2)} {tokenInfo.symbol}
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
                <Typography className="text-xl font-medium">{tokenInfo.symbol}</Typography>
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
          disabled={isRepayPending || !Number(repayAmount)}
          onClick={handleRepay}
          className="mt-4 h-14 w-full bg-gradient-to-r from-primary to-primary/80 text-base font-medium uppercase hover:from-primary/90 hover:to-primary/70"
          ripple={true}
        >
          {isRepayPending ? "Repaying..." : "Repay"}
        </Button>
      </div>
    </div>
  );
}

export default function RepayDialog({ tokenInfo }: RepayDialogProps) {
  const { connected } = useWallet();
  const [open, setOpen] = React.useState<boolean>(false);
  const { openWalletModal } = useBoundStore();

  const handleOpenChange = (isOpen: boolean) => {
    if (!connected && isOpen) {
      openWalletModal();
      return;
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="!h-[48px] w-full" ripple={true} variant="outline">
          <Typography variant="h2" className="text-base font-bold uppercase">
            Repay
          </Typography>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="border-white/10 bg-gradient-to-b from-[#111827]/95 to-[#0F172A]/95 p-8 sm:max-w-[580px] dark:from-[#111827]/95 dark:to-[#0F172A]/95"
        title={`Repay ${tokenInfo.symbol}`}
      >
        {open && <RepayContent tokenInfo={tokenInfo} onClose={() => setOpen(false)} />}
      </DialogContent>
    </Dialog>
  );
}
