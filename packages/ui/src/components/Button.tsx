import React from "react";
import { useTheme } from "../contexts/themeContext";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const { theme } = useTheme();

  const baseClasses =
    "font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const getStyles = () => {
    const colors = theme.colors;

    switch (variant) {
      case "primary":
        return {
          backgroundColor: colors.brand[500], // Main brand color
          color: colors.brand[600], // Text on primary
          border: "none",
          transition: "background-color 0.2s ease, transform 0.1s ease",
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
          border: `1px solid ${colors.brand[500]}`,
          color: colors.brand[500],
        };

      case "ghost":
        return {
          backgroundColor: "transparent",
          color: colors.text.primary,
          border: "none",
        };

      default:
        return {
          backgroundColor: colors.brand[500],
          color: colors.brand[600],
        };
    }
  };

  const getHoverStyles = () => {
    const colors = theme.colors;

    switch (variant) {
      case "primary":
        return {
          backgroundColor: colors.brand[400], // Lighter shade on hover
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
          backgroundColor: colors.brand[50], // Lightest brand shade
          borderColor: colors.brand[400],
        };

      case "ghost":
        return {
          backgroundColor: colors.surfaceHover,
        };

      default:
        return {};
    }
  };

  const getDisabledStyles = () => {
    const colors = theme.colors;
    return {
      opacity: 0.6,
      cursor: "not-allowed",
      backgroundColor:
        variant === "outline" || variant === "ghost"
          ? "transparent"
          : colors.surface,
      color: colors.text.disabled,
      border: variant === "outline" ? `1px solid ${colors.border}` : "none",
      transform: "none",
      boxShadow: "none",
    };
  };

  const getFocusStyles = () => {
    const colors = theme.colors;
    return {
      ringColor: colors.focusRing,
      ringOffsetColor: colors.background,
    };
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;

  const [style, setStyle] = React.useState(getStyles());

  const handleMouseEnter = () => {
    if (!disabled) setStyle({ ...style, ...getHoverStyles() });
  };

  const handleMouseLeave = () => {
    if (!disabled) setStyle(getStyles());
  };

  // Generate focus ring style for Tailwind
  const focusRingStyle = {
    "--tw-ring-color": theme.colors.focusRing,
    "--tw-ring-offset-color": theme.colors.background,
  } as React.CSSProperties;

  return (
    <button
      className={classes}
      style={{
        ...(disabled ? getDisabledStyles() : style),
        ...focusRingStyle,
      }}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
};
