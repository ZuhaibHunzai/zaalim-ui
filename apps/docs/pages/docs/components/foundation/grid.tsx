// apps/docs/pages/docs/foundation/grid.tsx
import { DocsLayout } from "../../../../components/layout/DocsLayout";
import {
  ThemeProvider,
  defaultTheme,
  darkTheme,
  Grid,
  GridItem,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Heading,
  Paragraph,
  SmallText,
  Code,
  Flex,
} from "zaalim-ui";
import { useState } from "react";

export default function GridDocs() {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");
  const currentTheme = activeTheme === "light" ? defaultTheme : darkTheme;

  // Interactive examples state
  const [gridCols, setGridCols] = useState<1 | 2 | 3 | 4>(2);
  const [gridGap, setGridGap] = useState<0 | 2 | 4 | 6 | 8>(4);
  const [responsiveMode, setResponsiveMode] = useState<
    "none" | "mobile" | "tablet" | "desktop"
  >("tablet");
  const [itemSpan, setItemSpan] = useState<1 | 2 | 3 | 4 | "full">(1);
  const [alignItems, setAlignItems] = useState<
    "start" | "center" | "end" | "stretch"
  >("stretch");
  const [justifyContent, setJustifyContent] = useState<
    "start" | "center" | "end" | "between" | "around"
  >("start");

  // Generate responsive props based on mode
  const getResponsiveProps = () => {
    switch (responsiveMode) {
      case "mobile":
        return { cols: 1, sm: 2, md: 2, lg: 2, xl: 2 };
      case "tablet":
        return { cols: 1, sm: 2, md: 3, lg: 3, xl: 3 };
      case "desktop":
        return { cols: 1, sm: 2, md: 3, lg: 4, xl: 4 };
      default:
        return { cols: gridCols };
    }
  };

  const responsiveProps = getResponsiveProps();

  return (
    <ThemeProvider value={currentTheme}>
      <DocsLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <Heading level={1}>Grid</Heading>
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
              The Grid component provides a powerful, responsive grid system
              built on CSS Grid. It allows you to create complex layouts with
              precise control over columns, gaps, and item placement while
              maintaining full theme awareness.
            </Paragraph>
            <Paragraph>
              Grid works seamlessly with <Code>GridItem</Code> for individual
              cell control, supporting column/row spanning, responsive
              breakpoints, and alignment options.
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
                  {`import { Grid, GridItem } from 'zaalim-ui'`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Basic Grid */}
          <Card variant="elevated">
            <CardHeader>
              <Heading level={3}>Basic Grid</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Flex justify="between" align="center">
                  <SmallText>Select number of columns:</SmallText>
                  <Flex gap={2}>
                    {([1, 2, 3, 4] as const).map((num) => (
                      <Button
                        key={num}
                        size="sm"
                        variant={gridCols === num ? "primary" : "outline"}
                        onClick={() => setGridCols(num)}
                      >
                        {num} Col{num !== 1 ? "s" : ""}
                      </Button>
                    ))}
                  </Flex>
                </Flex>

                <Grid cols={gridCols} gap={gridGap}>
                  {Array.from({ length: gridCols * 2 }).map((_, index) => (
                    <GridItem key={index}>
                      <Box
                        variant="surface"
                        className="p-6 h-24 flex items-center justify-center"
                      >
                        <SmallText>Item {index + 1}</SmallText>
                      </Box>
                    </GridItem>
                  ))}
                </Grid>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.brand[50],
                  border: `1px solid ${currentTheme.colors.brand[200]}`,
                }}
              >
                <Code className="block whitespace-pre">
                  {`// Basic ${gridCols}-column grid
<Grid cols={${gridCols}} gap={${gridGap}}>
  <GridItem>
    <Box variant="surface" className="p-6">Item 1</Box>
  </GridItem>
  <GridItem>
    <Box variant="surface" className="p-6">Item 2</Box>
  </GridItem>
  ${
    gridCols > 2
      ? `  <GridItem>\n    <Box variant="surface" className="p-6">Item 3</Box>\n  </GridItem>\n`
      : ""
  }
  ${
    gridCols > 3
      ? `  <GridItem>\n    <Box variant="surface" className="p-6">Item 4</Box>\n  </GridItem>\n`
      : ""
  }
</Grid>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Responsive Grid */}
          <Card>
            <CardHeader>
              <Heading level={3}>Responsive Grid</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Paragraph>
                Grid provides built-in responsive breakpoints for mobile-first
                design. Use <Code>sm</Code>, <Code>md</Code>, <Code>lg</Code>,
                and <Code>xl</Code> props to define different column layouts at
                different screen sizes.
              </Paragraph>

              <div className="space-y-4">
                <Flex justify="between" align="center">
                  <SmallText>Select responsive mode:</SmallText>
                  <Flex gap={2}>
                    <Button
                      size="sm"
                      variant={
                        responsiveMode === "none" ? "primary" : "outline"
                      }
                      onClick={() => setResponsiveMode("none")}
                    >
                      Fixed
                    </Button>
                    <Button
                      size="sm"
                      variant={
                        responsiveMode === "mobile" ? "primary" : "outline"
                      }
                      onClick={() => setResponsiveMode("mobile")}
                    >
                      Mobile
                    </Button>
                    <Button
                      size="sm"
                      variant={
                        responsiveMode === "tablet" ? "primary" : "outline"
                      }
                      onClick={() => setResponsiveMode("tablet")}
                    >
                      Tablet
                    </Button>
                    <Button
                      size="sm"
                      variant={
                        responsiveMode === "desktop" ? "primary" : "outline"
                      }
                      onClick={() => setResponsiveMode("desktop")}
                    >
                      Desktop
                    </Button>
                  </Flex>
                </Flex>

                <Box
                  variant="subtle"
                  rounded
                  className="p-4"
                  style={{
                    backgroundColor: currentTheme.colors.brand[50],
                  }}
                >
                  <Flex justify="center" gap={4} className="mb-4">
                    <Flex align="center" gap={2}>
                      <Box className="w-4 h-4 rounded-full bg-brand-500" />
                      <SmallText>
                        Mobile: {responsiveProps.cols} column
                      </SmallText>
                    </Flex>
                    {responsiveProps.sm && (
                      <Flex align="center" gap={2}>
                        <Box className="w-4 h-4 rounded-full bg-brand-400" />
                        <SmallText>
                          Small: {responsiveProps.sm} columns
                        </SmallText>
                      </Flex>
                    )}
                    {responsiveProps.md && (
                      <Flex align="center" gap={2}>
                        <Box className="w-4 h-4 rounded-full bg-brand-300" />
                        <SmallText>
                          Medium: {responsiveProps.md} columns
                        </SmallText>
                      </Flex>
                    )}
                    {responsiveProps.lg && (
                      <Flex align="center" gap={2}>
                        <Box className="w-4 h-4 rounded-full bg-brand-200" />
                        <SmallText>
                          Large: {responsiveProps.lg} columns
                        </SmallText>
                      </Flex>
                    )}
                  </Flex>

                  {/* <Grid {...responsiveProps} gap={3}>
                    {Array.from({ length: 12 }).map((_, index) => (
                      <GridItem key={index}>
                        <Box
                          variant="background"
                          border
                          rounded
                          className="p-3 h-12 flex items-center justify-center"
                        >
                          <SmallText>{index + 1}</SmallText>
                        </Box>
                      </GridItem>
                    ))}
                  </Grid> */}
                </Box>

                <div
                  className="p-4 rounded-lg"
                  style={{
                    backgroundColor: currentTheme.colors.surfaceHover,
                    border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                  }}
                >
                  <Code className="block whitespace-pre">
                    {`// ${
                      responsiveMode === "tablet"
                        ? "Tablet-optimized"
                        : responsiveMode === "mobile"
                        ? "Mobile-optimized"
                        : responsiveMode === "desktop"
                        ? "Desktop-optimized"
                        : "Fixed"
                    } responsive grid
