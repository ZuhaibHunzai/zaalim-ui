import { DocsLayout } from "../../../components/layout/DocsLayout";
import {
  Button,
  ThemeProvider,
  defaultTheme,
  darkTheme,
  Card,
  CardContent,
  CardHeader,
} from "zaalim-ui";
import { useState } from "react";

export default function ButtonDocs() {
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
              Button
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
              Overview
            </h2>
            <p style={{ color: currentTheme.colors.text.secondary }}>
              Buttons allow users to perform actions and make choices with a
              single tap. Zaalim UI buttons are fully theme-aware and adapt to
              your custom color scheme.
            </p>
          </div>

          <div className="space-y-8">
            {/* Variants Section */}
            <section className="space-y-4">
              <h2
                className="text-2xl font-semibold"
                style={{ color: currentTheme.colors.text.primary }}
              >
                Variants
              </h2>
              <Card variant="elevated">
                <CardHeader>
                  <h3
                    className="font-semibold"
                    style={{ color: currentTheme.colors.text.primary }}
                  >
                    Available Variants
                  </h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div
                    className="flex gap-4 flex-wrap items-center p-4 rounded-lg"
                    style={{
                      backgroundColor: currentTheme.colors.backgroundSubtle,
                    }}
                  >
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                  </div>

                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: currentTheme.colors.brand[50],
                      border: `1px solid ${currentTheme.colors.brand[200]}`,
                    }}
                  >
                    <pre style={{ color: currentTheme.colors.brand[600] }}>
                      {`// Primary - Uses your brand[500] color
<Button variant="primary">Primary</Button>

// Secondary - Uses surface colors
<Button variant="secondary">Secondary</Button>

// Outline - Transparent with brand border
<Button variant="outline">Outline</Button>

// Ghost - Minimal styling
<Button variant="ghost">Ghost</Button>`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Sizes Section */}
            <section className="space-y-4">
              <h2
                className="text-2xl font-semibold"
                style={{ color: currentTheme.colors.text.primary }}
              >
                Sizes
              </h2>
              <Card>
                <CardHeader>
                  <h3
                    className="font-semibold"
                    style={{ color: currentTheme.colors.text.primary }}
                  >
                    Size Options
                  </h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div
                    className="flex items-end gap-4 flex-wrap p-4 rounded-lg"
                    style={{
                      backgroundColor: currentTheme.colors.backgroundSubtle,
                    }}
                  >
                    <Button size="sm">Small (sm)</Button>
                    <Button size="md">Medium (md)</Button>
                    <Button size="lg">Large (lg)</Button>
                  </div>

                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: currentTheme.colors.surfaceHover,
                      border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                    }}
                  >
                    <pre style={{ color: currentTheme.colors.text.primary }}>
                      {`// Size variants
<Button size="sm">Small Button</Button>    // px-3 py-1.5 text-sm
<Button size="md">Medium Button</Button>   // px-4 py-2 text-base (default)
<Button size="lg">Large Button</Button>    // px-6 py-3 text-lg`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* States Section */}
            <section className="space-y-4">
              <h2
                className="text-2xl font-semibold"
                style={{ color: currentTheme.colors.text.primary }}
              >
                States
              </h2>
              <Card variant="elevated">
                <CardHeader>
                  <h3
                    className="font-semibold"
                    style={{ color: currentTheme.colors.text.primary }}
                  >
                    Interactive States
                  </h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div
                    className="flex gap-4 flex-wrap items-center p-4 rounded-lg"
                    style={{
                      backgroundColor: currentTheme.colors.backgroundSubtle,
                    }}
                  >
                    <Button variant="primary">Default</Button>
                    <Button variant="primary" disabled>
                      Disabled
                    </Button>
                    <Button
                      variant="primary"
                      className="hover:scale-105 transition-transform"
                    >
                      Hover (CSS)
                    </Button>
                  </div>

                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: currentTheme.colors.surfaceHover,
                      border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                    }}
                  >
                    <pre style={{ color: currentTheme.colors.text.primary }}>
                      {`// Disabled state
<Button variant="primary" disabled>
  Cannot Click
</Button>

// Custom hover effects (Tailwind)
<Button variant="primary" className="hover:scale-105">
  Animated
</Button>

// Full width
<Button variant="primary" className="w-full">
  Full Width
</Button>`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* API Reference */}
            <section className="space-y-4">
              <h2
                className="text-2xl font-semibold"
                style={{ color: currentTheme.colors.text.primary }}
              >
                API Reference
              </h2>
              <Card>
                <CardHeader>
                  <h3
                    className="font-semibold"
                    style={{ color: currentTheme.colors.text.primary }}
                  >
                    Button Props
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table
                      className="min-w-full"
                      style={{
                        borderColor: currentTheme.colors.surfaceBorder,
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            backgroundColor:
                              currentTheme.colors.backgroundSubtle,
                          }}
                        >
                          <th
                            className="px-4 py-3 text-left text-xs font-medium uppercase"
                            style={{
                              color: currentTheme.colors.text.muted,
                            }}
                          >
                            Prop
                          </th>
                          <th
                            className="px-4 py-3 text-left text-xs font-medium uppercase"
                            style={{
                              color: currentTheme.colors.text.muted,
                            }}
                          >
                            Type
                          </th>
                          <th
                            className="px-4 py-3 text-left text-xs font-medium uppercase"
                            style={{
                              color: currentTheme.colors.text.muted,
                            }}
                          >
                            Default
                          </th>
                          <th
                            className="px-4 py-3 text-left text-xs font-medium uppercase"
                            style={{
                              color: currentTheme.colors.text.muted,
                            }}
                          >
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        className="divide-y"
                        style={{
                          borderColor: currentTheme.colors.surfaceBorder,
                        }}
                      >
                        <tr>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            variant
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            'primary' | 'secondary' | 'outline' | 'ghost'
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            'primary'
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{
                              color: currentTheme.colors.text.secondary,
                            }}
                          >
                            Button visual style. All variants respect your theme
                            colors.
                          </td>
                        </tr>
                        <tr
                          style={{
                            backgroundColor:
                              currentTheme.colors.backgroundSubtle,
                          }}
                        >
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            size
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            'sm' | 'md' | 'lg'
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            'md'
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{
                              color: currentTheme.colors.text.secondary,
                            }}
                          >
                            Button size with appropriate padding and font size.
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            disabled
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            boolean
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            false
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{
                              color: currentTheme.colors.text.secondary,
                            }}
                          >
                            Disables the button and applies disabled state
                            styling.
                          </td>
                        </tr>
                        <tr
                          style={{
                            backgroundColor:
                              currentTheme.colors.backgroundSubtle,
                          }}
                        >
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            className
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            string
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            ''
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{
                              color: currentTheme.colors.text.secondary,
                            }}
                          >
                            Additional Tailwind CSS classes for custom styling.
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            ...props
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            HTMLButtonProps
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            -
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{
                              color: currentTheme.colors.text.secondary,
                            }}
                          >
                            All standard HTML button attributes are supported.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Usage Examples */}
            <section className="space-y-4">
              <h2
                className="text-2xl font-semibold"
                style={{ color: currentTheme.colors.text.primary }}
              >
                Usage Examples
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card hoverable>
                  <CardContent className="space-y-4">
                    <h4
                      className="font-semibold"
                      style={{ color: currentTheme.colors.text.primary }}
                    >
                      Form Submission
                    </h4>
                    <div className="space-y-3">
                      <Button variant="primary" className="w-full">
                        Submit Form
                      </Button>
                      <Button variant="outline" className="w-full">
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card hoverable>
                  <CardContent className="space-y-4">
                    <h4
                      className="font-semibold"
                      style={{ color: currentTheme.colors.text.primary }}
                    >
                      Action Group
                    </h4>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        style={{ color: currentTheme.colors.error }}
                      >
                        Delete
                      </Button>
                      <Button size="sm" variant="primary" className="ml-auto">
                        Save
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </DocsLayout>
    </ThemeProvider>
  );
}
