// packages/ui/src/components/utility/Link.tsx
import React from "react";
import { useTheme } from "../../contexts/themeContext";

// Next.js Link props (subset of most common ones)
export interface NextLinkProps {
  /** Prefetch the linked page */
  prefetch?: boolean;

  /** Scroll to top after navigation */
  scroll?: boolean;

  /** Replace current history state */
  replace?: boolean;

  /** Shallow routing */
  shallow?: boolean;

  /** Locale for internationalization */
  locale?: string | false;

  /** Legacy behavior */
  legacyBehavior?: boolean;

  /** Pass href to child */
  passHref?: boolean;
}

export type LinkVariant =
  | "default"
  | "primary"
  | "secondary"
  | "ghost"
  | "underline";
export type LinkSize = "sm" | "md" | "lg";
export type LinkUnderline = "none" | "hover" | "always";

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** URL to link to */
  href: string;

  /** Link content */
  children: React.ReactNode;

  /** Visual variant */
  variant?: LinkVariant;

  /** Size variant */
  size?: LinkSize;

  /** Underline behavior */
  underline?: LinkUnderline;

  /** Next.js specific props (ignored in non-Next.js environments) */
  nextProps?: NextLinkProps;

  /** Next.js Link component (for Next.js users to pass in) */
  NextLinkComponent?: React.ComponentType<any>;

  /** Whether the link is external (adds target="_blank" and rel="noopener noreferrer") */
  external?: boolean;

  /** Whether the link is disabled */
  disabled?: boolean;

  /** Whether to show an icon for external links */
  showExternalIcon?: boolean;

  /** Icon position for external links */
  externalIconPosition?: "left" | "right";

  /** Additional CSS classes */
  className?: string;

  /** Whether the link is currently active (for navigation) */
  active?: boolean;

  /** Icon to display with the link */
  icon?: React.ReactNode;

  /** Icon position */
  iconPosition?: "left" | "right";
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      children,
      variant = "default",
      size = "md",
      underline = "hover",
      nextProps,
      NextLinkComponent,
      external = false,
      disabled = false,
      showExternalIcon = external, // Show icon by default for external links
      externalIconPosition = "right",
      className = "",
      active = false,
      icon,
      iconPosition = "left",
      rel,
      target,
      style,
      onClick,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();

    // Determine if link is external
    const isExternal =
      external ||
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("//");

    // External link attributes
    const externalAttributes = isExternal
      ? {
          target: target || "_blank",
          rel: rel || "noopener noreferrer",
        }
      : {};

    // Size classes
    const getSizeClasses = () => {
      const sizeMap: Record<LinkSize, string> = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      };
      return sizeMap[size];
    };

    // Underline classes
    const getUnderlineClasses = () => {
      const underlineMap: Record<LinkUnderline, string> = {
        none: "no-underline",
        hover: "no-underline hover:underline",
        always: "underline",
      };
      return underlineMap[underline];
    };

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      const colors = theme.colors;

      switch (variant) {
        case "primary":
          return {
            color: colors.brand[500],
            fontWeight: "500",
          };

        case "secondary":
          return {
            color: colors.text.secondary,
            fontWeight: "normal",
          };

        case "ghost":
          return {
            color: colors.text.muted,
            fontWeight: "normal",
          };

        case "underline":
          return {
            color: colors.text.primary,
            textDecoration: "underline",
            textDecorationColor: colors.brand[300],
            textUnderlineOffset: "3px",
          };

        case "default":
        default:
          return {
            color: colors.brand[500],
            fontWeight: "normal",
          };
      }
    };

    // Active state styles
    const getActiveStyles = (): React.CSSProperties => {
      if (!active) return {};

      const colors = theme.colors;

      return {
        color: colors.brand[600],
        fontWeight: "600",
      };
    };

    // Disabled state styles
    const getDisabledStyles = (): React.CSSProperties => {
      if (!disabled) return {};

      const colors = theme.colors;

      return {
        color: colors.text.disabled,
        cursor: "not-allowed",
        opacity: 0.6,
        pointerEvents: "none",
      };
    };

    // Hover styles
    const getHoverStyles = (): React.CSSProperties => {
      if (disabled) return {};

      const colors = theme.colors;

      switch (variant) {
        case "primary":
          return {
            color: colors.brand[400],
          };

        case "secondary":
          return {
            color: colors.text.primary,
          };

        case "ghost":
          return {
            color: colors.text.secondary,
          };

        case "underline":
          return {
            textDecorationColor: colors.brand[500],
          };

        case "default":
        default:
          return {
            color: colors.brand[400],
          };
      }
    };

    // Base classes
    const baseClasses = [
      "inline-flex items-center gap-2",
      "transition-colors duration-200",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
      getSizeClasses(),
      getUnderlineClasses(),
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Focus ring style
    const focusRingStyle = {
      "--tw-ring-color": theme.colors.focusRing,
      "--tw-ring-offset-color": theme.colors.background,
    } as React.CSSProperties;

    // Combined styles
    const linkStyle: React.CSSProperties = {
      ...getVariantStyles(),
      ...getActiveStyles(),
      ...getDisabledStyles(),
      ...focusRingStyle,
      ...style,
    };

    // State for hover
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseEnter = () => {
      if (!disabled) setIsHovered(true);
    };

    const handleMouseLeave = () => {
      if (!disabled) setIsHovered(false);
    };

    // Apply hover styles
    const hoverStyle = isHovered && !disabled ? getHoverStyles() : {};

    // External icon
    const renderExternalIcon = () => {
      if (!isExternal || !showExternalIcon) return null;

      return (
        <svg
          className="inline-block ml-1"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            color: "currentColor",
            opacity: 0.7,
          }}
        >
          <path
            d="M10.5 1.5H7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 3L10.5 1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 1.5H3C2.17157 1.5 1.5 2.17157 1.5 3V9C1.5 9.82843 2.17157 10.5 3 10.5H9C9.82843 10.5 10.5 9.82843 10.5 9V6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    };

    // Icon wrapper
    const renderWithIcon = (content: React.ReactNode) => {
      if (!icon) return content;

      const iconElement = (
        <span
          className="inline-flex items-center"
          style={{ fontSize: "0.875em" }}
        >
          {icon}
        </span>
      );

      return (
        <>
          {iconPosition === "left" && iconElement}
          {content}
          {iconPosition === "right" && iconElement}
        </>
      );
    };

    // Link content
    const linkContent = (
      <>
        {renderWithIcon(children)}
        {externalIconPosition === "left" && renderExternalIcon()}
        {externalIconPosition === "right" && renderExternalIcon()}
      </>
    );

    // Handle click with disabled state
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      if (onClick) onClick(e);
    };

    // If NextLinkComponent is provided and it's not an external link, use it
    if (NextLinkComponent && !isExternal && !disabled) {
      return (
        <NextLinkComponent
          href={href}
          ref={ref}
          className={baseClasses}
          style={{ ...linkStyle, ...hoverStyle }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          {...nextProps}
          {...props}
        >
          {linkContent}
        </NextLinkComponent>
      );
    }

    // Regular anchor tag for external links or when NextLinkComponent is not provided
    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        className={baseClasses}
        style={{ ...linkStyle, ...hoverStyle }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        {...externalAttributes}
        {...props}
      >
        {linkContent}
      </a>
    );
  }
);

