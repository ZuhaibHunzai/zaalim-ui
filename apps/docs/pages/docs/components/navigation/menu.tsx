// apps/docs/pages/docs/navigation/menu.tsx
import { DocsLayout } from "../../../../components/layout/DocsLayout";
import {
  ThemeProvider,
  defaultTheme,
  darkTheme,
  Menu,
  MenuItem,
  MenuGroup,
  MenuDivider,
  MenuHeader,
  MenuFooter,
  ContextMenu,
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
  Badge,
} from "zaalim-ui";
import { useState } from "react";

// Icons for menu examples (using emoji for simplicity)
const HomeIcon = () => <span>🏠</span>;
const UserIcon = () => <span>👤</span>;
const SettingsIcon = () => <span>⚙️</span>;
const FileIcon = () => <span>📄</span>;
const FolderIcon = () => <span>📁</span>;
const DownloadIcon = () => <span>⬇️</span>;
const EditIcon = () => <span>✏️</span>;
const DeleteIcon = () => <span>🗑️</span>;
const ChevronRight = () => <span>→</span>;

export default function MenuDocs() {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");
  const currentTheme = activeTheme === "light" ? defaultTheme : darkTheme;

  // Interactive examples state
  const [menuOrientation, setMenuOrientation] = useState<
    "horizontal" | "vertical"
  >("horizontal");
  const [activeItem, setActiveItem] = useState<string>("home");
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [showContextMenu, setShowContextMenu] = useState(false);

  // Handle context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const closeContextMenu = () => {
    setShowContextMenu(false);
  };

  return (
    <ThemeProvider value={currentTheme}>
      <DocsLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <Heading level={1}>Menu</Heading>
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
              The Menu component provides accessible, theme-aware navigation
              menus with support for horizontal/vertical orientations, submenus,
              icons, badges, and complex nesting patterns. Perfect for main
              navigation, sidebars, dropdowns, and context menus.
            </Paragraph>
            <Paragraph>
              Menu includes companion components like <Code>MenuItem</Code>,{" "}
              <Code>MenuGroup</Code>,<Code>MenuDivider</Code>,{" "}
              <Code>MenuHeader</Code>, and <Code>MenuFooter</Code> for building
              complete menu systems.
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
  Menu, 
  MenuItem, 
  MenuGroup, 
  MenuDivider, 
  MenuHeader, 
  MenuFooter,
  ContextMenu 
} from 'zaalim-ui'`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Basic Menu */}
          <Card variant="elevated">
            <CardHeader>
              <Heading level={3}>Basic Menu</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Flex justify="between" align="center">
                  <SmallText>Select orientation:</SmallText>
                  <Flex gap={2}>
                    <Button
                      size="sm"
                      variant={
                        menuOrientation === "horizontal" ? "primary" : "outline"
                      }
                      onClick={() => setMenuOrientation("horizontal")}
                    >
                      Horizontal
                    </Button>
                    <Button
                      size="sm"
                      variant={
                        menuOrientation === "vertical" ? "primary" : "outline"
                      }
                      onClick={() => setMenuOrientation("vertical")}
                    >
                      Vertical
                    </Button>
                  </Flex>
                </Flex>

                <Box
                  variant="surface"
                  className="p-6 rounded-lg"
                  style={{
                    backgroundColor: currentTheme.colors.surface,
                  }}
                >
                  <Menu
                    orientation={menuOrientation}
                    activeItem={activeItem}
                    onItemSelect={setActiveItem}
                  >
                    <MenuItem id="home" icon={<HomeIcon />}>
                      Home
                    </MenuItem>
                    <MenuItem id="profile" icon={<UserIcon />}>
                      Profile
                    </MenuItem>
                    <MenuItem id="settings" icon={<SettingsIcon />}>
                      Settings
                    </MenuItem>
                    <MenuItem id="docs" disabled>
                      Documentation
                    </MenuItem>
                  </Menu>
                </Box>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.brand[50],
                  border: `1px solid ${currentTheme.colors.brand[200]}`,
                }}
              >
                <Code className="block whitespace-pre">
                  {`// ${
                    menuOrientation === "horizontal" ? "Horizontal" : "Vertical"
                  } menu
