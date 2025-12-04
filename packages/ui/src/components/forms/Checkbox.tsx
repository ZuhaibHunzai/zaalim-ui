// packages/ui/src/components/Checkbox.tsx
import React, { forwardRef, useId } from "react";
import { useTheme } from "../../contexts/themeContext";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      disabled = false,
      indeterminate = false,
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
    const checkboxId = props.id || `checkbox-${id}`;

    // Size configurations
    const sizeConfig = {
      sm: {
        checkbox: "w-4 h-4",
        label: "text-sm",
        icon: "w-2.5 h-2.5",
      },
      md: {
        checkbox: "w-5 h-5",
        label: "text-base",
        icon: "w-3.5 h-3.5",
      },
      lg: {
        checkbox: "w-6 h-6",
        label: "text-lg",
        icon: "w-4 h-4",
      },
    };

    // Get checkbox base styles
    const getCheckboxStyles = () => {
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
          backgroundColor: checked ? colors.error : colors.background,
          borderColor: colors.error,
          borderWidth: "2px",
        };
      }

      if (success) {
        return {
          backgroundColor: checked ? colors.success : colors.background,
          borderColor: colors.success,
          borderWidth: "2px",
        };
      }

      // Default/checked state
      if (checked || indeterminate) {
        return {
          backgroundColor: colors.brand[500],
          borderColor: colors.brand[500],
        };
      }

      // Default/unchecked state
      return {
        backgroundColor: colors.background,
        borderColor: colors.border,
      };
    };

    // Get checkbox hover styles
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

    // Check icon SVG
    const CheckIcon = () => (
      <svg
        className={sizeConfig[size].icon}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="3"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );

    // Indeterminate icon SVG (minus sign)
    const IndeterminateIcon = () => (
      <svg
        className={sizeConfig[size].icon}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="3"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
      </svg>
    );

    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        <div className="flex items-start gap-3">
          {/* Hidden native checkbox */}
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className="sr-only"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              helperText ? `${checkboxId}-description` : undefined
            }
            {...props}
          />

          {/* Custom checkbox container */}
          <label
            htmlFor={checkboxId}
            className={`
              relative
              flex-shrink-0
              ${sizeConfig[size].checkbox}
              rounded
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
              ...getCheckboxStyles(),
              ...getFocusStyles(),
            }}
            onMouseEnter={(e) => {
              if (!disabled) {
                e.currentTarget.style.borderColor =
                  getHoverStyles().borderColor;
                e.currentTarget.style.boxShadow = getHoverStyles().boxShadow;
              }
            }}
            onMouseLeave={(e) => {
              if (!disabled) {
                const styles = getCheckboxStyles();
                e.currentTarget.style.borderColor =
                  styles.borderColor as string;
                e.currentTarget.style.boxShadow = "";
              }
            }}
          >
            {/* Check/Indeterminate icon */}
            {(checked || indeterminate) && (
              <div
                style={{
                  color: disabled
                    ? theme.colors.text.disabled
                    : theme.colors.brand[600],
                }}
              >
                {indeterminate ? <IndeterminateIcon /> : <CheckIcon />}
              </div>
            )}
          </label>

          {/* Label and helper text */}
          <div className="flex flex-col gap-1">
            {label && (
              <label
                htmlFor={checkboxId}
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
                id={`${checkboxId}-description`}
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

Checkbox.displayName = "Checkbox";

// Checkbox Group Component
interface CheckboxGroupProps {
  children: React.ReactNode;
  label?: string;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  className?: string;
  orientation?: "vertical" | "horizontal";
}

export const CheckboxGroup = ({
  children,
  label,
  error,
  success,
  disabled,
  className = "",
  orientation = "vertical",
}: CheckboxGroupProps) => {
  const { theme } = useTheme();

  // Clone children with additional props
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === Checkbox) {
      return React.cloneElement(child, {
        disabled: disabled || child.props.disabled,
        error: error || child.props.error,
        success: success || child.props.success,
      } as Partial<CheckboxProps>);
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

CheckboxGroup.displayName = "CheckboxGroup";
