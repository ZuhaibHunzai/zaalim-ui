// packages/ui/src/components/feedback/Spinner.tsx
import React from "react";
import { useTheme } from "../../contexts/themeContext";

// ============================================
// Types and Interfaces
// ============================================

export type SpinnerVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "brand";
export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerSpeed = "slow" | "normal" | "fast";

export interface SpinnerProps {
  /** Spinner variant/color */
  variant?: SpinnerVariant;

  /** Spinner size */
  size?: SpinnerSize;

  /** Spinner speed */
  speed?: SpinnerSpeed;

  /** Additional label/text */
  label?: string;

  /** Label position */
  labelPosition?: "left" | "right" | "top" | "bottom";

  /** Additional CSS classes */
  className?: string;

  /** Additional styles */
  style?: React.CSSProperties;
}

// ============================================
// Main Spinner Component
// ============================================

export const Spinner = ({
  variant = "brand",
  size = "md",
  speed = "normal",
  label,
  labelPosition = "right",
  className = "",
  style,
}: SpinnerProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  // Get variant color
  const getVariantColor = () => {
    switch (variant) {
      case "success":
        return colors.success;
      case "warning":
        return colors.warning;
      case "error":
        return colors.error;
      case "info":
        return colors.info;
      case "brand":
        return colors.brand[500];
      case "default":
      default:
        return colors.brand[300];
    }
  };

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case "xs":
        return { spinnerSize: "1rem", fontSize: "0.75rem", gap: "0.25rem" };
      case "sm":
        return { spinnerSize: "1.5rem", fontSize: "0.875rem", gap: "0.375rem" };
      case "md":
        return { spinnerSize: "2rem", fontSize: "1rem", gap: "0.5rem" };
      case "lg":
        return { spinnerSize: "3rem", fontSize: "1.125rem", gap: "0.75rem" };
      case "xl":
        return { spinnerSize: "4rem", fontSize: "1.25rem", gap: "1rem" };
      default:
        return { spinnerSize: "2rem", fontSize: "1rem", gap: "0.5rem" };
    }
  };

  // Get speed classes
  const getSpeedClasses = () => {
    switch (speed) {
      case "slow":
        return "animate-spin-slow";
      case "fast":
        return "animate-spin-fast";
      case "normal":
      default:
        return "animate-spin";
    }
  };

  const variantColor = getVariantColor();
  const sizeClasses = getSizeClasses();
  const speedClasses = getSpeedClasses();

  // Render spinner SVG
  const renderSpinner = () => (
    <svg
      className={speedClasses}
      width={sizeClasses.spinnerSize}
      height={sizeClasses.spinnerSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke={variantColor}
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        strokeOpacity="0.3"
        stroke="currentColor"
      />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" />
    </svg>
  );

  // Render with label
  const renderWithLabel = () => {
    const flexDirection =
      labelPosition === "left" || labelPosition === "right" ? "row" : "column";
    const alignItems = flexDirection === "row" ? "center" : "center";

    return (
      <div
        className={`flex ${className}`}
        style={{
          flexDirection: flexDirection as any,
          alignItems,
          gap: sizeClasses.gap,
          ...style,
        }}
      >
        {(labelPosition === "left" || labelPosition === "top") && (
          <span
            className="font-medium"
            style={{
              fontSize: sizeClasses.fontSize,
              color: colors.text.primary,
            }}
          >
            {label}
          </span>
        )}

        {renderSpinner()}

        {(labelPosition === "right" || labelPosition === "bottom") && (
          <span
            className="font-medium"
            style={{
              fontSize: sizeClasses.fontSize,
              color: colors.text.primary,
            }}
          >
            {label}
          </span>
        )}
      </div>
    );
  };

  // Render without label
  const renderWithoutLabel = () => (
    <div className={className} style={style}>
      {renderSpinner()}
    </div>
  );

  return label ? renderWithLabel() : renderWithoutLabel();
};

// ============================================
// Pre-built Spinner Variants
// ============================================

// Success Spinner
export const SuccessSpinner = (props: Omit<SpinnerProps, "variant">) => (
  <Spinner variant="success" {...props} />
);

// Warning Spinner
export const WarningSpinner = (props: Omit<SpinnerProps, "variant">) => (
  <Spinner variant="warning" {...props} />
);

// Error Spinner
export const ErrorSpinner = (props: Omit<SpinnerProps, "variant">) => (
  <Spinner variant="error" {...props} />
);

// Info Spinner
export const InfoSpinner = (props: Omit<SpinnerProps, "variant">) => (
  <Spinner variant="info" {...props} />
);

// Brand Spinner
export const BrandSpinner = (props: Omit<SpinnerProps, "variant">) => (
  <Spinner variant="brand" {...props} />
);

// Page Loader (full screen)
export interface PageLoaderProps extends Omit<SpinnerProps, "size" | "label"> {
  message?: string;
  overlay?: boolean;
}

export const PageLoader = ({
  message = "Loading...",
  overlay = true,
  ...props
}: PageLoaderProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  const content = (
    <div className="flex flex-col items-center justify-center">
      <Spinner size="lg" {...props} />
      {message && (
        <div
          className="mt-4 font-medium"
          style={{ color: colors.text.primary }}
        >
          {message}
        </div>
      )}
    </div>
  );

  if (!overlay) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {content}
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: `${colors.overlay}80`,
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="p-8 rounded-xl"
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.surfaceBorder}`,
        }}
      >
        {content}
      </div>
    </div>
  );
};

// Button Spinner (for loading buttons)
export const ButtonSpinner = (props: Omit<SpinnerProps, "size">) => (
  <Spinner size="sm" {...props} />
);

// Inline Spinner (for text)
export const InlineSpinner = (props: Omit<SpinnerProps, "size">) => (
  <Spinner size="xs" {...props} />
);
