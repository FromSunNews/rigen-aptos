import { StateCreator } from "zustand";
import { dataPoolTable } from "@/components/features/pool-table/data";
import { FarmingPoolSlice, FarmingPoolState, FarmingPoolUI, PoolCalculation } from "@/store/types/farming-pool.type";
import { OmitProperties } from "@/clients/helper/type-factory";

const baseBorrowingRate = [
  {
    symbol: "usdc",
    borrowingRate: 12.5, // 2%
  },
  {
    symbol: "zusdt",
    borrowingRate: 16.3,
  },
  {
    symbol: "aptos",
    borrowingRate: 9.2,
  },
	{
		symbol: "thala",
		borrowingRate: 14.7,
	},
];


const poolCalculation = (pool: FarmingPoolUI) => {
	// https://docs.extrafi.io/extra_finance
	// Base APR values from pool
	const baseYieldFarming = dataPoolTable.find((p) => p.id === pool.id)?.apr.yieldFarming || 0;
	const baseProtocolRewards = dataPoolTable.find((p) => p.id === pool.id)?.apr.protocolRewards || 0;
	const baseBorrowingInterest = baseBorrowingRate.find(
		(token) => token.symbol === pool.borrowTokens.selected
	)?.borrowingRate || 0;

	// Calculate Farming APR with leverage
	// Formula: Base APR * (1 + borrowed_amount/deposit_amount)
	const leverageRatio = pool.leverage.selected - 1; // Leverage ratio of borrowed/deposited
	const adjustedYieldFarming = baseYieldFarming * (1 + leverageRatio);
	const adjustedProtocolRewards = baseProtocolRewards * (1 + leverageRatio);

	// Calculate borrowing interest with borrowed capital
	// Only calculate interest on borrowed capital (leverage - 1)
	const borrowingCost = baseBorrowingInterest * leverageRatio;

	// Total APR = Farming APR + Protocol Rewards - Borrowing Cost
	const totalAPR = adjustedYieldFarming + adjustedProtocolRewards - borrowingCost;
	
	// Daily APR
	const dailyAPR = totalAPR / 365;

	return {
		...pool,
		apr: {
			yieldFarming: Number(adjustedYieldFarming.toFixed(2)),
			protocolRewards: Number(adjustedProtocolRewards.toFixed(2)), 
			borrowingInterest: Number(borrowingCost.toFixed(2)),
			total: Number(totalAPR.toFixed(2)),
			daily: Number(dailyAPR.toFixed(2)),
		},
	};
};


