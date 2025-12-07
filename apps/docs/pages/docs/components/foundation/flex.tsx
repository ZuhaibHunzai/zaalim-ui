// apps/docs/pages/docs/foundation/flex.tsx
import { DocsLayout } from "../../../../components/layout/DocsLayout";
import {
  ThemeProvider,
  defaultTheme,
  darkTheme,
  Flex,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Heading,
  Paragraph,
  SmallText,
  Code,
  Row,
  Column,
  Center,
  Between,
  Wrap,
  FlexItem,
} from "zaalim-ui";
import { useState } from "react";

export default function FlexDocs() {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");
  const currentTheme = activeTheme === "light" ? defaultTheme : darkTheme;

  // Interactive examples state
  const [flexDirection, setFlexDirection] = useState<
    "row" | "row-reverse" | "column" | "column-reverse"
  >("row");
  const [flexAlign, setFlexAlign] = useState<
    "start" | "center" | "end" | "baseline" | "stretch"
  >("stretch");
  const [flexJustify, setFlexJustify] = useState<
    "start" | "center" | "end" | "between" | "around" | "evenly"
  >("start");
  const [flexWrap, setFlexWrap] = useState<"nowrap" | "wrap" | "wrap-reverse">(
    "nowrap"
  );
  const [flexGap, setFlexGap] = useState<0 | 2 | 4 | 6 | 8>(4);
  const [itemGrow, setItemGrow] = useState<boolean | 0 | 1 | 2 | 3>(false);
  const [itemShrink, setItemShrink] = useState<boolean | 0 | 1>(true);
  const [showFlexItem, setShowFlexItem] = useState(true);

  return (
    <ThemeProvider value={currentTheme}>
      <DocsLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <Heading level={1}>Flex</Heading>
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
              The Flex component provides a powerful, declarative way to create
              flexible box layouts using CSS Flexbox. With built-in theme
              support and comprehensive control over direction, alignment,
              spacing, and item behavior, Flex makes complex layouts simple.
            </Paragraph>
            <Paragraph>
              Flex works seamlessly with <Code>FlexItem</Code> for individual
              flex item control and includes pre-built variants like{" "}
              <Code>Row</Code>, <Code>Column</Code>, <Code>Center</Code>, and{" "}
              <Code>Between</Code> for common layout patterns.
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
                  {`import { 
  Flex, 
  Row, 
  Column, 
  Center, 
  Between, 
  Wrap, 
  FlexItem 
} from 'zaalim-ui'`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Basic Flex */}
          <Card variant="elevated">
            <CardHeader>
              <Heading level={3}>Basic Flex</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Flex justify="between" align="center">
                  <SmallText>Select direction:</SmallText>
                  <Flex gap={2}>
                    {(
                      [
                        "row",
                        "row-reverse",
                        "column",
                        "column-reverse",
                      ] as const
                    ).map((direction) => (
                      <Button
                        key={direction}
                        size="sm"
                        variant={
                          flexDirection === direction ? "primary" : "outline"
                        }
                        onClick={() => setFlexDirection(direction)}
                      >
                        {direction}
                      </Button>
                    ))}
                  </Flex>
                </Flex>

                <Flex
                  direction={flexDirection}
                  gap={flexGap}
                  className="p-4 border border-dashed rounded-lg min-h-48"
                  style={{ borderColor: currentTheme.colors.border }}
                >
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Box
                      key={index}
                      variant="surface"
                      className="p-4 w-16 h-16 flex items-center justify-center"
                    >
                      <SmallText>Item {index + 1}</SmallText>
                    </Box>
                  ))}
                </Flex>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.brand[50],
                  border: `1px solid ${currentTheme.colors.brand[200]}`,
                }}
              >
                <Code className="block whitespace-pre">
                  {`// Basic Flex with ${flexDirection} direction
<Flex 
  direction="${flexDirection}"
  gap={${flexGap}}
>
  <Box variant="surface" className="p-4">Item 1</Box>
  <Box variant="surface" className="p-4">Item 2</Box>
  <Box variant="surface" className="p-4">Item 3</Box>
  <Box variant="surface" className="p-4">Item 4</Box>
</Flex>

// Pre-built variants (shorthand)
<Row gap={4}>Horizontal layout</Row>
<Column gap={4}>Vertical layout</Column>
<Center>Centered in both axes</Center>
<Between>Space between items</Between>
<Wrap gap={4}>Wrapping items</Wrap>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Alignment */}
          <Card>
            <CardHeader>
              <Heading level={3}>Alignment</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Grid cols={1} gap={6}>
                <div className="space-y-4">
                  <Heading level={4}>Vertical Alignment (align)</Heading>
                  <Flex gap={2} className="mb-2">
                    {(
                      ["start", "center", "end", "baseline", "stretch"] as const
                    ).map((align) => (
                      <Button
                        key={align}
                        size="sm"
                        variant={flexAlign === align ? "primary" : "outline"}
                        onClick={() => setFlexAlign(align)}
                      >
                        {align}
                      </Button>
                    ))}
                  </Flex>

                  <Flex
                    align={flexAlign}
                    gap={3}
                    className="p-4 border border-dashed rounded-lg h-48"
                    style={{ borderColor: currentTheme.colors.border }}
                  >
                    {Array.from({ length: 3 }).map((_, index) => (
                      <Box
                        key={index}
                        variant="surface"
                        className="p-4"
                        style={{
                          height:
                            index === 0
                              ? "60px"
                              : index === 1
                              ? "100px"
                              : "80px",
                        }}
                      >
                        <SmallText>Item {index + 1}</SmallText>
                      </Box>
                    ))}
                  </Flex>
                </div>

                <div className="space-y-4">
                  <Heading level={4}>
                    Horizontal Justification (justify)
                  </Heading>
                  <Flex gap={2} className="mb-2">
                    {(
                      [
                        "start",
                        "center",
                        "end",
                        "between",
                        "around",
                        "evenly",
                      ] as const
                    ).map((justify) => (
                      <Button
                        key={justify}
                        size="sm"
                        variant={
                          flexJustify === justify ? "primary" : "outline"
                        }
                        onClick={() => setFlexJustify(justify)}
                      >
                        {justify}
                      </Button>
                    ))}
                  </Flex>

                  <Flex
                    justify={flexJustify}
                    gap={3}
                    className="p-4 border border-dashed rounded-lg"
                    style={{ borderColor: currentTheme.colors.border }}
                  >
                    {Array.from({ length: 3 }).map((_, index) => (
                      <Box key={index} variant="surface" className="p-4 w-16">
                        <SmallText>Item {index + 1}</SmallText>
                      </Box>
                    ))}
                  </Flex>
                </div>
              </Grid>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.surfaceHover,
                  border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                }}
              >
                <Code className="block whitespace-pre">
                  {`// Vertical alignment
<Flex 
  align="${flexAlign}"
  gap={3}
  className="h-48"
>
  <Box variant="surface">Short</Box>
  <Box variant="surface" className="h-24">Tall</Box>
  <Box variant="surface" className="h-16">Medium</Box>
</Flex>

// Horizontal justification
<Flex 
  justify="${flexJustify}"
  gap={3}
>
  <Box variant="surface" className="w-16">Item 1</Box>
  <Box variant="surface" className="w-16">Item 2</Box>
  <Box variant="surface" className="w-16">Item 3</Box>
</Flex>

// Combined alignment
<Flex 
  align="center"
  justify="center"
  className="h-64"
>
  <Box variant="surface">Perfectly Centered</Box>
</Flex>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Wrapping */}
          <Card variant="elevated">
            <CardHeader>
              <Heading level={3}>Wrapping</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Flex justify="between" align="center">
                  <SmallText>Select wrap mode:</SmallText>
                  <Flex gap={2}>
                    {(["nowrap", "wrap", "wrap-reverse"] as const).map(
                      (wrap) => (
                        <Button
                          key={wrap}
                          size="sm"
                          variant={flexWrap === wrap ? "primary" : "outline"}
                          onClick={() => setFlexWrap(wrap)}
                        >
                          {wrap}
                        </Button>
                      )
                    )}
                  </Flex>
                </Flex>

                <Flex
                  wrap={flexWrap}
                  gap={3}
                  className="p-4 border border-dashed rounded-lg"
                  style={{ borderColor: currentTheme.colors.border }}
                >
                  {Array.from({ length: 8 }).map((_, index) => (
                    <Box
                      key={index}
                      variant="surface"
                      className="p-4 w-32 flex-shrink-0"
                    >
                      <SmallText>Item {index + 1}</SmallText>
                    </Box>
                  ))}
                </Flex>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.brand[50],
                  border: `1px solid ${currentTheme.colors.brand[200]}`,
                }}
              >
                <Code className="block whitespace-pre">
                  {`// Flex wrapping
<Flex 
  wrap="${flexWrap}"
  gap={3}
>
  <Box variant="surface" className="w-32">Item 1</Box>
  <Box variant="surface" className="w-32">Item 2</Box>
  <Box variant="surface" className="w-32">Item 3</Box>
  <Box variant="surface" className="w-32">Item 4</Box>
  <Box variant="surface" className="w-32">Item 5</Box>
  <Box variant="surface" className="w-32">Item 6</Box>
</Flex>

// Pre-built Wrap component
<Wrap gap={4}>
  <Box variant="surface" className="w-32">Tag 1</Box>
  <Box variant="surface" className="w-32">Tag 2</Box>
  <Box variant="surface" className="w-32">Tag 3</Box>
</Wrap>

// No wrap (default)
<Flex wrap="nowrap">
  <Box variant="surface">This won't wrap</Box>
</Flex>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Gap Sizes */}
          <Card>
            <CardHeader>
              <Heading level={3}>Gap Sizes</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Paragraph>
                Control spacing between flex items using the <Code>gap</Code>{" "}
                prop. Available sizes follow Tailwind's spacing scale for
                consistency.
              </Paragraph>

              <div className="space-y-4">
                <Flex justify="between" align="center">
                  <SmallText>Select gap size:</SmallText>
                  <Flex gap={2}>
                    {([0, 2, 4, 6, 8] as const).map((gapSize) => (
                      <Button
                        key={gapSize}
                        size="sm"
                        variant={flexGap === gapSize ? "primary" : "outline"}
                        onClick={() => setFlexGap(gapSize)}
                      >
                        {gapSize === 0 ? "No Gap" : `Gap ${gapSize}`}
                      </Button>
                    ))}
                  </Flex>
                </Flex>

                <Flex gap={flexGap}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Box key={index} variant="surface" className="p-4 flex-1">
                      <SmallText>Item {index + 1}</SmallText>
                    </Box>
                  ))}
                </Flex>

                <div
                  className="p-4 rounded-lg"
                  style={{
                    backgroundColor: currentTheme.colors.surfaceHover,
                    border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                  }}
                >
                  <Code className="block whitespace-pre">
                    {`// Flex with ${
                      flexGap === 0 ? "no gap" : `gap-${flexGap}`
                    }
