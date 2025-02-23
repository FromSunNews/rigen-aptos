"use client";

import { Button } from "@/components/shared/ui/button";
import { TokenOption } from "@/components/features/pool-table/types";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useBoundStore } from "@/store";
import { cn } from "@/libs/utils/taildwind";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { FarmingPoolUI } from "@/store/types/farming-pool.type";

// Farm Button
export const FarmButton = ({
  row,
  selectedToken,
  className,
}: {
  row: Row<FarmingPoolUI>;
  selectedToken: TokenOption;
  className?: string;
}) => {
  const { connected } = useWallet();
  const router = useRouter();
  const pool = row.original;
  const { openWalletModal } = useBoundStore();
  // const { setPoolSelected } = useFarmingPoolSelector();
  const setPoolSelected = useBoundStore((state) => state.farmingDetailState.setPoolSelected);

  const handleFarmClick = () => {
    if (!connected) {
      openWalletModal();
      return;
    }

    // save pool selected to store
    setPoolSelected(pool);

    // redirect to detail page
    const url = `/farming-detail/open-position/${pool.pairTokens[0].toLowerCase()}-${pool.pairTokens[1].toLowerCase()}`;
    router.push(url);
  };

  return (
    <Button variant="secondary" className={cn("px-6 py-2", className)} animationHover={true} onClick={handleFarmClick}>
      Farm
    </Button>
  );
};
