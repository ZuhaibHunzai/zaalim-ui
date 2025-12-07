import React from "react";
import { useTheme } from "../../contexts/themeContext";

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;

  // Simple variants for common use cases
  variant?: "surface" | "background" | "subtle" | "transparent";

  // Border options
  border?: boolean;
  borderColor?: "default" | "brand" | "success" | "warning" | "error" | "info";

  // Shadow
  shadow?: boolean | "sm" | "md" | "lg" | "xl";

  // Rounded corners
  rounded?: boolean | "sm" | "md" | "lg" | "xl" | "full";

  // Theme override (optional) - we'll handle this differently
  themeMode?: "light" | "dark";
}

export const Box = ({
  children,
  className = "",
  variant = "transparent",
  border = false,
  borderColor = "default",
  shadow = false,
  rounded = false,
  themeMode,
  style,
  ...props
}: BoxProps) => {
  const { theme } = useTheme();

  // Build inline styles for theme-dependent properties
  const buildStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {};
    const colors = theme.colors;

    // Background based on variant
    switch (variant) {
      case "surface":
        styles.backgroundColor = colors.surface;
        break;
      case "background":
        styles.backgroundColor = colors.background;
        break;
      case "subtle":
        styles.backgroundColor = colors.backgroundSubtle;
        break;
      case "transparent":
        styles.backgroundColor = "transparent";
        break;
    }

    // Border color
    if (border) {
      switch (borderColor) {
        case "default":
          styles.borderColor = colors.border;
          break;
        case "brand":
          styles.borderColor = colors.brand[500];
          break;
        case "success":
          styles.borderColor = colors.success;
          break;
        case "warning":
          styles.borderColor = colors.warning;
          break;
        case "error":
          styles.borderColor = colors.error;
          break;
        case "info":
          styles.borderColor = colors.info;
          break;
      }
      styles.borderWidth = "1px";
      styles.borderStyle = "solid";
    }

    return { ...styles, ...style };
  };

  // Build Tailwind classes for non-theme properties
  const buildClasses = () => {
    const classes: string[] = [];

    // Shadow
    if (shadow) {
      if (shadow === true) {
        classes.push("shadow");
      } else {
        classes.push(`shadow-${shadow}`);
      }
    }

    // Rounded corners
    if (rounded) {
      if (rounded === true) {
        classes.push("rounded");
      } else {
        classes.push(`rounded-${rounded}`);
      }
    }

    return classes.join(" ");
  };

  const tailwindClasses = buildClasses();
  const inlineStyles = buildStyles();

  return (
    <div
      className={`${tailwindClasses} ${className}`}
      style={inlineStyles}
      {...props}
    >
      {children}
    </div>
  );
};