<Grid 
  cols={${responsiveProps.cols}}
  ${responsiveProps.sm ? `sm={${responsiveProps.sm}}` : ""}
  ${responsiveProps.md ? `md={${responsiveProps.md}}` : ""}
  ${responsiveProps.lg ? `lg={${responsiveProps.lg}}` : ""}
  ${responsiveProps.xl ? `xl={${responsiveProps.xl}}` : ""}
  gap={3}
>
  ${Array.from({ length: 8 })
    .map(
      (_, i) =>
        `  <GridItem key="${i}">\n    <Box variant="background">Item ${
          i + 1
        }</Box>\n  </GridItem>`
    )
    .join("\n")}
</Grid>`}
                  </Code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grid Item Spanning */}
          <Card variant="elevated">
            <CardHeader>
              <Heading level={3}>Grid Item Spanning</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Paragraph>
                <Code>GridItem</Code> components can span multiple columns or
                rows using
                <Code>colSpan</Code>, <Code>rowSpan</Code>, and responsive span
                controls.
              </Paragraph>

              <div className="space-y-4">
                <Flex justify="between" align="center">
                  <SmallText>Select item span:</SmallText>
                  <Flex gap={2} wrap="wrap">
                    {([1, 2, 3, 4, "full"] as const).map((span) => (
                      <Button
                        key={span}
                        size="sm"
                        variant={itemSpan === span ? "primary" : "outline"}
                        onClick={() => setItemSpan(span)}
                      >
                        {span === "full" ? "Full Width" : `Span ${span}`}
                      </Button>
                    ))}
                  </Flex>
                </Flex>

                <Grid cols={4} gap={3}>
                  <GridItem colSpan={itemSpan === "full" ? "full" : itemSpan}>
                    <Box
                      variant="subtle"
                      rounded
                      className="p-6 h-20 flex items-center justify-center"
                    >
                      <SmallText className="text-white">
                        {itemSpan === "full"
                          ? "Full Width Item"
                          : `Spans ${itemSpan} ${
                              itemSpan === 1 ? "Column" : "Columns"
                            }`}
                      </SmallText>
                    </Box>
                  </GridItem>

                  {Array.from({
                    length: itemSpan === "full" ? 0 : 4 - itemSpan,
                  }).map((_, index) => (
                    <GridItem key={index}>
                      <Box
                        variant="surface"
                        rounded
                        className="p-6 h-20 flex items-center justify-center"
                      >
                        <SmallText>Item {index + 2}</SmallText>
                      </Box>
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
                    {`// Grid item with column spanning