<Flex gap={${flexGap}}>
  <Box variant="surface" className="p-4 flex-1">Item 1</Box>
  <Box variant="surface" className="p-4 flex-1">Item 2</Box>
  <Box variant="surface" className="p-4 flex-1">Item 3</Box>
  <Box variant="surface" className="p-4 flex-1">Item 4</Box>
  <Box variant="surface" className="p-4 flex-1">Item 5</Box>
</Flex>

// Available gap sizes
<Flex gap={0}>No spacing</Flex>
<Flex gap={2}>Extra small gap</Flex>
<Flex gap={4}>Small gap (default)</Flex>
<Flex gap={6}>Medium gap</Flex>
<Flex gap={8}>Large gap</Flex>
<Flex gap={10}>Extra large gap</Flex>
<Flex gap={12}>2x large gap</Flex>
<Flex gap={16}>3x large gap</Flex>
<Flex gap={20}>4x large gap</Flex>`}
                  </Code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FlexItem */}
          <Card variant="elevated">
            <CardHeader>
              <Heading level={3}>FlexItem Control</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Paragraph>
                <Code>FlexItem</Code> provides fine-grained control over
                individual flex items, including grow, shrink, basis, and order
                properties.
              </Paragraph>

              <div className="space-y-4">
                <Flex justify="between" align="center">
                  <SmallText>Toggle FlexItem example:</SmallText>
                  <Button
                    size="sm"
                    variant={showFlexItem ? "primary" : "outline"}
                    onClick={() => setShowFlexItem(!showFlexItem)}
                  >
                    {showFlexItem ? "Hide FlexItem" : "Show FlexItem"}
                  </Button>
                </Flex>

                {showFlexItem && (
                  <>
                    <div className="space-y-4">
                      <Flex gap={2}>
                        <SmallText>Grow:</SmallText>
                        {([false, true, 0, 1, 2, 3] as const).map((grow) => (
                          <Button
                            key={String(grow)}
                            size="sm"
                            variant={itemGrow === grow ? "primary" : "outline"}
                            onClick={() => setItemGrow(grow)}
                          >
                            {grow === false
                              ? "No"
                              : grow === true
                              ? "Yes"
                              : grow}
                          </Button>
                        ))}
                      </Flex>

                      <Flex gap={2}>
                        <SmallText>Shrink:</SmallText>
                        {([true, false, 0, 1] as const).map((shrink) => (
                          <Button
                            key={String(shrink)}
                            size="sm"
                            variant={
                              itemShrink === shrink ? "primary" : "outline"
                            }
                            onClick={() => setItemShrink(shrink)}
                          >
                            {shrink === true
                              ? "Yes"
                              : shrink === false
                              ? "No"
                              : shrink}
                          </Button>
                        ))}
                      </Flex>

                      <Flex
                        gap={4}
                        className="p-4 border border-dashed rounded-lg"
                      >
                        <Box variant="surface" className="p-4 w-24">
                          <SmallText>Fixed</SmallText>
                        </Box>

                        <FlexItem
                          grow={itemGrow}
                          shrink={itemShrink}
                          basis={itemGrow ? undefined : "200px"}
                        >
                          <Box
                            variant="transparent"
                            className="p-4 h-full flex items-center justify-center"
                          >
                            <SmallText className="text-white text-center">
                              FlexItem
                              <br />
                              grow={String(itemGrow)}
                              <br />
                              shrink={String(itemShrink)}
                            </SmallText>
                          </Box>
                        </FlexItem>

                        <Box variant="surface" className="p-4 w-24">
                          <SmallText>Fixed</SmallText>
                        </Box>
                      </Flex>
                    </div>

                    <div
                      className="p-4 rounded-lg"
                      style={{
                        backgroundColor: currentTheme.colors.brand[50],
                        border: `1px solid ${currentTheme.colors.brand[200]}`,
                      }}
                    >
                      <Code className="block whitespace-pre">
                        {`// FlexItem with grow and shrink control
