import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const menuItems = [
  { href: "/docs", label: "Get Started" },
  { href: "/docs/get-started/installation", label: "Installation" },
  { href: "/docs/get-started/theming", label: "Theming" },
  {
    href: "/docs/get-started/theme-customization",
    label: "Theme Customization",
  },
];

const foundationComponents = [
  { href: "/docs/components/typography", label: "Typography", available: true },
  {
    href: "/docs/components/foundation/box",
    label: "Box",
    available: true,
  },
  { href: "/docs/components/container", label: "Container", available: false },
  { href: "/docs/components/foundation/grid", label: "Grid", available: true },
  { href: "/docs/components/foundation/flex", label: "Flex", available: true },
];

const formComponents = [
  { href: "/docs/components/forms/button", label: "Button", available: true },
  { href: "/docs/components/forms/input", label: "InputDocs", available: true },
  {
    href: "/docs/components/forms/textarea",
    label: "Textarea",
    available: true,
  },
  { href: "/docs/components/forms/select", label: "Select", available: true },
  {
    href: "/docs/components/forms/checkbox",
    label: "Checkbox",
    available: true,
  },
  { href: "/docs/components/forms/radio", label: "Radio", available: true },
  { href: "/docs/components/forms/toggle", label: "Toggle", available: true },
  { href: "/docs/components/forms/slider", label: "Slider", available: false },
  {
    href: "/docs/components/forms/datepicker",
    label: "DatePicker",
    available: false,
  },
  {
    href: "/docs/components/timepicker",
    label: "TimePicker",
    available: false,
  },
  {
    href: "/docs/components/fileupload",
    label: "FileUpload",
    available: false,
  },
  { href: "/docs/components/form", label: "Form", available: false },
];

const navigationComponents = [
  { href: "/docs/components/navbar", label: "Navbar", available: false },
  { href: "/docs/components/navigation/menu", label: "Menu", available: true },
  { href: "/docs/components/tabs", label: "Tabs", available: false },
  {
    href: "/docs/components/breadcrumbs",
    label: "Breadcrumbs",
    available: false,
  },
  {
    href: "/docs/components/pagination",
    label: "Pagination",
    available: false,
  },
  { href: "/docs/components/sidebar", label: "Sidebar", available: false },
  { href: "/docs/components/steps", label: "Steps", available: false },
];

const feedbackComponents = [
  { href: "/docs/components/alert", label: "Alert", available: false },
  { href: "/docs/components/toast", label: "Toast", available: false },
  { href: "/docs/components/modal", label: "Modal", available: false },
  { href: "/docs/components/drawer", label: "Drawer", available: false },
  { href: "/docs/components/tooltip", label: "Tooltip", available: false },
  { href: "/docs/components/popover", label: "Popover", available: false },
  { href: "/docs/components/progress", label: "Progress", available: false },
  { href: "/docs/components/spinner", label: "Spinner", available: false },
  { href: "/docs/components/skeleton", label: "Skeleton", available: false },
];

const dataDisplayComponents = [
  { href: "/docs/components/card", label: "Card", available: true },
  { href: "/docs/components/table", label: "Table", available: false },
  { href: "/docs/components/list", label: "List", available: false },
  { href: "/docs/components/avatar", label: "Avatar", available: false },
  { href: "/docs/components/badge", label: "Badge", available: false },
  { href: "/docs/components/chip", label: "Chip", available: false },
  { href: "/docs/components/accordion", label: "Accordion", available: false },
  { href: "/docs/components/tree", label: "Tree", available: false },
  { href: "/docs/components/timeline", label: "Timeline", available: false },
];

const utilityComponents = [
  { href: "/docs/components/divider", label: "Divider", available: false },
  { href: "/docs/components/icon", label: "Icon", available: false },
  { href: "/docs/components/image", label: "Image", available: false },
  { href: "/docs/components/link", label: "Link", available: false },
  { href: "/docs/components/portal", label: "Portal", available: false },
];

const layoutComponents = [
  { href: "/docs/components/stack", label: "Stack", available: false },
  { href: "/docs/components/center", label: "Center", available: false },
  {
    href: "/docs/components/aspectratio",
    label: "AspectRatio",
    available: false,
  },
  { href: "/docs/components/wrap", label: "Wrap", available: false },
];

