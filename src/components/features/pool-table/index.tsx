"use client";

import { columnsPoolTable } from "./columns";
import { useEffect } from "react";
import { DataTable } from "@/components/shared/custom/data-table";
import { Table as ITable } from "@tanstack/react-table";
import HeaderTableCustom from "./header";
import { useFarmingPoolSelector } from "@/store/selectors/farming-pool.selector";
import { FarmingPoolUI } from "@/store/types/farming-pool.type";

export default function PoolTablePage() {
  const {
    filteredPools,
    isLoading,
    fetchPoolData,
    filterByPlatform,
    startTVLUpdates,
    platformSelected,
    updatePlatformSelected,
  } = useFarmingPoolSelector();

  useEffect(() => {
    // Fetch pool data when component mounts
    fetchPoolData();
    // Start TVL updates
    const cleanup = startTVLUpdates();
    return () => cleanup();
  }, [fetchPoolData, startTVLUpdates]);

  const handlePlatformChange = (value: string) => {
    updatePlatformSelected(value);
    filterByPlatform(value);
  };

  return (
    <DataTable
      quantitySkeleton={10}
      columns={columnsPoolTable}
      data={filteredPools}
      isLoading={isLoading}
      classNameHeader={"border"}
      renderHeader={(table: ITable<FarmingPoolUI>) => (
        <HeaderTableCustom
          count={filteredPools.length}
          table={table}
          isLoading={isLoading}
          onPlatformChange={handlePlatformChange}
          platformSelected={platformSelected}
        />
      )}
    />
  );
}
