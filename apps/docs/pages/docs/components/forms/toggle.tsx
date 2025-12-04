// apps/docs/pages/docs/components/toggle.tsx
import { DocsLayout } from "../../../../components/layout/DocsLayout";
import {
  ThemeProvider,
  defaultTheme,
  darkTheme,
  Toggle,
  ToggleGroup,
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

export default function ToggleDocs() {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");
  const currentTheme = activeTheme === "light" ? defaultTheme : darkTheme;

  // State for interactive examples
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
  const [airplaneMode, setAirplaneMode] = useState(false);

  // Settings panel state
  const [settings, setSettings] = useState({
    emailAlerts: true,
    pushNotifications: false,
    smsAlerts: true,
    newsletter: false,
    productUpdates: true,
    securityAlerts: false,
  });

  const handleSettingChange = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ThemeProvider value={currentTheme}>
      <DocsLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <Heading level={1}>Toggle</Heading>
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
              Zaalim UI Toggle components (also known as switches) are
              theme-aware controls that allow users to toggle between two
              states: on and off. Perfect for settings, preferences, and feature
              toggles.
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
                  {`import { Toggle, ToggleGroup } from 'zaalim-ui'`}
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
                  <ZLabel>Simple Toggle</ZLabel>
                  <Toggle
                    label="Enable notifications"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />

                  <ZLabel>With Helper Text</ZLabel>
                  <Toggle
                    label="Dark mode"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    helperText="Switch to dark theme"
                  />

                  <ZLabel>Required Toggle</ZLabel>
                  <Toggle label="I agree to terms" value="terms" required />
                </div>

                <div className="space-y-4">
                  <ZLabel>Different Sizes</ZLabel>
                  <div className="flex flex-col gap-3">
                    <Toggle
                      size="sm"
                      label="Small toggle"
                      checked={wifi}
                      onChange={(e) => setWifi(e.target.checked)}
                    />
                    <Toggle
                      size="md"
                      label="Medium toggle (default)"
                      checked={bluetooth}
                      onChange={(e) => setBluetooth(e.target.checked)}
                    />
                    <Toggle
                      size="lg"
                      label="Large toggle"
                      checked={airplaneMode}
                      onChange={(e) => setAirplaneMode(e.target.checked)}
                    />
                  </div>

                  <ZLabel>Different Variants</ZLabel>
                  <Toggle
                    variant="default"
                    label="Default variant"
                    checked={autoSave}
                    onChange={(e) => setAutoSave(e.target.checked)}
                  />
                  <Toggle variant="outline" label="Outline variant" />
                  <Toggle variant="ghost" label="Ghost variant" />
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
                  {`// Simple toggle
<Toggle label="Enable notifications" />

// With helper text
<Toggle 
  label="Dark mode" 
  helperText="Switch to dark theme"
/>

// Different sizes
<Toggle size="sm" label="Small toggle" />
<Toggle size="md" label="Medium toggle" />
<Toggle size="lg" label="Large toggle" />

// Different variants
<Toggle variant="default" label="Default" />
<Toggle variant="outline" label="Outline" />
<Toggle variant="ghost" label="Ghost" />

// Controlled component
const [enabled, setEnabled] = useState(false)
<Toggle 
  label="Enable feature"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* With Icons */}
          <Card>
            <CardHeader>
              <Heading level={3}>With Icons</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Paragraph>
                Toggles can include icons inside the thumb to provide additional
                visual feedback.
              </Paragraph>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <ZLabel>Toggle with Icons</ZLabel>
                  <Toggle
                    withIcon
                    label="Wi-Fi"
                    checked={wifi}
                    onChange={(e) => setWifi(e.target.checked)}
                  />
                  <Toggle
                    withIcon
                    label="Bluetooth"
                    checked={bluetooth}
                    onChange={(e) => setBluetooth(e.target.checked)}
                  />
                  <Toggle
                    withIcon
                    label="Airplane Mode"
                    checked={airplaneMode}
                    onChange={(e) => setAirplaneMode(e.target.checked)}
                  />
                </div>

                <div className="space-y-4">
                  <ZLabel>Different States with Icons</ZLabel>
                  <Toggle withIcon label="Auto-sync" checked={true} disabled />
                  <Toggle
                    withIcon
                    label="Error state"
                    error="Cannot enable this setting"
                  />
                  <Toggle
                    withIcon
                    label="Success state"
                    success
                    checked={true}
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
                  {`// Toggle with icons
<Toggle 
  withIcon
  label="Wi-Fi"
  checked={wifi}
  onChange={(e) => setWifi(e.target.checked)}
/>

<Toggle 
  withIcon
  label="Bluetooth"
  checked={bluetooth}
  onChange={(e) => setBluetooth(e.target.checked)}
/>

// Disabled with icons
<Toggle 
  withIcon
  label="Auto-sync"
  checked={true}
  disabled
/>

// Error state with icons
<Toggle 
  withIcon
  label="Error state"
  error="Cannot enable this setting"
/>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* ToggleGroup Examples */}
          <Card variant="elevated">
            <CardHeader>
              <Heading level={3}>ToggleGroup</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Paragraph>
                Use <Code>ToggleGroup</Code> to manage related toggles with
                shared state and consistent styling.
              </Paragraph>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <ZLabel>Vertical Group (Default)</ZLabel>
                  <ToggleGroup label="Notification Settings">
                    <Toggle
                      label="Email notifications"
                      checked={settings.emailAlerts}
                      onChange={() => handleSettingChange("emailAlerts")}
                    />
                    <Toggle
                      label="Push notifications"
                      checked={settings.pushNotifications}
                      onChange={() => handleSettingChange("pushNotifications")}
                    />
                    <Toggle
                      label="SMS alerts"
                      checked={settings.smsAlerts}
                      onChange={() => handleSettingChange("smsAlerts")}
                    />
                  </ToggleGroup>
                </div>

                <div className="space-y-4">
                  <ZLabel>Horizontal Group</ZLabel>
                  <ToggleGroup label="Quick Settings" orientation="horizontal">
                    <Toggle
                      label="Wi-Fi"
                      checked={wifi}
                      onChange={(e) => setWifi(e.target.checked)}
                    />
                    <Toggle
                      label="Bluetooth"
                      checked={bluetooth}
                      onChange={(e) => setBluetooth(e.target.checked)}
                    />
                    <Toggle label="Location" />
                  </ToggleGroup>
                </div>
              </div>

              <div className="space-y-4">
                <ZLabel>Group with Error State</ZLabel>
                <ToggleGroup
                  label="Privacy Settings"
                  error="Some settings cannot be enabled"
                >
                  <Toggle label="Share analytics" />
                  <Toggle label="Personalized ads" error="Requires analytics" />
                  <Toggle label="Third-party cookies" />
                </ToggleGroup>

                <ZLabel>Disabled Group</ZLabel>
                <ToggleGroup label="Advanced Settings" disabled>
                  <Toggle label="Developer mode" checked={true} />
                  <Toggle label="Experimental features" />
                  <Toggle label="Debug logging" />
                </ToggleGroup>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.brand[50],
                  border: `1px solid ${currentTheme.colors.brand[200]}`,
                }}
              >
                <Code className="block whitespace-pre">
                  {`// ToggleGroup example
<ToggleGroup label="Notification Settings">
  <Toggle label="Email notifications" checked={email} />
  <Toggle label="Push notifications" checked={push} />
  <Toggle label="SMS alerts" checked={sms} />
</ToggleGroup>

// Horizontal ToggleGroup
<ToggleGroup 
  label="Quick Settings"
  orientation="horizontal"
>
  <Toggle label="Wi-Fi" checked={wifi} />
  <Toggle label="Bluetooth" checked={bluetooth} />
  <Toggle label="Location" checked={location} />
</ToggleGroup>

// Group with error state
<ToggleGroup 
  label="Privacy Settings"
  error="Some settings cannot be enabled"
>
  <Toggle label="Share analytics" />
  <Toggle label="Personalized ads" error="Requires analytics" />
</ToggleGroup>

// Disabled group
<ToggleGroup label="Advanced Settings" disabled>
  <Toggle label="Developer mode" checked={true} />
  <Toggle label="Experimental features" />
</ToggleGroup>`}
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
                  <Toggle label="Disabled toggle" disabled />
                  <Toggle label="Disabled checked" checked disabled />
                </div>

                <div className="space-y-4">
                  <ZLabel>Error State</ZLabel>
                  <Toggle
                    label="Invalid setting"
                    error="This setting is not available"
                  />
                  <Toggle
                    label="Error checked"
                    error="Cannot disable this"
                    checked
                  />
                </div>

                <div className="space-y-4">
                  <ZLabel>Success State</ZLabel>
                  <Toggle label="Feature enabled" success />
                  <Toggle label="Verified setting" success checked />
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
<Toggle label="Disabled" disabled />
<Toggle label="Disabled checked" checked disabled />

