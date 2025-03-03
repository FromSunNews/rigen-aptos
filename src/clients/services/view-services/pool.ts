import { AccountAddress } from "@aptos-labs/ts-sdk";
import { AptosBaseService } from "@/clients/services/base";
import {
  ATokenGetGetPreviousIndexFuncAddr,
  ATokenGetTokenAccountAddressFuncAddr,
  GetReserveConfigurationDataFuncAddr,
  GetReserveDataFuncAddr,
  GetReserveTokensAddressesFuncAddr,
  GetUserAccountDataFuncAddr,
  GetUserReserveDataFuncAddr,
  PoolGetReserveDataFuncAddr,
  PoolGetReservesListFuncAddr,
  PoolGetUserConfigurationFuncAddr,
  UiPoolDataProviderGetReservesListFuncAddr,
  UiPoolDataProviderGetUserReservesDataFuncAddr,
  UnderlyingBalanceOfFuncAddr,
  UnderlyingDecimalsFuncAddr,
  UnderlyingGetMetadataBySymbolFuncAddr,
  UnderlyingNameFuncAddr,
  UnderlyingSymbolFuncAddr,
  VariableScaledTotalSupplyFuncAddr,
} from "@/clients/configs/move-functions";
import { BigNumber } from "ethers";
import { mapToBN, mapToNumberWithDecimals } from "@/clients/configs/common";
import "@/clients/helper/wadraymath";
import { filterFieldsObjectArray } from "@/libs/utils/function";
import { EntryLendingReserveData, UILendingReserveData } from "@/clients/types/view/pool/lending";
import { PositionReserveData, UIPostionReserveData } from "@/clients/types/view/pool/position";

export type UserConfigurationMap = {
  data: number;
};

export type ReserveData = {
  /// stores the reserve configuration
  configuration: { data: number };
  /// the liquidity index. Expressed in ray
  liquidity_index: number;
  /// the current supply rate. Expressed in ray
  current_liquidity_rate: number;
  /// variable borrow index. Expressed in ray
  variable_borrow_index: number;
  /// the current variable borrow rate. Expressed in ray
  current_variable_borrow_rate: number;
  /// the current stable borrow rate. Expressed in ray
  current_stable_borrow_rate: number;
  /// timestamp of last update (u40 -> u64)
  last_update_timestamp: number;
  /// the id of the reserve. Represents the position in the list of the active reserves
  id: number;
  /// aToken address
  a_token_address: string;
  /// stableDebtToken address
  stable_debt_token_address: string;
  /// variableDebtToken address
  variable_debt_token_address: string;
  /// address of the interest rate strategy
  interest_rate_strategy_address: string;
  /// the current treasury balance, scaled
  accrued_to_treasury: number;
  /// the outstanding unbacked aTokens minted through the bridging feature
  unbacked: number;
  /// the outstanding debt borrowed against this asset in isolation mode
  isolation_mode_total_debt: number;
};

export interface Metadata {
  inner: string;
}

export interface UserReserveData {
  currentATokenBalance: BigNumber;
  currentVariableDebt: BigNumber;
  scaledVariableDebt: BigNumber;
  liquidityRate: BigNumber;
  usageAsCollateralEnabled: boolean;
}

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

  /// Returns all user account data
  public async getUserAccountData(user: AccountAddress): Promise<{
    totalCollateralBase: BigNumber;
    totalDebtBase: BigNumber;
    availableBorrowsBase: BigNumber;
    currentLiquidationThreshold: BigNumber;
    ltv: BigNumber;
    healthFactor: BigNumber;
  }> {
    const [totalCollateralBase, totalDebtBase, availableBorrowsBase, currentLiquidationThreshold, ltv, healthFactor] = (
      await this.callViewMethod(GetUserAccountDataFuncAddr, [user])
    ).map(mapToBN);
    return { totalCollateralBase, totalDebtBase, availableBorrowsBase, currentLiquidationThreshold, ltv, healthFactor };
  }

  public async getReservesList(): Promise<Array<AccountAddress>> {
    const resp = ((await this.callViewMethod(PoolGetReservesListFuncAddr, [])).at(0) as Array<any>).map((item) =>
      AccountAddress.fromString(item as string)
    );
    return resp;
  }

  public async getUserConfiguration(account: AccountAddress): Promise<UserConfigurationMap> {
    const [resp] = await this.callViewMethod(PoolGetUserConfigurationFuncAddr, [account]);
    return resp as UserConfigurationMap;
  }

  public async getReserveData(asset: AccountAddress): Promise<ReserveData> {
    const [resp] = await this.callViewMethod(PoolGetReserveDataFuncAddr, [asset]);
    console.log("resp", resp);
    return resp as ReserveData;
  }

  public async getMetadataBySymbol(symbol: string): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(UnderlyingGetMetadataBySymbolFuncAddr, [symbol]);
    console.log("resp", resp);
    return AccountAddress.fromString((resp as Metadata).inner);
  }

  // Get the name of the fungible asset from the metadata object.
  public async name(metadataAddress: AccountAddress): Promise<string> {
    const [resp] = await this.callViewMethod(UnderlyingNameFuncAddr, [metadataAddress]);
    return resp as string;
  }

  // Get the symbol of the fungible asset from the metadata object.
  public async symbol(metadataAddress: AccountAddress): Promise<string> {
    const [resp] = await this.callViewMethod(UnderlyingSymbolFuncAddr, [metadataAddress]);
    return resp as string;
  }

  // Get the decimals from the metadata object.
  public async decimals(metadataAddress: AccountAddress): Promise<BigNumber> {
    const [resp] = (await this.callViewMethod(UnderlyingDecimalsFuncAddr, [metadataAddress])).map(mapToBN);
    return resp;
  }

  public async getUserReserveData(asset: AccountAddress, user: AccountAddress): Promise<UserReserveData> {
    const [currentATokenBalance, currentVariableDebt, scaledVariableDebt, liquidityRate, usageAsCollateralEnabled] =
      await this.callViewMethod(GetUserReserveDataFuncAddr, [asset, user]);
    return {
      currentATokenBalance: BigNumber.from(currentATokenBalance),
      currentVariableDebt: BigNumber.from(currentVariableDebt),
      scaledVariableDebt: BigNumber.from(scaledVariableDebt),
      liquidityRate: BigNumber.from(liquidityRate),
      usageAsCollateralEnabled: usageAsCollateralEnabled as boolean,
    } as UserReserveData;
  }
}
