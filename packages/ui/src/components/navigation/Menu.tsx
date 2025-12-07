import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { useTheme } from "../../contexts/themeContext";
import { Box } from "../foundation/Box";
import { Flex } from "../foundation/Flex";
import { Badge } from "../DataDisplay/Badge";

// Menu Context for state management
interface MenuContextType {
  activeItem: string | null;
  setActiveItem: (id: string | null) => void;
  openSubmenu: string | null;
  setOpenSubmenu: (id: string | null) => void;
  orientation: "horizontal" | "vertical";
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("Menu components must be used within a Menu");
  }
  return context;
};

// Main Menu Component
interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
  activeItem?: string;
  onItemSelect?: (id: string) => void;
}

export const Menu = ({
  children,
  className = "",
  orientation = "horizontal",
  activeItem: controlledActiveItem,
  onItemSelect,
  ...props
}: MenuProps) => {
  const [internalActiveItem, setInternalActiveItem] = useState<string | null>(
    null
  );
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const activeItem =
    controlledActiveItem !== undefined
      ? controlledActiveItem
      : internalActiveItem;
  const setActiveItem =
    controlledActiveItem !== undefined ? () => {} : setInternalActiveItem;

  const contextValue: MenuContextType = {
    activeItem,
    setActiveItem,
    openSubmenu,
    setOpenSubmenu,
    orientation,
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpenSubmenu(null);
    }
  };

  return (
    <MenuContext.Provider value={contextValue}>
      <ul
        className={`list-none p-0 m-0 flex ${
          orientation === "vertical" ? "flex-col" : "flex-row"
        } ${className}`}
        role="menu"
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              onSelect: onItemSelect,
              index,
            });
          }
          return child;
        })}
      </ul>
    </MenuContext.Provider>
  );
};

// Menu Item Component - Fixed interface
interface MenuItemProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "onSelect"> {
  children: React.ReactNode;
  className?: string;
  id?: string;
  disabled?: boolean;
  active?: boolean;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  badgeProps?: React.ComponentProps<typeof Badge>;
  submenu?: React.ReactNode;
  onSelect?: (id: string) => void;
  index?: number;
}

