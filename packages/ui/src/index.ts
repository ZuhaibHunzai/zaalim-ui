// packages/ui/src/index.ts

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

// ============================================
// COMPONENTS
// ============================================

// Foundation Components
export { Box } from "./components/foundation/Box";
export type { BoxProps } from "./components/foundation/Box";

export {
  Flex,
  Row,
  Column,
  Center,
  Between,
  Wrap,
  FlexItem,
} from "./components/foundation/Flex";
export type { FlexProps, FlexItemProps } from "./components/foundation/Flex";

export { Grid, GridItem } from "./components/foundation/Grid";
export type { GridProps, GridItemProps } from "./components/foundation/Grid";

// Display Components
export { Avatar, AvatarGroup } from "./components/DataDisplay/Avatar";
export type {
  AvatarProps,
  AvatarGroupProps,
} from "./components//DataDisplay/Avatar";

export {
  Badge,
  SuccessBadge,
  WarningBadge,
  ErrorBadge,
  InfoBadge,
  BrandBadge,
  StatusBadge,
  CountBadge,
} from "./components/DataDisplay/Badge";
export type { BadgeProps } from "./components/DataDisplay/Badge";

export { Chip } from "./components/DataDisplay/Chip";
export type { ChipProps } from "./components/DataDisplay/Chip";

export {
  List,
  ListItem,
  ListHeader,
  ListFooter,
  ListEmpty,
  ListLoading,
} from "./components//DataDisplay/List";
export type {
  ListProps,
  ListItemProps,
  ListHeaderProps,
  ListFooterProps,
  ListEmptyProps,
  ListLoadingProps,
} from "./components/DataDisplay/List";

// Navigation Components
export {
  Menu,
  MenuItem,
  MenuGroup,
  MenuDivider,
  MenuHeader,
  MenuFooter,
  ContextMenu,
} from "./components/navigation/Menu";
export type {
  MenuProps,
  MenuItemProps,
  MenuGroupProps,
  MenuHeaderProps,
} from "./components/navigation/Menu";

// Existing Components (keep what you already have)
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
