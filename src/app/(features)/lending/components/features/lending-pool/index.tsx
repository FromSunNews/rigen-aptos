"use client";

import { Typography } from "@/components/shared/ui/typography";
import { Search, LineChart } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shared/ui/select";
import { LendingPoolCard } from "../../commons/lending-pool-card";
import { useState, useEffect, useCallback } from "react";
import { UILendingReserveData } from "@/clients/types/view/pool/lending";
import { useBoundStore } from "@/store";
import { useLendingReserves } from "@/hooks/contracts/lending-page/view/use-lending-reserves";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Skeleton } from "@/components/shared/ui/skeleton";
import debounce from "lodash/debounce";

export function LendingPool() {
  const reserves = useBoundStore((state) => state.reserves);
  const reservesWithBalance = useBoundStore((state) => state.reservesWithBalance);
  const { isLoading } = useLendingReserves();
  const { connected, account } = useWallet();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("total-supply");
  const [filteredTokens, setFilteredTokens] = useState<UILendingReserveData[]>([]);

  // Debounce search term updates
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearchTerm(value);
    }, 300),
    []
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Filter and sort tokens based on search term and sort criteria
  useEffect(() => {
    const tokens = connected && account?.address ? reservesWithBalance : reserves;
    if (!tokens) return;

    let filtered = tokens.filter((token) => token.symbol.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));

    // Sort based on selected criteria
    switch (sortBy) {
      case "total-supply":
        filtered = [...filtered].sort((a, b) => b.totalLiquidity - a.totalLiquidity);
        break;
      case "apr":
        filtered = [...filtered].sort((a, b) => b.liquidityRate - a.liquidityRate);
        break;
      case "tvl":
        filtered = [...filtered].sort((a, b) => b.totalLiquidity - a.totalLiquidity);
        break;
      case "my-deposits":
        filtered = [...filtered].sort((a, b) => b.balance - a.balance);
        break;
      default:
        break;
    }

    setFilteredTokens(filtered);
  }, [reserves, reservesWithBalance, debouncedSearchTerm, sortBy, connected, account]);

  // Render skeleton cards during loading
  const renderSkeletons = () => {
    return Array(8)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="group relative w-full max-w-[420px]">
          {/* Main Card Container */}
          <div className="relative h-auto overflow-hidden rounded-[32px]">
            {/* Base Background Layer */}
            <div className="absolute inset-0">
              {/* Primary background with blur */}
              <div
                className="absolute inset-0"
                style={{
                  background: `
                  linear-gradient(
                    165deg,
                    rgba(29, 46, 64, 0.6) 0%,
                    rgba(29, 46, 64, 0.4) 50%,
                    rgba(29, 46, 64, 0.2) 100%
                  )
                `,
                  backdropFilter: "blur(20px)",
                }}
              />

              {/* Radial highlight at corner */}
              <div
                className="absolute inset-0"
                style={{
                  background: `
                  radial-gradient(
                    circle at 0 0,
                    rgba(82, 174, 255, 0.8) 0%,
                    rgba(82, 174, 255, 0.3) 40%,
                    rgba(82, 174, 255, 0.1) 80%,
                    transparent 80%
                  )
                `,
                  opacity: "0.35",
                }}
              />

              {/* Subtle overlay gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: `
                  linear-gradient(
                    to bottom,
                    transparent,
                    rgba(29, 46, 64, 0.3)
                  )
                `,
                }}
              />
            </div>

            {/* Border Gradient */}
            <div
              className="absolute inset-0 rounded-[32px]"
              style={{
                background: `
                linear-gradient(
                  145deg,
                  rgba(255, 255, 255, 0.4) 0%,
                  rgba(255, 255, 255, 0.1) 30%,
                  transparent 60%
                )
              `,
                maskImage: "linear-gradient(145deg, white 0%, transparent 60%)",
                WebkitMaskImage: "linear-gradient(145deg, white 0%, transparent 60%)",
                opacity: "0.5",
              }}
            />

            {/* Card Content */}
            <div className="relative flex h-full flex-col p-8">
              {/* Token Info Section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div>
                    <Skeleton className="mb-2 h-8 w-32" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
                <Skeleton className="h-10 w-24 rounded-xl" />
              </div>

              {/* Key Metrics Grid */}
              <div className="mt-8 space-y-4">
                {/* TVL & Utilization */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-[120px] items-center gap-3">
                      <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-5 w-20 text-right" />
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-[120px] items-center gap-3">
                      <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                    <Skeleton className="h-5 w-16 text-right" />
                  </div>
                </div>

                {/* Safety Metrics */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-[120px] items-center gap-3">
                      <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                    <Skeleton className="h-5 w-12 text-right" />
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-[120px] items-center gap-3">
                      <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
                      <Skeleton className="h-5 w-28" />
                    </div>
                    <Skeleton className="h-5 w-20 text-right" />
                  </div>
                </div>

                {/* Utilization Progress Bar */}
                <div className="space-y-2 pt-3">
                  <Skeleton className="h-3 w-full rounded-full" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <Skeleton className="h-10 w-full rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ));
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#52AEFF]/20 to-[#52AEFF]/5 shadow-lg shadow-[#52AEFF]/10">
              <LineChart className="h-6 w-6 text-[#52AEFF]" />
            </div>
            <div>
              <Typography variant="h2" className="text-3xl font-bold md:text-4xl">
                LENDING POOL
              </Typography>
              <Typography className="text-lg text-submerged md:text-xl">
                Explore High-Yield Lending Opportunities
              </Typography>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tokens..."
                className="h-12 w-[220px] rounded-full bg-white/5 pl-10 pr-4 backdrop-blur-xl placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-[#52AEFF]/50"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <Select defaultValue="total-supply" onValueChange={setSortBy}>
              <SelectTrigger className="h-12 w-[200px] rounded-full bg-white/5 backdrop-blur-xl">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-[#1D2E40] backdrop-blur-xl">
                <SelectItem value="total-supply">Total Supply</SelectItem>
                <SelectItem value="apr">Highest APR</SelectItem>
                <SelectItem value="tvl">TVL</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 place-items-center gap-8 pb-12 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? renderSkeletons()
          : filteredTokens.map((token, index) => <LendingPoolCard key={index} token={token} />)}
      </div>
    </div>
  );
}
