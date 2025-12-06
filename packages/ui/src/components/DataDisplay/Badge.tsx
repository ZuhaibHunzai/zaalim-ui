import React from "react";
import { useTheme } from "../../contexts/themeContext";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;

  // Variants
  variant?:
    | "brand"
    | "neutral"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "accent";

  // Style
  styleVariant?: "solid" | "outline" | "subtle";

  // Size
  size?: "sm" | "md" | "lg";

  // Icon
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";

  // Dot indicator
  withDot?: boolean;
  dotPosition?: "left" | "right";

  // Pill shape
  pill?: boolean;

  // Interactive
  interactive?: boolean;
  onRemove?: () => void;
  removeLabel?: string;
}

export const Badge = ({
  children,
  className = "",
  variant = "neutral",
  styleVariant = "solid",
  size = "md",
  icon,
  iconPosition = "left",
  withDot = false,
  dotPosition = "left",
  pill = false,
  interactive = false,
  onRemove,
  removeLabel = "Remove",
  ...props
}: BadgeProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  // Get variant color
  const getVariantColor = () => {
    switch (variant) {
      case "brand":
        return {
          bg: colors.brand[500],
          text: colors.brand[600],
          border: colors.brand[400],
          subtle: colors.brand[50],
        };
      case "success":
        return {
          bg: colors.success,
          text: "#FFFFFF",
          border: "#16A34A", // success-600
          subtle: "#DCFCE7", // success-50
        };
      case "warning":
        return {
          bg: colors.warning,
          text: "#FFFFFF",
          border: "#D97706", // warning-600
          subtle: "#FEF3C7", // warning-50
        };
      case "error":
        return {
          bg: colors.error,
          text: "#FFFFFF",
          border: "#DC2626", // error-600
          subtle: "#FEE2E2", // error-50
        };
      case "info":
        return {
          bg: colors.info,
          text: "#FFFFFF",
          border: "#0284C7", // info-600
          subtle: "#E0F2FE", // info-50
        };
      case "accent":
        return {
          bg: colors.accent,
          text: "#FFFFFF",
          border: "#8B5CF6", // accent-600
          subtle: "#F3E8FF", // accent-50
        };
      case "neutral":
      default:
        return {
          bg: colors.surfaceHover,
          text: colors.text.secondary,
          border: colors.border,
          subtle: colors.surfaceHover,
        };
    }
  };

  const variantColor = getVariantColor();

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-xs px-2 py-0.5";
      case "md":
        return "text-sm px-2.5 py-1";
      case "lg":
        return "text-base px-3 py-1.5";
      default:
        return "text-sm px-2.5 py-1";
    }
  };

  // Get style classes
  const getStyleClasses = () => {
    switch (styleVariant) {
      case "solid":
        return {
          backgroundColor: variantColor.bg,
          color: variantColor.text,
          border: "none",
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          color: variantColor.bg,
          border: `1px solid ${variantColor.border}`,
        };
      case "subtle":
        return {
          backgroundColor: variantColor.subtle,
          color: variantColor.bg,
          border: "none",
        };
      default:
        return {
          backgroundColor: variantColor.bg,
          color: variantColor.text,
          border: "none",
        };
    }
  };

  // Build inline styles
  const getStyles = (): React.CSSProperties => {
    const baseStyles = getStyleClasses();

    return {
      ...baseStyles,
      borderRadius: pill ? "9999px" : "0.375rem", // 6px or full
    };
  };

  // Render dot
  const renderDot = () => (
    <span
      className={`shrink-0 rounded-full ${
        size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2"
      }`}
      style={{
        backgroundColor:
          styleVariant === "solid" ? variantColor.text : variantColor.bg,
      }}
    />
  );

  // Render remove button
  const renderRemoveButton = () => (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onRemove?.();
      }}
      className="ml-1.5 -mr-1 p-0.5 rounded-sm hover:bg-white/20 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white/50"
      aria-label={removeLabel}
      style={{
        fontSize: size === "sm" ? "0.625rem" : "0.75rem",
      }}
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="7.5" y1="2.5" x2="2.5" y2="7.5" />
        <line x1="2.5" y1="2.5" x2="7.5" y2="7.5" />
      </svg>
    </button>
  );

  const styles = getStyles();
  const sizeClasses = getSizeClasses();
  const hasContent = children || icon;

  return (
    <span
      className={`inline-flex items-center justify-center font-medium leading-none whitespace-nowrap ${sizeClasses} ${
        interactive ? "cursor-pointer hover:opacity-90 transition-opacity" : ""
      } ${className}`}
      style={styles}
      {...props}
    >
      {/* Left dot */}
      {withDot && dotPosition === "left" && (
        <div className="mr-1.5">{renderDot()}</div>
      )}

      {/* Left icon */}
      {icon && iconPosition === "left" && (
        <span className="mr-1.5" style={{ fontSize: "0.875em" }}>
          {icon}
        </span>
      )}

      {/* Content */}
      {hasContent && children}

      {/* Right icon */}
      {icon && iconPosition === "right" && (
        <span className="ml-1.5" style={{ fontSize: "0.875em" }}>
          {icon}
        </span>
      )}

      {/* Right dot */}
      {withDot && dotPosition === "right" && (
        <div className="ml-1.5">{renderDot()}</div>
      )}

      {/* Remove button */}
      {onRemove && renderRemoveButton()}
    </span>
  );
};

// Pre-built badge variants for convenience
export const SuccessBadge = (props: Omit<BadgeProps, "variant">) => (
  <Badge variant="success" {...props} />
);

export const WarningBadge = (props: Omit<BadgeProps, "variant">) => (
  <Badge variant="warning" {...props} />
);

export const ErrorBadge = (props: Omit<BadgeProps, "variant">) => (
  <Badge variant="error" {...props} />
);

export const InfoBadge = (props: Omit<BadgeProps, "variant">) => (
  <Badge variant="info" {...props} />
);

export const BrandBadge = (props: Omit<BadgeProps, "variant">) => (
  <Badge variant="brand" {...props} />
);

// Status badge with dot
export const StatusBadge = ({
  status = "neutral",
  ...props
}: Omit<BadgeProps, "variant" | "withDot"> & {
  status?: BadgeProps["variant"];
}) => <Badge variant={status} withDot {...props} />;

// Count badge (for notifications)
export const CountBadge = ({
  count,
  max = 99,
  ...props
}: Omit<BadgeProps, "children"> & { count: number; max?: number }) => {
  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <Badge variant={count > 0 ? "error" : "neutral"} pill size="sm" {...props}>
      {displayCount}
    </Badge>
  );
};
