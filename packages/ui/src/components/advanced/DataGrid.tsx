// packages/ui/src/components/DataDisplay/DataGrid.tsx
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useTheme } from "../../contexts/themeContext";
import { Icon } from "../utility/Icon";

export type SortDirection = "asc" | "desc" | null;
export type DataGridVariant = "default" | "bordered" | "striped" | "compact";
export type DataGridSize = "sm" | "md" | "lg";
export type Alignment = "left" | "center" | "right";

export interface Column<T = any> {
  /** Unique key for the column */
  key: string;

  /** Column header text */
  title: string;

  /** Custom header renderer */
  headerRenderer?: (column: Column<T>) => React.ReactNode;

  /** Custom cell renderer */
  cellRenderer?: (value: any, row: T, rowIndex: number) => React.ReactNode;

  /** Data accessor (key or function) */
  dataKey?: keyof T | ((row: T) => any);

  /** Column width */
  width?: number | string;

  /** Minimum column width */
  minWidth?: number;

  /** Whether column is sortable */
  sortable?: boolean;

  /** Whether column is filterable */
  filterable?: boolean;

  /** Custom sort function */
  sortFn?: (a: T, b: T, direction: SortDirection) => number;

  /** Custom filter function */
  filterFn?: (value: any, filterValue: string, row: T) => boolean;

  /** Text alignment */
  align?: Alignment;

  /** Whether column is resizable */
  resizable?: boolean;

  /** Whether column is hidden */
  hidden?: boolean;

  /** Whether column is pinned (sticky) */
  pinned?: "left" | "right" | false;

  /** Column class name */
  className?: string;

  /** Column style */
  style?: React.CSSProperties;

  /** Additional column data */
  meta?: Record<string, any>;
}

export interface DataGridProps<T = any>
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "children" | "onClick" | "onDoubleClick" | "onContextMenu"
  > {
  /** Array of data rows */
  data: T[];

  /** Column definitions */
  columns: Column<T>[];

  /** Unique row identifier key */
  rowKey?: keyof T | ((row: T, index: number) => string | number);

  /** Whether to show column headers */
  showHeader?: boolean;

  /** Whether rows are selectable */
  selectable?: boolean;

  /** Selection mode */
  selectionMode?: "single" | "multiple" | "none";

  /** Selected row keys */
  selectedRows?: (string | number)[];

  /** Callback when selection changes */
  onSelectionChange?: (
    selectedRows: T[],
    selectedKeys: (string | number)[]
  ) => void;

  /** Sort configuration */
  sortBy?: string;

  /** Sort direction */
  sortDirection?: SortDirection;

  /** Callback when sort changes */
  onSortChange?: (key: string, direction: SortDirection) => void;

  /** Filter values by column key */
  filters?: Record<string, string>;

  /** Callback when filters change */
  onFilterChange?: (filters: Record<string, string>) => void;

  /** Pagination configuration */
  pagination?:
    | boolean
    | {
        pageSize?: number;
        currentPage?: number;
        totalItems?: number;
        showSizeChanger?: boolean;
        showQuickJumper?: boolean;
        pageSizeOptions?: number[];
        showTotal?: (total: number, range: [number, number]) => React.ReactNode;
      };

  /** Callback when page changes */
  onPageChange?: (page: number, pageSize: number) => void;

  /** Loading state */
  loading?: boolean;

  /** Empty state component */
  emptyState?: React.ReactNode;

  /** Loading state component */
  loadingState?: React.ReactNode;

  /** Whether to show borders */
  bordered?: boolean;

  /** Whether to show striped rows */
  striped?: boolean;

  /** Whether to show hover effects */
  hoverable?: boolean;

  /** Variant style */
  variant?: DataGridVariant;

  /** Size */
  size?: DataGridSize;

  /** Row height */
  rowHeight?: number;

  /** Whether to virtualize rows (for large datasets) */
  virtualized?: boolean;

  /** Virtualization buffer */
  virtualBuffer?: number;

  /** Custom row renderer */
  rowRenderer?: (
    row: T,
    index: number,
    children: React.ReactNode
  ) => React.ReactNode;

  /** Custom header renderer */
  headerRenderer?: (
    columns: Column<T>[],
    children: React.ReactNode
  ) => React.ReactNode;

  /** Custom footer renderer */
  footerRenderer?: (data: T[]) => React.ReactNode;

  /** Whether to show summary row */
  showSummary?: boolean;

  /** Summary row renderer */
  summaryRenderer?: (data: T[]) => React.ReactNode;

  /** Expandable rows configuration */
  expandable?: {
    expandedRowKeys?: (string | number)[];
    expandedRowRenderer: (row: T) => React.ReactNode;
    onExpandChange?: (
      expandedKeys: (string | number)[],
      expandedRows: T[]
    ) => void;
    expandIcon?: React.ReactNode;
    collapseIcon?: React.ReactNode;
  };

  /** Row click handler */
  onRowClick?: (row: T, index: number, event: React.MouseEvent) => void;

  /** Row double click handler */
  onRowDoubleClick?: (row: T, index: number, event: React.MouseEvent) => void;

  /** Context menu handler */
  onContextMenu?: (row: T, index: number, event: React.MouseEvent) => void;

  /** Column resize handler */
  onColumnResize?: (key: string, width: number) => void;

  /** Column reorder handler */
  onColumnReorder?: (sourceKey: string, targetKey: string) => void;

  /** Whether to show scrollbar */
  scrollable?: boolean;

  /** Scroll container height */
  scrollHeight?: number | string;

  /** Scroll container width */
  scrollWidth?: number | string;

  /** Custom class names */
  rowClassName?: string | ((row: T, index: number) => string);

  /** Custom row styles */
  rowStyle?:
    | React.CSSProperties
    | ((row: T, index: number) => React.CSSProperties);

  /** Whether to show loading skeletons */
  showSkeletons?: boolean;

  /** Number of skeleton rows */
  skeletonRows?: number;
}

