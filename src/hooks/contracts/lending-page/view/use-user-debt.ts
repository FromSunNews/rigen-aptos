import { useQuery } from "@tanstack/react-query";
import { AccountAddress } from "@aptos-labs/ts-sdk";
import { BigNumber } from "ethers";
import { useTransaction } from "@/clients/wrappers/transaction-provider";

interface DebtInfo {
  token: {
    address: AccountAddress;
    symbol: string;
    name: string;
    decimals: number;
  };
  amount: number;
  amountInWei: BigNumber;
  interestRate: number;
  variableBorrowIndex: BigNumber;
}

interface UserDebtData {
  hasDebt: boolean;
  totalDebtBase: BigNumber;
  healthFactor: BigNumber;
  detailedDebts: DebtInfo[];
}

export function useUserDebt(userAddress?: AccountAddress) {
  const { viewService } = useTransaction();

  return useQuery({
    queryKey: ["user-debt", userAddress?.toString()],
    queryFn: async (): Promise<UserDebtData> => {
      if (!userAddress) {
        return {
          hasDebt: false,
          totalDebtBase: BigNumber.from(0),
          healthFactor: BigNumber.from(0),
          detailedDebts: [],
        };
      }

      const poolViewService = viewService.getPool();

      // 1. get user account data
      const userData = await poolViewService.getUserAccountData(userAddress);

      if (userData.totalDebtBase.isZero()) {
        return {
          hasDebt: false,
          totalDebtBase: BigNumber.from(0),
          healthFactor: userData.healthFactor,
          detailedDebts: [],
        };
      }

      // 2. get all reserves
      const allReserves = await poolViewService.getReservesList();

      // 3. get user config
      const userConfig = await poolViewService.getUserConfiguration(userAddress);

      const detailedDebts: DebtInfo[] = [];

      // 4. check each reserve
      for (let i = 0; i < allReserves.length; i++) {
        const reserve = allReserves[i];

        // even number (0, 2, 4...) represents collateral, odd number (1, 3, 5...) represents borrowing
        const borrowMask = 1 << (i * 2 + 1);

        // check if borrowing bit is set
        if ((Number(userConfig.data) & borrowMask) !== 0) {
          try {
            // get reserve details
            const reserveData = await poolViewService.getReserveData(reserve);

            // get token symbol
            const tokenSymbol = await poolViewService.symbol(reserve);
            const tokenName = await poolViewService.name(reserve);
            const tokenDecimals = await poolViewService.decimals(reserve);

            // get user reserve data
            const userReserveData = await poolViewService.getUserReserveData(reserve, userAddress);

            // get current variable borrow index
            const variableBorrowIndex = BigNumber.from(reserveData.variable_borrow_index);

            // calculate actual debt (not scaled)
            const actualDebt = userReserveData.scaledVariableDebt
              .mul(variableBorrowIndex)
              .div(BigNumber.from(10).pow(27));

            // convert to readable unit
            const readableDebt = actualDebt.div(BigNumber.from(10).pow(tokenDecimals.toNumber() - 2)).toNumber() / 100;

            // calculate interest rate
            const interestRate =
              BigNumber.from(reserveData.current_variable_borrow_rate).div(BigNumber.from(10).pow(25)).toNumber() / 100;

            detailedDebts.push({
              token: {
                address: reserve,
                symbol: tokenSymbol,
                name: tokenName,
                decimals: tokenDecimals.toNumber(),
              },
              amount: readableDebt,
              amountInWei: actualDebt,
              interestRate: interestRate,
              variableBorrowIndex: variableBorrowIndex,
            });
          } catch (error) {
            console.error(`Error fetching details for reserve ${reserve.toString()}:`, error);
          }
        }
      }

      console.log("detailedDebts", detailedDebts);

      return {
        hasDebt: detailedDebts.length > 0,
        totalDebtBase: userData.totalDebtBase,
        healthFactor: userData.healthFactor,
        detailedDebts: detailedDebts,
      };
    },
    enabled: !!userAddress,
  });
}
