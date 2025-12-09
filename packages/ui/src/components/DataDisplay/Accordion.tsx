// packages/ui/src/components/DataDisplay/Accordion.tsx
import React, { useState, useCallback, createContext, useContext } from "react";
import { useTheme } from "../../contexts/themeContext";
import { Box } from "../foundation/Box";
import { Flex } from "../foundation/Flex";
import { Badge } from "./Badge";
import { Chip } from "./Chip";

// ============================================
// Types and Interfaces
// ============================================

export type AccordionVariant = "default" | "bordered" | "card" | "ghost";
export type AccordionSize = "sm" | "md" | "lg";
export type AccordionIconPosition = "left" | "right";
export type AccordionExpandIcon = "chevron" | "plus" | "arrow" | "custom";

export interface AccordionItem {
  /** Unique identifier for the accordion item */
  id: string;

  /** Item title/header */
  title: string;

  /** Item content */
  content: React.ReactNode;

  /** Item description/subtitle */
  description?: string;

  /** Icon to display in header */
  icon?: React.ReactNode;

  /** Badge content */
  badge?: string | React.ReactNode;

  /** Chip content */
  chip?: string | React.ReactNode;

  /** Whether item is disabled */
  disabled?: boolean;

  /** Whether item is expanded by default */
  defaultExpanded?: boolean;

  /** Custom header content (overrides title/description) */
  header?: React.ReactNode;

  /** Additional data */
  data?: Record<string, any>;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accordion items */
  items?: AccordionItem[];

  /** Controlled expanded item IDs */
  expandedItems?: string[];

  /** Callback when items expand/collapse */
  onExpandedChange?: (expandedIds: string[]) => void;

  /** Whether multiple items can be expanded at once */
  allowMultiple?: boolean;

  /** Whether to allow collapsing all items */
  allowCollapseAll?: boolean;

  /** Variant style */
  variant?: AccordionVariant;

  /** Size */
  size?: AccordionSize;

  /** Position of expand icon */
  iconPosition?: AccordionIconPosition;

  /** Type of expand icon */
  expandIcon?: AccordionExpandIcon;

  /** Custom expand icon */
  customExpandIcon?: {
    expanded: React.ReactNode;
    collapsed: React.ReactNode;
  };

  /** Whether to show dividers between items */
  dividers?: boolean;

  /** Animation duration in milliseconds */
  animationDuration?: number;

  /** Additional CSS classes */
  className?: string;

  /** Children for custom composition */
  children?: React.ReactNode;
}

// ============================================
// Accordion Context
// ============================================

interface AccordionContextType {
  variant: AccordionVariant;
  size: AccordionSize;
  iconPosition: AccordionIconPosition;
  expandIcon: AccordionExpandIcon;
  customExpandIcon?: AccordionProps["customExpandIcon"];
  expandedItems: string[];
  toggleItem: (id: string) => void;
  animationDuration: number;
}

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
};

// ============================================
// Main Accordion Component
// ============================================

