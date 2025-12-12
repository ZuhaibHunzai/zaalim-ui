// packages/ui/src/components/utility/Icon.tsx
import React from "react";
import { useTheme } from "../../contexts/themeContext";
import * as LucideIcons from "lucide-react";

// ============================================
// ICON COMPONENT
// ============================================

// Type for Lucide icon names (dynamically generated)
export type LucideIconName = keyof typeof LucideIcons;

// Color variants based on your theme
export type IconColor =
  | "inherit" // Use parent color
  | "current" // currentColor
  | "brand" // brand.500
  | "brand-light" // brand.300
  | "brand-dark" // brand.600
  | "text" // text.primary
  | "text-secondary"
  | "text-muted"
  | "text-inverted"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "accent";

// Size variants
export type IconSize =
  | "xs" // 12px
  | "sm" // 16px
  | "md" // 20px
  | "lg" // 24px
  | "xl" // 32px
  | "2xl" // 40px
  | "3xl"; // 48px

export interface IconProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, "fill" | "strokeWidth"> {
  /** Name of the Lucide icon */
  name: LucideIconName;

  /** Size of the icon */
  size?: IconSize | number;

  /** Color variant */
  color?: IconColor;

  /** Custom color (overrides color variant) */
  customColor?: string;

  /** Stroke width */
  strokeWidth?: number;

  /** Whether to fill the icon (for fillable icons) */
  fill?: boolean | string;

  /** Additional CSS classes */
  className?: string;

  /** Whether the icon is clickable */
  clickable?: boolean;

  /** Spin animation */
  spin?: boolean;

  /** Pulse animation */
  pulse?: boolean;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name,
      size = "md",
      color = "inherit",
      customColor,
      strokeWidth = 2,
      fill = false,
      className = "",
      clickable = false,
      spin = false,
      pulse = false,
      style,
      onClick,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();

    // Get the Lucide icon component
    const LucideIcon = LucideIcons[name] as React.ComponentType<any>;

    if (!LucideIcon) {
      console.warn(`Icon "${name}" not found in Lucide icons`);
      return null;
    }

    // Calculate size
    const getSizeValue = () => {
      if (typeof size === "number") return `${size}px`;

      const sizeMap: Record<IconSize, string> = {
        xs: "12px",
        sm: "16px",
        md: "20px",
        lg: "24px",
        xl: "32px",
        "2xl": "40px",
        "3xl": "48px",
      };

      return sizeMap[size];
    };

    // Calculate color from theme
    const getColorValue = () => {
      if (customColor) return customColor;
      if (color === "inherit") return undefined;
      if (color === "current") return "currentColor";

      const colors = theme.colors;

      const colorMap: Record<
        Exclude<IconColor, "inherit" | "current">,
        string
      > = {
        brand: colors.brand[500],
        "brand-light": colors.brand[300],
        "brand-dark": colors.brand[600],
        text: colors.text.primary,
        "text-secondary": colors.text.secondary,
        "text-muted": colors.text.muted,
        "text-inverted": colors.text.inverted,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        info: colors.info,
        accent: colors.accent,
      };

      return colorMap[color as Exclude<IconColor, "inherit" | "current">];
    };

    // Animation classes
    const getAnimationClasses = () => {
      const classes = [];
      if (spin) classes.push("animate-spin");
      if (pulse) classes.push("animate-pulse");
      return classes.join(" ");
    };

    // Cursor style
    const cursorClass = clickable || onClick ? "cursor-pointer" : "";

    // Additional styles
    const additionalStyles: React.CSSProperties = {
      width: getSizeValue(),
      height: getSizeValue(),
      color: getColorValue(),
      ...style,
    };

