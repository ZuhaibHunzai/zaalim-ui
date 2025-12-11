// packages/ui/src/components/feedback/Popover.tsx
import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../../contexts/themeContext";
import { createPortal } from "react-dom";

// ============================================
// Types and Interfaces
// ============================================

export type PopoverPosition =
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end";

export type PopoverTrigger = "click" | "hover" | "focus";

export interface PopoverProps {
  /** Popover content */
  content: React.ReactNode;

  /** The element that triggers the popover */
  children: React.ReactElement;

  /** Whether popover is open (controlled mode) */
  isOpen?: boolean;

  /** Callback when popover opens/closes (controlled mode) */
  onOpenChange?: (isOpen: boolean) => void;

  /** Popover position */
  position?: PopoverPosition;

  /** Trigger behavior */
  trigger?: PopoverTrigger;

  /** Delay before showing popover (ms) - for hover trigger */
  delayShow?: number;

  /** Delay before hiding popover (ms) - for hover trigger */
  delayHide?: number;

  /** Whether popover is disabled */
  disabled?: boolean;

  /** Whether to show arrow */
  showArrow?: boolean;

  /** Max width of popover */
  maxWidth?: number | string;

  /** Whether to close popover when clicking outside */
  closeOnClickOutside?: boolean;

  /** Whether to close popover when pressing Escape */
  closeOnEsc?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** Additional styles for popover */
  style?: React.CSSProperties;
}

// ============================================
// Main Popover Component
// ============================================

