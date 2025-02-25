import { Typography } from "@/components/shared/ui/typography";
import { TokenIcon } from "@/components/shared/custom/token-icon";
import { Dialog, DialogContent, DialogTrigger } from "@/components/shared/ui/dialog";
import { useState } from "react";
import { AccountAddress } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { useDeposit } from "@/hooks/contracts/lending-page/entry/use-deposit";
import { useWithdraw } from "@/hooks/contracts/lending-page/entry/use-withdraw";
import { useTokenPrice } from "@/hooks/apis/use-token-price";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/shared/ui/tabs";

interface TokenInfo {
  symbol: string;
  amount: number;
  usdValue: number;
  imageUrl?: string;
  priceChangePercent: number;
  tokenAddress: string;
  decimals: number;
}

interface PositionStats {
  totalEarnings: {
    amount: number;
    usdValue: number;
  };
  netApr: number;
  depositDate: {
    date: string;
    daysAgo: number;
  };
  healthFactor: number;
  availableAmount: number;
}

interface LendingPositionCardProps {
  tokenInfo: TokenInfo;
  stats: PositionStats;
}

function PositionDialogContent({
  tokenInfo,
  stats,
  activeTab,
  setActiveTab,
  onClose,
}: {
  tokenInfo: TokenInfo;
  stats: PositionStats;
  activeTab: "deposit" | "withdraw";
  setActiveTab: (tab: "deposit" | "withdraw") => void;
  onClose: () => void;
}) {
  const { account } = useWallet();
  const { data: tokenPrice = 1 } = useTokenPrice(tokenInfo.symbol);

  // Deposit state and handlers
  const [depositAmount, setDepositAmount] = useState<string>(
    ((stats.availableAmount * 25) / 100).toFixed(tokenInfo.decimals)
  );
  const [depositPercent, setDepositPercent] = useState<number>(25);
  const { mutate: depositMutation, isPending: isDepositPending } = useDeposit();

  // Withdraw state and handlers
  const [withdrawAmount, setWithdrawAmount] = useState<number>(tokenInfo.amount * 0.25);
  const [withdrawPercent, setWithdrawPercent] = useState<number>(25);
  const { mutate: withdrawMutation, isPending: isWithdrawPending } = useWithdraw();

  // Deposit handlers
  const handleDepositPercentChange = (percent: number) => {
    setDepositPercent(percent);
    const amount = (stats.availableAmount * percent) / 100;
    setDepositAmount(amount.toFixed(tokenInfo.decimals));
  };

  const handleDepositMaxClick = () => {
    setDepositPercent(100);
    const amount = stats.availableAmount;
    setDepositAmount(amount.toFixed(tokenInfo.decimals));
  };

  const handleDepositAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDepositAmount(value);
    const percent = (Number(value) / stats.availableAmount) * 100;
    setDepositPercent(Math.min(100, Math.round(percent)));
  };

  const handleDeposit = () => {
    depositMutation({
      asset: AccountAddress.fromString(tokenInfo.tokenAddress),
      amount: depositAmount,
      decimals: tokenInfo.decimals,
      address: AccountAddress.fromString(account?.address || "0x0"),
      referralCode: 0,
      onClose: onClose,
    });
  };

  // Withdraw handlers
  const handleWithdrawPercentChange = (percent: number) => {
    setWithdrawPercent(percent);
    const amount = (tokenInfo.amount * percent) / 100;
    setWithdrawAmount(amount);
  };

  const handleWithdrawMaxClick = () => {
    setWithdrawPercent(100);
    setWithdrawAmount(tokenInfo.amount);
  };

  const handleWithdrawAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) {
      setWithdrawAmount(0);
      setWithdrawPercent(0);
      return;
    }
    setWithdrawAmount(value);
    const percent = (value / tokenInfo.amount) * 100;
    setWithdrawPercent(Math.min(100, Math.round(percent)));
  };

  const handleWithdraw = () => {
    withdrawMutation({
      asset: AccountAddress.fromString(tokenInfo.tokenAddress),
      amount: withdrawAmount.toString(),
      decimals: tokenInfo.decimals,
      address: AccountAddress.fromString(account?.address || "0x0"),
      onClose: onClose,
    });
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header with token info and tabs */}
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

        {/* Tabs - replaced with Tabs component */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "deposit" | "withdraw")}>
          <TabsList className="border border-white/10 bg-white/5">
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main content */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "deposit" | "withdraw")}>
        <TabsContent value="deposit" className="mt-0">
          <div className="flex flex-1 flex-col space-y-8">
            {/* Asset info */}
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <Typography color="submerged" className="mb-2 text-sm">
                  Your Assets
                </Typography>
                <Typography className="text-3xl font-bold">
                  ${(stats.availableAmount * tokenPrice).toFixed(2)}
                </Typography>
                <Typography color="submerged" className="mt-1 text-sm">
                  {stats.availableAmount.toFixed(2)} {tokenInfo.symbol}
                </Typography>
              </div>
              <div className="flex flex-col rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/20 to-primary/5 p-5 backdrop-blur-sm">
                <Typography color="submerged" className="mb-2 text-sm">
                  APR
                </Typography>
                <Typography className="text-3xl font-bold text-primary">{stats.netApr.toFixed(2)}%</Typography>
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
                    {stats.availableAmount.toFixed(2)} {tokenInfo.symbol}
                  </Typography>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                {/* Subtle gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

                <div className="relative flex items-center justify-between">
                  <div className="flex flex-1 flex-col gap-1">
                    <Input
                      type="number"
                      value={depositAmount}
                      onChange={handleDepositAmountChange}
                      className="h-auto w-full border-none bg-transparent p-0 text-3xl font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="0.00"
                    />
                    <Typography color="submerged" className="text-sm">
                      ${(Number(depositAmount) * tokenPrice).toFixed(2)}
                    </Typography>
                  </div>

                  <div className="flex items-center gap-3">
                    <Typography className="text-xl font-medium">{tokenInfo.symbol}</Typography>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-lg border-white/20 px-4 py-0 text-xs font-medium hover:bg-white/10"
                      onClick={handleDepositMaxClick}
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
                  onClick={() => handleDepositPercentChange(percent)}
                >
                  {percent}%
                </Button>
              ))}
            </div>

            {/* Pool info */}
            <div className="mt-4 grid grid-cols-2 gap-6">
              <div className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <Typography color="submerged" className="mb-1 text-sm">
                  Current Position
                </Typography>
                <Typography className="text-xl font-medium">${(tokenInfo.amount * tokenPrice).toFixed(2)}</Typography>
                <Typography color="submerged" className="mt-1 text-xs">
                  {tokenInfo.amount.toFixed(2)} {tokenInfo.symbol}
                </Typography>
              </div>
              <div className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <Typography color="submerged" className="mb-1 text-sm">
                  Total Earnings
                </Typography>
                <Typography className="text-xl font-medium">${stats.totalEarnings.usdValue.toFixed(2)}</Typography>
                <Typography color="submerged" className="mt-1 text-xs">
                  {stats.totalEarnings.amount.toFixed(2)} {tokenInfo.symbol}
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
        </TabsContent>

        <TabsContent value="withdraw" className="mt-0">
          <div className="flex flex-1 flex-col space-y-8">
            {/* Asset info */}
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <Typography color="submerged" className="mb-2 text-sm">
                  Your Position
                </Typography>
                <Typography className="text-3xl font-bold">${(tokenInfo.amount * tokenPrice).toFixed(2)}</Typography>
                <Typography color="submerged" className="mt-1 text-sm">
                  {tokenInfo.amount.toFixed(2)} {tokenInfo.symbol}
                </Typography>
              </div>
              <div className="flex flex-col rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/20 to-primary/5 p-5 backdrop-blur-sm">
                <Typography color="submerged" className="mb-2 text-sm">
                  APR
                </Typography>
                <Typography className="text-3xl font-bold text-primary">{stats.netApr.toFixed(2)}%</Typography>
                <Typography color="submerged" className="mt-1 text-sm">
                  Annual Percentage Rate
                </Typography>
              </div>
            </div>

            {/* Withdraw input */}
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <Typography className="text-lg font-medium">Withdraw</Typography>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
                  <Typography color="submerged" className="text-xs">
                    Available:
                  </Typography>
                  <Typography className="text-sm font-medium text-primary">
                    {tokenInfo.amount.toFixed(2)} {tokenInfo.symbol}
                  </Typography>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                {/* Subtle gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

                <div className="relative flex items-center justify-between">
                  <div className="flex flex-1 flex-col gap-1">
                    <Input
                      type="number"
                      value={withdrawAmount}
                      onChange={handleWithdrawAmountChange}
                      className="h-auto w-full border-none bg-transparent p-0 text-3xl font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="0.00"
                    />
                    <Typography color="submerged" className="text-sm">
                      ${(withdrawAmount * tokenPrice).toFixed(2)}
                    </Typography>
                  </div>

                  <div className="flex items-center gap-3">
                    <Typography className="text-xl font-medium">{tokenInfo.symbol}</Typography>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-lg border-white/20 px-4 py-0 text-xs font-medium hover:bg-white/10"
                      onClick={handleWithdrawMaxClick}
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
                  variant={withdrawPercent === percent ? "third" : "outline"}
                  size="sm"
                  className={`h-10 w-full border-white/20 text-sm font-medium ${withdrawPercent === percent ? "shadow-md shadow-primary/20" : "hover:bg-white/10"}`}
                  onClick={() => handleWithdrawPercentChange(percent)}
                >
                  {percent}%
                </Button>
              ))}
            </div>

            {/* Earnings info */}
            <div className="mt-4 grid grid-cols-2 gap-6">
              <div className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <Typography color="submerged" className="mb-1 text-sm">
                  Total Earnings
                </Typography>
                <Typography className="text-xl font-medium">${stats.totalEarnings.usdValue.toFixed(2)}</Typography>
                <Typography color="submerged" className="mt-1 text-xs">
                  {stats.totalEarnings.amount.toFixed(2)} {tokenInfo.symbol}
                </Typography>
              </div>
              <div className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <Typography color="submerged" className="mb-1 text-sm">
                  Health Factor
                </Typography>
                <Typography className="text-xl font-medium text-green-400">{stats.healthFactor.toFixed(2)}</Typography>
                <Typography color="submerged" className="mt-1 text-xs">
                  Safe &gt; 1.0
                </Typography>
              </div>
            </div>

            {/* Withdraw button */}
            <Button
              disabled={isWithdrawPending || withdrawAmount <= 0 || withdrawAmount > tokenInfo.amount}
              onClick={handleWithdraw}
              className="mt-4 h-14 w-full bg-gradient-to-r from-primary to-primary/80 text-base font-medium uppercase hover:from-primary/90 hover:to-primary/70"
              ripple={true}
            >
              {isWithdrawPending ? "Withdrawing..." : "Withdraw"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function LendingPositionCard({ tokenInfo, stats }: LendingPositionCardProps) {
  const { account } = useWallet();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");

  const handleOpenDeposit = () => {
    setActiveTab("deposit");
    setDialogOpen(true);
  };

  const handleOpenWithdraw = () => {
    setActiveTab("withdraw");
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="group relative w-full">
      <div className="relative h-auto overflow-hidden rounded-[32px] transition-transform duration-300 ease-in-out group-hover:scale-[1.02]">
        {/* Base Background Layer */}
        <div className="absolute inset-0">
          {/* Primary background with blur */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                      linear-gradient(
                        165deg,
                        rgba(29, 46, 64, 0.6) 0%,
                        rgba(29, 46, 64, 0.4) 50%,
                        rgba(29, 46, 64, 0.2) 100%
                      )
                    `,
              backdropFilter: "blur(20px)",
            }}
          />

          {/* Radial highlight at corner */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                      radial-gradient(
                        circle at 0 0,
                        rgba(82, 174, 255, 0.8) 0%,
                        rgba(82, 174, 255, 0.3) 40%,
                        rgba(82, 174, 255, 0.1) 80%,
                        transparent 80%
                      )
                    `,
              opacity: "0.35",
            }}
          />

          {/* Subtle overlay gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                      linear-gradient(
                        to bottom,
                        transparent,
                        rgba(29, 46, 64, 0.3)
                      )
                    `,
            }}
          />
        </div>

        {/* Border Gradient */}
        <div
          className="absolute inset-0 rounded-[32px]"
          style={{
            background: `
                    linear-gradient(
                      145deg,
                      rgba(255, 255, 255, 0.4) 0%,
                      rgba(255, 255, 255, 0.1) 30%,
                      transparent 60%
                    )
                  `,
            maskImage: "linear-gradient(145deg, white 0%, transparent 60%)",
            WebkitMaskImage: "linear-gradient(145deg, white 0%, transparent 60%)",
            opacity: "0.5",
          }}
        />

        {/* Card Content */}
        <div className="relative flex flex-col space-y-8 p-8">
          {/* Token Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <TokenIcon symbol={tokenInfo.symbol} size={60} />
              <div>
                <Typography className="text-2xl font-bold">{tokenInfo.symbol}</Typography>
                <Typography className="text-lg font-bold text-green-400">{tokenInfo.amount}</Typography>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <Typography className={`text-sm ${tokenInfo.priceChangePercent > 0 ? "text-green-400" : "text-red-400"}`}>
                {tokenInfo.priceChangePercent > 0 ? "+" : ""}
                {tokenInfo.priceChangePercent}%
              </Typography>
              <Typography className="text-sm text-muted-foreground">24h change</Typography>
            </div>
          </div>

          {/* Enhanced Stats */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm">
                <Typography className="text-sm text-muted-foreground">Total Earnings</Typography>
                <Typography className="text-lg font-bold">
                  {stats.totalEarnings.amount} {tokenInfo.symbol}
                </Typography>
                <Typography className="text-sm text-green-400">≈ ${stats.totalEarnings.usdValue.toFixed(2)}</Typography>
              </div>
              <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm">
                <Typography className="text-sm text-muted-foreground">Net APR</Typography>
                <Typography className="text-lg font-bold">{stats.netApr}%</Typography>
                <Typography className="text-sm text-muted-foreground">Annual yield</Typography>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm">
                <Typography className="text-sm text-muted-foreground">Deposit Date</Typography>
                <Typography className="text-lg font-bold">{stats.depositDate.date}</Typography>
                <Typography className="text-sm text-muted-foreground">{stats.depositDate.daysAgo} days ago</Typography>
              </div>
              <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm">
                <Typography className="text-sm text-muted-foreground">Health Factor</Typography>
                <Typography className="text-lg font-bold text-green-400">{stats.healthFactor}</Typography>
                <Typography className="text-sm text-muted-foreground">Safe &gt; 1.0</Typography>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <button
                  onClick={handleOpenDeposit}
                  className="flex-1 rounded-[24px] bg-[#52AEFF] py-4 font-bold uppercase tracking-wide transition-all hover:bg-[#52AEFF]/90"
                >
                  DEPOSIT MORE
                </button>
              </DialogTrigger>
              <DialogContent
                className="border-white/10 bg-gradient-to-b from-[#111827]/95 to-[#0F172A]/95 p-8 sm:max-w-[580px] dark:from-[#111827]/95 dark:to-[#0F172A]/95"
                title={`Edit ${tokenInfo.symbol}`}
              >
                {dialogOpen && (
                  <PositionDialogContent
                    tokenInfo={tokenInfo}
                    stats={stats}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onClose={handleCloseDialog}
                  />
                )}
              </DialogContent>
            </Dialog>

            <button
              onClick={handleOpenWithdraw}
              className="flex-1 rounded-[24px] border border-[#52AEFF] py-4 font-bold uppercase tracking-wide transition-all hover:bg-[#52AEFF]/10"
            >
              WITHDRAW
            </button>
          </div>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 z-[1] -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:animate-shine group-hover:opacity-100" />
      </div>
    </div>
  );
}
