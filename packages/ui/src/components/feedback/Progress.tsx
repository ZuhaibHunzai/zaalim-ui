// packages/ui/src/components/feedback/Progress.tsx
import React from "react";
import { useTheme } from "../../contexts/themeContext";

// ============================================
// Types and Interfaces
// ============================================

export type ProgressVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "brand";
export type ProgressSize = "sm" | "md" | "lg";
export type ProgressShape = "line" | "circle";

export interface ProgressProps {
  /** Current progress value (0-100) */
  value?: number;

  /** Progress variant/color */
  variant?: ProgressVariant;

  /** Progress size */
  size?: ProgressSize;

  /** Progress shape */
  shape?: ProgressShape;

  /** Whether to show value label */
  showValue?: boolean;

  /** Custom label format */
  formatLabel?: (value: number) => string;

  /** Whether progress is indeterminate */
  indeterminate?: boolean;

  /** Progress thickness (for circle) */
  thickness?: number;

  /** Additional CSS classes */
  className?: string;

  /** Additional styles */
  style?: React.CSSProperties;
}

// ============================================
// Main Progress Component
// ============================================

export const Progress = ({
  value = 0,
  variant = "brand",
  size = "md",
  shape = "line",
  showValue = false,
  formatLabel,
  indeterminate = false,
  thickness = 4,
  className = "",
  style,
}: ProgressProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  // Clamp value between 0-100
  const clampedValue = Math.min(100, Math.max(0, value));

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
      case "sm":
        return {
          height: "0.75rem",
          fontSize: "0.75rem",
          circleSize: 40,
        };
      case "md":
        return {
          height: "1rem",
          fontSize: "0.875rem",
          circleSize: 60,
        };
      case "lg":
        return {
          height: "1.25rem",
          fontSize: "1rem",
          circleSize: 80,
        };
      default:
        return {
          height: "1rem",
          fontSize: "0.875rem",
          circleSize: 60,
        };
    }
  };

  // Format label
  const getLabel = () => {
    if (formatLabel) {
      return formatLabel(clampedValue);
    }
    return `${Math.round(clampedValue)}%`;
  };

  const variantColor = getVariantColor();
  const sizeClasses = getSizeClasses();

  // Render line progress
  const renderLineProgress = () => {
    return (
      <div className="relative w-full" style={style}>
        {/* Background track */}
        <div
          className="rounded-full overflow-hidden"
          style={{
            height: sizeClasses.height,
            backgroundColor: colors.backgroundSubtle,
          }}
        >
          {/* Progress bar */}
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              indeterminate ? "animate-indeterminate" : ""
            }`}
            style={{
              width: indeterminate ? "50%" : `${clampedValue}%`,
              backgroundColor: variantColor,
              backgroundImage: indeterminate
                ? `linear-gradient(90deg, transparent, ${variantColor}80, transparent)`
                : undefined,
            }}
          />
        </div>

        {/* Value label */}
        {showValue && (
          <div
            className="absolute top-1/2 right-2 transform -translate-y-1/2 font-medium"
            style={{
              fontSize: sizeClasses.fontSize,
              color: colors.text.primary,
            }}
          >
            {getLabel()}
          </div>
        )}
      </div>
    );
  };

  // Render circle progress
  const renderCircleProgress = () => {
    const circleSize = sizeClasses.circleSize;
    const radius = (circleSize - thickness) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
      circumference - (clampedValue / 100) * circumference;

    return (
      <div
        className="relative inline-flex items-center justify-center"
        style={style}
      >
        <svg
          width={circleSize}
          height={circleSize}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            strokeWidth={thickness}
            stroke={colors.backgroundSubtle}
            fill="none"
          />

          {/* Progress circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            strokeWidth={thickness}
            stroke={variantColor}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={
              indeterminate ? circumference * 0.25 : strokeDashoffset
            }
            className={`transition-all duration-300 ${
              indeterminate ? "animate-spin" : ""
            }`}
          />
        </svg>

        {/* Value label */}
        {showValue && (
          <div
            className="absolute font-medium"
            style={{
              fontSize: sizeClasses.fontSize,
              color: colors.text.primary,
            }}
          >
            {getLabel()}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={className}>
      {shape === "circle" ? renderCircleProgress() : renderLineProgress()}
    </div>
  );
};

// ============================================
// Pre-built Progress Variants
// ============================================

// Success Progress
export const SuccessProgress = (props: Omit<ProgressProps, "variant">) => (
  <Progress variant="success" {...props} />
);

// Warning Progress
export const WarningProgress = (props: Omit<ProgressProps, "variant">) => (
  <Progress variant="warning" {...props} />
);

// Error Progress
export const ErrorProgress = (props: Omit<ProgressProps, "variant">) => (
  <Progress variant="error" {...props} />
);

// Info Progress
export const InfoProgress = (props: Omit<ProgressProps, "variant">) => (
  <Progress variant="info" {...props} />
);

// Brand Progress
export const BrandProgress = (props: Omit<ProgressProps, "variant">) => (
  <Progress variant="brand" {...props} />
);

// Indeterminate Progress (loading)
export const LoadingProgress = (
  props: Omit<ProgressProps, "indeterminate">
) => <Progress indeterminate={true} showValue={false} {...props} />;

// Progress with Steps
export interface StepProgressProps extends Omit<ProgressProps, "value"> {
  currentStep: number;
  totalSteps: number;
}

export const StepProgress = ({
  currentStep,
  totalSteps,
  ...props
}: StepProgressProps) => {
  const value = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <Progress value={value} showValue={false} {...props} />
      <div
        className="flex justify-between mt-2 text-sm"
        style={{ color: "var(--text-muted)" }}
      >
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{Math.round(value)}%</span>
      </div>
    </div>
  );
};
