"use client";

import { LendingPool } from "./components/features/lending-pool";
import LendingPosition from "./components/features/lending-position";
import { LendingHeader } from "./components/features/lending-header";

export default function LendingPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background with blur effect */}
      <div
        className="fixed inset-0 bg-gradient-to-b from-background/80 to-secondary/20 backdrop-blur-xl"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(var(--primary), 0.1) 0%, transparent 70%)`,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto mt-[160px] max-w-[1440px] px-6 md:px-8 lg:px-12">
        <div className="space-y-16">
          {/* Header Section */}
          <LendingHeader />

          {/* MY POSITION Section */}
          <LendingPosition />

          {/* LENDING POOL Section */}
          <LendingPool />
        </div>
      </div>
    </div>
  );
}
