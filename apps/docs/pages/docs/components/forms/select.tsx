// apps/docs/pages/docs/components/select.tsx
import { DocsLayout } from "../../../../components/layout/DocsLayout";
import {
  ThemeProvider,
  defaultTheme,
  darkTheme,
  Select,
  Button,
  Card,
  CardContent,
  CardHeader,
  Heading,
  Paragraph,
  Label,
  Typography,
} from "zaalim-ui";
import { useState } from "react";

// Simple icons for demonstration
const GlobeIcon = () => <span className="text-lg">🌍</span>;
const UserIcon = () => <span className="text-lg">👤</span>;
const CategoryIcon = () => <span className="text-lg">📁</span>;
const CalendarIcon = () => <span className="text-lg">📅</span>;

export default function SelectDocs() {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");
  const currentTheme = activeTheme === "light" ? defaultTheme : darkTheme;

  // Sample data for examples
  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
    { value: "br", label: "Brazil" },
  ];

  const categoryOptions = [
    { value: "tech", label: "Technology" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing", disabled: true },
    { value: "sales", label: "Sales" },
    { value: "support", label: "Support" },
    { value: "hr", label: "Human Resources" },
  ];

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const sizeOptions = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
    { value: "xl", label: "Extra Large" },
  ];

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <ThemeProvider value={currentTheme}>
      <DocsLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1
              className="text-4xl font-bold"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Select
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

          {/* Overview */}
          <div className="space-y-6">
            <h2
              className="text-2xl font-semibold"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Overview
            </h2>
            <Paragraph style={{ color: currentTheme.colors.text.secondary }}>
              Zaalim UI Select components are fully theme-aware dropdown
              selectors with support for labels, helper text, validation states,
              icons, and multiple variants. Built on native HTML select elements
              with enhanced styling.
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
                  {`import { Select } from 'zaalim-ui'`}
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
                  <Label>Simple Select</Label>
                  <Select
                    options={countryOptions}
                    placeholder="Choose a country"
                  />

                  <Label>With Label</Label>
                  <Select
                    label="Country"
                    options={countryOptions}
                    placeholder="Select your country"
                  />

                  <Label>With Helper Text</Label>
                  <Select
                    label="Category"
                    options={categoryOptions}
                    placeholder="Select category"
                    helperText="Choose a category for your content"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Required Select</Label>
                  <Select
                    label="Status"
                    options={statusOptions}
                    placeholder="Select status"
                    required
                  />

                  <Label>With Icons</Label>
                  <Select
                    label="Country"
                    options={countryOptions}
                    placeholder="Select country"
                    leftIcon={<GlobeIcon />}
                  />

                  <Label>Pre-selected Value</Label>
                  <Select
                    label="Order Status"
                    options={statusOptions}
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
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
                  {`// Basic select
<Select 
  options={countryOptions} 
  placeholder="Choose a country" 
/>

// With label and helper text
<Select
  label="Category"
  options={categoryOptions}
  placeholder="Select category"
  helperText="Choose a category for your content"
/>

// With icon
<Select
  label="Country"
  options={countryOptions}
  leftIcon={<GlobeIcon />}
/>

// Controlled component
const [selected, setSelected] = useState('')
<Select
  options={options}
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
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
                  <Select
                    variant="outline"
                    options={sizeOptions}
                    placeholder="Select size"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Filled</Label>
                  <Select
                    variant="filled"
                    options={sizeOptions}
                    placeholder="Select size"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Ghost</Label>
                  <Select
                    variant="ghost"
                    options={sizeOptions}
                    placeholder="Select size"
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
<Select variant="outline" options={options} />

// Filled variant
<Select variant="filled" options={options} />

// Ghost variant
<Select variant="ghost" options={options} />`}
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
                  <Select
                    size="sm"
                    options={categoryOptions}
                    placeholder="Small select"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Medium (md) - Default</Label>
                  <Select
                    size="md"
                    options={categoryOptions}
                    placeholder="Medium select"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Large (lg)</Label>
                  <Select
                    size="lg"
                    options={categoryOptions}
                    placeholder="Large select"
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
<Select size="sm" options={options} />

// Medium size (default)
<Select size="md" options={options} />

