// packages/ui/src/components/feedback/Alert.tsx
import React, { useState } from "react";
import { useTheme } from "../../contexts/themeContext";
import { Card, CardProps } from "../Card";

// ============================================
// Types and Interfaces
// ============================================

export type AlertVariant = "default" | "filled" | "outline" | "subtle";
export type AlertSize = "sm" | "md" | "lg";
export type AlertStatus = "info" | "success" | "warning" | "error" | "neutral";

export interface AlertProps {
  /** Alert title */
  title?: string;

  /** Alert description/message */
  description?: string;

  /** Alert content (alternative to title/description) */
  children?: React.ReactNode;

  /** Alert status/type */
  status?: AlertStatus;

  /** Alert variant */
  variant?: AlertVariant;

  /** Alert size */
  size?: AlertSize;

  /** Whether alert is dismissible */
  dismissible?: boolean;

  /** Callback when alert is dismissed */
  onDismiss?: () => void;

  /** Custom icon (overrides default status icon) */
  icon?: React.ReactNode;

  /** Whether to show icon */
  showIcon?: boolean;

  /** Action buttons/links */
  actions?: React.ReactNode;

  /** Whether alert is inline (no margin) */
  inline?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** Additional styles */
  style?: React.CSSProperties;
}

// ============================================
// Main Alert Component
// ============================================

export const Alert = ({
  title,
  description,
  children,
  status = "info",
  variant = "default",
  size = "md",
  dismissible = false,
  onDismiss,
  icon,
  showIcon = true,
  actions,
  inline = false,
  className = "",
  style,
}: AlertProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const [isDismissed, setIsDismissed] = useState(false);

  // Don't render if dismissed
  if (isDismissed) return null;

  // Get status colors from theme ONLY
  const getStatusColors = () => {
    switch (status) {
      case "success":
        return {
          main: colors.success,
          subtle: colors.backgroundSubtle,
          text: colors.text.primary,
          icon: colors.success,
        };
      case "warning":
        return {
          main: colors.warning,
          subtle: colors.backgroundSubtle,
          text: colors.text.primary,
          icon: colors.warning,
        };
      case "error":
        return {
          main: colors.error,
          subtle: colors.backgroundSubtle,
          text: colors.text.primary,
          icon: colors.error,
        };
      case "neutral":
        return {
          main: colors.secondary,
          subtle: colors.backgroundSubtle,
          text: colors.text.primary,
          icon: colors.text.secondary,
        };
      case "info":
      default:
        return {
          main: colors.info,
          subtle: colors.backgroundSubtle,
          text: colors.text.primary,
          icon: colors.info,
        };
    }
  };

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return {
          padding: "sm" as const,
          titleSize: "text-sm",
          descriptionSize: "text-xs",
          iconSize: "1rem",
          gap: "0.5rem",
        };
      case "md":
        return {
          padding: "md" as const,
          titleSize: "text-base",
          descriptionSize: "text-sm",
          iconSize: "1.25rem",
          gap: "0.75rem",
        };
      case "lg":
        return {
          padding: "lg" as const,
          titleSize: "text-lg",
          descriptionSize: "text-base",
          iconSize: "1.5rem",
          gap: "1rem",
        };
      default:
        return {
          padding: "md" as const,
          titleSize: "text-base",
          descriptionSize: "text-sm",
          iconSize: "1.25rem",
          gap: "0.75rem",
        };
    }
  };

  // Get variant styles using ONLY theme colors
  const getVariantStyles = () => {
    const statusColors = getStatusColors();

    const baseStyle: React.CSSProperties = {};

    switch (variant) {
      case "filled":
        baseStyle.backgroundColor = statusColors.main;
        baseStyle.color = colors.text.inverted;
        baseStyle.border = `1px solid ${colors.surfaceBorder}`;
        break;
      case "outline":
        baseStyle.backgroundColor = colors.background;
        baseStyle.color = statusColors.main;
        baseStyle.border = `1px solid ${statusColors.main}`;
        break;
      case "subtle":
        baseStyle.backgroundColor = statusColors.subtle;
        baseStyle.color = statusColors.text;
        baseStyle.border = `1px solid ${colors.surfaceBorder}`;
        break;
      case "default":
      default:
        baseStyle.backgroundColor = colors.surface;
        baseStyle.color = colors.text.primary;
        baseStyle.border = `1px solid ${colors.surfaceBorder}`;
        baseStyle.borderLeft = `4px solid ${statusColors.main}`;
        break;
    }

    return baseStyle;
  };

  // Get default icon for status using theme colors
  const getStatusIcon = () => {
    if (icon) return icon;

    const statusColors = getStatusColors();
    const iconColor =
      variant === "filled" ? colors.text.inverted : statusColors.icon;
    const iconSize = getSizeClasses().iconSize;

    switch (status) {
      case "success":
        return (
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        );
      case "warning":
        return (
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        );
      case "error":
        return (
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        );
      case "info":
      case "neutral":
      default:
        return (
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        );
    }
  };

  // Handle dismiss
  const handleDismiss = () => {
    setIsDismissed(true);
    if (onDismiss) {
      onDismiss();
    }
  };

  const sizeClasses = getSizeClasses();
  const variantStyles = getVariantStyles();
  const statusIcon = getStatusIcon();

  // Get dismiss button color based on variant
  const getDismissButtonColor = () => {
    if (variant === "filled") return colors.text.inverted;
    return colors.text.muted;
  };

  // Render content
  const renderContent = () => {
    if (children) {
      return children;
    }

    const titleColor =
      variant === "filled" ? colors.text.inverted : colors.text.primary;
    const descriptionColor =
      variant === "filled" ? colors.text.inverted : colors.text.secondary;
    const dismissButtonColor = getDismissButtonColor();

    return (
      <div className="w-full">
        <div className="flex items-start" style={{ gap: sizeClasses.gap }}>
          {showIcon && (
            <div className="flex-shrink-0" style={{ marginTop: "0.125rem" }}>
              {statusIcon}
            </div>
          )}

          <div className="flex-1">
            {title && (
              <div
                className={`font-semibold ${sizeClasses.titleSize} mb-1`}
                style={{ color: titleColor }}
              >
                {title}
              </div>
            )}

            {description && (
              <div
                className={sizeClasses.descriptionSize}
                style={{ color: descriptionColor }}
              >
                {description}
              </div>
            )}

            {actions && (
              <div
                className="flex"
                style={{ gap: "0.5rem", marginTop: "0.75rem" }}
              >
                {actions}
              </div>
            )}
          </div>

          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 rounded-sm hover:bg-surfaceHover focus:outline-none focus:ring-2 focus:ring-focusRing focus:ring-offset-1 transition-colors"
              style={{
                color: dismissButtonColor,
              }}
              aria-label="Dismiss alert"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="11" y1="3" x2="3" y2="11" />
                <line x1="3" y1="3" x2="11" y2="11" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`${inline ? "" : "my-4"} ${className}`}>
      <Card padding={sizeClasses.padding} hoverable={false} variant="default">
        <div style={variantStyles}>{renderContent()}</div>
      </Card>
    </div>
  );
};

