// packages/ui/src/components/forms/Combobox.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "../../contexts/themeContext";
import { Icon } from "../utility/Icon";

export type ComboboxVariant = "default" | "filled" | "outline" | "ghost";
export type ComboboxSize = "sm" | "md" | "lg";

export interface ComboboxOption<T = string> {
  /** Unique value for the option */
  value: T;

  /** Display label */
  label: string;

  /** Optional description/subtitle */
  description?: string;

  /** Optional icon */
  icon?: React.ReactNode;

  /** Whether the option is disabled */
  disabled?: boolean;

  /** Optional group/category */
  group?: string;

  /** Additional data */
  data?: Record<string, any>;
}

export interface ComboboxProps<T = string>
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "defaultValue" | "onChange"
  > {
  /** Array of options */
  options: ComboboxOption<T>[];

  /** Current value (controlled) */
  value?: T | T[];

  /** Initial value (uncontrolled) */
  defaultValue?: T | T[];

  /** Callback when value changes */
  onChange?: (value: T | T[] | null) => void;

  /** Callback when input value changes */
  onInputChange?: (inputValue: string) => void;

  /** Placeholder text */
  placeholder?: string;

  /** Whether multiple selections are allowed */
  multiple?: boolean;

  /** Whether the combobox is searchable */
  searchable?: boolean;

  /** Whether the combobox is clearable */
  clearable?: boolean;

  /** Whether the combobox is disabled */
  disabled?: boolean;

  /** Loading state */
  loading?: boolean;

  /** Error state */
  error?: boolean | string;

  /** Success state */
  success?: boolean;

  /** Variant style */
  variant?: ComboboxVariant;

  /** Size */
  size?: ComboboxSize;

  /** Custom render function for options */
  renderOption?: (
    option: ComboboxOption<T>,
    state: { isSelected: boolean; isFocused: boolean }
  ) => React.ReactNode;

  /** Custom render function for selected value */
  renderSelected?: (
    option: ComboboxOption<T> | ComboboxOption<T>[] | null
  ) => React.ReactNode;

  /** Custom no options message */
  noOptionsMessage?: string | React.ReactNode;

  /** Custom loading message */
  loadingMessage?: string | React.ReactNode;

  /** Whether to show selected option count in placeholder */
  showSelectedCount?: boolean;

  /** Maximum height of dropdown */
  dropdownMaxHeight?: number | string;

  /** Minimum characters to trigger search */
  minCharsToSearch?: number;

  /** Whether to close dropdown after selection */
  closeOnSelect?: boolean;

  /** Debounce delay for search (ms) */
  searchDebounce?: number;

  /** Whether to show checkmark for selected items */
  showCheckmarks?: boolean;

  /** Position of dropdown */
  dropdownPosition?: "bottom" | "top" | "auto";

  /** Width of dropdown */
  dropdownWidth?: "match" | "full" | number;

  /** Optional label */
  label?: string;

  /** Optional helper text */
  helperText?: string;

  /** Optional prefix icon */
  prefixIcon?: React.ReactNode;

  /** Optional suffix icon */
  suffixIcon?: React.ReactNode;

  /** Filter function for custom filtering */
  filterFunction?: (option: ComboboxOption<T>, inputValue: string) => boolean;

  /** Group options by field */
  groupBy?: keyof ComboboxOption<T>;

  /** Sort options */
  sortOptions?: (a: ComboboxOption<T>, b: ComboboxOption<T>) => number;

  /** Virtual scroll for large lists */
  virtualScroll?: boolean;

  /** Items per page for virtual scroll */
  virtualScrollItemSize?: number;

  /** Whether to allow creating new options */
  creatable?: boolean;

  /** Callback when creating new option */
  onCreateOption?: (inputValue: string) => T | Promise<T>;

  /** Message shown when creating new option */
  creationMessage?: string | ((inputValue: string) => React.ReactNode);

  /** Input element props (for the search input when open) */
  inputProps?: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "size"
  >;
}

