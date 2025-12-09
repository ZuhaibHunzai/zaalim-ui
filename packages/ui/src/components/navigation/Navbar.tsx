// packages/ui/src/components/navigation/Navbar.tsx
import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/themeContext";
import { Box } from "../foundation/Box";
import { Flex } from "../foundation/Flex";
import { Menu, MenuItem } from "./Menu";
import { Button } from "../Button";

export type NavbarVariant = "default" | "solid" | "transparent" | "blurred";
export type NavbarPosition = "static" | "fixed" | "sticky";

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Brand/logo area */
  brand?: React.ReactNode;

  /** Navigation items */
  navItems?: Array<{
    id: string;
    label: string;
    href?: string;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
    disabled?: boolean;
    children?: Array<{
      id: string;
      label: string;
      href?: string;
      icon?: React.ReactNode;
      badge?: React.ReactNode;
      disabled?: boolean;
    }>;
  }>;

  /** Active navigation item ID */
  activeItem?: string;

  /** Callback when nav item is clicked */
  onNavItemClick?: (id: string, href?: string) => void;

  /** Search box component (can use SearchBox or QuickSearch) */
  search?: React.ReactNode;

  /** Action buttons/items on the right side */
  actions?: React.ReactNode;

  /** User menu/profile section */
  userMenu?: React.ReactNode;

  /** Variant style */
  variant?: NavbarVariant;

  /** Position behavior */
  position?: NavbarPosition;

  /** Whether navbar has shadow */
  elevated?: boolean;

  /** Whether navbar is bordered */
  bordered?: boolean;

  /** Maximum width of navbar content */
  maxWidth?: string;

  /** Padding on sides */
  paddingX?: string;

  /** Whether to show mobile menu toggle */
  showMobileMenu?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** Children for custom content */
  children?: React.ReactNode;
}

