// packages/ui/src/components/TimePicker.tsx
import React, { forwardRef, useId, useState, useRef, useEffect } from "react";
import { useTheme } from "../../contexts/themeContext";

interface TimePickerProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "onChange" | "value" | "defaultValue"
  > {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "filled" | "ghost";
  placeholder?: string;
  format?: "12h" | "24h";
  step?: number; // minutes step
  showSeconds?: boolean;
  minTime?: string;
  maxTime?: string;
  onChange?: (time: string | null) => void;
  value?: string | null;
  defaultValue?: string | null;
}

export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      disabled = false,
      size = "md",
      variant = "outline",
      placeholder = "Select time",
      format = "12h",
      step = 30,
      showSeconds = false,
      minTime,
      maxTime,
      onChange,
      value: controlledValue,
      defaultValue,
      className = "",
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const id = useId();
    const timePickerId = props.id || `timepicker-${id}`;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState<string | null>(
      controlledValue !== undefined ? controlledValue : defaultValue || null
    );
    const [selectedHour, setSelectedHour] = useState<number>(12);
    const [selectedMinute, setSelectedMinute] = useState<number>(0);
    const [selectedSecond, setSelectedSecond] = useState<number>(0);
    const [isAM, setIsAM] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    // Size configurations
    const sizeConfig = {
      sm: {
        input: "px-3 py-1.5 text-sm",
        picker: "p-2 text-sm",
        timeButton: "px-2 py-1 text-xs",
        label: "text-sm",
      },
      md: {
        input: "px-4 py-2.5 text-base",
        picker: "p-3 text-base",
        timeButton: "px-3 py-1.5 text-sm",
        label: "text-base",
      },
      lg: {
        input: "px-5 py-3 text-lg",
        picker: "p-4 text-lg",
        timeButton: "px-4 py-2 text-base",
        label: "text-lg",
      },
    };

    // Helper to pad numbers
    const padNumber = (num: number): string => {
      return num < 10 ? `0${num}` : `${num}`;
    };

    // Parse time string to components
    const parseTimeString = (timeStr: string) => {
      if (!timeStr) return null;

      const parts = timeStr.split(":");
      if (parts.length < 2) return null;

      const hour24 = parseInt(parts[0], 10);
      const minute = parseInt(parts[1], 10);
      const second = parts.length > 2 ? parseInt(parts[2], 10) : 0;

      if (format === "12h") {
        const isAM = hour24 < 12;
        const hour12 = hour24 % 12 || 12; // Convert 0 to 12 for 12h format
        return { hour: hour12, minute, second, isAM, hour24 };
      }

      return { hour: hour24, minute, second, isAM: hour24 < 12, hour24 };
    };

    // Format time for display
    const formatTimeDisplay = (timeStr: string | null) => {
      if (!timeStr) return "";

      // For 12h format
      if (format === "12h") {
        const parts = parseTimeString(timeStr);
        if (!parts) return timeStr;

        const { hour, minute, second, isAM } = parts;
        const amPm = isAM ? "AM" : "PM";

        if (showSeconds) {
          return `${padNumber(hour)}:${padNumber(minute)}:${padNumber(
            second
          )} ${amPm}`;
        }
        return `${padNumber(hour)}:${padNumber(minute)} ${amPm}`;
      }

      // For 24h format
      const timeParts = timeStr.split(":");
      const hour = timeParts[0].padStart(2, "0");
      const minute = timeParts[1].padStart(2, "0");

      if (showSeconds) {
        const second = timeParts[2] ? timeParts[2].padStart(2, "0") : "00";
        return `${hour}:${minute}:${second}`;
      }
      return `${hour}:${minute}`;
    };

    // Sync with controlled value
    useEffect(() => {
      if (controlledValue !== undefined) {
        setSelectedTime(controlledValue);
        if (controlledValue) {
          const timeParts = parseTimeString(controlledValue);
          if (timeParts) {
            setSelectedHour(timeParts.hour);
            setSelectedMinute(timeParts.minute);
            setSelectedSecond(timeParts.second);
            setIsAM(timeParts.isAM);
          }
        }
      }
    }, [controlledValue]);

    // Close picker when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

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

      return { outlineColor: colors.focusRing };
    };

    // Get label text color
    const getLabelColor = () => {
      if (disabled) return theme.colors.text.disabled;
      if (error) return theme.colors.error;
      if (success) return theme.colors.success;
      return theme.colors.text.primary;
    };

    // Generate hour options based on format
    const generateHourOptions = () => {
      const hours = [];
      if (format === "12h") {
        for (let i = 1; i <= 12; i++) {
          hours.push(i);
        }
      } else {
        for (let i = 0; i < 24; i++) {
          hours.push(i);
        }
      }
      return hours;
    };

    // Generate minute options based on step
    const generateMinuteOptions = () => {
      const minutes = [];
      for (let i = 0; i < 60; i += step) {
        minutes.push(i);
      }
      return minutes;
    };

    // Generate second options
    const generateSecondOptions = () => {
      const seconds = [];
      for (let i = 0; i < 60; i++) {
        seconds.push(i);
      }
      return seconds;
    };

    // Check if time is within min/max constraints
    const isTimeValid = (hour24: number, minute: number, second: number) => {
      const timeString = `${padNumber(hour24)}:${padNumber(minute)}${
        showSeconds ? `:${padNumber(second)}` : ""
      }`;

      if (minTime && timeString < minTime) return false;
      if (maxTime && timeString > maxTime) return false;

      return true;
    };

    const handleTimeSelect = () => {
      let hour24 = selectedHour;

      // Convert to 24h format if needed
      if (format === "12h") {
        hour24 = isAM
          ? selectedHour === 12
            ? 0
            : selectedHour
          : selectedHour === 12
          ? 12
          : selectedHour + 12;
      }

      const timeStr = `${padNumber(hour24)}:${padNumber(selectedMinute)}${
        showSeconds ? `:${padNumber(selectedSecond)}` : ""
      }`;

      if (!isTimeValid(hour24, selectedMinute, selectedSecond)) {
        return; // Don't select invalid time
      }

      setSelectedTime(timeStr);
      setIsOpen(false);

      if (onChange) {
        onChange(timeStr);
      }
    };

    const handleNowClick = () => {
      const now = new Date();
      const hour24 = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();

      if (format === "12h") {
        const isAMNow = hour24 < 12;
        const hour12 = hour24 % 12 || 12;
        setSelectedHour(hour12);
        setIsAM(isAMNow);
      } else {
        setSelectedHour(hour24);
      }

      setSelectedMinute(minute);
      setSelectedSecond(second);

      // Auto-select after setting values
      const timeStr = `${padNumber(hour24)}:${padNumber(minute)}${
        showSeconds ? `:${padNumber(second)}` : ""
      }`;
      setSelectedTime(timeStr);

      if (onChange) {
        onChange(timeStr);
      }
    };

    const handleClearClick = () => {
      setSelectedTime(null);
      setSelectedHour(format === "12h" ? 12 : 0);
      setSelectedMinute(0);
      setSelectedSecond(0);
      setIsAM(true);
      setIsOpen(false);

      if (onChange) {
        onChange(null);
      }
    };

    const hourOptions = generateHourOptions();
    const minuteOptions = generateMinuteOptions();
    const secondOptions = generateSecondOptions();

    return (
      <div className={`flex flex-col gap-1.5 ${className}`} ref={containerRef}>
        {/* Label */}
        {label && (
          <label
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

        {/* Input and Time Picker Toggle */}
        <div className="relative">
          <div className="flex items-center">
            <input
              ref={ref}
              type="text"
              readOnly
              value={formatTimeDisplay(selectedTime)}
              placeholder={placeholder}
              className={`
                ${sizeConfig[size].input}
                rounded-lg
                transition-all
                duration-200
                focus:outline-none
                focus:outline-2
                focus:outline-offset-2
                ${
                  variant === "ghost"
                    ? "rounded-none border-t-0 border-l-0 border-r-0"
                    : ""
                }
                cursor-pointer
                ${disabled ? "cursor-not-allowed" : ""}
                w-full
              `}
              style={{
                ...getVariantStyles(),
                ...getFocusStyles(),
              }}
              onClick={() => !disabled && setIsOpen(!isOpen)}
              disabled={disabled}
              aria-invalid={!!error}
              aria-describedby={
                helperText ? `${timePickerId}-description` : undefined
              }
              {...props}
            />

            {/* Clock Icon */}
            <button
              type="button"
              className={`
                absolute right-3
                ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                focus:outline-none
              `}
              onClick={() => !disabled && setIsOpen(!isOpen)}
              disabled={disabled}
              aria-label="Open time picker"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  color: disabled
                    ? theme.colors.text.disabled
                    : theme.colors.text.muted,
                }}
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </button>
          </div>

          {/* Time Picker Dropdown */}
          {isOpen && !disabled && (
            <div
              className="absolute z-50 mt-1 rounded-lg shadow-lg border"
              style={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.surfaceBorder,
                minWidth: format === "12h" ? "320px" : "280px",
              }}
            >
              <div className={sizeConfig[size].picker}>
                {/* Time Selection Grid */}
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    {/* Hour Selection */}
                    <div className="flex flex-col items-center">
                      <div
                        className="text-sm font-medium mb-2"
                        style={{ color: theme.colors.text.muted }}
                      >
                        Hour
                      </div>
                      <div className="grid grid-cols-4 gap-1 max-h-40 overflow-y-auto p-1">
                        {hourOptions.map((hour) => (
                          <button
                            key={`hour-${hour}`}
                            type="button"
                            className={`
                              ${sizeConfig[size].timeButton}
                              rounded
                              transition-all
                              duration-200
                              ${selectedHour === hour ? "font-semibold" : ""}
                            `}
                            style={{
                              backgroundColor:
                                selectedHour === hour
                                  ? theme.colors.brand[500]
                                  : theme.colors.surfaceHover,
                              color:
                                selectedHour === hour
                                  ? theme.colors.brand[600]
                                  : theme.colors.text.primary,
                            }}
                            onClick={() => setSelectedHour(hour)}
                          >
                            {padNumber(hour)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Minute Selection */}
                    <div className="flex flex-col items-center">
                      <div
                        className="text-sm font-medium mb-2"
                        style={{ color: theme.colors.text.muted }}
                      >
                        Minute
                      </div>
                      <div className="grid grid-cols-4 gap-1 max-h-40 overflow-y-auto p-1">
                        {minuteOptions.map((minute) => (
                          <button
                            key={`minute-${minute}`}
                            type="button"
                            className={`
                              ${sizeConfig[size].timeButton}
                              rounded
                              transition-all
                              duration-200
                              ${
                                selectedMinute === minute ? "font-semibold" : ""
                              }
                            `}
                            style={{
                              backgroundColor:
                                selectedMinute === minute
                                  ? theme.colors.brand[500]
                                  : theme.colors.surfaceHover,
                              color:
                                selectedMinute === minute
                                  ? theme.colors.brand[600]
                                  : theme.colors.text.primary,
                            }}
                            onClick={() => setSelectedMinute(minute)}
                          >
                            {padNumber(minute)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Second Selection (if enabled) */}
                    {showSeconds && (
                      <div className="flex flex-col items-center">
                        <div
                          className="text-sm font-medium mb-2"
                          style={{ color: theme.colors.text.muted }}
                        >
                          Second
                        </div>
                        <div className="grid grid-cols-4 gap-1 max-h-40 overflow-y-auto p-1">
                          {secondOptions.map((second) => (
                            <button
                              key={`second-${second}`}
                              type="button"
                              className={`
                                ${sizeConfig[size].timeButton}
                                rounded
                                transition-all
                                duration-200
                                ${
                                  selectedSecond === second
                                    ? "font-semibold"
                                    : ""
                                }
                              `}
                              style={{
                                backgroundColor:
                                  selectedSecond === second
                                    ? theme.colors.brand[500]
                                    : theme.colors.surfaceHover,
                                color:
                                  selectedSecond === second
                                    ? theme.colors.brand[600]
                                    : theme.colors.text.primary,
                              }}
                              onClick={() => setSelectedSecond(second)}
                            >
                              {padNumber(second)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* AM/PM Toggle for 12h format */}
                  {format === "12h" && (
                    <div className="flex justify-center gap-2 mt-4">
                      <button
                        type="button"
                        className={`
                          ${sizeConfig[size].timeButton}
                          rounded
                          transition-all
                          duration-200
                          ${isAM ? "font-semibold" : ""}
                        `}
                        style={{
                          backgroundColor: isAM
                            ? theme.colors.brand[500]
                            : theme.colors.surfaceHover,
                          color: isAM
                            ? theme.colors.brand[600]
                            : theme.colors.text.primary,
                        }}
                        onClick={() => setIsAM(true)}
                      >
                        AM
                      </button>
                      <button
                        type="button"
                        className={`
                          ${sizeConfig[size].timeButton}
                          rounded
                          transition-all
                          duration-200
                          ${!isAM ? "font-semibold" : ""}
                        `}
                        style={{
                          backgroundColor: !isAM
                            ? theme.colors.brand[500]
                            : theme.colors.surfaceHover,
                          color: !isAM
                            ? theme.colors.brand[600]
                            : theme.colors.text.primary,
                        }}
                        onClick={() => setIsAM(false)}
                      >
                        PM
                      </button>
                    </div>
                  )}

                  {/* Selected Time Display */}
                  <div
                    className="text-center mt-4 p-3 rounded"
                    style={{ backgroundColor: theme.colors.backgroundSubtle }}
                  >
                    <div
                      className="text-lg font-semibold"
                      style={{ color: theme.colors.text.primary }}
                    >
                      {formatTimeDisplay(
                        `${padNumber(selectedHour)}:${padNumber(
                          selectedMinute
                        )}${showSeconds ? `:${padNumber(selectedSecond)}` : ""}`
                      )}
                    </div>
                  </div>
                </div>

                {/* Time Picker Footer */}
                <div
                  className="flex justify-between border-t pt-3"
                  style={{ borderColor: theme.colors.surfaceBorder }}
                >
                  <button
                    type="button"
                    className="px-3 py-1.5 text-sm rounded hover:bg-surfaceHover"
                    onClick={handleNowClick}
                    style={{
                      color: theme.colors.brand[500],
                      backgroundColor: theme.colors.brand[50],
                    }}
                  >
                    Now
                  </button>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="px-3 py-1.5 text-sm rounded hover:bg-surfaceHover"
                      onClick={handleClearClick}
                      style={{
                        color: theme.colors.text.secondary,
                        backgroundColor: theme.colors.surfaceHover,
                      }}
                    >
                      Clear
                    </button>

                    <button
                      type="button"
                      className="px-3 py-1.5 text-sm rounded hover:bg-surfaceHover"
                      onClick={handleTimeSelect}
                      style={{
                        color: theme.colors.brand[600],
                        backgroundColor: theme.colors.brand[500],
                      }}
                      disabled={
                        !isTimeValid(
                          format === "12h"
                            ? isAM
                              ? selectedHour === 12
                                ? 0
                                : selectedHour
                              : selectedHour === 12
                              ? 12
                              : selectedHour + 12
                            : selectedHour,
                          selectedMinute,
                          selectedSecond
                        )
                      }
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Helper Text or Error Message */}
        {(helperText || error) && (
          <p
            id={`${timePickerId}-description`}
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

TimePicker.displayName = "TimePicker";