export const MenuItem = ({
  children,
  className = "",
  id,
  disabled = false,
  active: controlledActive,
  icon,
  badge,
  badgeProps,
  submenu,
  onSelect,
  index,
  onClick,
  onMouseEnter,
  onMouseLeave,
  // Separate li-specific props that shouldn't go to the inner div
  ...liProps
}: MenuItemProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const context = useMenuContext();
  const itemRef = useRef<HTMLLIElement>(null);
  const submenuTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const itemId = id || `menu-item-${index}`;
  const isActive =
    controlledActive !== undefined
      ? controlledActive
      : context.activeItem === itemId;
  const hasSubmenu = !!submenu;
  const isSubmenuOpen = context.openSubmenu === itemId;

  // Helper function to handle item activation
  const activateItem = (e: React.SyntheticEvent) => {
    if (disabled) return;

    e.stopPropagation();

    if (hasSubmenu) {
      if (context.orientation === "vertical") {
        context.setOpenSubmenu(isSubmenuOpen ? null : itemId);
      }
    } else {
      context.setActiveItem(itemId);
      if (onSelect && itemId) {
        onSelect(itemId);
      }
    }

    if (onClick) {
      onClick(e as React.MouseEvent<HTMLLIElement>);
    }
  };

  // Handle mouse enter for submenu
  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
    if (hasSubmenu && context.orientation === "horizontal") {
      submenuTimerRef.current = setTimeout(() => {
        context.setOpenSubmenu(itemId);
      }, 150);
    }

    if (onMouseEnter) {
      onMouseEnter(e);
    }
  };

  // Handle mouse leave for submenu
  const handleMouseLeave = (e: React.MouseEvent<HTMLLIElement>) => {
    if (submenuTimerRef.current) {
      clearTimeout(submenuTimerRef.current);
    }

    if (hasSubmenu && context.orientation === "horizontal") {
      submenuTimerRef.current = setTimeout(() => {
        context.setOpenSubmenu(null);
      }, 150);
    }

    if (onMouseLeave) {
      onMouseLeave(e);
    }
  };

  // Handle click on the div
  const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    activateItem(e);
  };

  // Handle keyboard navigation on the div
  const handleDivKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        activateItem(e);
        break;
      case "ArrowRight":
        if (hasSubmenu && !isSubmenuOpen) {
          e.preventDefault();
          context.setOpenSubmenu(itemId);
        }
        break;
      case "ArrowLeft":
        if (isSubmenuOpen) {
          e.preventDefault();
          context.setOpenSubmenu(null);
        }
        break;
    }
  };

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (submenuTimerRef.current) {
        clearTimeout(submenuTimerRef.current);
      }
    };
  }, []);

  return (
    <li
      ref={itemRef}
      className={`relative ${className}`}
      role="none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...liProps} // Spread li-specific props here
    >
      <div
        className={`
          flex items-center justify-between px-4 py-2.5
          ${context.orientation === "horizontal" ? "h-full" : "w-full"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${isActive ? "font-semibold" : ""}
          transition-colors duration-150
          hover:bg-surfaceHover
          focus:outline-none focus:ring-2 focus:ring-offset-1
        `}
        role="menuitem"
        aria-disabled={disabled}
        aria-haspopup={hasSubmenu}
        aria-expanded={hasSubmenu ? isSubmenuOpen : undefined}
        tabIndex={disabled ? -1 : 0}
        onClick={handleDivClick}
        onKeyDown={handleDivKeyDown}
        style={{
          color: isActive ? colors.brand[500] : colors.text.primary,
          backgroundColor: isActive ? colors.surfaceHover : "transparent",
          borderRight:
            context.orientation === "vertical" && isActive
              ? `3px solid ${colors.brand[500]}`
              : "none",
          borderBottom:
            context.orientation === "horizontal" && isActive
              ? `2px solid ${colors.brand[500]}`
              : "none",
        }}
        // Don't spread props here - they're li-specific
      >
        <Flex align="center" gap={3}>
          {icon && (
            <span
              className="flex items-center justify-center"
              style={{
                color: isActive ? colors.brand[500] : colors.text.secondary,
              }}
            >
              {icon}
            </span>
          )}
          <span>{children}</span>
        </Flex>

        <Flex align="center" gap={2}>
          {badge && (
            <Badge size="sm" {...badgeProps}>
              {badge}
            </Badge>
          )}
          {hasSubmenu && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transform transition-transform ${
                isSubmenuOpen ? "rotate-90" : ""
              }`}
              style={{
                color: colors.text.muted,
                marginLeft: context.orientation === "vertical" ? "auto" : "0",
              }}
            >
              <polyline points="4 2 8 6 4 10" />
            </svg>
          )}
        </Flex>
      </div>

      {/* Submenu */}
      {hasSubmenu && isSubmenuOpen && (
        <Box
          className={`
            absolute z-50 min-w-[200px] rounded-lg shadow-lg
            ${
              context.orientation === "horizontal"
                ? "top-full left-0 mt-1"
                : "top-0 left-full ml-1"
            }
          `}
          style={{
            backgroundColor: colors.surface,
            border: `1px solid ${colors.surfaceBorder}`,
          }}
          role="menu"
          aria-orientation={context.orientation}
        >
          {submenu}
        </Box>
      )}
    </li>
  );
};

// Menu Group Component
interface MenuGroupProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const MenuGroup = ({
  children,
  className = "",
  title,
  ...props
}: MenuGroupProps) => {
  const { theme } = useTheme();

  return (
    <li className={className} role="none" {...props}>
      {title && (
        <div
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider"
          style={{ color: theme.colors.text.muted }}
        >
          {title}
        </div>
      )}
      <ul className="list-none p-0 m-0" role="group">
        {children}
      </ul>
    </li>
  );
};

// Menu Divider Component
export const MenuDivider = () => {
  const { theme } = useTheme();

  return (
    <li role="separator">
      <hr style={{ borderColor: theme.colors.border, margin: "0.5rem 0" }} />
    </li>
  );
};

// Menu Header Component
interface MenuHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const MenuHeader = ({
  children,
  className = "",
  ...props
}: MenuHeaderProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={`px-4 py-3 border-b ${className}`}
      style={{
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.backgroundSubtle,
      }}
      {...props}
    >
      <div className="font-semibold text-text-primary">{children}</div>
    </div>
  );
};

// Menu Footer Component
export const MenuFooter = ({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { theme } = useTheme();

  return (
    <div
      className={`px-4 py-3 border-t ${className}`}
      style={{
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.backgroundSubtle,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

// Compact version for context menus
export const ContextMenu = ({
  children,
  className = "",
  ...props
}: Omit<MenuProps, "orientation">) => {
  return (
    <Menu
      orientation="vertical"
      className={`min-w-[160px] ${className}`}
      {...props}
    >
      {children}
    </Menu>
  );
};

// Export types
export type { MenuProps, MenuItemProps, MenuGroupProps, MenuHeaderProps };
