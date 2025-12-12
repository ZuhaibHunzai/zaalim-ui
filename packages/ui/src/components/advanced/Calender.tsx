// packages/ui/src/components/forms/Calendar.tsx
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useTheme } from "../../contexts/themeContext";
import { Icon } from "../utility/Icon";

export type CalendarView = "month" | "year" | "decade";
export type CalendarVariant = "default" | "minimal" | "range" | "inline";
export type CalendarSize = "sm" | "md" | "lg";

export interface CalendarDay {
  /** Date object */
  date: Date;

  /** Whether the day is in the current month */
  isCurrentMonth: boolean;

  /** Whether the day is today */
  isToday: boolean;

  /** Whether the day is selected */
  isSelected: boolean;

  /** Whether the day is in selection range */
  isInRange: boolean;

  /** Whether the day is disabled */
  isDisabled: boolean;

  /** Whether the day is a weekend */
  isWeekend: boolean;

  /** Optional events/markers for the day */
  events?: CalendarEvent[];

  /** Additional data */
  data?: Record<string, any>;

  /** Whether the day is highlighted */
  isHighlighted: boolean;
}

export interface CalendarEvent {
  /** Unique identifier */
  id: string | number;

  /** Event title */
  title: string;

  /** Event color */
  color?: string;

  /** Whether it's an all-day event */
  allDay?: boolean;

  /** Additional data */
  data?: Record<string, any>;
}

