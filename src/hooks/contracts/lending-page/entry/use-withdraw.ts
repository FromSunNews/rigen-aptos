import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useTransaction } from "@/clients/wrappers/transaction-provider";
import { AccountAddress } from "@aptos-labs/ts-sdk";

interface WithdrawParams {
  asset: AccountAddress;
  amount: string;
  decimals: number;
  address: AccountAddress;
  onClose?: () => void;
}

export function useWithdraw() {
  const queryClient = useQueryClient();
  const { entryService, signAndSubmitTx } = useTransaction();
  return useMutation({
    mutationFn: async ({ asset, amount, decimals, address, onClose }: WithdrawParams) => {
      const amountInWei = Number(amount) * Math.pow(10, decimals);
      await signAndSubmitTx(entryService.getPool().getWithdrawPayload(asset, amountInWei.toString(), address), {
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
      });
    },
  });
}
