import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AddSection } from "./add-section";
import { RepaySection } from "./repay-section";
import { CloseSection } from "./close-section";
import HeaderTabs from "@/components/shared/custom/header-feature-table/prebuilt-component/tabs";
import { FarmingSummarySection } from "../summary-section";
import { CloseSummary } from "../summary-section/close-summary";
import { OpenPositionSection } from "./open-position-section";
import { OpenPositionSummary } from "../summary-section/open-position-summary";
import { useBoundStore } from "@/store";
import { cn } from "@/libs/utils/taildwind";

enum FarmingTab {
  ADD = "add",
  REPAY = "repay",
  CLOSE = "close",
}

// Create separate Summary Components
const AddSummaryRender = () => (
  <FarmingSummarySection
    totalAPR="19.59%"
    totalAPY="19.59%"
    dailyAPR="19.59%"
    reinvestmentFee="10%"
    borrowingFee="0.1%"
    liquidationPrice={{
      token1: "APTOS",
      token2: "USDC",
      price: "10.00",
    }}
    netExposure={{
      long: 100,
      short: 100,
    }}
    leverage={{
      current: "1x",
      target: "3x",
    }}
    assetsSupplied={{
      token1Amount: 100,
      token2Amount: 100,
      totalUSD: "16,710.00",
    }}
    assetsBorrowed={{
      token1Amount: 100,
      token2Amount: 100,
      totalUSD: "16,710.00",
    }}
    priceImpact="0.5%"
    swapFee={{
      percentage: "0.5%",
      amount: "100.00",
    }}
    positionValue={{
      token1Amount: 100,
      token2Amount: 100,
      totalUSD: "16,710.00",
    }}
  />
);

const RepaySummaryRender = () => (
  <FarmingSummarySection
    totalAPR="15.59%"
    totalAPY="15.59%"
    dailyAPR="15.59%"
    reinvestmentFee="8%"
    borrowingFee="0.2%"
    liquidationPrice={{
      token1: "APTOS",
      token2: "USDC",
      price: "9.50",
    }}
    netExposure={{
      long: 80,
      short: 80,
    }}
    leverage={{
      current: "2x",
      target: "2.5x",
    }}
    assetsSupplied={{
      token1Amount: 80,
      token2Amount: 80,
      totalUSD: "14,000.00",
    }}
    assetsBorrowed={{
      token1Amount: 80,
      token2Amount: 80,
      totalUSD: "14,000.00",
    }}
    priceImpact="0.4%"
    swapFee={{
      percentage: "0.4%",
      amount: "80.00",
    }}
    positionValue={{
      token1Amount: 80,
      token2Amount: 80,
      totalUSD: "14,000.00",
    }}
  />
);

const CloseSummaryRender = () => (
  <CloseSummary
    totalAPR="10.59%"
    totalAPY="10.59%"
    dailyAPR="10.59%"
    reinvestmentFee="5%"
    borrowingFee="0.3%"
    liquidationPrice={{
      token1: "APTOS",
      token2: "USDC",
      price: "8.00",
    }}
    netExposure={{
      long: 50,
      short: 50,
    }}
    leverage={{
      current: "1x",
      target: "1x",
    }}
    assetsSupplied={{
      token1Amount: 50,
      token2Amount: 50,
      totalUSD: "8,000.00",
    }}
    assetsBorrowed={{
      token1Amount: 50,
      token2Amount: 50,
      totalUSD: "8,000.00",
    }}
    priceImpact="48%"
    swapFee={{
      percentage: "0.3%",
      amount: "50.00",
    }}
    positionValue={{
      token1Amount: 50,
      token2Amount: 50,
      totalUSD: "8,000.00",
    }}
  />
);

export const FarmingDetailSection = () => {
  const params = useParams();
  const router = useRouter();
  const action = params.action as string;
  const id = params.id as string;

  // Check if it's open-position
  const isOpenPosition = id === "open-position";

  const [currentTab, setCurrentTab] = React.useState<FarmingTab>(() => {
    // Only set tab when it's not open-position
    if (!isOpenPosition && Object.values(FarmingTab).includes(action as FarmingTab)) {
      return action as FarmingTab;
    }
    return FarmingTab.ADD;
  });

  const depositAmount = useBoundStore((state) => state.depositAmount);
  const summaryData = useBoundStore((state) => state.summaryData);

  const hasDepositData = depositAmount.usdc > 0 || depositAmount.aptos > 0;

  React.useEffect(() => {
    if (!isOpenPosition && Object.values(FarmingTab).includes(action as FarmingTab)) {
      setCurrentTab(action as FarmingTab);
    }
  }, [params, action, isOpenPosition]);

  const handleTabChange = (value: string) => {
    setCurrentTab(value as FarmingTab);
    router.push(`/farming-detail/${id}/${value}`);
  };

  const renderContent = () => {
    switch (currentTab) {
      case FarmingTab.ADD:
        return <AddSection />;
      case FarmingTab.REPAY:
        return <RepaySection />;
      case FarmingTab.CLOSE:
        return <CloseSection />;
      default:
        return <AddSection />;
    }
  };

  const renderSummary = () => {
    if (isOpenPosition) {
      return <OpenPositionSummary />;
    }

    switch (currentTab) {
      case FarmingTab.ADD:
        return <AddSummaryRender />;
      case FarmingTab.REPAY:
        return <RepaySummaryRender />;
      case FarmingTab.CLOSE:
        return <CloseSummaryRender />;
      default:
        return <AddSummaryRender />;
    }
  };

  return (
    <div className="grid h-20 w-full grid-cols-12 gap-5 px-10 py-10">
      <div className="col-span-6 xs:col-span-12 lg:col-span-8">
        <div className="w-full space-y-4 pb-10">
          {!isOpenPosition ? (
            <>
              <HeaderTabs
                options={[
                  { value: FarmingTab.ADD, label: "Add" },
                  { value: FarmingTab.REPAY, label: "Repay" },
                  { value: FarmingTab.CLOSE, label: "Close" },
                ]}
                onChange={handleTabChange}
                variant="animation"
                value={currentTab}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${currentTab}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="xs:mb-4"
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <OpenPositionSection />
          )}
        </div>
      </div>

      {/* Summary section */}
      <div
        className={cn(
          isOpenPosition ? "lg:pt-0" : "lg:pt-16",
          "col-span-6 xs:order-last xs:col-span-12 lg:order-none lg:col-span-4"
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`summary-${isOpenPosition ? "open" : currentTab}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {!isOpenPosition ? renderSummary() : <OpenPositionSummary />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
