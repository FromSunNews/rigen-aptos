"use client";

import { Button } from "@/components/shared/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shared/ui/dialog";
import { Row } from "@tanstack/react-table";
import React from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { TokenIcon } from "@/components/shared/custom/token-icon";
import { Input } from "@/components/shared/ui/input";
import { Typography } from "@/components/shared/ui/typography";
import { AccountAddress } from "@aptos-labs/ts-sdk";
import { useBoundStore } from "@/store";

import { UILendingReserveData } from "@/clients/types/view/pool/lending";
import { useDeposit } from "@/hooks/contracts/lending-page/entry/use-deposit";

function DepositContent({ row, onClose }: { row: Row<UILendingReserveData>; onClose: () => void }) {
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
    // const amount = Math.floor(data.availableAmount * percent / 100);
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
    <>
      <DialogHeader>
        <DialogTitle>
          <div className="ml-0 text-base font-semibold md:ml-6">Deposit {data.symbol}</div>
        </DialogTitle>
      </DialogHeader>

      {/* body */}
      <div className="fcol gap-4 pb-4 pt-10">
        <div className="fcol gap-2">
          <div className="self-end">Available: {data.availableAmount.toFixed(2)}</div>
          <div className="frow-icenter gap-4 rounded-3xl border p-4">
            <TokenIcon symbol={data.symbol} size={36} />
            <div className="frow-between f1 items-center">
              <div className="fcol f1 gap-1">
                <Input
                  type="number"
                  value={depositAmount}
                  onChange={handleAmountChange}
                  className="h-auto w-36 border py-1 text-base"
                  placeholder="0.00"
                />
                <div className="text-sm text-muted-foreground">${data.walletBalance}</div>
              </div>

              <div className="fcol gap-1 text-end">
                <div className="frow justify-end">
                  <Typography className="text-end">{data.symbol}</Typography>
                </div>
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

        <div className="frow-between items-center rounded-full bg-secondary px-4 py-2">
          <p className="text-sm text-primary">APY</p>
          <p className="text-lg text-primary">{data.apy}%</p>
        </div>

        <Button disabled={isDepositPending} onClick={handleDeposit} className="py-5 text-base">
          {isDepositPending ? "Depositing..." : `Deposit ${data.symbol}`}
        </Button>
      </div>
    </>
  );
}

export default function DepositDialog({ row }: { row: Row<UILendingReserveData> }) {
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
        <Button variant="secondary" animationHover={true}>
          Deposit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[465px]">
        {open && <DepositContent row={row} onClose={() => setOpen(false)} />}
      </DialogContent>
    </Dialog>
  );
}