<Flex gap={4}>
  <Box variant="surface" className="w-24">Fixed</Box>
  
  <FlexItem 
    grow={${
      itemGrow === true ? "true" : itemGrow === false ? "false" : itemGrow
    }}
    shrink={${
      itemShrink === true ? "true" : itemShrink === false ? "false" : itemShrink
    }}
    ${itemGrow ? "" : 'basis="200px"'}
  >
    <Box variant="brand">Controlled Item</Box>
  </FlexItem>
  
  <Box variant="surface" className="w-24">Fixed</Box>
</Flex>

// Order control
<Flex gap={4}>
  <FlexItem order={3}>Third</FlexItem>
  <FlexItem order={1}>First</FlexItem>
  <FlexItem order={2}>Second</FlexItem>
</Flex>

// Flex basis
<Flex gap={4}>
  <FlexItem basis="100px">100px basis</FlexItem>
  <FlexItem basis="200px">200px basis</FlexItem>
  <FlexItem basis="300px">300px basis</FlexItem>
</Flex>`}
                      </Code>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pre-built Variants */}
          <Card>
            <CardHeader>
              <Heading level={3}>Pre-built Variants</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Paragraph>
                Zaalim UI includes pre-built Flex variants for common layout
                patterns. These components are convenience wrappers with
                sensible defaults.
              </Paragraph>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Heading level={4}>Row & Column</Heading>
                  <Row gap={3} className="mb-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <Box key={index} variant="surface" className="p-4">
                        <SmallText>Item {index + 1}</SmallText>
                      </Box>
                    ))}
                  </Row>
                  <Column gap={3}>
                    {Array.from({ length: 3 }).map((_, index) => (
                      <Box key={index} variant="surface" className="p-4">
                        <SmallText>Item {index + 1}</SmallText>
                      </Box>
                    ))}
                  </Column>
                </div>

                <div className="space-y-4">
                  <Heading level={4}>Center & Between</Heading>
                  <Center
                    className="h-32 border border-dashed rounded-lg mb-4"
                    style={{ borderColor: currentTheme.colors.border }}
                  >
                    <Box variant="surface" className="p-4">
                      <SmallText>Centered Content</SmallText>
                    </Box>
                  </Center>
                  <Between>
                    <Box variant="surface" className="p-4">
                      <SmallText>Left</SmallText>
                    </Box>
                    <Box variant="surface" className="p-4">
                      <SmallText>Right</SmallText>
                    </Box>
                  </Between>
                </div>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.surfaceHover,
                  border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                }}
              >
                <Code className="block whitespace-pre">
                  {`// Pre-built variants (import separately)