// Error state
<Toggle 
  label="Invalid setting"
  error="This setting is not available"
/>

<Toggle 
  label="Error checked"
  error="Cannot disable this"
  checked
/>

// Success state
<Toggle 
  label="Feature enabled"
  success
/>

<Toggle 
  label="Verified setting"
  success
  checked
/>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Settings Panel Example */}
          <Card variant="elevated">
            <CardHeader>
              <Heading level={3}>Settings Panel Example</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 max-w-md">
                <Heading level={4}>Account Preferences</Heading>

                <ToggleGroup label="Communication Preferences">
                  <Toggle
                    label="Email alerts"
                    checked={settings.emailAlerts}
                    onChange={() => handleSettingChange("emailAlerts")}
                    helperText="Receive important updates via email"
                  />
                  <Toggle
                    label="Push notifications"
                    checked={settings.pushNotifications}
                    onChange={() => handleSettingChange("pushNotifications")}
                    helperText="Get notified in your browser"
                  />
                  <Toggle
                    label="SMS alerts"
                    checked={settings.smsAlerts}
                    onChange={() => handleSettingChange("smsAlerts")}
                    helperText="Text messages for urgent matters"
                  />
                </ToggleGroup>

                <ToggleGroup label="Content & Updates">
                  <Toggle
                    label="Monthly newsletter"
                    checked={settings.newsletter}
                    onChange={() => handleSettingChange("newsletter")}
                    helperText="Curated content and tips"
                  />
                  <Toggle
                    label="Product updates"
                    checked={settings.productUpdates}
                    onChange={() => handleSettingChange("productUpdates")}
                    helperText="New features and improvements"
                  />
                  <Toggle
                    label="Security alerts"
                    checked={settings.securityAlerts}
                    onChange={() => handleSettingChange("securityAlerts")}
                    helperText="Important security notifications"
                  />
                </ToggleGroup>

                <div
                  className="pt-4 border-t"
                  style={{ borderColor: currentTheme.colors.surfaceBorder }}
                >
                  <Toggle
                    withIcon
                    label="Two-factor authentication"
                    checked={twoFactor}
                    onChange={(e) => setTwoFactor(e.target.checked)}
                    helperText="Add an extra layer of security to your account"
                  />
                </div>

                <FormActions>
                  <Button type="button" variant="outline">
                    Reset to Defaults
                  </Button>
                  <Button type="button" variant="primary">
                    Save Preferences
                  </Button>
                </FormActions>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.brand[50],
                  border: `1px solid ${currentTheme.colors.brand[200]}`,
                }}
              >
                <Code className="block whitespace-pre">
                  {`// Settings panel with toggles
<div className="space-y-4">
  <ToggleGroup label="Communication Preferences">
    <Toggle 
      label="Email alerts"
      checked={emailAlerts}
      onChange={() => setEmailAlerts(!emailAlerts)}
      helperText="Receive important updates via email"
    />
    <Toggle 
      label="Push notifications"
      checked={pushNotifications}
      onChange={() => setPushNotifications(!pushNotifications)}
      helperText="Get notified in your browser"
    />
  </ToggleGroup>

  <ToggleGroup label="Content & Updates">
    <Toggle 
      label="Monthly newsletter"
      checked={newsletter}
      onChange={() => setNewsletter(!newsletter)}
      helperText="Curated content and tips"
    />
    <Toggle 
      label="Product updates"
      checked={productUpdates}
      onChange={() => setProductUpdates(!productUpdates)}
      helperText="New features and improvements"
    />
  </ToggleGroup>

  <Toggle 
    withIcon
    label="Two-factor authentication"
    checked={twoFactor}
    onChange={(e) => setTwoFactor(e.target.checked)}
    helperText="Add extra security to your account"
  />

  <Button variant="primary">
    Save Preferences
  </Button>
</div>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Form Integration */}
          <Card>
            <CardHeader>
              <Heading level={3}>Form Integration</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form
                initialValues={{
                  notifications: true,
                  analytics: false,
                  marketing: true,
                }}
                onSubmit={(values) => {
                  console.log("Form submitted:", values);
                  alert("Preferences saved!");
                }}
                spacing="md"
              >
                <Heading level={4}>Privacy Preferences</Heading>

                <FormField
                  name="notifications"
                  label="Enable Notifications"
                  helperText="Receive updates about your account"
                >
                  <Toggle />
                </FormField>

                <FormField
                  name="analytics"
                  label="Share Analytics"
                  helperText="Help us improve by sharing anonymous usage data"
                >
                  <Toggle />
                </FormField>

                <FormField
                  name="marketing"
                  label="Marketing Emails"
                  helperText="Receive promotional content and offers"
                >
                  <Toggle />
                </FormField>

                <FormField
                  name="cookies"
                  label="Third-party Cookies"
                  helperText="Allow cookies from trusted partners"
                >
                  <Toggle variant="outline" />
                </FormField>

                <FormActions>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Save Preferences
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
                  {`// Form with Toggle components
<Form 
  initialValues={{ notifications: true, analytics: false }}
  onSubmit={(values) => console.log(values)}
>
  <FormField 
    name="notifications"
    label="Enable Notifications"
    helperText="Receive updates about your account"
  >
    <Toggle />
  </FormField>

  <FormField 
    name="analytics"
    label="Share Analytics"
    helperText="Help us improve by sharing anonymous data"
  >
    <Toggle />
  </FormField>

  <FormField 
    name="cookies"
    label="Third-party Cookies"
  >
    <Toggle variant="outline" />
  </FormField>

  <Button type="submit" variant="primary">
    Save Preferences
  </Button>
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
                        rowSpan={8}
                      >
                        Toggle
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
                        Toggle label text
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
                        Toggle size
                      </td>
                    </tr>
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
                        'default' | 'outline' | 'ghost'
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
                        withIcon
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
                        Shows check/X icons inside toggle
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
                        Help text shown below toggle
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
                        Disables the toggle
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="px-4 py-3 text-sm font-medium"
                        style={{ color: currentTheme.colors.text.primary }}
                        rowSpan={4}
                      >
                        ToggleGroup
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
                        Layout direction of toggles
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
                    <tr
                      style={{
                        backgroundColor: currentTheme.colors.backgroundSubtle,
                      }}
                    >
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
                        Disables all toggles in the group
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
                      Use <Code>withIcon</Code> for important toggles where
                      state needs to be immediately clear
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Group related settings with <Code>ToggleGroup</Code> for
                      better UX
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Use <Code>helperText</Code> to explain the implications of
                      enabling/disabling
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Consider <Code>variant="ghost"</Code> for inline toggles
                      in dense interfaces
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Use larger sizes (<Code>lg</Code>) for touch interfaces or
                      important toggles
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Always provide immediate feedback when toggles change
                      state
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
