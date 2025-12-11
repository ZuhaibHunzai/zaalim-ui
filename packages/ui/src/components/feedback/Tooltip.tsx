// packages/ui/src/components/feedback/Tooltip.tsx
import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../../contexts/themeContext";
import { createPortal } from "react-dom";

// ============================================
// Types and Interfaces
// ============================================

export type TooltipPosition =
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

export type TooltipVariant = "default" | "dark" | "light" | "brand";

export interface TooltipProps {
  /** Tooltip content */
  content: React.ReactNode;

  /** The element that triggers the tooltip */
  children: React.ReactElement;

  /** Tooltip position */
  position?: TooltipPosition;

  /** Tooltip variant */
  variant?: TooltipVariant;

  /** Delay before showing tooltip (ms) */
  delayShow?: number;

  /** Delay before hiding tooltip (ms) */
  delayHide?: number;

  /** Whether tooltip is disabled */
  disabled?: boolean;

  /** Whether tooltip is always visible (for debugging) */
  alwaysVisible?: boolean;

  /** Max width of tooltip */
  maxWidth?: number | string;

  /** Additional CSS classes */
  className?: string;

  /** Additional styles for tooltip */
  style?: React.CSSProperties;
}

// ============================================
// Main Tooltip Component
// ============================================

export const Tooltip = ({
  content,
  children,
  position = "top",
  variant = "default",
  delayShow = 100,
  delayHide = 100,
  disabled = false,
  alwaysVisible = false,
  maxWidth = 200,
  className = "",
  style,
}: TooltipProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  const [isVisible, setIsVisible] = useState(alwaysVisible);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  let showTimeout: number;
  let hideTimeout: number;

  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case "dark":
        return {
          backgroundColor: colors.text.primary,
          color: colors.text.inverted,
          border: `1px solid ${colors.surfaceBorder}`,
        };
      case "light":
        return {
          backgroundColor: colors.surface,
          color: colors.text.primary,
          border: `1px solid ${colors.surfaceBorder}`,
          boxShadow: `0 2px 8px ${colors.overlay}15`,
        };
      case "brand":
        return {
          backgroundColor: colors.brand[500],
          color: colors.brand[600],
          border: `1px solid ${colors.brand[400]}`,
        };
      case "default":
      default:
        return {
          backgroundColor: colors.surface,
          color: colors.text.primary,
          border: `1px solid ${colors.surfaceBorder}`,
          boxShadow: `0 2px 8px ${colors.overlay}15`,
        };
    }
  };

  // Calculate position
  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return { top: 0, left: 0 };

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    let top = 0;
    let left = 0;
    const arrowSize = 6;

    switch (position) {
      case "top":
        top = triggerRect.top + scrollY - tooltipRect.height - arrowSize;
        left =
          triggerRect.left +
          scrollX +
          triggerRect.width / 2 -
          tooltipRect.width / 2;
        break;
      case "top-start":
        top = triggerRect.top + scrollY - tooltipRect.height - arrowSize;
        left = triggerRect.left + scrollX;
        break;
      case "top-end":
        top = triggerRect.top + scrollY - tooltipRect.height - arrowSize;
        left =
          triggerRect.left + scrollX + triggerRect.width - tooltipRect.width;
        break;
      case "bottom":
        top = triggerRect.bottom + scrollY + arrowSize;
        left =
          triggerRect.left +
          scrollX +
          triggerRect.width / 2 -
          tooltipRect.width / 2;
        break;
      case "bottom-start":
        top = triggerRect.bottom + scrollY + arrowSize;
        left = triggerRect.left + scrollX;
        break;
      case "bottom-end":
        top = triggerRect.bottom + scrollY + arrowSize;
        left =
          triggerRect.left + scrollX + triggerRect.width - tooltipRect.width;
        break;
      case "left":
        top =
          triggerRect.top +
          scrollY +
          triggerRect.height / 2 -
          tooltipRect.height / 2;
        left = triggerRect.left + scrollX - tooltipRect.width - arrowSize;
        break;
      case "left-start":
        top = triggerRect.top + scrollY;
        left = triggerRect.left + scrollX - tooltipRect.width - arrowSize;
        break;
      case "left-end":
        top = triggerRect.bottom + scrollY - tooltipRect.height;
        left = triggerRect.left + scrollX - tooltipRect.width - arrowSize;
        break;
      case "right":
        top =
          triggerRect.top +
          scrollY +
          triggerRect.height / 2 -
          tooltipRect.height / 2;
        left = triggerRect.right + scrollX + arrowSize;
        break;
      case "right-start":
        top = triggerRect.top + scrollY;
        left = triggerRect.right + scrollX + arrowSize;
        break;
      case "right-end":
        top = triggerRect.bottom + scrollY - tooltipRect.height;
        left = triggerRect.right + scrollX + arrowSize;
        break;
    }

    // Boundary checks
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Prevent tooltip from going off-screen horizontally
    if (left < 10) left = 10;
    if (left + tooltipRect.width > viewportWidth - 10) {
      left = viewportWidth - tooltipRect.width - 10;
    }

    // Prevent tooltip from going off-screen vertically
    if (top < 10) top = 10;
    if (top + tooltipRect.height > viewportHeight - 10) {
      top = viewportHeight - tooltipRect.height - 10;
    }

    return { top, left };
  };

  // Show tooltip
  const showTooltip = () => {
    if (disabled) return;

    clearTimeout(hideTimeout);
    showTimeout = setTimeout(() => {
      setIsVisible(true);
      // Update position after showing
      setTimeout(() => {
        const newCoords = calculatePosition();
        setCoords(newCoords);
      }, 0);
    }, delayShow);
  };

  // Hide tooltip
  const hideTooltip = () => {
    if (disabled) return;

    clearTimeout(showTimeout);
    hideTimeout = setTimeout(() => {
      if (!alwaysVisible) {
        setIsVisible(false);
      }
    }, delayHide);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        hideTooltip();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isVisible]);

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isVisible) {
        hideTooltip();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isVisible]);

  // Render arrow based on position
  const renderArrow = () => {
    const arrowStyle: React.CSSProperties = {
      position: "absolute",
      width: 0,
      height: 0,
      borderStyle: "solid",
    };

    const arrowColor = getVariantStyles().backgroundColor;

    switch (position) {
      case "top":
      case "top-start":
      case "top-end":
        arrowStyle.bottom = "-6px";
        arrowStyle.left = "50%";
        arrowStyle.transform = "translateX(-50%)";
        arrowStyle.borderWidth = "6px 6px 0 6px";
        arrowStyle.borderColor = `${arrowColor} transparent transparent transparent`;
        break;
      case "bottom":
      case "bottom-start":
      case "bottom-end":
        arrowStyle.top = "-6px";
        arrowStyle.left = "50%";
        arrowStyle.transform = "translateX(-50%)";
        arrowStyle.borderWidth = "0 6px 6px 6px";
        arrowStyle.borderColor = `transparent transparent ${arrowColor} transparent`;
        break;
      case "left":
      case "left-start":
      case "left-end":
        arrowStyle.right = "-6px";
        arrowStyle.top = "50%";
        arrowStyle.transform = "translateY(-50%)";
        arrowStyle.borderWidth = "6px 0 6px 6px";
        arrowStyle.borderColor = `transparent transparent transparent ${arrowColor}`;
        break;
      case "right":
      case "right-start":
      case "right-end":
        arrowStyle.left = "-6px";
        arrowStyle.top = "50%";
        arrowStyle.transform = "translateY(-50%)";
        arrowStyle.borderWidth = "6px 6px 6px 0";
        arrowStyle.borderColor = `transparent ${arrowColor} transparent transparent`;
        break;
    }

    return <div style={arrowStyle} />;
  };

  // Clone child with ref and event handlers
  const triggerElement = React.cloneElement(children, {
    ref: (node: HTMLElement | null) => {
      // Use type assertion to bypass readonly
      (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;

      // Forward ref if child accepts ref
      if (children && typeof children === "object" && "ref" in children) {
        if (typeof children.ref === "function") {
          children.ref(node);
        } else if (children.ref && node) {
          // Use type assertion here too
          const childRef =
            children.ref as React.MutableRefObject<HTMLElement | null>;
          childRef.current = node;
        }
      }
    },
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
    "aria-describedby": isVisible ? "tooltip-content" : undefined,
  });

  // Render tooltip portal
  const renderTooltipPortal = () => {
    if (!isVisible || disabled) return null;

    const variantStyles = getVariantStyles();
    const positionStyles = calculatePosition();

    const tooltipElement = (
      <div
        ref={tooltipRef}
        id="tooltip-content"
        role="tooltip"
        className={`fixed z-50 rounded-lg px-3 py-2 text-sm font-normal transition-opacity duration-200 ${className}`}
        style={{
          ...variantStyles,
          ...positionStyles,
          maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
          pointerEvents: "none",
          opacity: isVisible ? 1 : 0,
          ...style,
        }}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {content}
        {renderArrow()}
      </div>
    );

    return createPortal(tooltipElement, document.body);
  };

  return (
    <>
      {triggerElement}
      {renderTooltipPortal()}
    </>
  );
};

