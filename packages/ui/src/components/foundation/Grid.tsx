import React from "react";
import { Box, BoxProps } from "./Box";

export interface GridProps extends BoxProps {
  children?: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  alignItems?: "start" | "end" | "center" | "stretch" | "baseline";
  justifyContent?: "start" | "end" | "center" | "between" | "around" | "evenly";
}

export const Grid = ({
  children,
  cols = 1,
  sm,
  md,
  lg,
  xl,
  gap = 4,
  alignItems = "stretch",
  justifyContent = "start",
  className = "",
  ...props
}: GridProps) => {
  // Build responsive grid classes
  const getGridClasses = () => {
    const classes: string[] = ["grid"];

    // Base columns
    if (cols) {
      classes.push(`grid-cols-${cols}`);
    }

    // Responsive columns
    if (sm) classes.push(`sm:grid-cols-${sm}`);
    if (md) classes.push(`md:grid-cols-${md}`);
    if (lg) classes.push(`lg:grid-cols-${lg}`);
    if (xl) classes.push(`xl:grid-cols-${xl}`);

    // Gap
    if (gap !== undefined) classes.push(`gap-${gap}`);

    // Alignment
    classes.push(`items-${alignItems}`);
    classes.push(`justify-${justifyContent}`);

    return classes.join(" ");
  };

  return (
    <Box className={`${getGridClasses()} ${className}`} {...props}>
      {children}
    </Box>
  );
};

// Grid Item component with span control
export interface GridItemProps extends BoxProps {
  children?: React.ReactNode;
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
  colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  colEnd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6 | "full";
  rowStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  rowEnd?: 1 | 2 | 3 | 4 | 5 | 6 | 7;

  // Responsive spans
  sm?: {
    colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
    colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
    colEnd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  };
  md?: {
    colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
    colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
    colEnd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  };
  lg?: {
    colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
    colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
    colEnd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  };
  xl?: {
    colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
    colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
    colEnd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  };
}

export const GridItem = ({
  children,
  colSpan,
  colStart,
  colEnd,
  rowSpan,
  rowStart,
  rowEnd,
  sm,
  md,
  lg,
  xl,
  className = "",
  ...props
}: GridItemProps) => {
  // Build grid item classes
  const getGridItemClasses = () => {
    const classes: string[] = [];

    // Column span
    if (colSpan) {
      if (colSpan === "full") {
        classes.push("col-span-full");
      } else {
        classes.push(`col-span-${colSpan}`);
      }
    }

    // Column start/end
    if (colStart) classes.push(`col-start-${colStart}`);
    if (colEnd) classes.push(`col-end-${colEnd}`);

    // Row span
    if (rowSpan) {
      if (rowSpan === "full") {
        classes.push("row-span-full");
      } else {
        classes.push(`row-span-${rowSpan}`);
      }
    }

    // Row start/end
    if (rowStart) classes.push(`row-start-${rowStart}`);
    if (rowEnd) classes.push(`row-end-${rowEnd}`);

    // Responsive classes
    if (sm) {
      if (sm.colSpan) {
        if (sm.colSpan === "full") {
          classes.push(`sm:col-span-full`);
        } else {
          classes.push(`sm:col-span-${sm.colSpan}`);
        }
      }
      if (sm.colStart) classes.push(`sm:col-start-${sm.colStart}`);
      if (sm.colEnd) classes.push(`sm:col-end-${sm.colEnd}`);
    }

    if (md) {
      if (md.colSpan) {
        if (md.colSpan === "full") {
          classes.push(`md:col-span-full`);
        } else {
          classes.push(`md:col-span-${md.colSpan}`);
        }
      }
      if (md.colStart) classes.push(`md:col-start-${md.colStart}`);
      if (md.colEnd) classes.push(`md:col-end-${md.colEnd}`);
    }

    if (lg) {
      if (lg.colSpan) {
        if (lg.colSpan === "full") {
          classes.push(`lg:col-span-full`);
        } else {
          classes.push(`lg:col-span-${lg.colSpan}`);
        }
      }
      if (lg.colStart) classes.push(`lg:col-start-${lg.colStart}`);
      if (lg.colEnd) classes.push(`lg:col-end-${lg.colEnd}`);
    }

    if (xl) {
      if (xl.colSpan) {
        if (xl.colSpan === "full") {
          classes.push(`xl:col-span-full`);
        } else {
          classes.push(`xl:col-span-${xl.colSpan}`);
        }
      }
      if (xl.colStart) classes.push(`xl:col-start-${xl.colStart}`);
      if (xl.colEnd) classes.push(`xl:col-end-${xl.colEnd}`);
    }

    return classes.join(" ");
  };

  return (
    <Box className={`${getGridItemClasses()} ${className}`} {...props}>
      {children}
    </Box>
  );
};
