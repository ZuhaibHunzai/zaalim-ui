import { Theme } from "../themes/defaults";

interface SimpleColors {
  primary: string;
  secondary?: string;
  accent?: string;
  background?: string;
  surface?: string;
  textPrimary?: string;
  textSecondary?: string;
}

export function createTheme(colors: SimpleColors, isDark = false): Theme {
  const defaultColors = {
    primary: colors.primary,
    secondary: colors.secondary || colors.primary + "80", // 50% opacity
    accent: colors.accent || colors.primary,
    background: colors.background || (isDark ? "#111827" : "#FFFFFF"),
    surface: colors.surface || (isDark ? "#1F2937" : "#F9FAFB"),
    text: {
      primary: colors.textPrimary || (isDark ? "#F9FAFB" : "#111827"),
      secondary: colors.textSecondary || (isDark ? "#D1D5DB" : "#6B7280"),
    },
  };

  return {
    colors: defaultColors,
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
