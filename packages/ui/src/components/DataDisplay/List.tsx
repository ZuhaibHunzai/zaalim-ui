import React from "react";
import { useTheme } from "../../contexts/themeContext";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import { Chip } from "./Chip";

// ============================================
// List Component
// ============================================

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "bordered" | "striped" | "card";
  size?: "sm" | "md" | "lg";
  dividers?: boolean;
  hoverable?: boolean;
  selectable?: boolean;
  selectedItems?: string[];
  onItemSelect?: (id: string) => void;
}

export const List = ({
  children,
  className = "",
  variant = "default",
  size = "md",
  dividers = true,
  hoverable = true,
  selectable = false,
  selectedItems = [],
  onItemSelect,
  ...props
}: ListProps) => {
  const { theme } = useTheme();

  // Get variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case "bordered":
        return "border border-border rounded-lg divide-y divide-border";
      case "striped":
        return "divide-y divide-border";
      case "card":
        return "space-y-3";
      case "default":
      default:
        return "";
    }
  };

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

  const variantClasses = getVariantClasses();
  const sizeClasses = getSizeClasses();

  // Clone children with context props
  const enhancedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const childProps: any = {
        size,
        dividers,
        hoverable,
        selectable,
        variant,
        selectedItems,
        onItemSelect,
        index,
      };

      // If it's a ListItem, pass additional props
      if (child.type === ListItem) {
        const itemId = (child.props as any).id || `list-item-${index}`;
        const isSelected = selectedItems.includes(itemId);
        childProps.id = itemId;
        childProps.selected = isSelected;
      }

      return React.cloneElement(child as React.ReactElement<any>, childProps);
    }
    return child;
  });

  return (
    <ul
      className={`list-none p-0 m-0 ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {enhancedChildren}
    </ul>
  );
};

// ============================================
// ListItem Component
// ============================================

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
  className?: string;
  id?: string;

  // Context props (passed from List)
  size?: "sm" | "md" | "lg";
  dividers?: boolean;
  hoverable?: boolean;
  selectable?: boolean;
  selected?: boolean;
  variant?: "default" | "bordered" | "striped" | "card";
  index?: number;

  // Actions
  actions?: React.ReactNode;
  startAction?: React.ReactNode;
  endAction?: React.ReactNode;

  // Avatar
  avatarSrc?: string;
  avatarAlt?: string;
  avatarFallback?: string;

  // Badge
  badge?: string | React.ReactNode;

  // Chip
  chip?: string | React.ReactNode;

  // Metadata
  title?: string;
  description?: string;
  metadata?: string | React.ReactNode;

  // States
  disabled?: boolean;
  active?: boolean;
}

export const ListItem = ({
  children,
  className = "",
  id,

  // Context
  size = "md",
  dividers = true,
  hoverable = true,
  selectable = false,
  selected = false,
  variant = "default",
  index,

  // Actions
  actions,
  startAction,
  endAction,

  // Avatar
  avatarSrc,
  avatarAlt,
  avatarFallback,

  // Badge
  badge,

  // Chip
  chip,

  // Metadata
  title,
  description,
  metadata,

  // States
  disabled = false,
  active = false,

  // Event handlers
  onClick,
  ...props
}: ListItemProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  const itemId = id || `list-item-${index}`;

  // Handle click
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (disabled) return;

    if (onClick) {
      onClick(e);
    }
  };

  // Get padding based on size
  const getPadding = () => {
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

  // Get styles based on variant and state
  const getStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {};

    if (active) {
      styles.backgroundColor = colors.surfaceHover;
    }

    if (variant === "striped") {
      if (index !== undefined && index % 2 === 0) {
        styles.backgroundColor = colors.backgroundSubtle;
      }
    }

    if (selected) {
      styles.backgroundColor = colors.brand[50];
      styles.borderLeft = `3px solid ${colors.brand[500]}`;
    }

    return styles;
  };

  const padding = getPadding();
  const styles = getStyles();

  // Render content
  const renderContent = () => {
    if (children) {
      return children;
    }

    return (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Start Action (Checkbox, Radio, etc.) */}
          {startAction && <div className="shrink-0">{startAction}</div>}

          {/* Avatar */}
          {(avatarSrc || avatarFallback) && (
            <Avatar
              src={avatarSrc}
              alt={avatarAlt || "Avatar"}
              fallback={avatarFallback}
              size={size === "sm" ? "sm" : "md"}
            />
          )}

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <div className="flex items-center gap-2">
                <span className="font-medium truncate text-text-primary">
                  {title}
                </span>
                {badge && typeof badge === "string" ? (
                  <Badge size="sm">{badge}</Badge>
                ) : (
                  badge
                )}
                {chip && typeof chip === "string" ? (
                  <Chip size="sm">{chip}</Chip>
                ) : (
                  chip
                )}
              </div>
            )}

            {description && (
              <div className="text-sm truncate text-text-secondary mt-0.5">
                {description}
              </div>
            )}

            {metadata && (
              <div className="text-xs text-text-muted mt-1">{metadata}</div>
            )}
          </div>
        </div>

        {/* End Action */}
        <div className="flex items-center gap-2 ml-4">
          {endAction && <div className="shrink-0">{endAction}</div>}
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      </div>
    );
  };

  return (
    <li
      id={itemId}
      className={`
        ${padding}
        ${
          dividers && variant !== "card"
            ? "border-b border-border last:border-b-0"
            : ""
        }
        ${
          hoverable && !disabled
            ? "hover:bg-surfaceHover transition-colors"
            : ""
        }
        ${selectable ? "cursor-pointer" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${variant === "card" ? "bg-surface rounded-lg shadow-sm" : ""}
        ${className}
      `}
      style={styles}
      onClick={handleClick}
      role={selectable ? "option" : "listitem"}
      aria-selected={selectable ? selected : undefined}
      aria-disabled={disabled}
      {...props}
    >
      {renderContent()}
    </li>
  );
};

// ============================================
// ListHeader Component
// ============================================

export interface ListHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

export const ListHeader = ({
  children,
  className = "",
  title,
  description,
  actions,
  ...props
}: ListHeaderProps) => {
  if (children) {
    return (
      <div
        className={`py-3 px-4 border-b border-border bg-backgroundSubtle ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-between py-3 px-4 border-b border-border bg-backgroundSubtle ${className}`}
      {...props}
    >
      <div>
        {title && <h3 className="font-semibold text-text-primary">{title}</h3>}
        {description && (
          <p className="text-sm text-text-secondary mt-0.5">{description}</p>
        )}
      </div>
      {actions && <div>{actions}</div>}
    </div>
  );
};

// ============================================
// ListFooter Component
// ============================================

export interface ListFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const ListFooter = ({
  children,
  className = "",
  ...props
}: ListFooterProps) => (
  <div
    className={`py-3 px-4 border-t border-border bg-backgroundSubtle ${className}`}
    {...props}
  >
    {children}
  </div>
);

// ============================================
// ListEmpty Component
// ============================================

export interface ListEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const ListEmpty = ({
  title = "No items",
  description = "There are no items to display.",
  icon,
  action,
  className = "",
  ...props
}: ListEmptyProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={`flex flex-col items-center justify-center py-12 text-center ${className}`}
      {...props}
    >
      {icon || (
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: theme.colors.surfaceHover }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.colors.text.muted}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
      )}
      <h3 className="font-medium text-text-primary mb-1">{title}</h3>
      <p className="text-text-secondary text-sm max-w-sm mb-4">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

// ============================================
// ListLoading Component
// ============================================

export interface ListLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
}

export const ListLoading = ({
  count = 3,
  className = "",
  ...props
}: ListLoadingProps) => {
  const { theme } = useTheme();

  return (
    <div className={`space-y-3 ${className}`} {...props}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center gap-3 py-3 px-4">
          <div
            className="w-10 h-10 rounded-full animate-pulse"
            style={{ backgroundColor: theme.colors.surfaceHover }}
          />
          <div className="flex-1 space-y-2">
            <div
              className="h-4 rounded animate-pulse"
              style={{
                backgroundColor: theme.colors.surfaceHover,
                width: `${Math.random() * 40 + 40}%`,
              }}
            />
            <div
              className="h-3 rounded animate-pulse"
              style={{
                backgroundColor: theme.colors.surfaceHover,
                width: `${Math.random() * 30 + 30}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
