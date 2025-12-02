import { DocsLayout } from "../../components/layout/DocsLayout";
import {
  ThemeProvider,
  defaultTheme,
  userLightTheme,
  userDarkTheme,
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
            Simple Copy-Paste Theming
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Zaalim UI makes theming simple. Just copy the theme template,
            replace the colors with your brand colors, and all components will
            automatically use your custom theme.
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
              value={activeTheme === "light" ? userLightTheme : userDarkTheme}
            >
              <div
                className="p-6 rounded-lg space-y-6"
                style={{
                  backgroundColor:
                    activeTheme === "light"
                      ? userLightTheme.colors.background
                      : userDarkTheme.colors.background,
                }}
              >
                <h4
                  className="text-lg font-medium"
                  style={{
                    color:
                      activeTheme === "light"
                        ? userLightTheme.colors.text.primary
                        : userDarkTheme.colors.text.primary,
                  }}
                >
                  Your Custom Theme Preview
                </h4>

                <div className="flex gap-4 flex-wrap">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                </div>

                <Card>
                  <CardContent>
                    <p
                      style={{
                        color:
                          activeTheme === "light"
                            ? userLightTheme.colors.text.primary
                            : userDarkTheme.colors.text.primary,
                      }}
                    >
                      This card shows how your custom theme looks with real
                      components.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ThemeProvider>
          </CardContent>
        </Card>

        {/* How to Use */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            How to Use Custom Themes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <Card>
              <CardContent className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold text-gray-900">
                  Copy Theme Template
                </h3>
                <p className="text-sm text-gray-600">
                  Copy the theme template from{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    user-theme.ts
                  </code>{" "}
                  file.
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card>
              <CardContent className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold text-gray-900">Replace Colors</h3>
                <p className="text-sm text-gray-600">
                  Replace all color values with your brand colors. Keep the
                  structure exactly the same.
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card>
              <CardContent className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold text-gray-900">Import & Use</h3>
                <p className="text-sm text-gray-600">
                  Import your custom theme and pass it to{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    ThemeProvider
                  </code>
                  .
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Code Example */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Theme Template Example</h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Here's what the theme template looks like. Users copy this,
              replace the colors, and save as their own theme file.
            </p>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-300">
                {`// user-theme.ts - Theme Template
export const userLightTheme = {
  colors: {
    primary: "#YOUR_PRIMARY_COLOR",     // ← Replace with your color
    secondary: "#YOUR_SECONDARY_COLOR", // ← Replace with your color
    accent: "#YOUR_ACCENT_COLOR",       // ← Replace with your color
    background: "#YOUR_BACKGROUND",     // ← Replace with your color
    surface: "#YOUR_SURFACE_COLOR",     // ← Replace with your color
    text: {
      primary: "#YOUR_TEXT_PRIMARY",    // ← Replace with your color
      secondary: "#YOUR_TEXT_SECONDARY",// ← Replace with your color
    },
  },
};


// ... dark theme follows same pattern
export const userDarkTheme = {
  colors: {
    primary: "#YOUR_PRIMARY_COLOR",     // ← Replace with your color
    secondary: "#YOUR_SECONDARY_COLOR", // ← Replace with your color
    accent: "#YOUR_ACCENT_COLOR",       // ← Replace with your color
    background: "#YOUR_BACKGROUND",     // ← Replace with your color
    surface: "#YOUR_SURFACE_COLOR",     // ← Replace with your color
    text: {
      primary: "#YOUR_TEXT_PRIMARY",    // ← Replace with your color
      secondary: "#YOUR_TEXT_SECONDARY",// ← Replace with your color
    },
  },
};

`}
              </pre>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tip</h4>
              <p className="text-blue-700 text-sm">
                Keep the exact same property names and structure. Only change
                the color values (hex codes). This ensures all components work
                correctly with your custom theme.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Usage Code */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Usage in Your App</h3>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-sm text-gray-300">
                {`// 1. Import ThemeProvider and your custom theme
import { ThemeProvider } from 'zaalim-ui'
import { userLightTheme } from './your-theme-file'

// 2. Wrap your app with ThemeProvider
function App() {
  return (
    <ThemeProvider value={userLightTheme}>
      <YourAppComponents />
    </ThemeProvider>
  )
}

// 3. That's it! All components now use your custom colors
//    For dark mode, use userDarkTheme instead`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </DocsLayout>
  );
}
