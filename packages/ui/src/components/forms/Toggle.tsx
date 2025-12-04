// packages/ui/src/components/Toggle.tsx
import React, { forwardRef, useId, useState } from "react";
import { useTheme } from "../../contexts/themeContext";

interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "ghost";
  withIcon?: boolean;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      disabled = false,
      size = "md",
      variant = "default",
      withIcon = false,
      className = "",
      checked,
      onChange,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const id = useId();
    const toggleId = props.id || `toggle-${id}`;
    const [isHovered, setIsHovered] = useState(false);

    // Size configurations
    const sizeConfig = {
      sm: {
        track: "w-10 h-5",
        thumb: "w-4 h-4",
        thumbTranslate: "translate-x-5",
        label: "text-sm",
        icon: "w-3 h-3",
      },
      md: {
        track: "w-12 h-6",
        thumb: "w-5 h-5",
        thumbTranslate: "translate-x-6",
        label: "text-base",
        icon: "w-4 h-4",
      },
      lg: {
        track: "w-14 h-7",
        thumb: "w-6 h-6",
        thumbTranslate: "translate-x-7",
        label: "text-lg",
        icon: "w-5 h-5",
      },
    };

    // Get track (background) styles
    const getTrackStyles = () => {
      const colors = theme.colors;

      if (disabled) {
        return {
          backgroundColor: colors.backgroundSubtle,
          borderColor: colors.surfaceBorder,
          cursor: "not-allowed",
        };
      }

      if (error) {
        if (checked) {
          return {
            backgroundColor: colors.error,
            borderColor: colors.error,
          };
        }
        return {
          backgroundColor: colors.error + "20",
          borderColor: colors.error,
        };
      }

      if (success) {
        if (checked) {
          return {
            backgroundColor: colors.success,
            borderColor: colors.success,
          };
        }
        return {
          backgroundColor: colors.success + "20",
          borderColor: colors.success,
        };
      }

      if (checked) {
        return {
          backgroundColor: colors.brand[500],
          borderColor: colors.brand[500],
        };
      }

      // Default/off state
      switch (variant) {
        case "outline":
          return {
            backgroundColor: "transparent",
            borderColor: colors.border,
          };
        case "ghost":
          return {
            backgroundColor: colors.surfaceHover,
            borderColor: "transparent",
          };
        case "default":
        default:
          return {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          };
      }
    };

    // Get thumb (slider) styles
    const getThumbStyles = () => {
      const colors = theme.colors;

      if (disabled) {
        return {
          backgroundColor: colors.text.disabled,
        };
      }

      if (error && checked) {
        return {
          backgroundColor: colors.background,
        };
      }

      if (success && checked) {
        return {
          backgroundColor: colors.background,
        };
      }

      if (checked) {
        return {
          backgroundColor: colors.brand[600],
        };
      }

      // Default/off state
      return {
        backgroundColor: colors.text.secondary,
      };
    };

    // Get hover styles
    const getHoverStyles = () => {
      if (disabled) return {};

      const colors = theme.colors;

      if (error) {
        return {
          boxShadow: `0 0 0 3px ${colors.error}20`,
        };
      }

      if (success) {
        return {
          boxShadow: `0 0 0 3px ${colors.success}20`,
        };
      }

      if (checked) {
        return {
          boxShadow: `0 0 0 3px ${colors.brand[100]}`,
        };
      }

      return {
        borderColor: colors.borderHover,
      };
    };

    // Get focus styles
    const getFocusStyles = () => {
      const colors = theme.colors;

      if (error) return { outlineColor: colors.error };
      if (success) return { outlineColor: colors.success };

      return { outlineColor: colors.focusRing };
    };

    // Get label text color
    const getLabelColor = () => {
      if (disabled) return theme.colors.text.disabled;
      if (error) return theme.colors.error;
      if (success) return theme.colors.success;
      return theme.colors.text.primary;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
    };

    // Icon for on/off states
    const Icon = () => {
      if (!withIcon) return null;

      const colors = theme.colors;
      const iconColor = disabled
        ? colors.text.disabled
        : checked
        ? colors.brand[600]
        : colors.text.muted;

      return checked ? (
        // Check icon for on state
        <svg
          className={sizeConfig[size].icon}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        // X icon for off state
        <svg
          className={sizeConfig[size].icon}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      );
    };

    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        <div className="flex items-start gap-3">
          {/* Hidden native checkbox input (toggle is a styled checkbox) */}
          <input
            ref={ref}
            type="checkbox"
            id={toggleId}
            className="sr-only"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              helperText ? `${toggleId}-description` : undefined
            }
            {...props}
          />

          {/* Custom toggle container */}
          <label
            htmlFor={toggleId}
            className={`
              relative
              flex-shrink-0
              ${sizeConfig[size].track}
              rounded-full
              border
              transition-all
              duration-200
              cursor-pointer
              ${disabled ? "cursor-not-allowed" : ""}
              flex
              items-center
              px-1
            `}
            style={{
              ...getTrackStyles(),
              ...getFocusStyles(),
            }}
            onMouseEnter={() => !disabled && setIsHovered(true)}
            onMouseLeave={() => !disabled && setIsHovered(false)}
          >
            {/* Thumb (slider circle) */}
            <div
              className={`
                ${sizeConfig[size].thumb}
                rounded-full
                transition-all
                duration-200
                flex
                items-center
                justify-center
                ${checked ? sizeConfig[size].thumbTranslate : "translate-x-0"}
              `}
              style={{
                ...getThumbStyles(),
                ...(isHovered ? getHoverStyles() : {}),
              }}
            >
              {withIcon && <Icon />}
            </div>
          </label>

          {/* Label and helper text */}
          <div className="flex flex-col gap-1">
            {label && (
              <label
                htmlFor={toggleId}
                className={`${
                  sizeConfig[size].label
                } font-medium leading-tight cursor-pointer ${
                  disabled ? "cursor-not-allowed" : ""
                }`}
                style={{ color: getLabelColor() }}
              >
                {label}
                {props.required && (
                  <span className="ml-1" style={{ color: theme.colors.error }}>
                    *
                  </span>
                )}
              </label>
            )}

            {helperText && (
              <p
                id={`${toggleId}-description`}
                className="text-sm"
                style={{
                  color: error
                    ? theme.colors.error
                    : disabled
                    ? theme.colors.text.disabled
                    : theme.colors.text.muted,
                }}
              >
                {helperText}
              </p>
            )}

            {error && (
              <p className="text-sm" style={{ color: theme.colors.error }}>
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Toggle.displayName = "Toggle";

// Toggle Group Component (for related toggles)
interface ToggleGroupProps {
  children: React.ReactNode;
  label?: string;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  className?: string;
  orientation?: "vertical" | "horizontal";
}

export const ToggleGroup = ({
  children,
  label,
  error,
  success,
  disabled,
  className = "",
  orientation = "vertical",
}: ToggleGroupProps) => {
  const { theme } = useTheme();

  // Clone children with additional props
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === Toggle) {
      return React.cloneElement(child, {
        disabled: disabled || child.props.disabled,
        error: error || child.props.error,
        success: success || child.props.success,
      } as Partial<ToggleProps>);
    }
    return child;
  });

  const orientationClasses =
    orientation === "horizontal" ? "flex flex-wrap gap-4" : "space-y-3";

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label
          className="text-base font-semibold"
          style={{
            color: disabled
              ? theme.colors.text.disabled
              : error
              ? theme.colors.error
              : success
              ? theme.colors.success
              : theme.colors.text.primary,
          }}
        >
          {label}
        </label>
      )}

      <div className={orientationClasses}>{enhancedChildren}</div>

      {error && (
        <p className="text-sm" style={{ color: theme.colors.error }}>
          {error}
        </p>
      )}
    </div>
  );
};

ToggleGroup.displayName = "ToggleGroup";
