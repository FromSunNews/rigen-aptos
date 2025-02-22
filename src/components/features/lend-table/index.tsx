"use client";

import { columns } from "./columns";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import HeaderTableCustom from "./header";
import { DataTable } from "@/components/shared/custom/data-table";
import { Table as ITable } from "@tanstack/react-table";
import React from "react";
import { UILendingReserveData } from "@/clients/types/view/pool/lending";
import { useBoundStore } from "@/store";
import { useLendingReserves } from "@/hooks/contracts/lending-page/view/use-lending-reserves";

export default function LendTablePage() {
  const reserves = useBoundStore((state) => state.reserves);
  const reservesWithBalance = useBoundStore((state) => state.reservesWithBalance);
  const { isLoading } = useLendingReserves();
  const { connected, account } = useWallet();

  return (
    <div>
      <DataTable
        quantitySkeleton={10}
        columns={columns}
        data={connected && account?.address ? reservesWithBalance : reserves}
        isLoading={isLoading}
        classNameHeader="border"
        renderHeader={(table: ITable<UILendingReserveData>) => (
          <HeaderTableCustom isLoading={isLoading} table={table} count={reserves?.length || 0} />
        )}
      />
    </div>
  );
}
