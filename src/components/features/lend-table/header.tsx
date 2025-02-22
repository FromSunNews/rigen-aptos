import HeaderFeatureTable from "@/components/shared/custom/header-feature-table";
import { Table } from "@tanstack/react-table";
import { Slots } from "@/components/shared/custom/header-feature-table/type";

interface HeaderTableCustomProps<TData> {
  count: number;
  table: Table<TData>;
  isLoading: boolean;
}

export default function HeaderTableCustom<TData>({ count, table, isLoading }: HeaderTableCustomProps<TData>) {
  // Common components
  const titleAndCount = {
    components: {
      title: { text: "Lending Pool" },
      count: { value: count },
    },
  };

  const sortOptions = {
    options: [
      { label: "Total Supply", value: "totalBorrow" },
      { label: "Lending Rate (APY)", value: "apy" },
      { label: "Wallet Balance", value: "walletBalance" },
    ],
    onChange: (value: string) => table.getColumn(value)?.toggleSorting(true),
  };

  const searchInput = {
    placeholder: "Search Token...",
    onChange: (value: string) => table.getColumn("token")?.setFilterValue(value),
  };

  const customSlots: Slots = {
    desktop: [
      {
        start: titleAndCount,
        end: {
          components: {
            sort: { ...sortOptions, className: "w-auto" },
            search: { ...searchInput, className: "w-auto" },
          },
        },
      },
    ],
    mobile: [
      {
        start: titleAndCount,
        end: {
          components: {
            sort: { ...sortOptions, className: "w-40" },
          },
        },
      },
      {
        full: {
          components: {
            search: searchInput,
          },
        },
      },
    ],
  };

  return <HeaderFeatureTable slots={customSlots} isLoading={isLoading} className="px-4 py-1 md:px-10" />;
}