const themeComponents = [
  {
    href: "/docs/components/themetoggle",
    label: "ThemeToggle",
    available: false,
  },
  {
    href: "/docs/components/colorpicker",
    label: "ColorPicker",
    available: false,
  },
  {
    href: "/docs/components/themepreview",
    label: "ThemePreview",
    available: false,
  },
];

const advancedComponents = [
  {
    href: "/docs/components/autocomplete",
    label: "Autocomplete",
    available: false,
  },
  { href: "/docs/components/combobox", label: "Combobox", available: false },
  { href: "/docs/components/calendar", label: "Calendar", available: false },
  { href: "/docs/components/carousel", label: "Carousel", available: false },
  { href: "/docs/components/datagrid", label: "DataGrid", available: false },
  { href: "/docs/components/chart", label: "Chart", available: false },
  { href: "/docs/components/editor", label: "Editor", available: false },
];

const mobileComponents = [
  {
    href: "/docs/components/bottomsheet",
    label: "BottomSheet",
    available: false,
  },
  { href: "/docs/components/swipeable", label: "Swipeable", available: false },
  {
    href: "/docs/components/pulltorefresh",
    label: "PullToRefresh",
    available: false,
  },
];

interface CategoryProps {
  title: string;
  items: Array<{ href: string; label: string; available: boolean }>;
  defaultOpen?: boolean;
}

const CategorySection = ({
  title,
  items,
  defaultOpen = false,
}: CategoryProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const router = useRouter();

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
      >
        <span>{title}</span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="ml-2 mt-1 space-y-1">
          {items.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-1.5 rounded text-sm transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : item.available
                    ? "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                onClick={(e: { preventDefault: () => any }) =>
                  !item.available && e.preventDefault()
                }
              >
                <div className="flex items-center justify-between">
                  <span>{item.label}</span>
                  {!item.available && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100">
                      Soon
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="w-64 h-screen fixed left-0 top-0 overflow-y-auto pt-16">
      <div className="p-4">
        {/* Main Navigation */}
        <div className="mb-6">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Documentation
          </h3>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Components Categories */}
        <div className="space-y-4">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Components
          </h3>

          {/* Priority Components (Default Open) */}
          <div className="mb-4">
            <h4 className="px-3 text-sm font-medium text-gray-900 mb-2">
              Priority Components
            </h4>
            <div className="space-y-1 ml-2">
              {formComponents
                .filter(
                  (item) =>
                    item.label === "Input" ||
                    item.label === "Textarea" ||
                    item.label === "Select"
                )
                .map((item) => {
                  const isActive = router.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-3 py-1.5 rounded text-sm transition-colors ${
                        isActive
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : item.available
                          ? "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          : "text-gray-400 cursor-not-allowed"
                      }`}
                      onClick={(e: { preventDefault: () => any }) =>
                        !item.available && e.preventDefault()
                      }
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.label}</span>
                        {!item.available && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100">
                            Soon
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>

          {/* Categories */}
          <CategorySection
            title="Foundation"
            items={foundationComponents}
            defaultOpen={true}
          />

          <CategorySection title="Form Components" items={formComponents} />

          <CategorySection title="Navigation" items={navigationComponents} />

          <CategorySection title="Feedback" items={feedbackComponents} />

          <CategorySection
            title="Data Display"
            items={dataDisplayComponents}
            defaultOpen={true}
          />

          <CategorySection title="Utility" items={utilityComponents} />

          <CategorySection title="Layout" items={layoutComponents} />

          <CategorySection
            title="Theme & Customization"
            items={themeComponents}
          />

          <CategorySection title="Advanced" items={advancedComponents} />

          <CategorySection title="Mobile" items={mobileComponents} />
        </div>

        {/* Stats */}
        <div className="mt-8 p-3 rounded-lg bg-gray-50">
          <div className="text-xs text-gray-600">
            <div className="flex justify-between mb-1">
              <span>Total Components:</span>
              <span className="font-medium">67</span>
            </div>
            <div className="flex justify-between">
              <span>Available Now:</span>
              <span className="font-medium text-green-600">4</span>
            </div>
            <div className="flex justify-between">
              <span>Coming Soon:</span>
              <span className="font-medium text-blue-600">63</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