// ============================================
// Pre-built Tooltip Components
// ============================================

// Dark Tooltip
export const DarkTooltip = (props: Omit<TooltipProps, "variant">) => (
  <Tooltip variant="dark" {...props} />
);

// Light Tooltip
export const LightTooltip = (props: Omit<TooltipProps, "variant">) => (
  <Tooltip variant="light" {...props} />
);

// Brand Tooltip
export const BrandTooltip = (props: Omit<TooltipProps, "variant">) => (
  <Tooltip variant="brand" {...props} />
);

// Simple Tooltip (text only)
export interface SimpleTooltipProps
  extends Omit<TooltipProps, "content" | "children"> {
  text: string;
  children: React.ReactElement;
}

export const SimpleTooltip = ({
  text,
  children,
  ...props
}: SimpleTooltipProps) => (
  <Tooltip content={text} {...props}>
    {children}
  </Tooltip>
);

// Info Tooltip (with info icon)
export const InfoTooltip = ({
  content,
  children,
  ...props
}: Omit<TooltipProps, "children"> & { children?: React.ReactElement }) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  const trigger = children || (
    <span
      className="inline-flex items-center justify-center w-4 h-4 rounded-full cursor-help"
      style={{
        backgroundColor: colors.info + "20",
        color: colors.info,
      }}
      aria-label="More information"
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="6" cy="6" r="5" />
        <line x1="6" y1="8" x2="6" y2="6" />
        <line x1="6" y1="4" x2="6.01" y2="4" />
      </svg>
    </span>
  );

  return (
    <Tooltip content={content} {...props}>
      {trigger}
    </Tooltip>
  );
};

