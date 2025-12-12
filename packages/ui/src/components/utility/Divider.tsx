// packages/ui/src/components/utility/Divider.tsx
import React from "react";
import { useTheme } from "../../contexts/themeContext";

export type DividerVariant = "solid" | "dashed" | "dotted";
export type DividerOrientation = "horizontal" | "vertical";
export type DividerLength = "full" | "half" | "quarter" | "auto";
export type DividerWeight = "thin" | "medium" | "thick";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orientation of the divider */
  orientation?: DividerOrientation;

  /** Visual style variant */
  variant?: DividerVariant;

  /** Length of the divider */
  length?: DividerLength;

  /** Thickness/weight of the divider */
  weight?: DividerWeight;

  /** Text/label to display in the center (horizontal only) */
  label?: React.ReactNode;

  /** Position of the label (horizontal only) */
  labelPosition?: "left" | "center" | "right";

  /** Additional CSS classes */
  className?: string;

  /** Whether to add spacing around the divider */
  spacing?: "none" | "xs" | "sm" | "md" | "lg";

  /** Whether the divider is inset (not full width) */
  inset?: boolean;

  /** Inset amount when inset is true */
  insetAmount?: "sm" | "md" | "lg" | number;

  /** Custom color (overrides theme) */
  color?: string;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = "horizontal",
      variant = "solid",
      length = "full",
      weight = "medium",
      label,
      labelPosition = "center",
      className = "",
      spacing = "md",
      inset = false,
      insetAmount = "md",
      color,
      style,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();

    // Get color from theme if not custom
    const dividerColor = color || theme.colors.border;

    // Base classes
    const baseClasses = [
      "box-border",
      orientation === "horizontal" ? "w-full" : "h-full",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Spacing classes
    const spacingClasses = {
      none: "",
      xs: orientation === "horizontal" ? "my-1" : "mx-1",
      sm: orientation === "horizontal" ? "my-2" : "mx-2",
      md: orientation === "horizontal" ? "my-4" : "mx-4",
      lg: orientation === "horizontal" ? "my-6" : "mx-6",
    };

    // Length styles
    const getLengthStyle = (): React.CSSProperties => {
      if (length === "full") return {};

      const lengthMap: Record<DividerLength, string> = {
        half: "50%",
        quarter: "25%",
        auto: "auto",
        full: "100%",
      };

      return orientation === "horizontal"
        ? { width: lengthMap[length] }
        : { height: lengthMap[length] };
    };

    // Weight styles
    const getWeightStyle = (): React.CSSProperties => {
      const weightMap: Record<DividerWeight, string> = {
        thin: "1px",
        medium: "2px",
        thick: "3px",
      };

      return orientation === "horizontal"
        ? { borderTopWidth: weightMap[weight] }
        : { borderLeftWidth: weightMap[weight] };
    };

    // Variant styles
    const getVariantStyle = (): React.CSSProperties => {
      const styleValue = variant as React.CSSProperties["borderTopStyle"];

      return orientation === "horizontal"
        ? { borderTopStyle: styleValue }
        : { borderLeftStyle: styleValue };
    };

    // Inset styles
    const getInsetStyle = (): React.CSSProperties => {
      if (!inset) return {};

      const insetMap: Record<string, string> = {
        sm: "1rem",
        md: "2rem",
        lg: "3rem",
      };

      const amount =
        typeof insetAmount === "number"
          ? `${insetAmount}px`
          : insetMap[insetAmount] || "2rem";

      return orientation === "horizontal"
        ? {
            marginLeft: amount,
            marginRight: amount,
            width: `calc(100% - ${parseInt(amount) * 2}px)`,
          }
        : {
            marginTop: amount,
            marginBottom: amount,
            height: `calc(100% - ${parseInt(amount) * 2}px)`,
          };
    };

    // Label divider (horizontal only with label)
    if (label && orientation === "horizontal") {
      return (
        <div
          ref={ref}
          className={`flex items-center ${spacingClasses[spacing]} ${className}`}
          style={style}
          {...props}
        >
          {/* Left line */}
          <div
            className="flex-grow"
            style={{
              borderTopStyle:
                variant === "solid"
                  ? "solid"
                  : variant === "dashed"
                  ? "dashed"
                  : "dotted",
              borderTopWidth:
                weight === "thin" ? "1px" : weight === "medium" ? "2px" : "3px",
              borderTopColor: dividerColor,
              opacity: 0.6,
            }}
          />

          {/* Label */}
          <div
            className={`px-3 ${labelPosition === "left" ? "order-first" : ""} ${
              labelPosition === "right" ? "order-last" : ""
            }`}
            style={{
              color: theme.colors.text.muted,
              fontSize: "0.875rem",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </div>

          {/* Right line */}
          <div
            className="flex-grow"
            style={{
              borderTopStyle:
                variant === "solid"
                  ? "solid"
                  : variant === "dashed"
                  ? "dashed"
                  : "dotted",
              borderTopWidth:
                weight === "thin" ? "1px" : weight === "medium" ? "2px" : "3px",
              borderTopColor: dividerColor,
              opacity: 0.6,
            }}
          />
        </div>
      );
    }

    // Regular divider (without label)
    return (
      <div
        ref={ref}
        className={`${baseClasses} ${spacingClasses[spacing]}`}
        style={{
          border: "none",
          ...getLengthStyle(),
          ...getWeightStyle(),
          ...getVariantStyle(),
          ...getInsetStyle(),
          borderColor: dividerColor,
          opacity: 0.8,
          ...style,
        }}
        role="separator"
        aria-orientation={orientation}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

// Pre-configured divider variants
export const SolidDivider = React.forwardRef<
  HTMLDivElement,
  Omit<DividerProps, "variant">
>((props, ref) => <Divider ref={ref} variant="solid" {...props} />);
SolidDivider.displayName = "SolidDivider";

export const DashedDivider = React.forwardRef<
  HTMLDivElement,
  Omit<DividerProps, "variant">
>((props, ref) => <Divider ref={ref} variant="dashed" {...props} />);
DashedDivider.displayName = "DashedDivider";

export const DottedDivider = React.forwardRef<
  HTMLDivElement,
  Omit<DividerProps, "variant">
>((props, ref) => <Divider ref={ref} variant="dotted" {...props} />);
DottedDivider.displayName = "DottedDivider";

export const VerticalDivider = React.forwardRef<
  HTMLDivElement,
  Omit<DividerProps, "orientation">
>((props, ref) => <Divider ref={ref} orientation="vertical" {...props} />);
VerticalDivider.displayName = "VerticalDivider";

export const HorizontalDivider = React.forwardRef<
  HTMLDivElement,
  Omit<DividerProps, "orientation">
>((props, ref) => <Divider ref={ref} orientation="horizontal" {...props} />);
HorizontalDivider.displayName = "HorizontalDivider";

export const ThinDivider = React.forwardRef<
  HTMLDivElement,
  Omit<DividerProps, "weight">
>((props, ref) => <Divider ref={ref} weight="thin" {...props} />);
ThinDivider.displayName = "ThinDivider";

export const ThickDivider = React.forwardRef<
  HTMLDivElement,
  Omit<DividerProps, "weight">
>((props, ref) => <Divider ref={ref} weight="thick" {...props} />);
ThickDivider.displayName = "ThickDivider";

export const HalfDivider = React.forwardRef<
  HTMLDivElement,
  Omit<DividerProps, "length">
>((props, ref) => <Divider ref={ref} length="half" {...props} />);
HalfDivider.displayName = "HalfDivider";

export const InsetDivider = React.forwardRef<
  HTMLDivElement,
  Omit<DividerProps, "inset">
>((props, ref) => <Divider ref={ref} inset={true} {...props} />);
InsetDivider.displayName = "InsetDivider";

// Labeled divider
interface LabeledDividerProps
  extends Omit<DividerProps, "label" | "labelPosition"> {
  label: React.ReactNode;
  position?: "left" | "center" | "right";
}

export const LabeledDivider = React.forwardRef<
  HTMLDivElement,
  LabeledDividerProps
>(({ label, position = "center", ...props }, ref) => (
  <Divider ref={ref} label={label} labelPosition={position} {...props} />
));
LabeledDivider.displayName = "LabeledDivider";

// Compact divider variants (commonly used)
export const CompactDivider = React.forwardRef<
  HTMLDivElement,
  Omit<DividerProps, "spacing">
>((props, ref) => <Divider ref={ref} spacing="sm" {...props} />);
CompactDivider.displayName = "CompactDivider";

export const SpaciousDivider = React.forwardRef<
  HTMLDivElement,
  Omit<DividerProps, "spacing">
>((props, ref) => <Divider ref={ref} spacing="lg" {...props} />);
SpaciousDivider.displayName = "SpaciousDivider";
