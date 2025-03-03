import { InputTransactionData } from "@aptos-labs/wallet-adapter-core";
import { AptosBaseService } from "@/clients/services/base";
import { AccountAddress } from "@aptos-labs/ts-sdk";
import { BigNumber } from "ethers";

export class PoolService extends AptosBaseService {
  public getSupplyPayload(
    asset: AccountAddress,
    amount: string,
    userAddress: AccountAddress,
    referralCode: number
  ): InputTransactionData {
    return {
      data: {
        function: "0xba481cd218c2aa9454b7746731f6f976e58767b363458513c7447f76673565f1::supply_logic::supply",
        typeArguments: [],
        functionArguments: [asset, amount, userAddress, referralCode],
      },
    };
  }

  public getWithdrawPayload(asset: AccountAddress, amount: string, userAddress: AccountAddress): InputTransactionData {
    return {
      data: {
        function: "0xba481cd218c2aa9454b7746731f6f976e58767b363458513c7447f76673565f1::supply_logic::withdraw",
        typeArguments: [],
        functionArguments: [asset, amount, userAddress],
      },
    };
  }

  // public getBorrowPayload(
  //   asset: AccountAddress,
  //   amount: string,
  //   userAddress: AccountAddress,
  //   referralCode: number
  // ): InputTransactionData {
  //   return {
  //     data: {
  //       function: "0xba481cd218c2aa9454b7746731f6f976e58767b363458513c7447f76673565f1::supply_logic::borrow",
  //     },
  //   };
  // }

  /// User borrows
  public getBorrowPayload(
    asset: AccountAddress,
    amount: BigNumber,
    interestRateMode: number,
    referralCode: number,
    onBehalfOf: AccountAddress
  ): InputTransactionData {
    return {
      data: {
        function: "0xba481cd218c2aa9454b7746731f6f976e58767b363458513c7447f76673565f1::borrow_logic::borrow",
        typeArguments: [],
        functionArguments: [asset, amount.toString(), interestRateMode, referralCode, onBehalfOf],
      },
    };
  }

  /// User repays
  public getRepayPayload(
    asset: AccountAddress,
    amount: BigNumber,
    interestRateMode: number,
    onBehalfOf: AccountAddress
  ): InputTransactionData {
    return {
      data: {
        function: "0xba481cd218c2aa9454b7746731f6f976e58767b363458513c7447f76673565f1::borrow_logic::repay",
        typeArguments: [],
        functionArguments: [asset, amount.toString(), interestRateMode, onBehalfOf],
      },
    };
  }
}