export const Popover = ({
  content,
  children,
  isOpen: controlledIsOpen,
  onOpenChange,
  position = "bottom",
  trigger = "click",
  delayShow = 100,
  delayHide = 100,
  disabled = false,
  showArrow = true,
  maxWidth = 300,
  closeOnClickOutside = true,
  closeOnEsc = true,
  className = "",
  style,
}: PopoverProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  // State for uncontrolled mode
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Use controlled or internal state
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  // Timeout references
  let showTimeout: number;
  let hideTimeout: number;

  // Get variant styles
  const getPopoverStyles = () => {
    return {
      backgroundColor: colors.surface,
      color: colors.text.primary,
      border: `1px solid ${colors.surfaceBorder}`,
      borderRadius: "0.5rem",
      boxShadow: `0 10px 15px -3px ${colors.overlay}30, 0 4px 6px -2px ${colors.overlay}10`,
    };
  };

  // Calculate position
  const calculatePosition = () => {
    if (!triggerRef.current || !popoverRef.current) return { top: 0, left: 0 };

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();

    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    let top = 0;
    let left = 0;
    const arrowSize = showArrow ? 6 : 0;
    const gap = 8;

    switch (position) {
      case "top":
        top = triggerRect.top + scrollY - popoverRect.height - arrowSize - gap;
        left =
          triggerRect.left +
          scrollX +
          triggerRect.width / 2 -
          popoverRect.width / 2;
        break;
      case "top-start":
        top = triggerRect.top + scrollY - popoverRect.height - arrowSize - gap;
        left = triggerRect.left + scrollX;
        break;
      case "top-end":
        top = triggerRect.top + scrollY - popoverRect.height - arrowSize - gap;
        left =
          triggerRect.left + scrollX + triggerRect.width - popoverRect.width;
        break;
      case "bottom":
        top = triggerRect.bottom + scrollY + arrowSize + gap;
        left =
          triggerRect.left +
          scrollX +
          triggerRect.width / 2 -
          popoverRect.width / 2;
        break;
      case "bottom-start":
        top = triggerRect.bottom + scrollY + arrowSize + gap;
        left = triggerRect.left + scrollX;
        break;
      case "bottom-end":
        top = triggerRect.bottom + scrollY + arrowSize + gap;
        left =
          triggerRect.left + scrollX + triggerRect.width - popoverRect.width;
        break;
      case "left":
        top =
          triggerRect.top +
          scrollY +
          triggerRect.height / 2 -
          popoverRect.height / 2;
        left = triggerRect.left + scrollX - popoverRect.width - arrowSize - gap;
        break;
      case "left-start":
        top = triggerRect.top + scrollY;
        left = triggerRect.left + scrollX - popoverRect.width - arrowSize - gap;
        break;
      case "left-end":
        top = triggerRect.bottom + scrollY - popoverRect.height;
        left = triggerRect.left + scrollX - popoverRect.width - arrowSize - gap;
        break;
      case "right":
        top =
          triggerRect.top +
          scrollY +
          triggerRect.height / 2 -
          popoverRect.height / 2;
        left = triggerRect.right + scrollX + arrowSize + gap;
        break;
      case "right-start":
        top = triggerRect.top + scrollY;
        left = triggerRect.right + scrollX + arrowSize + gap;
        break;
      case "right-end":
        top = triggerRect.bottom + scrollY - popoverRect.height;
        left = triggerRect.right + scrollX + arrowSize + gap;
        break;
    }

    // Boundary checks
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Prevent popover from going off-screen horizontally
    if (left < 10) left = 10;
    if (left + popoverRect.width > viewportWidth - 10) {
      left = viewportWidth - popoverRect.width - 10;
    }

    // Prevent popover from going off-screen vertically
    if (top < 10) top = 10;
    if (top + popoverRect.height > viewportHeight - 10) {
      top = viewportHeight - popoverRect.height - 10;
    }

    return { top, left };
  };

  // Open popover
  const openPopover = () => {
    if (disabled) return;

    if (controlledIsOpen === undefined) {
      setInternalIsOpen(true);
    }
    if (onOpenChange) {
      onOpenChange(true);
    }

    // Update position after opening
    setTimeout(() => {
      const newCoords = calculatePosition();
      setCoords(newCoords);
    }, 0);
  };

  // Close popover
  const closePopover = () => {
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(false);
    }
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  // Toggle popover
  const togglePopover = () => {
    if (isOpen) {
      closePopover();
    } else {
      openPopover();
    }
  };

  // Handle hover show
  const handleMouseEnter = () => {
    if (trigger !== "hover" || disabled) return;

    clearTimeout(hideTimeout);
    showTimeout = setTimeout(() => {
      openPopover();
    }, delayShow);
  };

  // Handle hover hide
  const handleMouseLeave = () => {
    if (trigger !== "hover" || disabled) return;

    clearTimeout(showTimeout);
    hideTimeout = setTimeout(() => {
      closePopover();
    }, delayHide);
  };

  // Handle click
  const handleClick = () => {
    if (trigger !== "click" || disabled) return;
    togglePopover();
  };

  // Handle focus
  const handleFocus = () => {
    if (trigger !== "focus" || disabled) return;
    openPopover();
  };

  // Handle blur
  const handleBlur = () => {
    if (trigger !== "focus" || disabled) return;
    setTimeout(() => {
      closePopover();
    }, 100);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        closeOnClickOutside &&
        isOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        closePopover();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, closeOnClickOutside]);

  // Handle Escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEsc && isOpen) {
        closePopover();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => document.removeEventListener("keydown", handleEscapeKey);
    }
  }, [isOpen, closeOnEsc]);

  // Render arrow based on position
  const renderArrow = () => {
    if (!showArrow) return null;

    const arrowStyle: React.CSSProperties = {
      position: "absolute",
      width: 0,
      height: 0,
      borderStyle: "solid",
    };

    const arrowColor = colors.surface;
    const arrowBorderColor = colors.surfaceBorder;

    switch (position) {
      case "top":
      case "top-start":
      case "top-end":
        arrowStyle.bottom = "-6px";
        arrowStyle.left = "50%";
        arrowStyle.transform = "translateX(-50%)";
        arrowStyle.borderWidth = "6px 6px 0 6px";
        arrowStyle.borderColor = `${arrowColor} transparent transparent transparent`;
        // Border for arrow
        arrowStyle.filter = `drop-shadow(0 1px 0 ${arrowBorderColor})`;
        break;
      case "bottom":
      case "bottom-start":
      case "bottom-end":
        arrowStyle.top = "-6px";
        arrowStyle.left = "50%";
        arrowStyle.transform = "translateX(-50%)";
        arrowStyle.borderWidth = "0 6px 6px 6px";
        arrowStyle.borderColor = `transparent transparent ${arrowColor} transparent`;
        arrowStyle.filter = `drop-shadow(0 -1px 0 ${arrowBorderColor})`;
        break;
      case "left":
      case "left-start":
      case "left-end":
        arrowStyle.right = "-6px";
        arrowStyle.top = "50%";
        arrowStyle.transform = "translateY(-50%)";
        arrowStyle.borderWidth = "6px 0 6px 6px";
        arrowStyle.borderColor = `transparent transparent transparent ${arrowColor}`;
        arrowStyle.filter = `drop-shadow(1px 0 0 ${arrowBorderColor})`;
        break;
      case "right":
      case "right-start":
      case "right-end":
        arrowStyle.left = "-6px";
        arrowStyle.top = "50%";
        arrowStyle.transform = "translateY(-50%)";
        arrowStyle.borderWidth = "6px 6px 6px 0";
        arrowStyle.borderColor = `transparent ${arrowColor} transparent transparent`;
        arrowStyle.filter = `drop-shadow(-1px 0 0 ${arrowBorderColor})`;
        break;
    }

    return <div style={arrowStyle} />;
  };

  // Clone child with ref and event handlers
  const triggerElement = React.cloneElement(children, {
    ref: (node: HTMLElement | null) => {
      (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;

      // Forward ref if child accepts ref
      if (children && typeof children === "object" && "ref" in children) {
        if (typeof children.ref === "function") {
          children.ref(node);
        } else if (children.ref && node) {
          const childRef =
            children.ref as React.MutableRefObject<HTMLElement | null>;
          childRef.current = node;
        }
      }
    },
    onClick: trigger === "click" ? handleClick : children.props.onClick,
    onMouseEnter:
      trigger === "hover" ? handleMouseEnter : children.props.onMouseEnter,
    onMouseLeave:
      trigger === "hover" ? handleMouseLeave : children.props.onMouseLeave,
    onFocus: trigger === "focus" ? handleFocus : children.props.onFocus,
    onBlur: trigger === "focus" ? handleBlur : children.props.onBlur,
    "aria-expanded": isOpen,
    "aria-haspopup": "true",
  });

  // Render popover portal
  const renderPopoverPortal = () => {
    if (!isOpen || disabled) return null;

    const popoverStyles = getPopoverStyles();
    const positionStyles = calculatePosition();

    const popoverElement = (
      <div
        ref={popoverRef}
        role="dialog"
        className={`fixed z-50 rounded-lg ${className}`}
        style={{
          ...popoverStyles,
          ...positionStyles,
          maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
          ...style,
        }}
        onMouseEnter={trigger === "hover" ? handleMouseEnter : undefined}
        onMouseLeave={trigger === "hover" ? handleMouseLeave : undefined}
      >
        {renderArrow()}
        <div className="p-4">{content}</div>
      </div>
    );

    return createPortal(popoverElement, document.body);
  };

  return (
    <>
      {triggerElement}
      {renderPopoverPortal()}
    </>
  );
};

