import { AnimatePresence, motion } from "framer-motion";
import { SimpleBorrow } from "./simple-borrow";
import { StrategySection } from "./strategy-section";
import { LeverageSection } from "./leverage-section";
import { SimulatorSection } from "./simulator-section";
import { Typography } from "@/components/shared/ui/typography";
import { useBoundStore } from "@/store";

interface BorrowSectionProps {
  hasDeposit: boolean;
}

export const BorrowSection = ({ hasDeposit }: BorrowSectionProps) => {
  const isStrategyEnabled = useBoundStore((state) => state.isStrategyEnabled);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={hasDeposit ? "full-borrow" : "simple-borrow"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        {!hasDeposit ? (
          <SimpleBorrow />
        ) : (
          <div className="fcol gap-2">
            <Typography variant="h4" color="primary">
              Borrow
            </Typography>
            <div className="fcol-center w-full gap-4 rounded-3xl border">
              <StrategySection />
              <div className="fcol w-full gap-10 px-5 pb-5">
                <LeverageSection isStrategyEnabled={isStrategyEnabled} />
                <SimulatorSection />
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
