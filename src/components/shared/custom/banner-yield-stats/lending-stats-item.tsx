import { Typography } from "@/components/shared/ui/typography";
import PairToken from "@/components/shared/custom/pair-token";
import { Button } from "@/components/shared/ui/button";
import { useRouter } from "next/navigation";
import { LendingStat } from "@/store/types/banner.type";
import { TokenIcon } from "../token-icon";
import { capitalize } from "@/libs/utils/string";
import CountUp from "react-countup";
import { useMobile } from "@/hooks/shared/use-mobile";
import { useBoundStore } from "@/store";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export default function LendingStatsItem({ apy, platform, tokens }: LendingStat) {
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
  return (
    <div className="fcenter group relative h-[60px] overflow-hidden rounded-lg border border-ring bg-secondary px-4 transition-colors hover:bg-primary/40">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="shrink-0">
          <PairToken symbols={[tokens[0], tokens[1]]} size={isMobile ? 36 : 30} intersectSize={5} />
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:gap-3">
          <div className="flex-1 transition-all duration-300 group-hover:md:invisible group-hover:md:opacity-0">
            <Typography className="text-base md:text-base">
              {tokens[0].toUpperCase()}-{tokens[1].toUpperCase()}
            </Typography>

            <div className="frow-icenter gap-2 self-start rounded-full bg-muted/60 px-2 py-[2px] max-md:hidden">
              <TokenIcon symbol={platform} size={12} isPlatform={true} />
              <Typography size="sm">{capitalize(platform)}</Typography>
            </div>
          </div>

          <div className="relative flex items-center">
            <div className="relative transition-all duration-300 group-hover:md:-translate-x-[calc(90px)]">
              <Typography color="primary" className="text-xl md:text-base">
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

            <div className="absolute left-4 hidden opacity-0 transition-all duration-300 group-hover:opacity-100 md:block">
              <Button
                size="sm"
                className="whitespace-nowrap px-6"
                onClick={handleFarm}
              >
                Farm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
