import { DocsLayout } from "../../../components/layout/DocsLayout";
import {
  ThemeProvider,
  defaultTheme,
  darkTheme,
  Heading,
  Display,
  Title,
  Subtitle,
  Paragraph,
  SmallText,
  Label,
  Caption,
  Code,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
} from "zaalim-ui";
import { useState } from "react";

export default function TypographyDocs() {
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
              Typography
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
            <Paragraph style={{ color: currentTheme.colors.text.secondary }}>
              Zaalim UI provides a comprehensive typography system with semantic
              components that adapt to your theme colors and ensure consistent
              text styling across your application.
            </Paragraph>
          </div>

          {/* Hierarchy */}
          <Card variant="elevated">
            <CardHeader>
              <Title>Typography Hierarchy</Title>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-2">
                <Display>Display</Display>
                <Caption>
                  Extra large for hero sections and prominent titles
                </Caption>
              </div>

              <div className="space-y-2">
                <Heading level={1}>Heading 1</Heading>
                <Caption>Main page titles</Caption>
              </div>

              <div className="space-y-2">
                <Heading level={2}>Heading 2</Heading>
                <Caption>Section headers</Caption>
              </div>

              <div className="space-y-2">
                <Heading level={3}>Heading 3</Heading>
                <Caption>Subsection headers</Caption>
              </div>

              <div className="space-y-2">
                <Title>Title</Title>
                <Caption>Component and card titles</Caption>
              </div>

              <div className="space-y-2">
                <Subtitle>Subtitle</Subtitle>
                <Caption>Secondary titles and descriptions</Caption>
              </div>

              <div className="space-y-2">
                <Paragraph>
                  Paragraph - This is a standard paragraph of text. It uses the
                  base font size and line height for optimal readability in body
                  content.
                </Paragraph>
                <Caption>Body text and content paragraphs</Caption>
              </div>

              <div className="space-y-2">
                <SmallText>
                  Small Text - Used for captions, metadata, and secondary
                  information.
                </SmallText>
                <Caption>Smaller text for buttons, chips, and metadata</Caption>
              </div>

              <div className="space-y-2">
                <Label>Label</Label>
                <Caption>Form labels and UI labels</Caption>
              </div>

              <div className="space-y-2">
                <Caption>
                  Caption - Extra small text for fine print and disclaimers.
                </Caption>
                <Caption>Smallest text for captions and legal text</Caption>
              </div>
            </CardContent>
          </Card>

          {/* Color Variants */}
          <Card>
            <CardHeader>
              <Title>Color Variants</Title>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Typography color="primary">Primary Text</Typography>
                <Typography color="secondary">Secondary Text</Typography>
                <Typography color="muted">Muted Text</Typography>
                <Typography color="brand">Brand Text</Typography>
                <Typography color="success">Success Text</Typography>
                <Typography color="warning">Warning Text</Typography>
                <Typography color="error">Error Text</Typography>
                <Typography color="info">Info Text</Typography>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.surfaceHover,
                }}
              >
                <pre style={{ color: currentTheme.colors.text.primary }}>
                  {`// Color variants
<Paragraph color="primary">Primary text</Paragraph>
<Paragraph color="secondary">Secondary text</Paragraph>
<Paragraph color="brand">Brand color text</Paragraph>
<Paragraph color="success">Success message</Paragraph>`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Weight Variants */}
          <Card>
            <CardHeader>
              <Title>Font Weights</Title>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Typography weight="light">Light weight text</Typography>
                <Typography weight="normal">Normal weight text</Typography>
                <Typography weight="medium">Medium weight text</Typography>
                <Typography weight="semibold">Semibold weight text</Typography>
                <Typography weight="bold">Bold weight text</Typography>
              </div>
            </CardContent>
          </Card>

          {/* Code Example */}
          <Card>
            <CardHeader>
              <Title>Code Text</Title>
            </CardHeader>
            <CardContent className="space-y-4">
              <Paragraph>
                Use the <Code>Code</Code> component for inline code snippets.
                For example: <Code>const theme = createTheme()</Code> or
                <Code className="ml-2">npm install zaalim-ui</Code>
              </Paragraph>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.surfaceHover,
                }}
              >
                <pre style={{ color: currentTheme.colors.text.primary }}>
                  {`// Code component usage
<Paragraph>
  Install using <Code>npm install zaalim-ui</Code>
</Paragraph>

// Standalone code block
<Code>const theme = defaultTheme</Code>`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Usage Examples */}
          <Card variant="elevated">
            <CardHeader>
              <Title>Usage Examples</Title>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Heading level={3}>Card Component</Heading>
                <Card hoverable>
                  <CardHeader>
                    <Title>Project Dashboard</Title>
                    <Subtitle>Real-time analytics and metrics</Subtitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph>
                      Welcome to your project dashboard. Here you can monitor
                      key metrics and track your project's performance.
                    </Paragraph>
                    <div className="flex items-center gap-2 mt-4">
                      <SmallText>Updated:</SmallText>
                      <Caption>Just now</Caption>
                    </div>
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
                  {`// Complete card example with typography
<Card>
  <CardHeader>
    <Title>Card Title</Title>
    <Subtitle>Card subtitle description</Subtitle>
  </CardHeader>
  <CardContent>
    <Paragraph>
      Main content goes here with proper typography.
    </Paragraph>
    <div className="flex items-center gap-2">
      <SmallText>Status:</SmallText>
      <Caption color="success">Active</Caption>
    </div>
  </CardContent>
</Card>`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
        <div
          className="p-6 rounded-xl mt-4"
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
              <h4
                className="font-semibold mb-2"
                style={{ color: currentTheme.colors.brand[600] }}
              >
                Pro Tips
              </h4>
              <ul
                className="space-y-2 text-sm"
                style={{ color: currentTheme.colors.brand[600] + "CC" }}
              >
                <li>
                  • Use Heading components for semantic document structure
                </li>
                <li>
                  • Paragraph automatically sets optimal line height for
                  readability
                </li>
                <li>• SmallText is perfect for button labels and metadata</li>
                <li>
                  • Label includes uppercase styling ideal for form labels
                </li>
                <li>
                  • All components respect your theme's color system
                  automatically
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DocsLayout>
    </ThemeProvider>
  );
}
