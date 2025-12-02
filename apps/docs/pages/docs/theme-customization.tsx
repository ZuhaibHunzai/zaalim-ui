import { DocsLayout } from "../../components/layout/DocsLayout";
import {
  ThemeProvider,
  defaultTheme,
  darkTheme,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "zaalim-ui";
import { useState } from "react";

export default function ThemeCustomization() {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");

  return (
    <DocsLayout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Theme Customization
        </h1>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Advanced Theme System
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Zaalim UI features a comprehensive theme system with brand scales,
            semantic colors, and multiple variants. Copy the theme template and
            customize every aspect of your design system.
          </p>
        </div>

        {/* Live Preview */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Live Theme Preview</h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={activeTheme === "light" ? "primary" : "outline"}
                  onClick={() => setActiveTheme("light")}
                >
                  Light Theme
                </Button>
                <Button
                  size="sm"
                  variant={activeTheme === "dark" ? "primary" : "outline"}
                  onClick={() => setActiveTheme("dark")}
                >
                  Dark Theme
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ThemeProvider
              value={activeTheme === "light" ? defaultTheme : darkTheme}
            >
              <div
                className="p-6 rounded-lg space-y-6"
                style={{
                  backgroundColor:
                    activeTheme === "light"
                      ? defaultTheme.colors.background
                      : darkTheme.colors.background,
                }}
              >
                <h4
                  className="text-lg font-medium"
                  style={{
                    color:
                      activeTheme === "light"
                        ? defaultTheme.colors.text.primary
                        : darkTheme.colors.text.primary,
                  }}
                >
                  Zaalim UI Signature Theme Preview
                </h4>

                <div className="flex gap-4 flex-wrap">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card variant="default" hoverable>
                    <CardContent>
                      <p className="font-medium mb-2">Default Card</p>
                      <p className="text-sm text-muted">
                        Hoverable card with subtle shadow
                      </p>
                    </CardContent>
                  </Card>

                  <Card variant="elevated">
                    <CardContent>
                      <p className="font-medium mb-2">Elevated Card</p>
                      <p className="text-sm text-muted">
                        More prominent elevation
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Brand Colors Preview */}
                <div className="pt-4 border-t border-surfaceBorder">
                  <h5 className="font-medium mb-3">Brand Color Scale</h5>
                  <div className="flex gap-2 flex-wrap">
                    {[50, 100, 200, 300, 400, 500, 600].map((shade) => (
                      <div
                        key={shade}
                        className="w-10 h-10 rounded flex items-center justify-center text-xs font-medium"
                        style={{
                          backgroundColor:
                            activeTheme === "light"
                              ? defaultTheme.colors.brand[
                                  shade as keyof typeof defaultTheme.colors.brand
                                ]
                              : darkTheme.colors.brand[
                                  shade as keyof typeof darkTheme.colors.brand
                                ],
                          color: shade >= 500 ? "#FFFFFF" : "#000000",
                        }}
                      >
                        {shade}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted mt-2">
                    Shades 50-600 with 500 as primary brand color
                  </p>
                </div>
              </div>
            </ThemeProvider>
          </CardContent>
        </Card>

        {/* How to Use */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            How to Create Custom Themes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <Card>
              <CardContent className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                  <span className="text-brand-600 font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold text-gray-900">
                  Copy Full Theme Structure
                </h3>
                <p className="text-sm text-gray-600">
                  Copy the complete theme structure with all color tokens
                  including brand scale, semantic colors, and states.
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card>
              <CardContent className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                  <span className="text-brand-600 font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold text-gray-900">
                  Customize All Colors
                </h3>
                <p className="text-sm text-gray-600">
                  Replace the color values while keeping the exact structure.
                  Define your brand scale from 50-600.
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card>
              <CardContent className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                  <span className="text-brand-600 font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold text-gray-900">Import & Use</h3>
                <p className="text-sm text-gray-600">
                  Import your theme and use with{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    ThemeProvider
                  </code>
                  . All components will adapt automatically.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Code Example */}
        <Card variant="elevated">
          <CardHeader>
            <h3 className="text-lg font-semibold">Complete Theme Structure</h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Here's the complete theme structure you need to copy and
              customize:
            </p>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-300">
                {`// Custom Theme Template - Copy and customize all values
export const customLightTheme = {
  colors: {
    // Brand Colors Scale (6 shades)
    brand: {
      50: "#YOUR_BRAND_50",    // Lightest shade
      100: "#YOUR_BRAND_100",   // Very light
      200: "#YOUR_BRAND_200",   // Light
      300: "#YOUR_BRAND_300",   // Medium light
      400: "#YOUR_BRAND_400",   // Medium
      500: "#YOUR_BRAND_500",   // Primary brand color
      600: "#YOUR_BRAND_600",   // Text on primary
    },

    // Supporting Colors
    secondary: "#YOUR_SECONDARY_COLOR",
    accent: "#YOUR_ACCENT_COLOR",

    // Backgrounds & Surfaces
    background: "#YOUR_BACKGROUND",
    backgroundSubtle: "#YOUR_BACKGROUND_SUBTLE",
    surface: "#YOUR_SURFACE",
    surfaceHover: "#YOUR_SURFACE_HOVER",
    surfaceBorder: "#YOUR_SURFACE_BORDER",

    // Text Colors
    text: {
      primary: "#YOUR_TEXT_PRIMARY",
      secondary: "#YOUR_TEXT_SECONDARY",
      muted: "#YOUR_TEXT_MUTED",
      inverted: "#YOUR_TEXT_INVERTED",
      disabled: "#YOUR_TEXT_DISABLED",
    },

    // States
    border: "#YOUR_BORDER_COLOR",
    borderHover: "#YOUR_BORDER_HOVER",
    focusRing: "#YOUR_FOCUS_RING",
    overlay: "YOUR_OVERLAY_COLOR",

    // Semantic Colors
    success: "#YOUR_SUCCESS_COLOR",
    warning: "#YOUR_WARNING_COLOR",
    error: "#YOUR_ERROR_COLOR",
    info: "#YOUR_INFO_COLOR",
  },
};

// Create similar structure for dark theme
export const customDarkTheme = {
  colors: {
    // ... same structure with dark mode values
  },
};`}
              </pre>
            </div>

            <div className="mt-6 p-4 bg-brand-50 rounded-lg border border-brand-200">
              <h4 className="font-medium text-brand-900 mb-2">
                🎨 Theme Builder Utility
              </h4>
              <p className="text-brand-700 text-sm">
                Use the{" "}
                <code className="bg-brand-100 px-1 rounded">createTheme()</code>{" "}
                utility to generate a theme from just your primary color, or{" "}
                <code className="bg-brand-100 px-1 rounded">
                  createThemePair()
                </code>
                for light/dark themes.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Usage Example */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Implementation Example</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-300">
                  {`// Option 1: Import and use custom theme
import { ThemeProvider } from 'zaalim-ui'
import { customLightTheme } from './your-theme-file'

function App() {
  return (
    <ThemeProvider value={customLightTheme}>
      <YourAppComponents />
    </ThemeProvider>
  )
}

// Option 2: Use theme builder utilities
import { createThemePair } from 'zaalim-ui'

const { light, dark } = createThemePair(
  { primary: '#YOUR_PRIMARY_COLOR' },
  { primary: '#YOUR_DARK_PRIMARY' }
)

// Switch between themes
<ThemeProvider value={isDark ? dark : light}>`}
                </pre>
              </div>

              <div className="p-4 bg-success-50 rounded-lg border border-success-200">
                <h4 className="font-medium text-success-900 mb-2">
                  ✅ All Components Are Theme-Aware
                </h4>
                <p className="text-success-700 text-sm">
                  Buttons, Cards, and all future components automatically use
                  your custom theme colors. Change your brand color once, and
                  see it reflected across your entire application.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DocsLayout>
  );
}
