// packages/ui/src/components/navigation/Breadcrumbs.tsx
import React from "react";
import { useTheme } from "../../contexts/themeContext";
import { Box } from "../foundation/Box";
import { Flex } from "../foundation/Flex";

export type BreadcrumbVariant = "default" | "solid" | "ghost" | "transparent";
export type BreadcrumbSeparator = "slash" | "chevron" | "arrow" | "dot";

export interface BreadcrumbItem {
  /** Unique identifier for the breadcrumb */
  id: string;

  /** Display label */
  label: string;

  /** URL for navigation (optional for current/last item) */
  href?: string;

  /** Icon to display before label */
  icon?: React.ReactNode;

  /** Whether item is disabled */
  disabled?: boolean;

  /** Additional data */
  data?: Record<string, any>;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];

  /** Currently active item ID */
  activeItem?: string;

  /** Callback when breadcrumb item is clicked */
  onItemClick?: (item: BreadcrumbItem, index: number) => void;

  /** Maximum number of items to show (others will be collapsed) */
  maxItems?: number;

  /** Variant style */
  variant?: BreadcrumbVariant;

  /** Separator type between items */
  separator?: BreadcrumbSeparator;

  /** Custom separator element */
  customSeparator?: React.ReactNode;

  /** Whether to show root/home item */
  showRoot?: boolean;

  /** Custom root/home item */
  rootItem?: BreadcrumbItem;

  /** Whether breadcrumbs are condensed (smaller text) */
  condensed?: boolean;

  /** Whether to truncate long labels */
  truncate?: boolean;

  /** Maximum characters before truncation */
  truncateLength?: number;

  /** Additional CSS classes */
  className?: string;

  /** Children (for custom rendering) */
  children?: React.ReactNode;
}

export const Breadcrumbs = ({
  items,
  activeItem,
  onItemClick,
  maxItems,
  variant = "default",
  separator = "slash",
  customSeparator,
  showRoot = true,
  rootItem,
  condensed = false,
  truncate = false,
  truncateLength = 20,
  className = "",
  children,
  ...props
}: BreadcrumbsProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  // Prepare items with optional root
  const allItems = React.useMemo(() => {
    const baseItems = [...items];

    if (showRoot) {
      const defaultRoot: BreadcrumbItem = {
        id: "root",
        label: "Home",
        href: "/",
      };
      baseItems.unshift(rootItem || defaultRoot);
    }

    return baseItems;
  }, [items, showRoot, rootItem]);

  // Handle item truncation
  const processedItems = React.useMemo(() => {
    if (!maxItems || allItems.length <= maxItems) {
      return allItems;
    }

    // Show first, last, and ellipsis in middle
    const firstItems = allItems.slice(0, 1);
    const lastItems = allItems.slice(-(maxItems - 2));
    const ellipsisItem: BreadcrumbItem = {
      id: "ellipsis",
      label: "...",
      disabled: true,
    };

    return [...firstItems, ellipsisItem, ...lastItems];
  }, [allItems, maxItems]);

  // Get variant styles
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case "solid":
        return {
          backgroundColor: colors.surface,
          border: `1px solid ${colors.surfaceBorder}`,
          borderRadius: "0.5rem",
          padding: "0.75rem 1rem",
        };
      case "ghost":
        return {
          backgroundColor: colors.backgroundSubtle,
          borderRadius: "0.5rem",
          padding: "0.75rem 1rem",
        };
      case "transparent":
        return {
          backgroundColor: "transparent",
          padding: "0.5rem 0",
        };
      case "default":
      default:
        return {
          backgroundColor: "transparent",
          padding: "0.5rem 0",
        };
    }
  };

  // Get separator component
  const renderSeparator = (index: number) => {
    if (index === processedItems.length - 1) return null;

    if (customSeparator) {
      return (
        <Box className="mx-2" style={{ color: colors.text.muted }}>
          {customSeparator}
        </Box>
      );
    }

    const separatorStyles: React.CSSProperties = {
      color: colors.text.muted,
      opacity: 0.6,
      margin: "0 0.5rem",
    };

    switch (separator) {
      case "chevron":
        return (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={separatorStyles}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        );

      case "arrow":
        return (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={separatorStyles}
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        );

      case "dot":
        return (
          <span
            style={{
              ...separatorStyles,
              fontSize: "1.5rem",
              lineHeight: "0.5",
            }}
          >
            •
          </span>
        );

      case "slash":
      default:
        return (
          <span style={{ ...separatorStyles, fontSize: "0.875rem" }}>/</span>
        );
    }
  };

  // Handle item click
  const handleItemClick = (item: BreadcrumbItem, index: number) => {
    if (item.disabled || item.id === "ellipsis") return;

    // Determine if this is the last item
    const isLastItem = index === processedItems.length - 1;

    // Don't navigate if it's the last item (current page)
    if (isLastItem && !item.href) return;

    if (onItemClick) {
      onItemClick(item, index);
    }

    // If href is provided and it's not the last item, navigation will happen
    if (item.href && !isLastItem) {
      window.location.href = item.href;
    }
  };

  // Truncate label if needed
  const truncateLabel = (label: string): string => {
    if (!truncate || label.length <= truncateLength) return label;
    return `${label.substring(0, truncateLength)}...`;
  };

  // Render breadcrumb item
  const renderItem = (item: BreadcrumbItem, index: number) => {
    const isLastItem = index === processedItems.length - 1;
    const isActive = activeItem ? item.id === activeItem : isLastItem;
    const isEllipsis = item.id === "ellipsis";

    // Determine styles based on state
    const itemStyles: React.CSSProperties = {
      color: isActive ? colors.text.primary : colors.text.secondary,
      fontWeight: isActive ? 600 : 400,
      opacity: item.disabled ? 0.5 : 1,
      cursor:
        item.disabled || (isLastItem && !item.href) ? "default" : "pointer",
      transition: "color 0.2s ease",
    };

    // Hover effect for clickable items
    const hoverStyles =
      !item.disabled && !isLastItem
        ? {
            color: colors.brand[500],
          }
        : {};

    // Size classes
    const sizeClass = condensed ? "text-sm" : "text-base";

    return (
      <React.Fragment key={item.id}>
        <Flex
          align="center"
          gap={2}
          className={sizeClass}
          style={itemStyles}
          onClick={() => handleItemClick(item, index)}
          onMouseEnter={(e) => {
            if (!item.disabled && !isLastItem) {
              e.currentTarget.style.color = colors.brand[500];
            }
          }}
          onMouseLeave={(e) => {
            if (!item.disabled && !isLastItem) {
              e.currentTarget.style.color = isActive
                ? colors.text.primary
                : colors.text.secondary;
            }
          }}
          role={isLastItem ? "link" : "button"}
          aria-current={isLastItem ? "page" : undefined}
          aria-disabled={item.disabled}
        >
          {item.icon && (
            <span style={{ display: "flex", alignItems: "center" }}>
              {item.icon}
            </span>
          )}

          <span title={item.label}>
            {isEllipsis ? item.label : truncateLabel(item.label)}
          </span>
        </Flex>

        {renderSeparator(index)}
      </React.Fragment>
    );
  };

  // Render custom children or default breadcrumbs
  const renderContent = () => {
    if (children) {
      return children;
    }

    return (
      <Flex align="center" wrap="wrap" gap={1}>
        {processedItems.map((item, index) => renderItem(item, index))}
      </Flex>
    );
  };

  return (
    <nav
      className={`breadcrumbs ${className}`}
      aria-label="Breadcrumb"
      {...props}
    >
      <Box style={getVariantStyles()}>{renderContent()}</Box>
    </nav>
  );
};

