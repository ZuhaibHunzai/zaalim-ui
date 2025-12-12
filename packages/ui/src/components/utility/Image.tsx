// packages/ui/src/components/utility/Image.tsx
import React, { useState } from "react";
import { useTheme } from "../../contexts/themeContext";

// Next.js Image props (subset of most common ones)
export interface NextImageProps {
  /** Priority loading */
  priority?: boolean;

  /** Loading behavior */
  loading?: "lazy" | "eager";

  /** Quality (1-100) */
  quality?: number;

  /** Layout behavior */
  layout?: "fill" | "fixed" | "intrinsic" | "responsive";

  /** Object fit */
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";

  /** Object position */
  objectPosition?: string;

  /** Placeholder */
  placeholder?: "blur" | "empty";

  /** Blur data URL */
  blurDataURL?: string;

  /** Sizes attribute */
  sizes?: string;

  /** Image loader */
  loader?: (resolverProps: any) => string;
}

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  /** Image source URL */
  src: string;

  /** Alternative text (required for accessibility) */
  alt: string;

  /** Width of the image */
  width?: number | string;

  /** Height of the image */
  height?: number | string;

  /** Next.js specific props (ignored in non-Next.js environments) */
  nextProps?: NextImageProps;

  /** Fallback image source if main image fails to load */
  fallbackSrc?: string;

  /** Loading state component */
  loadingComponent?: React.ReactNode;

  /** Error state component */
  errorComponent?: React.ReactNode;

  /** Whether to show a skeleton loader while loading */
  showSkeleton?: boolean;

  /** Aspect ratio (e.g., "16/9", "4/3", "1/1") */
  aspectRatio?: string;

  /** Border radius */
  radius?: "none" | "sm" | "md" | "lg" | "full" | number;

  /** Image fit */
  fit?: "cover" | "contain" | "fill" | "none" | "scale-down";

  /** Background color while loading (defaults to surface from theme) */
  backgroundColor?: string;

  /** Whether the image is clickable (for lightbox/zoom) */
  clickable?: boolean;

  /** Whether to show a border */
  bordered?: boolean;

  /** Shadow variant */
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      nextProps,
      fallbackSrc,
      loadingComponent,
      errorComponent,
      showSkeleton = false,
      aspectRatio,
      radius = "none",
      fit = "cover",
      backgroundColor,
      clickable = false,
      bordered = false,
      shadow = "none",
      className = "",
      style,
      onLoad,
      onError,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);

    // Handle image load
    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setIsLoading(false);
      setHasError(false);
      if (onLoad) onLoad(e);
    };

    // Handle image error
    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setIsLoading(false);

      // Try fallback if provided
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        setHasError(false);
      } else {
        setHasError(true);
      }

      if (onError) onError(e);
    };

    // Calculate aspect ratio style
    const getAspectRatioStyle = (): React.CSSProperties => {
      if (!aspectRatio) return {};

      const [widthRatio, heightRatio] = aspectRatio.split("/").map(Number);
      const ratio = heightRatio / widthRatio;

      return {
        position: "relative",
        paddingBottom: `${ratio * 100}%`,
      };
    };

    // Get border radius
    const getBorderRadius = (): string => {
      if (typeof radius === "number") return `${radius}px`;

      const radiusMap: Record<string, string> = {
        none: "0",
        sm: "0.25rem",
        md: "0.5rem",
        lg: "1rem",
        full: "9999px",
      };

      return radiusMap[radius] || "0";
    };

    // Get shadow style
    const getShadowStyle = (): React.CSSProperties => {
      const shadowMap: Record<string, string> = {
        none: "none",
        sm: `0 1px 2px 0 ${theme.colors.overlay}10`,
        md: `0 4px 6px -1px ${theme.colors.overlay}15`,
        lg: `0 10px 15px -3px ${theme.colors.overlay}20`,
        xl: `0 20px 25px -5px ${theme.colors.overlay}25`,
      };

      return { boxShadow: shadowMap[shadow] };
    };

    // Get object fit style
    const getObjectFit = (): React.CSSProperties => {
      return { objectFit: fit };
    };

    // Get background color
    const getBackgroundColor = (): string => {
      return backgroundColor || theme.colors.surface;
    };

    // Container classes
    const containerClasses = [
      "overflow-hidden",
      "transition-all duration-200",
      clickable ? "cursor-pointer hover:scale-[1.02]" : "",
      bordered ? "border" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Container styles
    const containerStyle: React.CSSProperties = {
      borderRadius: getBorderRadius(),
      backgroundColor: getBackgroundColor(),
      borderColor: bordered ? theme.colors.surfaceBorder : "transparent",
      width: width || "auto",
      height: height || "auto",
      ...getAspectRatioStyle(),
      ...getShadowStyle(),
      ...style,
    };

    // Image styles
    const imageStyle: React.CSSProperties = {
      width: "100%",
      height: "100%",
      borderRadius: getBorderRadius(),
      ...getObjectFit(),
    };

    // Aspect ratio wrapper
    const renderAspectRatioWrapper = (children: React.ReactNode) => {
      if (!aspectRatio) return children;

      return (
        <div style={getAspectRatioStyle()}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            {children}
          </div>
        </div>
      );
    };

    // Loading state
    if (isLoading && showSkeleton) {
      return (
        <div
          className={containerClasses}
          style={{
            ...containerStyle,
            backgroundColor: theme.colors.surfaceHover,
          }}
        />
      );
    }

    if (isLoading && loadingComponent) {
      return <>{loadingComponent}</>;
    }

    // Error state
    if (hasError && errorComponent) {
      return <>{errorComponent}</>;
    }

    if (hasError) {
      return (
        <div
          className={`${containerClasses} flex items-center justify-center`}
          style={{
            ...containerStyle,
            backgroundColor: theme.colors.surfaceHover,
            color: theme.colors.text.muted,
          }}
        >
          <div className="text-center p-4">
            <svg
              className="w-8 h-8 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Image failed to load</p>
          </div>
        </div>
      );
    }

    // Render image
    const imageElement = (
      <img
        ref={ref}
        src={currentSrc}
        alt={alt}
        style={imageStyle}
        className="transition-opacity duration-300"
        onLoad={handleLoad}
        onError={handleError}
        loading={nextProps?.loading || "lazy"}
        {...props}
      />
    );

    const wrappedImage = aspectRatio
      ? renderAspectRatioWrapper(imageElement)
      : imageElement;

    return (
      <div className={containerClasses} style={containerStyle}>
        {wrappedImage}
      </div>
    );
  }
);