<Grid cols={4} gap={3}>
  <GridItem colSpan={${itemSpan === "full" ? "'full'" : itemSpan}}>
    <Box variant="brand">${
      itemSpan === "full" ? "Full width item" : `Spans ${itemSpan} columns`
    }</Box>
  </GridItem>
  ${
    itemSpan !== "full"
      ? Array.from({ length: 4 - itemSpan })
          .map(
            (_, i) =>
              `  <GridItem>\n    <Box variant="surface">Item ${
                i + 2
              }</Box>\n  </GridItem>`
          )
          .join("\n")
      : ""
  }
</Grid>

// Row spanning example
<Grid cols={2} gap={3}>
  <GridItem rowSpan={2}>
    <Box variant="surface">Spans 2 rows</Box>
  </GridItem>
  <GridItem>
    <Box variant="surface">Normal item</Box>
  </GridItem>
  <GridItem>
    <Box variant="surface">Normal item</Box>
  </GridItem>
</Grid>

// Responsive spanning
<GridItem 
  colSpan={1} 
  sm={{ colSpan: 2 }} 
  md={{ colSpan: 3 }}
>
  <Box variant="surface">Responsive span</Box>
</GridItem>`}
                  </Code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alignment & Justification */}
          <Card>
            <CardHeader>
              <Heading level={3}>Alignment & Justification</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Grid cols={1} md={2} gap={6}>
                <GridItem>
                  <div className="space-y-4">
                    <Heading level={4}>Vertical Alignment</Heading>
                    <Flex gap={2} className="mb-2">
                      {(["start", "center", "end", "stretch"] as const).map(
                        (align) => (
                          <Button
                            key={align}
                            size="sm"
                            variant={
                              alignItems === align ? "primary" : "outline"
                            }
                            onClick={() => setAlignItems(align)}
                          >
                            {align}
                          </Button>
                        )
                      )}
                    </Flex>

                    <Grid
                      cols={3}
                      gap={3}
                      alignItems={alignItems}
                      className="h-48"
                    >
                      {Array.from({ length: 3 }).map((_, index) => (
                        <GridItem key={index}>
                          <Box
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
                            <SmallText>Height varies</SmallText>
                          </Box>
                        </GridItem>
                      ))}
                    </Grid>
                  </div>
                </GridItem>

                <GridItem>
                  <div className="space-y-4">
                    <Heading level={4}>Horizontal Justification</Heading>
                    <Flex gap={2} className="mb-2">
                      {(
                        ["start", "center", "end", "between", "around"] as const
                      ).map((justify) => (
                        <Button
                          key={justify}
                          size="sm"
                          variant={
                            justifyContent === justify ? "primary" : "outline"
                          }
                          onClick={() => setJustifyContent(justify)}
                        >
                          {justify}
                        </Button>
                      ))}
                    </Flex>

                    <Grid
                      cols={3}
                      gap={3}
                      justifyContent={justifyContent}
                      className="h-32"
                    >
                      {Array.from({ length: 3 }).map((_, index) => (
                        <GridItem key={index} className="w-16">
                          <Box variant="surface" className="p-4 h-16">
                            <SmallText>Item {index + 1}</SmallText>
                          </Box>
                        </GridItem>
                      ))}
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
                  {`// Vertical alignment
