import { DocsLayout } from "components/layout/DocsLayout";
import {
  ThemeProvider,
  defaultTheme,
  darkTheme,
  Button,
  Card,
  CardContent,
} from "zaalim-ui";
import { useState } from "react";

export default function Theming() {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Theming</h1>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Theme System</h2>
          <p className="text-gray-700 leading-relaxed">
            Zaalim UI comes with a powerful theming system that allows you to
            customize colors, typography, and more. The library includes
            built-in light and dark themes.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Built-in Themes
          </h2>

          <div className="flex gap-4 mb-6">
            <Button onClick={() => setCurrentTheme(defaultTheme)}>
              Light Theme
            </Button>
            <Button onClick={() => setCurrentTheme(darkTheme)}>
              Dark Theme
            </Button>
          </div>

          <ThemeProvider value={currentTheme}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-semibold">Buttons</h3>
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <h3 className="text-lg font-semibold mb-4">Card Example</h3>
                  <p className="text-sm">
                    This card shows how components look with the current theme.
                  </p>
                </CardContent>
              </Card>
            </div>
          </ThemeProvider>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Custom Themes
          </h2>
          <div className="bg-gray-100 rounded-lg p-4 border">
            <pre className="text-sm text-gray-800">
              {`const customTheme = {
  colors: {
    primary: '#your-color',
    secondary: '#your-secondary-color',
    background: '#ffffff',
    surface: '#f8fafc',
    text: {
      primary: '#1e293b',
      secondary: '#64748b'
    }
  }
}

<ThemeProvider value={customTheme}>
  <YourApp />
</ThemeProvider>`}
            </pre>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
