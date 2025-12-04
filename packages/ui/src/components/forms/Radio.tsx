// packages/ui/src/components/Radio.tsx
import React, { forwardRef, useId } from "react";
import { useTheme } from "../../contexts/themeContext";

interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      disabled = false,
      size = "md",
      className = "",
      checked,
      onChange,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const id = useId();
    const radioId = props.id || `radio-${id}`;

    // Size configurations
    const sizeConfig = {
      sm: {
        radio: "w-4 h-4",
        dot: "w-1.5 h-1.5",
        label: "text-sm",
      },
      md: {
        radio: "w-5 h-5",
        dot: "w-2.5 h-2.5",
        label: "text-base",
      },
      lg: {
        radio: "w-6 h-6",
        dot: "w-3.5 h-3.5",
        label: "text-lg",
      },
    };

    // Get radio base styles
    const getRadioStyles = () => {
      const colors = theme.colors;

      if (disabled) {
        return {
          backgroundColor: colors.backgroundSubtle,
          borderColor: colors.surfaceBorder,
          cursor: "not-allowed",
        };
      }

      if (error) {
        return {
          backgroundColor: colors.background,
          borderColor: colors.error,
          borderWidth: "2px",
        };
      }

      if (success) {
        return {
          backgroundColor: colors.background,
          borderColor: colors.success,
          borderWidth: "2px",
        };
      }

      // Default state
      return {
        backgroundColor: colors.background,
        borderColor: colors.border,
      };
    };

    // Get checked state styles
    const getCheckedStyles = () => {
      const colors = theme.colors;

      if (disabled) {
        return {
          backgroundColor: colors.text.disabled,
        };
      }

      if (error) {
        return {
          backgroundColor: colors.error,
        };
      }

      if (success) {
        return {
          backgroundColor: colors.success,
        };
      }

      // Default checked state
      return {
        backgroundColor: colors.brand[500],
      };
    };

    // Get hover styles
    const getHoverStyles = () => {
      if (disabled) return { borderColor: "", boxShadow: "" };

      const colors = theme.colors;

      if (error) {
        return {
          borderColor: colors.error,
          boxShadow: `0 0 0 3px ${colors.error}20`,
        };
      }

      if (success) {
        return {
          borderColor: colors.success,
          boxShadow: `0 0 0 3px ${colors.success}20`,
        };
      }

      return {
        borderColor: colors.brand[400],
        boxShadow: `0 0 0 3px ${colors.brand[100]}`,
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

    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        <div className="flex items-start gap-3">
          {/* Hidden native radio input */}
          <input
            ref={ref}
            type="radio"
            id={radioId}
            className="sr-only"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={helperText ? `${radioId}-description` : undefined}
            {...props}
          />

          {/* Custom radio container */}
          <label
            htmlFor={radioId}
            className={`
              relative
              flex-shrink-0
              ${sizeConfig[size].radio}
              rounded-full
              border
              transition-all
              duration-200
              cursor-pointer
              ${disabled ? "cursor-not-allowed" : ""}
              flex
              items-center
              justify-center
            `}
            style={{
              ...getRadioStyles(),
              ...getFocusStyles(),
            }}
            onMouseEnter={(e) => {
              if (!disabled) {
                const hoverStyles = getHoverStyles();
                e.currentTarget.style.borderColor = hoverStyles.borderColor;
                e.currentTarget.style.boxShadow = hoverStyles.boxShadow;
              }
            }}
            onMouseLeave={(e) => {
              if (!disabled) {
                const styles = getRadioStyles();
                e.currentTarget.style.borderColor =
                  styles.borderColor as string;
                e.currentTarget.style.boxShadow = "";
              }
            }}
          >
            {/* Inner dot for checked state */}
            {checked && (
              <div
                className={`${sizeConfig[size].dot} rounded-full`}
                style={getCheckedStyles()}
              />
            )}
          </label>

          {/* Label and helper text */}
          <div className="flex flex-col gap-1">
            {label && (
              <label
                htmlFor={radioId}
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
                id={`${radioId}-description`}
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

Radio.displayName = "Radio";

// Radio Group Component
interface RadioGroupProps {
  children: React.ReactNode;
  label?: string;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  className?: string;
  orientation?: "vertical" | "horizontal";
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
}

export const RadioGroup = ({
  children,
  label,
  error,
  success,
  disabled,
  className = "",
  orientation = "vertical",
  value,
  onChange,
  name,
  ...props
}: RadioGroupProps) => {
  const { theme } = useTheme();

  // Generate a name if not provided
  const groupName = name || `radio-group-${useId()}`;

  // Clone children with additional props
  const enhancedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && child.type === Radio) {
      const childValue = child.props.value?.toString() || index.toString();

      return React.cloneElement(child, {
        disabled: disabled || child.props.disabled,
        error: error || child.props.error,
        success: success || child.props.success,
        checked:
          value !== undefined ? childValue === value : child.props.checked,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          if (onChange) {
            onChange(childValue);
          }
          if (child.props.onChange) {
            child.props.onChange(e);
          }
        },
        name: groupName,
      } as Partial<RadioProps>);
    }
    return child;
  });

  const orientationClasses =
    orientation === "horizontal" ? "flex flex-wrap gap-4" : "space-y-3";

  return (
    <div className={`flex flex-col gap-2 ${className}`} {...props}>
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

RadioGroup.displayName = "RadioGroup";
