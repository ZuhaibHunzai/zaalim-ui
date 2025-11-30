import React from "react";
import { useTheme } from "../contexts/themeContext";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const { theme } = useTheme();

  const baseClasses =
    "font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const getStyle = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: theme.colors.primary,
          color: "white",
        };
      case "secondary":
        return {
          backgroundColor: theme.colors.secondary,
          color: "white",
        };
      case "outline":
        return {
          border: `1px solid ${theme.colors.primary}`,
          color: theme.colors.primary,
          backgroundColor: "transparent",
        };
      default:
        return {
          backgroundColor: theme.colors.primary,
          color: "white",
        };
    }
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} style={getStyle()} {...props}>
      {children}
    </button>
  );
};