    // Combine classes
    const iconClasses = [
      "inline-block",
      "transition-colors",
      "duration-200",
      getAnimationClasses(),
      cursorClass,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Handle hover effect for clickable icons
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseEnter = () => {
      if (clickable || onClick) {
        setIsHovered(true);
      }
    };

    const handleMouseLeave = () => {
      if (clickable || onClick) {
        setIsHovered(false);
      }
    };

    // Optional hover color effect
    const hoverStyle =
      isHovered && (clickable || onClick)
        ? {
            color: theme.colors.brand[500],
            transform: "scale(1.05)",
          }
        : {};

    return (
      <LucideIcon
        ref={ref}
        className={iconClasses}
        strokeWidth={strokeWidth}
        fill={fill ? getColorValue() : "none"}
        style={{
          ...additionalStyles,
          ...hoverStyle,
          transition: "color 0.2s ease, transform 0.2s ease",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Icon.displayName = "Icon";

// ============================================
// ICON WITH BADGE
// ============================================

interface IconWithBadgeProps extends IconProps {
  badge?: number | string;
  badgeColor?: "brand" | "success" | "warning" | "error" | "info";
  badgePosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export const IconWithBadge = ({
  badge,
  badgeColor = "error",
  badgePosition = "top-right",
  ...iconProps
}: IconWithBadgeProps) => {
  const { theme } = useTheme();

  const getBadgeColor = () => {
    const colors = theme.colors;
    switch (badgeColor) {
      case "brand":
        return colors.brand[500];
      case "success":
        return colors.success;
      case "warning":
        return colors.warning;
      case "error":
        return colors.error;
      case "info":
        return colors.info;
      default:
        return colors.brand[500];
    }
  };

  const positionClasses = {
    "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
    "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
    "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
    "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
  };

  if (!badge) return <Icon {...iconProps} />;

  return (
    <div className="relative inline-block">
      <Icon {...iconProps} />
      <span
        className={`absolute ${positionClasses[badgePosition]} min-w-[1.25rem] h-5 px-1.5 flex items-center justify-center text-xs font-semibold rounded-full`}
        style={{
          backgroundColor: getBadgeColor(),
          color: theme.colors.text.inverted,
        }}
      >
        {badge}
      </span>
    </div>
  );
};

// ============================================
// ICON BUTTON COMPONENT
// ============================================

export type IconButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "text";

export type IconButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Icon name */
  icon: IconProps["name"];

  /** Button variant */
  variant?: IconButtonVariant;

  /** Button size */
  size?: IconButtonSize;

  /** Icon color (overrides variant) */
  iconColor?: IconProps["color"];

  /** Icon size (overrides button size) */
  iconSize?: IconProps["size"];

  /** Whether the button is active/selected */
  active?: boolean;

  /** Whether to show a circular button */
  circular?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** Button label for accessibility */
  label?: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = "primary",
      size = "md",
      iconColor,
      iconSize,
      active = false,
      circular = true,
      className = "",
      label,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();

    // Size mapping
    const sizeClasses: Record<IconButtonSize, string> = {
      xs: "p-1",
      sm: "p-1.5",
      md: "p-2",
      lg: "p-2.5",
      xl: "p-3",
    };

    const iconSizeMap: Record<IconButtonSize, IconProps["size"]> = {
      xs: "sm",
      sm: "md",
      md: "lg",
      lg: "xl",
      xl: "2xl",
    };

    // Base classes
    const baseClasses = [
      "inline-flex items-center justify-center",
      "transition-all duration-200",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
      circular ? "rounded-full" : "rounded-lg",
      disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
      sizeClasses[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      const colors = theme.colors;

      switch (variant) {
        case "primary":
          return {
            backgroundColor: colors.brand[500],
            color: colors.brand[600],
            border: "none",
          };

        case "secondary":
          return {
            backgroundColor: colors.surfaceHover,
            color: colors.text.primary,
            border: `1px solid ${colors.surfaceBorder}`,
          };

        case "outline":
          return {
            backgroundColor: "transparent",
            border: `1px solid ${colors.border}`,
            color: colors.text.primary,
          };

        case "ghost":
          return {
            backgroundColor: "transparent",
            border: "none",
            color: colors.text.primary,
          };

        case "text":
          return {
            backgroundColor: "transparent",
            border: "none",
            color: colors.text.primary,
            padding: 0,
          };

        default:
          return {
            backgroundColor: colors.brand[500],
            color: colors.brand[600],
          };
      }
    };

    // Hover styles
    const getHoverStyles = () => {
      const colors = theme.colors;

      if (disabled) return {};

      switch (variant) {
        case "primary":
          return {
            backgroundColor: colors.brand[400],
            transform: "translateY(-1px)",
            boxShadow: `0 4px 12px ${colors.brand[500]}40`,
          };

        case "secondary":
          return {
            backgroundColor: colors.surface,
            borderColor: colors.borderHover,
          };

        case "outline":
          return {
            backgroundColor: colors.brand[50],
            borderColor: colors.brand[400],
          };

        case "ghost":
          return {
            backgroundColor: colors.surfaceHover,
          };

        case "text":
          return {
            color: colors.brand[500],
          };

        default:
          return {};
      }
    };

    // Active state styles
    const getActiveStyles = () => {
      const colors = theme.colors;

      if (!active) return {};

      switch (variant) {
        case "primary":
          return {
            backgroundColor: colors.brand[600],
            transform: "translateY(0)",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
          };

        case "secondary":
        case "outline":
          return {
            backgroundColor: colors.brand[100],
            borderColor: colors.brand[500],
            color: colors.brand[500],
          };

        case "ghost":
        case "text":
          return {
            backgroundColor: colors.brand[100],
            color: colors.brand[500],
          };

        default:
          return {};
      }
    };

    // Focus ring style
    const focusRingStyle = {
      "--tw-ring-color": theme.colors.focusRing,
      "--tw-ring-offset-color": theme.colors.background,
    } as React.CSSProperties;

    const [currentStyle, setCurrentStyle] = React.useState(() => ({
      ...getVariantStyles(),
      ...getActiveStyles(),
    }));

    const handleMouseEnter = () => {
      if (!disabled) {
        setCurrentStyle((prev) => ({
          ...prev,
          ...getHoverStyles(),
        }));
      }
    };

    const handleMouseLeave = () => {
      if (!disabled) {
        setCurrentStyle({
          ...getVariantStyles(),
          ...getActiveStyles(),
        });
      }
    };

    // Determine icon color based on variant
    const getIconColor = (): IconProps["color"] => {
      if (iconColor) return iconColor;

      switch (variant) {
        case "primary":
          return "brand-dark"; // brand.600 for contrast
        case "text":
          return "inherit";
        default:
          return "inherit";
      }
    };

    return (
      <button
        ref={ref}
        className={baseClasses}
        style={{
          ...currentStyle,
          ...focusRingStyle,
          ...style,
        }}
        disabled={disabled}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={label || `Icon button ${icon}`}
        {...props}
      >
        <Icon
          name={icon}
          size={iconSize || iconSizeMap[size]}
          color={getIconColor()}
          className={variant === "text" ? "" : undefined}
        />
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

// ============================================
// ICON TEXT COMPONENT
// ============================================

export interface IconTextProps {
  /** Icon name */
  icon: IconProps["name"];

  /** Text content */
  children: React.ReactNode;

  /** Icon position relative to text */
  iconPosition?: "left" | "right" | "top" | "bottom";

  /** Spacing between icon and text */
  spacing?: "xs" | "sm" | "md" | "lg";

  /** Icon size */
  iconSize?: IconProps["size"];

  /** Icon color */
  iconColor?: IconProps["color"];

  /** Whether to align items in center */
  center?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** Text wrapper element */
  as?: "span" | "div" | "p" | "label";
}

export const IconText = ({
  icon,
  children,
  iconPosition = "left",
  spacing = "sm",
  iconSize,
  iconColor,
  center = true,
  className = "",
  as: Component = "span",
}: IconTextProps) => {
  const spacingClasses = {
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4",
  };

  // Fixed: Proper type mapping for flexDirection
  const flexDirectionMap: Record<
    typeof iconPosition,
    React.CSSProperties["flexDirection"]
  > = {
    left: "row",
    right: "row-reverse",
    top: "column",
    bottom: "column-reverse",
  };

  const alignClasses = center ? "items-center" : "items-start";

  const containerClasses = [
    "inline-flex",
    spacingClasses[spacing],
    alignClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const containerStyle: React.CSSProperties = {
    flexDirection: flexDirectionMap[iconPosition],
  };

  return (
    <Component className={containerClasses} style={containerStyle}>
      <Icon name={icon} size={iconSize} color={iconColor} />
      <span className="whitespace-nowrap">{children}</span>
    </Component>
  );
};

// Pre-configured IconText variants
export const IconTextLeft = (props: Omit<IconTextProps, "iconPosition">) => (
  <IconText {...props} iconPosition="left" />
);

export const IconTextRight = (props: Omit<IconTextProps, "iconPosition">) => (
  <IconText {...props} iconPosition="right" />
);

export const IconTextTop = (props: Omit<IconTextProps, "iconPosition">) => (
  <IconText {...props} iconPosition="top" />
);

export const IconTextBottom = (props: Omit<IconTextProps, "iconPosition">) => (
  <IconText {...props} iconPosition="bottom" />
);

// ============================================
// PRE-CONFIGURED ICON BUTTON VARIANTS
// ============================================

export const PrimaryIconButton = React.forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "variant">
>((props, ref) => <IconButton ref={ref} variant="primary" {...props} />);
PrimaryIconButton.displayName = "PrimaryIconButton";

export const SecondaryIconButton = React.forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "variant">
>((props, ref) => <IconButton ref={ref} variant="secondary" {...props} />);
SecondaryIconButton.displayName = "SecondaryIconButton";

export const OutlineIconButton = React.forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "variant">
>((props, ref) => <IconButton ref={ref} variant="outline" {...props} />);
OutlineIconButton.displayName = "OutlineIconButton";

export const GhostIconButton = React.forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "variant">
>((props, ref) => <IconButton ref={ref} variant="ghost" {...props} />);
GhostIconButton.displayName = "GhostIconButton";

export const TextIconButton = React.forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "variant">
>((props, ref) => <IconButton ref={ref} variant="text" {...props} />);
TextIconButton.displayName = "TextIconButton";

export const SmallIconButton = React.forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "size">
>((props, ref) => <IconButton ref={ref} size="sm" {...props} />);
SmallIconButton.displayName = "SmallIconButton";

export const LargeIconButton = React.forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "size">
>((props, ref) => <IconButton ref={ref} size="lg" {...props} />);
LargeIconButton.displayName = "LargeIconButton";

export const CircularIconButton = React.forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "circular">
>((props, ref) => <IconButton ref={ref} circular={true} {...props} />);
CircularIconButton.displayName = "CircularIconButton";

export const SquareIconButton = React.forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "circular">
>((props, ref) => <IconButton ref={ref} circular={false} {...props} />);
SquareIconButton.displayName = "SquareIconButton";
