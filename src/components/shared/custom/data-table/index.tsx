"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  Table as ITable,
  Row,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shared/ui/table";
import { cn } from "@/libs/utils/taildwind";
import { Button } from "../../ui/button";
import { ChevronsUpDown } from "lucide-react";
import { useMobile } from "@/hooks/shared/use-mobile";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/shared/ui/tooltip";
import { Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  renderHeader?: (table: ITable<TData>) => React.ReactNode;
  quantitySkeleton?: number;
  classNameHeader?: string;
  classNameBody?: string;
  classNameTable?: string;
  expandedContent?: (data: TData) => React.ReactNode;
}

interface BelowRowConfig<TData> {
  requiresExpand?: boolean;
  render: (row: Row<TData>, props?: { toggleExpand: () => void; isExpanded: boolean }) => React.ReactNode;
}

export type BelowRowContent<TData> = ((row: Row<TData>) => React.ReactNode) | BelowRowConfig<TData>;

export function DataTable<TData, TValue>({
  columns,
  data: initialData,
  isLoading = false,
  renderHeader,
  quantitySkeleton = 5,
  classNameHeader = "",
  classNameBody = "",
  classNameTable = "",
  expandedContent,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const isMobile = useMobile();

  const tableData = React.useMemo(
    () => (isLoading ? Array(quantitySkeleton).fill({}) : initialData),
    [isLoading, initialData, quantitySkeleton]
  );

  const tableColumns = React.useMemo(
    () =>
      isLoading
        ? columns.map((column) => ({
            ...column,
            cell: () => {
              const skeletonContent = (column.meta as any)?.skeleton;
              return typeof skeletonContent === "function" ? skeletonContent() : skeletonContent;
            },
          }))
        : columns,
    [isLoading, columns]
  );

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility: {
        tokens: false,
      },
    },
  });

  return (
    <div className="fcol gap-2">
      {renderHeader && renderHeader(table)}
      <div className={cn("w-full overflow-hidden", classNameTable)}>
        <Table>
          <TableHeader className={classNameHeader}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) =>
                  // If the header is hidden in mobile, don't render it
                  isMobile && (header.column.columnDef.meta as any)?.isHiddenMobile ? null : (
                    <TableHead
                      key={header.id}
                      className={cn(
                        index === 0 ? "ps-4 md:ps-10" : "",
                        index === headerGroup.headers.length - 1 ? "pe-4 md:pe-10" : ""
                      )}
                    >
                      <div
                        className={cn(
                          "flex flex-1 flex-row items-center",
                          isMobile
                            ? (header.column.columnDef.meta?.mobileCellPosition === "left" && "justify-start") ||
                                (header.column.columnDef.meta?.mobileCellPosition === "center" && "justify-center") ||
                                (header.column.columnDef.meta?.mobileCellPosition === "right" && "justify-end")
                            : (header.column.columnDef.meta?.cellPosition === "left" && "justify-start") ||
                                (header.column.columnDef.meta?.cellPosition === "center" && "justify-center") ||
                                (header.column.columnDef.meta?.cellPosition === "right" && "justify-end")
                        )}
                      >
                        {header.isPlaceholder ? null : (
                          <div className="frow-icenter gap-2">
                            {/* render header */}
                            {flexRender(header.column.columnDef.header, header.getContext())}

                            {/* render annotation toolti */}
                            {header.column.columnDef.meta?.annotation && (
                              <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                  <TooltipTrigger asChild onClick={(e) => e.preventDefault()}>
                                    <Button variant="ghost" size="icon" className="size-6 p-0 hover:bg-transparent">
                                      <Info className="size-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent sideOffset={5}>
                                    <p className="max-w-xs text-sm">{header.column.columnDef.meta.annotation}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        )}

                        {/* render sortable */}
                        {header.column.columnDef.meta?.showSortable && (
                          <Button
                            variant="none"
                            size="icon"
                            className="size-8 p-0"
                            onClick={() => header.column.toggleSorting()}
                          >
                            <ChevronsUpDown />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )
                )}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className={classNameBody}>
            {table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.map((row) => (
                  <ExpandableTableRow key={row.id} row={row} columns={columns} expandedContent={expandedContent} />
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// New component for expandable row
function ExpandableTableRow<TData, TValue>({
  row,
  columns,
  expandedContent,
}: {
  row: Row<TData>;
  columns: ColumnDef<TData, TValue>[];
  expandedContent?: (data: TData) => React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const isMobile = useMobile();

  // get row className
  const getRowClassName = () => {
    const stylingColumn = columns.find((col) => col.id === "rowStyling");
    const rowClassName = stylingColumn?.meta?.rowClassName;

    if (typeof rowClassName === "function") {
      return rowClassName(row);
    }
    return rowClassName || "";
  };

  const toggleExpand = React.useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  // Render below row content
  const renderBelowRowContent = React.useCallback(() => {
    return row.getVisibleCells().map((cell: any) => {
      const belowRowMobile = cell.column.columnDef.meta?.belowRowMobile as BelowRowContent<TData>;
      if (!belowRowMobile) return null;

      if (typeof belowRowMobile === "function") {
        return <React.Fragment key={cell.id}>{belowRowMobile(row)}</React.Fragment>;
      }

      if (belowRowMobile.requiresExpand) {
        return (
          <React.Fragment key={cell.id}>
            {belowRowMobile.render(row, {
              toggleExpand,
              isExpanded,
            })}
          </React.Fragment>
        );
      }

      return <React.Fragment key={cell.id}>{belowRowMobile.render(row)}</React.Fragment>;
    });
  }, [row, isExpanded, toggleExpand]);

  return (
    <React.Fragment key={row.id}>
      <TableRow className={cn("group border-none", !isMobile && getRowClassName())}>
        {row.getVisibleCells().map((cell: any, index: number) =>
          isMobile && cell.column.columnDef.meta?.isHiddenMobile ? null : (
            <TableCell
              key={cell.id}
              className={cn(
                index ===
                  (isMobile
                    ? row.getVisibleCells().filter((cell: any) => !cell.column.columnDef.meta?.isHiddenMobile).length -
                      1
                    : row.getVisibleCells().length - 1)
                  ? "pe-4 md:pe-10"
                  : "",
                index === 0 ? "ps-4 md:ps-10" : ""
              )}
            >
              {flexRender(cell.column.columnDef.cell, {
                ...cell.getContext(),
                toggleExpand,
                isExpanded,
              })}
            </TableCell>
          )
        )}
      </TableRow>

      {/* Render belowRowMobile content */}
      {isMobile && (
        <TableRow className="border-none p-0">
          <TableCell colSpan={columns.length} className="px-4 pt-0">
            {renderBelowRowContent()}
          </TableCell>
        </TableRow>
      )}

      {/* Expandable content */}
      <TableRow className="bg-transparent">
        <TableCell colSpan={columns.length} className="p-0">
          <AnimatePresence initial={false}>
            {isExpanded && expandedContent && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="w-full overflow-hidden"
              >
                {expandedContent(row.original)}
              </motion.div>
            )}
          </AnimatePresence>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
