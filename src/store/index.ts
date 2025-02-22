// https://zustand.docs.pmnd.rs/guides/slices-pattern
// the reason why I refer the slice pattern is because it's a good way to manage state in a large project
// whenever you want to access the state, you can use the get() to access anything from boundedStore to the child slice

import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { createLendingPoolSlice } from "@/store/slices/lending-pool.slice";
import { createLendingPositionSlice } from "@/store/slices/lending-postion.slice";
import { createFarmingPositionSlice } from "@/store/slices/farming-position.slice";
import { createPoolSlice } from "@/store/slices/pool.slice";
import { createOpenPositionSlice } from "@/store/slices/open-position.slice";
import { createBorrowSlice } from "@/store/slices/borrow.slice";
import { createSummarySlice } from "@/store/slices/summary.slice";
import { createBannerSlice } from "@/store/slices/banner.slice";
import { createModalSlice } from "@/store/slices/modal.slice";
import { createFarmingPoolSlice } from "@/store/slices/farming-pool.slice";
import { createFarmingDetailSlice } from "@/store/slices/farming-detail.slice";
import { RootState } from "@/store/types";

// create bound store with all slices
export const useBoundStore = create<RootState>()(
  subscribeWithSelector(
    devtools((...args) => ({
      ...createLendingPositionSlice(...args),
      ...createLendingPoolSlice(...args),
      ...createFarmingPositionSlice(...args),
      ...createPoolSlice(...args),
      ...createOpenPositionSlice(...args),
      ...createBorrowSlice(...args),
      ...createSummarySlice(...args),
      ...createBannerSlice(...args),
      ...createModalSlice(...args),
      ...createFarmingPoolSlice(...args),
      ...createFarmingDetailSlice(...args),
    }))
  )
);