// Error Tooltip (for form validation)
export const ErrorTooltip = ({
  content,
  children,
  ...props
}: Omit<TooltipProps, "variant" | "children"> & {
  children?: React.ReactElement;
}) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  const trigger = children || (
    <span
      className="inline-flex items-center justify-center w-4 h-4 rounded-full"
      style={{
        backgroundColor: colors.error + "20",
        color: colors.error,
      }}
      aria-label="Error"
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="6" cy="6" r="5" />
        <line x1="6" y1="8" x2="6" y2="6" />
        <line x1="6" y1="4" x2="6.01" y2="4" />
      </svg>
    </span>
  );

  return (
    <Tooltip variant="dark" content={content} position="top" {...props}>
      {trigger}
    </Tooltip>
  );
};

// Shortcut Tooltip (for keyboard shortcuts)
export interface ShortcutTooltipProps extends Omit<TooltipProps, "content"> {
  shortcut: string;
  description: string;
}

export const ShortcutTooltip = ({
  shortcut,
  description,
  ...props
}: ShortcutTooltipProps) => {
  const content = (
    <div className="flex flex-col gap-1">
      <div>{description}</div>
      <div className="flex items-center gap-1">
        <kbd
          className="px-1.5 py-0.5 text-xs rounded"
          style={{
            backgroundColor: "var(--surface-hover)",
            border: "1px solid var(--surface-border)",
          }}
        >
          {shortcut}
        </kbd>
      </div>
    </div>
  );

  return <Tooltip content={content} {...props} />;
};

// Controlled Tooltip (for programmatic control)
export interface ControlledTooltipProps extends Omit<TooltipProps, "children"> {
  children: React.ReactElement;
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export const ControlledTooltip = ({
  isOpen,
  onOpenChange,
  children,
  ...props
}: ControlledTooltipProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);

  useEffect(() => {
    setInternalIsOpen(isOpen);
  }, [isOpen]);

  const handleOpenChange = (open: boolean) => {
    setInternalIsOpen(open);
    if (onOpenChange) {
      onOpenChange(open);
    }
  };

  const modifiedProps: TooltipProps = {
    ...props,
    alwaysVisible: internalIsOpen,
    children: React.cloneElement(children, {
      onClick: () => handleOpenChange(!internalIsOpen),
    }),
  };

  return <Tooltip {...modifiedProps} />;
};
