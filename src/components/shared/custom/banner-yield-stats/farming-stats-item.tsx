import { Typography } from "@/components/shared/ui/typography";
import { useMobile } from "@/hooks/shared/use-mobile";
import { Button } from "@/components/shared/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { FarmingStat } from "@/store/types/banner.type";
import { TokenIcon } from "../token-icon";
import CountUp from "react-countup";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useBoundStore } from "@/store";

export default function FarmingStatsItem({ apy, balance, symbol }: FarmingStat) {
  const isMobile = useMobile();
  const navigate = useRouter();
  const { connected } = useWallet();
  const {openWalletModal} = useBoundStore();
  
  const handleFarm = () => {
    if (!connected) {
      openWalletModal();
      return;
    }

    navigate.push("/farming-detail");
  };

  if (isMobile) {
    return (
      <div className="group relative overflow-hidden rounded-lg border border-primary/20 bg-secondary px-4 py-3">
        <div className="flex w-fit items-center gap-3">
          <div className="shrink-0">
            <TokenIcon symbol={symbol} size={36} />
          </div>

          <div className="fcol-jcenter">
            <Typography className="text-base">{symbol.toUpperCase()}</Typography>
            <Typography color="primary" className="text-xl">
              <CountUp
                end={Number(apy)}
                decimals={2}
                duration={2}
                suffix="% APY"
                enableScrollSpy
                preserveValue={true}
              />
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border border-primary/20 bg-secondary p-2 hover:bg-primary/40">
      <div className="frow-center">
        <div className="w-[36px]">
          <TokenIcon symbol={symbol} size={36} />
        </div>

        <div className="mx-2 flex-1 border-r border-third-foreground/60 pr-2 transition-all duration-300 group-hover:invisible group-hover:opacity-0">
          <Typography variant="small">{symbol.toUpperCase()}</Typography>
          <Typography className="text-base font-medium text-primary">
            <CountUp end={Number(apy)} decimals={2} duration={2} suffix="% APY" enableScrollSpy preserveValue={true} />
          </Typography>
        </div>

        <div className="relative flex shrink-0 items-center">
          <div className="fcol ps-2 transition-all duration-300 group-hover:-translate-x-[calc(100px)]">
            <Typography variant="small">Balance</Typography>
            <Typography color="primary">
              <CountUp end={Number(balance)} decimals={2} duration={2} preserveValue={true} />
            </Typography>
          </div>
          <div className="absolute right-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <Button size="sm" className="whitespace-nowrap px-6" onClick={handleFarm}>
              Farm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
