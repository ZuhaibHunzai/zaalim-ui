import React from "react";
import { useTheme } from "../../contexts/themeContext";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  // Source options
  src?: string;
  alt?: string;
  fallback?: string | React.ReactNode;
  icon?: React.ReactNode;

  // Sizing
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  customSize?: number; // Custom size in pixels

  // Appearance
  shape?: "circle" | "square" | "rounded";
  border?: boolean;
  borderColor?: "default" | "brand" | "surface" | "white";

  // Status indicator
  status?: "online" | "offline" | "away" | "busy" | "none";
  statusPlacement?: "top-right" | "top-left" | "bottom-right" | "bottom-left";

  // Clickable
  clickable?: boolean;
}

export const Avatar = ({
  src,
  alt = "Avatar",
  fallback,
  icon,
  size = "md",
  customSize,
  shape = "circle",
  border = false,
  borderColor = "default",
  status = "none",
  statusPlacement = "bottom-right",
  clickable = false,
  className = "",
  style,
  ...props
}: AvatarProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  // Size mapping
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
    "2xl": 64,
  };

  const avatarSize = customSize || sizeMap[size];
  const statusSize = avatarSize * 0.25; // Status indicator size relative to avatar

  // Shape classes
  const getShapeClass = () => {
    switch (shape) {
      case "circle":
        return "rounded-full";
      case "square":
        return "rounded-none";
      case "rounded":
        return "rounded-lg";
      default:
        return "rounded-full";
    }
  };

  // Border color
  const getBorderColor = () => {
    switch (borderColor) {
      case "brand":
        return colors.brand[500];
      case "surface":
        return colors.surface;
      case "white":
        return "#FFFFFF";
      case "default":
      default:
        return colors.border;
    }
  };

  // Status color
  const getStatusColor = () => {
    switch (status) {
      case "online":
        return colors.success;
      case "away":
        return colors.warning;
      case "busy":
        return colors.error;
      case "offline":
        return colors.text.muted;
      default:
        return "transparent";
    }
  };

  // Status position
  const getStatusPosition = () => {
    const offset = -statusSize / 4;
    const position = {
      "top-right": { top: offset, right: offset },
      "top-left": { top: offset, left: offset },
      "bottom-right": { bottom: offset, right: offset },
      "bottom-left": { bottom: offset, left: offset },
    };
    return position[statusPlacement];
  };

  // Generate initials from fallback text
  const getInitials = (text: string) => {
    return text
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Render fallback content
  const renderFallback = () => {
    if (icon) {
      return (
        <div className="flex items-center justify-center w-full h-full">
          {icon}
        </div>
      );
    }

    if (typeof fallback === "string") {
      return (
        <div
          className="flex items-center justify-center w-full h-full font-medium text-white"
          style={{ fontSize: avatarSize * 0.4 }}
        >
          {getInitials(fallback)}
        </div>
      );
    }

    return fallback;
  };

  // Avatar container styles
  const containerStyles: React.CSSProperties = {
    width: avatarSize,
    height: avatarSize,
    minWidth: avatarSize,
    minHeight: avatarSize,
    ...(border && {
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: getBorderColor(),
    }),
    ...style,
  };

  // Background color for fallback (based on brand color)
  const fallbackBackground = `linear-gradient(135deg, ${colors.brand[400]}, ${colors.accent})`;

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden ${getShapeClass()} ${
        clickable ? "cursor-pointer hover:opacity-90 transition-opacity" : ""
      } ${className}`}
      style={containerStyles}
      role={clickable ? "button" : "img"}
      aria-label={alt}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${getShapeClass()}`}
          onError={(e) => {
            // If image fails to load, show fallback
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center ${getShapeClass()}`}
          style={{ background: fallbackBackground }}
        >
          {renderFallback()}
        </div>
      )}

      {/* Status indicator */}
      {status !== "none" && (
        <div
          className="absolute border-2 border-white rounded-full"
          style={{
            width: statusSize,
            height: statusSize,
            backgroundColor: getStatusColor(),
            ...getStatusPosition(),
          }}
        />
      )}
    </div>
  );
};

// Avatar Group Component
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  spacing?: number;
  size?: AvatarProps["size"];
}

export const AvatarGroup = ({
  children,
  max = 5,
  spacing = -8,
  size = "md",
  className = "",
  ...props
}: AvatarGroupProps) => {
  const avatars = React.Children.toArray(children);
  const totalAvatars = avatars.length;
  const visibleAvatars = max ? avatars.slice(0, max) : avatars;
  const extraAvatars = max ? totalAvatars - max : 0;

  const { theme } = useTheme();

  return (
    <div className={`flex items-center ${className}`} {...props}>
      <div className="flex" style={{ marginLeft: -spacing }}>
        {visibleAvatars.map((avatar, index) => (
          <div
            key={index}
            className="overflow-hidden border-2 border-white rounded-full"
            style={{
              marginLeft: index === 0 ? 0 : spacing,
              zIndex: visibleAvatars.length - index,
            }}
          >
            {React.isValidElement(avatar)
              ? React.cloneElement(avatar as React.ReactElement<AvatarProps>, {
                  size,
                  borderColor: "white",
                })
              : avatar}
          </div>
        ))}
      </div>

      {extraAvatars > 0 && (
        <div
          className="flex items-center justify-center font-medium rounded-full text-text-primary"
          style={{
            width: 40,
            height: 40,
            marginLeft: spacing + 4,
            backgroundColor: theme.colors.surface,
            border: `2px solid ${theme.colors.background}`,
            fontSize: "0.875rem",
            zIndex: 1,
          }}
        >
          +{extraAvatars}
        </div>
      )}
    </div>
  );
};
