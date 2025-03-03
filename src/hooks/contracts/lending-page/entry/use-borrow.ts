import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useTransaction } from "@/clients/wrappers/transaction-provider";
import { AccountAddress } from "@aptos-labs/ts-sdk";
import { BigNumber } from "ethers";

interface BorrowParams {
  asset: AccountAddress;
  amount: string;
  decimals: number;
  interestRateMode: number;
  referralCode: number;
  onBehalfOf: AccountAddress;
  onClose?: () => void;
}

export function useBorrow() {
  const queryClient = useQueryClient();
  const { entryService, signAndSubmitTx } = useTransaction();

  return useMutation({
    mutationFn: async ({
      asset,
      amount,
      decimals,
      interestRateMode,
      referralCode,
      onBehalfOf,
      onClose,
    }: BorrowParams) => {
      console.log("asset", asset);
      console.log("amount", amount);
      console.log("decimals", decimals);
      console.log("interestRateMode", interestRateMode);
      console.log("referralCode", referralCode);
      console.log("onBehalfOf", onBehalfOf.toString());

      const amountInWei = BigNumber.from(Math.floor(Number(amount) * Math.pow(10, decimals)).toString());

      await signAndSubmitTx(
        entryService.getPool().getBorrowPayload(asset, amountInWei, interestRateMode, referralCode, onBehalfOf),
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
