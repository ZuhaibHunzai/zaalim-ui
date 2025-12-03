import { DocsLayout } from "../../../../components/layout/DocsLayout";
import {
  ThemeProvider,
  defaultTheme,
  darkTheme,
  Input,
  Textarea,
  Card,
  CardContent,
  CardHeader,
  Button,
  Heading,
  Paragraph,
  SmallText,
  Label,
  Typography,
} from "zaalim-ui";
import { useState } from "react";

// Simple icons for demonstration
const MailIcon = () => <span className="text-lg">✉️</span>;
const LockIcon = () => <span className="text-lg">🔒</span>;
const SearchIcon = () => <span className="text-lg">🔍</span>;
const UserIcon = () => <span className="text-lg">👤</span>;
const CalendarIcon = () => <span className="text-lg">📅</span>;

export default function InputDocs() {
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
              Input
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
              Zaalim UI Input components are fully theme-aware text fields with
              support for labels, helper text, validation states, icons, and
              multiple variants. Both Input and Textarea components adapt to
              your theme colors automatically.
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
                  {`import { Input, Textarea } from 'zaalim-ui'`}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label>Basic Input</Label>
                  <Input placeholder="Enter your name" />
                  <Input placeholder="With label" label="Username" />
                  <Input
                    placeholder="With helper text"
                    label="Email"
                    helperText="We'll never share your email."
                  />
                </div>

                <div className="space-y-4">
                  <Label>Basic Textarea</Label>
                  <Textarea placeholder="Enter your message" />
                  <Textarea
                    placeholder="With label"
                    label="Description"
                    rows={4}
                  />
                  <Textarea
                    placeholder="With helper text"
                    label="Bio"
                    helperText="Tell us about yourself"
                    rows={3}
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
                  {`// Basic Input
<Input placeholder="Enter your name" />

// Input with label
<Input label="Username" placeholder="Enter username" />

// Input with helper text
<Input 
  label="Email"
  placeholder="you@example.com"
  helperText="We'll never share your email."
/>

// Basic Textarea
<Textarea placeholder="Enter your message" />

// Textarea with label and rows
<Textarea 
  label="Description"
  placeholder="Enter description"
  rows={4}
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
                <div className="space-y-4">
                  <Label>Outline (Default)</Label>
                  <Input variant="outline" placeholder="Outline input" />
                  <Textarea variant="outline" placeholder="Outline textarea" />
                </div>

                <div className="space-y-4">
                  <Label>Filled</Label>
                  <Input variant="filled" placeholder="Filled input" />
                  <Textarea variant="filled" placeholder="Filled textarea" />
                </div>

                <div className="space-y-4">
                  <Label>Ghost</Label>
                  <Input variant="ghost" placeholder="Ghost input" />
                  <Textarea variant="ghost" placeholder="Ghost textarea" />
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
<Input variant="outline" placeholder="Outline" />
<Textarea variant="outline" placeholder="Outline" />

// Filled variant
<Input variant="filled" placeholder="Filled" />
<Textarea variant="filled" placeholder="Filled" />

// Ghost variant
<Input variant="ghost" placeholder="Ghost" />
<Textarea variant="ghost" placeholder="Ghost" />`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Sizes */}
          <Card>
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
                  <Input size="sm" placeholder="Small input" />
                  <Textarea size="sm" placeholder="Small textarea" />
                </div>

                <div className="space-y-3">
                  <Label>Medium (md) - Default</Label>
                  <Input size="md" placeholder="Medium input" />
                  <Textarea size="md" placeholder="Medium textarea" />
                </div>

                <div className="space-y-3">
                  <Label>Large (lg)</Label>
                  <Input size="lg" placeholder="Large input" />
                  <Textarea size="lg" placeholder="Large textarea" />
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
<Input size="sm" placeholder="Small" />
<Textarea size="sm" placeholder="Small" />

// Medium size (default)
<Input size="md" placeholder="Medium" />
<Textarea size="md" placeholder="Medium" />

// Large size
<Input size="lg" placeholder="Large" />
<Textarea size="lg" placeholder="Large" />`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* States */}
          <Card variant="elevated">
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
                <div className="space-y-4">
                  <Label>Disabled</Label>
                  <Input disabled placeholder="Disabled input" />
                  <Textarea disabled placeholder="Disabled textarea" />
                </div>

                <div className="space-y-4">
                  <Label>Error State</Label>
                  <Input
                    error="This field is required"
                    placeholder="Error input"
                  />
                  <Textarea
                    error="Description is too short"
                    placeholder="Error textarea"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Success State</Label>
                  <Input success placeholder="Success input" />
                  <Textarea success placeholder="Success textarea" />
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
<Input disabled placeholder="Can't edit this" />
<Textarea disabled placeholder="Can't edit this" />

// Error state
<Input 
  error="This field is required"
  placeholder="With error"
/>
<Textarea 
  error="Description is too short"
  placeholder="With error"
/>

// Success state
<Input 
  success
  placeholder="Success!"
/>
<Textarea 
  success
  placeholder="Success!"
/>`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Icons */}
          <Card>
            <CardHeader>
              <h3
                className="text-lg font-semibold"
                style={{ color: currentTheme.colors.text.primary }}
              >
                With Icons
              </h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>Left Icons</Label>
                  <Input leftIcon={<MailIcon />} placeholder="Email address" />
                  <Input
                    leftIcon={<LockIcon />}
                    placeholder="Password"
                    type="password"
                  />
                  <Input leftIcon={<SearchIcon />} placeholder="Search..." />
                </div>

                <div className="space-y-3">
                  <Label>Right Icons</Label>
                  <Input rightIcon={<UserIcon />} placeholder="Username" />
                  <Input
                    rightIcon={<CalendarIcon />}
                    placeholder="Select date"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Both Sides</Label>
                  <Input
                    leftIcon={<MailIcon />}
                    rightIcon="✗"
                    placeholder="Clearable input"
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
                  {`// Left icon
<Input 
  leftIcon={<MailIcon />}
  placeholder="Email address"
/>

// Right icon
<Input 
  rightIcon={<CalendarIcon />}
  placeholder="Select date"
/>

// Both sides
<Input 
  leftIcon={<SearchIcon />}
  rightIcon="✗"
  placeholder="Search..."
/>

// Password with lock icon
<Input 
  leftIcon={<LockIcon />}
  type="password"
  placeholder="Password"
/>`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Form Example */}
          <Card variant="elevated">
            <CardHeader>
              <h3
                className="text-lg font-semibold"
                style={{ color: currentTheme.colors.text.primary }}
              >
                Complete Form Example
              </h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 max-w-md">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  leftIcon={<UserIcon />}
                  required
                />

                <Input
                  label="Email Address"
                  placeholder="john@example.com"
                  leftIcon={<MailIcon />}
                  type="email"
                  required
                  helperText="We'll never share your email."
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  leftIcon={<LockIcon />}
                  required
                />

                <Textarea
                  label="Bio"
                  placeholder="Tell us about yourself..."
                  rows={3}
                  helperText="Optional"
                />

                <Button variant="primary" className="w-full">
                  Create Account
                </Button>
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
                  {`// Complete registration form
<form className="space-y-4">
  <Input 
    label="Full Name"
    placeholder="John Doe"
    leftIcon={<UserIcon />}
    required
  />

  <Input 
    label="Email Address"
    placeholder="john@example.com"
    leftIcon={<MailIcon />}
    type="email"
    required
    helperText="We'll never share your email."
  />

  <Input 
    label="Password"
    type="password"
    placeholder="••••••••"
    leftIcon={<LockIcon />}
    required
  />

  <Textarea 
    label="Bio"
    placeholder="Tell us about yourself..."
    rows={3}
    helperText="Optional"
  />

  <Button variant="primary" className="w-full">
    Create Account
  </Button>
</form>`}
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
                    <tr
                      style={{
                        backgroundColor: currentTheme.colors.backgroundSubtle,
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
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Input size with appropriate padding
                      </td>
                    </tr>
                    <tr>
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
                        Input label text
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
                        Help text shown below input
                      </td>
                    </tr>
                    <tr>
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
                    <tr
                      style={{
                        backgroundColor: currentTheme.colors.backgroundSubtle,
                      }}
                    >
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
                    <tr>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        leftIcon
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        ReactNode
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
                        Icon displayed on the left side
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
                        rightIcon
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        ReactNode
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
                        Icon displayed on the right side
                      </td>
                    </tr>
                    <tr>
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
                        Makes input take full width of container
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
                  Pro Tips
                </h4>
                <ul
                  className="space-y-2 text-sm"
                  style={{ color: currentTheme.colors.brand[600] + "CC" }}
                >
                  <li>
                    • Use{" "}
                    <code className="px-1 rounded bg-brand-100">
                      variant="filled"
                    </code>{" "}
                    for dense interfaces
                  </li>
                  <li>
                    •{" "}
                    <code className="px-1 rounded bg-brand-100">
                      variant="ghost"
                    </code>{" "}
                    works great in headers and minimalist designs
                  </li>
                  <li>
                    • Combine{" "}
                    <code className="px-1 rounded bg-brand-100">leftIcon</code>{" "}
                    and{" "}
                    <code className="px-1 rounded bg-brand-100">rightIcon</code>{" "}
                    for clear visual hierarchy
                  </li>
                  <li>
                    • Always provide helpful{" "}
                    <code className="px-1 rounded bg-brand-100">
                      helperText
                    </code>{" "}
                    for complex inputs
                  </li>
                  <li>
                    • Use{" "}
                    <code className="px-1 rounded bg-brand-100">fullWidth</code>{" "}
                    for form layouts to ensure consistency
                  </li>
                  <li>
                    • All states (error, success, disabled) respect your theme
                    colors automatically
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