export const Accordion = ({
  items,
  expandedItems: controlledExpandedItems,
  onExpandedChange,
  allowMultiple = false,
  allowCollapseAll = true,
  variant = "default",
  size = "md",
  iconPosition = "right",
  expandIcon = "chevron",
  customExpandIcon,
  dividers = true,
  animationDuration = 300,
  className = "",
  children,
  ...props
}: AccordionProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  // State for uncontrolled usage
  const [internalExpandedItems, setInternalExpandedItems] = useState<string[]>(
    items?.filter((item) => item.defaultExpanded).map((item) => item.id) || []
  );

  // Determine expanded items (controlled vs uncontrolled)
  const expandedItems =
    controlledExpandedItems !== undefined
      ? controlledExpandedItems
      : internalExpandedItems;

  // Toggle item expansion
  const toggleItem = useCallback(
    (id: string) => {
      const isExpanded = expandedItems.includes(id);
      let newExpandedItems: string[];

      if (allowMultiple) {
        if (isExpanded) {
          newExpandedItems = expandedItems.filter((itemId) => itemId !== id);
        } else {
          newExpandedItems = [...expandedItems, id];
        }
      } else {
        // Single expand mode
        if (isExpanded && allowCollapseAll) {
          newExpandedItems = [];
        } else {
          newExpandedItems = [id];
        }
      }

      // Update state
      if (controlledExpandedItems === undefined) {
        setInternalExpandedItems(newExpandedItems);
      }

      // Call callback
      if (onExpandedChange) {
        onExpandedChange(newExpandedItems);
      }
    },
    [
      expandedItems,
      allowMultiple,
      allowCollapseAll,
      controlledExpandedItems,
      onExpandedChange,
    ]
  );

  // Expand all items
  const expandAll = useCallback(() => {
    if (!items) return;

    const allIds = items.map((item) => item.id);
    if (controlledExpandedItems === undefined) {
      setInternalExpandedItems(allIds);
    }
    if (onExpandedChange) {
      onExpandedChange(allIds);
    }
  }, [items, controlledExpandedItems, onExpandedChange]);

  // Collapse all items
  const collapseAll = useCallback(() => {
    if (controlledExpandedItems === undefined) {
      setInternalExpandedItems([]);
    }
    if (onExpandedChange) {
      onExpandedChange([]);
    }
  }, [controlledExpandedItems, onExpandedChange]);

  // Context value
  const contextValue: AccordionContextType = {
    variant,
    size,
    iconPosition,
    expandIcon,
    customExpandIcon,
    expandedItems,
    toggleItem,
    animationDuration,
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
      case "ghost":
        return {
          backgroundColor: "transparent",
        };
      case "default":
      default:
        return {
          backgroundColor: "transparent",
        };
    }
  };

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return {
          text: "text-sm",
          padding: "py-2 px-3",
          iconSize: "1rem",
        };
      case "md":
        return {
          text: "text-base",
          padding: "py-3 px-4",
          iconSize: "1.25rem",
        };
      case "lg":
        return {
          text: "text-lg",
          padding: "py-4 px-5",
          iconSize: "1.5rem",
        };
      default:
        return {
          text: "text-base",
          padding: "py-3 px-4",
          iconSize: "1.25rem",
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeClasses = getSizeClasses();

  // Render items from props
  const renderItems = () => {
    if (!items) return null;

    return (
      <div>
        {items.map((item, index) => (
          <AccordionItemComponent
            key={item.id}
            item={item}
            isLast={index === items.length - 1}
            dividers={dividers}
          />
        ))}
      </div>
    );
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <Box
        className={`accordion ${className}`}
        style={variantStyles}
        {...props}
      >
        {/* Optional expand/collapse all controls */}
        {allowMultiple && items && items.length > 0 && (
          <Flex
            justify="end"
            className="p-3 border-b"
            style={{ borderColor: colors.surfaceBorder }}
          >
            <Flex gap={2}>
              <button
                onClick={expandAll}
                className="text-sm px-3 py-1 rounded transition-colors"
                style={{
                  backgroundColor: colors.surfaceHover,
                  color: colors.text.primary,
                }}
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="text-sm px-3 py-1 rounded transition-colors"
                style={{
                  backgroundColor: colors.surfaceHover,
                  color: colors.text.primary,
                }}
              >
                Collapse All
              </button>
            </Flex>
          </Flex>
        )}

        {children || renderItems()}
      </Box>
    </AccordionContext.Provider>
  );
};

// ============================================
// Accordion Item Component
// ============================================

export interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Accordion item data */
  item: AccordionItem;

  /** Whether this is the last item */
  isLast?: boolean;

  /** Whether to show dividers */
  dividers?: boolean;

  /** Additional CSS classes */
  className?: string;
}