import { Row, Column, Center, Between, Wrap } from 'zaalim-ui'

// Row (direction="row")
<Row gap={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</Row>

// Column (direction="column")
<Column gap={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</Column>

// Center (align="center", justify="center")
<Center className="h-64">
  <Box>Perfectly Centered</Box>
</Center>

// Between (justify="between")
<Between>
  <Box>Left Item</Box>
  <Box>Right Item</Box>
</Between>

// Wrap (wrap="wrap")
<Wrap gap={4}>
  <Box className="w-32">Tag 1</Box>
  <Box className="w-32">Tag 2</Box>
  <Box className="w-32">Tag 3</Box>
</Wrap>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Practical Examples */}
          <Card variant="elevated">
            <CardHeader>
              <Heading level={3}>Practical Examples</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Heading level={4}>Navigation Bar</Heading>
                  <Between align="center" className="p-4 border rounded-lg">
                    <Flex align="center" gap={4}>
                      <Box variant="subtle" className="w-8 h-8 rounded" />
                      <SmallText>Brand</SmallText>
                    </Flex>
                    <Row gap={4}>
                      <SmallText className="cursor-pointer hover:opacity-80">
                        Home
                      </SmallText>
                      <SmallText className="cursor-pointer hover:opacity-80">
                        About
                      </SmallText>
                      <SmallText className="cursor-pointer hover:opacity-80">
                        Contact
                      </SmallText>
                    </Row>
                    <Button size="sm">Sign In</Button>
                  </Between>
                </div>

                <div className="space-y-4">
                  <Heading level={4}>Card with Actions</Heading>
                  <Column
                    gap={4}
                    className="p-6 flex flex-col border rounded-lg"
                  >
                    <Heading level={4}>Card Title</Heading>
                    <Paragraph>
                      This is a card with flexible content and action buttons
                      aligned at the bottom.
                    </Paragraph>
                    <Row justify="end" gap={3} className="mt-4">
                      <Button size="sm" variant="outline">
                        Cancel
                      </Button>
                      <Button size="sm" variant="primary">
                        Save
                      </Button>
                    </Row>
                  </Column>
                </div>

                <div className="space-y-4">
                  <Heading level={4}>Media Object</Heading>
                  <Flex gap={4} align="start">
                    <Box
                      variant="surface"
                      className="w-12 h-12 rounded-full flex-shrink-0"
                    />
                    <Column gap={1} className="flex-1">
                      <SmallText className="font-medium">User Name</SmallText>
                      <Paragraph className="text-sm">
                        This is a comment or message that can wrap to multiple
                        lines. The avatar stays aligned to the top regardless of
                        text height.
                      </Paragraph>
                    </Column>
                    <SmallText className="text-xs opacity-75 flex-shrink-0">
                      2h ago
                    </SmallText>
                  </Flex>
                </div>

                <div className="space-y-4">
                  <Heading level={4}>Responsive Layout</Heading>
                  <Column className="md:flex-row" gap={4}>
                    <FlexItem grow={1}>
                      <Box variant="surface" className="p-6 h-full">
                        <SmallText>Main Content</SmallText>
                        <Paragraph className="mt-2 text-sm">
                          This section grows to fill available space on desktop
                          but stacks vertically on mobile.
                        </Paragraph>
                      </Box>
                    </FlexItem>
                    <Box variant="subtle" className="p-6 md:w-64">
                      <SmallText>Sidebar</SmallText>
                      <Paragraph className="mt-2 text-sm">
                        Fixed width on desktop, full width on mobile.
                      </Paragraph>
                    </Box>
                  </Column>
                </div>
              </div>
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
                    {/* Flex Props */}
                    <tr>
                      <td
                        className="px-4 py-3 text-sm font-medium"
                        rowSpan={8}
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        Flex
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        direction
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        'row' | 'row-reverse' | 'column' | 'column-reverse'
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        'row'
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Direction of flex items
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
                        align
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        'start' | 'center' | 'end' | 'baseline' | 'stretch'
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        'stretch'
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Vertical alignment of flex items
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        justify
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        'start' | 'center' | 'end' | 'between' | 'around' |
                        'evenly'
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        'start'
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Horizontal distribution of flex items
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
                        wrap
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        'nowrap' | 'wrap' | 'wrap-reverse'
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        'nowrap'
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Whether flex items wrap
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        gap
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        0-32
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        4
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Gap between flex items
                      </td>
                    </tr>

                    {/* FlexItem Props */}
                    <tr
                      style={{
                        backgroundColor: currentTheme.colors.backgroundSubtle,
                      }}
                    >
                      <td
                        className="px-4 py-3 text-sm font-medium"
                        rowSpan={5}
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        FlexItem
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        grow
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        boolean | 0-5
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
                        Ability to grow to fill space
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        shrink
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        boolean | 0-1
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        true
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Ability to shrink if needed
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
                        basis
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        string | number
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
                        Initial size before growing/shrinking
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        order
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        number
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
                        Visual order of the item
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
                      Use <Code>Row</Code> and <Code>Column</Code> for simple
                      layouts instead of manual <Code>direction</Code> setting
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Always use <Code>gap</Code> for spacing instead of margins
                      on individual items
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Use <Code>Center</Code> for centering instead of custom
                      CSS
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Set <Code>wrap="wrap"</Code> for responsive designs where
                      items should stack on smaller screens
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Use <Code>FlexItem</Code> with <Code>grow</Code> for
                      flexible layouts with fixed-width elements
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Combine <Code>align</Code> and <Code>justify</Code> for
                      precise control over item placement
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Use <Code>Between</Code> for navigation bars and toolbars
                      where items should push to edges
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

// Helper Grid component for layout
function Grid({
  children,
  cols = 1,
  gap = 4,
  className = "",
}: {
  children: React.ReactNode;
  cols?: 1 | 2;
  gap?: 0 | 2 | 4 | 6 | 8;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 ${
        cols === 2 ? "md:grid-cols-2" : ""
      } gap-${gap} ${className}`}
    >
      {children}
    </div>
  );
}
