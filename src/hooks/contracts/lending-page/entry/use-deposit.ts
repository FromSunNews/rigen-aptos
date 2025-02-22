import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useTransaction } from "@/clients/wrappers/transaction-provider";
import { AccountAddress } from "@aptos-labs/ts-sdk";

interface DepositParams {
  asset: AccountAddress;
  amount: string;
  decimals: number;
  address: AccountAddress;
  referralCode: number;
  onClose?: () => void;
}

export function useDeposit() {
  const queryClient = useQueryClient();
  const { entryService, signAndSubmitTx } = useTransaction();

  return useMutation({
    mutationFn: async ({ asset, amount, decimals, address, referralCode, onClose }: DepositParams) => {
      console.log("asset", asset);
      console.log("amount", amount);
      console.log("decimals", decimals);
      console.log("address", address.toString());
      console.log("referralCode", referralCode);
      const amountInWei = Number(amount) * Math.pow(10, decimals);
      await signAndSubmitTx(
        entryService.getPool().getSupplyPayload(asset, amountInWei.toString(), address, referralCode),
        {
          onSuccess: (_) => {
            queryClient.invalidateQueries({
              predicate: (query) => {
                const queryKey = query.queryKey[0];
                return ["positions-data", "reserves-data"].includes(queryKey as string);
              },
            });
          },
          onFinally: () => {
            onClose?.();
          },
        }
      );
    },
  });
}
