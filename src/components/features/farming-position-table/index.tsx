import React, { useState } from "react";
import { DataTable } from "@/components/shared/custom/data-table";
import { cn } from "@/libs/utils/taildwind";
import { FarmingPosition, farmingPositionColumns } from "./default/columns";
import { closedPositions } from "./closed/data";
import { ClosedPosition, closedPositionColumns } from "./closed/columns";
import { liquidatedPositions } from "./liquidated/data";
import { LiquidatedPosition, liquidatedPositionColumns } from "./liquidated/columns";
import HeaderTableCustom from "./header";
import { ExpandedContent } from "./default/expanded-content";
import { ColumnDef } from "@tanstack/react-table";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

type TabType = "My position" | "Closed" | "Liquidated";

interface FarmingPositionTablePageProps {
  data: FarmingPosition[];
  isLoading?: boolean;
}

export default function FarmingPositionTablePage({ data }: FarmingPositionTablePageProps) {
  const { connected } = useWallet();
  const isLoading = false;

  const [currentTab, setCurrentTab] = useState<TabType>("My position");

  // Map data and columns by tab
  const tableConfig = {
    "My position": {
      data: data,
      columns: farmingPositionColumns,
    },
    Closed: {
      data: closedPositions,
      columns: closedPositionColumns,
    },
    Liquidated: {
      data: liquidatedPositions,
      columns: liquidatedPositionColumns,
    },
  };
  const currentConfig = tableConfig[currentTab];

  const handleChangeTab = (tab: TabType) => {
    setCurrentTab(tab);
  };

  if (!connected) {
    return null;
  }

  return (
    <div className="px-5 md:px-10">
      <DataTable
        columns={currentConfig.columns as ColumnDef<FarmingPosition | ClosedPosition | LiquidatedPosition>[]}
        data={currentConfig.data as (FarmingPosition | ClosedPosition | LiquidatedPosition)[]}
        isLoading={isLoading}
        classNameTable={cn("mt-4 border rounded-xl md:rounded-2xl overflow-hidden")}
        renderHeader={(table) => (
          <HeaderTableCustom
            count={currentConfig.data.length}
            table={table}
            isLoading={isLoading}
            onChangeTab={handleChangeTab}
          />
        )}
        expandedContent={
          currentTab === "My position"
            ? (rowData) => {
                if ("leverage" in rowData) {
                  return <ExpandedContent data={rowData as FarmingPosition} />;
                }
                return null;
              }
            : undefined
        }
      />
    </div>
  );
}
