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
  Table,
  TableHeader,
  TableFooter,
  TablePagination,
  TableCellAvatar,
  TableCellStatus,
  TableCellTags,
  CompactTable,
  CardTable,
  BorderedTable,
  SelectableTable,
} from "./components/DataDisplay/Table";

export type {
  TableProps,
  Column,
  SortDirection,
  TableHeaderProps,
  TableFooterProps,
  TablePaginationProps,
  TableCellAvatarProps,
  TableCellStatusProps,
  TableCellTagsProps,
  SelectableTableProps,
} from "./components/DataDisplay/Table";

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

export {
  Accordion,
  AccordionItem,
  AccordionItemComponent,
  CompactAccordion,
  CardAccordion,
  BorderedAccordion,
  GhostAccordion,
  SingleAccordion,
  FAQAccordion,
  StatsAccordion,
} from "./components/DataDisplay/Accordion";

export type {
  AccordionProps,
  AccordionItem as AccordionItemType,
  AccordionItemProps,
  AccordionItemCompositionProps,
  FAQAccordionProps,
  StatsAccordionProps,
  StatsAccordionItem,
} from "./components/DataDisplay/Accordion";

export {
  Timeline,
  TimelineItemComponent,
  CompactTimeline,
  RichTimeline,
  VerticalTimeline,
  HorizontalTimeline,
  ActivityTimeline,
  ProgressTimeline,
  StatusTimeline,
} from "./components/DataDisplay/Timeline";

export type {
  TimelineProps,
  TimelineItem as TimelineItemType,
  TimelineItemCompositionProps,
  ActivityTimelineProps,
  ProgressTimelineProps,
  ProgressTimelineItem,
} from "./components/DataDisplay/Timeline";

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
export type {
  TabsProps,
  TabListProps,
  TabProps,
  TabPanelProps,
  TabGroupProps,
  SimpleTabsProps,
} from "./components/navigation/Tab";
export type {
  SidebarProps,
  SidebarSectionProps,
  CompactSidebarProps,
} from "./components/navigation/Sidebar";
export {
  Navbar,
  NavbarBrand,
  NavbarSection,
  NavbarDivider,
  CompactNavbar,
  CenteredNavbar,
  NavbarWithSearch,
} from "./components/navigation/Navbar";

export type {
  NavbarProps,
  NavbarBrandProps,
  NavbarSectionProps,
  NavbarWithSearchProps,
} from "./components/navigation/Navbar";
export {
  Breadcrumbs,
  CompactBreadcrumbs,
  SolidBreadcrumbs,
  ChevronBreadcrumbs,
  ResponsiveBreadcrumbs,
  BreadcrumbItemComponent,
} from "./components/navigation/Breadcrumbs";

export type {
  BreadcrumbsProps,
  BreadcrumbItem,
  BreadcrumbItemProps,
  ResponsiveBreadcrumbsProps,
} from "./components/navigation/Breadcrumbs";

export {
  Steps,
  Stepper,
  Wizard,
  ProgressSteps,
} from "./components/navigation/Steps";

export type {
  StepsProps,
  Step,
  StepStatus,
  StepperProps,
  WizardProps,
  ProgressStepsProps,
} from "./components/navigation/Steps";
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
export {
  SearchBox,
  SearchBoxAutocomplete,
  QuickSearch,
} from "./components/forms/Searchbox";

export type {
  SearchBoxProps,
  SearchBoxAutocompleteProps,
} from "./components/forms/Searchbox";
export { RangeSlider } from "./components/forms/RangeSlider";
export { Toggle, ToggleGroup } from "./components/forms/Toggle";
export { FileUpload } from "./components/forms/FileUpload";

// ** Feedback components
export {
  Alert,
  SuccessAlert,
  WarningAlert,
  ErrorAlert,
  InfoAlert,
  NeutralAlert,
  InlineAlert,
  ToastAlert,
  BannerAlert,
  ActionAlert,
} from "./components/feedback/Alert";

export type {
  AlertProps,
  ToastAlertProps,
  ActionAlertProps,
} from "./components/feedback/Alert";

export {
  Toast,
  ToastProvider,
  ToastContainer,
  useToast,
  useToastNotifications,
  toast,
} from "./components/feedback/Toast";

export type {
  ToastProps,
  ToastOptions,
  ToastPosition,
  ToastProviderProps,
} from "./components/feedback/Toast";

export {
  Progress,
  SuccessProgress,
  WarningProgress,
  ErrorProgress,
  InfoProgress,
  BrandProgress,
  LoadingProgress,
  StepProgress,
} from "./components/feedback/Progress";

export type {
  ProgressProps,
  StepProgressProps,
} from "./components/feedback/Progress";

// Spinner Components
export {
  Spinner,
  SuccessSpinner,
  WarningSpinner,
  ErrorSpinner,
  InfoSpinner,
  BrandSpinner,
  PageLoader,
  ButtonSpinner,
  InlineSpinner,
} from "./components/feedback/Spinner";

export type {
  SpinnerProps,
  PageLoaderProps,
} from "./components/feedback/Spinner";

export {
  Tooltip,
  DarkTooltip,
  LightTooltip,
  BrandTooltip,
  SimpleTooltip,
  InfoTooltip,
  ErrorTooltip,
  ShortcutTooltip,
  ControlledTooltip,
} from "./components/feedback/Tooltip";

