import { Theme } from "../themes/defaults";

interface SimpleColors {
  primary: string;
  primaryText?: string;
  secondary?: string;
  accent?: string;
  background?: string;
  textPrimary?: string;
  textSecondary?: string;
}

export function createTheme(colors: SimpleColors, isDark = false): Theme {
  const primaryColor = colors.primary;
  const primaryText = colors.primaryText || (isDark ? "#8EF1E4" : "#1D7D73");

  // Generate 6-color brand scale based on primary color
  const brandScale = {
    50: isDark ? "#051311" : "#ECFFFC",
    100: isDark ? "#071E1B" : "#D7FFFA",
    200: isDark ? "#0C2A25" : "#A6FBEE",
    300: isDark ? "#17423C" : "#66EEDD",
    400: isDark ? "#2E8B82" : "#40DFCF",
    500: primaryColor, // User's primary color as main brand
    600: primaryText, // Text on primary
  };

  return {
    colors: {
      // Brand Colors
      brand: brandScale,

      // Supporting Colors
      secondary: colors.secondary || (isDark ? "#94A3B8" : "#64748B"),
      accent: colors.accent || (isDark ? "#B59AFF" : "#9E7BFF"),

      // Backgrounds & Surfaces
      background: colors.background || (isDark ? "#0A0F12" : "#FFFFFF"),
      backgroundSubtle: isDark ? "#0F161A" : "#F5FAFA",
      surface: isDark ? "#11181C" : "#F8FBFB",
      surfaceHover: isDark ? "#1A2328" : "#F0F7F7",
      surfaceBorder: isDark ? "#243036" : "#DCE5E5",

      // Text Colors
      text: {
        primary: colors.textPrimary || (isDark ? "#F1FAFB" : "#0F172A"),
        secondary: colors.textSecondary || (isDark ? "#C7D4D8" : "#334155"),
        muted: isDark ? "#8FA0A6" : "#64748B",
        inverted: isDark ? "#0A0F12" : "#FFFFFF",
        disabled: isDark ? "#5C6B70" : "#A7B1BA",
      },

      // States
      border: isDark ? "#3A4A50" : "#CBD5E1",
      borderHover: isDark ? "#4D5F66" : "#94A3B8",
      focusRing: primaryColor, // Use primary as focus ring
      overlay: isDark ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.38)",

      // Semantic Colors
      success: isDark ? "#4ADE80" : "#22C55E",
      warning: isDark ? "#FACC15" : "#F59E0B",
      error: isDark ? "#F87171" : "#EF4444",
      info: isDark ? "#5EDAFF" : "#38BDF8",
    },
  };
}

// Helper for users to create both themes easily
export function createThemePair(
  lightColors: SimpleColors,
  darkColors?: SimpleColors
): { light: Theme; dark: Theme } {
  const lightTheme = createTheme(lightColors, false);
  const darkTheme = createTheme(darkColors || lightColors, true);

  return { light: lightTheme, dark: darkTheme };
}

// Advanced: Create full theme from just primary color
export function createFullThemeFromPrimary(
  primaryColor: string,
  isDark = false
): Theme {
  return createTheme(
    {
      primary: primaryColor,
      primaryText: isDark ? "#8EF1E4" : "#1D7D73",
    },
    isDark
  );
}
