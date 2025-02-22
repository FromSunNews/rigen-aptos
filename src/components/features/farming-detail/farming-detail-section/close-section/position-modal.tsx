"use client";

import React from "react";
import { Button } from "@/components/shared/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shared/ui/dialog";
import { Typography } from "@/components/shared/ui/typography";
import { motion } from "framer-motion";
import { cn } from "@/libs/utils/taildwind";
import { Icons } from "@/components/shared/custom/base-icon";
import { LiaPauseSolid } from "react-icons/lia";

type Step = {
  id: number;
  title: string;
  status: "loading" | "completed" | "pending";
};

type PositionContentProps = {
  onClose: () => void;
  selectedTrade: "minimize" | "usdc" | "aptos";
  sliderValue: number;
};

function PositionContent({ onClose, selectedTrade, sliderValue }: PositionContentProps) {
  const [steps, setSteps] = React.useState<Step[]>([
    {
      id: 1,
      title: "Allowance on USDC sufficient",
      status: "loading",
    },
    {
      id: 2,
      title: "Allowance on APTOS sufficient",
      status: "pending",
    },
    {
      id: 3,
      title: "Open USDC-APTOS Position",
      status: "pending",
    },
  ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    const simulateAPI = async () => {
      // Step 1
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setSteps((prev) =>
        prev.map((step) =>
          step.id === 1 ? { ...step, status: "completed" } : step.id === 2 ? { ...step, status: "loading" } : step
        )
      );

      // Step 2
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setSteps((prev) =>
        prev.map((step) =>
          step.id === 2 ? { ...step, status: "completed" } : step.id === 3 ? { ...step, status: "loading" } : step
        )
      );

      // Step 3
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setSteps((prev) => prev.map((step) => ({ ...step, status: "completed" })));

      // Close modal after completion with cleanup
      const timeoutId = setTimeout(() => {
        onClose();
      }, 1000);

      // Return cleanup function
      return () => clearTimeout(timeoutId);
    };

    let cleanup: (() => void) | undefined;

    const runSimulation = async () => {
      cleanup = await simulateAPI();
    };

    runSimulation();

    // Cleanup function
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <Typography variant="p" color="embossed" className="ml-0 md:ml-6">
            Open USDC-APTOS position
          </Typography>
        </DialogTitle>
      </DialogHeader>

      <div className="flex flex-col gap-5 pb-4 pt-12">
        {/* Status Icons */}
        <div className="frow-center gap-2.5">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="fcenter h-5 w-5 overflow-hidden">
                {step.status === "loading" && (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                    <Icons.Loading height={20} width={20} />
                  </motion.div>
                )}
                {step.status === "completed" && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M16.6663 5L7.49967 14.1667L3.33301 10"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {step.status === "pending" && <LiaPauseSolid size={24} color="hsl(var(--muted))" />}
              </div>
              {index < steps.length - 1 && (
                <div className={`mx-2 h-[2px] w-[100px] ${step.status === "completed" ? "bg-primary" : "bg-muted"}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Cards */}
        <div className="frow gap-2.5">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "f1 rounded-[20px] border px-5 py-2.5",
                step.status === "completed"
                  ? "border-primary"
                  : step.status === "loading"
                    ? "border-embossed"
                    : "border"
              )}
            >
              <Typography
                variant="small"
                className={cn(
                  "font-medium",
                  step.status === "completed"
                    ? "text-primary"
                    : step.status === "loading"
                      ? "text-embossed"
                      : "text-muted-foreground"
                )}
              >
                {step.title}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

type PositionModalProps = {
  selectedTrade: "minimize" | "usdc" | "aptos";
  sliderValue: number;
};

export default function PositionModal({ selectedTrade, sliderValue }: PositionModalProps) {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">
          Close Position
        </Button>
      </DialogTrigger>
      <DialogContent>
        {open && (
          <PositionContent onClose={() => setOpen(false)} selectedTrade={selectedTrade} sliderValue={sliderValue} />
        )}
      </DialogContent>
    </Dialog>
  );
}
