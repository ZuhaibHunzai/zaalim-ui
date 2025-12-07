import React from "react";
import { Box, BoxProps } from "./Box";

export interface FlexProps extends BoxProps {
  children?: React.ReactNode;
  className?: string;

  // Direction
  direction?: "row" | "row-reverse" | "column" | "column-reverse";

  // Alignment
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";

  // Wrapping
  wrap?: "nowrap" | "wrap" | "wrap-reverse";

  // Gap
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32;

  // Responsive props - simplified to avoid deep nesting issues
  smDirection?: FlexProps["direction"];
  smAlign?: FlexProps["align"];
  smJustify?: FlexProps["justify"];
  smWrap?: FlexProps["wrap"];
  smGap?: FlexProps["gap"];

  mdDirection?: FlexProps["direction"];
  mdAlign?: FlexProps["align"];
  mdJustify?: FlexProps["justify"];
  mdWrap?: FlexProps["wrap"];
  mdGap?: FlexProps["gap"];

  lgDirection?: FlexProps["direction"];
  lgAlign?: FlexProps["align"];
  lgJustify?: FlexProps["justify"];
  lgWrap?: FlexProps["wrap"];
  lgGap?: FlexProps["gap"];

  xlDirection?: FlexProps["direction"];
  xlAlign?: FlexProps["align"];
  xlJustify?: FlexProps["justify"];
  xlWrap?: FlexProps["wrap"];
  xlGap?: FlexProps["gap"];
}

export const Flex = ({
  children,
  className = "",
  direction = "row",
  align = "stretch",
  justify = "start",
  wrap = "nowrap",
  gap,
  smDirection,
  smAlign,
  smJustify,
  smWrap,
  smGap,
  mdDirection,
  mdAlign,
  mdJustify,
  mdWrap,
  mdGap,
  lgDirection,
  lgAlign,
  lgJustify,
  lgWrap,
  lgGap,
  xlDirection,
  xlAlign,
  xlJustify,
  xlWrap,
  xlGap,
  ...props
}: FlexProps) => {
  // Build flex classes
  const getFlexClasses = () => {
    const classes: string[] = ["flex"];

    // Base flex properties
    if (direction !== "row") classes.push(`flex-${direction}`);
    if (align !== "stretch") classes.push(`items-${align}`);
    if (justify !== "start") classes.push(`justify-${justify}`);
    if (wrap !== "nowrap") classes.push(`flex-${wrap}`);
    if (gap !== undefined) classes.push(`gap-${gap}`);

    // Responsive classes - simplified to avoid conditional complexity
    if (smDirection) classes.push(`sm:flex-${smDirection}`);
    if (smAlign) classes.push(`sm:items-${smAlign}`);
    if (smJustify) classes.push(`sm:justify-${smJustify}`);
    if (smWrap) classes.push(`sm:flex-${smWrap}`);
    if (smGap !== undefined) classes.push(`sm:gap-${smGap}`);

    if (mdDirection) classes.push(`md:flex-${mdDirection}`);
    if (mdAlign) classes.push(`md:items-${mdAlign}`);
    if (mdJustify) classes.push(`md:justify-${mdJustify}`);
    if (mdWrap) classes.push(`md:flex-${mdWrap}`);
    if (mdGap !== undefined) classes.push(`md:gap-${mdGap}`);

    if (lgDirection) classes.push(`lg:flex-${lgDirection}`);
    if (lgAlign) classes.push(`lg:items-${lgAlign}`);
    if (lgJustify) classes.push(`lg:justify-${lgJustify}`);
    if (lgWrap) classes.push(`lg:flex-${lgWrap}`);
    if (lgGap !== undefined) classes.push(`lg:gap-${lgGap}`);

    if (xlDirection) classes.push(`xl:flex-${xlDirection}`);
    if (xlAlign) classes.push(`xl:items-${xlAlign}`);
    if (xlJustify) classes.push(`xl:justify-${xlJustify}`);
    if (xlWrap) classes.push(`xl:flex-${xlWrap}`);
    if (xlGap !== undefined) classes.push(`xl:gap-${xlGap}`);

    return classes.join(" ");
  };

  return (
    <Box className={`${getFlexClasses()} ${className}`} {...props}>
      {children}
    </Box>
  );
};

// Pre-built flex variants for common use cases
export const Row = (props: Omit<FlexProps, "direction">) => (
  <Flex direction="row" {...props} />
);

export const Column = (props: Omit<FlexProps, "direction">) => (
  <Flex direction="column" {...props} />
);

export const RowReverse = (props: Omit<FlexProps, "direction">) => (
  <Flex direction="row-reverse" {...props} />
);

export const ColumnReverse = (props: Omit<FlexProps, "direction">) => (
  <Flex direction="column-reverse" {...props} />
);

export const Center = ({
  children,
  ...props
}: Omit<FlexProps, "align" | "justify">) => (
  <Flex align="center" justify="center" {...props}>
    {children}
  </Flex>
);

export const Between = ({ children, ...props }: Omit<FlexProps, "justify">) => (
  <Flex justify="between" {...props}>
    {children}
  </Flex>
);

export const Wrap = ({ children, ...props }: Omit<FlexProps, "wrap">) => (
  <Flex wrap="wrap" {...props}>
    {children}
  </Flex>
);

// Flex item with grow/shrink control
export interface FlexItemProps extends BoxProps {
  children?: React.ReactNode;
  className?: string;
  grow?: boolean | 0 | 1 | 2 | 3 | 4 | 5;
  shrink?: boolean | 0 | 1;
  basis?: string | number;
  order?: number;
}

export const FlexItem = ({
  children,
  className = "",
  grow = false,
  shrink = true,
  basis,
  order,
  ...props
}: FlexItemProps) => {
  const getFlexItemClasses = () => {
    const classes: string[] = [];

    // Grow
    if (grow === true) {
      classes.push("grow");
    } else if (typeof grow === "number") {
      classes.push(`grow-${grow}`);
    }

    // Shrink
    if (shrink === false) {
      classes.push("shrink-0");
    } else if (shrink === true) {
      classes.push("shrink");
    }

    // Order
    if (order !== undefined) {
      classes.push(`order-${order}`);
    }

    return classes.join(" ");
  };

  const styles: React.CSSProperties = {};
  if (basis !== undefined) {
    styles.flexBasis = typeof basis === "number" ? `${basis}px` : basis;
  }

  return (
    <Box
      className={`${getFlexItemClasses()} ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </Box>
  );
};