export interface CalendarProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "defaultValue" | "onChange"
  > {
  /** Selected date (controlled) */
  value?: Date | Date[];

  /** Initial selected date (uncontrolled) */
  defaultValue?: Date | Date[];

  /** Callback when date selection changes */
  onChange?: (date: Date | Date[] | null) => void;

  /** Minimum selectable date */
  minDate?: Date;

  /** Maximum selectable date */
  maxDate?: Date;

  /** Disabled dates */
  disabledDates?: Date[] | ((date: Date) => boolean);

  /** Highlighted dates */
  highlightedDates?: Date[] | ((date: Date) => boolean);

  /** Events for specific dates */
  events?: Record<string, CalendarEvent[]>;

  /** Initial view date */
  viewDate?: Date;

  /** Initial calendar view */
  initialView?: CalendarView;

  /** Whether to allow multiple date selection */
  multiple?: boolean;

  /** Whether to allow date range selection */
  range?: boolean;

  /** Variant style */
  variant?: CalendarVariant;

  /** Size */
  size?: CalendarSize;

  /** Whether the calendar is disabled */
  disabled?: boolean;

  /** Whether to show week numbers */
  showWeekNumbers?: boolean;

  /** Whether to show today button */
  showTodayButton?: boolean;

  /** Whether to show navigation buttons */
  showNavigation?: boolean;

  /** Whether to show view switcher */
  showViewSwitcher?: boolean;

  /** First day of week (0 = Sunday, 1 = Monday, etc.) */
  firstDayOfWeek?: number;

  /** Custom day cell renderer */
  renderDay?: (day: CalendarDay) => React.ReactNode;

  /** Custom header renderer */
  renderHeader?: (props: {
    currentDate: Date;
    view: CalendarView;
    onPrev: () => void;
    onNext: () => void;
    onViewChange: (view: CalendarView) => void;
    onToday: () => void;
  }) => React.ReactNode;

  /** Custom week header renderer */
  renderWeekHeader?: (dayNames: string[]) => React.ReactNode;

  /** Custom month cell renderer (for year view) */
  renderMonth?: (
    month: number,
    year: number,
    isSelected: boolean
  ) => React.ReactNode;

  /** Custom year cell renderer (for decade view) */
  renderYear?: (year: number, isSelected: boolean) => React.ReactNode;

  /** Locale for formatting */
  locale?: string;

  /** Custom class names */
  dayClassName?: string | ((day: CalendarDay) => string);

  /** Custom day cell style */
  dayStyle?: React.CSSProperties | ((day: CalendarDay) => React.CSSProperties);

  /** Whether to show event indicators */
  showEventIndicators?: boolean;

  /** Maximum events to show indicators for */
  maxEventIndicators?: number;

  /** Custom event indicator renderer */
  renderEventIndicator?: (events: CalendarEvent[]) => React.ReactNode;

  /** Callback when day is clicked */
  onDayClick?: (day: CalendarDay) => void;

  /** Callback when day is hovered */
  onDayHover?: (day: CalendarDay | null) => void;

  /** Callback when month changes */
  onMonthChange?: (date: Date) => void;

  /** Callback when year changes */
  onYearChange?: (date: Date) => void;

  /** Callback when view changes */
  onViewChange?: (view: CalendarView) => void;
}

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      disabledDates,
      highlightedDates,
      events = {},
      viewDate: controlledViewDate,
      initialView = "month",
      multiple = false,
      range = false,
      variant = "default",
      size = "md",
      disabled = false,
      showWeekNumbers = false,
      showTodayButton = true,
      showNavigation = true,
      showViewSwitcher = true,
      firstDayOfWeek = 0,
      renderDay,
      renderHeader,
      renderWeekHeader,
      renderMonth,
      renderYear,
      locale = "en-US",
      dayClassName,
      dayStyle,
      showEventIndicators = true,
      maxEventIndicators = 3,
      renderEventIndicator,
      onDayClick,
      onDayHover,
      onMonthChange,
      onYearChange,
      onViewChange,
      className = "",
      style,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();

    // State
    const [internalValue, setInternalValue] = useState<Date | Date[] | null>(
      defaultValue ?? (multiple || range ? [] : null)
    );
    const [internalViewDate, setInternalViewDate] = useState<Date>(() => {
      // Helper to get a single date from various sources
      const getSingleDate = (): Date => {
        // 1. Use controlled view date if provided
        if (controlledViewDate) {
          return controlledViewDate;
        }

        // 2. Use defaultValue if provided (handle array case)
        if (defaultValue) {
          if (Array.isArray(defaultValue)) {
            // For arrays, use the first date or current date if empty
            return defaultValue.length > 0 ? defaultValue[0] : new Date();
          }
          return defaultValue;
        }

        // 3. Fallback to current date
        return new Date();
      };

      const date = getSingleDate();
      return new Date(date.getFullYear(), date.getMonth(), 1);
    });
    const [view, setView] = useState<CalendarView>(initialView);
    const [hoverDate, setHoverDate] = useState<Date | null>(null);
    const [rangeStart, setRangeStart] = useState<Date | null>(null);

    // Use controlled or uncontrolled value
    const value =
      controlledValue !== undefined ? controlledValue : internalValue;
    const viewDate =
      controlledViewDate !== undefined
        ? new Date(
            controlledViewDate.getFullYear(),
            controlledViewDate.getMonth(),
            1
          )
        : internalViewDate;

    // Date utilities
    const getDayNames = useCallback(() => {
      const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
      const days: string[] = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(2021, 0, 3 + i); // A Sunday in January 2021
        days.push(formatter.format(date));
      }

      // Rotate based on firstDayOfWeek
      return [...days.slice(firstDayOfWeek), ...days.slice(0, firstDayOfWeek)];
    }, [locale, firstDayOfWeek]);

    const getMonthName = useCallback(
      (month: number) => {
        const formatter = new Intl.DateTimeFormat(locale, { month: "long" });
        const date = new Date(2021, month, 1);
        return formatter.format(date);
      },
      [locale]
    );

    const isSameDay = useCallback((a: Date, b: Date) => {
      return (
        a.getDate() === b.getDate() &&
        a.getMonth() === b.getMonth() &&
        a.getFullYear() === b.getFullYear()
      );
    }, []);

    const isSameMonth = useCallback((a: Date, b: Date) => {
      return (
        a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()
      );
    }, []);

    const isDateDisabled = useCallback(
      (date: Date): boolean => {
        if (disabled) return true;

        // Check min/max dates
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;

        // Check disabled dates
        if (disabledDates) {
          if (Array.isArray(disabledDates)) {
            return disabledDates.some((d) => isSameDay(d, date));
          } else {
            return disabledDates(date);
          }
        }

        return false;
      },
      [disabled, minDate, maxDate, disabledDates, isSameDay]
    );

    const isDateHighlighted = useCallback(
      (date: Date): boolean => {
        if (highlightedDates) {
          if (Array.isArray(highlightedDates)) {
            return highlightedDates.some((d) => isSameDay(d, date));
          } else {
            return highlightedDates(date);
          }
        }

        return false;
      },
      [highlightedDates, isSameDay]
    );

    const isDateSelected = useCallback(
      (date: Date): boolean => {
        if (!value) return false;

        if (Array.isArray(value)) {
          return value.some((d) => isSameDay(d, date));
        }

        return isSameDay(value as Date, date);
      },
      [value, isSameDay]
    );

    const isDateInRange = useCallback(
      (date: Date): boolean => {
        if (!range || !Array.isArray(value) || value.length !== 2) return false;

        const [start, end] = value;
        return date >= start && date <= end;
      },
      [range, value]
    );

    const getEventsForDate = useCallback(
      (date: Date): CalendarEvent[] => {
        const dateKey = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;
        return events[dateKey] || [];
      },
      [events]
    );

    // Navigation
    const goToPrevMonth = useCallback(() => {
      const newDate = new Date(viewDate);
      newDate.setMonth(viewDate.getMonth() - 1);
      setInternalViewDate(newDate);
      if (onMonthChange) onMonthChange(newDate);
    }, [viewDate, onMonthChange]);

    const goToNextMonth = useCallback(() => {
      const newDate = new Date(viewDate);
      newDate.setMonth(viewDate.getMonth() + 1);
      setInternalViewDate(newDate);
      if (onMonthChange) onMonthChange(newDate);
    }, [viewDate, onMonthChange]);

    const goToPrevYear = useCallback(() => {
      const newDate = new Date(viewDate);
      newDate.setFullYear(viewDate.getFullYear() - 1);
      setInternalViewDate(newDate);
      if (onYearChange) onYearChange(newDate);
    }, [viewDate, onYearChange]);

    const goToNextYear = useCallback(() => {
      const newDate = new Date(viewDate);
      newDate.setFullYear(viewDate.getFullYear() + 1);
      setInternalViewDate(newDate);
      if (onYearChange) onYearChange(newDate);
    }, [viewDate, onYearChange]);

    const goToToday = useCallback(() => {
      const today = new Date();
      const newViewDate = new Date(today.getFullYear(), today.getMonth(), 1);
      setInternalViewDate(newViewDate);
      setView("month");

      if (onMonthChange) onMonthChange(newViewDate);
      if (onViewChange) onViewChange("month");
    }, [onMonthChange, onViewChange]);

    const changeView = useCallback(
      (newView: CalendarView) => {
        setView(newView);
        if (onViewChange) onViewChange(newView);
      },
      [onViewChange]
    );

    // Date selection
    const handleDateSelect = useCallback(
      (date: Date) => {
        if (isDateDisabled(date)) return;

        if (onDayClick) {
          onDayClick({
            date,
            isCurrentMonth: isSameMonth(date, viewDate),
            isToday: isSameDay(date, new Date()),
            isSelected: isDateSelected(date),
            isInRange: isDateInRange(date),
            isDisabled: isDateDisabled(date),
            isWeekend: date.getDay() === 0 || date.getDay() === 6,
            events: getEventsForDate(date),
            isHighlighted: false,
          });
        }

        let newValue: Date | Date[] | null;

        if (range) {
          if (!rangeStart) {
            // Start selecting range
            setRangeStart(date);
            newValue = [date];
          } else {
            // Complete range selection
            const start = rangeStart < date ? rangeStart : date;
            const end = rangeStart < date ? date : rangeStart;
            newValue = [start, end];
            setRangeStart(null);
          }
        } else if (multiple) {
          const currentValues = Array.isArray(value) ? [...value] : [];
          const index = currentValues.findIndex((d) => isSameDay(d, date));

          if (index >= 0) {
            // Remove if already selected
            currentValues.splice(index, 1);
          } else {
            // Add to selection
            currentValues.push(date);
          }

          newValue = currentValues;
        } else {
          // Single selection
          newValue = isSameDay(date, value as Date) ? null : date;
        }

        // Update internal state if uncontrolled
        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }

        // Call onChange callback
        if (onChange) {
          onChange(newValue);
        }
      },
      [
        isDateDisabled,
        isSameDay,
        isSameMonth,
        isDateSelected,
        isDateInRange,
        range,
        multiple,
        value,
        rangeStart,
        controlledValue,
        onChange,
        onDayClick,
        viewDate,
        getEventsForDate,
      ]
    );

    // Generate days for month view
    const getDaysInMonth = useCallback((): CalendarDay[] => {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth();

      // First day of the month
      const firstDay = new Date(year, month, 1);
      // Last day of the month
      const lastDay = new Date(year, month + 1, 0);

      // Day of week for first day (0 = Sunday, 1 = Monday, etc.)
      let firstDayIndex = firstDay.getDay() - (firstDayOfWeek || 0); // Changed variable name
      if (firstDayIndex < 0) firstDayIndex += 7;

      // Days from previous month
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      const days: CalendarDay[] = [];

      // Previous month days
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const date = new Date(year, month - 1, prevMonthLastDay - i);
        days.push({
          date,
          isCurrentMonth: false,
          isToday: isSameDay(date, new Date()),
          isSelected: isDateSelected(date),
          isInRange: isDateInRange(date),
          isDisabled: isDateDisabled(date),
          isWeekend: date.getDay() === 0 || date.getDay() === 6,
          events: getEventsForDate(date),
          isHighlighted: isDateHighlighted(date),
        });
      }

      // Current month days
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const date = new Date(year, month, i);
        days.push({
          date,
          isCurrentMonth: true,
          isToday: isSameDay(date, new Date()),
          isSelected: isDateSelected(date),
          isInRange: isDateInRange(date),
          isDisabled: isDateDisabled(date),
          isWeekend: date.getDay() === 0 || date.getDay() === 6,
          events: getEventsForDate(date),
          isHighlighted: false,
        });
      }

      // Next month days (to fill 6 weeks)
      const totalDays = days.length;
      const nextMonthDays = 42 - totalDays; // 6 weeks * 7 days

      for (let i = 1; i <= nextMonthDays; i++) {
        const date = new Date(year, month + 1, i);
        days.push({
          date,
          isCurrentMonth: false,
          isToday: isSameDay(date, new Date()),
          isSelected: isDateSelected(date),
          isInRange: isDateInRange(date),
          isDisabled: isDateDisabled(date),
          isWeekend: date.getDay() === 0 || date.getDay() === 6,
          events: getEventsForDate(date),
          isHighlighted: false,
        });
      }

      return days;
    }, [
      viewDate,
      isSameDay,
      isDateSelected,
      isDateInRange,
      isDateDisabled,
      getEventsForDate,
      firstDayOfWeek,
    ]);

    // Generate months for year view
    // Generate months for year view
    const getMonthsInYear = useCallback(() => {
      const months = [];
      const year = viewDate.getFullYear();

      // Get the first date from value to determine selection
      const getSelectedDate = (): Date | null => {
        if (!value) return null;

        if (Array.isArray(value)) {
          // For arrays, use the first date (or could use logic for range/multi)
          return value.length > 0 ? value[0] : null;
        }

        return value as Date;
      };

      const selectedDate = getSelectedDate();

      for (let month = 0; month < 12; month++) {
        const date = new Date(year, month, 1);
        months.push({
          month,
          year,
          date,
          isSelected: selectedDate ? isSameMonth(date, selectedDate) : false,
        });
      }

      return months;
    }, [viewDate, value, isSameMonth]);

    // Generate years for decade view
    const getYearsInDecade = useCallback(() => {
      const year = viewDate.getFullYear();
      const decadeStart = Math.floor(year / 10) * 10;
      const years = [];

      // Get the year from value to determine selection
      const getSelectedYear = (): number | null => {
        if (!value) return null;

        if (Array.isArray(value)) {
          // For arrays, use the first date's year
          return value.length > 0 ? value[0].getFullYear() : null;
        }

        return (value as Date).getFullYear();
      };

      const selectedYear = getSelectedYear();

      for (let y = decadeStart - 1; y <= decadeStart + 10; y++) {
        years.push({
          year: y,
          isCurrentDecade: y >= decadeStart && y < decadeStart + 10,
          isSelected: y === selectedYear,
        });
      }

      return years;
    }, [viewDate, value]);

    // Event indicators
    const renderEventIndicators = useCallback(
      (dayEvents: CalendarEvent[]) => {
        if (!showEventIndicators || dayEvents.length === 0) return null;

        if (renderEventIndicator) {
          return renderEventIndicator(dayEvents);
        }

        const eventsToShow = dayEvents.slice(0, maxEventIndicators);

        return (
          <div className="flex justify-center gap-0.5 mt-1">
            {eventsToShow.map((event, index) => (
              <div
                key={event.id}
                className="w-1 h-1 rounded-full"
                style={{
                  backgroundColor: event.color || theme.colors.brand[500],
                }}
              />
            ))}
            {dayEvents.length > maxEventIndicators && (
              <span
                className="text-xs"
                style={{ color: theme.colors.text.muted }}
              >
                +{dayEvents.length - maxEventIndicators}
              </span>
            )}
          </div>
        );
      },
      [showEventIndicators, renderEventIndicator, maxEventIndicators, theme]
    );

    // Render day cell
    const renderDayCell = useCallback(
      (day: CalendarDay) => {
        if (renderDay) {
          return renderDay(day);
        }

        const dayClasses = [
          "flex flex-col items-center justify-center p-2 rounded-lg transition-all",
          "relative cursor-pointer",
          day.isCurrentMonth ? "" : "opacity-40",
          day.isToday ? "font-bold" : "",
          day.isSelected ? "text-text-inverted" : "",
          day.isInRange && !day.isSelected ? "bg-brand-50" : "",
          day.isDisabled
            ? "opacity-30 cursor-not-allowed"
            : "hover:bg-surfaceHover",
          day.isWeekend ? "" : "",
        ];

        const className =
          typeof dayClassName === "function" ? dayClassName(day) : dayClassName;

        if (className) {
          dayClasses.push(className);
        }

        const baseStyle: React.CSSProperties = {
          minHeight: "3rem",
          minWidth: "3rem",
        };

        const customStyle =
          typeof dayStyle === "function" ? dayStyle(day) : dayStyle;

        const dayStyleObj: React.CSSProperties = {
          ...baseStyle,
          ...customStyle,
          backgroundColor: day.isSelected
            ? theme.colors.brand[500]
            : day.isHighlighted
            ? theme.colors.brand[50]
            : "transparent",
          color: day.isSelected
            ? theme.colors.brand[600]
            : day.isToday
            ? theme.colors.brand[500]
            : day.isCurrentMonth
            ? theme.colors.text.primary
            : theme.colors.text.muted,
          border: day.isToday ? `1px solid ${theme.colors.brand[500]}` : "none",
        };

        return (
          <div
            className={dayClasses.filter(Boolean).join(" ")}
            style={dayStyleObj}
            onClick={() => handleDateSelect(day.date)}
            onMouseEnter={() => {
              setHoverDate(day.date);
              if (onDayHover) onDayHover(day);
            }}
            onMouseLeave={() => {
              setHoverDate(null);
              if (onDayHover) onDayHover(null);
            }}
          >
            <span className="text-sm">{day.date.getDate()}</span>
            {renderEventIndicators(day.events || [])}
          </div>
        );
      },
      [
        renderDay,
        dayClassName,
        dayStyle,
        theme,
        handleDateSelect,
        onDayHover,
        renderEventIndicators,
      ]
    );

    // Render month view
    const renderMonthView = () => {
      const days = getDaysInMonth();
      const dayNames = getDayNames();

      return (
        <div className="calendar-month-view">
          {/* Week header */}
          {showWeekNumbers && (
            <div className="grid grid-cols-8 gap-1 mb-2">
              <div
                className="text-center text-sm font-medium"
                style={{ color: theme.colors.text.muted }}
              >
                Wk
              </div>
              {dayNames.map((name, index) => (
                <div
                  key={index}
                  className="text-center text-sm font-medium"
                  style={{ color: theme.colors.text.secondary }}
                >
                  {name}
                </div>
              ))}
            </div>
          )}

          {/* Days grid */}
          <div
            className={`grid ${
              showWeekNumbers ? "grid-cols-8" : "grid-cols-7"
            } gap-1`}
          >
            {showWeekNumbers && (
              <>
                {Array.from({ length: 6 }).map((_, weekIndex) => {
                  // Calculate week number
                  const firstDayOfWeek = days[weekIndex * 7];
                  const weekNumber = Math.ceil(
                    (firstDayOfWeek.date.getDate() +
                      new Date(
                        firstDayOfWeek.date.getFullYear(),
                        firstDayOfWeek.date.getMonth(),
                        1
                      ).getDay()) /
                      7
                  );

                  return (
                    <div
                      key={`week-${weekIndex}`}
                      className="flex items-center justify-center text-sm"
                      style={{ color: theme.colors.text.muted }}
                    >
                      {weekNumber}
                    </div>
                  );
                })}
              </>
            )}

            {days.map((day, index) => (
              <div key={index}>{renderDayCell(day)}</div>
            ))}
          </div>
        </div>
      );
    };

    // Render year view
    const renderYearView = () => {
      const months = getMonthsInYear();

      return (
        <div className="grid grid-cols-4 gap-4 p-4">
          {months.map(({ month, year, date, isSelected }) => {
            if (renderMonth) {
              return renderMonth(month, year, isSelected);
            }

            return (
              <button
                key={month}
                type="button"
                className={`
                p-4 rounded-lg text-center transition-all
                ${isSelected ? "text-text-inverted" : "hover:bg-surfaceHover"}
              `}
                style={{
                  backgroundColor: isSelected
                    ? theme.colors.brand[500]
                    : "transparent",
                  color: isSelected
                    ? theme.colors.brand[600]
                    : theme.colors.text.primary,
                }}
                onClick={() => {
                  setInternalViewDate(new Date(year, month, 1));
                  setView("month");
                  if (onViewChange) onViewChange("month");
                }}
              >
                {getMonthName(month)}
              </button>
            );
          })}
        </div>
      );
    };

    // Render decade view
    const renderDecadeView = () => {
      const years = getYearsInDecade();

      return (
        <div className="grid grid-cols-4 gap-4 p-4">
          {years.map(({ year, isCurrentDecade, isSelected }) => {
            if (renderYear) {
              return renderYear(year, isSelected);
            }

            return (
              <button
                key={year}
                type="button"
                className={`
                p-4 rounded-lg text-center transition-all
                ${isCurrentDecade ? "" : "opacity-50"}
                ${isSelected ? "text-text-inverted" : "hover:bg-surfaceHover"}
              `}
                style={{
                  backgroundColor: isSelected
                    ? theme.colors.brand[500]
                    : "transparent",
                  color: isSelected
                    ? theme.colors.brand[600]
                    : theme.colors.text.primary,
                }}
                onClick={() => {
                  setInternalViewDate(new Date(year, 0, 1));
                  setView("year");
                  if (onViewChange) onViewChange("year");
                }}
              >
                {year}
              </button>
            );
          })}
        </div>
      );
    };

    // Render header
    const renderCalendarHeader = () => {
      if (renderHeader) {
        return renderHeader({
          currentDate: viewDate,
          view,
          onPrev:
            view === "month"
              ? goToPrevMonth
              : view === "year"
              ? goToPrevYear
              : () =>
                  setInternalViewDate(
                    new Date(viewDate.getFullYear() - 10, 0, 1)
                  ),
          onNext:
            view === "month"
              ? goToNextMonth
              : view === "year"
              ? goToNextYear
              : () =>
                  setInternalViewDate(
                    new Date(viewDate.getFullYear() + 10, 0, 1)
                  ),
          onViewChange: changeView,
          onToday: goToToday,
        });
      }

      const getHeaderText = () => {
        switch (view) {
          case "month":
            return `${getMonthName(
              viewDate.getMonth()
            )} ${viewDate.getFullYear()}`;
          case "year":
            return `${viewDate.getFullYear()}`;
          case "decade":
            const decadeStart = Math.floor(viewDate.getFullYear() / 10) * 10;
            return `${decadeStart} - ${decadeStart + 9}`;
          default:
            return "";
        }
      };

      return (
        <div
          className="flex items-center justify-between p-4 border-b"
          style={{ borderColor: theme.colors.surfaceBorder }}
        >
          <div className="flex items-center gap-2">
            {showNavigation && (
              <>
                <button
                  type="button"
                  className="p-2 rounded hover:bg-surfaceHover"
                  onClick={
                    view === "month"
                      ? goToPrevMonth
                      : view === "year"
                      ? goToPrevYear
                      : () =>
                          setInternalViewDate(
                            new Date(viewDate.getFullYear() - 10, 0, 1)
                          )
                  }
                  disabled={disabled}
                  aria-label="Previous"
                >
                  <Icon name="ChevronLeft" size="sm" />
                </button>

                <button
                  type="button"
                  className="p-2 rounded hover:bg-surfaceHover"
                  onClick={
                    view === "month"
                      ? goToNextMonth
                      : view === "year"
                      ? goToNextYear
                      : () =>
                          setInternalViewDate(
                            new Date(viewDate.getFullYear() + 10, 0, 1)
                          )
                  }
                  disabled={disabled}
                  aria-label="Next"
                >
                  <Icon name="ChevronRight" size="sm" />
                </button>
              </>
            )}

            <button
              type="button"
              className="px-4 py-2 font-medium rounded hover:bg-surfaceHover"
              onClick={() =>
                changeView(
                  view === "month"
                    ? "year"
                    : view === "year"
                    ? "decade"
                    : "month"
                )
              }
              disabled={disabled}
            >
              {getHeaderText()}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {showTodayButton && (
              <button
                type="button"
                className="px-3 py-1.5 text-sm rounded hover:bg-surfaceHover"
                onClick={goToToday}
                disabled={disabled}
                style={{ color: theme.colors.brand[500] }}
              >
                Today
              </button>
            )}

            {showViewSwitcher && (
              <div
                className="flex rounded-lg border"
                style={{ borderColor: theme.colors.surfaceBorder }}
              >
                {(["month", "year", "decade"] as CalendarView[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    className={`px-3 py-1.5 text-sm capitalize ${
                      view === v ? "bg-surfaceHover" : ""
                    }`}
                    onClick={() => changeView(v)}
                    disabled={disabled}
                    style={{
                      color:
                        view === v
                          ? theme.colors.text.primary
                          : theme.colors.text.muted,
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    };

    // Render current view
    const renderView = () => {
      switch (view) {
        case "month":
          return renderMonthView();
        case "year":
          return renderYearView();
        case "decade":
          return renderDecadeView();
        default:
          return null;
      }
    };

    // Size classes
    const sizeClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    };

    // Variant classes
    const variantClasses = {
      default: "bg-surface border border-surfaceBorder rounded-lg",
      minimal: "bg-transparent",
      range: "bg-surface border border-surfaceBorder rounded-lg",
      inline: "bg-transparent border-none",
    };

    return (
      <div
        ref={ref}
        className={`${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        style={{
          width: "fit-content",
          ...style,
        }}
        {...props}
      >
        {renderCalendarHeader()}
        <div className="p-4">{renderView()}</div>
      </div>
    );
  }
);

// Set display name
(Calendar as { displayName?: string }).displayName = "Calendar";

// Pre-configured variants
export const MiniCalendar = React.forwardRef<
  HTMLDivElement,
  Omit<CalendarProps, "variant" | "size">
>((props, ref) => (
  <Calendar ref={ref} variant="minimal" size="sm" {...props} />
));
(MiniCalendar as { displayName?: string }).displayName = "MiniCalendar";

export const RangeCalendar = React.forwardRef<
  HTMLDivElement,
  Omit<CalendarProps, "range" | "variant">
>((props, ref) => (
  <Calendar ref={ref} range={true} variant="range" {...props} />
));
(RangeCalendar as { displayName?: string }).displayName = "RangeCalendar";

export const InlineCalendar = React.forwardRef<
  HTMLDivElement,
  Omit<CalendarProps, "variant">
>((props, ref) => <Calendar ref={ref} variant="inline" {...props} />);
(InlineCalendar as { displayName?: string }).displayName = "InlineCalendar";

export const MultiSelectCalendar = React.forwardRef<
  HTMLDivElement,
  Omit<CalendarProps, "multiple">
>((props, ref) => <Calendar ref={ref} multiple={true} {...props} />);
(MultiSelectCalendar as { displayName?: string }).displayName =
  "MultiSelectCalendar";
