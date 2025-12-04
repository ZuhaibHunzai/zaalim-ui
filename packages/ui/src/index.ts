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
} from "./components/Typography";
export { Input, Textarea } from "./components/forms/Input";
export { Select } from "./components/forms/Select";
export { Checkbox, CheckboxGroup } from "./components/forms/Checkbox";
export { Radio, RadioGroup } from "./components/forms/Radio";
export { DatePicker } from "./components/forms/DatePicker";
export { TimePicker } from "./components/forms/TimePicker";
export { Form, FormField, FormActions } from "./components/forms/Form";
export { RangeSlider } from "./components/forms/RangeSlider";
export { Toggle, ToggleGroup } from "./components/forms/Toggle";
export { FileUpload } from "./components/forms/FileUpload";
// Re-export everything for easy imports
export * as ThemeUtils from "./utils/theme-builder";
