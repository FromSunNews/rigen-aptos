"use client";

import HeaderFeatureTable from "@/components/shared/custom/header-feature-table";
import { Table } from "@tanstack/react-table";
import { Slots } from "@/components/shared/custom/header-feature-table/type";
import { Typography } from "@/components/shared/ui/typography";

type TabType = "My position" | "Closed" | "Liquidated";

interface HeaderTableCustomProps<TData> {
  count: number;
  table: Table<TData>;
  isLoading: boolean;
  onChangeTab: (value: TabType) => void;
}

export default function HeaderTableCustom<TData>({
  count,
  table,
  isLoading,
  onChangeTab,
}: HeaderTableCustomProps<TData>) {
  const customSlots: Slots = {
    desktop: [
      {
        start: {
          components: {
            tabs: {
              options: [
                { value: "My position", label: "My position" },
                { value: "Closed", label: "Closed" },
                { value: "Liquidated", label: "Liquidated" },
              ],
              onChange: (value) => {
                onChangeTab(value as TabType);
              },
              variant: "animation",
            },
          },
        },
        end: {
          custom: (
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex flex-row items-center gap-2">
                <Typography variant="small">Total Position</Typography>
                <Typography variant="h5" color="primary" className="ps-2">
                  ~$3,000.00
                </Typography>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Typography variant="small" className="ps-4">
                  Daily Earning
                </Typography>
                <Typography variant="h5" color="primary" className="ps-2">
                  ~$10.00
                </Typography>
              </div>
            </div>
          ),
        },
      },
    ],
    mobile: [
      {
        full: {
          components: {
            tabs: {
              options: [
                { value: "My position", label: "My position" },
                { value: "Closed", label: "Closed" },
                { value: "Liquidated", label: "Liquidated" },
              ],
              onChange: (value) => {
                onChangeTab(value as TabType);
              },
              variant: "animation",
            },
          },
        },
      },
      {
        full: {
          custom: (
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex flex-row items-center gap-2">
                <Typography variant="small">Total Position</Typography>
                <Typography variant="h5" color="primary" className="ps-2">
                  ~$3,000.00
                </Typography>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Typography variant="small" className="ps-4">
                  Daily Earning
                </Typography>
                <Typography variant="h5" color="primary" className="ps-2">
                  ~$10.00
                </Typography>
              </div>
            </div>
          ),
        },
      },
    ],
  };

  return <HeaderFeatureTable slots={customSlots} isLoading={isLoading} className="px-0 md:px-0" />;
}
