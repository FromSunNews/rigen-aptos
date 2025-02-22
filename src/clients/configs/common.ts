import { MoveValue } from "@aptos-labs/ts-sdk";
import { BigNumber } from "ethers";

export function mapToBN(value: MoveValue): BigNumber {
  return BigNumber.from(value!.toString());
}

export function mapToNumberWithDecimals(value: MoveValue): number {
  return BigNumber.from(value!.toString()).formatToNumberWithDecimals();
}
