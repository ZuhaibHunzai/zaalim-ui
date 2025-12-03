import React, { forwardRef } from "react";
import { useTheme } from "../../contexts/themeContext";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "outline" | "filled" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      fullWidth = false,
      leftIcon,
      rightIcon,
      variant = "outline",
      size = "md",
      className = "",
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();

    // Size classes
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-base",
      lg: "px-5 py-3 text-lg",
    };

    // Variant styles
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

      return { outlineColor: colors.focusRing };
    };

    const baseClasses = `
      rounded-lg
      transition-all
      duration-200
      focus:outline-none
      focus:outline-2
      focus:outline-offset-2
      ${sizeClasses[size]}
      ${fullWidth ? "w-full" : ""}
      ${disabled ? "cursor-not-allowed opacity-60" : ""}
      ${className}
    `
      .replace(/\s+/g, " ")
      .trim();

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

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              style={{
                color: disabled
                  ? theme.colors.text.disabled
                  : theme.colors.text.muted,
              }}
            >
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            className={`
              ${baseClasses}
              ${leftIcon ? "pl-10" : ""}
              ${rightIcon ? "pr-10" : ""}
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
            aria-invalid={!!error}
            aria-describedby={
              helperText || error
                ? `input-${props.name || props.id}-description`
                : undefined
            }
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              style={{
                color: disabled
                  ? theme.colors.text.disabled
                  : theme.colors.text.muted,
              }}
            >
              {rightIcon}
            </div>
          )}

          {/* Success/Error Icon */}
          {(error || success) && !rightIcon && (
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              style={{
                color: error ? theme.colors.error : theme.colors.success,
              }}
            >
              {error ? "✗" : "✓"}
            </div>
          )}
        </div>

        {/* Helper Text or Error Message */}
        {(helperText || error) && (
          <p
            id={`input-${props.name || props.id}-description`}
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

Input.displayName = "Input";

// Textarea Component
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  fullWidth?: boolean;
  variant?: "outline" | "filled" | "ghost";
  size?: "sm" | "md" | "lg";
  rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      fullWidth = false,
      variant = "outline",
      size = "md",
      className = "",
      disabled,
      required,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();

    // Size classes
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-base",
      lg: "px-5 py-3 text-lg",
    };

    // Variant styles (same as Input)
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

      return { outlineColor: colors.focusRing };
    };

    const baseClasses = `
      rounded-lg
      transition-all
      duration-200
      focus:outline-none
      focus:outline-2
      focus:outline-offset-2
      resize-y
      min-h-[80px]
      ${sizeClasses[size]}
      ${fullWidth ? "w-full" : ""}
      ${disabled ? "cursor-not-allowed opacity-60" : ""}
      ${className}
    `
      .replace(/\s+/g, " ")
      .trim();

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

        {/* Textarea */}
        <textarea
          ref={ref}
          className={`
            ${baseClasses}
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
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={
            helperText || error
              ? `textarea-${props.name || props.id}-description`
              : undefined
          }
          {...props}
        />

        {/* Helper Text or Error Message */}
        {(helperText || error) && (
          <p
            id={`textarea-${props.name || props.id}-description`}
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

Textarea.displayName = "Textarea";
