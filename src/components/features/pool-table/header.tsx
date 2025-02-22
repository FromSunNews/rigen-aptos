import HeaderFeatureTable from "@/components/shared/custom/header-feature-table";
import { Table } from "@tanstack/react-table";
import { Icons } from "@/components/shared/custom/base-icon";
import { Slots } from "@/components/shared/custom/header-feature-table/type";

interface HeaderTableCustomProps<TData> {
  count: number;
  table: Table<TData>;
  isLoading: boolean;
  onPlatformChange?: (platform: string) => void;
  platformSelected?: string;
}

export default function HeaderTableCustom<TData>({
  count,
  table,
  isLoading,
  onPlatformChange,
  platformSelected,
}: HeaderTableCustomProps<TData>) {
  const commonComponents = {
    title: { text: "Active Pools" },
    count: { value: count },
    tabs: {
      options: [
        { value: "thala", label: "Thala", icon: Icons.Thala },
        { value: "liquid", label: "Liquid", icon: Icons.Bridge },
        { value: "cellana", label: "Cellana", icon: Icons.Bridge },
      ],
      onChange: onPlatformChange,
      value: platformSelected,
    },
    sort: {
      options: [
        { label: "TVL", value: "tvl" },
        { label: "APY", value: "apy" },
        { label: "APR", value: "apr" },
      ],
      onChange: (value: string) => table.getColumn(value)?.toggleSorting(true),
    },
    search: {
      placeholder: "Search token...",
      onChange: (value: string) => table.getColumn("tokens")?.setFilterValue(value),
    },
  };

  const customSlots: Slots = {
    desktop: [
      {
        start: {
          components: {
            title: commonComponents.title,
            count: commonComponents.count,
            tabs: commonComponents.tabs,
          },
        },
        end: {
          components: {
            sort: commonComponents.sort,
            search: commonComponents.search,
          },
        },
      },
    ],
    mobile: [
      {
        start: {
          components: {
            title: commonComponents.title,
            count: commonComponents.count,
          },
        },
        end: {
          components: {
            tabs: commonComponents.tabs,
          },
        },
      },
      {
        full: {
          components: {
            sort: commonComponents.sort,
          },
        },
      },
      {
        full: {
          components: {
            search: commonComponents.search,
          },
        },
      },
    ],
  };

  return <HeaderFeatureTable slots={customSlots} isLoading={isLoading} className="px-4 py-1 md:px-10" />;
}
