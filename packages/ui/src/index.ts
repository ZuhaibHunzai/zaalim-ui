// Themes
export { defaultTheme, darkTheme } from "./themes/defaults";
export { userLightTheme, userDarkTheme } from "./themes/user-theme";
export type { Theme } from "./themes/defaults";

// Contexts
export { ThemeProvider, useTheme } from "./contexts/themeContext";

// Theme Utilities
export {
  setUserTheme,
  getActiveTheme,
  isUsingCustomTheme,
} from "./utils/theme-detector";

export { createTheme, createThemePair } from "./utils/theme-builder";

// Components
export { Button } from "./components/Button";
export { Card, CardHeader, CardContent, CardFooter } from "./components/Card";
export {
  Typography,
  Heading,
  Display,
  Title,
  Subtitle,
  Paragraph,
  SmallText,
  Label,
  Caption,
  Code,
} from "./components/Typograpgy";
export { Input, Textarea } from "./components/forms/Input";
export { Select } from "./components/forms/select";
export { Checkbox, CheckboxGroup } from "./components/forms/checkbox";

// Re-export everything for easy imports
export * as ThemeUtils from "./utils/theme-builder";
