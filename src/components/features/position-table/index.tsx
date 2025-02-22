"use client";

import { columns } from "./columns";
import { DataTable } from "@/components/shared/custom/data-table";
import { cn } from "@/libs/utils/taildwind";
import Header from "./header";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import React from "react";
import { usePositionReserves } from "@/hooks/contracts/lending-page/view/use-position-reserves";
import { useBoundStore } from "@/store";

export default function PositionTablePage() {
  const { connected } = useWallet();
  const { isLoading } = usePositionReserves();
  const { positionData } = useBoundStore();

  if (!connected || !positionData) {
    return null;
  }

  return (
    <div className="px-0 md:px-10">
      <DataTable
        isLoading={isLoading}
        quantitySkeleton={1}
        columns={columns}
        data={positionData || []}
        classNameTable={cn("md:border border-0 rounded-none md:rounded-2xl overflow-hidden")}
        classNameBody="bg-third"
        classNameHeader="border md:border-none"
        renderHeader={() => <Header isLoading={isLoading} count={positionData.length || 0} />}
      />
    </div>
  );
}
