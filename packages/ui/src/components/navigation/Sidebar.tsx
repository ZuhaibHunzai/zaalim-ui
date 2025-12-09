// packages/ui/src/components/navigation/Sidebar.tsx
import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/themeContext";
import { Box, BoxProps } from "../foundation/Box";
import { Flex } from "../foundation/Flex";
import { Menu, MenuItem, MenuGroup, MenuHeader, MenuFooter } from "./Menu";

export interface SidebarProps extends Omit<BoxProps, "children"> {
  /** Sidebar content */
  children?: React.ReactNode;

  /** Whether sidebar is collapsed/minimized */
  collapsed?: boolean;

  /** Controlled collapsed state */
  isCollapsed?: boolean;

  /** Callback when collapsed state changes */
  onCollapseChange?: (collapsed: boolean) => void;

  /** Width in pixels when expanded */
  width?: number;

  /** Width in pixels when collapsed */
  collapsedWidth?: number;

  /** Position of sidebar */
  position?: "left" | "right";

  /** Whether sidebar is fixed (sticky) */
  fixed?: boolean;

  /** Brand/logo area at the top */
  brand?: React.ReactNode;

  /** Footer area at the bottom */
  footer?: React.ReactNode;

  /** Navigation menu items (alternative to children) */
  navItems?: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
    disabled?: boolean;
    children?: Array<{
      id: string;
      label: string;
      icon?: React.ReactNode;
      badge?: React.ReactNode;
      disabled?: boolean;
    }>;
  }>;

  /** Active navigation item ID */
  activeItem?: string;

  /** Callback when nav item is selected */
  onNavItemSelect?: (id: string) => void;

  /** Additional CSS classes */
  className?: string;
}