Image.displayName = "Image";

// Pre-configured variants
export const RoundedImage = React.forwardRef<
  HTMLImageElement,
  Omit<ImageProps, "radius">
>((props, ref) => <Image ref={ref} radius="md" {...props} />);
RoundedImage.displayName = "RoundedImage";

export const CircleImage = React.forwardRef<
  HTMLImageElement,
  Omit<ImageProps, "radius">
>((props, ref) => <Image ref={ref} radius="full" {...props} />);
CircleImage.displayName = "CircleImage";

export const BorderedImage = React.forwardRef<
  HTMLImageElement,
  Omit<ImageProps, "bordered">
>((props, ref) => <Image ref={ref} bordered={true} {...props} />);
BorderedImage.displayName = "BorderedImage";

export const CoverImage = React.forwardRef<
  HTMLImageElement,
  Omit<ImageProps, "fit">
>((props, ref) => <Image ref={ref} fit="cover" {...props} />);
CoverImage.displayName = "CoverImage";

export const ContainImage = React.forwardRef<
  HTMLImageElement,
  Omit<ImageProps, "fit">
>((props, ref) => <Image ref={ref} fit="contain" {...props} />);
ContainImage.displayName = "ContainImage";

// Aspect ratio presets
export const SquareImage = React.forwardRef<
  HTMLImageElement,
  Omit<ImageProps, "aspectRatio">
>((props, ref) => <Image ref={ref} aspectRatio="1/1" {...props} />);
SquareImage.displayName = "SquareImage";

export const WidescreenImage = React.forwardRef<
  HTMLImageElement,
  Omit<ImageProps, "aspectRatio">
>((props, ref) => <Image ref={ref} aspectRatio="16/9" {...props} />);
WidescreenImage.displayName = "WidescreenImage";

export const PortraitImage = React.forwardRef<
  HTMLImageElement,
  Omit<ImageProps, "aspectRatio">
>((props, ref) => <Image ref={ref} aspectRatio="3/4" {...props} />);
PortraitImage.displayName = "PortraitImage";

// Next.js wrapper component (optional)
export interface NextImageWrapperProps extends ImageProps {
  /** Next.js Image component (should be imported by user) */
  NextImageComponent?: React.ComponentType<any>;
}

export const NextImageWrapper = React.forwardRef<
  HTMLImageElement,
  NextImageWrapperProps
>(({ NextImageComponent, nextProps = {}, ...imageProps }, ref) => {
  // If NextImageComponent is provided, use it
  if (NextImageComponent) {
    return (
      <NextImageComponent
        ref={ref}
        src={imageProps.src}
        alt={imageProps.alt}
        width={imageProps.width as number}
        height={imageProps.height as number}
        {...nextProps}
        style={{
          borderRadius: imageProps.radius
            ? getBorderRadius(imageProps.radius)
            : undefined,
          ...imageProps.style,
        }}
        className={imageProps.className}
      />
    );
  }

  // Fallback to regular Image component
  return <Image ref={ref} {...imageProps} nextProps={nextProps} />;
});

NextImageWrapper.displayName = "NextImageWrapper";

// Helper function for border radius (used in NextImageWrapper)
const getBorderRadius = (radius: ImageProps["radius"]): string => {
  if (typeof radius === "number") return `${radius}px`;

  const radiusMap: Record<string, string> = {
    none: "0",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    full: "9999px",
  };

  return radiusMap[radius || "none"] || "0";
};
