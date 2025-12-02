import { Theme, defaultTheme, darkTheme } from "../themes/defaults";

// Default to built-in themes
export let userLightTheme: Theme = defaultTheme;
export let userDarkTheme: Theme = darkTheme;

// Function to check if user has modified the theme
// This will be called by users in their app
export function setUserTheme(lightTheme: Theme, darkTheme?: Theme) {
  userLightTheme = lightTheme;
  userDarkTheme = darkTheme || lightTheme;
}

export function getActiveTheme(variant: "light" | "dark" = "light"): Theme {
  return variant === "light" ? userLightTheme : userDarkTheme;
}

export function isUsingCustomTheme(): boolean {
  return userLightTheme !== defaultTheme || userDarkTheme !== darkTheme;
}