export const Navbar = ({
  brand,
  navItems,
  activeItem,
  onNavItemClick,
  search,
  actions,
  userMenu,
  variant = "default",
  position = "sticky",
  elevated = true,
  bordered = false,
  maxWidth = "7xl",
  paddingX = "1.5rem",
  showMobileMenu = true,
  className = "",
  children,
  ...props
}: NavbarProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for shadow/transparency effects
  useEffect(() => {
    if (variant === "transparent" || variant === "blurred") {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [variant]);

  // Get navbar styles based on variant
  const getNavbarStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      transition: "all 0.3s ease",
      backdropFilter: variant === "blurred" ? "blur(12px)" : "none",
      zIndex: 50,
    };

    // Handle scrolled state for transparent/blurred variants
    if ((variant === "transparent" || variant === "blurred") && isScrolled) {
      return {
        ...baseStyles,
        backgroundColor:
          variant === "blurred" ? `${colors.surface}CC` : colors.surface,
        borderBottom: bordered ? `1px solid ${colors.surfaceBorder}` : "none",
        boxShadow: elevated ? `0 4px 20px ${colors.overlay}10` : "none",
      };
    }

    // Default states
    switch (variant) {
      case "transparent":
        return {
          ...baseStyles,
          backgroundColor: "transparent",
          borderBottom: "none",
          boxShadow: "none",
        };

      case "blurred":
        return {
          ...baseStyles,
          backgroundColor: `${colors.surface}80`,
          borderBottom: bordered
            ? `1px solid ${colors.surfaceBorder}40`
            : "none",
          boxShadow: "none",
        };

      case "solid":
        return {
          ...baseStyles,
          backgroundColor: colors.surface,
          borderBottom: bordered ? `1px solid ${colors.surfaceBorder}` : "none",
          boxShadow: elevated ? `0 4px 20px ${colors.overlay}10` : "none",
        };

      case "default":
      default:
        return {
          ...baseStyles,
          backgroundColor: colors.background,
          borderBottom: bordered ? `1px solid ${colors.surfaceBorder}` : "none",
          boxShadow: elevated ? `0 1px 3px ${colors.overlay}08` : "none",
        };
    }
  };

  // Handle nav item click
  const handleNavItemClick = (id: string, href?: string) => {
    if (onNavItemClick) {
      onNavItemClick(id, href);
    }

    // Close mobile menu on click
    setIsMobileMenuOpen(false);
  };

  // Render navigation items
  const renderNavItems = () => {
    if (!navItems || navItems.length === 0) return null;

    return (
      <Menu
        orientation="horizontal"
        activeItem={activeItem}
        onItemSelect={(id) => {
          const item = navItems.find((n) => n.id === id);
          handleNavItemClick(id, item?.href);
        }}
        className="hidden md:flex"
      >
        {navItems.map((item) => {
          if (item.children && item.children.length > 0) {
            return (
              <MenuItem
                key={item.id}
                id={item.id}
                icon={item.icon}
                badge={item.badge}
                disabled={item.disabled}
                submenu={
                  <Menu orientation="vertical" className="min-w-[200px]">
                    {item.children.map((child) => (
                      <MenuItem
                        key={child.id}
                        id={child.id}
                        icon={child.icon}
                        badge={child.badge}
                        disabled={child.disabled}
                        onClick={() => handleNavItemClick(child.id, child.href)}
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

          return (
            <MenuItem
              key={item.id}
              id={item.id}
              icon={item.icon}
              badge={item.badge}
              disabled={item.disabled}
              onClick={() => handleNavItemClick(item.id, item.href)}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    );
  };

  // Render mobile navigation
  const renderMobileNav = () => {
    if (!navItems || navItems.length === 0) return null;

    return (
      <Box
        className={`md:hidden fixed top-16 left-0 right-0 bottom-0 bg-background transition-transform duration-300 ease-in-out overflow-y-auto ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          backgroundColor: colors.background,
          borderTop: `1px solid ${colors.surfaceBorder}`,
          zIndex: 40,
        }}
      >
        <div className="p-4">
          <Menu orientation="vertical">
            {navItems.map((item) => (
              <MenuItem
                key={item.id}
                id={item.id}
                icon={item.icon}
                badge={item.badge}
                disabled={item.disabled}
                onClick={() => handleNavItemClick(item.id, item.href)}
                className="py-3"
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>

          {/* Mobile actions */}
          {actions && (
            <Box
              className="mt-6 pt-6 border-t"
              style={{ borderColor: colors.surfaceBorder }}
            >
              <Flex direction="column" gap={3}>
                {actions}
              </Flex>
            </Box>
          )}
        </div>
      </Box>
    );
  };

  // Render mobile menu toggle
  const renderMobileToggle = () => {
    if (!showMobileMenu) return null;

    return (
      <button
        className="md:hidden p-2 rounded-md hover:bg-surfaceHover transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
        style={{ color: colors.text.primary }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isMobileMenuOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </button>
    );
  };

  // Position styles
  const positionStyles: React.CSSProperties = {
    position:
      position === "fixed"
        ? "fixed"
        : position === "sticky"
        ? "sticky"
        : "static",
    top: position === "fixed" || position === "sticky" ? 0 : "auto",
    left: 0,
    right: 0,
  };

  return (
    <>
      <Box
        className={`navbar ${className}`}
        style={{
          ...getNavbarStyles(),
          ...positionStyles,
        }}
        {...props}
      >
        <Box
          className="mx-auto"
          style={{
            maxWidth: maxWidth === "full" ? "100%" : maxWidth,
            paddingLeft: paddingX,
            paddingRight: paddingX,
          }}
        >
          <Flex align="center" justify="between" className="h-16">
            {/* Left: Brand + Mobile Toggle */}
            <Flex align="center" gap={4}>
              {brand && <div className="flex items-center">{brand}</div>}

              {/* Desktop Navigation */}
              {renderNavItems()}
            </Flex>

            {/* Center: Search (if provided) */}
            {search && <Box className="flex-1 max-w-xl mx-4">{search}</Box>}

            {/* Right: Actions + User Menu + Mobile Toggle */}
            <Flex align="center" gap={3}>
              {/* Desktop Actions */}
              {actions && (
                <Flex align="center" gap={2} className="hidden md:flex">
                  {actions}
                </Flex>
              )}

              {/* User Menu */}
              {userMenu && <Box className="hidden md:block">{userMenu}</Box>}

              {/* Mobile Menu Toggle */}
              {renderMobileToggle()}
            </Flex>
          </Flex>

          {/* Custom children (for additional rows, breadcrumbs, etc.) */}
          {children}
        </Box>
      </Box>

      {/* Mobile Navigation Menu */}
      {renderMobileNav()}

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-overlay z-30"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ backgroundColor: colors.overlay }}
        />
      )}
    </>
  );
};

// Navbar Brand Component
export interface NavbarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: React.ReactNode;
  name?: string;
  href?: string;
  onClick?: () => void;
}

export const NavbarBrand = ({
  logo,
  name,
  href,
  onClick,
  className = "",
  ...props
}: NavbarBrandProps) => {
  const { theme } = useTheme();

  const content = (
    <Flex
      align="center"
      gap={3}
      className={`cursor-pointer ${className}`}
      {...props}
    >
      {logo && <div className="flex items-center justify-center">{logo}</div>}
      {name && (
        <span
          className="text-xl font-bold"
          style={{ color: theme.colors.text.primary }}
        >
          {name}
        </span>
      )}
    </Flex>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className="no-underline">
        {content}
      </a>
    );
  }

  return <div onClick={onClick}>{content}</div>;
};

// Navbar Section (for grouping)
export interface NavbarSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

export const NavbarSection = ({
  children,
  align = "left",
  className = "",
  ...props
}: NavbarSectionProps) => {
  const justifyClass = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }[align];

  return (
    <Flex
      align="center"
      className={`flex-1 ${justifyClass} ${className}`}
      {...props}
    >
      {children}
    </Flex>
  );
};

// Navbar Divider
export const NavbarDivider = () => {
  const { theme } = useTheme();

  return (
    <div
      className="h-6 mx-3"
      style={{
        width: "1px",
        backgroundColor: theme.colors.surfaceBorder,
      }}
    />
  );
};

// Compact Navbar (preset)
export const CompactNavbar = (
  props: Omit<NavbarProps, "elevated" | "paddingX">
) => <Navbar elevated={false} paddingX="1rem" {...props} />;

// Centered Navbar (preset)
export const CenteredNavbar = (props: Omit<NavbarProps, "children">) => (
  <Navbar {...props}>
    <Flex align="center" justify="center" className="h-12">
      {props.navItems && (
        <Menu orientation="horizontal" activeItem={props.activeItem}>
          {props.navItems.map((item) => (
            <MenuItem key={item.id} id={item.id}>
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Flex>
  </Navbar>
);

// Navbar with Search (preset)
export interface NavbarWithSearchProps
  extends Omit<NavbarProps, "search" | "children"> {
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
}

export const NavbarWithSearch = ({
  searchPlaceholder = "Search...",
  onSearch,
  ...props
}: NavbarWithSearchProps) => {
  return (
    <Navbar
      {...props}
      search={
        <div className="w-full">
          {/* Assuming you have SearchBox component */}
          {/* <SearchBox 
            placeholder={searchPlaceholder}
            onSearch={onSearch}
            variant="filled"
            size="sm"
          /> */}
          <div className="text-sm text-text-muted">
            [SearchBox component would go here]
          </div>
        </div>
      }
    />
  );
};

// No separate type exports needed - interfaces are exported above