const createActions = (set: any, get: any) => ({
	fetchPoolData: async () => {
		set((state: FarmingPoolSlice) => ({
			farmingPoolState: {
				...state.farmingPoolState,
				isLoading: true,
			},
		}));

		try {

			// TODO: Replace with API call
			const response = await new Promise<FarmingPoolUI[]>((resolve) => {
				setTimeout(() => {
					resolve(dataPoolTable);
				}, 1000);
			});

			set((state: FarmingPoolSlice) => ({
				farmingPoolState: {
					...state.farmingPoolState,
					pools: response,
					filteredPools: response.filter((pool) => pool.platform.toLowerCase() === "thala"),
					isLoading: false,
				},
			}));
		} catch (error) {
			console.error("Error fetching pool data:", error);
			set((state: FarmingPoolSlice) => ({
				farmingPoolState: {
					...state.farmingPoolState,
					isLoading: false,
				},
			}));
		}
	},

	filterByPlatform: (platform: string) => {
		const state = get();
		set({
			farmingPoolState: {
				...state.farmingPoolState,
				filteredPools: state.farmingPoolState.pools.filter((pool: FarmingPoolUI) =>
					pool.platform.toLowerCase().includes(platform.toLowerCase())
				),
			},
		});
	},

	updatePoolsTVL: async () => {
		try {
			// TODO: Replace with API call

			// Simulate TVL updates. It take 1s to update
			const newTVLs = await new Promise<FarmingPoolUI[]>((resolve) => {
				setTimeout(() => {

					// Get current pools
					const currentPools = get().farmingPoolState.pools;

					// Update TVL for selected platform
					const updatedPools = currentPools.map((pool: FarmingPoolUI) => {
						if (pool.platform.toLowerCase() === get().farmingPoolState.platformSelected) {
							return {
								...pool,
								tvl: pool.tvl * (1 + (Math.random() * 0.02 - 0.01)) // Random -1% to +1% current tvl
							}
						}
						return pool;
					});

					resolve(updatedPools);
				}, 1000);
			});

			set((state: FarmingPoolSlice) => ({
				farmingPoolState: {
					...state.farmingPoolState,
					pools: newTVLs,

					// filteredPools will be updated automatically according to pools
					filteredPools: state.farmingPoolState.pools
						.filter((pool: FarmingPoolUI) => pool.platform.toLowerCase() === get().farmingPoolState.platformSelected)
				}
			}));
		} catch (error) {
			console.error("Error updating TVLs:", error);
		}
	},

	startTVLUpdates: () => {
		// Update TVL every 3s
		const intervalId = setInterval(() => {
			get().farmingPoolState.updatePoolsTVL();
		}, 3000);

		return () => clearInterval(intervalId);
	},

	updatePlatformSelected: (platform: string) => {
		set((state: FarmingPoolSlice) => ({
			farmingPoolState: {
				...state.farmingPoolState,
				platformSelected: platform,
			},
		}));
	},

	updateLeverage: (selectedLeverage: number, poolId: string) => {
		// Get current pools
		const currentPools = get().farmingPoolState.pools;

		// Update leverage for selected pool
		const updatedPools = currentPools.map((pool: FarmingPoolUI) => {
			if (pool.id === poolId) {
				const newPool = {
					...pool,
					leverage: {
						...pool.leverage,
						selected: selectedLeverage,
					},
				};
				return poolCalculation(newPool);
			}
			return pool;
		});

		set((state: FarmingPoolSlice) => ({
			farmingPoolState: {
				...state.farmingPoolState,
				pools: updatedPools,
				// filteredPools will be updated automatically according to pools
				filteredPools: updatedPools.filter((pool: FarmingPoolUI) => pool.platform.toLowerCase() === get().farmingPoolState.platformSelected)
			}
		}));
	},

	updateBorrowTokens: (selectedBorrowToken: string, poolId: string) => {
		// Get current pools
		const currentPools = get().farmingPoolState.pools;

		// Update borrow tokens for selected pool
		const updatedPools = currentPools.map((pool: FarmingPoolUI) => {	
			if (pool.id === poolId) {
				const newPool = {
					...pool,
					borrowTokens: {
						...pool.borrowTokens,
						selected: selectedBorrowToken,
					},
				};

				return poolCalculation(newPool);
			}
			return pool;
		});

		set((state: FarmingPoolSlice) => ({
			farmingPoolState: {
				...state.farmingPoolState,
				pools: updatedPools,

				// filteredPools will be updated automatically according to pools
				filteredPools: updatedPools.filter((pool: FarmingPoolUI) => pool.platform.toLowerCase() === get().farmingPoolState.platformSelected)
			}
		}));
	},
});	

const omitActions = ['fetchPoolData', 'filterByPlatform', 'updatePoolsTVL', 'startTVLUpdates', 'updatePlatformSelected', 'updateLeverage', 'updateBorrowTokens'] as const;

const initialState: OmitProperties<FarmingPoolState, typeof omitActions[number]> = {
	pools: [],
	filteredPools: [],
	isLoading: true,
	platformSelected: "thala", // Default platform we choose thala for mvp
};

export const createFarmingPoolSlice: StateCreator<FarmingPoolSlice> = (set, get) => {
	const actions = createActions(set, get);
	
	return {
		farmingPoolState: {
			...initialState,
			...actions,
		},
	};
}; 