export const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  <T,>(
    {
      options: initialOptions,
      value: controlledValue,
      defaultValue,
      onChange,
      onInputChange,
      placeholder = "Select an option",
      multiple = false,
      searchable = true,
      clearable = true,
      disabled = false,
      loading = false,
      error = false,
      success = false,
      variant = "default",
      size = "md",
      renderOption,
      renderSelected,
      noOptionsMessage = "No options found",
      loadingMessage = "Loading...",
      showSelectedCount = true,
      dropdownMaxHeight = 300,
      minCharsToSearch = 0,
      closeOnSelect = !multiple,
      searchDebounce = 300,
      showCheckmarks = true,
      dropdownPosition = "auto",
      dropdownWidth = "match",
      label,
      helperText,
      prefixIcon,
      suffixIcon,
      filterFunction,
      groupBy,
      sortOptions,
      virtualScroll = false,
      virtualScrollItemSize = 36,
      creatable = false,
      onCreateOption,
      creationMessage = (inputValue) => `Create "${inputValue}"`,
      className = "",
      style,
      ...inputProps
    }: ComboboxProps<T>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { theme } = useTheme();

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

    // State
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [filteredOptions, setFilteredOptions] =
      useState<ComboboxOption<T>[]>(initialOptions);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [isCreating, setIsCreating] = useState(false);

    // Uncontrolled state
    const [internalValue, setInternalValue] = useState<T | T[] | null>(
      defaultValue ?? (multiple ? [] : null)
    );

    // Use controlled or uncontrolled value
    const value =
      controlledValue !== undefined ? controlledValue : internalValue;

    // Get selected options
    const getSelectedOptions = useCallback(():
      | ComboboxOption<T>
      | ComboboxOption<T>[]
      | null => {
      if (value === null || value === undefined) return null;

      if (multiple && Array.isArray(value)) {
        return initialOptions.filter((opt) => value.includes(opt.value));
      }

      if (!multiple && !Array.isArray(value)) {
        return initialOptions.find((opt) => opt.value === value) || null;
      }

      return null;
    }, [value, multiple, initialOptions]);

    // Filter options based on input
    const filterOptions = useCallback(
      (searchValue: string) => {
        if (searchValue === "" || minCharsToSearch > searchValue.length) {
          return initialOptions;
        }

        if (filterFunction) {
          return initialOptions.filter((opt) =>
            filterFunction(opt, searchValue)
          );
        }

        // Default filtering
        const searchLower = searchValue.toLowerCase();
        return initialOptions.filter(
          (opt) =>
            opt.label.toLowerCase().includes(searchLower) ||
            opt.description?.toLowerCase().includes(searchLower) ||
            opt.group?.toLowerCase().includes(searchLower)
        );
      },
      [initialOptions, filterFunction, minCharsToSearch]
    );

    // Handle input change with debounce
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      // Clear timeout if exists
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // Debounce search
      searchTimeoutRef.current = setTimeout(() => {
        setFilteredOptions(filterOptions(newValue));
        if (onInputChange) onInputChange(newValue);
      }, searchDebounce);

      // Reset focused index
      setFocusedIndex(-1);
    };

    // Handle option selection
    const handleSelectOption = (option: ComboboxOption<T>) => {
      if (option.disabled) return;

      let newValue: T | T[] | null;

      if (multiple) {
        const currentValues = Array.isArray(value) ? value : [];
        const isSelected = currentValues.includes(option.value);

        newValue = isSelected
          ? currentValues.filter((v) => v !== option.value)
          : [...currentValues, option.value];
      } else {
        newValue = option.value;
      }

      // Update internal state if uncontrolled
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }

      // Call onChange callback
      if (onChange) {
        onChange(newValue);
      }

      // Clear input if single select
      if (!multiple) {
        setInputValue("");
        setFilteredOptions(initialOptions);
      }

      // Close dropdown if configured
      if (closeOnSelect) {
        setIsOpen(false);
      }

      // Focus input after selection
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    };

    // Handle clear
    const handleClear = () => {
      const newValue = multiple ? [] : null;

      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }

      if (onChange) {
        onChange(newValue);
      }

      setInputValue("");
      setFilteredOptions(initialOptions);
      inputRef.current?.focus();
    };

    // Handle create new option
    const handleCreateOption = async () => {
      if (!creatable || !onCreateOption || inputValue.trim() === "") return;

      setIsCreating(true);
      try {
        const newValue = await onCreateOption(inputValue);

        // Create new option object
        const newOption: ComboboxOption<T> = {
          value: newValue,
          label: inputValue,
        };

        // Add to options list
        const updatedOptions = [newOption, ...initialOptions];
        setFilteredOptions(updatedOptions);

        // Select the new option
        handleSelectOption(newOption);

        // Clear input
        setInputValue("");
      } catch (error) {
        console.error("Failed to create option:", error);
      } finally {
        setIsCreating(false);
      }
    };

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        setIsOpen(true);
        e.preventDefault();
        return;
      }

      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
          break;

        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          break;

        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
            handleSelectOption(filteredOptions[focusedIndex]);
          } else if (creatable && inputValue.trim() !== "") {
            handleCreateOption();
          }
          break;

        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          break;

        case "Tab":
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    };

    // Click outside to close
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Update filtered options when initial options change
    useEffect(() => {
      setFilteredOptions(filterOptions(inputValue));
    }, [initialOptions, filterOptions, inputValue]);

    // Size classes
    const sizeClasses = {
      sm: "text-sm px-3 py-1.5",
      md: "text-base px-4 py-2.5",
      lg: "text-lg px-5 py-3",
    };

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      const colors = theme.colors;

      switch (variant) {
        case "filled":
          return {
            backgroundColor: colors.surfaceHover,
            border: `1px solid ${colors.surfaceBorder}`,
            color: colors.text.primary,
          };

        case "outline":
          return {
            backgroundColor: "transparent",
            border: `1px solid ${colors.border}`,
            color: colors.text.primary,
          };

        case "ghost":
          return {
            backgroundColor: "transparent",
            border: "1px solid transparent",
            color: colors.text.primary,
          };

        case "default":
        default:
          return {
            backgroundColor: colors.surface,
            border: `1px solid ${colors.surfaceBorder}`,
            color: colors.text.primary,
          };
      }
    };

    // Focus styles
    const getFocusStyles = (): React.CSSProperties => {
      if (!isOpen) return {};

      return {
        borderColor: theme.colors.focusRing,
        boxShadow: `0 0 0 3px ${theme.colors.focusRing}20`,
      };
    };

    // Error styles
    const getErrorStyles = (): React.CSSProperties => {
      if (!error) return {};

      return {
        borderColor: theme.colors.error,
        color: theme.colors.error,
      };
    };

    // Success styles
    const getSuccessStyles = (): React.CSSProperties => {
      if (!success) return {};

      return {
        borderColor: theme.colors.success,
        color: theme.colors.success,
      };
    };

    // Disabled styles
    const getDisabledStyles = (): React.CSSProperties => {
      if (!disabled) return {};

      return {
        backgroundColor: theme.colors.surfaceHover,
        borderColor: theme.colors.border,
        color: theme.colors.text.disabled,
        cursor: "not-allowed",
        opacity: 0.6,
      };
    };

    // Get selected display
    const renderSelectedDisplay = () => {
      const selected = getSelectedOptions();

      if (renderSelected && selected !== null) {
        return renderSelected(selected);
      }

      if (
        !selected ||
        (multiple && Array.isArray(selected) && selected.length === 0)
      ) {
        return (
          <span style={{ color: theme.colors.text.muted }}>{placeholder}</span>
        );
      }

      if (multiple && Array.isArray(selected)) {
        if (showSelectedCount && selected.length > 0) {
          return (
            <span style={{ color: theme.colors.text.primary }}>
              {selected.length} selected
            </span>
          );
        }

        if (selected.length > 0) {
          return (
            <div className="flex flex-wrap gap-1">
              {selected.map((opt) => (
                <span
                  key={String(opt.value)}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs"
                  style={{
                    backgroundColor: theme.colors.brand[100],
                    color: theme.colors.brand[600],
                  }}
                >
                  {opt.icon && <span className="text-[10px]">{opt.icon}</span>}
                  {opt.label}
                </span>
              ))}
            </div>
          );
        }
      }

      if (!multiple && !Array.isArray(selected) && selected) {
        return (
          <div className="flex items-center gap-2">
            {selected.icon && <span>{selected.icon}</span>}
            <span style={{ color: theme.colors.text.primary }}>
              {selected.label}
            </span>
          </div>
        );
      }

      return null;
    };

    // Check if option is selected
    const isOptionSelected = (option: ComboboxOption<T>): boolean => {
      if (multiple && Array.isArray(value)) {
        return value.includes(option.value);
      }

      if (!multiple && !Array.isArray(value)) {
        return value === option.value;
      }

      return false;
    };

    // Group options
    const groupedOptions = groupBy
      ? filteredOptions.reduce((groups, option) => {
          const groupKey = String(option[groupBy] || "Ungrouped");
          if (!groups[groupKey]) groups[groupKey] = [];
          groups[groupKey].push(option);
          return groups;
        }, {} as Record<string, ComboboxOption<T>[]>)
      : null;

    // Sort options if needed
    const sortedOptions = sortOptions
      ? [...filteredOptions].sort(sortOptions)
      : filteredOptions;

    // Calculate dropdown position
    const calculateDropdownPosition = () => {
      if (dropdownPosition === "auto") {
        // Simple auto positioning (could be enhanced)
        return "bottom";
      }
      return dropdownPosition;
    };

    const dropdownPositionClass =
      calculateDropdownPosition() === "top"
        ? "bottom-full mb-1"
        : "top-full mt-1";

    // Calculate dropdown width
    const getDropdownWidth = () => {
      if (dropdownWidth === "match" && containerRef.current) {
        return `${containerRef.current.offsetWidth}px`;
      }

      if (dropdownWidth === "full") {
        return "100%";
      }

      if (typeof dropdownWidth === "number") {
        return `${dropdownWidth}px`;
      }

      return "auto";
    };

    return (
      <div ref={ref} className={`relative ${className}`} style={style}>
        {/* Label */}
        {label && (
          <label
            className="block mb-2 text-sm font-medium"
            style={{ color: theme.colors.text.primary }}
          >
            {label}
          </label>
        )}

        {/* Combobox trigger */}
        <div
          ref={containerRef}
          className={`
          flex items-center justify-between
          rounded-lg transition-all duration-200
          cursor-pointer
          ${sizeClasses[size]}
          ${disabled ? "cursor-not-allowed" : ""}
        `}
          style={{
            ...getVariantStyles(),
            ...getFocusStyles(),
            ...getErrorStyles(),
            ...getSuccessStyles(),
            ...getDisabledStyles(),
          }}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          {/* Left side */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {prefixIcon && <span>{prefixIcon}</span>}

            {searchable && isOpen ? (
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none min-w-0"
                style={{ color: theme.colors.text.primary }}
                placeholder={placeholder}
                disabled={disabled}
                autoFocus
                {...inputProps}
              />
            ) : (
              <div
                className="flex-1 truncate"
                onClick={() => !disabled && setIsOpen(true)}
              >
                {renderSelectedDisplay()}
              </div>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 ml-2">
            {/* Clear button */}
            {clearable && value && !disabled && (
              <button
                type="button"
                className="p-1 rounded hover:bg-surfaceHover transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                style={{ color: theme.colors.text.muted }}
                aria-label="Clear selection"
              >
                <Icon name="X" size="sm" />
              </button>
            )}

            {/* Suffix icon */}
            {suffixIcon && !loading && <span>{suffixIcon}</span>}

            {/* Loading spinner */}
            {loading && (
              <Icon name="Loader2" size="sm" spin color="text-muted" />
            )}

            {/* Error icon */}
            {error && typeof error === "string" && (
              <Icon name="AlertCircle" size="sm" color="error" />
            )}

            {/* Success icon */}
            {success && <Icon name="CheckCircle" size="sm" color="success" />}

            {/* Chevron */}
            <Icon
              name="ChevronDown"
              size="sm"
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              color="text-muted"
            />
          </div>
        </div>

        {/* Helper text / Error message */}
        {(helperText || (error && typeof error === "string")) && (
          <div
            className="mt-1.5 text-sm"
            style={{
              color: error ? theme.colors.error : theme.colors.text.muted,
            }}
          >
            {error && typeof error === "string" ? error : helperText}
          </div>
        )}

        {/* Dropdown */}
        {isOpen && !disabled && (
          <div
            ref={dropdownRef}
            className={`
            absolute z-50 rounded-lg border shadow-lg
            ${dropdownPositionClass}
            overflow-hidden
          `}
            style={{
              width: getDropdownWidth(),
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.surfaceBorder,
              boxShadow: `0 10px 25px -5px ${theme.colors.overlay}20`,
              maxHeight:
                typeof dropdownMaxHeight === "string"
                  ? dropdownMaxHeight
                  : `${dropdownMaxHeight}px`,
            }}
          >
            {/* Dropdown content */}
            <div
              className="overflow-y-auto"
              style={{ maxHeight: dropdownMaxHeight }}
            >
              {/* Loading state */}
              {loading ? (
                <div
                  className="py-4 text-center"
                  style={{ color: theme.colors.text.muted }}
                >
                  {typeof loadingMessage === "string"
                    ? loadingMessage
                    : loadingMessage}
                </div>
              ) : (
                <>
                  {/* No options */}
                  {filteredOptions.length === 0 && !creatable && (
                    <div
                      className="py-4 text-center"
                      style={{ color: theme.colors.text.muted }}
                    >
                      {noOptionsMessage}
                    </div>
                  )}

                  {/* Grouped options */}
                  {groupedOptions ? (
                    Object.entries(groupedOptions).map(
                      ([groupName, groupOptions]) => (
                        <div key={groupName}>
                          {groupName !== "Ungrouped" && (
                            <div
                              className="px-4 py-2 text-xs font-semibold sticky top-0"
                              style={{
                                backgroundColor: theme.colors.backgroundSubtle,
                                color: theme.colors.text.muted,
                              }}
                            >
                              {groupName}
                            </div>
                          )}
                          {groupOptions.map((option, index) => (
                            <ComboboxOptionItem
                              key={String(option.value)}
                              option={option}
                              isSelected={isOptionSelected(option)}
                              isFocused={index === focusedIndex}
                              onSelect={handleSelectOption}
                              renderOption={renderOption}
                              showCheckmarks={showCheckmarks}
                              theme={theme}
                            />
                          ))}
                        </div>
                      )
                    )
                  ) : (
                    /* Ungrouped options */
                    <>
                      {sortedOptions.map((option, index) => (
                        <ComboboxOptionItem
                          key={String(option.value)}
                          option={option}
                          isSelected={isOptionSelected(option)}
                          isFocused={index === focusedIndex}
                          onSelect={handleSelectOption}
                          renderOption={renderOption}
                          showCheckmarks={showCheckmarks}
                          theme={theme}
                        />
                      ))}

                      {/* Create new option */}
                      {creatable && inputValue.trim() !== "" && !isCreating && (
                        <div
                          className="px-4 py-3 cursor-pointer hover:bg-surfaceHover transition-colors border-t"
                          onClick={handleCreateOption}
                          style={{
                            borderColor: theme.colors.surfaceBorder,
                            color: theme.colors.brand[500],
                          }}
                        >
                          {typeof creationMessage === "function"
                            ? creationMessage(inputValue)
                            : creationMessage}
                        </div>
                      )}

                      {/* Creating state */}
                      {isCreating && (
                        <div
                          className="px-4 py-3 flex items-center gap-2"
                          style={{ color: theme.colors.text.muted }}
                        >
                          <Icon name="Loader2" size="sm" spin />
                          Creating...
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
) as <T = string>(
  props: ComboboxProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;

(Combobox as React.FC & { displayName?: string }).displayName = "Combobox";

// Option item component
interface ComboboxOptionItemProps<T> {
  option: ComboboxOption<T>;
  isSelected: boolean;
  isFocused: boolean;
  onSelect: (option: ComboboxOption<T>) => void;
  renderOption?: ComboboxProps<T>["renderOption"];
  showCheckmarks: boolean;
  theme: any;
}

const ComboboxOptionItem = <T,>({
  option,
  isSelected,
  isFocused,
  onSelect,
  renderOption,
  showCheckmarks,
  theme,
}: ComboboxOptionItemProps<T>) => {
  const handleClick = () => {
    onSelect(option);
  };

  // Custom render
  if (renderOption) {
    return (
      <div onClick={handleClick}>
        {renderOption(option, { isSelected, isFocused })}
      </div>
    );
  }

  // Default render
  return (
    <div
      className={`
        px-4 py-3 cursor-pointer transition-colors
        ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
      onClick={option.disabled ? undefined : handleClick}
      style={{
        backgroundColor: isFocused ? theme.colors.surfaceHover : "transparent",
        color: option.disabled
          ? theme.colors.text.disabled
          : theme.colors.text.primary,
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {option.icon && <span>{option.icon}</span>}

          <div className="flex-1">
            <div className="font-medium">{option.label}</div>
            {option.description && (
              <div
                className="text-sm mt-0.5"
                style={{ color: theme.colors.text.muted }}
              >
                {option.description}
              </div>
            )}
          </div>
        </div>

        {showCheckmarks && isSelected && (
          <Icon name="Check" size="sm" color="brand" />
        )}
      </div>
    </div>
  );
};

// Pre-configured variants
export const PrimaryCombobox = React.forwardRef<
  HTMLDivElement,
  Omit<ComboboxProps, "variant">
>((props, ref) => <Combobox ref={ref} variant="filled" {...props} />);
PrimaryCombobox.displayName = "PrimaryCombobox";

export const OutlineCombobox = React.forwardRef<
  HTMLDivElement,
  Omit<ComboboxProps, "variant">
>((props, ref) => <Combobox ref={ref} variant="outline" {...props} />);
OutlineCombobox.displayName = "OutlineCombobox";

export const MultiCombobox = React.forwardRef<
  HTMLDivElement,
  Omit<ComboboxProps, "multiple">
>((props, ref) => <Combobox ref={ref} multiple={true} {...props} />);
MultiCombobox.displayName = "MultiCombobox";

export const SearchCombobox = React.forwardRef<
  HTMLDivElement,
  Omit<ComboboxProps, "searchable">
>((props, ref) => <Combobox ref={ref} searchable={true} {...props} />);
SearchCombobox.displayName = "SearchCombobox";

export const CreatableCombobox = React.forwardRef<
  HTMLDivElement,
  Omit<ComboboxProps, "creatable">
>((props, ref) => <Combobox ref={ref} creatable={true} {...props} />);
CreatableCombobox.displayName = "CreatableCombobox";
