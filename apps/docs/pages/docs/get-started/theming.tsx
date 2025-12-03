import { DocsLayout } from "../../../components/layout/DocsLayout";
import {
  ThemeProvider,
  defaultTheme,
  darkTheme,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "zaalim-ui";
import { useState } from "react";

export default function Theming() {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);
  const isDark = currentTheme === darkTheme;

  return (
    <ThemeProvider value={currentTheme}>
      <DocsLayout>
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1
              className="text-4xl font-bold"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Theming System
            </h1>
            <div className="flex gap-2">
              <Button
                variant={currentTheme === defaultTheme ? "primary" : "outline"}
                onClick={() => setCurrentTheme(defaultTheme)}
              >
                Light Theme
              </Button>
              <Button
                variant={currentTheme === darkTheme ? "primary" : "outline"}
                onClick={() => setCurrentTheme(darkTheme)}
              >
                Dark Theme
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h2
              className="text-2xl font-semibold"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Comprehensive Theme Architecture
            </h2>
            <p style={{ color: currentTheme.colors.text.secondary }}>
              Zaalim UI features an advanced theming system with brand scales,
              semantic colors, and multiple theme variants. All components are
              theme-aware and adapt automatically.
            </p>
          </div>

          {/* Theme Demo */}
          <Card variant="elevated">
            <CardHeader>
              <h3
                className="text-lg font-semibold"
                style={{ color: currentTheme.colors.text.primary }}
              >
                Live Theme Preview: {isDark ? "Dark Mode" : "Light Mode"}
              </h3>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Component Showcase */}
              <div
                className="p-6 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.backgroundSubtle,
                }}
              >
                <h4
                  className="font-medium mb-4"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  Component Styles
                </h4>
                <div className="flex gap-4 flex-wrap">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </div>

              {/* Card Examples */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card hoverable>
                  <CardContent>
                    <h5
                      className="font-medium mb-2"
                      style={{ color: currentTheme.colors.text.primary }}
                    >
                      Default Card
                    </h5>
                    <p
                      className="text-sm"
                      style={{ color: currentTheme.colors.text.secondary }}
                    >
                      Hoverable card showing current theme styles
                    </p>
                  </CardContent>
                </Card>

                <Card variant="ghost">
                  <CardContent>
                    <h5
                      className="font-medium mb-2"
                      style={{ color: currentTheme.colors.text.primary }}
                    >
                      Ghost Card
                    </h5>
                    <p
                      className="text-sm"
                      style={{ color: currentTheme.colors.text.secondary }}
                    >
                      Minimal styling variant
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Brand Scale */}
              <div
                className="pt-4 border-t"
                style={{ borderColor: currentTheme.colors.surfaceBorder }}
              >
                <h4
                  className="font-medium mb-3"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  Brand Color Scale
                </h4>
                <div className="flex gap-2 flex-wrap">
                  {[50, 100, 200, 300, 400, 500, 600].map((shade) => (
                    <div
                      key={shade}
                      className="w-12 h-12 rounded flex flex-col items-center justify-center text-xs"
                      style={{
                        backgroundColor:
                          currentTheme.colors.brand[
                            shade as keyof typeof currentTheme.colors.brand
                          ],
                        color:
                          shade >= 500
                            ? currentTheme.colors.text.inverted
                            : currentTheme.colors.text.primary,
                      }}
                    >
                      <span className="font-bold">{shade}</span>
                      <span className="text-[10px] opacity-75">
                        {shade === 500
                          ? "Primary"
                          : shade === 600
                          ? "Text"
                          : ""}
                      </span>
                    </div>
                  ))}
                </div>
                <p
                  className="text-sm mt-2"
                  style={{ color: currentTheme.colors.text.muted }}
                >
                  Shades 50-600 with 500 as primary brand color and 600 as
                  text-on-primary
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between items-center w-full text-sm">
                <span style={{ color: currentTheme.colors.text.muted }}>
                  Theme:{" "}
                  <strong style={{ color: currentTheme.colors.text.primary }}>
                    {isDark ? "Dark" : "Light"}
                  </strong>
                </span>
                <span style={{ color: currentTheme.colors.text.muted }}>
                  Primary:{" "}
                  <code
                    className="ml-1 px-1 rounded"
                    style={{
                      backgroundColor: currentTheme.colors.brand[100],
                      color: currentTheme.colors.brand[600],
                    }}
                  >
                    {currentTheme.colors.brand[500]}
                  </code>
                </span>
              </div>
            </CardFooter>
          </Card>

          {/* Theme Structure */}
          <div className="space-y-6">
            <h2
              className="text-2xl font-semibold"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Theme Structure
            </h2>
            <Card>
              <CardContent className="space-y-4">
                <p style={{ color: currentTheme.colors.text.secondary }}>
                  Zaalim UI themes follow a comprehensive structure with brand
                  scales, semantic colors, and multiple color tokens for
                  consistent theming across all components.
                </p>

                <div
                  className="p-4 rounded-lg"
                  style={{
                    backgroundColor: currentTheme.colors.brand[50],
                    border: `1px solid ${currentTheme.colors.brand[200]}`,
                  }}
                >
                  <pre
                    className="text-sm"
                    style={{ color: currentTheme.colors.brand[600] }}
                  >
                    {`// Complete theme structure
interface Theme {
  colors: {
    // Brand Colors (6 shades)
    brand: {
      50: string;   // Lightest
      100: string;  // Very light
      200: string;  // Light
      300: string;  // Medium light
      400: string;  // Medium
      500: string;  // Primary brand color
      600: string;  // Text on primary
    };

    // Supporting Colors
    secondary: string;
    accent: string;

    // Backgrounds & Surfaces
    background: string;
    backgroundSubtle: string;
    surface: string;
    surfaceHover: string;
    surfaceBorder: string;

    // Text Colors
    text: {
      primary: string;
      secondary: string;
      muted: string;
      inverted: string;
      disabled: string;
    };

    // States
    border: string;
    borderHover: string;
    focusRing: string;
    overlay: string;

    // Semantic Colors
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Theme Usage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card hoverable>
              <CardContent className="space-y-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: currentTheme.colors.brand[500],
                    color: currentTheme.colors.brand[600],
                  }}
                >
                  <span className="text-xl">🎨</span>
                </div>
                <h3
                  className="font-semibold"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  Built-in Themes
                </h3>
                <p
                  className="text-sm"
                  style={{ color: currentTheme.colors.text.secondary }}
                >
                  Use{" "}
                  <code
                    className="px-1 rounded text-xs"
                    style={{
                      backgroundColor: currentTheme.colors.surfaceHover,
                    }}
                  >
                    defaultTheme
                  </code>{" "}
                  or{" "}
                  <code
                    className="px-1 rounded text-xs"
                    style={{
                      backgroundColor: currentTheme.colors.surfaceHover,
                    }}
                  >
                    darkTheme
                  </code>{" "}
                  out of the box.
                </p>
              </CardContent>
            </Card>

            <Card hoverable>
              <CardContent className="space-y-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: currentTheme.colors.accent,
                    color: currentTheme.colors.text.inverted,
                  }}
                >
                  <span className="text-xl">🛠️</span>
                </div>
                <h3
                  className="font-semibold"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  Custom Themes
                </h3>
                <p
                  className="text-sm"
                  style={{ color: currentTheme.colors.text.secondary }}
                >
                  Create your own themes using the{" "}
                  <code
                    className="px-1 rounded text-xs"
                    style={{
                      backgroundColor: currentTheme.colors.surfaceHover,
                    }}
                  >
                    createTheme()
                  </code>{" "}
                  utility.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Examples */}
          <Card variant="elevated">
            <CardHeader>
              <h3
                className="text-lg font-semibold"
                style={{ color: currentTheme.colors.text.primary }}
              >
                Quick Examples
              </h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="">
                {/* Built-in Theme Example */}
                <div className="relative group">
                  <div
                    className="absolute -top-2 left-4 px-2 py-1 rounded text-xs font-medium z-10"
                    style={{
                      backgroundColor: currentTheme.colors.brand[500],
                      color: currentTheme.colors.brand[600],
                    }}
                  >
                    Built-in
                  </div>
                  <div
                    className="p-5 rounded-xl border-2 pt-6"
                    style={{
                      backgroundColor: currentTheme.colors.surface,
                      borderColor: currentTheme.colors.brand[200],
                      borderTopColor: currentTheme.colors.brand[500],
                    }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: currentTheme.colors.brand[100],
                          color: currentTheme.colors.brand[600],
                        }}
                      >
                        <span className="text-sm">🎨</span>
                      </div>
                      <div>
                        <h4
                          className="font-medium"
                          style={{ color: currentTheme.colors.text.primary }}
                        >
                          Use Default Theme
                        </h4>
                        <p
                          className="text-xs mt-1"
                          style={{ color: currentTheme.colors.text.muted }}
                        >
                          Quick start with built-in theme
                        </p>
                      </div>
                    </div>
                    <pre
                      className="text-sm p-3 rounded-lg overflow-x-auto"
                      style={{
                        backgroundColor: currentTheme.colors.backgroundSubtle,
                        color: currentTheme.colors.text.primary,
                      }}
                    >
                      {`import { ThemeProvider, defaultTheme } from 'zaalim-ui'

function App() {
  return (
    <ThemeProvider value={defaultTheme}>
      <YourComponents />
    </ThemeProvider>
  )
}`}
                    </pre>
                  </div>
                </div>

                {/* Custom Theme Example */}
                <div className="relative group mt-6">
                  <div
                    className="absolute -top-2 left-4 px-2 py-1 rounded text-xs font-medium z-10"
                    style={{
                      backgroundColor: currentTheme.colors.accent,
                      color: currentTheme.colors.text.inverted,
                    }}
                  >
                    Custom
                  </div>
                  <div
                    className="p-5 rounded-xl border-2 pt-6"
                    style={{
                      backgroundColor: currentTheme.colors.surface,
                      borderColor: currentTheme.colors.surfaceBorder,
                      borderTopColor: currentTheme.colors.accent,
                    }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: currentTheme.colors.accent + "20",
                          color: currentTheme.colors.accent,
                        }}
                      >
                        <span className="text-sm">🛠️</span>
                      </div>
                      <div>
                        <h4
                          className="font-medium"
                          style={{ color: currentTheme.colors.text.primary }}
                        >
                          Create Custom Theme
                        </h4>
                        <p
                          className="text-xs mt-1"
                          style={{ color: currentTheme.colors.text.muted }}
                        >
                          Build your own color scheme
                        </p>
                      </div>
                    </div>
                    <pre
                      className="text-sm p-3 rounded-lg overflow-x-auto"
                      style={{
                        backgroundColor: currentTheme.colors.backgroundSubtle,
                        color: currentTheme.colors.text.primary,
                      }}
                    >
                      {`import { createTheme, ThemeProvider } from 'zaalim-ui'

const customTheme = createTheme({
  primary: '#FF5733',
  primaryText: '#FFFFFF'
})

function App() {
  return (
    <ThemeProvider value={customTheme}>
      <YourComponents />
    </ThemeProvider>
  )
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Theme Builder Demo */}
              <div
                className="p-5 rounded-xl"
                style={{
                  backgroundColor: currentTheme.colors.brand[50],
                  border: `2px dashed ${currentTheme.colors.brand[300]}`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: currentTheme.colors.brand[500],
                      color: currentTheme.colors.brand[600],
                    }}
                  >
                    <span className="text-lg">🎯</span>
                  </div>
                  <div>
                    <h4
                      className="font-semibold"
                      style={{ color: currentTheme.colors.brand[600] }}
                    >
                      Theme Builder Utility
                    </h4>
                    <p
                      className="text-sm"
                      style={{ color: currentTheme.colors.brand[600] + "CC" }}
                    >
                      Generate complete themes from a single primary color
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: currentTheme.colors.brand[100],
                      border: `1px solid ${currentTheme.colors.brand[200]}`,
                    }}
                  >
                    <code
                      className="text-xs block"
                      style={{ color: currentTheme.colors.brand[600] }}
                    >
                      <span style={{ opacity: 0.7 }}>
                        // Light theme from primary color
                      </span>
                      <br />
                      <span style={{ color: currentTheme.colors.brand[600] }}>
                        const lightTheme ={" "}
                      </span>
                      <span style={{ color: currentTheme.colors.accent }}>
                        createTheme
                      </span>
                      <span style={{ color: currentTheme.colors.brand[600] }}>
                        (
                      </span>
                      <span style={{ color: currentTheme.colors.success }}>
                        {'{ primary: "#4BE5D1" }'}
                      </span>
                      <span style={{ color: currentTheme.colors.brand[600] }}>
                        )
                      </span>
                    </code>
                  </div>
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: currentTheme.colors.brand[100],
                      border: `1px solid ${currentTheme.colors.brand[200]}`,
                    }}
                  >
                    <code
                      className="text-xs block"
                      style={{ color: currentTheme.colors.brand[600] }}
                    >
                      <span style={{ opacity: 0.7 }}>
                        // Both light & dark themes
                      </span>
                      <br />
                      <span style={{ color: currentTheme.colors.brand[600] }}>
                        const{" "}
                      </span>
                      <span style={{ color: currentTheme.colors.accent }}>
                        {"{ light, dark }"}
                      </span>
                      <span style={{ color: currentTheme.colors.brand[600] }}>
                        {" "}
                        ={" "}
                      </span>
                      <span style={{ color: currentTheme.colors.accent }}>
                        createThemePair
                      </span>
                      <span style={{ color: currentTheme.colors.brand[600] }}>
                        (
                      </span>
                      <span style={{ color: currentTheme.colors.success }}>
                        {'{ primary: "#4BE5D1" }'}
                      </span>
                      <span style={{ color: currentTheme.colors.brand[600] }}>
                        )
                      </span>
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-start gap-3 w-full">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: currentTheme.colors.info + "20",
                    color: currentTheme.colors.info,
                  }}
                >
                  ℹ️
                </div>
                <div>
                  <p
                    className="text-sm"
                    style={{ color: currentTheme.colors.text.secondary }}
                  >
                    <strong style={{ color: currentTheme.colors.text.primary }}>
                      All components are theme-aware:
                    </strong>{" "}
                    Buttons, Cards, and future components automatically adapt to
                    your theme colors. Change your brand color once, and see it
                    reflected across your entire application.
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>

          {/* Benefits */}
          <div className="space-y-6">
            <h2
              className="text-2xl font-semibold"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: "🎯",
                  title: "Consistent",
                  desc: "All components use the same color tokens",
                },
                {
                  icon: "⚡",
                  title: "Performant",
                  desc: "CSS variables for instant theme switching",
                },
                {
                  icon: "🔧",
                  title: "Customizable",
                  desc: "Full control over every aspect of your theme",
                },
              ].map((benefit, index) => (
                <Card key={index} hoverable>
                  <CardContent className="space-y-3">
                    <div className="text-2xl">{benefit.icon}</div>
                    <h4
                      className="font-medium"
                      style={{ color: currentTheme.colors.text.primary }}
                    >
                      {benefit.title}
                    </h4>
                    <p
                      className="text-sm"
                      style={{ color: currentTheme.colors.text.secondary }}
                    >
                      {benefit.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DocsLayout>
    </ThemeProvider>
  );
}
