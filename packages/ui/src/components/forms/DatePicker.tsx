// packages/ui/src/components/DatePicker.tsx
import React, { forwardRef, useId, useState, useRef, useEffect } from "react";
import { useTheme } from "../../contexts/themeContext";

interface DatePickerProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "onChange" | "value" | "defaultValue" // Added defaultValue here
  > {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "filled" | "ghost";
  placeholder?: string;
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  showYearNavigation?: boolean;
  showMonthNavigation?: boolean;
  onChange?: (date: Date | null) => void;
  value?: Date | null;
  defaultValue?: Date | null; // Now this won't conflict
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      disabled = false,
      size = "md",
      variant = "outline",
      placeholder = "Select date",
      format = "MM/dd/yyyy",
      minDate,
      maxDate,
      showYearNavigation = true,
      showMonthNavigation = true,
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
    const datePickerId = props.id || `datepicker-${id}`;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(
      controlledValue !== undefined ? controlledValue : defaultValue || null
    );
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const containerRef = useRef<HTMLDivElement>(null);

    // Size configurations
    const sizeConfig = {
      sm: {
        input: "px-3 py-1.5 text-sm",
        calendar: "p-2 text-sm",
        day: "w-7 h-7 text-xs",
        label: "text-sm",
      },
      md: {
        input: "px-4 py-2.5 text-base",
        calendar: "p-3 text-base",
        day: "w-8 h-8 text-sm",
        label: "text-base",
      },
      lg: {
        input: "px-5 py-3 text-lg",
        calendar: "p-4 text-lg",
        day: "w-9 h-9 text-base",
        label: "text-lg",
      },
    };

    // Sync with controlled value
    useEffect(() => {
      if (controlledValue !== undefined) {
        setSelectedDate(controlledValue);
        if (controlledValue) {
          setCurrentMonth(
            new Date(
              controlledValue.getFullYear(),
              controlledValue.getMonth(),
              1
            )
          );
        }
      }
    }, [controlledValue]);

    // Close calendar when clicking outside
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

    // Format date for display
    const formatDate = (date: Date | null) => {
      if (!date) return "";

      // Use Intl.DateTimeFormat which doesn't have padStart dependency
      const formatter = new Intl.DateTimeFormat("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });

      const formatted = formatter.format(date);
      // Returns "MM/DD/YYYY" format

      // If you need to match your custom format
      const [month, day, year] = formatted.split("/");

      return format
        .replace("MM", month)
        .replace("dd", day)
        .replace("yyyy", year);
    };
    // Get days in month
    const getDaysInMonth = (year: number, month: number) => {
      return new Date(year, month + 1, 0).getDate();
    };

    // Get first day of month (0 = Sunday, 1 = Monday, etc.)
    const getFirstDayOfMonth = (year: number, month: number) => {
      return new Date(year, month, 1).getDay();
    };

    // Generate calendar days
    const generateCalendarDays = () => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const daysInMonth = getDaysInMonth(year, month);
      const firstDay = getFirstDayOfMonth(year, month);

      const days = [];

      // Previous month's days
      const prevMonthDays = getDaysInMonth(year, month - 1);
      for (let i = firstDay - 1; i >= 0; i--) {
        const day = prevMonthDays - i;
        days.push({
          date: new Date(year, month - 1, day),
          isCurrentMonth: false,
          isSelected:
            selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === month - 1 &&
            selectedDate.getFullYear() === year,
          isToday: isToday(new Date(year, month - 1, day)),
          isDisabled: isDateDisabled(new Date(year, month - 1, day)),
        });
      }

      // Current month's days
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        days.push({
          date,
          isCurrentMonth: true,
          isSelected:
            selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === month &&
            selectedDate.getFullYear() === year,
          isToday: isToday(date),
          isDisabled: isDateDisabled(date),
        });
      }

      // Next month's days
      const totalCells = 42; // 6 weeks * 7 days
      const nextMonthDays = totalCells - days.length;
      for (let day = 1; day <= nextMonthDays; day++) {
        const date = new Date(year, month + 1, day);
        days.push({
          date,
          isCurrentMonth: false,
          isSelected:
            selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === month + 1 &&
            selectedDate.getFullYear() === year,
          isToday: isToday(date),
          isDisabled: isDateDisabled(date),
        });
      }

      return days;
    };

    // Check if date is today
    const isToday = (date: Date) => {
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    };

    // Check if date is disabled
    const isDateDisabled = (date: Date) => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return false;
    };

    // Month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Weekday names
    const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Navigation handlers
    const goToPreviousMonth = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
      );
    };

    const goToNextMonth = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
      );
    };

    const goToPreviousYear = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1)
      );
    };

    const goToNextYear = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1)
      );
    };

    const handleDateSelect = (date: Date) => {
      if (isDateDisabled(date)) return;

      setSelectedDate(date);
      setIsOpen(false);

      if (onChange) {
        onChange(date);
      }
    };

    const handleTodayClick = () => {
      const today = new Date();
      if (!isDateDisabled(today)) {
        setSelectedDate(today);
        setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
        setIsOpen(false);

        if (onChange) {
          onChange(today);
        }
      }
    };

    const handleClearClick = () => {
      setSelectedDate(null);

      if (onChange) {
        onChange(null);
      }
    };

    const calendarDays = generateCalendarDays();

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

        {/* Input and Calendar Toggle */}
        <div className="relative">
          <div className="flex items-center">
            <input
              ref={ref}
              type="text"
              readOnly
              value={formatDate(selectedDate)}
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
                helperText ? `${datePickerId}-description` : undefined
              }
              {...props}
            />

            {/* Calendar Icon */}
            <button
              type="button"
              className={`
                absolute right-3
                ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                focus:outline-none
              `}
              onClick={() => !disabled && setIsOpen(!isOpen)}
              disabled={disabled}
              aria-label="Open calendar"
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
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </button>
          </div>

          {/* Calendar Dropdown */}
          {isOpen && !disabled && (
            <div
              className="absolute z-50 mt-1 rounded-lg shadow-lg border"
              style={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.surfaceBorder,
                minWidth: "280px",
              }}
            >
              {/* Calendar Header */}
              <div
                className="flex items-center justify-between p-3 border-b"
                style={{ borderColor: theme.colors.surfaceBorder }}
              >
                {/* Navigation Buttons */}
                <div className="flex items-center gap-2">
                  {showYearNavigation && (
                    <button
                      type="button"
                      className="p-1 rounded hover:bg-surfaceHover"
                      onClick={goToPreviousYear}
                      aria-label="Previous year"
                      style={{
                        color: theme.colors.text.primary,
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                  )}

                  {showMonthNavigation && (
                    <button
                      type="button"
                      className="p-1 rounded hover:bg-surfaceHover"
                      onClick={goToPreviousMonth}
                      aria-label="Previous month"
                      style={{
                        color: theme.colors.text.primary,
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Month and Year Display */}
                <div
                  className="font-semibold"
                  style={{ color: theme.colors.text.primary }}
                >
                  {monthNames[currentMonth.getMonth()]}{" "}
                  {currentMonth.getFullYear()}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-2">
                  {showMonthNavigation && (
                    <button
                      type="button"
                      className="p-1 rounded hover:bg-surfaceHover"
                      onClick={goToNextMonth}
                      aria-label="Next month"
                      style={{
                        color: theme.colors.text.primary,
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  )}

                  {showYearNavigation && (
                    <button
                      type="button"
                      className="p-1 rounded hover:bg-surfaceHover"
                      onClick={goToNextYear}
                      aria-label="Next year"
                      style={{
                        color: theme.colors.text.primary,
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-1 px-3 py-2">
                {weekdayNames.map((day) => (
                  <div
                    key={day}
                    className="text-center font-medium"
                    style={{
                      color: theme.colors.text.muted,
                      fontSize: sizeConfig[size].day.replace("text-", ""),
                    }}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1 p-3">
                {calendarDays.map((day, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`
    ${sizeConfig[size].day}
    rounded
    flex
    items-center
    justify-center
    transition-all
    duration-200
    ${day.isDisabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"}
    ${day.isSelected ? "font-semibold" : ""}
    ${!day.isCurrentMonth ? "opacity-50" : ""}
  `}
                    style={{
                      backgroundColor: day.isSelected
                        ? theme.colors.brand[500]
                        : day.isToday
                        ? theme.colors.brand[100]
                        : "transparent",
                      color: day.isSelected
                        ? theme.colors.brand[600]
                        : day.isToday
                        ? theme.colors.brand[600]
                        : theme.colors.text.primary,
                      border:
                        day.isToday && !day.isSelected
                          ? `1px solid ${theme.colors.brand[300]}`
                          : "none",
                    }}
                    onClick={() => handleDateSelect(day.date)}
                    disabled={day.isDisabled}
                    aria-label={`Select ${day.date.toLocaleDateString()}`}
                    aria-selected={day.isSelected ? true : false} // Fixed here
                  >
                    {day.date.getDate()}
                  </button>
                ))}
              </div>

              {/* Calendar Footer */}
              <div
                className="flex justify-between p-3 border-t"
                style={{ borderColor: theme.colors.surfaceBorder }}
              >
                <button
                  type="button"
                  className="px-3 py-1.5 text-sm rounded hover:bg-surfaceHover"
                  onClick={handleTodayClick}
                  style={{
                    color: theme.colors.brand[500],
                    backgroundColor: theme.colors.brand[50],
                  }}
                >
                  Today
                </button>

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
              </div>
            </div>
          )}
        </div>

        {/* Helper Text or Error Message */}
        {(helperText || error) && (
          <p
            id={`${datePickerId}-description`}
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

DatePicker.displayName = "DatePicker";