Link.displayName = "Link";

// Pre-configured variants
export const PrimaryLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<LinkProps, "variant">
>((props, ref) => <Link ref={ref} variant="primary" {...props} />);
PrimaryLink.displayName = "PrimaryLink";

export const SecondaryLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<LinkProps, "variant">
>((props, ref) => <Link ref={ref} variant="secondary" {...props} />);
SecondaryLink.displayName = "SecondaryLink";

export const GhostLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<LinkProps, "variant">
>((props, ref) => <Link ref={ref} variant="ghost" {...props} />);
GhostLink.displayName = "GhostLink";

export const UnderlineLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<LinkProps, "variant" | "underline">
>((props, ref) => (
  <Link ref={ref} variant="underline" underline="always" {...props} />
));
UnderlineLink.displayName = "UnderlineLink";

export const SmallLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<LinkProps, "size">
>((props, ref) => <Link ref={ref} size="sm" {...props} />);
SmallLink.displayName = "SmallLink";

export const LargeLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<LinkProps, "size">
>((props, ref) => <Link ref={ref} size="lg" {...props} />);
LargeLink.displayName = "LargeLink";

export const ExternalLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<LinkProps, "external" | "showExternalIcon">
>((props, ref) => (
  <Link ref={ref} external={true} showExternalIcon={true} {...props} />
));
ExternalLink.displayName = "ExternalLink";

export const DisabledLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<LinkProps, "disabled">
>((props, ref) => <Link ref={ref} disabled={true} {...props} />);
DisabledLink.displayName = "DisabledLink";

export const IconLink = React.forwardRef<
  HTMLAnchorElement,
  LinkProps & {
    icon: React.ReactNode;
    iconPosition?: "left" | "right";
  }
>(({ icon, iconPosition = "left", ...props }, ref) => (
  <Link ref={ref} icon={icon} iconPosition={iconPosition} {...props} />
));
IconLink.displayName = "IconLink";

// Navigation Link (for active states)
export interface NavLinkProps extends Omit<LinkProps, "active"> {
  /** Whether the link is active (usually determined by router) */
  isActive?: boolean;

  /** Active link variant */
  activeVariant?: LinkVariant;
}

export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    {
      isActive = false,
      activeVariant = "primary",
      variant = "default",
      ...props
    },
    ref
  ) => (
    <Link
      ref={ref}
      variant={isActive ? activeVariant : variant}
      active={isActive}
      {...props}
    />
  )
);
NavLink.displayName = "NavLink";

// Next.js optimized wrapper
export interface NextLinkWrapperProps extends LinkProps {
  /** Next.js Link component (should be imported by user) */
  NextLinkComponent: React.ComponentType<any>;
}

export const NextLinkWrapper = React.forwardRef<
  HTMLAnchorElement,
  NextLinkWrapperProps
>(({ NextLinkComponent, nextProps = {}, ...linkProps }, ref) => {
  return (
    <Link
      ref={ref}
      NextLinkComponent={NextLinkComponent}
      nextProps={nextProps}
      {...linkProps}
    />
  );
});

NextLinkWrapper.displayName = "NextLinkWrapper";