<Grid 
  cols={3} 
  alignItems="${alignItems}" 
  className="h-48"
>
  <GridItem>Item 1</GridItem>
  <GridItem>Item 2</GridItem>
  <GridItem>Item 3</GridItem>
</Grid>

// Horizontal justification
<Grid 
  cols={3} 
  justifyContent="${justifyContent}"
>
  <GridItem className="w-16">Item 1</GridItem>
  <GridItem className="w-16">Item 2</GridItem>
  <GridItem className="w-16">Item 3</GridItem>
</Grid>

// Combined alignment
<Grid 
  cols={3} 
  alignItems="center" 
  justifyContent="between"
>
  <GridItem>Left</GridItem>
  <GridItem>Center</GridItem>
  <GridItem>Right</GridItem>
</Grid>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Gap Sizes */}
          <Card variant="elevated">
            <CardHeader>
              <Heading level={3}>Gap Sizes</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Paragraph>
                Control spacing between grid items using the <Code>gap</Code>{" "}
                prop. Available sizes follow Tailwind's spacing scale.
              </Paragraph>

              <div className="space-y-4">
                <Flex justify="between" align="center">
                  <SmallText>Select gap size:</SmallText>
                  <Flex gap={2}>
                    {([0, 2, 4, 6, 8] as const).map((gapSize) => (
                      <Button
                        key={gapSize}
                        size="sm"
                        variant={gridGap === gapSize ? "primary" : "outline"}
                        onClick={() => setGridGap(gapSize)}
                      >
                        {gapSize === 0 ? "No Gap" : `Gap ${gapSize}`}
                      </Button>
                    ))}
                  </Flex>
                </Flex>

                <Grid cols={3} gap={gridGap}>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <GridItem key={index}>
                      <Box
                        variant="surface"
                        className="p-6 h-16 flex items-center justify-center"
                      >
                        <SmallText>Item</SmallText>
                      </Box>
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
                    {`// Grid with ${
                      gridGap === 0 ? "no gap" : `gap-${gridGap}`
                    }
<Grid cols={3} gap={${gridGap}}>
  <GridItem><Box variant="surface">Item 1</Box></GridItem>
  <GridItem><Box variant="surface">Item 2</Box></GridItem>
  <GridItem><Box variant="surface">Item 3</Box></GridItem>
  <GridItem><Box variant="surface">Item 4</Box></GridItem>
  <GridItem><Box variant="surface">Item 5</Box></GridItem>
  <GridItem><Box variant="surface">Item 6</Box></GridItem>
</Grid>

// Different gap sizes available
<Grid gap={0}>No spacing</Grid>
<Grid gap={2}>Extra small gap</Grid>
<Grid gap={4}>Small gap (default)</Grid>
<Grid gap={6}>Medium gap</Grid>
<Grid gap={8}>Large gap</Grid>
<Grid gap={10}>Extra large gap</Grid>
<Grid gap={12}>2x large gap</Grid>`}
                  </Code>
                </div>
              </div>
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
                    <Heading level={4}>Dashboard Layout</Heading>
                    <Grid cols={2} gap={4} className="h-64">
                      <GridItem colSpan={2}>
                        <Box
                          variant="surface"
                          className="p-4 h-full flex items-center justify-center"
                        >
                          <SmallText>Header (Full Width)</SmallText>
                        </Box>
                      </GridItem>
                      <GridItem>
                        <Box
                          variant="surface"
                          className="p-4 h-full flex items-center justify-center"
                        >
                          <SmallText>Sidebar</SmallText>
                        </Box>
                      </GridItem>
                      <GridItem>
                        <Box
                          variant="background"
                          className="p-4 h-full flex items-center justify-center"
                        >
                          <SmallText>Main Content</SmallText>
                        </Box>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Box
                          variant="surface"
                          className="p-4 h-full flex items-center justify-center"
                        >
                          <SmallText>Footer (Full Width)</SmallText>
                        </Box>
                      </GridItem>
                    </Grid>
                  </div>
                </GridItem>

                <GridItem>
                  <div className="space-y-4">
                    <Heading level={4}>Photo Gallery</Heading>
                    <Grid cols={2} sm={3} md={4} gap={3}>
                      {Array.from({ length: 8 }).map((_, index) => (
                        <GridItem key={index}>
                          <Box
                            variant="subtle"
                            className="aspect-square flex items-center justify-center"
                          >
                            <SmallText>Photo {index + 1}</SmallText>
                          </Box>
                        </GridItem>
                      ))}
                    </Grid>
                  </div>
                </GridItem>

                <GridItem>
                  <div className="space-y-4">
                    <Heading level={4}>Feature Grid</Heading>
                    <Grid cols={1} sm={2} lg={4} gap={4}>
                      {[
                        { title: "Fast", desc: "Lightning fast performance" },
                        { title: "Secure", desc: "Enterprise-grade security" },
                        { title: "Scalable", desc: "Grows with your needs" },
                        { title: "Reliable", desc: "99.9% uptime guarantee" },
                      ].map((feature, index) => (
                        <GridItem key={index}>
                          <Box
                            variant="surface"
                            rounded="lg"
                            className="p-4 text-center"
                          >
                            <Heading level={5} className="mb-2">
                              {feature.title}
                            </Heading>
                            <SmallText>{feature.desc}</SmallText>
                          </Box>
                        </GridItem>
                      ))}
                    </Grid>
                  </div>
                </GridItem>

                <GridItem>
                  <div className="space-y-4">
                    <Heading level={4}>Form Layout</Heading>
                    <Grid cols={1} md={2} gap={4}>
                      <GridItem>
                        <Box variant="surface" className="p-4">
                          <SmallText>First Name</SmallText>
                        </Box>
                      </GridItem>
                      <GridItem>
                        <Box variant="surface" className="p-4">
                          <SmallText>Last Name</SmallText>
                        </Box>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Box variant="surface" className="p-4">
                          <SmallText>Email Address</SmallText>
                        </Box>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Box variant="surface" className="p-4">
                          <SmallText>Message</SmallText>
                        </Box>
                      </GridItem>
                    </Grid>
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
                    {/* Grid Props */}
                    <tr>
                      <td
                        className="px-4 py-3 text-sm font-medium"
                        rowSpan={8}
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        Grid
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        cols
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        1-12
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        1
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Number of columns at base screen size
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
                        sm/md/lg/xl
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        1-12
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
                        Columns at sm:640px, md:768px, lg:1024px, xl:1280px
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
                        Gap between grid items (Tailwind spacing scale)
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
                        alignItems
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        'start' | 'center' | 'end' | 'stretch'
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
                        Vertical alignment of grid items
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        justifyContent
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        'start' | 'center' | 'end' | 'between' | 'around'
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
                        Horizontal distribution of grid items
                      </td>
                    </tr>

                    {/* GridItem Props */}
                    <tr
                      style={{
                        backgroundColor: currentTheme.colors.backgroundSubtle,
                      }}
                    >
                      <td
                        className="px-4 py-3 text-sm font-medium"
                        rowSpan={6}
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        GridItem
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        colSpan
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        1-12 | 'full'
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
                        Number of columns the item spans
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        rowSpan
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        1-6 | 'full'
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
                        Number of rows the item spans
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
                        colStart/colEnd
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        1-13
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
                        Start and end grid lines for precise placement
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        sm/md/lg/xl
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        object
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        -
                      </td>
                      {/* <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Responsive span overrides (e.g., sm={{ colSpan: 2 }})
                      </td> */}
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
                      Always use responsive props (<Code>sm</Code>,{" "}
                      <Code>md</Code>, etc.) for mobile-first designs
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Use <Code>colSpan="full"</Code> for full-width sections
                      within multi-column layouts
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Start with mobile layout (1 column) and add columns for
                      larger screens
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Use <Code>gap</Code> for consistent spacing instead of
                      margins on individual items
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Combine <Code>Grid</Code> with <Code>Box</Code> for
                      consistent styling and theme support
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Use <Code>alignItems</Code> and{" "}
                      <Code>justifyContent</Code> for alignment instead of
                      custom CSS
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Consider using CSS Grid directly for extremely complex
                      layouts beyond 12 columns
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
