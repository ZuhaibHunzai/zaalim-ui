import React from "react";
import { useTheme } from "../contexts/themeContext";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
  variant?: "default" | "elevated" | "ghost";
}

export const Card = ({
  children,
  className = "",
  padding = "md",
  hoverable = false,
  variant = "default",
}: CardProps) => {
  const { theme } = useTheme();

  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-7",
  };

  const baseClasses = "rounded-xl transition-all duration-200";

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case "elevated":
        return {
          backgroundColor: theme.colors.surface,
          border: `1px solid ${theme.colors.surfaceBorder}`,
          boxShadow: `0 4px 12px ${theme.colors.overlay}10`,
        };
      case "ghost":
        return {
          backgroundColor: theme.colors.backgroundSubtle,
          border: `1px solid transparent`,
        };
      case "default":
      default:
        return {
          backgroundColor: theme.colors.surface,
          border: `1px solid ${theme.colors.surfaceBorder}`,
          boxShadow: `0 1px 3px ${theme.colors.overlay}08`,
        };
    }
  };

  // Hover effects
  const getHoverStyles = () => {
    if (!hoverable) return {};

    switch (variant) {
      case "elevated":
        return {
          transform: "translateY(-2px)",
          boxShadow: `0 8px 24px ${theme.colors.overlay}15`,
          borderColor: theme.colors.borderHover,
        };
      case "ghost":
        return {
          backgroundColor: theme.colors.surfaceHover,
          borderColor: theme.colors.surfaceBorder,
        };
      case "default":
      default:
        return {
          transform: "translateY(-1px)",
          boxShadow: `0 4px 12px ${theme.colors.overlay}12`,
          borderColor: theme.colors.borderHover,
        };
    }
  };

  const hoverClasses = hoverable ? "cursor-pointer" : "";
  const classes = `${baseClasses} ${paddingClasses[padding]} ${hoverClasses} ${className}`;

  const [style, setStyle] = React.useState(getVariantStyles());

  const handleMouseEnter = () => {
    if (hoverable) setStyle({ ...style, ...getHoverStyles() });
  };

  const handleMouseLeave = () => {
    if (hoverable) setStyle(getVariantStyles());
  };

  return (
    <div
      className={classes}
      style={{
        ...style,
        color: theme.colors.text.primary,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  withDivider?: boolean;
}

export const CardHeader = ({
  children,
  className = "",
  withDivider = true,
}: CardHeaderProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={`pb-4 ${withDivider ? "border-b" : ""} ${className}`}
      style={{
        borderColor: withDivider ? theme.colors.surfaceBorder : "transparent",
      }}
    >
      {children}
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
  spacing?: "none" | "sm" | "md";
}

export const CardContent = ({
  children,
  className = "",
  spacing = "md",
}: CardContentProps) => {
  const spacingClasses = {
    none: "",
    sm: "space-y-2",
    md: "space-y-4",
  };

  return (
    <div className={`pt-4 ${spacingClasses[spacing]} ${className}`}>
      {children}
    </div>
  );
};

// New: Card Footer component
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  withDivider?: boolean;
}

export const CardFooter = ({
  children,
  className = "",
  withDivider = true,
}: CardFooterProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={`pt-4 ${withDivider ? "border-t" : ""} ${className}`}
      style={{
        borderColor: withDivider ? theme.colors.surfaceBorder : "transparent",
      }}
    >
      {children}
    </div>
  );
};