<Menu 
  orientation="${menuOrientation}"
  activeItem="${activeItem}"
  onItemSelect={handleSelect}
>
  <MenuItem id="home" icon={<HomeIcon />}>
    Home
  </MenuItem>
  <MenuItem id="profile" icon={<UserIcon />}>
    Profile
  </MenuItem>
  <MenuItem id="settings" icon={<SettingsIcon />}>
    Settings
  </MenuItem>
  <MenuItem id="docs" disabled>
    Documentation
  </MenuItem>
</Menu>

// Uncontrolled usage (internal state)
<Menu orientation="${menuOrientation}">
  <MenuItem>Home</MenuItem>
  <MenuItem>About</MenuItem>
  <MenuItem>Contact</MenuItem>
</Menu>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Menu Items with Features */}
          <Card>
            <CardHeader>
              <Heading level={3}>Menu Item Features</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Paragraph>
                Menu items support icons, badges, submenus, and various states
                for building feature-rich navigation systems.
              </Paragraph>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <SmallText>Menu with Icons & Badges</SmallText>
                  <Box variant="surface" className="p-6 rounded-lg">
                    <Menu orientation="vertical">
                      <MenuItem
                        icon={<FileIcon />}
                        badge="New"
                        badgeProps={{ variant: "success", size: "sm" }}
                      >
                        Documents
                      </MenuItem>
                      <MenuItem
                        icon={<FolderIcon />}
                        badge="3"
                        badgeProps={{ variant: "brand", size: "sm" }}
                      >
                        Projects
                      </MenuItem>
                      <MenuItem
                        icon={<DownloadIcon />}
                        badge="Updated"
                        badgeProps={{
                          variant: "warning",
                          size: "sm",
                          styleVariant: "outline",
                        }}
                      >
                        Downloads
                      </MenuItem>
                      <MenuItem icon={<SettingsIcon />}>
                        Settings
                        <SmallText className="ml-auto opacity-60">
                          ⌘+,
                        </SmallText>
                      </MenuItem>
                    </Menu>
                  </Box>
                </div>

                <div className="space-y-4">
                  <SmallText>Submenus</SmallText>
                  <Box variant="surface" className="p-6 rounded-lg">
                    <Menu orientation="vertical">
                      <MenuItem
                        icon={<FileIcon />}
                        submenu={
                          <Menu orientation="vertical">
                            <MenuItem>New Document</MenuItem>
                            <MenuItem>Open File</MenuItem>
                            <MenuItem>Save As</MenuItem>
                            <MenuDivider />
                            <MenuItem>Export PDF</MenuItem>
                          </Menu>
                        }
                      >
                        File
                      </MenuItem>
                      <MenuItem
                        icon={<EditIcon />}
                        submenu={
                          <Menu orientation="vertical">
                            <MenuItem>Undo</MenuItem>
                            <MenuItem>Redo</MenuItem>
                            <MenuDivider />
                            <MenuItem>Cut</MenuItem>
                            <MenuItem>Copy</MenuItem>
                            <MenuItem>Paste</MenuItem>
                          </Menu>
                        }
                      >
                        Edit
                      </MenuItem>
                    </Menu>
                  </Box>
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
                  {`// Menu item with icon and badge
<MenuItem 
  icon={<FileIcon />}
  badge="New"
  badgeProps={{ variant: "success", size: "sm" }}
>
  Documents
</MenuItem>

// Menu item with keyboard shortcut
<MenuItem icon={<SettingsIcon />}>
  Settings
  <SmallText className="ml-auto opacity-60">⌘+,</SmallText>
</MenuItem>

// Menu item with submenu
<MenuItem 
  icon={<FileIcon />}
  submenu={
    <Menu orientation="vertical">
      <MenuItem>New Document</MenuItem>
      <MenuItem>Open File</MenuItem>
      <MenuItem>Save As</MenuItem>
      <MenuDivider />
      <MenuItem>Export PDF</MenuItem>
    </Menu>
  }
>
  File
</MenuItem>

// Disabled menu item
<MenuItem disabled icon={<DownloadIcon />}>
  Downloads (Disabled)
</MenuItem>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Complete Menu Structure */}
          <Card variant="elevated">
            <CardHeader>
              <Heading level={3}>Complete Menu Structure</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Paragraph>
                Build complex menu systems with headers, groups, dividers, and
                footers for organized, accessible navigation.
              </Paragraph>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Box
                    variant="surface"
                    rounded="lg"
                    className="overflow-hidden"
                    style={{
                      maxWidth: "280px",
                      border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                    }}
                  >
                    <Menu orientation="vertical">
                      <MenuHeader>Workspace</MenuHeader>

                      <MenuItem icon={<HomeIcon />} active>
                        Dashboard
                      </MenuItem>

                      <MenuGroup title="Projects">
                        <MenuItem badge="5">Web Development</MenuItem>
                        <MenuItem badge="2">Mobile App</MenuItem>
                        <MenuItem>Design System</MenuItem>
                      </MenuGroup>

                      <MenuDivider />

                      <MenuGroup title="Team">
                        <MenuItem icon={<UserIcon />}>Members</MenuItem>
                        <MenuItem>Roles & Permissions</MenuItem>
                        <MenuItem>Activity Log</MenuItem>
                      </MenuGroup>

                      <MenuDivider />

                      <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>

                      <MenuFooter>
                        <Flex justify="between" align="center">
                          <SmallText>v2.4.1</SmallText>
                          <Button size="sm" variant="outline">
                            Logout
                          </Button>
                        </Flex>
                      </MenuFooter>
                    </Menu>
                  </Box>
                </div>

                <div className="space-y-4">
                  <Heading level={4}>Components Used</Heading>
                  <ul className="space-y-2">
                    <li>
                      <Code>MenuHeader</Code> - Section header
                    </li>
                    <li>
                      <Code>MenuGroup</Code> - Group with title
                    </li>
                    <li>
                      <Code>MenuDivider</Code> - Visual separator
                    </li>
                    <li>
                      <Code>MenuFooter</Code> - Bottom section
                    </li>
                    <li>
                      <Code>MenuItem</Code> - Individual items
                    </li>
                  </ul>
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
                  {`// Complete sidebar menu
<Menu orientation="vertical">
  <MenuHeader>
    Workspace
  </MenuHeader>
  
  <MenuItem icon={<HomeIcon />} active>
    Dashboard
  </MenuItem>
  
  <MenuGroup title="Projects">
    <MenuItem badge="5">Web Development</MenuItem>
    <MenuItem badge="2">Mobile App</MenuItem>
    <MenuItem>Design System</MenuItem>
  </MenuGroup>
  
  <MenuDivider />
  
  <MenuGroup title="Team">
    <MenuItem icon={<UserIcon />}>Members</MenuItem>
    <MenuItem>Roles & Permissions</MenuItem>
    <MenuItem>Activity Log</MenuItem>
  </MenuGroup>
  
  <MenuDivider />
  
  <MenuItem icon={<SettingsIcon />}>
    Settings
  </MenuItem>
  
  <MenuFooter>
    <Flex justify="between">
      <SmallText>v2.4.1</SmallText>
      <Button size="sm" variant="outline">
        Logout
      </Button>
    </Flex>
  </MenuFooter>
</Menu>`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Context Menu */}
          <Card>
            <CardHeader>
              <Heading level={3}>Context Menu</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <Paragraph>
                Use <Code>ContextMenu</Code> for right-click context menus with
                proper positioning and dismissal behavior.
              </Paragraph>

              <div className="space-y-4">
                <Box
                  variant="surface"
                  className="p-8 rounded-lg text-center cursor-context-menu relative"
                  style={{
                    border: `2px dashed ${currentTheme.colors.border}`,
                    minHeight: "200px",
                  }}
                  onContextMenu={handleContextMenu}
                  onClick={closeContextMenu}
                >
                  <Heading level={4} className="mb-2">
                    Right-click anywhere in this area
                  </Heading>
                  <Paragraph>
                    Try right-clicking to open the context menu. Click anywhere
                    to close it.
                  </Paragraph>

                  {showContextMenu && (
                    <div
                      className="fixed z-50"
                      style={{
                        left: `${contextMenuPosition.x}px`,
                        top: `${contextMenuPosition.y}px`,
                      }}
                    >
                      <ContextMenu>
                        <MenuHeader>Quick Actions</MenuHeader>
                        <MenuItem icon={<FileIcon />}>New File</MenuItem>
                        <MenuItem icon={<FolderIcon />}>New Folder</MenuItem>
                        <MenuDivider />
                        <MenuItem icon={<EditIcon />}>Rename</MenuItem>
                        <MenuItem icon={<DeleteIcon />} disabled>
                          Delete
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem>Properties</MenuItem>
                      </ContextMenu>
                    </div>
                  )}
                </Box>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.surfaceHover,
                  border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                }}
              >
                <Code className="block whitespace-pre">
                  {`// Context menu implementation
import { ContextMenu } from 'zaalim-ui'

function MyComponent() {
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleContextMenu = (e) => {
    e.preventDefault()
    setPosition({ x: e.clientX, y: e.clientY })
    setShowContextMenu(true)
  }

  const closeContextMenu = () => {
    setShowContextMenu(false)
  }

  return (
    <div 
      onContextMenu={handleContextMenu}
      onClick={closeContextMenu}
    >
      {/* Your content */}
      
      {showContextMenu && (
        <div
          className="fixed z-50"
          style={{ left: position.x, top: position.y }}
        >
          <ContextMenu>
            <MenuHeader>Quick Actions</MenuHeader>
            <MenuItem icon={<FileIcon />}>New File</MenuItem>
            <MenuItem icon={<FolderIcon />}>New Folder</MenuItem>
            <MenuDivider />
            <MenuItem icon={<EditIcon />}>Rename</MenuItem>
            <MenuItem icon={<DeleteIcon />} disabled>
              Delete
            </MenuItem>
          </ContextMenu>
        </div>
      )}
    </div>
  )
}`}
                </Code>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Examples */}
          <Card variant="elevated">
            <CardHeader>
              <Heading level={3}>Navigation Examples</Heading>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Heading level={4}>Top Navigation</Heading>
                  <Box
                    variant="background"
                    className="p-4 rounded-lg"
                    style={{
                      border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                    }}
                  >
                    <Flex justify="between" align="center">
                      <Box className="font-bold">Brand</Box>
                      <Menu orientation="horizontal">
                        <MenuItem>Home</MenuItem>
                        <MenuItem>Features</MenuItem>
                        <MenuItem>Pricing</MenuItem>
                        <MenuItem>About</MenuItem>
                      </Menu>
                      <Button size="sm">Get Started</Button>
                    </Flex>
                  </Box>
                </div>

                <div className="space-y-4">
                  <Heading level={4}>Sidebar Navigation</Heading>
                  <Flex gap={6}>
                    <Box
                      variant="surface"
                      className="p-4 rounded-lg"
                      style={{
                        width: "240px",
                        border: `1px solid ${currentTheme.colors.surfaceBorder}`,
                      }}
                    >
                      <Menu orientation="vertical">
                        <MenuItem icon={<HomeIcon />} active>
                          Overview
                        </MenuItem>
                        <MenuItem icon={<UserIcon />}>Users</MenuItem>
                        <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
                        <MenuDivider />
                        <MenuItem>Documentation</MenuItem>
                        <MenuItem>Support</MenuItem>
                      </Menu>
                    </Box>
                  </Flex>
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
                  {`// Top navigation bar
<Flex justify="between" align="center" className="p-4">
  <Box className="font-bold">Brand</Box>
  <Menu orientation="horizontal">
    <MenuItem>Home</MenuItem>
    <MenuItem>Features</MenuItem>
    <MenuItem>Pricing</MenuItem>
    <MenuItem>About</MenuItem>
  </Menu>
  <Button size="sm">Get Started</Button>
</Flex>

// Sidebar navigation
<Box className="w-64 p-4">
  <Menu orientation="vertical">
    <MenuItem icon={<HomeIcon />} active>
      Overview
    </MenuItem>
    <MenuItem icon={<UserIcon />}>
      Users
    </MenuItem>
    <MenuItem icon={<SettingsIcon />}>
      Settings
    </MenuItem>
    <MenuDivider />
    <MenuItem>Documentation</MenuItem>
    <MenuItem>Support</MenuItem>
  </Menu>
</Box>

// Dropdown menu (using submenu)
<Menu orientation="horizontal">
  <MenuItem 
    submenu={
      <Menu orientation="vertical">
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
        <MenuItem>Option 3</MenuItem>
      </Menu>
    }
  >
    Products
  </MenuItem>
</Menu>`}
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
                    {/* Menu Props */}
                    <tr>
                      <td
                        className="px-4 py-3 text-sm font-medium"
                        rowSpan={4}
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        Menu
                      </td>
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
                        'horizontal' | 'vertical'
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        'horizontal'
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Menu layout direction
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
                        activeItem
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
                        Controlled active menu item ID
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        onItemSelect
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        (id: string) =&gt; void
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
                        Callback when menu item is selected
                      </td>
                    </tr>

                    {/* MenuItem Props */}
                    <tr
                      style={{
                        backgroundColor: currentTheme.colors.backgroundSubtle,
                      }}
                    >
                      <td
                        className="px-4 py-3 text-sm font-medium"
                        rowSpan={8}
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        MenuItem
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        id
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
                        Unique identifier for the item
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        icon
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        React.ReactNode
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
                        Icon displayed before the label
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
                        badge
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        React.ReactNode
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
                        Badge displayed after the label
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        submenu
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        React.ReactNode
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
                        Nested submenu content
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
                        Disables the menu item
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        active
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
                        Forces active state (overrides parent)
                      </td>
                    </tr>

                    {/* MenuGroup Props */}
                    <tr
                      style={{
                        backgroundColor: currentTheme.colors.backgroundSubtle,
                      }}
                    >
                      <td
                        className="px-4 py-3 text-sm font-medium"
                        rowSpan={2}
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        MenuGroup
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        title
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
                        Group title displayed above items
                      </td>
                    </tr>

                    {/* ContextMenu */}
                    <tr>
                      <td
                        className="px-4 py-3 text-sm font-medium"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        ContextMenu
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        (all Menu props)
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        -
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        orientation="vertical"
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        Pre-configured for context menus
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
                      Use <Code>MenuHeader</Code> and <Code>MenuGroup</Code> to
                      organize complex menus
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Keep submenus to 2-3 levels maximum for better usability
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Use <Code>MenuDivider</Code> to separate logical groups of
                      items
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Provide keyboard shortcuts in <Code>MenuFooter</Code> for
                      power users
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Use consistent icons and badge colors throughout your
                      application
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      For context menus, always handle both click and
                      right-click events properly
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Use <Code>activeItem</Code> prop for controlled menu state
                      in complex applications
                    </SmallText>
                  </li>
                  <li className="flex items-start gap-2">
                    <SmallText>•</SmallText>
                    <SmallText>
                      Consider mobile responsiveness - horizontal menus may need
                      to wrap or convert to dropdowns
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
