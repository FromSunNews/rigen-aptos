import { AccountAddress } from "@aptos-labs/ts-sdk";
import { AptosBaseService } from "@/clients/services/base";
import {
  ATokenGetGetPreviousIndexFuncAddr,
  ATokenGetTokenAccountAddressFuncAddr,
  GetReserveConfigurationDataFuncAddr,
  GetReserveDataFuncAddr,
  GetReserveTokensAddressesFuncAddr,
  UiPoolDataProviderGetReservesListFuncAddr,
  UiPoolDataProviderGetUserReservesDataFuncAddr,
  UnderlyingBalanceOfFuncAddr,
  UnderlyingSymbolFuncAddr,
  VariableScaledTotalSupplyFuncAddr,
} from "@/clients/configs/move-functions";
import { BigNumber } from "ethers";
import { mapToBN, mapToNumberWithDecimals } from "@/clients/configs/common";
import "@/clients/helper/wadraymath";
import { filterFieldsObjectArray } from "@/libs/utils/function";
import { EntryLendingReserveData, UILendingReserveData } from "@/clients/types/view/pool/lending";
import { PositionReserveData, UIPostionReserveData } from "@/clients/types/view/pool/position";

export class PoolService extends AptosBaseService {
  public async getReserveDataLending(reserve: AccountAddress): Promise<EntryLendingReserveData> {
    const [
      unbacked,
      accruedToTreasuryScaled,
      ,
      totalVariableDebt,
      liquidityRate,
      variableBorrowRate,
      liquidityIndex,
      variableBorrowIndex,
      lastUpdateTimestamp,
    ] = await this.callViewMethod(GetReserveDataFuncAddr, [reserve]);

    const [decimals, , , , reserveFactor, , , ,] = await this.callViewMethod(GetReserveConfigurationDataFuncAddr, [
      reserve,
    ]);

    const [aToken, vToken] = await this.callViewMethod(GetReserveTokensAddressesFuncAddr, [reserve]);

    const [scaledVariableDebt] = await this.callViewMethod(VariableScaledTotalSupplyFuncAddr, [vToken!.toString()]);

    const [symbol] = await this.callViewMethod(UnderlyingSymbolFuncAddr, [reserve]);

    const [aTokenAccount] = await this.callViewMethod(ATokenGetTokenAccountAddressFuncAddr, [aToken!.toString()]);

    const [availableLiquidity] = await this.callViewMethod(UnderlyingBalanceOfFuncAddr, [
      aTokenAccount!.toString(),
      reserve,
    ]);

    const totalLiquidity = BigNumber.from(availableLiquidity).add(BigNumber.from(unbacked));

    const totalDebt = BigNumber.from(totalVariableDebt);

    const borrowUsageRatio = totalDebt.eq(0)
      ? BigNumber.from(0)
      : totalDebt.rayDiv(BigNumber.from(availableLiquidity).add(totalDebt));

    const supplyUsageRatio = totalDebt.eq(0) ? BigNumber.from(0) : totalDebt.rayDiv(totalLiquidity.add(totalDebt));

    const progress = totalLiquidity.eq(0)
      ? 0
      : (BigNumber.from(totalVariableDebt).formatToNumberWithDecimals() * 100) /
        BigNumber.from(totalLiquidity).formatToNumberWithDecimals();
    // console.log("progress", progress);
    // expect(supplyUsageRatio.toNumber()).toBeLessThanOrEqual(borrowUsageRatio.toNumber());

    return {
      reserveFactor: BigNumber.from(reserveFactor).formatRayToNumber(),
      unbacked: BigNumber.from(unbacked).formatToNumberWithDecimals(),
      accruedToTreasuryScaled: BigNumber.from(accruedToTreasuryScaled).formatRayToNumber(),
      availableLiquidity: BigNumber.from(availableLiquidity).formatToNumberWithDecimals(),
      totalLiquidity: BigNumber.from(totalLiquidity).formatToNumberWithDecimals(),
      borrowUsageRatio: borrowUsageRatio.formatRayToNumber(),
      supplyUsageRatio: supplyUsageRatio.formatRayToNumber(),
      totalVariableDebt: BigNumber.from(totalVariableDebt).formatToNumberWithDecimals(),
      liquidityRate: BigNumber.from(liquidityRate).formatToNumberWithDecimals({ decimals: 25, displayFixedUnit: 4 }), // percentage of ray
      variableBorrowRate: BigNumber.from(variableBorrowRate).formatToNumberWithDecimals({
        decimals: 25,
        displayFixedUnit: 4,
      }),
      liquidityIndex: BigNumber.from(liquidityIndex).formatRayToNumber(),
      variableBorrowIndex: BigNumber.from(variableBorrowIndex).formatRayToNumber(),
      lastUpdateTimestamp: BigNumber.from(lastUpdateTimestamp).toNumber(),
      scaledVariableDebt: BigNumber.from(scaledVariableDebt).formatToNumberWithDecimals(),
      tokenAddress: reserve,
      aTokenAddress: AccountAddress.fromString(aToken!.toString()),
      symbol: symbol!.toString(),
      progress: progress,
      decimals: Number(decimals),
      // balance: BigNumber.from(balance).formatToNumberWithDecimals(),
      balance: 0, // default value
    };
  }

