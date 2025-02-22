"use client";

import { Typography } from "@/components/shared/ui/typography";
import { Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import PairToken from "@/components/shared/custom/pair-token";
import { Badge } from "@/components/shared/ui/badge";
import { TokenIcon } from "@/components/shared/custom/token-icon";
import { RocketIcon } from "lucide-react";
import { capitalize } from "@/libs/utils/string";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useMobile } from "@/hooks/shared/use-mobile";
import { abbreviateNumberToString } from "@/libs/utils/number";
import { FarmingPoolUI } from "@/store/types/farming-pool.type";

const CountUp = dynamic(() => import("react-countup"), {
  ssr: false,
});

const getRandomChange = () => {
  return Math.random() * 0.02 - 0.01; // Random -1% to +1%
};

export const TvlSection = ({ row }: { row: Row<FarmingPoolUI> }) => {
  const pool = row.original;
  // const [previousTvl, setPreviousTvl] = useState(pool.tvl);
  // const [tvl, setTvl] = useState(pool.tvl);
  const isMobile = useMobile();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const change = getRandomChange();
  //     setTvl((currentTvl) => {
  //       const newTvl = currentTvl * (1 + change);
  //       setPreviousTvl(currentTvl);
  //       return newTvl;
  //     });
  //   }, 3000);

  //   return () => clearInterval(intervalId);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="frow">
      <div className="frow relative gap-4 self-start">
        {/* Hand up and down icon animation */}
        {pool.boosted && !isMobile && (
          <>
            <Image
              src="/images/hand/hand.gif"
              alt="boosted"
              width={40}
              height={40}
              className="absolute -bottom-7 -left-5 z-50"
            />
            <Image
              src="/images/hand/hand.gif"
              alt="boosted"
              width={40}
              height={40}
              className="absolute -right-8 -top-7 z-50 rotate-180"
            />
          </>
        )}
        {/* Token Pair */}
        <PairToken symbols={pool.pairTokens} size={isMobile ? 30 : 36} intersectSize={5} />

        {/* Token Info */}
        <div className="fcol gap-0.5">
          <Typography variant="h5" color={pool.boosted ? "boosted" : "embossed"}>
            {pool.pairTokens[0].toUpperCase()}-{pool.pairTokens[1].toUpperCase()}
          </Typography>

          <div className="frow-icenter gap-1">
            <Typography variant="small">TVL:</Typography>
            <Typography variant="small" className="text-submerged">
              {isMobile ? (
                <CountUp
                  end={pool.tvl}
                  prefix="$"
                  decimals={2}
                  duration={2}
                  preserveValue={true}
                  formattingFn={(value) => abbreviateNumberToString(value)}
                />
              ) : (
                <CountUp end={pool.tvl} prefix="$" decimals={2} duration={2} preserveValue={true} />
              )}
            </Typography>
          </div>

          {/* Tags */}
          <div className="frow w-auto gap-1">
            {/* Platform Tag */}
            <Badge variant="third" className="frow-center h-[24px] w-auto gap-1.5">
              {/* <div className="frow-icenter gap-1"> */}
              <div className="frow-center h-[12px] w-[12px]">
                <TokenIcon symbol={pool.platform} size={12} isPlatform={true} />
              </div>
              {/* </div> */}
              <Typography as="small" className="mt-[1px] text-sm">
                {capitalize(pool.platform)}
              </Typography>
            </Badge>

            {/* Boosted Tag */}
            {pool.boosted && !isMobile && (
              <Badge variant="boosted" className="frow-center h-[24px] w-auto gap-1">
                <RocketIcon className="h-3.5 w-3.5" />
                <Typography as="small" className="mt-[1px] text-sm">
                  Boosted
                </Typography>
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
