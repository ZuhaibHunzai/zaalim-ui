export interface Theme {
  colors: {
    // Brand Colors - 6 shades
    brand: {
      50: string; // lightest
      100: string;
      200: string;
      300: string;
      400: string;
      500: string; // main primary
      600: string; // text on primary
    };

    // Supporting Colors
    secondary: string;
    accent: string;

    // Backgrounds & Surfaces
    background: string;
    backgroundSubtle: string;
    surface: string;
    surfaceHover: string;
    surfaceBorder: string;

    // Text Colors
    text: {
      primary: string;
      secondary: string;
      muted: string;
      inverted: string;
      disabled: string;
    };

    // States
    border: string;
    borderHover: string;
    focusRing: string;
    overlay: string;

    // Semantic Colors
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

// ============================================
// ZAALIM UI SIGNATURE THEME - AURORA
// ============================================
// Unique cyan-based theme with purple accent
// Modern, fresh, and memorable

export const defaultTheme: Theme = {
  colors: {
    // Brand Colors - Aurora Cyan
    brand: {
      50: "#ECFFFC", // lightest cyan
      100: "#D7FFFA", // very light
      200: "#A6FBEE", // light
      300: "#66EEDD", // medium light
      400: "#40DFCF", // medium
      500: "#4BE5D1", // main primary - Aurora Cyan
      600: "#1D7D73", // text on primary
    },

    // Supporting Colors
    secondary: "#64748B", // Slate-500
    accent: "#9E7BFF", // Aurora Purple

    // Backgrounds & Surfaces
    background: "#FFFFFF",
    backgroundSubtle: "#F5FAFA",
    surface: "#F8FBFB",
    surfaceHover: "#F0F7F7",
    surfaceBorder: "#DCE5E5",

    // Text Colors
    text: {
      primary: "#0F172A", // Slate-900
      secondary: "#334155", // Slate-700
      muted: "#64748B", // Slate-500
      inverted: "#FFFFFF",
      disabled: "#A7B1BA", // Slate-400
    },

    // States
    border: "#CBD5E1", // Slate-300
    borderHover: "#94A3B8", // Slate-400
    focusRing: "#4BE5D1", // Brand 500
    overlay: "rgba(0, 0, 0, 0.38)",

    // Semantic Colors
    success: "#22C55E", // Green-500
    warning: "#F59E0B", // Amber-500
    error: "#EF4444", // Red-500
    info: "#38BDF8", // Sky-500
  },
};

export const darkTheme: Theme = {
  colors: {
    // Brand Colors - Aurora Cyan (dark)
    brand: {
      50: "#051311", // darkest
      100: "#071E1B",
      200: "#0C2A25",
      300: "#17423C",
      400: "#2E8B82",
      500: "#4BE5D1", // main primary - same as light for consistency
      600: "#8EF1E4", // text on primary (lighter for dark)
    },

    // Supporting Colors
    secondary: "#94A3B8", // Slate-400
    accent: "#B59AFF", // Lighter purple for dark

    // Backgrounds & Surfaces
    background: "#0A0F12",
    backgroundSubtle: "#0F161A",
    surface: "#11181C",
    surfaceHover: "#1A2328",
    surfaceBorder: "#243036",

    // Text Colors
    text: {
      primary: "#F1FAFB", // Light cyan
      secondary: "#C7D4D8", // Light slate
      muted: "#8FA0A6", // Medium slate
      inverted: "#0A0F12",
      disabled: "#5C6B70", // Dark slate
    },

    // States
    border: "#3A4A50", // Dark slate
    borderHover: "#4D5F66", // Medium slate
    focusRing: "#4BE5D1", // Brand 500
    overlay: "rgba(0, 0, 0, 0.6)",

    // Semantic Colors
    success: "#4ADE80", // Green-400
    warning: "#FACC15", // Yellow-400
    error: "#F87171", // Red-400
    info: "#5EDAFF", // Sky-400
  },
};