export const DataGrid = React.forwardRef<HTMLDivElement, DataGridProps>((<T,>(
  {
    data: initialData,
    columns: initialColumns,
    rowKey: rowKeyProp = "id" as any,
    showHeader = true,
    selectable = false,
    selectionMode = "none",
    selectedRows: externalSelectedRows,
    onSelectionChange,
    sortBy: externalSortBy,
    sortDirection: externalSortDirection,
    onSortChange,
    filters: externalFilters,
    onFilterChange,
    pagination: paginationConfig = false,
    onPageChange,
    loading = false,
    emptyState,
    loadingState,
    bordered = false,
    striped = false,
    hoverable = true,
    variant = "default",
    size = "md",
    rowHeight = 48,
    virtualized = false,
    virtualBuffer = 5,
    rowRenderer,
    headerRenderer,
    footerRenderer,
    showSummary = false,
    summaryRenderer,
    expandable,
    onRowClick,
    onRowDoubleClick,
    onContextMenu,
    onColumnResize,
    onColumnReorder,
    scrollable = false,
    scrollHeight = "400px",
    scrollWidth = "100%",
    rowClassName,
    rowStyle,
    showSkeletons = false,
    skeletonRows = 5,
    className = "",
    style,
    ...props
  }: DataGridProps<T>,
  ref: React.Ref<HTMLDivElement>
) => {
  const { theme } = useTheme();

  // State
  const [internalSelectedRows, setInternalSelectedRows] = useState<
    (string | number)[]
  >([]);
  const [internalSortBy, setInternalSortBy] = useState<string | null>(null);
  const [internalSortDirection, setInternalSortDirection] =
    useState<SortDirection>(null);
  const [internalFilters, setInternalFilters] = useState<
    Record<string, string>
  >({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [expandedKeys, setExpandedKeys] = useState<(string | number)[]>([]);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);

  // Use controlled or uncontrolled state
  const selectedRows =
    externalSelectedRows !== undefined
      ? externalSelectedRows
      : internalSelectedRows;
  const sortBy = externalSortBy !== undefined ? externalSortBy : internalSortBy;
  const sortDirection =
    externalSortDirection !== undefined
      ? externalSortDirection
      : internalSortDirection;
  const filters =
    externalFilters !== undefined ? externalFilters : internalFilters;

  // Get row key value
  const getRowKey = useCallback(
    (row: T, index: number): string | number => {
      if (typeof rowKeyProp === "function") {
        return rowKeyProp(row, index);
      }

      // Use the key with type assertion
      const key = rowKeyProp as keyof T;
      const value = row[key];

      // If the value is undefined, use index as fallback
      if (value === undefined) {
        return index;
      }

      return value as string | number;
    },
    [rowKeyProp]
  );

  // Process columns
  const columns = useMemo(() => {
    return initialColumns.filter((col) => !col.hidden);
  }, [initialColumns]);

  // Process data with sorting and filtering
  const processedData = useMemo(() => {
    let result = [...initialData];

    // Apply filters
    if (Object.keys(filters).length > 0) {
      result = result.filter((row) => {
        return columns.every((column) => {
          const filterValue = filters[column.key];
          if (!filterValue || !column.filterable) return true;

          // Get cell value
          let cellValue: any;
          if (column.dataKey) {
            if (typeof column.dataKey === "function") {
              cellValue = column.dataKey(row);
            } else {
              cellValue = row[column.dataKey];
            }
          }

          // Apply filter function
          if (column.filterFn) {
            return column.filterFn(cellValue, filterValue, row);
          }

          // Default filter (case-insensitive string match)
          return String(cellValue || "")
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        });
      });
    }

    // Apply sorting
    if (sortBy && sortDirection) {
      const sortColumn = columns.find((col) => col.key === sortBy);
      if (sortColumn?.sortable) {
        result.sort((a, b) => {
          let aValue: any, bValue: any;

          if (sortColumn.dataKey) {
            if (typeof sortColumn.dataKey === "function") {
              aValue = sortColumn.dataKey(a);
              bValue = sortColumn.dataKey(b);
            } else {
              aValue = a[sortColumn.dataKey];
              bValue = b[sortColumn.dataKey];
            }
          }

          if (sortColumn.sortFn) {
            return sortColumn.sortFn(a, b, sortDirection);
          }

          // Default sorting
          const modifier = sortDirection === "asc" ? 1 : -1;

          if (aValue === bValue) return 0;
          if (aValue == null) return 1 * modifier;
          if (bValue == null) return -1 * modifier;

          if (typeof aValue === "string" && typeof bValue === "string") {
            return aValue.localeCompare(bValue) * modifier;
          }

          return (aValue < bValue ? -1 : 1) * modifier;
        });
      }
    }

    return result;
  }, [initialData, columns, filters, sortBy, sortDirection]);

  // Pagination
  const paginatedData = useMemo(() => {
    if (!paginationConfig) return processedData;

    const config = typeof paginationConfig === "object" ? paginationConfig : {};
    const currentPageSize = config.pageSize || pageSize;
    const currentPageNum = config.currentPage || currentPage;

    const startIndex = (currentPageNum - 1) * currentPageSize;
    const endIndex = startIndex + currentPageSize;

    return processedData.slice(startIndex, endIndex);
  }, [processedData, paginationConfig, pageSize, currentPage]);

  // Total pages
  const totalPages = useMemo(() => {
    if (!paginationConfig) return 1;

    const config = typeof paginationConfig === "object" ? paginationConfig : {};
    const currentPageSize = config.pageSize || pageSize;
    const totalItems = config.totalItems || processedData.length;

    return Math.ceil(totalItems / currentPageSize);
  }, [paginationConfig, pageSize, processedData.length]);

  // Selection
  const handleRowSelect = useCallback(
    (row: T, index: number) => {
      if (!selectable || selectionMode === "none") return;

      const key = getRowKey(row, index);
      let newSelectedRows: (string | number)[];

      if (selectionMode === "single") {
        newSelectedRows = [key];
      } else {
        // Multiple selection
        const isSelected = selectedRows.includes(key);
        newSelectedRows = isSelected
          ? selectedRows.filter((k) => k !== key)
          : [...selectedRows, key];
      }

      // Update internal state if uncontrolled
      if (externalSelectedRows === undefined) {
        setInternalSelectedRows(newSelectedRows);
      }

      // Get selected rows data
      const selectedRowsData = initialData.filter((row) =>
        newSelectedRows.includes(getRowKey(row, initialData.indexOf(row)))
      );

      // Call callback
      if (onSelectionChange) {
        onSelectionChange(selectedRowsData, newSelectedRows);
      }
    },
    [
      selectable,
      selectionMode,
      selectedRows,
      externalSelectedRows,
      onSelectionChange,
      initialData,
      getRowKey,
    ]
  );

  const handleSelectAll = useCallback(() => {
    if (selectionMode !== "multiple" || !selectable) return;

    const allKeys = paginatedData.map((row, index) => getRowKey(row, index));
    const allSelected = allKeys.every((key) => selectedRows.includes(key));

    const newSelectedRows = allSelected ? [] : allKeys;

    // Update internal state if uncontrolled
    if (externalSelectedRows === undefined) {
      setInternalSelectedRows(newSelectedRows);
    }

    // Get selected rows data
    const selectedRowsData = initialData.filter((row) =>
      newSelectedRows.includes(getRowKey(row, initialData.indexOf(row)))
    );

    // Call callback
    if (onSelectionChange) {
      onSelectionChange(selectedRowsData, newSelectedRows);
    }
  }, [
    selectionMode,
    selectable,
    paginatedData,
    selectedRows,
    externalSelectedRows,
    onSelectionChange,
    initialData,
    getRowKey,
  ]);

  // Sorting
  const handleSort = useCallback(
    (columnKey: string) => {
      const column = columns.find((col) => col.key === columnKey);
      if (!column?.sortable) return;

      let newDirection: SortDirection;

      if (sortBy === columnKey) {
        // Cycle: asc -> desc -> null
        if (sortDirection === "asc") {
          newDirection = "desc";
        } else if (sortDirection === "desc") {
          newDirection = null;
        } else {
          newDirection = "asc";
        }
      } else {
        // New column, start with asc
        newDirection = "asc";
      }

      const newSortBy = newDirection ? columnKey : null;

      // Update internal state if uncontrolled
      if (externalSortBy === undefined) {
        setInternalSortBy(newSortBy);
        setInternalSortDirection(newDirection);
      }

      // Call callback
      if (onSortChange) {
        onSortChange(columnKey, newDirection);
      }
    },
    [columns, sortBy, sortDirection, externalSortBy, onSortChange]
  );

  // Filtering
  const handleFilter = useCallback(
    (columnKey: string, value: string) => {
      const newFilters = { ...filters };

      if (value.trim() === "") {
        delete newFilters[columnKey];
      } else {
        newFilters[columnKey] = value;
      }

      // Update internal state if uncontrolled
      if (externalFilters === undefined) {
        setInternalFilters(newFilters);
      }

      // Reset to first page when filtering
      if (paginationConfig) {
        setCurrentPage(1);
      }

      // Call callback
      if (onFilterChange) {
        onFilterChange(newFilters);
      }
    },
    [filters, externalFilters, paginationConfig, onFilterChange]
  );

  // Pagination
  const handlePageChange = useCallback(
    (page: number, newPageSize?: number) => {
      if (newPageSize && newPageSize !== pageSize) {
        setPageSize(newPageSize);
        setCurrentPage(1); // Reset to first page when page size changes
      } else {
        setCurrentPage(page);
      }

      if (onPageChange) {
        onPageChange(page, newPageSize || pageSize);
      }
    },
    [pageSize, onPageChange]
  );

  // Expandable rows
  const handleExpand = useCallback(
    (row: T, index: number) => {
      if (!expandable) return;

      const key = getRowKey(row, index);
      const isExpanded = expandedKeys.includes(key);
      const newExpandedKeys = isExpanded
        ? expandedKeys.filter((k) => k !== key)
        : [...expandedKeys, key];

      setExpandedKeys(newExpandedKeys);

      const expandedRows = initialData.filter((row) =>
        newExpandedKeys.includes(getRowKey(row, initialData.indexOf(row)))
      );

      if (expandable.onExpandChange) {
        expandable.onExpandChange(newExpandedKeys, expandedRows);
      }
    },
    [expandable, expandedKeys, initialData, getRowKey]
  );

  // Get cell value
  const getCellValue = useCallback((row: T, column: Column<T>): any => {
    if (column.dataKey) {
      if (typeof column.dataKey === "function") {
        return column.dataKey(row);
      }
      return row[column.dataKey];
    }
    return null;
  }, []);

  // Render cell
  const renderCell = useCallback(
    (row: T, column: Column<T>, rowIndex: number) => {
      if (column.cellRenderer) {
        const value = getCellValue(row, column);
        return column.cellRenderer(value, row, rowIndex);
      }

      const value = getCellValue(row, column);

      // Default rendering
      return (
        <div className="truncate">{value != null ? String(value) : ""}</div>
      );
    },
    [getCellValue]
  );

  // Size classes
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  // Variant classes
  const variantClasses = {
    default: "",
    bordered: "border border-surfaceBorder",
    striped: "",
    compact: "text-sm",
  };

  // Render header
  const renderTableHeader = () => {
    if (!showHeader) return null;

    const headerCells = columns.map((column) => {
      const isSorted = sortBy === column.key;
      const isSortable = column.sortable;

      const cellContent = column.headerRenderer ? (
        column.headerRenderer(column)
      ) : (
        <div className="flex items-center gap-2">
          <span>{column.title}</span>
          {isSortable && (
            <div className="flex flex-col">
              <Icon
                name="ChevronUp"
                size="xs"
                color={
                  isSorted && sortDirection === "asc" ? "brand" : "text-muted"
                }
              />
              <Icon
                name="ChevronDown"
                size="xs"
                color={
                  isSorted && sortDirection === "desc" ? "brand" : "text-muted"
                }
              />
            </div>
          )}
        </div>
      );

      const cellStyle: React.CSSProperties = {
        width: column.width || "auto",
        minWidth: column.minWidth,
        textAlign: column.align || "left",
        ...column.style,
      };

      return (
        <th
          key={column.key}
          className={`
            px-4 py-3 font-medium text-left
            ${isSortable ? "cursor-pointer hover:bg-surfaceHover" : ""}
            ${column.className || ""}
          `}
          style={cellStyle}
          onClick={isSortable ? () => handleSort(column.key) : undefined}
        >
          {cellContent}
        </th>
      );
    });

    const headerRow = (
      <tr
        className="border-b"
        style={{ borderColor: theme.colors.surfaceBorder }}
      >
        {selectable && selectionMode === "multiple" && (
          <th className="px-4 py-3 w-12">
            <input
              type="checkbox"
              checked={
                paginatedData.length > 0 &&
                paginatedData.every((row, index) =>
                  selectedRows.includes(getRowKey(row, index))
                )
              }
              onChange={handleSelectAll}
              className="rounded border-surfaceBorder"
            />
          </th>
        )}
        {expandable && <th className="px-4 py-3 w-12"></th>}
        {headerCells}
      </tr>
    );

    if (headerRenderer) {
      return headerRenderer(columns, headerRow);
    }

    return <thead className="bg-surfaceSubtle">{headerRow}</thead>;
  };

  // Render row
  const renderRow = (row: T, index: number) => {
    const key = getRowKey(row, index);
    const isSelected = selectedRows.includes(key);
    const isExpanded = expandable && expandedKeys.includes(key);

    const rowClass =
      typeof rowClassName === "function"
        ? rowClassName(row, index)
        : rowClassName;

    const rowStyleObj =
      typeof rowStyle === "function" ? rowStyle(row, index) : rowStyle;

    const cells = columns.map((column) => {
      const cellStyle: React.CSSProperties = {
        textAlign: column.align || "left",
      };

      return (
        <td
          key={column.key}
          className={`px-4 py-3 ${column.className || ""}`}
          style={cellStyle}
        >
          {renderCell(row, column, index)}
        </td>
      );
    });

    const rowContent = (
      <>
        {selectable && (
          <td className="px-4 py-3 w-12">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleRowSelect(row, index)}
              className="rounded border-surfaceBorder"
            />
          </td>
        )}
        {expandable && (
          <td className="px-4 py-3 w-12">
            <button
              type="button"
              className="p-1 rounded hover:bg-surfaceHover"
              onClick={() => handleExpand(row, index)}
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded
                ? expandable.collapseIcon || <Icon name="ChevronUp" size="sm" />
                : expandable.expandIcon || (
                    <Icon name="ChevronDown" size="sm" />
                  )}
            </button>
          </td>
        )}
        {cells}
      </>
    );

    const baseRow = (
      <tr
        key={key}
        className={`
          transition-colors
          ${striped && index % 2 === 1 ? "bg-surfaceSubtle" : ""}
          ${hoverable ? "hover:bg-surfaceHover" : ""}
          ${isSelected ? "bg-brand-50" : ""}
          ${rowClass || ""}
        `}
        style={{
          height: `${rowHeight}px`,
          ...rowStyleObj,
        }}
        onClick={(e) => onRowClick?.(row, index, e)}
        onDoubleClick={(e) => onRowDoubleClick?.(row, index, e)}
        onContextMenu={(e) => onContextMenu?.(row, index, e)}
      >
        {rowContent}
      </tr>
    );

    const rowWithExpansion =
      expandable && isExpanded ? (
        <>
          {baseRow}
          <tr>
            <td
              colSpan={
                columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0)
              }
            >
              {expandable.expandedRowRenderer(row)}
            </td>
          </tr>
        </>
      ) : (
        baseRow
      );

    if (rowRenderer) {
      return rowRenderer(row, index, rowWithExpansion);
    }

    return rowWithExpansion;
  };

  // Render pagination
  const renderPagination = () => {
    if (!paginationConfig) return null;

    const config = typeof paginationConfig === "object" ? paginationConfig : {};
    const showTotal = config.showTotal;
    const showSizeChanger = config.showSizeChanger !== false;
    const showQuickJumper = config.showQuickJumper;
    const pageSizeOptions = config.pageSizeOptions || [10, 20, 50, 100];

    return (
      <div
        className="flex items-center justify-between px-4 py-3 border-t"
        style={{ borderColor: theme.colors.surfaceBorder }}
      >
        <div style={{ color: theme.colors.text.muted }}>
          {showTotal
            ? showTotal(processedData.length, [
                (currentPage - 1) * pageSize + 1,
                Math.min(currentPage * pageSize, processedData.length),
              ])
            : `Showing ${(currentPage - 1) * pageSize + 1} to ${Math.min(
                currentPage * pageSize,
                processedData.length
              )} of ${processedData.length} entries`}
        </div>

        <div className="flex items-center gap-2">
          {showSizeChanger && (
            <select
              value={pageSize}
              onChange={(e) => handlePageChange(1, Number(e.target.value))}
              className="px-3 py-1 rounded border border-surfaceBorder bg-transparent"
              style={{ color: theme.colors.text.primary }}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size} / page
                </option>
              ))}
            </select>
          )}

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="px-3 py-1 rounded border border-surfaceBorder hover:bg-surfaceHover disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ color: theme.colors.text.primary }}
            >
              Previous
            </button>

            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              let pageNum: number;

              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              if (pageNum < 1 || pageNum > totalPages) return null;

              return (
                <button
                  key={pageNum}
                  type="button"
                  className={`px-3 py-1 rounded border ${
                    currentPage === pageNum
                      ? "bg-brand-500 text-brand-600 border-brand-500"
                      : "border-surfaceBorder hover:bg-surfaceHover"
                  }`}
                  onClick={() => handlePageChange(pageNum)}
                  style={{
                    color:
                      currentPage === pageNum
                        ? theme.colors.brand[600]
                        : theme.colors.text.primary,
                  }}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              type="button"
              className="px-3 py-1 rounded border border-surfaceBorder hover:bg-surfaceHover disabled:opacity-50"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{ color: theme.colors.text.primary }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render loading state
  const renderLoading = () => {
    if (!loading && !showSkeletons) return null;

    if (loadingState) {
      return loadingState;
    }

    const skeletonRowsToShow = showSkeletons ? skeletonRows : 5;

    return (
      <>
        {Array.from({ length: skeletonRowsToShow }).map((_, index) => (
          <tr key={`skeleton-${index}`} className="animate-pulse">
            {selectable && (
              <td className="px-4 py-3">
                <div className="h-4 bg-surfaceHover rounded"></div>
              </td>
            )}
            {expandable && (
              <td className="px-4 py-3">
                <div className="h-4 bg-surfaceHover rounded"></div>
              </td>
            )}
            {columns.map((column) => (
              <td key={column.key} className="px-4 py-3">
                <div className="h-4 bg-surfaceHover rounded"></div>
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  };

  // Render empty state
  const renderEmpty = () => {
    if (loading || (showSkeletons && paginatedData.length === 0)) return null;

    if (paginatedData.length === 0) {
      if (emptyState) {
        return (
          <tr>
            <td
              colSpan={
                columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0)
              }
            >
              {emptyState}
            </td>
          </tr>
        );
      }

      return (
        <tr>
          <td
            colSpan={
              columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0)
            }
            className="px-4 py-8 text-center"
            style={{ color: theme.colors.text.muted }}
          >
            <Icon name="Database" size="lg" className="mx-auto mb-2" />
            <div>No data available</div>
          </td>
        </tr>
      );
    }

    return null;
  };

  return (
    <div
      ref={ref}
      className={`
        rounded-lg overflow-hidden
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      style={style}
      {...props}
    >
      <div
        className={scrollable ? "overflow-auto" : ""}
        style={{
          height: scrollable ? scrollHeight : "auto",
          width: scrollable ? scrollWidth : "auto",
        }}
      >
        <table className="w-full border-collapse">
          {renderTableHeader()}
          <tbody>
            {renderLoading()}
            {!loading && !showSkeletons && paginatedData.map(renderRow)}
            {renderEmpty()}
          </tbody>
          {showSummary && summaryRenderer && (
            <tfoot
              className="bg-surfaceSubtle border-t"
              style={{ borderColor: theme.colors.surfaceBorder }}
            >
              <tr>
                <td
                  colSpan={
                    columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0)
                  }
                >
                  {summaryRenderer(processedData)}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {footerRenderer && (
        <div
          className="border-t"
          style={{ borderColor: theme.colors.surfaceBorder }}
        >
          {footerRenderer(processedData)}
        </div>
      )}

      {renderPagination()}
    </div>
  );
}) as <T = any>(props: DataGridProps<T> & { ref?: React.Ref<HTMLDivElement> }) => React.ReactElement);

// Set display name
(DataGrid as { displayName?: string }).displayName = "DataGrid";

// Pre-configured variants
export const BorderedDataGrid = React.forwardRef<
  HTMLDivElement,
  Omit<DataGridProps, "variant">
>((props, ref) => <DataGrid ref={ref} variant="bordered" {...props} />);
(BorderedDataGrid as { displayName?: string }).displayName = "BorderedDataGrid";

export const StripedDataGrid = React.forwardRef<
  HTMLDivElement,
  Omit<DataGridProps, "variant" | "striped">
>((props, ref) => (
  <DataGrid ref={ref} variant="striped" striped={true} {...props} />
));
(StripedDataGrid as { displayName?: string }).displayName = "StripedDataGrid";

export const CompactDataGrid = React.forwardRef<
  HTMLDivElement,
  Omit<DataGridProps, "variant" | "size">
>((props, ref) => (
  <DataGrid ref={ref} variant="compact" size="sm" {...props} />
));
(CompactDataGrid as { displayName?: string }).displayName = "CompactDataGrid";

export const SelectableDataGrid = React.forwardRef<
  HTMLDivElement,
  Omit<DataGridProps, "selectable" | "selectionMode">
>((props, ref) => (
  <DataGrid ref={ref} selectable={true} selectionMode="multiple" {...props} />
));
(SelectableDataGrid as { displayName?: string }).displayName =
  "SelectableDataGrid";

export const PaginatedDataGrid = React.forwardRef<
  HTMLDivElement,
  Omit<DataGridProps, "pagination">
>((props, ref) => <DataGrid ref={ref} pagination={true} {...props} />);
(PaginatedDataGrid as { displayName?: string }).displayName =
  "PaginatedDataGrid";
