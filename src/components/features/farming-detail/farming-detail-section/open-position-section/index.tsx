"use client";

import { useEffect } from "react";
import PositionModal from "./position-modal";
import { useBoundStore } from "@/store";
import { DepositSection } from "./components/deposit-section";
import { BorrowSection } from "./components/borrow-section";

/**
 * OpenPositionSection is the main component that manages the interaction between:
 * - Deposit Section: Handles token deposits (USDC and APTOS)
 * - Borrow Section: Manages leverage and strategy settings
 * - Chart Simulator: Visualizes the position's performance
 * - Summary: Displays the position's details
 *
 * Data Flow:
 * 1. Deposit Section:
 *    - When user inputs deposit amounts
 *    - Updates depositAmount in global state
 *    - Triggers recalculation of summary data
 *    - Updates chart simulator with new position size
 *
 * 2. Borrow Section:
 *    a) Strategy Toggle:
 *       - Enables/Disables strategy features
 *       - Resets leverage to 1x when disabled
 *       - Updates chart simulator risk level
 *
 *    b) Strategy Selection:
 *       - Changes position strategy (Neutral/Long/Short)
 *       - Updates net exposure in summary
 *       - Modifies chart simulator projection
 *
 *    c) Leverage Adjustment:
 *       - Modifies position size multiplier
 *       - Updates borrowed amounts in summary
 *       - Affects chart simulator risk levels
 *
 *    d) Token Distribution:
 *       - Controls asset allocation
 *       - Updates net exposure ratios
 *       - Influences chart simulator projections
 *
 * The component ensures all these interactions are synchronized through
 * the global state, providing real-time updates to both the chart
 * and summary components.
 */
export const OpenPositionSection = () => {
  const depositAmount = useBoundStore((state) => state.depositAmount);
  const leverage = useBoundStore((state) => state.leverage);
  const selectedStrategy = useBoundStore((state) => state.selectedStrategy);
  const isSimpleBorrow = useBoundStore((state) => state.isSimpleBorrow);
  const calculateSummaryData = useBoundStore((state) => state.calculateSummaryData);

  const hasDeposit = depositAmount.usdc > 0 || depositAmount.aptos > 0;

  // Recalculate summary data whenever relevant values change
  useEffect(() => {
    calculateSummaryData();
  }, [depositAmount, leverage, selectedStrategy, isSimpleBorrow, calculateSummaryData]);

  return (
    <div className="space-y-4">
      <DepositSection />
      <BorrowSection hasDeposit={hasDeposit} />
      <PositionModal disabled={!hasDeposit} />
    </div>
  );
};
