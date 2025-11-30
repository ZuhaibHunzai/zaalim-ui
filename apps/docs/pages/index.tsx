import { useState } from "react";
import {
  Button,
  ThemeProvider,
  defaultTheme,
  darkTheme,
  Theme,
  Card,
  CardHeader,
  CardContent,
} from "zaalim-ui";

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);
  const [themeName, setThemeName] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    if (themeName === "light") {
      setCurrentTheme(darkTheme);
      setThemeName("dark");
    } else {
      setCurrentTheme(defaultTheme);
      setThemeName("light");
    }
  };

  return (
    <ThemeProvider value={currentTheme}>
      <div
        className="min-h-screen p-8 transition-colors duration-300"
        style={{
          backgroundColor: currentTheme.colors.background,
          color: currentTheme.colors.text.primary,
        }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Zaalim UI Demo</h1>

            {/* Theme Toggle */}
            <Button
              onClick={toggleTheme}
              variant={themeName === "light" ? "primary" : "secondary"}
            >
              Switch to {themeName === "light" ? "Dark" : "Light"} Theme
            </Button>
          </div>

          {/* Current Theme Info */}
          <div
            className="p-4 rounded-lg mb-8"
            style={{ backgroundColor: currentTheme.colors.surface }}
          >
            <p className="font-medium">Current Theme: {themeName}</p>
            <p className="text-sm opacity-75">
              Primary Color:{" "}
              <span style={{ color: currentTheme.colors.primary }}>
                {currentTheme.colors.primary}
              </span>
            </p>
          </div>

          {/* Button Demos */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Buttons</h2>

            <div className="space-y-4">
              <div className="flex gap-4 flex-wrap">
                <Button variant="primary" size="md">
                  Primary Button
                </Button>

                <Button variant="secondary" size="md">
                  Secondary Button
                </Button>

                <Button variant="outline" size="md">
                  Outline Button
                </Button>
              </div>

              <div className="flex gap-4 flex-wrap">
                <Button size="sm">Small Button</Button>

                <Button size="md">Medium Button</Button>

                <Button size="lg">Large Button</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Card Demos */}
      <div className="space-y-6 mt-12">
        <h2 className="text-2xl font-semibold">Cards</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Card */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Basic Card</h3>
            </CardHeader>
            <CardContent>
              <p>This is a simple card with header and content.</p>
              <Button size="sm" className="mt-4">
                Card Action
              </Button>
            </CardContent>
          </Card>

          {/* Card with different padding */}
          <Card padding="lg">
            <CardHeader>
              <h3 className="text-lg font-semibold">Large Padding Card</h3>
            </CardHeader>
            <CardContent>
              <p>This card has larger padding for more spacious content.</p>
            </CardContent>
          </Card>

          {/* Card without header */}
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Simple Card</h3>
              <p>This card doesn't have a separate header section.</p>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardContent className="text-center">
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: currentTheme.colors.primary }}
              >
                1,234
              </div>
              <p
                className="text-sm"
                style={{ color: currentTheme.colors.text.secondary }}
              >
                Total Users
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}