// ============================================
// Pre-built Alert Variants
// ============================================

// Success Alert
export const SuccessAlert = (props: Omit<AlertProps, "status">) => (
  <Alert status="success" {...props} />
);

// Warning Alert
export const WarningAlert = (props: Omit<AlertProps, "status">) => (
  <Alert status="warning" {...props} />
);

// Error Alert
export const ErrorAlert = (props: Omit<AlertProps, "status">) => (
  <Alert status="error" {...props} />
);

// Info Alert
export const InfoAlert = (props: Omit<AlertProps, "status">) => (
  <Alert status="info" {...props} />
);

// Neutral Alert
export const NeutralAlert = (props: Omit<AlertProps, "status">) => (
  <Alert status="neutral" {...props} />
);

// Inline Alert (no margins)
export const InlineAlert = (props: Omit<AlertProps, "inline">) => (
  <Alert inline={true} {...props} />
);

// Toast-style Alert (compact, auto-dismiss)
export interface ToastAlertProps
  extends Omit<AlertProps, "size" | "dismissible" | "inline"> {
  duration?: number;
  onAutoDismiss?: () => void;
}

export const ToastAlert = ({
  duration = 5000,
  onAutoDismiss,
  onDismiss,
  ...props
}: ToastAlertProps) => {
  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        if (onAutoDismiss) {
          onAutoDismiss();
        }
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onAutoDismiss]);

  return (
    <Alert
      size="sm"
      dismissible={true}
      inline={true}
      onDismiss={onDismiss}
      {...props}
    />
  );
};

// Banner Alert (full-width)
export const BannerAlert = (props: Omit<AlertProps, "variant">) => (
  <Alert
    variant="filled"
    {...props}
    style={{
      borderRadius: 0,
      border: "none",
      ...props.style,
    }}
  />
);

// Alert with action buttons
export interface ActionAlertProps extends Omit<AlertProps, "actions"> {
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export const ActionAlert = ({
  primaryAction,
  secondaryAction,
  ...props
}: ActionAlertProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  const actions = (
    <div className="flex" style={{ gap: "0.5rem" }}>
      {secondaryAction && (
        <button
          type="button"
          onClick={secondaryAction.onClick}
          className="px-3 py-1.5 text-sm rounded transition-colors"
          style={{
            backgroundColor: colors.surfaceHover,
            color: colors.text.primary,
            border: `1px solid ${colors.surfaceBorder}`,
          }}
        >
          {secondaryAction.label}
        </button>
      )}

      {primaryAction && (
        <button
          type="button"
          onClick={primaryAction.onClick}
          className="px-3 py-1.5 text-sm rounded font-medium transition-colors"
          style={{
            backgroundColor: colors.brand[500],
            color: colors.brand[600],
            border: `1px solid ${colors.brand[400]}`,
          }}
        >
          {primaryAction.label}
        </button>
      )}
    </div>
  );

  return <Alert actions={actions} {...props} />;
};
