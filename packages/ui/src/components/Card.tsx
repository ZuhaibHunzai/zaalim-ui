import React from "react";
import { useTheme } from "../contexts/themeContext";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card = ({
  children,
  className = "",
  padding = "md",
}: CardProps) => {
  const { theme } = useTheme();

  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const baseClasses = "rounded-lg shadow-sm border";

  const classes = `${baseClasses} ${paddingClasses[padding]} ${className}`;

  return (
    <div
      className={classes}
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.secondary + "20", // Adding transparency
        color: theme.colors.text.primary,
      }}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader = ({ children, className = "" }: CardHeaderProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={`pb-4 border-b ${className}`}
      style={{
        borderColor: theme.colors.secondary + "20",
      }}
    >
      {children}
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent = ({ children, className = "" }: CardContentProps) => {
  return <div className={`pt-4 ${className}`}>{children}</div>;
};
