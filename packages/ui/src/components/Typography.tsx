import React from "react";

import { useTheme } from "../contexts/themeContext";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  color?:
    | "primary"
    | "secondary"
    | "muted"
    | "inverted"
    | "brand"
    | "success"
    | "warning"
    | "error"
    | "info";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right" | "justify";
}

// Base typography component
const Typography = ({
  children,
  className = "",
  as: Component = "p",
  color = "primary",
  weight = "normal",
  align = "left",
  ...props
}: TypographyProps) => {
  const { theme } = useTheme();

  const getColor = () => {
    const colors = theme.colors;
    switch (color) {
      case "primary":
        return colors.text.primary;
      case "secondary":
        return colors.text.secondary;
      case "muted":
        return colors.text.muted;
      case "inverted":
        return colors.text.inverted;
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
        return colors.text.primary;
    }
  };

  const getWeight = () => {
    switch (weight) {
      case "light":
        return "font-light";
      case "normal":
        return "font-normal";
      case "medium":
        return "font-medium";
      case "semibold":
        return "font-semibold";
      case "bold":
        return "font-bold";
      default:
        return "font-normal";
    }
  };

  const getAlign = () => {
    switch (align) {
      case "left":
        return "text-left";
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      case "justify":
        return "text-justify";
      default:
        return "text-left";
    }
  };

  // Use React.createElement to avoid TypeScript conflicts
  const Tag = Component as keyof JSX.IntrinsicElements;

  return React.createElement(
    Tag,
    {
      className: `${getWeight()} ${getAlign()} ${className}`,
      style: { color: getColor() },
      ...props,
    },
    children
  );
};
// Specific typography components

interface HeadingProps extends Omit<TypographyProps, "as"> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading = ({
  children,
  level = 1,
  weight = "bold",
  color = "primary",
  className = "",
  ...props
}: HeadingProps) => {
  const tags = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

  const getSize = () => {
    switch (level) {
      case 1:
        return "text-5xl md:text-6xl";
      case 2:
        return "text-4xl md:text-5xl";
      case 3:
        return "text-3xl md:text-4xl";
      case 4:
        return "text-2xl md:text-3xl";
      case 5:
        return "text-xl md:text-2xl";
      case 6:
        return "text-lg md:text-xl";
      default:
        return "text-4xl";
    }
  };

  return (
    <Typography
      as={tags[level - 1]}
      weight={weight}
      color={color}
      className={`${getSize()} tracking-tight ${className}`}
      {...props}
    >
      {children}
    </Typography>
  );
};

export const Display = ({
  children,
  className = "",
  ...props
}: Omit<TypographyProps, "as">) => {
  return (
    <Typography
      as="h1"
      weight="bold"
      className={`text-6xl md:text-7xl lg:text-8xl tracking-tight ${className}`}
      {...props}
    >
      {children}
    </Typography>
  );
};

export const Title = ({
  children,
  className = "",
  ...props
}: Omit<TypographyProps, "as">) => {
  return (
    <Typography
      as="h2"
      weight="semibold"
      className={`text-3xl md:text-4xl ${className}`}
      {...props}
    >
      {children}
    </Typography>
  );
};

export const Subtitle = ({
  children,
  className = "",
  ...props
}: Omit<TypographyProps, "as">) => {
  return (
    <Typography
      as="h3"
      weight="medium"
      color="secondary"
      className={`text-xl md:text-2xl ${className}`}
      {...props}
    >
      {children}
    </Typography>
  );
};

export const Paragraph = ({
  children,
  className = "",
  ...props
}: Omit<TypographyProps, "as">) => {
  return (
    <Typography
      as="p"
      className={`text-base leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </Typography>
  );
};

export const SmallText = ({
  children,
  className = "",
  ...props
}: Omit<TypographyProps, "as">) => {
  return (
    <Typography as="span" className={`text-sm ${className}`} {...props}>
      {children}
    </Typography>
  );
};

export const Label = ({
  children,
  className = "",
  ...props
}: Omit<TypographyProps, "as">) => {
  return (
    <Typography
      as="label"
      weight="medium"
      className={`text-sm uppercase tracking-wide ${className}`}
      {...props}
    >
      {children}
    </Typography>
  );
};

export const Caption = ({
  children,
  className = "",
  ...props
}: Omit<TypographyProps, "as">) => {
  return (
    <Typography
      as="span"
      color="muted"
      className={`text-xs ${className}`}
      {...props}
    >
      {children}
    </Typography>
  );
};

export const Code = ({
  children,
  className = "",
  ...props
}: Omit<TypographyProps, "as">) => {
  const { theme } = useTheme();

  return (
    <code
      className={`font-mono text-sm px-1.5 py-0.5 rounded ${className}`}
      style={{
        backgroundColor: theme.colors.surfaceHover,
        color: theme.colors.text.primary,
        border: `1px solid ${theme.colors.surfaceBorder}`,
      }}
      {...props}
    >
      {children}
    </code>
  );
};

// Export everything
export { Typography };
