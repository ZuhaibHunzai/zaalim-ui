// packages/ui/src/components/Select.tsx
import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
} from "react";
import { useTheme } from "../../contexts/themeContext";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  variant?: "outline" | "filled" | "ghost";
  size?: "sm" | "md" | "lg";
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props, forwardedRef) => {
    const {
      label,
      helperText,
      error,
      success,
      fullWidth = false,
      leftIcon,
      variant = "outline",
      size = "md",
      className = "",
      disabled,
      required,
      options,
      placeholder = "Select an option",
      value,
      onChange,
      ...restProps
    } = props;

    const { theme } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value || "");
    const internalRef = useRef<HTMLSelectElement>(null);

    // Use useImperativeHandle to handle ref forwarding properly
    useImperativeHandle(forwardedRef, () => internalRef.current!);

    // Sync internal value with external value prop
    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    // Size classes
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-base",
      lg: "px-5 py-3 text-lg",
    };

    // Variant styles (consistent with Input component)
    const getVariantStyles = () => {
      const colors = theme.colors;

      if (disabled) {
        return {
          backgroundColor: colors.backgroundSubtle,
          borderColor: colors.surfaceBorder,
          color: colors.text.disabled,
        };
      }

      if (error) {
        switch (variant) {
          case "filled":
            return {
              backgroundColor: colors.error + "10",
              border: `1px solid ${colors.error}`,
              color: colors.text.primary,
            };
          case "ghost":
            return {
              backgroundColor: "transparent",
              borderBottom: `2px solid ${colors.error}`,
              color: colors.text.primary,
            };
          case "outline":
          default:
            return {
              backgroundColor: colors.background,
              border: `2px solid ${colors.error}`,
              color: colors.text.primary,
            };
        }
      }

      if (success) {
        switch (variant) {
          case "filled":
            return {
              backgroundColor: colors.success + "10",
              border: `1px solid ${colors.success}`,
              color: colors.text.primary,
            };
          case "ghost":
            return {
              backgroundColor: "transparent",
              borderBottom: `2px solid ${colors.success}`,
              color: colors.text.primary,
            };
          case "outline":
          default:
            return {
              backgroundColor: colors.background,
              border: `1px solid ${colors.success}`,
              color: colors.text.primary,
            };
        }
      }

      switch (variant) {
        case "filled":
          return {
            backgroundColor: colors.surfaceHover,
            border: `1px solid ${colors.surfaceBorder}`,
            color: colors.text.primary,
          };
        case "ghost":
          return {
            backgroundColor: "transparent",
            borderBottom: `1px solid ${colors.border}`,
            color: colors.text.primary,
          };
        case "outline":
        default:
          return {
            backgroundColor: colors.background,
            border: `1px solid ${colors.border}`,
            color: colors.text.primary,
          };
      }
    };

    const getFocusStyles = () => {
      const colors = theme.colors;

      if (error) return { outlineColor: colors.error };
      if (success) return { outlineColor: colors.success };

      return {
        outlineColor: colors.focusRing,
        borderColor: isFocused ? colors.borderHover : colors.border,
      };
    };

    const baseClasses = `
      rounded-lg
      transition-all
      duration-200
      focus:outline-none
      focus:outline-2
      focus:outline-offset-2
      appearance-none
      ${sizeClasses[size]}
      ${fullWidth ? "w-full" : ""}
      ${disabled ? "cursor-not-allowed opacity-60" : ""}
      ${className}
    `
      .replace(/\s+/g, " ")
      .trim();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setInternalValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(true);
      if (restProps.onFocus) restProps.onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(false);
      if (restProps.onBlur) restProps.onBlur(e);
    };

    // Custom dropdown arrow icon using theme colors
    const DropdownIcon = () => (
      <svg
        className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 6L8 10L12 6"
          stroke={
            disabled ? theme.colors.text.disabled : theme.colors.text.muted
          }
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    const selectedOption = options.find((opt) => opt.value === internalValue);

    return (
      <div className={`flex flex-col gap-1.5 ${fullWidth ? "w-full" : ""}`}>
        {/* Label */}
        {label && (
          <label
            className="text-sm font-medium"
            style={{
              color: disabled
                ? theme.colors.text.disabled
                : theme.colors.text.primary,
            }}
          >
            {label}
            {required && (
              <span className="ml-1" style={{ color: theme.colors.error }}>
                *
              </span>
            )}
          </label>
        )}

        {/* Select Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div
              className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
              style={{
                color: disabled
                  ? theme.colors.text.disabled
                  : theme.colors.text.muted,
              }}
            >
              {leftIcon}
            </div>
          )}

          {/* Native Select Element */}
          <select
            ref={internalRef}
            className={`
              ${baseClasses}
              ${leftIcon ? "pl-10" : ""}
              pr-10
              cursor-pointer
              ${
                variant === "ghost"
                  ? "rounded-none border-t-0 border-l-0 border-r-0"
                  : ""
              }
            `}
            style={{
              ...getVariantStyles(),
              ...getFocusStyles(),
            }}
            disabled={disabled}
            required={required}
            value={internalValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-invalid={!!error}
            aria-describedby={
              helperText || error
                ? `select-${restProps.name || restProps.id}-description`
                : undefined
            }
            {...restProps}
          >
            {/* Placeholder option */}
            <option value="" disabled>
              {placeholder}
            </option>

            {/* Map through options */}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                style={{
                  color: option.disabled
                    ? theme.colors.text.disabled
                    : theme.colors.text.primary,
                  backgroundColor: theme.colors.background,
                }}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom Dropdown Arrow */}
          <DropdownIcon />

          {/* Success/Error Icon */}
          {(error || success) && (
            <div
              className="absolute right-10 top-1/2 transform -translate-y-1/2"
              style={{
                color: error ? theme.colors.error : theme.colors.success,
              }}
            >
              {error ? "✗" : "✓"}
            </div>
          )}
        </div>

        {/* Selected value display (optional visual feedback) */}
        {selectedOption && !disabled && (
          <div className="flex items-center gap-2 mt-1">
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{
                backgroundColor: theme.colors.brand[100],
                color: theme.colors.brand[600],
              }}
            >
              Selected: {selectedOption.label}
            </span>
          </div>
        )}

        {/* Helper Text or Error Message */}
        {(helperText || error) && (
          <p
            id={`select-${restProps.name || restProps.id}-description`}
            className="text-sm"
            style={{
              color: error ? theme.colors.error : theme.colors.text.muted,
            }}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

// Export for easy use
export type { SelectOption };
