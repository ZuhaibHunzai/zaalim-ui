// apps/docs/pages/docs/foundation/box.tsx
import { DocsLayout } from "../../../../components/layout/DocsLayout";
import {
  ThemeProvider,
  defaultTheme,
  darkTheme,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Heading,
  Paragraph,
  SmallText,
  Code,
  Grid,
  GridItem,
  Flex,
} from "zaalim-ui";
import { useState } from "react";

export default function BoxDocs() {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");
  const currentTheme = activeTheme === "light" ? defaultTheme : darkTheme;

  // Interactive examples state
  const [boxVariant, setBoxVariant] = useState<
    "surface" | "background" | "subtle" | "transparent"
  >("surface");
  const [hasBorder, setHasBorder] = useState(true);
  const [hasShadow, setHasShadow] = useState(false);
  const [isRounded, setIsRounded] = useState(true);
  const [borderColor, setBorderColor] = useState<
    "default" | "brand" | "success" | "warning" | "error" | "info"
  >("default");

  return (
    <ThemeProvider value={currentTheme}>
      <DocsLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <Heading level={1}>Box</Heading>
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

          {/* Overview */}
          <div className="space-y-6">
            <Heading level={2}>Overview</Heading>
            <Paragraph>
              The Box component is the fundamental building block of Zaalim UI.
              It's a versatile container with built-in theme support, providing
              consistent spacing, backgrounds, borders, and shadows that adapt
              to your active theme.
            </Paragraph>
            <Paragraph>
              Think of Box as a smart <Code>{`<div>`}</Code> that automatically
              applies your theme's colors and provides common styling patterns
              out of the box.
            </Paragraph>
          </div>

          {/* Import Section */}
          <Card>
            <CardHeader>
              <Heading level={3}>Import</Heading>
            </CardHeader>
            <CardContent>
              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.surfaceHover,
                  border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                }}
              >
                <Code className="block">
                  {`import { Box } from 'zaalim-ui'`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Basic Usage */}
          <Card variant="elevated">
            <CardHeader>
              <Heading level={3}>Basic Usage</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Grid cols={1} md={2} gap={6}>
                <GridItem>
                  <div className="space-y-4">
                    <SmallText>Simple Box</SmallText>
                    <Box variant="surface" className="p-6">
                      <Paragraph>
                        This is a simple Box with surface background and
                        padding.
                      </Paragraph>
                    </Box>
                  </div>
                </GridItem>

                <GridItem>
                  <div className="space-y-4">
                    <SmallText>With Tailwind Classes</SmallText>
                    <Box
                      variant="background"
                      className="p-8 text-center rounded-xl"
                    >
                      <Heading level={4}>Centered Content</Heading>
                      <Paragraph>
                        Box works seamlessly with Tailwind CSS classes.
                      </Paragraph>
                    </Box>
                  </div>
                </GridItem>
              </Grid>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.brand[50],
                  border: `1px solid ${currentTheme.colors.brand[200]}`,
                }}
              >
                <Code className="block whitespace-pre">
                  {`// Basic Box with surface background
<Box variant="surface" className="p-6">
  <p>Your content here</p>
</Box>

// Box with background variant and Tailwind classes
<Box 
  variant="background" 
  className="p-8 text-center rounded-xl"
>
  <h4>Centered Content</h4>
  <p>Box works with any Tailwind classes</p>
</Box>

// Empty Box for spacing
<Box className="h-4" /> // Vertical spacer
<Box className="w-4" /> // Horizontal spacer`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Variants */}
          <Card>
            <CardHeader>
              <Heading level={3}>Background Variants</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Paragraph>
                Box provides semantic background variants that automatically use
                your theme's colors.
              </Paragraph>

              <Grid cols={1} md={4} gap={4}>
                {(
                  ["surface", "background", "subtle", "transparent"] as const
                ).map((variant) => (
                  <GridItem key={variant}>
                    <div className="space-y-2">
                      <Flex justify="between" align="center">
                        <SmallText className="capitalize">{variant}</SmallText>
                        <Button
                          size="sm"
                          variant={
                            boxVariant === variant ? "primary" : "outline"
                          }
                          onClick={() => setBoxVariant(variant)}
                        >
                          Select
                        </Button>
                      </Flex>
                      <Box
                        variant={variant}
                        border={hasBorder}
                        borderColor={borderColor}
                        rounded={isRounded}
                        shadow={hasShadow}
                        className="p-4 h-24 flex items-center justify-center transition-all"
                      >
                        <SmallText className="text-center">
                          {variant === "transparent"
                            ? "Transparent background"
                            : `${variant} variant`}
                        </SmallText>
                      </Box>
                    </div>
                  </GridItem>
                ))}
              </Grid>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.surfaceHover,
                  border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                }}
              >
                <Code className="block whitespace-pre">
                  {`// All available variants
<Box variant="surface">Surface background</Box>
<Box variant="background">Main background</Box>
<Box variant="subtle">Subtle background</Box>
<Box variant="transparent">Transparent (no background)</Box>

// Default is transparent
<Box>Transparent by default</Box>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Borders */}
          <Card variant="elevated">
            <CardHeader>
              <Heading level={3}>Borders</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Flex justify="between" align="center">
                <Paragraph>Toggle border and select border color:</Paragraph>
                <Flex gap={2}>
                  <Button
                    size="sm"
                    variant={hasBorder ? "primary" : "outline"}
                    onClick={() => setHasBorder(!hasBorder)}
                  >
                    {hasBorder ? "Remove Border" : "Add Border"}
                  </Button>
                </Flex>
              </Flex>

              <Grid cols={2} md={3} gap={4}>
                {(
                  [
                    "default",
                    "brand",
                    "success",
                    "warning",
                    "error",
                    "info",
                  ] as const
                ).map((color) => (
                  <GridItem key={color}>
                    <div className="space-y-2">
                      <SmallText className="capitalize">{color}</SmallText>
                      <Box
                        variant="background"
                        border
                        borderColor={color}
                        rounded
                        className="p-4 h-20 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => {
                          setHasBorder(true);
                          setBorderColor(color);
                        }}
                      >
                        <SmallText className="text-center">
                          {color === "default"
                            ? "Default border"
                            : `${color} border`}
                        </SmallText>
                      </Box>
                    </div>
                  </GridItem>
                ))}
              </Grid>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.brand[50],
                  border: `1px solid ${currentTheme.colors.brand[200]}`,
                }}
              >
                <Code className="block whitespace-pre">
                  {`// Box with default border
<Box variant="surface" border className="p-4">
  Content with border
</Box>

// Box with colored borders
<Box border borderColor="brand">Brand color border</Box>
<Box border borderColor="success">Success color border</Box>
<Box border borderColor="warning">Warning color border</Box>
<Box border borderColor="error">Error color border</Box>
<Box border borderColor="info">Info color border</Box>

// Border without background
<Box variant="transparent" border className="p-4">
  Transparent with border
</Box>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Shadows & Rounded Corners */}
          <Card>
            <CardHeader>
              <Heading level={3}>Shadows & Rounded Corners</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Grid cols={1} md={2} gap={6}>
                <GridItem>
                  <div className="space-y-4">
                    <Flex justify="between" align="center">
                      <Heading level={4}>Shadows</Heading>
                      <Button
                        size="sm"
                        variant={hasShadow ? "primary" : "outline"}
                        onClick={() => setHasShadow(!hasShadow)}
                      >
                        {hasShadow ? "Remove Shadow" : "Add Shadow"}
                      </Button>
                    </Flex>

                    <Grid cols={2} gap={4}>
                      {(["sm", "md", "lg", "xl"] as const).map((shadowSize) => (
                        <GridItem key={shadowSize}>
                          <Box
                            variant="background"
                            border
                            rounded
                            shadow={shadowSize}
                            className="p-4 h-20 flex items-center justify-center"
                          >
                            <SmallText className="text-center">
                              shadow-{shadowSize}
                            </SmallText>
                          </Box>
                        </GridItem>
                      ))}
                    </Grid>
                  </div>
                </GridItem>

                <GridItem>
                  <div className="space-y-4">
                    <Flex justify="between" align="center">
                      <Heading level={4}>Rounded Corners</Heading>
                      <Button
                        size="sm"
                        variant={isRounded ? "primary" : "outline"}
                        onClick={() => setIsRounded(!isRounded)}
                      >
                        {isRounded ? "Square Corners" : "Rounded Corners"}
                      </Button>
                    </Flex>

                    <Grid cols={2} gap={4}>
                      {(["sm", "md", "lg", "xl", "full"] as const).map(
                        (radius) => (
                          <GridItem key={radius}>
                            <Box
                              variant="background"
                              border
                              rounded={radius}
                              className="p-4 h-20 flex items-center justify-center"
                            >
                              <SmallText className="text-center">
                                rounded-{radius}
                              </SmallText>
                            </Box>
                          </GridItem>
                        )
                      )}
                    </Grid>
                  </div>
                </GridItem>
              </Grid>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.surfaceHover,
                  border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                }}
              >
                <Code className="block whitespace-pre">
                  {`// Different shadow sizes
<Box shadow="sm">Small shadow</Box>
<Box shadow="md">Medium shadow</Box>
<Box shadow="lg">Large shadow</Box>
<Box shadow="xl">Extra large shadow</Box>

// Boolean shadow (uses default)
<Box shadow>Default shadow</Box>

// Rounded corners
<Box rounded="sm">Slightly rounded</Box>
<Box rounded="md">Medium rounded (default)</Box>
<Box rounded="lg">Large rounded</Box>
<Box rounded="xl">Extra large rounded</Box>
<Box rounded="full">Fully rounded (circular)</Box>

// Boolean rounded (uses default)
<Box rounded>Default rounded corners</Box>

// Combined effects
<Box 
  variant="surface" 
  border 
  rounded="lg" 
  shadow="md"
  className="p-6"
>
  Card-like appearance
</Box>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Playground */}
          <Card variant="elevated">
            <CardHeader>
              <Heading level={3}>Interactive Playground</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Paragraph>
                Customize the Box below to see how different props affect its
                appearance.
              </Paragraph>

              <Grid cols={1} lg={3} gap={6}>
                <GridItem>
                  <div className="space-y-4">
                    <Heading level={4}>Controls</Heading>

                    <div className="space-y-3">
                      <div>
                        <SmallText>Variant</SmallText>
                        <Flex gap={2} wrap="wrap" className="mt-1">
                          {(
                            [
                              "surface",
                              "background",
                              "subtle",
                              "transparent",
                            ] as const
                          ).map((variant) => (
                            <Button
                              key={variant}
                              size="sm"
                              variant={
                                boxVariant === variant ? "primary" : "outline"
                              }
                              onClick={() => setBoxVariant(variant)}
                            >
                              {variant}
                            </Button>
                          ))}
                        </Flex>
                      </div>

                      <div>
                        <SmallText>Border Color</SmallText>
                        <Flex gap={2} wrap="wrap" className="mt-1">
                          {(
                            [
                              "default",
                              "brand",
                              "success",
                              "warning",
                              "error",
                              "info",
                            ] as const
                          ).map((color) => (
                            <Button
                              key={color}
                              size="sm"
                              variant={
                                borderColor === color ? "primary" : "outline"
                              }
                              onClick={() => {
                                setHasBorder(true);
                                setBorderColor(color);
                              }}
                            >
                              {color}
                            </Button>
                          ))}
                        </Flex>
                      </div>

                      <Flex gap={4}>
                        <Button
                          size="sm"
                          variant={hasBorder ? "primary" : "outline"}
                          onClick={() => setHasBorder(!hasBorder)}
                          className="flex-1"
                        >
                          {hasBorder ? "✓ Border" : "No Border"}
                        </Button>
                        <Button
                          size="sm"
                          variant={hasShadow ? "primary" : "outline"}
                          onClick={() => setHasShadow(!hasShadow)}
                          className="flex-1"
                        >
                          {hasShadow ? "✓ Shadow" : "No Shadow"}
                        </Button>
                        <Button
                          size="sm"
                          variant={isRounded ? "primary" : "outline"}
                          onClick={() => setIsRounded(!isRounded)}
                          className="flex-1"
                        >
                          {isRounded ? "✓ Rounded" : "Square"}
                        </Button>
                      </Flex>
                    </div>
                  </div>
                </GridItem>

                <GridItem className="lg:col-span-2">
                  <div className="space-y-4">
                    <Heading level={4}>Preview</Heading>
                    <Box
                      variant={boxVariant}
                      border={hasBorder}
                      borderColor={borderColor}
                      rounded={isRounded}
                      shadow={hasShadow ? "md" : false}
                      className="p-8 h-64 flex flex-col items-center justify-center transition-all duration-200"
                    >
                      <Heading level={3} className="mb-2">
                        Live Preview
                      </Heading>
                      <Paragraph className="text-center">
                        This Box updates in real-time as you change the
                        controls.
                      </Paragraph>
                      <SmallText className="mt-4 text-center opacity-75">
                        Current props: variant="{boxVariant}", border=
                        {hasBorder.toString()}, borderColor="{borderColor}",
                        rounded={isRounded.toString()}, shadow=
                        {hasShadow ? '"md"' : "false"}
                      </SmallText>
                    </Box>

                    <div
                      className="p-4 rounded-lg"
                      style={{
                        backgroundColor: currentTheme.colors.surfaceHover,
                        border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                      }}
                    >
                      <Code className="block">
                        {`<Box\n  variant="${boxVariant}"\n  ${
                          hasBorder ? `border borderColor="${borderColor}"` : ""
                        }\n  ${isRounded ? "rounded" : ""}\n  ${
                          hasShadow ? 'shadow="md"' : ""
                        }\n  className="p-8"\n>\n  Your content here\n</Box>`}
                      </Code>
                    </div>
                  </div>
                </GridItem>
              </Grid>
            </CardContent>
          </Card>

          {/* Practical Examples */}
          <Card>
            <CardHeader>
              <Heading level={3}>Practical Examples</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Grid cols={1} md={2} gap={6}>
                <GridItem>
                  <div className="space-y-4">
                    <Heading level={4}>Card Component</Heading>
                    <Box
                      variant="surface"
                      border
                      rounded="lg"
                      shadow="sm"
                      className="p-6 space-y-4"
                    >
                      <Heading level={4}>User Profile</Heading>
                      <Paragraph>
                        Box can be used to create card-like components with
                        consistent styling.
                      </Paragraph>
                      <Flex justify="end" gap={2}>
                        <Button size="sm" variant="outline">
                          Cancel
                        </Button>
                        <Button size="sm" variant="primary">
                          Save
                        </Button>
                      </Flex>
                    </Box>
                  </div>
                </GridItem>

                <GridItem>
                  <div className="space-y-4">
                    <Heading level={4}>Alert Component</Heading>
                    <Box
                      variant="background"
                      border
                      borderColor="warning"
                      rounded="md"
                      className="p-4"
                      style={{
                        backgroundColor: `${currentTheme.colors.warning}15`,
                      }}
                    >
                      <Flex gap={3}>
                        <Box
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: currentTheme.colors.warning,
                            color: "white",
                          }}
                        >
                          ⚠️
                        </Box>
                        <div>
                          <Heading level={5}>Warning</Heading>
                          <SmallText>
                            This is an example of an alert component built with
                            Box.
                          </SmallText>
                        </div>
                      </Flex>
                    </Box>
                  </div>
                </GridItem>

                <GridItem>
                  <div className="space-y-4">
                    <Heading level={4}>Badge/Pill</Heading>
                    <Flex gap={2} wrap="wrap">
                      <Box
                        variant="surface"
                        rounded="full"
                        className="px-3 py-1"
                      >
                        <SmallText className="text-white">New</SmallText>
                      </Box>
                      <Box
                        variant="background"
                        rounded="full"
                        className="px-3 py-1"
                      >
                        <SmallText className="text-white">Active</SmallText>
                      </Box>
                      <Box
                        variant="subtle"
                        border
                        rounded="full"
                        className="px-3 py-1"
                      >
                        <SmallText>Draft</SmallText>
                      </Box>
                    </Flex>
                  </div>
                </GridItem>

                <GridItem>
                  <div className="space-y-4">
                    <Heading level={4}>Spacer/Divider</Heading>
                    <Box className="space-y-4">
                      <Paragraph>Section with consistent spacing:</Paragraph>
                      <Box variant="surface" className="p-4">
                        Item 1
                      </Box>
                      <Box className="h-px bg-border" /> {/* Divider */}
                      <Box variant="surface" className="p-4">
                        Item 2
                      </Box>
                      <Box className="h-px bg-border" /> {/* Divider */}
                      <Box variant="surface" className="p-4">
                        Item 3
                      </Box>
                    </Box>
                  </div>
                </GridItem>
              </Grid>
            </CardContent>
          </Card>

          {/* API Reference */}
          <Card>
            <CardHeader>
              <Heading level={3}>API Reference</Heading>
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
                        backgroundColor: currentTheme.colors.backgroundSubtle,
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
                        'surface' | 'background' | 'subtle' | 'transparent'
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        'transparent'
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Background variant using theme colors
                      </td>
                    </tr>
                    <tr
                      style={{
                        backgroundColor: currentTheme.colors.backgroundSubtle,
                      }}
                    >
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        border
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
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Adds a 1px border using theme border colors
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        borderColor
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        'default' | 'brand' | 'success' | 'warning' | 'error' |
                        'info'
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        'default'
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Border color from theme palette
                      </td>
                    </tr>
                    <tr
                      style={{
                        backgroundColor: currentTheme.colors.backgroundSubtle,
                      }}
                    >
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        shadow
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        boolean | 'sm' | 'md' | 'lg' | 'xl'
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        false
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Box shadow size (true uses default)
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        rounded
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        boolean | 'sm' | 'md' | 'lg' | 'xl' | 'full'
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        false
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Border radius (true uses default 'md')
                      </td>
                    </tr>
                    <tr
                      style={{
                        backgroundColor: currentTheme.colors.backgroundSubtle,
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
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Additional Tailwind CSS classes
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
                        HTMLDivProps
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        -
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        All standard HTML div attributes
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <div
            className="p-6 rounded-xl"
            style={{
              backgroundColor: currentTheme.colors.brand[50],
              border: `2px solid ${currentTheme.colors.brand[200]}`,
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: currentTheme.colors.brand[500],
                  color: currentTheme.colors.brand[600],
                }}
              >
                💡
              </div>
              <div>
                <Heading
                  level={4}
                  style={{ color: currentTheme.colors.brand[600] }}
                >
                  Best Practices
                </Heading>
                <ul
                  className="space-y-2 mt-2"
                  style={{ color: currentTheme.colors.brand[600] + "CC" }}
                >
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Use <Code>variant</Code> props for semantic backgrounds
                      instead of custom CSS
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Combine Box with Tailwind's spacing utilities (p-, m-,
                      gap-) for layout
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Use <Code>borderColor</Code> prop for semantic borders
                      (error, success, etc.)
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Create reusable component patterns (Cards, Alerts, Badges)
                      by composing Box
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Use <Code>rounded="full"</Code> for circular avatars,
                      badges, and pills
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Apply <Code>shadow</Code> sparingly - use for elevation
                      and focus states
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Remember Box is just a <Code>{`<div>`}</Code> - all HTML
                      attributes work
                    </SmallText>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DocsLayout>
    </ThemeProvider>
  );
}
