// apps/docs/pages/docs/components/checkbox.tsx
import { DocsLayout } from "../../../../components/layout/DocsLayout";
import {
  ThemeProvider,
  defaultTheme,
  darkTheme,
  Checkbox,
  CheckboxGroup,
  Button,
  Card,
  CardContent,
  CardHeader,
  Heading,
  Paragraph,
  Label as ZLabel,
  SmallText,
  Code,
} from "zaalim-ui";
import { useState } from "react";

export default function CheckboxDocs() {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");
  const currentTheme = activeTheme === "light" ? defaultTheme : darkTheme;

  // State for interactive examples
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  // Checkbox group state
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const allNotificationsSelected = Object.values(notifications).every(Boolean);
  const someNotificationsSelected =
    Object.values(notifications).some(Boolean) && !allNotificationsSelected;

  return (
    <ThemeProvider value={currentTheme}>
      <DocsLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <Heading level={1}>Checkbox</Heading>
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
              Zaalim UI Checkbox components are fully theme-aware selection
              controls that allow users to select one or multiple options from a
              set. Supports standard, indeterminate, and grouped states.
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
                  {`import { Checkbox, CheckboxGroup } from 'zaalim-ui'`}
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
                  <ZLabel>Simple Checkbox</ZLabel>
                  <Checkbox
                    label="Accept terms and conditions"
                    checked={checked1}
                    onChange={(e) => setChecked1(e.target.checked)}
                  />

                  <ZLabel>With Helper Text</ZLabel>
                  <Checkbox
                    label="Subscribe to newsletter"
                    helperText="Receive weekly updates and promotions"
                    checked={checked2}
                    onChange={(e) => setChecked2(e.target.checked)}
                  />

                  <ZLabel>Required Field</ZLabel>
                  <Checkbox
                    label="I agree to the privacy policy"
                    required
                    checked={checked3}
                    onChange={(e) => setChecked3(e.target.checked)}
                  />
                </div>

                <div className="space-y-4">
                  <ZLabel>Checked by Default</ZLabel>
                  <Checkbox
                    label="Enable notifications"
                    checked={true}
                    disabled
                  />

                  <ZLabel>With Custom ID</ZLabel>
                  <Checkbox
                    id="custom-checkbox"
                    label="Remember me"
                    checked={checked4}
                    onChange={(e) => setChecked4(e.target.checked)}
                  />

                  <ZLabel>Different Sizes</ZLabel>
                  <div className="flex flex-col gap-3">
                    <Checkbox
                      size="sm"
                      label="Small checkbox"
                      checked={checked5}
                      onChange={(e) => setChecked5(e.target.checked)}
                    />
                    <Checkbox
                      size="md"
                      label="Medium checkbox (default)"
                      checked={checked6}
                      onChange={(e) => setChecked6(e.target.checked)}
                    />
                    <Checkbox size="lg" label="Large checkbox" />
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
                  {`// Simple checkbox
<Checkbox label="Accept terms and conditions" />

// With helper text
<Checkbox 
  label="Subscribe to newsletter" 
  helperText="Receive weekly updates"
/>

// Required field
<Checkbox 
  label="I agree to the privacy policy" 
  required
/>

// Controlled component
const [checked, setChecked] = useState(false)
<Checkbox 
  label="Enable feature"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>

// Different sizes
<Checkbox size="sm" label="Small" />
<Checkbox size="md" label="Medium" />
<Checkbox size="lg" label="Large" />`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* States */}
          <Card>
            <CardHeader>
              <Heading level={3}>States</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <ZLabel>Disabled</ZLabel>
                  <Checkbox label="Disabled checkbox" disabled />
                  <Checkbox label="Disabled checked" checked disabled />
                </div>

                <div className="space-y-4">
                  <ZLabel>Error State</ZLabel>
                  <Checkbox
                    label="Required agreement"
                    error="You must agree to continue"
                  />
                  <Checkbox
                    label="Error checked"
                    error="Invalid selection"
                    checked
                  />
                </div>

                <div className="space-y-4">
                  <ZLabel>Success State</ZLabel>
                  <Checkbox label="Completed task" success />
                  <Checkbox label="Verified option" success checked />
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
<Checkbox label="Disabled" disabled />
<Checkbox label="Disabled checked" checked disabled />

// Error state
<Checkbox 
  label="Required field"
  error="This field is required"
/>

// Success state
<Checkbox 
  label="Completed"
  success
  checked
/>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Indeterminate State */}
          <Card variant="elevated">
            <CardHeader>
              <Heading level={3}>Indeterminate State</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Paragraph>
                The indeterminate state is useful for "Select All" scenarios
                where some, but not all, child checkboxes are selected.
              </Paragraph>

              <div className="space-y-4 max-w-md">
                <Checkbox
                  label="Select all notifications"
                  indeterminate={someNotificationsSelected}
                  checked={allNotificationsSelected}
                  onChange={(e) => {
                    const newState = e.target.checked;
                    setNotifications({
                      email: newState,
                      push: newState,
                      sms: newState,
                    });
                  }}
                />

                <div className="ml-7 space-y-3">
                  <Checkbox
                    label="Email notifications"
                    checked={notifications.email}
                    onChange={() => handleNotificationChange("email")}
                  />
                  <Checkbox
                    label="Push notifications"
                    checked={notifications.push}
                    onChange={() => handleNotificationChange("push")}
                  />
                  <Checkbox
                    label="SMS notifications"
                    checked={notifications.sms}
                    onChange={() => handleNotificationChange("sms")}
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
                  {`// Indeterminate checkbox
<Checkbox 
  label="Select all"
  indeterminate={someSelected}
  checked={allSelected}
  onChange={(e) => handleSelectAll(e.target.checked)}
/>

// Implementation example
const [items, setItems] = useState([
  { id: 1, label: "Item 1", checked: false },
  { id: 2, label: "Item 2", checked: true },
  { id: 3, label: "Item 3", checked: false },
]);

const allChecked = items.every(item => item.checked);
const someChecked = items.some(item => item.checked) && !allChecked;

<Checkbox
  label="Select all"
  indeterminate={someChecked}
  checked={allChecked}
  onChange={(e) => {
    const newState = e.target.checked;
    setItems(items.map(item => ({ ...item, checked: newState })));
  }}
/>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Checkbox Group */}
          <Card>
            <CardHeader>
              <Heading level={3}>Checkbox Group</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Paragraph>
                Use <Code>CheckboxGroup</Code> to manage related checkboxes with
                shared state and consistent styling.
              </Paragraph>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <ZLabel>Vertical Group (Default)</ZLabel>
                  <CheckboxGroup label="Select your interests">
                    <Checkbox label="Technology" />
                    <Checkbox label="Design" />
                    <Checkbox label="Business" />
                    <Checkbox label="Health & Wellness" />
                  </CheckboxGroup>
                </div>

                <div className="space-y-4">
                  <ZLabel>Horizontal Group</ZLabel>
                  <CheckboxGroup
                    label="Notification Preferences"
                    orientation="horizontal"
                  >
                    <Checkbox label="Email" />
                    <Checkbox label="Push" />
                    <Checkbox label="SMS" />
                  </CheckboxGroup>

                  <ZLabel>Group with Error State</ZLabel>
                  <CheckboxGroup
                    label="Required selections"
                    error="Select at least one option"
                  >
                    <Checkbox label="Option 1" />
                    <Checkbox label="Option 2" />
                    <Checkbox label="Option 3" />
                  </CheckboxGroup>
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
                  {`// Vertical checkbox group
<CheckboxGroup label="Select your interests">
  <Checkbox label="Technology" />
  <Checkbox label="Design" />
  <Checkbox label="Business" />
</CheckboxGroup>

// Horizontal checkbox group
<CheckboxGroup 
  label="Notification Preferences" 
  orientation="horizontal"
>
  <Checkbox label="Email" />
  <Checkbox label="Push" />
  <Checkbox label="SMS" />
</CheckboxGroup>

// Group with error state
<CheckboxGroup 
  label="Required selections"
  error="Select at least one option"
>
  <Checkbox label="Option 1" />
  <Checkbox label="Option 2" />
</CheckboxGroup>

// Group with disabled state
<CheckboxGroup label="Permissions" disabled>
  <Checkbox label="Read" />
  <Checkbox label="Write" />
  <Checkbox label="Execute" />
</CheckboxGroup>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Form Example */}
          <Card variant="elevated">
            <CardHeader>
              <Heading level={3}>Complete Form Example</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 max-w-md">
                <Heading level={4}>Account Settings</Heading>

                <Checkbox
                  label="Enable two-factor authentication"
                  helperText="Add an extra layer of security to your account"
                  required
                />

                <CheckboxGroup label="Privacy Settings">
                  <Checkbox
                    label="Make profile public"
                    helperText="Anyone can view your profile"
                  />
                  <Checkbox
                    label="Show email address"
                    helperText="Your email will be visible to other users"
                  />
                  <Checkbox
                    label="Allow search engines to index profile"
                    helperText="Your profile may appear in search results"
                  />
                </CheckboxGroup>

                <CheckboxGroup
                  label="Communication Preferences"
                  orientation="horizontal"
                >
                  <Checkbox label="Newsletters" />
                  <Checkbox label="Product updates" />
                  <Checkbox label="Promotions" />
                </CheckboxGroup>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button variant="primary" className="flex-1">
                    Save Preferences
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
                <Code className="block whitespace-pre">
                  {`// Complete settings form
<form className="space-y-4">
  <Checkbox 
    label="Enable two-factor authentication"
    helperText="Add an extra layer of security"
    required
  />

  <CheckboxGroup label="Privacy Settings">
    <Checkbox 
      label="Make profile public"
      helperText="Anyone can view your profile"
    />
    <Checkbox 
      label="Show email address"
      helperText="Your email will be visible"
    />
  </CheckboxGroup>

  <CheckboxGroup 
    label="Communication Preferences" 
    orientation="horizontal"
  >
    <Checkbox label="Newsletters" />
    <Checkbox label="Product updates" />
    <Checkbox label="Promotions" />
  </CheckboxGroup>

  <Button variant="primary" className="w-full">
    Save Preferences
  </Button>
</form>`}
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
                        Checkbox label text
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
                        Checkbox size
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
                        Help text shown below checkbox
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
                        indeterminate
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
                        Shows indeterminate (dash) icon
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
                        Disables the checkbox
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
                        ...props
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        HTMLInputProps
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
                        All standard HTML input attributes
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
                      Use <Code>helperText</Code> to explain the purpose of
                      optional checkboxes
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Group related checkboxes with <Code>CheckboxGroup</Code>{" "}
                      for better UX
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Use <Code>indeterminate</Code> state for "Select All"
                      functionality
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Always provide clear, concise labels for accessibility
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Use <Code>error</Code> prop to provide actionable feedback
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Consider using larger sizes (<Code>lg</Code>) for touch
                      interfaces
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
