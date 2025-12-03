import { DocsLayout } from "../../../components/layout/DocsLayout";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Button,
  ThemeProvider,
  defaultTheme,
  darkTheme,
} from "zaalim-ui";
import { useState } from "react";

export default function CardDocs() {
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
              Card
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
              Cards are flexible containers used to group and display content in
              a clear and concise way. Zaalim UI cards support multiple
              variants, hover effects, and are fully theme-aware.
            </p>
          </div>

          <div className="space-y-8">
            {/* Card Variants */}
            <section className="space-y-4">
              <h2
                className="text-2xl font-semibold"
                style={{ color: currentTheme.colors.text.primary }}
              >
                Card Variants
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card variant="default">
                      <CardContent>
                        <p
                          className="font-medium"
                          style={{ color: currentTheme.colors.text.primary }}
                        >
                          Default
                        </p>
                        <p
                          className="text-sm mt-1"
                          style={{ color: currentTheme.colors.text.muted }}
                        >
                          Basic card with subtle shadow
                        </p>
                      </CardContent>
                    </Card>

                    <Card variant="elevated" hoverable>
                      <CardContent>
                        <p
                          className="font-medium"
                          style={{ color: currentTheme.colors.text.primary }}
                        >
                          Elevated
                        </p>
                        <p
                          className="text-sm mt-1"
                          style={{ color: currentTheme.colors.text.muted }}
                        >
                          More prominent elevation
                        </p>
                      </CardContent>
                    </Card>

                    <Card variant="ghost">
                      <CardContent>
                        <p
                          className="font-medium"
                          style={{ color: currentTheme.colors.text.primary }}
                        >
                          Ghost
                        </p>
                        <p
                          className="text-sm mt-1"
                          style={{ color: currentTheme.colors.text.muted }}
                        >
                          Minimal styling
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: currentTheme.colors.brand[50],
                      border: `1px solid ${currentTheme.colors.brand[200]}`,
                    }}
                  >
                    <pre style={{ color: currentTheme.colors.brand[600] }}>
                      {`// Default variant (subtle shadow)
<Card variant="default">
  <CardContent>Content</CardContent>
</Card>

// Elevated variant (more prominent)
<Card variant="elevated">
  <CardContent>Content</CardContent>
</Card>

// Ghost variant (minimal)
<Card variant="ghost">
  <CardContent>Content</CardContent>
</Card>

// Make any card hoverable
<Card hoverable>
  <CardContent>Hover over me</CardContent>
</Card>`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Card Structure */}
            <section className="space-y-4">
              <h2
                className="text-2xl font-semibold"
                style={{ color: currentTheme.colors.text.primary }}
              >
                Card Structure
              </h2>
              <Card>
                <CardHeader withDivider>
                  <div className="flex justify-between items-center">
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: currentTheme.colors.text.primary }}
                    >
                      Project Overview
                    </h3>
                    <Button size="sm" variant="ghost">
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent spacing="md">
                  <p style={{ color: currentTheme.colors.text.secondary }}>
                    Cards can have headers, content areas, and footers. Each
                    section is themable and customizable.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <span
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        backgroundColor: currentTheme.colors.brand[100],
                        color: currentTheme.colors.brand[600],
                      }}
                    >
                      Design
                    </span>
                    <span
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        backgroundColor: currentTheme.colors.success + "20",
                        color: currentTheme.colors.success,
                      }}
                    >
                      Active
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-between items-center w-full">
                    <span
                      className="text-sm"
                      style={{ color: currentTheme.colors.text.muted }}
                    >
                      Updated 2 hours ago
                    </span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      <Button size="sm" variant="primary">
                        Action
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.surfaceHover,
                  border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                }}
              >
                <pre style={{ color: currentTheme.colors.text.primary }}>
                  {`// Complete card structure
<Card>
  <CardHeader withDivider>
    <h3>Card Title</h3>
  </CardHeader>
  <CardContent spacing="md">
    <p>Main content goes here</p>
  </CardContent>
  <CardFooter>
    <p>Footer content</p>
  </CardFooter>
</Card>`}
                </pre>
              </div>
            </section>

            {/* Padding Options */}
            <section className="space-y-4">
              <h2
                className="text-2xl font-semibold"
                style={{ color: currentTheme.colors.text.primary }}
              >
                Padding Options
              </h2>
              <Card variant="elevated">
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {(["none", "sm", "md", "lg"] as const).map((padding) => (
                      <Card key={padding} padding={padding} hoverable>
                        <CardContent>
                          <p
                            className="text-center text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            {padding === "none"
                              ? "No Padding"
                              : `${
                                  padding.charAt(0).toUpperCase() +
                                  padding.slice(1)
                                } Padding`}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: currentTheme.colors.backgroundSubtle,
                      border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                    }}
                  >
                    <pre style={{ color: currentTheme.colors.text.primary }}>
                      {`// Padding options
<Card padding="none">No internal padding</Card>
<Card padding="sm">Small padding (p-3)</Card>
<Card padding="md">Medium padding (p-5, default)</Card>
<Card padding="lg">Large padding (p-7)</Card>

// Content spacing
<CardContent spacing="none">No spacing between children</CardContent>
<CardContent spacing="sm">Small spacing (space-y-2)</CardContent>
<CardContent spacing="md">Medium spacing (space-y-4, default)</CardContent>`}
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
                    Component Props
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
                            Component
                          </th>
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
                            className="px-4 py-3 text-sm font-medium"
                            style={{ color: currentTheme.colors.text.primary }}
                            rowSpan={4}
                          >
                            Card
                          </td>
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
                            'default' | 'elevated' | 'ghost'
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            'default'
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{
                              color: currentTheme.colors.text.secondary,
                            }}
                          >
                            Visual style variant
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
                            padding
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            'none' | 'sm' | 'md' | 'lg'
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
                            Internal padding size
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            hoverable
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
                            Adds hover effects and cursor pointer
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
                            Additional Tailwind classes
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="px-4 py-3 text-sm font-medium"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            CardHeader
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            withDivider
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
                            true
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{
                              color: currentTheme.colors.text.secondary,
                            }}
                          >
                            Adds bottom border divider
                          </td>
                        </tr>
                        <tr
                          style={{
                            backgroundColor:
                              currentTheme.colors.backgroundSubtle,
                          }}
                        >
                          <td
                            className="px-4 py-3 text-sm font-medium"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            CardContent
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            spacing
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            'none' | 'sm' | 'md'
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
                            Spacing between child elements
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="px-4 py-3 text-sm font-medium"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            CardFooter
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            withDivider
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
                            true
                          </td>
                          <td
                            className="px-4 py-3 text-sm"
                            style={{
                              color: currentTheme.colors.text.secondary,
                            }}
                          >
                            Adds top border divider
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
                <Card hoverable variant="elevated">
                  <CardContent className="text-center">
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{
                        backgroundColor: currentTheme.colors.brand[500],
                        color: currentTheme.colors.brand[600],
                      }}
                    >
                      <span className="text-2xl">📊</span>
                    </div>
                    <h4
                      className="font-semibold mb-2"
                      style={{ color: currentTheme.colors.text.primary }}
                    >
                      Statistics Card
                    </h4>
                    <p
                      className="text-3xl font-bold mb-1"
                      style={{ color: currentTheme.colors.brand[500] }}
                    >
                      1,234
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: currentTheme.colors.text.muted }}
                    >
                      Total Users
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader withDivider>
                    <h4
                      className="font-semibold"
                      style={{ color: currentTheme.colors.text.primary }}
                    >
                      Settings Panel
                    </h4>
                  </CardHeader>
                  <CardContent spacing="sm">
                    <div className="flex justify-between items-center py-2">
                      <span style={{ color: currentTheme.colors.text.primary }}>
                        Dark Mode
                      </span>
                      <div
                        className="w-10 h-6 rounded-full relative"
                        style={{
                          backgroundColor: currentTheme.colors.brand[300],
                        }}
                      >
                        <div
                          className="w-4 h-4 rounded-full absolute top-1 right-1"
                          style={{
                            backgroundColor: currentTheme.colors.text.inverted,
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span style={{ color: currentTheme.colors.text.primary }}>
                        Notifications
                      </span>
                      <div
                        className="w-10 h-6 rounded-full relative"
                        style={{
                          backgroundColor: currentTheme.colors.surfaceBorder,
                        }}
                      >
                        <div
                          className="w-4 h-4 rounded-full absolute top-1 left-1"
                          style={{
                            backgroundColor: currentTheme.colors.text.inverted,
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="primary" className="w-full">
                      Save Settings
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </DocsLayout>
    </ThemeProvider>
  );
}
