// apps/docs/pages/docs/components/radio.tsx
import { DocsLayout } from "../../../../components/layout/DocsLayout";
import {
  ThemeProvider,
  defaultTheme,
  darkTheme,
  Radio,
  RadioGroup,
  Button,
  Card,
  CardContent,
  CardHeader,
  Heading,
  Paragraph,
  Label as ZLabel,
  SmallText,
  Code,
  Form,
  FormField,
  FormActions,
} from "zaalim-ui";
import { useState } from "react";

export default function RadioDocs() {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");
  const currentTheme = activeTheme === "light" ? defaultTheme : darkTheme;

  // State for interactive examples
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [selectedSize, setSelectedSize] = useState("medium");
  const [selectedPriority, setSelectedPriority] = useState("medium");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [selectedShipping, setSelectedShipping] = useState("standard");

  // Form example state
  const [formData, setFormData] = useState({
    notification: "email",
    theme: "light",
    language: "en",
  });

  return (
    <ThemeProvider value={currentTheme}>
      <DocsLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <Heading level={1}>Radio</Heading>
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
              Zaalim UI Radio components are theme-aware selection controls that
              allow users to select a single option from a set. Unlike
              checkboxes which allow multiple selections, radio buttons are
              mutually exclusive.
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
                  {`import { Radio, RadioGroup } from 'zaalim-ui'`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Basic Examples */}
          <Card variant="elevated">
            <CardHeader>
              <Heading level={3}>Basic Examples</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <ZLabel>Simple Radio</ZLabel>
                  <Radio label="Option 1" value="option1" />
                  <Radio label="Option 2" value="option2" />
                  <Radio label="Option 3" value="option3" />

                  <ZLabel>With Helper Text</ZLabel>
                  <Radio
                    label="Standard shipping"
                    value="standard"
                    helperText="5-7 business days"
                  />
                  <Radio
                    label="Express shipping"
                    value="express"
                    helperText="2-3 business days"
                  />

                  <ZLabel>Required Selection</ZLabel>
                  <Radio
                    label="I accept the terms and conditions"
                    value="terms"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <ZLabel>Checked by Default</ZLabel>
                  <Radio
                    label="Enable notifications"
                    value="notifications"
                    checked
                  />
                  <Radio
                    label="Disable notifications"
                    value="no-notifications"
                  />

                  <ZLabel>Different Sizes</ZLabel>
                  <div className="flex flex-col gap-3">
                    <Radio size="sm" label="Small radio" value="small" />
                    <Radio
                      size="md"
                      label="Medium radio (default)"
                      value="medium"
                      checked
                    />
                    <Radio size="lg" label="Large radio" value="large" />
                  </div>

                  <ZLabel>With Custom ID</ZLabel>
                  <Radio
                    id="custom-radio"
                    label="Remember me"
                    value="remember"
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
                <Code className="block whitespace-pre">
                  {`// Simple radio
<Radio label="Option 1" value="option1" />

// With helper text
<Radio 
  label="Standard shipping" 
  value="standard"
  helperText="5-7 business days"
/>

// Different sizes
<Radio size="sm" label="Small" value="small" />
<Radio size="md" label="Medium" value="medium" />
<Radio size="lg" label="Large" value="large" />

// Required field
<Radio 
  label="Agree to terms" 
  value="terms"
  required
/>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* RadioGroup Examples */}
          <Card>
            <CardHeader>
              <Heading level={3}>RadioGroup</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Paragraph>
                Use <Code>RadioGroup</Code> to manage related radio buttons with
                shared state, validation, and consistent layout.
              </Paragraph>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <ZLabel>Vertical Group (Default)</ZLabel>
                  <RadioGroup
                    label="Select a plan"
                    value={selectedPlan}
                    onChange={setSelectedPlan}
                  >
                    <Radio label="Basic" value="basic" />
                    <Radio label="Pro" value="pro" />
                    <Radio label="Enterprise" value="enterprise" />
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <ZLabel>Horizontal Group</ZLabel>
                  <RadioGroup
                    label="Priority Level"
                    value={selectedPriority}
                    onChange={setSelectedPriority}
                    orientation="horizontal"
                  >
                    <Radio label="Low" value="low" />
                    <Radio label="Medium" value="medium" />
                    <Radio label="High" value="high" />
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-4">
                <ZLabel>Group with Error State</ZLabel>
                <RadioGroup
                  label="Shipping Method"
                  error="Please select a shipping method"
                >
                  <Radio label="Standard (Free)" value="standard" />
                  <Radio label="Express ($9.99)" value="express" />
                  <Radio label="Overnight ($19.99)" value="overnight" />
                </RadioGroup>

                <ZLabel>Disabled Group</ZLabel>
                <RadioGroup label="Color Options" disabled value="red">
                  <Radio label="Red" value="red" />
                  <Radio label="Blue" value="blue" />
                  <Radio label="Green" value="green" />
                </RadioGroup>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.surfaceHover,
                  border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                }}
              >
                <Code className="block whitespace-pre">
                  {`// Controlled RadioGroup
const [selected, setSelected] = useState('basic')

<RadioGroup 
  label="Select a plan"
  value={selected}
  onChange={setSelected}
>
  <Radio label="Basic" value="basic" />
  <Radio label="Pro" value="pro" />
  <Radio label="Enterprise" value="enterprise" />
</RadioGroup>

// Horizontal RadioGroup
<RadioGroup 
  label="Priority Level"
  orientation="horizontal"
>
  <Radio label="Low" value="low" />
  <Radio label="Medium" value="medium" />
  <Radio label="High" value="high" />
</RadioGroup>

// Group with error state
<RadioGroup 
  label="Required selection"
  error="This field is required"
>
  <Radio label="Option 1" value="option1" />
  <Radio label="Option 2" value="option2" />
</RadioGroup>

// Disabled group
<RadioGroup label="Colors" disabled>
  <Radio label="Red" value="red" />
  <Radio label="Blue" value="blue" />
  <Radio label="Green" value="green" />
</RadioGroup>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* States */}
          <Card variant="elevated">
            <CardHeader>
              <Heading level={3}>States</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <ZLabel>Disabled</ZLabel>
                  <Radio label="Disabled radio" value="disabled" disabled />
                  <Radio
                    label="Disabled checked"
                    value="disabled-checked"
                    checked
                    disabled
                  />
                </div>

                <div className="space-y-4">
                  <ZLabel>Error State</ZLabel>
                  <Radio
                    label="Invalid selection"
                    value="error"
                    error="This option is not available"
                  />
                  <RadioGroup
                    label="Payment Method"
                    error="Please select a payment method"
                  >
                    <Radio label="Credit Card" value="card" />
                    <Radio label="PayPal" value="paypal" />
                    <Radio label="Bank Transfer" value="bank" />
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <ZLabel>Success State</ZLabel>
                  <Radio label="Verified option" value="success" success />
                  <Radio
                    label="Completed selection"
                    value="completed"
                    success
                    checked
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
                <Code className="block whitespace-pre">
                  {`// Disabled state
<Radio label="Disabled" value="disabled" disabled />
<Radio label="Disabled checked" value="checked" checked disabled />

// Error state
<Radio 
  label="Invalid option"
  value="invalid"
  error="This option is not available"
/>

// Error state in group
<RadioGroup 
  label="Required field"
  error="Please select an option"
>
  <Radio label="Option 1" value="option1" />
  <Radio label="Option 2" value="option2" />
</RadioGroup>

// Success state
<Radio 
  label="Completed"
  value="completed"
  success
  checked
/>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Real-world Example */}
          <Card>
            <CardHeader>
              <Heading level={3}>Real-world Example</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 max-w-md">
                <Heading level={4}>Product Configuration</Heading>

                <RadioGroup
                  label="Product Size"
                  value={selectedSize}
                  onChange={setSelectedSize}
                >
                  <Radio
                    label="Small"
                    value="small"
                    helperText="Perfect for individuals"
                  />
                  <Radio
                    label="Medium"
                    value="medium"
                    helperText="Great for small teams"
                  />
                  <Radio
                    label="Large"
                    value="large"
                    helperText="Ideal for large organizations"
                  />
                </RadioGroup>

                <RadioGroup
                  label="Color"
                  value={selectedColor}
                  onChange={setSelectedColor}
                  orientation="horizontal"
                >
                  <Radio label="Blue" value="blue" />
                  <Radio label="Red" value="red" />
                  <Radio label="Green" value="green" />
                  <Radio label="Black" value="black" />
                </RadioGroup>

                <RadioGroup
                  label="Shipping Method"
                  value={selectedShipping}
                  onChange={setSelectedShipping}
                >
                  <Radio
                    label="Standard Shipping"
                    value="standard"
                    helperText="Free • 5-7 business days"
                  />
                  <Radio
                    label="Express Shipping"
                    value="express"
                    helperText="$9.99 • 2-3 business days"
                  />
                  <Radio
                    label="Overnight Shipping"
                    value="overnight"
                    helperText="$19.99 • Next business day"
                  />
                </RadioGroup>

                <div
                  className="pt-4 border-t"
                  style={{ borderColor: currentTheme.colors.surfaceBorder }}
                >
                  <div className="flex justify-between items-center">
                    <span style={{ color: currentTheme.colors.text.primary }}>
                      Total: <span className="font-semibold">$99.99</span>
                    </span>
                    <Button variant="primary">Add to Cart</Button>
                  </div>
                </div>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.brand[50],
                  border: `1px solid ${currentTheme.colors.brand[200]}`,
                }}
              >
                <Code className="block whitespace-pre">
                  {`// Product configuration form
<div className="space-y-4">
  <RadioGroup 
    label="Product Size"
    value={size}
    onChange={setSize}
  >
    <Radio 
      label="Small" 
      value="small"
      helperText="Perfect for individuals"
    />
    <Radio 
      label="Medium" 
      value="medium"
      helperText="Great for small teams"
    />
    <Radio 
      label="Large" 
      value="large"
      helperText="Ideal for large organizations"
    />
  </RadioGroup>

  <RadioGroup 
    label="Color"
    value={color}
    onChange={setColor}
    orientation="horizontal"
  >
    <Radio label="Blue" value="blue" />
    <Radio label="Red" value="red" />
    <Radio label="Green" value="green" />
    <Radio label="Black" value="black" />
  </RadioGroup>

  <Button variant="primary">
    Add to Cart
  </Button>
</div>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Form Integration */}
          <Card variant="elevated">
            <CardHeader>
              <Heading level={3}>Form Integration</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form
                initialValues={formData}
                onSubmit={(values) => {
                  console.log("Form submitted:", values);
                  alert("Settings saved!");
                }}
                spacing="md"
              >
                <Heading level={4}>Account Settings</Heading>

                <FormField
                  name="notification"
                  label="Notification Preference"
                  required
                  helperText="How would you like to receive notifications?"
                >
                  <RadioGroup>
                    <Radio label="Email" value="email" />
                    <Radio label="Push Notification" value="push" />
                    <Radio label="SMS" value="sms" />
                    <Radio label="None" value="none" />
                  </RadioGroup>
                </FormField>

                <FormField name="theme" label="Theme Preference">
                  <RadioGroup orientation="horizontal">
                    <Radio label="Light" value="light" />
                    <Radio label="Dark" value="dark" />
                    <Radio label="Auto" value="auto" />
                  </RadioGroup>
                </FormField>

                <FormField name="language" label="Language">
                  <RadioGroup>
                    <Radio label="English" value="en" />
                    <Radio label="Spanish" value="es" />
                    <Radio label="French" value="fr" />
                    <Radio label="German" value="de" />
                  </RadioGroup>
                </FormField>

                <FormActions>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Save Settings
                  </Button>
                </FormActions>
              </Form>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.brand[50],
                  border: `1px solid ${currentTheme.colors.brand[200]}`,
                }}
              >
                <Code className="block whitespace-pre">
                  {`// Form with Radio components
<Form 
  initialValues={{ notification: 'email', theme: 'light' }}
  onSubmit={(values) => console.log(values)}
>
  <FormField 
    name="notification"
    label="Notification Preference"
    required
  >
    <RadioGroup>
      <Radio label="Email" value="email" />
      <Radio label="Push" value="push" />
      <Radio label="SMS" value="sms" />
    </RadioGroup>
  </FormField>

  <FormField 
    name="theme"
    label="Theme"
  >
    <RadioGroup orientation="horizontal">
      <Radio label="Light" value="light" />
      <Radio label="Dark" value="dark" />
      <Radio label="Auto" value="auto" />
    </RadioGroup>
  </FormField>

  <FormActions>
    <Button type="submit" variant="primary">
      Save
    </Button>
  </FormActions>
</Form>`}
                </Code>
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
                    <tr>
                      <td
                        className="px-4 py-3 text-sm font-medium"
                        style={{ color: currentTheme.colors.text.primary }}
                        rowSpan={6}
                      >
                        Radio
                      </td>
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
                        Radio button label text
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
                        value
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
                        Value returned when radio is selected
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
                        Radio button size
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
                        Help text shown below radio
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
                        className="px-4 py-3 text-sm font-medium"
                        style={{ color: currentTheme.colors.text.primary }}
                        rowSpan={5}
                      >
                        RadioGroup
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        value
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
                        Current selected value (controlled)
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
                        onChange
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        {"(value: string) => void"}
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
                        Callback when selection changes
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
                        Group label text
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
                        orientation
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        'vertical' | 'horizontal'
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        'vertical'
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Layout direction of radio buttons
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
                        Group-level error message
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
                      Always use <Code>RadioGroup</Code> for related options to
                      ensure single selection
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Use <Code>helperText</Code> to explain the implications of
                      each option
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      For 2-3 options, consider{" "}
                      <Code>orientation="horizontal"</Code> for compact layouts
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Always provide a default selection for required fields
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Use <Code>error</Code> prop at the group level for form
                      validation
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      For more than 5 options, consider using a{" "}
                      <Code>Select</Code> component instead
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
