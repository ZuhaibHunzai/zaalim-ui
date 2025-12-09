// packages/ui/src/components/navigation/Tabs.tsx
import React, { createContext, useContext, useState } from "react";
import { useTheme } from "../../contexts/themeContext";
import { Box, BoxProps } from "../foundation/Box";
import { Flex, FlexProps } from "../foundation/Flex";

// Tabs Context for state management
interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
  orientation: "horizontal" | "vertical";
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs");
  }
  return context;
};

// Main Tabs Component
interface TabsProps extends Omit<BoxProps, "onChange" | "children"> {
  children: React.ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const Tabs = ({
  children,
  className = "",
  orientation = "horizontal",
  defaultValue,
  value: controlledValue,
  onChange,
  ...props
}: TabsProps) => {
  const [internalValue, setInternalValue] = useState<string>(
    defaultValue || ""
  );

  const activeTab =
    controlledValue !== undefined ? controlledValue : internalValue;

  const setActiveTab = (id: string) => {
    if (controlledValue === undefined) {
      setInternalValue(id);
    }
    if (onChange) {
      onChange(id);
    }
  };

  const contextValue: TabsContextType = {
    activeTab,
    setActiveTab,
    orientation,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <Box
        className={`flex ${
          orientation === "vertical" ? "flex-row" : "flex-col"
        } ${className}`}
        {...props}
      >
        {children}
      </Box>
    </TabsContext.Provider>
  );
};

// TabList Component
interface TabListProps extends Omit<FlexProps, "children"> {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export const TabList = ({
  children,
  className = "",
  fullWidth = false,
  ...props
}: TabListProps) => {
  const { orientation } = useTabsContext();

  return (
    <Flex
      className={`
        ${orientation === "vertical" ? "flex-col border-r" : "border-b"}
        ${fullWidth ? "w-full" : ""}
        border-${orientation === "vertical" ? "r" : "b"}
        ${className}
      `}
      role="tablist"
      aria-orientation={orientation}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            index,
            orientation,
          });
        }
        return child;
      })}
    </Flex>
  );
};

// Tab Component
interface TabProps extends Omit<BoxProps, "onClick" | "children"> {
  children: React.ReactNode;
  className?: string;
  value: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
  index?: number;
  orientation?: "horizontal" | "vertical";
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Tab = ({
  children,
  className = "",
  value,
  icon,
  badge,
  disabled = false,
  index,
  orientation = "horizontal",
  onClick,
  ...props
}: TabProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const { activeTab, setActiveTab } = useTabsContext();

  const isActive = activeTab === value;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    setActiveTab(value);

    if (onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveTab(value);
    }
  };

  return (
    <Box
      className={`
        flex items-center gap-2 px-4 py-3
        ${
          orientation === "vertical"
            ? "border-l-2 border-transparent"
            : "border-b-2 border-transparent"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${isActive ? "font-semibold" : "font-normal"}
        transition-all duration-200
        hover:opacity-90
        focus:outline-none focus:ring-2 focus:ring-offset-1
        ${className}
      `}
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      aria-controls={`panel-${value}`}
      id={`tab-${value}`}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{
        borderColor: isActive ? colors.brand[500] : "transparent",
        color: isActive ? colors.brand[500] : colors.text.primary,
        backgroundColor: isActive
          ? orientation === "vertical"
            ? colors.brand[50]
            : "transparent"
          : "transparent",
        marginBottom: orientation === "horizontal" && isActive ? "-2px" : "0",
        marginRight: orientation === "vertical" && isActive ? "-2px" : "0",
      }}
      {...props}
    >
      {icon && (
        <span
          style={{
            color: isActive ? colors.brand[500] : colors.text.secondary,
          }}
        >
          {icon}
        </span>
      )}
      <span>{children}</span>
      {badge && (
        <Box
          className="ml-auto px-1.5 py-0.5 text-xs rounded"
          style={{
            backgroundColor: isActive ? colors.brand[100] : colors.surfaceHover,
            color: isActive ? colors.brand[600] : colors.text.secondary,
          }}
        >
          {badge}
        </Box>
      )}
    </Box>
  );
};

// TabPanel Component
interface TabPanelProps extends Omit<BoxProps, "children"> {
  children: React.ReactNode;
  className?: string;
  value: string;
}

export const TabPanel = ({
  children,
  className = "",
  value,
  ...props
}: TabPanelProps) => {
  const { activeTab } = useTabsContext();
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <Box
      className={`flex-1 p-4 ${className}`}
      role="tabpanel"
      aria-labelledby={`tab-${value}`}
      id={`panel-${value}`}
      {...props}
    >
      {children}
    </Box>
  );
};

// TabGroup Component (convenience wrapper)
interface TabGroupProps extends Omit<TabsProps, "children"> {
  children?: React.ReactNode;
  tabList: React.ReactNode;
  tabPanels: React.ReactNode;
}

export const TabGroup = ({
  children,
  tabList,
  tabPanels,
  orientation = "horizontal",
  ...props
}: TabGroupProps) => {
  return (
    <Tabs orientation={orientation} {...props}>
      <TabList>{tabList}</TabList>
      {tabPanels}
      {children}
    </Tabs>
  );
};

// Pre-built tab variants
export const TabsHorizontal = (props: Omit<TabsProps, "orientation">) => (
  <Tabs orientation="horizontal" {...props} />
);

export const TabsVertical = (props: Omit<TabsProps, "orientation">) => (
  <Tabs orientation="vertical" {...props} />
);

// Simple Tabs (for basic use cases)
interface SimpleTabsProps extends Omit<TabsProps, "children"> {
  tabs: Array<{
    value: string;
    label: string;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
    content: React.ReactNode;
  }>;
}

export const SimpleTabs = ({
  tabs,
  orientation = "horizontal",
  defaultValue,
  ...props
}: SimpleTabsProps) => {
  const firstTab = tabs[0]?.value;

  return (
    <Tabs
      orientation={orientation}
      defaultValue={defaultValue || firstTab}
      {...props}
    >
      <TabList>
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            icon={tab.icon}
            badge={tab.badge}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>

      {tabs.map((tab) => (
        <TabPanel key={tab.value} value={tab.value}>
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  );
};

// Export types
export type {
  TabsProps,
  TabListProps,
  TabProps,
  TabPanelProps,
  TabGroupProps,
  SimpleTabsProps,
};
