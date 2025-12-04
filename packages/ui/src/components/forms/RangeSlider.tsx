// packages/ui/src/components/Slider.tsx
import React, { forwardRef, useId, useState, useRef, useEffect } from "react";
import { useTheme } from "../../contexts/themeContext";

interface SliderProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "onChange"
  > {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled" | "ghost";
  showValue?: boolean;
  valueLabel?: (value: number) => string;
  marks?: { value: number; label?: string }[];
  step?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  onChangeComplete?: (value: number) => void;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      disabled = false,
      size = "md",
      variant = "default",
      showValue = false,
      valueLabel,
      marks = [],
      step = 1,
      min = 0,
      max = 100,
      value: controlledValue,
      defaultValue,
      onChange,
      onChangeComplete,
      className = "",
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const id = useId();
    const sliderId = props.id || `slider-${id}`;
    const [internalValue, setInternalValue] = useState(
      controlledValue !== undefined
        ? Number(controlledValue)
        : Number(defaultValue || min)
    );
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | undefined>(undefined); // Changed from NodeJS.Timeout

    // Sync with controlled value
    useEffect(() => {
      if (controlledValue !== undefined) {
        setInternalValue(Number(controlledValue));
      }
    }, [controlledValue]);

    // Size configurations
    const sizeConfig = {
      sm: {
        track: "h-1.5",
        thumb: "w-4 h-4",
        label: "text-sm",
        mark: "w-1 h-1",
      },
      md: {
        track: "h-2",
        thumb: "w-5 h-5",
        label: "text-base",
        mark: "w-1.5 h-1.5",
      },
      lg: {
        track: "h-2.5",
        thumb: "w-6 h-6",
        label: "text-lg",
        mark: "w-2 h-2",
      },
    };

    // Calculate percentage for positioning
    const percentage = ((internalValue - min) / (max - min)) * 100;

    // Get track (background) styles
    const getTrackStyles = () => {
      const colors = theme.colors;

      if (disabled) {
        return {
          backgroundColor: colors.surfaceBorder,
        };
      }

      if (error) {
        return {
          backgroundColor: colors.error + "30",
        };
      }

      if (success) {
        return {
          backgroundColor: colors.success + "30",
        };
      }

      switch (variant) {
        case "filled":
          return {
            backgroundColor: colors.surfaceHover,
          };
        case "ghost":
          return {
            backgroundColor: colors.backgroundSubtle,
          };
        case "default":
        default:
          return {
            backgroundColor: colors.surface,
          };
      }
    };

    // Get filled track (progress) styles
    const getFilledTrackStyles = () => {
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

      return {
        backgroundColor: colors.brand[500],
      };
    };

    // Get thumb (handle) styles
    const getThumbStyles = () => {
      const colors = theme.colors;

      if (disabled) {
        return {
          backgroundColor: colors.text.disabled,
          borderColor: colors.surfaceBorder,
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

      return {
        backgroundColor: colors.background,
        borderColor: colors.brand[500],
        borderWidth: "2px",
      };
    };

    // Get hover styles for thumb
    const getThumbHoverStyles = () => {
      if (disabled) return {};

      const colors = theme.colors;

      if (error) {
        return {
          boxShadow: `0 0 0 6px ${colors.error}20`,
        };
      }

      if (success) {
        return {
          boxShadow: `0 0 0 6px ${colors.success}20`,
        };
      }

      return {
        boxShadow: `0 0 0 6px ${colors.brand[100]}`,
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
      const newValue = Number(e.target.value);
      setInternalValue(newValue);

      if (onChange) {
        onChange(newValue);
      }

      // Debounce onChangeComplete
      if (onChangeComplete) {
        if (timeoutRef.current !== undefined) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
          // Use window.setTimeout
          onChangeComplete(newValue);
        }, 150);
      }
    };

    const handleMouseDown = () => {
      if (!disabled) {
        setIsDragging(true);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (onChangeComplete) {
        onChangeComplete(internalValue);
      }
    };

    // Handle click on track to jump to position
    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !sliderRef.current) return;

      const trackRect = sliderRef.current.getBoundingClientRect();
      const clickPosition = e.clientX - trackRect.left;
      const trackWidth = trackRect.width;
      const newPercentage = (clickPosition / trackWidth) * 100;
      const newValue =
        Math.round(((newPercentage / 100) * (max - min) + min) / step) * step;

      const clampedValue = Math.min(Math.max(newValue, min), max);
      setInternalValue(clampedValue);

      if (onChange) {
        onChange(clampedValue);
      }
      if (onChangeComplete) {
        onChangeComplete(clampedValue);
      }
    };

    // Format value for display
    const formatValue = (value: number) => {
      if (valueLabel) {
        return valueLabel(value);
      }
      return value.toString();
    };

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (timeoutRef.current !== undefined) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {/* Label and value display */}
        <div className="flex justify-between items-center">
          {label && (
            <label
              htmlFor={sliderId}
              className={`${sizeConfig[size].label} font-medium`}
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

          {showValue && (
            <span
              className={`${sizeConfig[size].label} font-semibold`}
              style={{
                color: disabled
                  ? theme.colors.text.disabled
                  : theme.colors.brand[500],
              }}
            >
              {formatValue(internalValue)}
            </span>
          )}
        </div>

        {/* Slider container */}
        <div className="relative" ref={sliderRef}>
          {/* Track background */}
          <div
            className={`w-full ${sizeConfig[size].track} rounded-full absolute top-1/2 transform -translate-y-1/2 cursor-pointer`}
            style={getTrackStyles()}
            onClick={handleTrackClick}
          />

          {/* Filled track (progress) */}
          <div
            className={`${sizeConfig[size].track} rounded-full absolute top-1/2 transform -translate-y-1/2`}
            style={{
              ...getFilledTrackStyles(),
              width: `${percentage}%`,
            }}
          />

          {/* Marks */}
          {marks.length > 0 && (
            <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-1">
              {marks.map((mark, index) => {
                const markPercentage = ((mark.value - min) / (max - min)) * 100;
                return (
                  <div
                    key={index}
                    className="absolute flex flex-col items-center"
                    style={{
                      left: `${markPercentage}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div
                      className={`${sizeConfig[size].mark} rounded-full mb-1`}
                      style={{
                        backgroundColor:
                          mark.value <= internalValue
                            ? getFilledTrackStyles().backgroundColor
                            : getTrackStyles().backgroundColor,
                      }}
                    />
                    {mark.label && (
                      <span
                        className="text-xs mt-1 whitespace-nowrap"
                        style={{
                          color: disabled
                            ? theme.colors.text.disabled
                            : theme.colors.text.muted,
                        }}
                      >
                        {mark.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Hidden native range input */}
          <input
            ref={ref}
            type="range"
            id={sliderId}
            className="sr-only"
            value={internalValue}
            onChange={handleChange}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              helperText ? `${sliderId}-description` : undefined
            }
            {...props}
          />

          {/* Custom thumb */}
          <div
            className={`
              ${sizeConfig[size].thumb}
              rounded-full
              absolute
              top-1/2
              transform
              -translate-y-1/2
              -translate-x-1/2
              cursor-pointer
              transition-shadow
              duration-200
              ${disabled ? "cursor-not-allowed" : ""}
              ${isDragging ? "scale-110" : ""}
            `}
            style={{
              ...getThumbStyles(),
              ...getFocusStyles(),
              left: `${percentage}%`,
            }}
            onMouseDown={handleMouseDown}
            onMouseEnter={(e) => {
              if (!disabled) {
                Object.assign(e.currentTarget.style, getThumbHoverStyles());
              }
            }}
            onMouseLeave={(e) => {
              if (!disabled) {
                e.currentTarget.style.boxShadow = "";
              }
            }}
          />
        </div>

        {/* Min/Max labels */}
        <div
          className="flex justify-between text-xs"
          style={{ color: theme.colors.text.muted }}
        >
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>

        {/* Helper text and error */}
        {(helperText || error) && (
          <p
            id={`${sliderId}-description`}
            className="text-sm"
            style={{
              color: error
                ? theme.colors.error
                : disabled
                ? theme.colors.text.disabled
                : theme.colors.text.muted,
            }}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";

// Range Slider (dual thumb for min/max)
interface RangeSliderProps
  extends Omit<
    SliderProps,
    "value" | "defaultValue" | "onChange" | "onChangeComplete"
  > {
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (value: [number, number]) => void;
  onChangeComplete?: (value: [number, number]) => void;
}

export const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      disabled = false,
      size = "md",
      variant = "default",
      showValue = true,
      valueLabel,
      marks = [],
      step = 1,
      min = 0,
      max = 100,
      value: controlledValue,
      defaultValue = [min, max],
      onChange,
      onChangeComplete,
      className = "",
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const id = useId();
    const sliderId = props.id || `range-slider-${id}`;
    const [internalValue, setInternalValue] = useState<[number, number]>(
      controlledValue || defaultValue
    );
    const [activeThumb, setActiveThumb] = useState<0 | 1 | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | undefined>(undefined); // Changed from NodeJS.Timeout

    // Sync with controlled value
    useEffect(() => {
      if (controlledValue) {
        setInternalValue(controlledValue);
      }
    }, [controlledValue]);

    // Size configurations (same as Slider)
    const sizeConfig = {
      sm: {
        track: "h-1.5",
        thumb: "w-4 h-4",
        label: "text-sm",
        mark: "w-1 h-1",
      },
      md: {
        track: "h-2",
        thumb: "w-5 h-5",
        label: "text-base",
        mark: "w-1.5 h-1.5",
      },
      lg: {
        track: "h-2.5",
        thumb: "w-6 h-6",
        label: "text-lg",
        mark: "w-2 h-2",
      },
    };

    const [minValue, maxValue] = internalValue;
    const minPercentage = ((minValue - min) / (max - min)) * 100;
    const maxPercentage = ((maxValue - min) / (max - min)) * 100;

    // Get track styles (same as Slider)
    const getTrackStyles = () => {
      const colors = theme.colors;
      if (disabled) return { backgroundColor: colors.surfaceBorder };
      if (error) return { backgroundColor: colors.error + "30" };
      if (success) return { backgroundColor: colors.success + "30" };

      switch (variant) {
        case "filled":
          return { backgroundColor: colors.surfaceHover };
        case "ghost":
          return { backgroundColor: colors.backgroundSubtle };
        default:
          return { backgroundColor: colors.surface };
      }
    };

    const getFilledTrackStyles = () => {
      const colors = theme.colors;
      if (disabled) return { backgroundColor: colors.text.disabled };
      if (error) return { backgroundColor: colors.error };
      if (success) return { backgroundColor: colors.success };
      return { backgroundColor: colors.brand[500] };
    };

    const getThumbStyles = (isActive: boolean) => {
      const colors = theme.colors;
      if (disabled)
        return {
          backgroundColor: colors.text.disabled,
          borderColor: colors.surfaceBorder,
        };
      if (error)
        return {
          backgroundColor: colors.background,
          borderColor: colors.error,
          borderWidth: "2px",
          transform: isActive
            ? "scale(110%) translateX(-50%)"
            : "translateX(-50%)",
        };
      if (success)
        return {
          backgroundColor: colors.background,
          borderColor: colors.success,
          borderWidth: "2px",
          transform: isActive
            ? "scale(110%) translateX(-50%)"
            : "translateX(-50%)",
        };
      return {
        backgroundColor: colors.background,
        borderColor: colors.brand[500],
        borderWidth: "2px",
        transform: isActive
          ? "scale(110%) translateX(-50%)"
          : "translateX(-50%)",
      };
    };

    const handleThumbChange = (thumbIndex: 0 | 1, newValue: number) => {
      const newValues: [number, number] = [...internalValue];
      newValues[thumbIndex] = Math.min(Math.max(newValue, min), max);

      // Ensure min <= max
      if (thumbIndex === 0 && newValues[0] > newValues[1]) {
        newValues[0] = newValues[1];
      } else if (thumbIndex === 1 && newValues[1] < newValues[0]) {
        newValues[1] = newValues[0];
      }

      setInternalValue(newValues);

      if (onChange) {
        onChange(newValues);
      }

      if (onChangeComplete) {
        if (timeoutRef.current !== undefined) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
          // Use window.setTimeout
          onChangeComplete(newValues);
        }, 150);
      }
    };

    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !containerRef.current) return;

      const trackRect = containerRef.current.getBoundingClientRect();
      const clickPosition = e.clientX - trackRect.left;
      const trackWidth = trackRect.width;
      const clickPercentage = (clickPosition / trackWidth) * 100;
      const newValue =
        Math.round(((clickPercentage / 100) * (max - min) + min) / step) * step;

      // Determine which thumb is closer
      const minDistance = Math.abs(minValue - newValue);
      const maxDistance = Math.abs(maxValue - newValue);
      const thumbToMove = minDistance < maxDistance ? 0 : 1;

      handleThumbChange(thumbToMove, newValue);
    };

    const formatValue = (value: number) => {
      if (valueLabel) return valueLabel(value);
      return value.toString();
    };

    // Cleanup timeout
    useEffect(() => {
      return () => {
        if (timeoutRef.current !== undefined) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <div className={`flex flex-col gap-2 ${className}`} ref={ref}>
        {/* Label and value display */}
        <div className="flex justify-between items-center">
          {label && (
            <label
              htmlFor={sliderId}
              className={`${sizeConfig[size].label} font-medium`}
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
              {props.required && (
                <span className="ml-1" style={{ color: theme.colors.error }}>
                  *
                </span>
              )}
            </label>
          )}

          {showValue && (
            <span
              className={`${sizeConfig[size].label} font-semibold`}
              style={{
                color: disabled
                  ? theme.colors.text.disabled
                  : theme.colors.brand[500],
              }}
            >
              {formatValue(minValue)} - {formatValue(maxValue)}
            </span>
          )}
        </div>

        {/* Slider container */}
        <div className="relative" ref={containerRef}>
          {/* Track background */}
          <div
            className={`w-full ${sizeConfig[size].track} rounded-full absolute top-1/2 transform -translate-y-1/2 cursor-pointer`}
            style={getTrackStyles()}
            onClick={handleTrackClick}
          />

          {/* Filled track between thumbs */}
          <div
            className={`${sizeConfig[size].track} rounded-full absolute top-1/2 transform -translate-y-1/2`}
            style={{
              ...getFilledTrackStyles(),
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`,
            }}
          />

          {/* Min thumb */}
          <div
            className={`
              ${sizeConfig[size].thumb}
              rounded-full
              absolute
              top-1/2
              cursor-pointer
              transition-all
              duration-200
              ${disabled ? "cursor-not-allowed" : ""}
            `}
            style={{
              ...getThumbStyles(activeThumb === 0),
              left: `${minPercentage}%`,
            }}
            onMouseDown={() => !disabled && setActiveThumb(0)}
            onMouseUp={() => setActiveThumb(null)}
          />

          {/* Max thumb */}
          <div
            className={`
              ${sizeConfig[size].thumb}
              rounded-full
              absolute
              top-1/2
              cursor-pointer
              transition-all
              duration-200
              ${disabled ? "cursor-not-allowed" : ""}
            `}
            style={{
              ...getThumbStyles(activeThumb === 1),
              left: `${maxPercentage}%`,
            }}
            onMouseDown={() => !disabled && setActiveThumb(1)}
            onMouseUp={() => setActiveThumb(null)}
          />

          {/* Hidden inputs for each thumb */}
          <input
            type="range"
            value={minValue}
            onChange={(e) => handleThumbChange(0, Number(e.target.value))}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className="sr-only"
          />
          <input
            type="range"
            value={maxValue}
            onChange={(e) => handleThumbChange(1, Number(e.target.value))}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className="sr-only"
          />
        </div>

        {/* Min/Max labels */}
        <div
          className="flex justify-between text-xs"
          style={{ color: theme.colors.text.muted }}
        >
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>

        {/* Helper text and error */}
        {(helperText || error) && (
          <p
            className="text-sm"
            style={{
              color: error
                ? theme.colors.error
                : disabled
                ? theme.colors.text.disabled
                : theme.colors.text.muted,
            }}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

RangeSlider.displayName = "RangeSlider";