export const Sidebar = ({
  children,
  collapsed: defaultCollapsed = false,
  isCollapsed: controlledCollapsed,
  onCollapseChange,
  width = 260,
  collapsedWidth = 72,
  position = "left",
  fixed = false,
  brand,
  footer,
  navItems,
  activeItem,
  onNavItemSelect,
  className = "",
  ...props
}: SidebarProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  // Collapsed state management
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isCollapsed =
    controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    if (controlledCollapsed === undefined) {
      setInternalCollapsed(newCollapsed);
    }
    if (onCollapseChange) {
      onCollapseChange(newCollapsed);
    }
  };

  // Calculate current width
  const currentWidth = isCollapsed ? collapsedWidth : width;

  // Base styles for sidebar
  const sidebarStyle: React.CSSProperties = {
    width: `${currentWidth}px`,
    backgroundColor: colors.surface,
    borderRight:
      position === "left" ? `1px solid ${colors.surfaceBorder}` : "none",
    borderLeft:
      position === "right" ? `1px solid ${colors.surfaceBorder}` : "none",
    transition: "width 0.3s ease, transform 0.3s ease",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  };

  // Fixed positioning - use proper CSSProperties type
  const fixedStyles: React.CSSProperties = fixed
    ? {
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto" as React.CSSProperties["overflowY"], // Type assertion
      }
    : {};

  // Combine styles
  const combinedStyle: React.CSSProperties = {
    ...sidebarStyle,
    ...fixedStyles,
  };

  // Render navigation from navItems prop
  const renderNavItems = () => {
    if (!navItems || navItems.length === 0) return null;

    return (
      <Menu
        orientation="vertical"
        activeItem={activeItem}
        onItemSelect={onNavItemSelect}
      >
        {navItems.map((item) => {
          if (item.children && item.children.length > 0) {
            // Item with submenu
            return (
              <MenuItem
                key={item.id}
                id={item.id}
                icon={item.icon}
                badge={item.badge}
                disabled={item.disabled}
                submenu={
                  <Menu orientation="vertical">
                    {item.children.map((child) => (
                      <MenuItem
                        key={child.id}
                        id={child.id}
                        icon={child.icon}
                        badge={child.badge}
                        disabled={child.disabled}
                      >
                        {child.label}
                      </MenuItem>
                    ))}
                  </Menu>
                }
              >
                {item.label}
              </MenuItem>
            );
          }

          // Regular menu item
          return (
            <MenuItem
              key={item.id}
              id={item.id}
              icon={item.icon}
              badge={item.badge}
              disabled={item.disabled}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    );
  };

  return (
    <Box className={`sidebar ${className}`} style={combinedStyle} {...props}>
      {/* Brand/Logo Area */}
      {brand && (
        <Box
          className="px-4 py-4 border-b"
          style={{
            borderColor: colors.surfaceBorder,
            minHeight: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: isCollapsed ? "center" : "space-between",
          }}
        >
          {!isCollapsed && brand}
          {isCollapsed && React.isValidElement(brand) ? (
            React.cloneElement(brand as React.ReactElement, {
              style: { ...(brand as any).props?.style, margin: "0 auto" },
            })
          ) : (
            <div style={{ margin: "0 auto" }}>{brand}</div>
          )}

          {/* Collapse Toggle Button */}
          <button
            onClick={toggleCollapse}
            className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-surfaceHover transition-colors"
            style={{
              color: colors.text.secondary,
              marginLeft: isCollapsed ? 0 : "auto",
            }}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${
                position === "left" && isCollapsed ? "rotate-180" : ""
              } ${position === "right" && !isCollapsed ? "rotate-180" : ""}`}
            >
              {position === "left" ? (
                <polyline points="15 18 9 12 15 6" />
              ) : (
                <polyline points="9 18 15 12 9 6" />
              )}
            </svg>
          </button>
        </Box>
      )}

      {/* Navigation Content */}
      <Box
        className="flex-1 overflow-y-auto"
        style={{
          padding: isCollapsed ? "1rem 0.5rem" : "1rem",
        }}
      >
        {navItems ? renderNavItems() : children}
      </Box>

      {/* Footer Area */}
      {footer && (
        <Box
          className="border-t"
          style={{
            borderColor: colors.surfaceBorder,
            padding: isCollapsed ? "0.75rem 0.5rem" : "1rem",
          }}
        >
          {footer}
        </Box>
      )}
    </Box>
  );
};

// Sidebar Section Component
interface SidebarSectionProps extends BoxProps {
  children: React.ReactNode;
  title?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export const SidebarSection = ({
  children,
  title,
  collapsible = false,
  defaultCollapsed = false,
  className = "",
  ...props
}: SidebarSectionProps) => {
  const { theme } = useTheme();
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <Box className={`mb-4 ${className}`} {...props}>
      {title && (
        <Flex
          justify="between"
          align="center"
          className="px-3 py-2"
          style={{
            color: theme.colors.text.secondary,
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          <span>{title}</span>
          {collapsible && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded hover:bg-surfaceHover"
              aria-label={collapsed ? "Expand section" : "Collapse section"}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transform transition-transform ${
                  collapsed ? "rotate-180" : ""
                }`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          )}
        </Flex>
      )}
      {!collapsed && children}
    </Box>
  );
};

// Sidebar Divider
export const SidebarDivider = () => {
  const { theme } = useTheme();

  return (
    <hr
      className="my-2"
      style={{
        borderColor: theme.colors.surfaceBorder,
        borderWidth: 0,
        borderTopWidth: "1px",
        borderStyle: "solid",
      }}
    />
  );
};

// Compact Sidebar (preset)
interface CompactSidebarProps
  extends Omit<SidebarProps, "collapsed" | "collapsedWidth" | "width"> {
  width?: number;
}

export const CompactSidebar = (props: CompactSidebarProps) => (
  <Sidebar
    collapsed={true}
    width={props.width || 260}
    collapsedWidth={props.width || 72}
    {...props}
  />
);

// Wide Sidebar (preset)
export const WideSidebar = (props: Omit<SidebarProps, "width">) => (
  <Sidebar width={320} {...props} />
);

// Export types
export type { SidebarSectionProps, CompactSidebarProps };
