import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { AccountAddress } from "@aptos-labs/ts-sdk";
import { useTransaction } from "@/clients/wrappers/transaction-provider";
import { pickUIPostionReserveData } from "@/clients/types/view/pool/position";
import { useBoundStore } from "@/store";

export const usePositionReserves = () => {
  const { connected, account } = useWallet();
  const { viewService } = useTransaction();
  const updatePositionData = useBoundStore((state) => state.updatePositionData);

  const fetchPositionsData = async () => {
    if (!connected || !account) return [];
    const positionData = await viewService
      .getPool()
      .getPositionData(AccountAddress.fromString(account!.address), [...pickUIPostionReserveData]);
    updatePositionData(positionData);
    return positionData;
  };

  return useQuery({
    queryKey: ["positions-data"],
    queryFn: fetchPositionsData,
    enabled: !!connected && !!account,
  });
};
