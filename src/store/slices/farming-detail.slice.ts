import { StateCreator } from "zustand";
import { FarmingDetailSlice, FarmingDetailState } from "@/store/types/farming-detail.type";
import { FarmingPoolUI } from "@/store/types/farming-pool.type";
import { OmitProperties } from "@/clients/helper/type-factory";

const createActions = (set: any, get: any) => ({
	setPoolSelected: (pool: FarmingPoolUI) => {
		set((state: FarmingDetailSlice) => ({
			farmingDetailState: {
				...state.farmingDetailState,
				poolSelected: pool,
			},
		}));
	},
});	

const omitActions = ['setPoolSelected'] as const;
const initialState: OmitProperties<FarmingDetailState, typeof omitActions[number]> = {
	poolSelected: null
};

export const createFarmingDetailSlice: StateCreator<FarmingDetailSlice> = (set, get) => {
	const actions = createActions(set, get);
	
	return {
		farmingDetailState: {
			...initialState,
			...actions,
		},
	};
}; 