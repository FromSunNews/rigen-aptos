import { useBoundStore } from '@/store'
import { FarmingDetailSlice } from '@/store/types/farming-detail.type'

export const farmingDetailSelector = () => {
  const { 
    poolSelected,
    setPoolSelected
  } = useBoundStore((state: FarmingDetailSlice) => state.farmingDetailState)

  return {
    poolSelected,
    setPoolSelected
  }
}