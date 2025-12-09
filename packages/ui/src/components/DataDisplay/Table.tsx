// packages/ui/src/components/DataDisplay/Table.tsx
import React, { useState, useMemo, useCallback } from "react";
import { useTheme } from "../../contexts/themeContext";
import { Box } from "../foundation/Box";
import { Flex } from "../foundation/Flex";
import { Checkbox } from "../forms/Checkbox";
import { Badge } from "./Badge";
import { Avatar } from "./Avatar";
import { Chip } from "./Chip";

// ============================================
// Types and Interfaces
// ============================================

export type SortDirection = "asc" | "desc" | null;
export type TableVariant = "default" | "bordered" | "striped" | "card";
export type TableSize = "sm" | "md" | "lg";
export type CellAlignment = "left" | "center" | "right";

export interface Column<T = any> {
  /** Unique key for the column */
  key: string;

  /** Column header title */
  title: string;

  /** Column width (CSS value or number) */
  width?: string | number;

  /** Minimum column width */
  minWidth?: string | number;

  /** Maximum column width */
  maxWidth?: string | number;

  /** Cell alignment */
  align?: CellAlignment;

  /** Whether column is sortable */
  sortable?: boolean;

  /** Whether column is resizable */
  resizable?: boolean;

  /** Whether column is fixed (for horizontal scrolling) */
  fixed?: "left" | "right";

  /** Custom header renderer */
  headerRenderer?: (column: Column<T>) => React.ReactNode;

  /** Cell renderer function */
  cellRenderer?: (value: any, row: T, rowIndex: number) => React.ReactNode;

  /** Accessor function to get cell value */
  accessor?: (row: T) => any;

  /** Column visibility */
  visible?: boolean;

  /** Column CSS class */
  className?: string;
}

export interface TableProps<T = any>
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Table data rows */
  data: T[];

  /** Column definitions */
  columns: Column<T>[];

  /** Table variant */
  variant?: TableVariant;

  /** Table size */
  size?: TableSize;

  /** Whether table is hoverable */
  hoverable?: boolean;

  /** Whether rows are selectable */
  selectable?: boolean;

  /** Selected row IDs */
  selectedRows?: string[];

  /** Callback when selection changes */
  onSelectionChange?: (selectedIds: string[]) => void;

  /** Row ID accessor function */
  rowIdAccessor?: (row: T) => string;

  /** Sort configuration */
  sortBy?: string;
  sortDirection?: SortDirection;
  onSort?: (key: string, direction: SortDirection) => void;

  /** Pagination */
  pagination?: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
  };

  /** Loading state */
  loading?: boolean;

  /** Empty state */
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;

  /** Header */
  header?: React.ReactNode;

  /** Footer */
  footer?: React.ReactNode;

  /** Row actions */
  rowActions?: (row: T) => React.ReactNode;

  /** Row click handler */
  onRowClick?: (row: T, event: React.MouseEvent) => void;

  /** Additional CSS classes */
  className?: string;

  /** Children for custom rendering */
  children?: React.ReactNode;
}

// ============================================
// Main Table Component
// ============================================