  public async getReserveDataPosition(
    reserve: AccountAddress,
    scaledATokenBalance: BigNumber,
    accountAddress: AccountAddress
  ): Promise<PositionReserveData> {
    const [, , , , liquidityRate, , liquidityIndex, , ,] = await this.callViewMethod(GetReserveDataFuncAddr, [reserve]);

    const [decimals, , , , , , , ,] = await this.callViewMethod(GetReserveConfigurationDataFuncAddr, [reserve]);
    // console.log("decimals", decimals);

    const [aToken] = await this.callViewMethod(GetReserveTokensAddressesFuncAddr, [reserve]);
    // console.log("aToken", aToken);

    const [symbol] = await this.callViewMethod(UnderlyingSymbolFuncAddr, [reserve]);
    // console.log("symbol", symbol);

    const underlyingBalance = accountAddress ? await this.getBalanceToken(accountAddress, reserve) : 0;
    // console.log("underlyingBalance", underlyingBalance);

    // https://calnix.gitbook.io/aave-book/scaling-and-atokens
    // ATokenBalance = scaledATokenBalance * liquidityIndex

    const [previousIndex] = (
      await this.callViewMethod(ATokenGetGetPreviousIndexFuncAddr, [accountAddress, aToken as AccountAddress])
    ).map(mapToBN);
    // console.log("previousIndex", previousIndex);

    const initialLiquidityIndex = BigNumber.from(previousIndex);
    const currentLiquidityIndex = BigNumber.from(liquidityIndex);

    const initialBalance = scaledATokenBalance.rayMul(initialLiquidityIndex);
    const currentBalance = scaledATokenBalance.rayMul(currentLiquidityIndex);

    const profit = currentBalance.sub(initialBalance);
    const profitPercentage = profit.rayDiv(initialBalance).mul(100);

    return {
      profit: profit.formatToNumberWithDecimals(),
      profitPercentage: profitPercentage.formatToNumberWithDecimals(),
      initialLiquidityIndex: initialLiquidityIndex.formatRayToNumber({ displayFixedUnit: 16 }),
      currentLiquidityIndex: currentLiquidityIndex.formatRayToNumber({ displayFixedUnit: 16 }),
      initialBalance: initialBalance.formatToNumberWithDecimals({ displayFixedUnit: 16 }),
      currentBalance: currentBalance.formatToNumberWithDecimals({ displayFixedUnit: 16 }),
      tokenAddress: reserve,
      aTokenAddress: AccountAddress.fromString(aToken!.toString()),
      symbol: symbol!.toString(),
      decimals: Number(decimals),
      underlyingBalance: underlyingBalance,
      liquidityRate: BigNumber.from(liquidityRate).formatToNumberWithDecimals({ decimals: 25, displayFixedUnit: 4 }),
    };
  }

  public async getBalanceToken(accountAddress: AccountAddress, tokenAddress: AccountAddress): Promise<number> {
    const [resp] = (await this.callViewMethod(UnderlyingBalanceOfFuncAddr, [accountAddress, tokenAddress])).map(
      mapToNumberWithDecimals
    );
    return resp;
  }

  public async getReserveDataLendingWithBalance(
    accountAddress: AccountAddress,
    lendingReserveData: UILendingReserveData[]
  ): Promise<UILendingReserveData[]> {
    // get the data of each reserve
    const reservesData = await Promise.all(
      lendingReserveData.map(async (reserve) => ({
        ...reserve,
        balance: await this.getBalanceToken(accountAddress, reserve.tokenAddress),
      }))
    );
    return reservesData;
  }

  public async getLendingData(fields: string[]): Promise<UILendingReserveData[]> {
    // get the list of reserves from the pool
    const [resp] = await this.callViewMethod(UiPoolDataProviderGetReservesListFuncAddr, []);

    // get the data of each reserve
    const reservesData = await Promise.all(
      (resp as string[]).map((reserve) => this.getReserveDataLending(AccountAddress.fromString(reserve)))
    );

    // console.log("reservesData PoolService", reservesData);

    // check if fields is empty, if empty return all fields, if not return only the fields that are in the array
    return fields.length === 0
      ? reservesData
      : (filterFieldsObjectArray(reservesData, fields) as UILendingReserveData[]);
  }

  public async getPositionData(accountAddress: AccountAddress, fields: string[]): Promise<UIPostionReserveData[]> {
    // the first we get the list of reserves that we supplied before
    const [listUserReserves] = await this.callViewMethod(UiPoolDataProviderGetUserReservesDataFuncAddr, [
      accountAddress,
    ]);
    // console.log("listUserReserves", listUserReserves);

    // filter the reserves that have a scaled aToken balance greater than 0
    const listUserReservesProcessed = (listUserReserves as any[]).filter((userReserve: any) =>
      BigNumber.from(userReserve.scaled_a_token_balance).gt(0)
    );
    // console.log("listUserReservesProcessed", listUserReservesProcessed);

    // then we get the data of each reserve
    const reservesData = await Promise.all(
      (listUserReservesProcessed as any[]).map((reserve) =>
        this.getReserveDataPosition(
          AccountAddress.fromString(reserve.underlying_asset),
          BigNumber.from(reserve.scaled_a_token_balance),
          accountAddress
        )
      )
    );
    // console.log("reservesData PoolService", reservesData);
    // check if fields is empty, if empty return all fields, if not return only the fields that are in the array
    return fields.length === 0
      ? reservesData
      : (filterFieldsObjectArray(reservesData, fields) as UIPostionReserveData[]);
  }
}