export const AccordionItemComponent = ({
  item,
  isLast = false,
  dividers = true,
  className = "",
  ...props
}: AccordionItemProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const context = useAccordionContext();

  const isExpanded = context.expandedItems.includes(item.id);
  const isDisabled = item.disabled;

  // Get variant-specific styles
  const getItemStyles = () => {
    const styles: React.CSSProperties = {};

    switch (context.variant) {
      case "bordered":
      case "card":
        if (!isLast && dividers) {
          styles.borderBottom = `1px solid ${colors.surfaceBorder}`;
        }
        break;
      case "ghost":
        styles.backgroundColor = isExpanded
          ? colors.surfaceHover
          : "transparent";
        if (!isLast && dividers) {
          styles.borderBottom = `1px solid ${colors.surfaceBorder}40`;
        }
        break;
      case "default":
      default:
        if (!isLast && dividers) {
          styles.borderBottom = `1px solid ${colors.surfaceBorder}`;
        }
        break;
    }

    return styles;
  };

  // Get size classes
  const getSizeClasses = () => {
    switch (context.size) {
      case "sm":
        return {
          headerPadding: "py-2 px-3",
          contentPadding: "py-2 px-3",
          titleSize: "text-sm",
          descriptionSize: "text-xs",
        };
      case "md":
        return {
          headerPadding: "py-3 px-4",
          contentPadding: "py-3 px-4",
          titleSize: "text-base",
          descriptionSize: "text-sm",
        };
      case "lg":
        return {
          headerPadding: "py-4 px-5",
          contentPadding: "py-4 px-5",
          titleSize: "text-lg",
          descriptionSize: "text-base",
        };
      default:
        return {
          headerPadding: "py-3 px-4",
          contentPadding: "py-3 px-4",
          titleSize: "text-base",
          descriptionSize: "text-sm",
        };
    }
  };

  // Render expand icon
  const renderExpandIcon = () => {
    const { expandIcon, customExpandIcon, iconPosition } = context;

    if (customExpandIcon) {
      return isExpanded
        ? customExpandIcon.expanded
        : customExpandIcon.collapsed;
    }

    const iconStyle: React.CSSProperties = {
      transition: `transform ${context.animationDuration}ms ease`,
      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
      color: colors.text.muted,
    };

    switch (expandIcon) {
      case "plus":
        return (
          <svg
            width={
              context.size === "sm" ? "14" : context.size === "md" ? "16" : "18"
            }
            height={
              context.size === "sm" ? "14" : context.size === "md" ? "16" : "18"
            }
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={iconStyle}
          >
            {isExpanded ? (
              <line x1="5" y1="12" x2="19" y2="12" />
            ) : (
              <>
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </>
            )}
          </svg>
        );

      case "arrow":
        return (
          <svg
            width={
              context.size === "sm" ? "14" : context.size === "md" ? "16" : "18"
            }
            height={
              context.size === "sm" ? "14" : context.size === "md" ? "16" : "18"
            }
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={iconStyle}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        );

      case "chevron":
      default:
        return (
          <svg
            width={
              context.size === "sm" ? "14" : context.size === "md" ? "16" : "18"
            }
            height={
              context.size === "sm" ? "14" : context.size === "md" ? "16" : "18"
            }
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={iconStyle}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        );
    }
  };

  // Handle header click
  const handleHeaderClick = () => {
    if (!isDisabled) {
      context.toggleItem(item.id);
    }
  };

  // Handle key down
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleHeaderClick();
    }
  };

  const sizeClasses = getSizeClasses();
  const itemStyles = getItemStyles();

  return (
    <Box
      className={`accordion-item ${className}`}
      style={itemStyles}
      {...props}
    >
      {/* Header */}
      <div
        className={`
          flex items-center justify-between
          ${sizeClasses.headerPadding}
          ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          transition-colors
          ${context.variant === "ghost" && isExpanded ? "bg-surfaceHover" : ""}
          hover:${!isDisabled ? "bg-surfaceHover" : ""}
        `}
        onClick={handleHeaderClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        aria-expanded={isExpanded}
        aria-disabled={isDisabled}
        aria-controls={`accordion-content-${item.id}`}
        id={`accordion-header-${item.id}`}
      >
        {/* Left side: Icon + Content */}
        <Flex align="center" gap={3} className="flex-1 min-w-0">
          {/* Custom icon or expand icon on left */}
          {context.iconPosition === "left" && (
            <div className="flex-shrink-0">{renderExpandIcon()}</div>
          )}

          {/* Item icon */}
          {item.icon && (
            <div className="flex-shrink-0" style={{ color: colors.text.muted }}>
              {item.icon}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            {item.header ? (
              item.header
            ) : (
              <>
                <Flex align="center" gap={2} className="flex-wrap">
                  <div
                    className={`font-medium ${sizeClasses.titleSize}`}
                    style={{ color: colors.text.primary }}
                  >
                    {item.title}
                  </div>

                  {/* Badge */}
                  {item.badge && typeof item.badge === "string" ? (
                    <Badge size={context.size === "sm" ? "sm" : "md"}>
                      {item.badge}
                    </Badge>
                  ) : (
                    item.badge
                  )}

                  {/* Chip */}
                  {item.chip && typeof item.chip === "string" ? (
                    <Chip size={context.size === "sm" ? "sm" : "md"}>
                      {item.chip}
                    </Chip>
                  ) : (
                    item.chip
                  )}
                </Flex>

                {item.description && (
                  <div
                    className={`mt-1 ${sizeClasses.descriptionSize}`}
                    style={{ color: colors.text.secondary }}
                  >
                    {item.description}
                  </div>
                )}
              </>
            )}
          </div>
        </Flex>

        {/* Right side: Expand icon */}
        {context.iconPosition === "right" && (
          <div className="flex-shrink-0 ml-3">{renderExpandIcon()}</div>
        )}
      </div>

      {/* Content */}
      <div
        id={`accordion-content-${item.id}`}
        role="region"
        aria-labelledby={`accordion-header-${item.id}`}
        className="overflow-hidden transition-all"
        style={{
          maxHeight: isExpanded ? "1000px" : "0",
          opacity: isExpanded ? 1 : 0,
          transition: `max-height ${context.animationDuration}ms ease, opacity ${context.animationDuration}ms ease`,
        }}
      >
        <div className={sizeClasses.contentPadding}>{item.content}</div>
      </div>
    </Box>
  );
};

// ============================================
// Accordion Item (for composition)
// ============================================

export interface AccordionItemCompositionProps
  extends Omit<AccordionItemProps, "item"> {
  id: string;
  title: string;
  children: React.ReactNode;
  description?: string;
  icon?: React.ReactNode;
  badge?: string | React.ReactNode;
  chip?: string | React.ReactNode;
  disabled?: boolean;
  defaultExpanded?: boolean;
  header?: React.ReactNode;
}

export const AccordionItem = ({
  id,
  title,
  children,
  description,
  icon,
  badge,
  chip,
  disabled,
  defaultExpanded,
  header,
  ...props
}: AccordionItemCompositionProps) => {
  const item: AccordionItem = {
    id,
    title,
    content: children,
    description,
    icon,
    badge,
    chip,
    disabled,
    defaultExpanded,
    header,
  };

  return <AccordionItemComponent item={item} {...props} />;
};

// ============================================
// Preset Accordion Components
// ============================================

// Compact Accordion
export const CompactAccordion = (props: Omit<AccordionProps, "size">) => (
  <Accordion size="sm" {...props} />
);

// Card Accordion
export const CardAccordion = (props: Omit<AccordionProps, "variant">) => (
  <Accordion variant="card" {...props} />
);

// Bordered Accordion
export const BorderedAccordion = (props: Omit<AccordionProps, "variant">) => (
  <Accordion variant="bordered" {...props} />
);

// Ghost Accordion (minimal)
export const GhostAccordion = (props: Omit<AccordionProps, "variant">) => (
  <Accordion variant="ghost" {...props} />
);

// Single Select Accordion (only one item expanded at a time)
export const SingleAccordion = (
  props: Omit<AccordionProps, "allowMultiple">
) => <Accordion allowMultiple={false} {...props} />;

// FAQ Accordion (special styling for FAQs)
export interface FAQAccordionProps
  extends Omit<AccordionProps, "variant" | "iconPosition" | "expandIcon"> {
  showIndex?: boolean;
}

export const FAQAccordion = ({
  showIndex = true,
  items,
  ...props
}: FAQAccordionProps) => {
  return (
    <Accordion
      variant="ghost"
      iconPosition="right"
      expandIcon="plus"
      items={items?.map((item, index) => ({
        ...item,
        icon: showIndex ? (
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-100 text-brand-600 font-semibold text-sm">
            {index + 1}
          </div>
        ) : (
          item.icon
        ),
      }))}
      {...props}
    />
  );
};

// Stats Accordion (with numbers/counts)
export interface StatsAccordionItem extends Omit<AccordionItem, "badge"> {
  stat?: string | number;
  statColor?: "brand" | "success" | "warning" | "error" | "info";
}

export interface StatsAccordionProps extends Omit<AccordionProps, "items"> {
  items: StatsAccordionItem[];
}

export const StatsAccordion = ({ items, ...props }: StatsAccordionProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  const statColorMap = {
    brand: colors.brand[500],
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
  };

  const processedItems: AccordionItem[] = items.map((item) => {
    const { stat, statColor, ...rest } = item;

    const accordionItem: AccordionItem = {
      ...rest,
    };

    // Convert stat to badge if provided
    if (stat !== undefined) {
      accordionItem.badge = (
        <div
          className="font-semibold px-2 py-1 rounded text-sm"
          style={{
            backgroundColor: `${statColorMap[statColor || "brand"]}15`,
            color: statColorMap[statColor || "brand"],
          }}
        >
          {stat}
        </div>
      );
    }

    return accordionItem;
  });

  return <Accordion items={processedItems} {...props} />;
};

// No separate type exports needed - interfaces are exported above