export function Table<T = any>({
  data,
  columns,
  variant = "default",
  size = "md",
  hoverable = true,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  rowIdAccessor = (row: any) => row.id || row._id,
  sortBy,
  sortDirection,
  onSort,
  pagination,
  loading = false,
  emptyMessage = "No data available",
  emptyIcon,
  header,
  footer,
  rowActions,
  onRowClick,
  className = "",
  children,
  ...props
}: TableProps<T>) {
  const { theme } = useTheme();
  const colors = theme.colors;

  // State for column resizing
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

  // Filter visible columns
  const visibleColumns = useMemo(
    () => columns.filter((col) => col.visible !== false),
    [columns]
  );

  // Handle row selection
  const handleRowSelect = useCallback(
    (rowId: string) => {
      if (!onSelectionChange) return;

      const newSelected = selectedRows.includes(rowId)
        ? selectedRows.filter((id) => id !== rowId)
        : [...selectedRows, rowId];

      onSelectionChange(newSelected);
    },
    [selectedRows, onSelectionChange]
  );

  // Handle select all
  const handleSelectAll = useCallback(() => {
    if (!onSelectionChange) return;

    const allRowIds = data.map((row) => rowIdAccessor(row));
    const newSelected = selectedRows.length === data.length ? [] : allRowIds;

    onSelectionChange(newSelected);
  }, [data, selectedRows, onSelectionChange, rowIdAccessor]);

  // Handle sort
  const handleSort = useCallback(
    (columnKey: string) => {
      if (!onSort || !columns.find((col) => col.key === columnKey)?.sortable)
        return;

      let newDirection: SortDirection = "asc";
      if (sortBy === columnKey) {
        if (sortDirection === "asc") newDirection = "desc";
        else if (sortDirection === "desc") newDirection = null;
      }

      onSort(columnKey, newDirection);
    },
    [sortBy, sortDirection, onSort, columns]
  );

  // Get cell value
  const getCellValue = useCallback((row: T, column: Column<T>) => {
    if (column.accessor) {
      return column.accessor(row);
    }
    return (row as any)[column.key];
  }, []);

  // Render cell content
  const renderCell = useCallback(
    (row: T, column: Column<T>, rowIndex: number) => {
      const value = getCellValue(row, column);

      if (column.cellRenderer) {
        return column.cellRenderer(value, row, rowIndex);
      }

      // Default renderers for common data types
      if (value === null || value === undefined) {
        return <span style={{ color: colors.text.muted }}>—</span>;
      }

      // Render boolean as badge
      if (typeof value === "boolean") {
        return (
          <Badge
            variant={value ? "success" : "neutral"}
            styleVariant="subtle"
            size={size === "sm" ? "sm" : "md"}
          >
            {value ? "Yes" : "No"}
          </Badge>
        );
      }

      // Render date
      if (value instanceof Date) {
        return value.toLocaleDateString();
      }

      // Default string/number render
      return String(value);
    },
    [getCellValue, colors.text.muted, size]
  );

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-sm";
      case "md":
        return "text-base";
      case "lg":
        return "text-lg";
      default:
        return "text-base";
    }
  };

  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case "bordered":
        return {
          border: `1px solid ${colors.surfaceBorder}`,
          borderRadius: "0.5rem",
          overflow: "hidden",
        };
      case "card":
        return {
          backgroundColor: colors.surface,
          borderRadius: "0.75rem",
          overflow: "hidden",
          boxShadow: `0 1px 3px ${colors.overlay}08`,
        };
      case "striped":
        return {};
      case "default":
      default:
        return {};
    }
  };

  // Get table cell padding
  const getCellPadding = () => {
    switch (size) {
      case "sm":
        return "py-2 px-3";
      case "md":
        return "py-3 px-4";
      case "lg":
        return "py-4 px-5";
      default:
        return "py-3 px-4";
    }
  };

  const sizeClasses = getSizeClasses();
  const variantStyles = getVariantStyles();
  const cellPadding = getCellPadding();

  // Render empty state
  const renderEmptyState = () => (
    <Box className="py-16 text-center">
      {emptyIcon || (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.text.muted}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto mb-4"
        >
          <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
        </svg>
      )}
      <div style={{ color: colors.text.secondary }}>{emptyMessage}</div>
    </Box>
  );

  // Render loading state
  const renderLoadingState = () => (
    <Box className="space-y-3 py-8">
      {Array.from({ length: 5 }).map((_, index) => (
        <Flex key={index} align="center" className="px-4">
          {selectable && (
            <Box
              className="mr-3 animate-pulse"
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: colors.surfaceHover,
                borderRadius: "4px",
              }}
            />
          )}
          {visibleColumns.map((col, colIndex) => (
            <Box
              key={col.key}
              className={cellPadding}
              style={{
                flex: 1,
                minWidth: col.minWidth || "100px",
              }}
            >
              <Box
                className="animate-pulse rounded"
                style={{
                  height: "20px",
                  backgroundColor: colors.surfaceHover,
                  width: `${Math.random() * 40 + 40}%`,
                }}
              />
            </Box>
          ))}
        </Flex>
      ))}
    </Box>
  );

  // Render table header
  const renderHeader = () => (
    <thead>
      <tr>
        {selectable && (
          <th
            className={`${cellPadding} border-b bg-backgroundSubtle`}
            style={{
              borderColor: colors.surfaceBorder,
              width: "48px",
              minWidth: "48px",
            }}
          >
            <Checkbox
              checked={data.length > 0 && selectedRows.length === data.length}
              indeterminate={
                selectedRows.length > 0 && selectedRows.length < data.length
              }
              onChange={handleSelectAll}
            />
          </th>
        )}

        {visibleColumns.map((column) => {
          const isSorted = sortBy === column.key;
          const isSortable = column.sortable;

          return (
            <th
              key={column.key}
              className={`${cellPadding} border-b bg-backgroundSubtle font-semibold text-left`}
              style={{
                borderColor: colors.surfaceBorder,
                width: column.width,
                minWidth: column.minWidth,
                maxWidth: column.maxWidth,
                cursor: isSortable ? "pointer" : "default",
                whiteSpace: "nowrap",
              }}
              onClick={() => isSortable && handleSort(column.key)}
            >
              <Flex align="center" gap={2}>
                {column.headerRenderer
                  ? column.headerRenderer(column)
                  : column.title}

                {isSortable && (
                  <span
                    className="inline-flex flex-col"
                    style={{ fontSize: "0.75em" }}
                  >
                    <span
                      style={{
                        color:
                          isSorted && sortDirection === "asc"
                            ? colors.brand[500]
                            : colors.text.muted,
                        lineHeight: "0.8",
                      }}
                    >
                      ▲
                    </span>
                    <span
                      style={{
                        color:
                          isSorted && sortDirection === "desc"
                            ? colors.brand[500]
                            : colors.text.muted,
                        lineHeight: "0.8",
                      }}
                    >
                      ▼
                    </span>
                  </span>
                )}
              </Flex>
            </th>
          );
        })}

        {rowActions && (
          <th
            className={`${cellPadding} border-b bg-backgroundSubtle`}
            style={{
              borderColor: colors.surfaceBorder,
              width: "80px",
              minWidth: "80px",
            }}
          >
            <span style={{ color: colors.text.muted }}>Actions</span>
          </th>
        )}
      </tr>
    </thead>
  );

  // Render table body
  const renderBody = () => (
    <tbody>
      {data.map((row, rowIndex) => {
        const rowId = rowIdAccessor(row);
        const isSelected = selectedRows.includes(rowId);
        const isStriped = variant === "striped" && rowIndex % 2 === 0;

        return (
          <tr
            key={rowId}
            className={`transition-colors ${
              hoverable ? "hover:bg-surfaceHover" : ""
            } ${onRowClick ? "cursor-pointer" : ""}`}
            style={{
              backgroundColor: isSelected
                ? colors.brand[50]
                : isStriped
                ? colors.backgroundSubtle
                : "transparent",
              borderBottom:
                variant !== "card"
                  ? `1px solid ${colors.surfaceBorder}`
                  : "none",
            }}
            onClick={(e) => onRowClick && onRowClick(row, e)}
          >
            {selectable && (
              <td className={cellPadding}>
                <Checkbox
                  checked={isSelected}
                  onChange={() => handleRowSelect(rowId)}
                />
              </td>
            )}

            {visibleColumns.map((column) => (
              <td
                key={`${rowId}-${column.key}`}
                className={cellPadding}
                style={{
                  textAlign: column.align || "left",
                  width: column.width,
                  minWidth: column.minWidth,
                  maxWidth: column.maxWidth,
                  borderLeft: isSelected
                    ? `3px solid ${colors.brand[500]}`
                    : "none",
                }}
              >
                {renderCell(row, column, rowIndex)}
              </td>
            ))}

            {rowActions && (
              <td className={cellPadding}>
                <Flex justify="end" gap={2}>
                  {rowActions(row)}
                </Flex>
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );

  return (
    <Box
      className={`table-container ${sizeClasses} ${className}`}
      style={variantStyles}
      {...props}
    >
      {header && (
        <Box
          className="p-4 border-b"
          style={{ borderColor: colors.surfaceBorder }}
        >
          {header}
        </Box>
      )}

      <Box className="overflow-x-auto">
        <table className="w-full border-collapse">
          {renderHeader()}

          {loading
            ? renderLoadingState()
            : data.length === 0
            ? renderEmptyState()
            : renderBody()}
        </table>
      </Box>

      {footer && (
        <Box
          className="p-4 border-t"
          style={{ borderColor: colors.surfaceBorder }}
        >
          {footer}
        </Box>
      )}

      {children}
    </Box>
  );
}

// ============================================
// Table Sub-Components
// ============================================

// Table Header Component
export interface TableHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

export const TableHeader = ({
  children,
  title,
  description,
  actions,
  className = "",
  ...props
}: TableHeaderProps) => {
  if (children) {
    return (
      <div
        className={`flex items-center justify-between ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-between ${className}`}
      {...props}
    >
      <div>
        {title && (
          <h3
            className="font-semibold text-lg"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h3>
        )}
        {description && (
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>
        )}
      </div>
      {actions && <div>{actions}</div>}
    </div>
  );
};

// Table Footer Component
export interface TableFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const TableFooter = ({
  children,
  className = "",
  ...props
}: TableFooterProps) => (
  <div className={`flex items-center justify-between ${className}`} {...props}>
    {children}
  </div>
);

// Table Pagination Component
export interface TablePaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
  showQuickJumper?: boolean;
  showTotal?: boolean;
  className?: string;
}

export const TablePagination = ({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  showSizeChanger = false,
  pageSizeOptions = [10, 20, 50, 100],
  onPageSizeChange,
  showQuickJumper = false,
  showTotal = true,
  className = "",
}: TablePaginationProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded transition-colors ${
            i === currentPage ? "font-semibold" : ""
          }`}
          style={{
            backgroundColor:
              i === currentPage ? colors.brand[500] : "transparent",
            color: i === currentPage ? colors.brand[600] : colors.text.primary,
            border: `1px solid ${
              i === currentPage ? colors.brand[500] : colors.surfaceBorder
            }`,
          }}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {showTotal && (
        <div className="text-sm" style={{ color: colors.text.secondary }}>
          Showing {startItem} to {endItem} of {totalItems} entries
        </div>
      )}

      <Flex align="center" gap={2}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            border: `1px solid ${colors.surfaceBorder}`,
            color: colors.text.primary,
          }}
        >
          Previous
        </button>

        <Flex align="center" gap={1}>
          {renderPageNumbers()}
        </Flex>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            border: `1px solid ${colors.surfaceBorder}`,
            color: colors.text.primary,
          }}
        >
          Next
        </button>
      </Flex>

      {showSizeChanger && onPageSizeChange && (
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="px-3 py-1 rounded border"
          style={{
            borderColor: colors.surfaceBorder,
            backgroundColor: colors.surface,
            color: colors.text.primary,
          }}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

// Table Cell with Avatar
export interface TableCellAvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  name: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}

export const TableCellAvatar = ({
  src,
  alt,
  fallback,
  name,
  description,
  size = "md",
}: TableCellAvatarProps) => (
  <Flex align="center" gap={3}>
    <Avatar
      src={src}
      alt={alt || name}
      fallback={fallback || name}
      size={size}
    />
    <div>
      <div className="font-medium" style={{ color: "var(--text-primary)" }}>
        {name}
      </div>
      {description && (
        <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
          {description}
        </div>
      )}
    </div>
  </Flex>
);

// Table Cell with Status Badge
export interface TableCellStatusProps {
  status: "success" | "warning" | "error" | "info" | "neutral";
  label: string;
  withDot?: boolean;
}

export const TableCellStatus = ({
  status,
  label,
  withDot = true,
}: TableCellStatusProps) => (
  <Badge variant={status} withDot={withDot} styleVariant="subtle">
    {label}
  </Badge>
);

// Table Cell with Tags
export interface TableCellTagsProps {
  tags: string[];
  maxVisible?: number;
  onTagClick?: (tag: string) => void;
}

export const TableCellTags = ({
  tags,
  maxVisible = 2,
  onTagClick,
}: TableCellTagsProps) => {
  const visibleTags = tags.slice(0, maxVisible);
  const remaining = tags.length - maxVisible;

  return (
    <Flex align="center" gap={1} wrap="wrap">
      {visibleTags.map((tag, index) => (
        <Chip key={index} size="sm" onClick={() => onTagClick?.(tag)}>
          {tag}
        </Chip>
      ))}
      {remaining > 0 && (
        <span className="text-sm" style={{ color: "var(--text-muted)" }}>
          +{remaining} more
        </span>
      )}
    </Flex>
  );
};

// ============================================
// Preset Table Components
// ============================================

// Compact Table
export const CompactTable = <T extends any>(
  props: Omit<TableProps<T>, "size">
) => <Table<T> size="sm" {...props} />;

// Card Table
export const CardTable = <T extends any>(
  props: Omit<TableProps<T>, "variant">
) => <Table<T> variant="card" {...props} />;

// Bordered Table
export const BorderedTable = <T extends any>(
  props: Omit<TableProps<T>, "variant">
) => <Table<T> variant="bordered" {...props} />;

// Selectable Table
export interface SelectableTableProps<T>
  extends Omit<TableProps<T>, "selectable"> {
  selectionMode?: "single" | "multiple";
}

export function SelectableTable<T>({
  selectionMode = "multiple",
  ...props
}: SelectableTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSelectionChange = (ids: string[]) => {
    if (selectionMode === "single" && ids.length > 1) {
      ids = ids.slice(-1); // Keep only the last selection
    }
    setSelectedRows(ids);
  };

  return (
    <Table<T>
      selectable={true}
      selectedRows={selectedRows}
      onSelectionChange={handleSelectionChange}
      {...props}
    />
  );
}

// No separate type exports needed - interfaces are exported above