// Large size
<Select size="lg" options={options} />`}
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
                  <Select
                    disabled
                    options={countryOptions}
                    placeholder="Disabled select"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Error State</Label>
                  <Select
                    error="Please select a valid option"
                    options={countryOptions}
                    placeholder="Error select"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Success State</Label>
                  <Select
                    success
                    options={countryOptions}
                    placeholder="Success select"
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
<Select disabled options={options} />

// Error state
<Select 
  error="Please select a valid option"
  options={options}
/>

// Success state
<Select success options={options} />

// Disabled options within select
const options = [
  { value: '1', label: 'Enabled Option' },
  { value: '2', label: 'Disabled Option', disabled: true },
];`}
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
                  <Label>Left Icon</Label>
                  <Select
                    leftIcon={<GlobeIcon />}
                    options={countryOptions}
                    placeholder="Select country"
                  />
                  <Select
                    leftIcon={<UserIcon />}
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "user", label: "User" },
                      { value: "guest", label: "Guest" },
                    ]}
                    placeholder="Select role"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Different Icons</Label>
                  <Select
                    leftIcon={<CategoryIcon />}
                    options={categoryOptions}
                    placeholder="Select category"
                  />
                  <Select
                    leftIcon={<CalendarIcon />}
                    options={[
                      { value: "2024", label: "2024" },
                      { value: "2025", label: "2025" },
                      { value: "2026", label: "2026" },
                    ]}
                    placeholder="Select year"
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
<Select 
  leftIcon={<GlobeIcon />}
  options={countryOptions}
  placeholder="Select country"
/>

// User role with icon
<Select 
  leftIcon={<UserIcon />}
  options={roleOptions}
  placeholder="Select role"
/>

// Category with icon
<Select 
  leftIcon={<CategoryIcon />}
  options={categoryOptions}
  placeholder="Select category"
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
                <Select
                  label="Country"
                  options={countryOptions}
                  leftIcon={<GlobeIcon />}
                  required
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  helperText="Your country of residence"
                />

                <Select
                  label="Category"
                  options={categoryOptions}
                  leftIcon={<CategoryIcon />}
                  required
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />

                <Select
                  label="Status"
                  options={statusOptions}
                  required
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  helperText="Current project status"
                />

                <Select
                  label="Size"
                  options={sizeOptions}
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  placeholder="Select size (optional)"
                />

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button variant="primary" className="flex-1">
                    Save Settings
                  </Button>
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
                  {`// Complete form with multiple selects
<form className="space-y-4">
  <Select
    label="Country"
    options={countryOptions}
    leftIcon={<GlobeIcon />}
    required
    value={country}
    onChange={(e) => setCountry(e.target.value)}
    helperText="Your country of residence"
  />

  <Select
    label="Category"
    options={categoryOptions}
    leftIcon={<CategoryIcon />}
    required
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  />

  <Select
    label="Status"
    options={statusOptions}
    required
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    helperText="Current project status"
  />

  <Button variant="primary" className="w-full">
    Save Settings
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
                        options
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        Array{"<"}
                        {"{"}value: string, label: string, disabled?: boolean
                        {"}"}
                        {">"}
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        (required)
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Array of select options. Each option must have value and
                        label.
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
                        Select size with appropriate padding
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
                        Select label text
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        placeholder
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
                        'Select an option'
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Placeholder text shown when no option is selected
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
                        Help text shown below select
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
                        Makes select take full width of container
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
                    <code className="px-1 rounded bg-brand-100">
                      placeholder
                    </code>{" "}
                    to provide clear selection instructions
                  </li>
                  <li>
                    • Group related options and use{" "}
                    <code className="px-1 rounded bg-brand-100">disabled</code>{" "}
                    for unavailable choices
                  </li>
                  <li>
                    • For long lists (10+ items), consider implementing a
                    searchable select
                  </li>
                  <li>
                    • Always provide a{" "}
                    <code className="px-1 rounded bg-brand-100">label</code> for
                    accessibility
                  </li>
                  <li>
                    • Use{" "}
                    <code className="px-1 rounded bg-brand-100">
                      helperText
                    </code>{" "}
                    to explain why a selection is needed
                  </li>
                  <li>
                    • Make required fields clear with{" "}
                    <code className="px-1 rounded bg-brand-100">required</code>{" "}
                    prop and visual indicators
                  </li>
                  <li>
                    • Icons can help users quickly identify the purpose of the
                    select
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
