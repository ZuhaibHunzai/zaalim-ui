import React from "react";
import { useTheme } from "../../contexts/themeContext";
import { Badge } from "./Badge";
import { Avatar, AvatarProps } from "./Avatar";

interface ChipProps {
  children?: React.ReactNode;
  className?: string;

  // Selection state
  selected?: boolean;
  onSelect?: (selected: boolean) => void;

  // Avatar integration
  avatarSrc?: string;
  avatarAlt?: string;
  avatarFallback?: string;
  avatarProps?: Omit<AvatarProps, "src" | "alt" | "fallback">;

  // Custom remove
  onRemove?: () => void;
  removable?: boolean;

  // States
  disabled?: boolean;

  // Chip types
  type?: "filter" | "choice" | "input" | "action";

  // Badge-like props
  variant?:
    | "brand"
    | "neutral"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "accent";
  styleVariant?: "solid" | "outline" | "subtle";
  size?: "sm" | "md" | "lg";
  pill?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  withDot?: boolean;

  // HTML attributes
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  style?: React.CSSProperties;
  title?: string;
  id?: string;
}

export const Chip = ({
  children,
  className = "",
  selected = false,
  onSelect,
  avatarSrc,
  avatarAlt,
  avatarFallback,
  avatarProps,
  onRemove,
  removable = false,
  disabled = false,
  type = "filter",
  variant = "neutral",
  styleVariant = "outline",
  pill = true,
  icon,
  iconPosition = "left",
  withDot = false,
  onClick,
  style,
  size,
  ...props
}: ChipProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  // Determine variant based on selection state for filter chips
  const getEffectiveVariant = () => {
    if (type === "filter" && selected) {
      return "brand";
    }
    return variant;
  };

  // Determine style variant based on type and selection
  const getEffectiveStyleVariant = () => {
    if (type === "filter" && selected) {
      return "solid";
    }
    if (type === "choice" && selected) {
      return "solid";
    }
    if (type === "input") {
      return "subtle";
    }
    return styleVariant;
  };

  // Handle click
  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (disabled) return;

    if (onSelect && (type === "filter" || type === "choice")) {
      onSelect(!selected);
    }

    if (onClick) {
      onClick(e);
    }
  };

  // Handle remove
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
  };

  // Render avatar
  const renderAvatar = () => {
    if (avatarSrc || avatarFallback) {
      return (
        <Avatar
          src={avatarSrc}
          alt={avatarAlt || "Avatar"}
          fallback={avatarFallback}
          size="xs"
          {...avatarProps}
        />
      );
    }
    return null;
  };

  // Render remove icon for input chips
  const renderInputRemove = () => {
    if (type === "input" && removable) {
      return (
        <button
          type="button"
          onClick={handleRemove}
          className="ml-1.5 -mr-1 p-0.5 rounded-sm hover:bg-black/10 focus:outline-none focus:ring-1 focus:ring-inset"
          aria-label="Remove"
          disabled={disabled}
          style={{
            fontSize: "0.75rem",
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7.5" y1="2.5" x2="2.5" y2="7.5" />
            <line x1="2.5" y1="2.5" x2="7.5" y2="7.5" />
          </svg>
        </button>
      );
    }
    return null;
  };

  // Render check icon for selected chips
  const renderSelectedIcon = () => {
    if ((type === "filter" || type === "choice") && selected) {
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-1"
        >
          <polyline points="1 6 4 9 11 2" />
        </svg>
      );
    }
    return null;
  };

  const effectiveVariant = getEffectiveVariant();
  const effectiveStyleVariant = getEffectiveStyleVariant();
  const hasAvatar = avatarSrc || avatarFallback;

  // Custom styles for selected state
  const selectedStyles: React.CSSProperties = {};
  if (type === "filter" && selected) {
    selectedStyles.boxShadow = `0 0 0 1px ${colors.brand[500]}`;
  }

  return (
    <Badge
      variant={effectiveVariant}
      styleVariant={effectiveStyleVariant}
      pill={pill}
      interactive={!disabled}
      className={`${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
      onClick={handleClick}
      style={{ ...style, ...selectedStyles }}
      icon={
        <>
          {renderSelectedIcon()}
          {hasAvatar && !icon ? (
            <div className="mr-1.5">{renderAvatar()}</div>
          ) : (
            icon
          )}
        </>
      }
      iconPosition={hasAvatar && !icon ? "left" : iconPosition}
      withDot={withDot}
      size={size}
      onRemove={type === "input" && removable ? undefined : onRemove}
      {...props}
    >
      {children}
      {renderInputRemove()}
    </Badge>
  );
};