// ============================================
// Pre-built Popover Components
// ============================================

// Dropdown Popover (for select/menu)
export interface DropdownPopoverProps
  extends Omit<PopoverProps, "content" | "children"> {
  /** Dropdown items */
  items: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    divider?: boolean;
  }>;

  /** Trigger element */
  children: React.ReactElement;

  /** Callback when item is selected */
  onSelect?: (itemId: string) => void;
}

export const DropdownPopover = ({
  items,
  children,
  onSelect,
  ...props
}: DropdownPopoverProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  const content = (
    <div className="py-1 min-w-[150px]">
      {items.map((item) => {
        if (item.divider) {
          return (
            <div
              key={`divider-${item.id}`}
              className="my-1 h-px"
              style={{ backgroundColor: colors.surfaceBorder }}
            />
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              if (item.onClick) item.onClick();
              if (onSelect) onSelect(item.id);
              if (props.onOpenChange) props.onOpenChange(false);
            }}
            disabled={item.disabled}
            className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 transition-colors ${
              item.disabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-surfaceHover"
            }`}
            style={{
              color: colors.text.primary,
            }}
          >
            {item.icon && (
              <span style={{ color: colors.text.muted }}>{item.icon}</span>
            )}
            {item.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <Popover
      trigger="click"
      position="bottom-start"
      closeOnClickOutside={true}
      content={content}
      {...props}
    >
      {children}
    </Popover>
  );
};

// Menu Popover (context menu)
export const MenuPopover = (props: Omit<PopoverProps, "trigger">) => (
  <Popover
    trigger="click"
    position="bottom-start"
    closeOnClickOutside={true}
    {...props}
  />
);

// Tooltip Popover (enhanced tooltip with rich content)
export const TooltipPopover = (props: Omit<PopoverProps, "trigger">) => (
  <Popover
    trigger="hover"
    showArrow={true}
    delayShow={100}
    delayHide={100}
    {...props}
  />
);

// Date Popover (for date pickers)
export interface DatePopoverProps
  extends Omit<PopoverProps, "content" | "children"> {
  /** Selected date */
  value?: Date;

  /** Callback when date changes */
  onChange?: (date: Date) => void;

  /** Trigger element */
  children: React.ReactElement;
}

export const DatePopover = ({
  value = new Date(),
  onChange,
  children,
  ...props
}: DatePopoverProps) => {
  const [currentDate, setCurrentDate] = useState(value);

  const content = (
    <div className="p-4">
      <div className="text-center font-semibold mb-2">
        {currentDate.toLocaleDateString("default", {
          month: "long",
          year: "numeric",
        })}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium py-1"
            style={{ color: "var(--text-muted)" }}
          >
            {day}
          </div>
        ))}
        {/* Simplified calendar grid - would need full implementation */}
        {Array.from({ length: 35 }).map((_, i) => {
          const day = i - 3; // Example offset
          const isSelected = day === currentDate.getDate();

          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setDate(day);
                setCurrentDate(newDate);
                if (onChange) onChange(newDate);
                if (props.onOpenChange) props.onOpenChange(false);
              }}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                isSelected ? "font-semibold" : ""
              }`}
              style={{
                backgroundColor: isSelected
                  ? "var(--brand-500)"
                  : "transparent",
                color: isSelected ? "var(--brand-600)" : "var(--text-primary)",
              }}
              disabled={day < 1 || day > 31}
            >
              {day > 0 && day < 32 ? day : ""}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <Popover
      trigger="click"
      position="bottom-start"
      closeOnClickOutside={true}
      content={content}
      {...props}
    >
      {children}
    </Popover>
  );
};

// Color Picker Popover
export interface ColorPopoverProps
  extends Omit<PopoverProps, "content" | "children"> {
  /** Selected color */
  value?: string;

  /** Callback when color changes */
  onChange?: (color: string) => void;

  /** Color options */
  colors?: string[];

  /** Trigger element */
  children: React.ReactElement;
}

export const ColorPopover = ({
  value = "#4BE5D1",
  onChange,
  colors = [
    "#4BE5D1",
    "#9E7BFF",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#38BDF8",
    "#8B5CF6",
    "#EC4899",
  ],
  children,
  ...props
}: ColorPopoverProps) => {
  const content = (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-2">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => {
              if (onChange) onChange(color);
              if (props.onOpenChange) props.onOpenChange(false);
            }}
            className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
            style={{
              backgroundColor: color,
              borderColor:
                value === color ? "var(--text-primary)" : "transparent",
            }}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <Popover
      trigger="click"
      position="bottom-start"
      closeOnClickOutside={true}
      content={content}
      {...props}
    >
      {children}
    </Popover>
  );
};

// Controlled Popover Hook
export const usePopover = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);

  return {
    isOpen,
    open,
    close,
    toggle,
    popoverProps: {
      isOpen,
      onOpenChange: setIsOpen,
    },
  };
};
