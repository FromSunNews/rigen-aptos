import { LendingPositionSlice } from "@/store/types/lending-position.type";
import { LendingPoolSlice } from "@/store/types/lending-pool.type";
import { FarmingPositionSlice } from "@/store/types/farming-position.type";
import { PoolState } from "@/store/types/pool.type";
import { OpenPositionState } from "@/store/types/open-position.type";
import { SummarySlice } from "@/store/types/summary.type";
import { BannerState } from "@/store/types/banner.type";
import { BorrowSlice } from "@/store/types/borrow.type";
import { ModalSlice } from "@/store/types/modal.type";
import { FarmingPoolSlice } from "@/store/types/farming-pool.type";
import { FarmingDetailSlice } from "@/store/types/farming-detail.type";

export interface RootState
  extends LendingPositionSlice,
    LendingPoolSlice,
    FarmingPositionSlice,
    PoolState,
    OpenPositionState,
    BorrowSlice,
    SummarySlice,
    BannerState,
    ModalSlice,
    FarmingPoolSlice,
    FarmingDetailSlice {}