export type {
  TooltipProps,
  TooltipPosition,
  SimpleTooltipProps,
  ShortcutTooltipProps,
  ControlledTooltipProps,
} from "./components/feedback/Tooltip";

export {
  Modal,
  ConfirmationModal,
  AlertModal,
  FullscreenModal,
  DrawerModal,
  useModal,
} from "./components/feedback/Modal";

export type {
  ModalProps,
  ConfirmationModalProps,
  DrawerModalProps,
} from "./components/feedback/Modal";

export {
  Popover,
  DropdownPopover,
  MenuPopover,
  TooltipPopover,
  DatePopover,
  ColorPopover,
  usePopover,
} from "./components/feedback/Popover";

export type {
  PopoverProps,
  PopoverPosition,
  DropdownPopoverProps,
  DatePopoverProps,
  ColorPopoverProps,
} from "./components/feedback/Popover";

// Utilities

export { Portal } from "./components/utility/Portal";
export type { PortalProps } from "./components/utility/Portal";
// In packages/ui/src/index.ts - add these lines:

// Divider Component
export {
  Divider,
  SolidDivider,
  DashedDivider,
  DottedDivider,
  VerticalDivider,
  HorizontalDivider,
  ThinDivider,
  ThickDivider,
  HalfDivider,
  InsetDivider,
  LabeledDivider,
  CompactDivider,
  SpaciousDivider,
} from "./components/utility/Divider";

export type {
  DividerProps,
  DividerVariant,
  DividerOrientation,
  DividerLength,
  DividerWeight,
} from "./components/utility/Divider";

export {
  Image,
  RoundedImage,
  CircleImage,
  BorderedImage,
  CoverImage,
  ContainImage,
  SquareImage,
  WidescreenImage,
  PortraitImage,
  NextImageWrapper,
} from "./components/utility/Image";
export type {
  ImageProps,
  NextImageProps,
  NextImageWrapperProps,
} from "./components/utility/Image";

export {
  Link,
  PrimaryLink,
  SecondaryLink,
  GhostLink,
  UnderlineLink,
  SmallLink,
  LargeLink,
  ExternalLink,
  DisabledLink,
  IconLink,
  NavLink,
  NextLinkWrapper,
} from "./components/utility/Link";
export type {
  LinkProps,
  NextLinkProps,
  NavLinkProps,
  NextLinkWrapperProps,
  LinkVariant,
  LinkSize,
  LinkUnderline,
} from "./components/utility/Link";

export {
  Icon,
  IconWithBadge,
  IconButton,
  IconText,
  IconTextLeft,
  IconTextRight,
  IconTextTop,
  IconTextBottom,
  PrimaryIconButton,
  SecondaryIconButton,
  OutlineIconButton,
  GhostIconButton,
  TextIconButton,
  SmallIconButton,
  LargeIconButton,
  CircularIconButton,
  SquareIconButton,
} from "./components/utility/Icon";
export type {
  IconProps,
  LucideIconName,
  IconColor,
  IconSize,
  IconButtonProps,
  IconButtonVariant,
  IconButtonSize,
  IconTextProps,
} from "./components/utility/Icon";

export {
  Combobox,
  PrimaryCombobox,
  OutlineCombobox,
  MultiCombobox,
  SearchCombobox,
  CreatableCombobox,
} from "./components/advanced/Combobox";
export type {
  ComboboxProps,
  ComboboxOption,
  ComboboxVariant,
  ComboboxSize,
} from "./components/advanced/Combobox";
export {
  Autocomplete,
  PrimaryAutocomplete,
  OutlineAutocomplete,
  AsyncAutocomplete,
  FreeSoloAutocomplete,
} from "./components/advanced/AutoComplete";
export type {
  AutocompleteProps,
  AutocompleteOption,
  AutocompleteSource,
  AutocompleteVariant,
  AutocompleteSize,
} from "./components/advanced/AutoComplete";
export {
  Carousel,
  CardCarousel,
  GalleryCarousel,
  AutoPlayCarousel,
  InfiniteCarousel,
  MultiSlideCarousel,
  CenterModeCarousel,
} from "./components/advanced/Carousel";
export type {
  CarouselProps,
  CarouselItem,
  CarouselVariant,
  CarouselControlPosition,
  CarouselTransition,
} from "./components/advanced/Carousel";
export {
  DataGrid,
  BorderedDataGrid,
  StripedDataGrid,
  CompactDataGrid,
  SelectableDataGrid,
  PaginatedDataGrid,
} from "./components/advanced/DataGrid";
export type {
  DataGridProps,
  DataGridVariant,
  DataGridSize,
  Alignment,
} from "./components/advanced/DataGrid";
// export {
//   Chart,
//   LineChart,
//   BarChart,
//   PieChart,
//   DoughnutChart,
//   AreaChart,
//   ScatterChart,
//   MinimalChart,
//   GradientChart,
//   useChartColors,
//   generateChartData,
// } from "./components/advanced/Chart";
// export type {
//   ChartProps,
//   ChartDataset,
//   ChartOptions,
//   ChartType,
//   ChartVariant,
//   ChartSize,
// } from "./components/advanced/Chart";
// Re-export Lucide icons for convenience
export * as LucideIcons from "lucide-react";
// Re-export everything for easy imports
export * as ThemeUtils from "./utils/theme-builder";
