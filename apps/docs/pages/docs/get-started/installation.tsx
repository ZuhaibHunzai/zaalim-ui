import { DocsLayout } from "../../../components/layout/DocsLayout";
import {
  ThemeProvider,
  defaultTheme,
  darkTheme,
  Card,
  CardContent,
  Button,
} from "zaalim-ui";
import { useState } from "react";

export default function Installation() {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");
  const currentTheme = activeTheme === "light" ? defaultTheme : darkTheme;

  return (
    <ThemeProvider value={currentTheme}>
      <DocsLayout>
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1
              className="text-4xl font-bold"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Installation
            </h1>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={activeTheme === "light" ? "primary" : "outline"}
                onClick={() => setActiveTheme("light")}
              >
                Light
              </Button>
              <Button
                size="sm"
                variant={activeTheme === "dark" ? "primary" : "outline"}
                onClick={() => setActiveTheme("dark")}
              >
                Dark
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h2
              className="text-2xl font-semibold"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Quick Install
            </h2>
            <Card variant="elevated">
              <CardContent>
                <div
                  className="p-4 rounded"
                  style={{
                    backgroundColor: currentTheme.colors.backgroundSubtle,
                    border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                  }}
                >
                  <code style={{ color: currentTheme.colors.text.primary }}>
                    npm install zaalim-ui
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2
              className="text-2xl font-semibold"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Peer Dependencies
            </h2>
            <p style={{ color: currentTheme.colors.text.secondary }}>
              Zaalim UI requires React and React DOM as peer dependencies. Make
              sure you have them installed:
            </p>
            <Card>
              <CardContent>
                <div
                  className="p-4 rounded"
                  style={{
                    backgroundColor: currentTheme.colors.backgroundSubtle,
                    border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                  }}
                >
                  <code style={{ color: currentTheme.colors.text.primary }}>
                    npm install react react-dom
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2
              className="text-2xl font-semibold"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Setup
            </h2>
            <p style={{ color: currentTheme.colors.text.secondary }}>
              Wrap your application with the ThemeProvider to enable the
              comprehensive theming system:
            </p>
            <Card variant="elevated">
              <CardContent>
                <div
                  className="p-4 rounded"
                  style={{
                    backgroundColor: currentTheme.colors.brand[50],
                    border: `1px solid ${currentTheme.colors.brand[200]}`,
                  }}
                >
                  <pre style={{ color: currentTheme.colors.brand[600] }}>
                    {`import { ThemeProvider, defaultTheme } from 'zaalim-ui'
import { Button, Card } from 'zaalim-ui'

function App() {
  return (
    <ThemeProvider value={defaultTheme}>
      <Card>
        <Button variant="primary">Get Started</Button>
      </Card>
    </ThemeProvider>
  )
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2
              className="text-2xl font-semibold"
              style={{ color: currentTheme.colors.text.primary }}
            >
              TypeScript
            </h2>
            <Card>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: currentTheme.colors.info,
                      color: currentTheme.colors.text.inverted,
                    }}
                  >
                    TS
                  </div>
                  <div>
                    <p style={{ color: currentTheme.colors.text.primary }}>
                      Zaalim UI is built with TypeScript and includes full type
                      definitions.
                    </p>
                    <p
                      className="text-sm mt-1"
                      style={{ color: currentTheme.colors.text.muted }}
                    >
                      No additional setup required! Enjoy autocomplete and type
                      safety.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2
              className="text-2xl font-semibold"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Theme System
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card hoverable>
                <CardContent className="space-y-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: currentTheme.colors.brand[500],
                      color: currentTheme.colors.brand[600],
                    }}
                  >
                    🎨
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
                    Includes light and dark themes with comprehensive color
                    systems.
                  </p>
                </CardContent>
              </Card>

              <Card hoverable>
                <CardContent className="space-y-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: currentTheme.colors.accent,
                      color: currentTheme.colors.text.inverted,
                    }}
                  >
                    🛠️
                  </div>
                  <h3
                    className="font-semibold"
                    style={{ color: currentTheme.colors.text.primary }}
                  >
                    Customizable
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: currentTheme.colors.text.secondary }}
                  >
                    Full theme customization with brand scales and semantic
                    colors.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <h2
              className="text-2xl font-semibold"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Troubleshooting
            </h2>
            <Card>
              <CardContent className="space-y-4">
                <div>
                  <h3
                    className="font-medium"
                    style={{ color: currentTheme.colors.text.primary }}
                  >
                    Peer Dependency Warnings
                  </h3>
                  <p
                    className="text-sm mt-1"
                    style={{ color: currentTheme.colors.text.secondary }}
                  >
                    If you encounter peer dependency warnings, use the{" "}
                    <code
                      className="px-1 rounded"
                      style={{
                        backgroundColor: currentTheme.colors.surfaceHover,
                        color: currentTheme.colors.text.primary,
                      }}
                    >
                      --legacy-peer-deps
                    </code>{" "}
                    flag:
                  </p>
                  <div
                    className="mt-2 p-4 rounded"
                    style={{
                      backgroundColor: currentTheme.colors.backgroundSubtle,
                      border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                    }}
                  >
                    <code style={{ color: currentTheme.colors.text.primary }}>
                      npm install zaalim-ui --legacy-peer-deps
                    </code>
                  </div>
                </div>

                <div
                  className="pt-4 border-t"
                  style={{ borderColor: currentTheme.colors.surfaceBorder }}
                >
                  <h3
                    className="font-medium"
                    style={{ color: currentTheme.colors.text.primary }}
                  >
                    Quick Start Template
                  </h3>
                  <p
                    className="text-sm mt-1"
                    style={{ color: currentTheme.colors.text.secondary }}
                  >
                    For a complete setup example, check our starter template:
                  </p>
                  <div
                    className="mt-2 p-4 rounded"
                    style={{
                      backgroundColor: currentTheme.colors.backgroundSubtle,
                      border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                    }}
                  >
                    <code style={{ color: currentTheme.colors.text.primary }}>
                      npx create-next-app@latest --example
                      https://github.com/yourusername/zaalim-ui-starter
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card variant="elevated">
            <CardContent className="text-center">
              <h3
                className="text-xl font-semibold mb-3"
                style={{ color: currentTheme.colors.text.primary }}
              >
                Ready to Build?
              </h3>
              <p
                className="mb-4"
                style={{ color: currentTheme.colors.text.secondary }}
              >
                Start using Zaalim UI in your project today with our
                comprehensive component library.
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="primary">View Components</Button>
                <Button variant="outline">Get Support</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DocsLayout>
    </ThemeProvider>
  );
}
