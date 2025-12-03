import { DocsLayout } from "../../../../components/layout/DocsLayout";
import {
  ThemeProvider,
  defaultTheme,
  darkTheme,
  Textarea,
  Card,
  CardContent,
  CardHeader,
  Button,
  Paragraph,
  Label,
} from "zaalim-ui";
import { useState } from "react";

export default function TextareaDocs() {
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
              Textarea
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
              Zaalim UI Textarea component is a multi-line text input field
              perfect for longer form content, comments, descriptions, and
              messages. It shares the same theme-aware styling and features as
              the Input component.
            </Paragraph>
          </div>

          {/* Import Section */}
          <Card>
            <CardHeader>
              <h3
                className="text-lg font-semibold"
                style={{ color: currentTheme.colors.text.primary }}
              >
                Import
              </h3>
            </CardHeader>
            <CardContent>
              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.surfaceHover,
                  border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                }}
              >
                <pre
                  className="text-sm"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  {`import { Textarea } from 'zaalim-ui'

// Or import both Input and Textarea
import { Input, Textarea } from 'zaalim-ui'`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Basic Examples */}
          <Card variant="elevated">
            <CardHeader>
              <h3
                className="text-lg font-semibold"
                style={{ color: currentTheme.colors.text.primary }}
              >
                Basic Examples
              </h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>Default Textarea</Label>
                  <Textarea placeholder="Enter your message here..." />
                </div>

                <div className="space-y-3">
                  <Label>With Label</Label>
                  <Textarea
                    label="Description"
                    placeholder="Describe your project..."
                  />
                </div>

                <div className="space-y-3">
                  <Label>With Helper Text</Label>
                  <Textarea
                    label="Feedback"
                    placeholder="Share your thoughts..."
                    helperText="Please provide detailed feedback to help us improve."
                  />
                </div>
              </div>

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
                  {`// Basic textarea
<Textarea placeholder="Enter your message here..." />

// With label
<Textarea 
  label="Description"
  placeholder="Describe your project..."
/>

// With helper text
<Textarea 
  label="Feedback"
  placeholder="Share your thoughts..."
  helperText="Please provide detailed feedback."
/>`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Rows Examples */}
          <Card>
            <CardHeader>
              <h3
                className="text-lg font-semibold"
                style={{ color: currentTheme.colors.text.primary }}
              >
                Rows & Height
              </h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label>Small (3 rows)</Label>
                  <Textarea placeholder="Short description..." rows={3} />
                </div>

                <div className="space-y-3">
                  <Label>Medium (5 rows)</Label>
                  <Textarea placeholder="Detailed description..." rows={5} />
                </div>

                <div className="space-y-3">
                  <Label>Large (8 rows)</Label>
                  <Textarea placeholder="Long content or article..." rows={8} />
                </div>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.surfaceHover,
                  border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                }}
              >
                <pre
                  className="text-sm"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  {`// Small textarea (3 rows)
<Textarea 
  placeholder="Short description..."
  rows={3}
/>

// Medium textarea (5 rows)
<Textarea 
  placeholder="Detailed description..."
  rows={5}
/>

// Large textarea (8 rows)
<Textarea 
  placeholder="Long content..."
  rows={8}
/>

// Auto-resizable (default)
<Textarea 
  placeholder="Auto-resizes with content..."
/>`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Variants */}
          <Card>
            <CardHeader>
              <h3
                className="text-lg font-semibold"
                style={{ color: currentTheme.colors.text.primary }}
              >
                Variants
              </h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label>Outline (Default)</Label>
                  <Textarea
                    variant="outline"
                    placeholder="Outline variant..."
                    rows={3}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Filled</Label>
                  <Textarea
                    variant="filled"
                    placeholder="Filled variant..."
                    rows={3}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Ghost</Label>
                  <Textarea
                    variant="ghost"
                    placeholder="Ghost variant..."
                    rows={3}
                  />
                </div>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.surfaceHover,
                  border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                }}
              >
                <pre
                  className="text-sm"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  {`// Outline variant (default)
<Textarea 
  variant="outline"
  placeholder="Outline style..."
  rows={3}
/>

// Filled variant
<Textarea 
  variant="filled"
  placeholder="Filled style..."
  rows={3}
/>

// Ghost variant
<Textarea 
  variant="ghost"
  placeholder="Ghost style..."
  rows={3}
/>`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Sizes */}
          <Card variant="elevated">
            <CardHeader>
              <h3
                className="text-lg font-semibold"
                style={{ color: currentTheme.colors.text.primary }}
              >
                Sizes
              </h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>Small (sm)</Label>
                  <Textarea
                    size="sm"
                    placeholder="Small textarea..."
                    rows={3}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Medium (md) - Default</Label>
                  <Textarea
                    size="md"
                    placeholder="Medium textarea..."
                    rows={3}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Large (lg)</Label>
                  <Textarea
                    size="lg"
                    placeholder="Large textarea..."
                    rows={3}
                  />
                </div>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.surfaceHover,
                  border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                }}
              >
                <pre
                  className="text-sm"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  {`// Small size
<Textarea 
  size="sm"
  placeholder="Small..."
  rows={3}
/>

// Medium size (default)
<Textarea 
  size="md"
  placeholder="Medium..."
  rows={3}
/>

// Large size
<Textarea 
  size="lg"
  placeholder="Large..."
  rows={3}
/>`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* States */}
          <Card>
            <CardHeader>
              <h3
                className="text-lg font-semibold"
                style={{ color: currentTheme.colors.text.primary }}
              >
                States
              </h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label>Disabled</Label>
                  <Textarea
                    disabled
                    placeholder="Cannot edit this field..."
                    rows={3}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Error State</Label>
                  <Textarea
                    error="Description must be at least 50 characters"
                    placeholder="Enter description..."
                    rows={3}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Success State</Label>
                  <Textarea
                    success
                    placeholder="Successfully saved..."
                    rows={3}
                  />
                </div>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.surfaceHover,
                  border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                }}
              >
                <pre
                  className="text-sm"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  {`// Disabled state
<Textarea 
  disabled
  placeholder="Cannot edit..."
  rows={3}
/>

// Error state
<Textarea 
  error="Description too short"
  placeholder="Enter description..."
  rows={3}
/>

// Success state
<Textarea 
  success
  placeholder="Success!"
  rows={3}
/>`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Usage Examples */}
          <Card variant="elevated">
            <CardHeader>
              <h3
                className="text-lg font-semibold"
                style={{ color: currentTheme.colors.text.primary }}
              >
                Usage Examples
              </h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                {/* Comment Form */}
                <div className="space-y-3">
                  <Label>Comment Form</Label>
                  <Textarea
                    label="Add a comment"
                    placeholder="Write your comment here..."
                    rows={4}
                    helperText="Comments support Markdown formatting"
                    fullWidth
                  />
                  <div className="flex justify-end">
                    <Button size="sm" variant="outline" className="mr-2">
                      Cancel
                    </Button>
                    <Button size="sm" variant="primary">
                      Post Comment
                    </Button>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="space-y-3">
                  <Label>Contact Form</Label>
                  <Textarea
                    label="Your Message"
                    placeholder="How can we help you?"
                    rows={5}
                    required
                    helperText="Please include relevant details for faster response"
                    fullWidth
                  />
                </div>
              </div>

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
                  {`// Comment form example
<div className="space-y-3">
  <Textarea 
    label="Add a comment"
    placeholder="Write your comment here..."
    rows={4}
    helperText="Comments support Markdown"
    fullWidth
  />
  <div className="flex justify-end">
    <Button size="sm" variant="outline" className="mr-2">
      Cancel
    </Button>
    <Button size="sm" variant="primary">
      Post Comment
    </Button>
  </div>
</div>

// Contact form example
<Textarea 
  label="Your Message"
  placeholder="How can we help you?"
  rows={5}
  required
  helperText="Include relevant details"
  fullWidth
/>`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* API Reference */}
          <Card>
            <CardHeader>
              <h3
                className="text-lg font-semibold"
                style={{ color: currentTheme.colors.text.primary }}
              >
                API Reference
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
                        rows
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
                        3
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Number of visible text lines
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
                        variant
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        'outline' | 'filled' | 'ghost'
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        'outline'
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Visual style variant
                      </td>
                    </tr>
                    <tr>
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
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Textarea size with appropriate padding
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
                        label
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
                        -
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Textarea label text
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        helperText
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
                        -
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Help text shown below textarea
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
                        error
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
                        -
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Error message, enables error styling
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        success
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
                        Enables success styling
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
                        fullWidth
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
                        Makes textarea take full width of container
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
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Disables the textarea
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
                        required
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
                        Marks textarea as required
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Pro Tips */}
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
                <h4
                  className="font-semibold mb-2"
                  style={{ color: currentTheme.colors.brand[600] }}
                >
                  Best Practices
                </h4>
                <ul
                  className="space-y-2 text-sm"
                  style={{ color: currentTheme.colors.brand[600] + "CC" }}
                >
                  <li>
                    • Use{" "}
                    <code className="px-1 rounded bg-brand-100">rows={4}</code>{" "}
                    for short comments and messages
                  </li>
                  <li>
                    • Use{" "}
                    <code className="px-1 rounded bg-brand-100">rows={6}</code>{" "}
                    or more for detailed descriptions
                  </li>
                  <li>
                    • Always provide{" "}
                    <code className="px-1 rounded bg-brand-100">
                      helperText
                    </code>{" "}
                    to guide users on expected content
                  </li>
                  <li>
                    • Use{" "}
                    <code className="px-1 rounded bg-brand-100">fullWidth</code>{" "}
                    in form layouts for consistency
                  </li>
                  <li>
                    •{" "}
                    <code className="px-1 rounded bg-brand-100">
                      variant="ghost"
                    </code>{" "}
                    works well in minimalist comment sections
                  </li>
                  <li>
                    • Combine with validation states for better user feedback
                  </li>
                  <li>
                    • All textareas automatically respect your theme colors
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
