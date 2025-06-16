import React from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { AccountAddress } from "@aptos-labs/ts-sdk";
import { useTransaction } from "@/clients/wrappers/transaction-provider";
import { pickUILendingReserveData } from "@/clients/types/view/pool/lending";
import { useBoundStore } from "@/store";

export const useLendingReserves = () => {
  const { connected, account } = useWallet();
  const { viewService } = useTransaction();
  const reserves = useBoundStore((state) => state.reserves);
  const updateReservesWithBalance = useBoundStore((state) => state.updateReservesWithBalance);
  const updateReserves = useBoundStore((state) => state.updateReserves);

  React.useEffect(() => {
    if (connected && account?.address && reserves?.length > 0) {
      callReserveDataLendingWithBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, account, reserves]);

  const callReserveDataLendingWithBalance = async () => {
    const reservesWithBalance = await viewService
      .getPool()
      .getReserveDataLendingWithBalance(AccountAddress.fromString(account!.address), reserves);
    console.log("reservesWithBalance", reservesWithBalance);
    updateReservesWithBalance(reservesWithBalance);
  };

  const fetchReservesData = async () => {
    const reservesData = await viewService.getPool().getLendingData(
      // create clone of pickUILendingReserveData and don't use pickUILendingReserveData directly
      // cuz it's a const and we can't mutate it
      [...pickUILendingReserveData]
    );

    updateReserves(reservesData as any);
    return reservesData;
  };

  return useQuery({
    queryKey: ["reserves-data", connected, account?.address],
    queryFn: fetchReservesData,
    enabled: true,
  });
};
