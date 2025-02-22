import {
  ColumnDef,
  TableOptions,
  TableState,
  Row,
  Column,
} from "@tanstack/react-table"

interface BelowRowConfig<TData> {
  requiresExpand?: boolean;
  render: (row: Row<TData>, props?: { toggleExpand: () => void; isExpanded: boolean }) => React.ReactNode;
}

type BelowRowContent<TData> = ((row: Row<TData>) => React.ReactNode) | BelowRowConfig<TData>;

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends unknown, TValue> {
    showSortable?: boolean;
    skeleton?: React.ReactNode;
    isHiddenMobile?: boolean;
    annotation?: string;
    belowRowMobile?: BelowRowContent<TData>;
    cellPosition?: "left" | "center" | "right";
    mobileCellPosition?: "left" | "center" | "right";
    fullWidthMobile?: boolean;
    rowClassName?: string | ((row: Row<TData>) => string);
  }
}