// Compact Breadcrumbs (preset)
export const CompactBreadcrumbs = (
  props: Omit<BreadcrumbsProps, "condensed">
) => <Breadcrumbs condensed={true} {...props} />;

// Solid Breadcrumbs (preset)
export const SolidBreadcrumbs = (props: Omit<BreadcrumbsProps, "variant">) => (
  <Breadcrumbs variant="solid" {...props} />
);

// Breadcrumbs with Chevrons (preset)
export const ChevronBreadcrumbs = (
  props: Omit<BreadcrumbsProps, "separator">
) => <Breadcrumbs separator="chevron" {...props} />;

// Auto-collapsing Breadcrumbs (for mobile/responsive)
export interface ResponsiveBreadcrumbsProps
  extends Omit<BreadcrumbsProps, "maxItems"> {
  /** Breakpoint for collapsing (in pixels) */
  collapseBreakpoint?: number;
}

export const ResponsiveBreadcrumbs = ({
  collapseBreakpoint = 768,
  items,
  ...props
}: ResponsiveBreadcrumbsProps) => {
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Collapse to 3 items on small screens
  const maxItems = windowWidth < collapseBreakpoint ? 3 : undefined;

  return <Breadcrumbs items={items} maxItems={maxItems} {...props} />;
};

// Breadcrumb Item component (for custom composition)
export interface BreadcrumbItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  item: BreadcrumbItem;
  isActive?: boolean;
  isLast?: boolean;
  onClick?: () => void;
}

export const BreadcrumbItemComponent = ({
  item,
  isActive = false,
  isLast = false,
  onClick,
  className = "",
  ...props
}: BreadcrumbItemProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  const itemStyles: React.CSSProperties = {
    color: isActive ? colors.text.primary : colors.text.secondary,
    fontWeight: isActive ? 600 : 400,
    opacity: item.disabled ? 0.5 : 1,
    cursor: item.disabled || isLast ? "default" : "pointer",
    transition: "color 0.2s ease",
  };

  return (
    <Flex
      align="center"
      gap={2}
      className={`text-base ${className}`}
      style={itemStyles}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!item.disabled && !isLast) {
          e.currentTarget.style.color = colors.brand[500];
        }
      }}
      onMouseLeave={(e) => {
        if (!item.disabled && !isLast) {
          e.currentTarget.style.color = isActive
            ? colors.text.primary
            : colors.text.secondary;
        }
      }}
      {...props}
    >
      {item.icon && (
        <span style={{ display: "flex", alignItems: "center" }}>
          {item.icon}
        </span>
      )}
      <span>{item.label}</span>
    </Flex>
  );
};

// No separate type exports needed - interfaces are exported above
