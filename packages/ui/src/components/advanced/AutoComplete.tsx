// packages/ui/src/components/forms/Autocomplete.tsx
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useTheme } from "../../contexts/themeContext";
import { Icon } from "../utility/Icon";

export type AutocompleteVariant = "default" | "filled" | "outline" | "ghost";
export type AutocompleteSize = "sm" | "md" | "lg";

export interface AutocompleteOption<T = string> {
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

  /** Optional category/type */
  category?: string;

  /** Additional data */
  data?: Record<string, any>;
}

export type AutocompleteSource<T = string> =
  | AutocompleteOption<T>[]
  | ((query: string) => Promise<AutocompleteOption<T>[]>)
  | ((query: string) => AutocompleteOption<T>[]);

export interface AutocompleteProps<T = string>
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "defaultValue" | "onChange" | "onSelect" | "onInput"
  > {
  /** Source of options: array, sync function, or async function */
  source: AutocompleteSource<T>;

  /** Current value (controlled) */
  value?: T;

  /** Initial value (uncontrolled) */
  defaultValue?: T;

  /** Callback when value is selected or input changes */
  onChange?: (value: T | null, option: AutocompleteOption<T> | null) => void;

  /** Callback when input value changes */
  onInputChange?: (inputValue: string) => void;

  /** Callback when option is selected */
  onSelect?: (option: AutocompleteOption<T>) => void;

  /** Callback when async search starts */
  onSearchStart?: () => void;

  /** Callback when async search completes */
  onSearchComplete?: (results: AutocompleteOption<T>[]) => void;

  /** Callback when async search fails */
  onSearchError?: (error: any) => void;

  /** Placeholder text */
  placeholder?: string;

  /** Whether to allow free text (not from options) */
  freeSolo?: boolean;

  /** Whether to clear input after selection */
  clearOnSelect?: boolean;

  /** Whether to select highlighted option on blur */
  selectOnBlur?: boolean;

  /** Whether the autocomplete is disabled */
  disabled?: boolean;

  /** Loading state (overrides internal loading) */
  loading?: boolean;

  /** Error state */
  error?: boolean | string;

  /** Success state */
  success?: boolean;

  /** Variant style */
  variant?: AutocompleteVariant;

  /** Size */
  size?: AutocompleteSize;

  /** Custom render function for options */
  renderOption?: (
    option: AutocompleteOption<T>,
    state: {
      isSelected: boolean;
      isFocused: boolean;
      query: string;
    }
  ) => React.ReactNode;

  /** Custom render function for input value */
  renderInputValue?: (option: AutocompleteOption<T> | null) => string;

  /** Custom no options message */
  noOptionsMessage?: string | React.ReactNode;

  /** Custom loading message */
  loadingMessage?: string | React.ReactNode;

  /** Custom empty state message */
  emptyMessage?: string | React.ReactNode;

  /** Minimum characters to trigger search */
  minChars?: number;

  /** Debounce delay for search (ms) */
  debounce?: number;

  /** Maximum number of suggestions to show */
  maxSuggestions?: number;

  /** Whether to show recent searches */
  showRecent?: boolean;

  /** Recent searches (array of values) */
  recentSearches?: T[];

  /** Callback when recent search is clicked */
  onRecentSearchClick?: (value: T) => void;

  /** Maximum height of dropdown */
  dropdownMaxHeight?: number | string;

  /** Position of dropdown */
  dropdownPosition?: "bottom" | "top" | "auto";

  /** Width of dropdown */
  dropdownWidth?: "match" | "full" | number;

  /** Whether to highlight matching text */
  highlightMatches?: boolean;

  /** Highlight match class or style */
  highlightClass?: string;

  /** Optional label */
  label?: string;

  /** Optional helper text */
  helperText?: string;

  /** Optional prefix icon */
  prefixIcon?: React.ReactNode;

  /** Optional suffix icon */
  suffixIcon?: React.ReactNode;

  /** Input element props */
  inputProps?: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "size"
  >;

  /** Whether to show clear button */
  clearable?: boolean;

  /** Whether to show loading spinner */
  showLoading?: boolean;

  /** Filter function for local filtering */
  filterFunction?: (option: AutocompleteOption<T>, query: string) => boolean;

  /** Sort function for suggestions */
  sortSuggestions?: (
    a: AutocompleteOption<T>,
    b: AutocompleteOption<T>,
    query: string
  ) => number;

  /** Group suggestions by field */
  groupBy?: keyof AutocompleteOption<T>;
}

export const Autocomplete = React.forwardRef<HTMLDivElement, AutocompleteProps>(
  <T,>(
    {
      source,
      value: controlledValue,
      defaultValue,
      onChange,
      onInputChange,
      onSelect,
      onSearchStart,
      onSearchComplete,
      onSearchError,
      placeholder = "Type to search...",
      freeSolo = false,
      clearOnSelect = false,
      selectOnBlur = false,
      disabled = false,
      loading: externalLoading = false,
      error = false,
      success = false,
      variant = "default",
      size = "md",
      renderOption,
      renderInputValue,
      noOptionsMessage = "No options found",
      loadingMessage = "Searching...",
      emptyMessage = "Start typing to search",
      minChars = 1,
      debounce = 300,
      maxSuggestions = 10,
      showRecent = false,
      recentSearches = [],
      onRecentSearchClick,
      dropdownMaxHeight = 300,
      dropdownPosition = "auto",
      dropdownWidth = "match",
      highlightMatches = true,
      highlightClass = "",
      label,
      helperText,
      prefixIcon,
      suffixIcon,
      inputProps,
      clearable = true,
      showLoading = true,
      filterFunction,
      sortSuggestions,
      groupBy,
      className = "",
      style,
      ...props
    }: AutocompleteProps<T>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { theme } = useTheme();

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchTimeoutRef = useRef<number | null>(null);

    // State
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState<AutocompleteOption<T>[]>([]);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [internalLoading, setInternalLoading] = useState(false);
    const [searchError, setSearchError] = useState<any>(null);
    const [selectedOption, setSelectedOption] =
      useState<AutocompleteOption<T> | null>(null);

    // Combined loading state
    const loading = externalLoading || internalLoading;

    // Uncontrolled state
    const [internalValue, setInternalValue] = useState<T | null>(
      defaultValue ?? null
    );

    // Use controlled or uncontrolled value
    const value =
      controlledValue !== undefined ? controlledValue : internalValue;

    // Get display value for input
    const getDisplayValue = useCallback((): string => {
      if (renderInputValue && selectedOption) {
        return renderInputValue(selectedOption);
      }

      if (selectedOption) {
        return selectedOption.label;
      }

      return inputValue;
    }, [selectedOption, inputValue, renderInputValue]);

    // Find option by value
    const findOptionByValue = useCallback(
      (val: T): AutocompleteOption<T> | null => {
        if (Array.isArray(source)) {
          return source.find((opt) => opt.value === val) || null;
        }
        return null;
      },
      [source]
    );

    // Initialize selected option from value
    useEffect(() => {
      if (value !== null && value !== undefined) {
        const option = findOptionByValue(value);
        if (option) {
          setSelectedOption(option);
          if (renderInputValue) {
            setInputValue(renderInputValue(option));
          } else {
            setInputValue(option.label);
          }
        }
      } else {
        setSelectedOption(null);
      }
    }, [value, findOptionByValue, renderInputValue]);

    // Fetch options based on source type
    const fetchOptions = useCallback(
      async (query: string) => {
        if (query.length < minChars) {
          setOptions([]);
          return;
        }

        setInternalLoading(true);
        setSearchError(null);

        if (onSearchStart) onSearchStart();

        try {
          let results: AutocompleteOption<T>[];

          if (Array.isArray(source)) {
            // Local array source
            if (filterFunction) {
              results = source.filter((opt) => filterFunction(opt, query));
            } else {
              const queryLower = query.toLowerCase();
              results = source.filter(
                (opt) =>
                  opt.label.toLowerCase().includes(queryLower) ||
                  opt.description?.toLowerCase().includes(queryLower) ||
                  opt.category?.toLowerCase().includes(queryLower)
              );
            }
          } else {
            // Function source (sync or async)
            results = await source(query);
          }

          // Apply sorting if provided
          if (sortSuggestions) {
            results = results.sort((a, b) => sortSuggestions(a, b, query));
          }

          // Limit suggestions
          if (maxSuggestions > 0) {
            results = results.slice(0, maxSuggestions);
          }

          setOptions(results);

          if (onSearchComplete) onSearchComplete(results);
        } catch (err) {
          setSearchError(err);
          setOptions([]);
          if (onSearchError) onSearchError(err);
        } finally {
          setInternalLoading(false);
        }
      },
      [
        source,
        minChars,
        filterFunction,
        sortSuggestions,
        maxSuggestions,
        onSearchStart,
        onSearchComplete,
        onSearchError,
      ]
    );

    // Debounced search
    const debouncedSearch = useCallback(
      (query: string) => {
        // Clear existing timeout
        if (searchTimeoutRef.current !== null) {
          clearTimeout(searchTimeoutRef.current);
          searchTimeoutRef.current = null;
        }

        // Set new timeout
        searchTimeoutRef.current = window.setTimeout(() => {
          fetchOptions(query);
        }, debounce);
      },
      [fetchOptions, debounce]
    );

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setSelectedOption(null);

      // Update internal value if uncontrolled
      if (controlledValue === undefined && value !== null) {
        setInternalValue(null);
      }

      // Call onChange with null since no option is selected
      if (onChange) {
        onChange(null, null);
      }

      if (onInputChange) {
        onInputChange(newValue);
      }

      // Open dropdown if we have enough characters
      if (newValue.length >= minChars) {
        setIsOpen(true);
        debouncedSearch(newValue);
      } else {
        setIsOpen(false);
        setOptions([]);
      }

      // Reset focused index
      setFocusedIndex(-1);
    };

    // Handle option selection
    const handleSelectOption = (option: AutocompleteOption<T>) => {
      if (option.disabled) return;

      // Update states
      setSelectedOption(option);

      if (clearOnSelect) {
        setInputValue("");
      } else if (renderInputValue) {
        setInputValue(renderInputValue(option));
      } else {
        setInputValue(option.label);
      }

      // Update value
      if (controlledValue === undefined) {
        setInternalValue(option.value);
      }

      // Call callbacks
      if (onChange) {
        onChange(option.value, option);
      }

      if (onSelect) {
        onSelect(option);
      }

      // Close dropdown
      setIsOpen(false);
      setFocusedIndex(-1);

      // Focus input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    };

    // Handle free solo (enter custom value)
    const handleFreeSolo = () => {
      if (!freeSolo || inputValue.trim() === "") return;

      const customOption: AutocompleteOption<T> = {
        value: inputValue as T,
        label: inputValue,
      };

      handleSelectOption(customOption);
    };

    // Handle clear
    const handleClear = () => {
      setInputValue("");
      setSelectedOption(null);
      setOptions([]);
      setIsOpen(false);

      if (controlledValue === undefined) {
        setInternalValue(null);
      }

      if (onChange) {
        onChange(null, null);
      }

      if (onInputChange) {
        onInputChange("");
      }

      inputRef.current?.focus();
    };

    // Handle blur
    const handleBlur = () => {
      // Small delay to allow click events to fire
      setTimeout(() => {
        if (selectOnBlur && focusedIndex >= 0 && options[focusedIndex]) {
          handleSelectOption(options[focusedIndex]);
        } else if (freeSolo && inputValue.trim() !== "") {
          handleFreeSolo();
        } else {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      }, 200);
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
          setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
          break;

        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
          break;

        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0 && options[focusedIndex]) {
            handleSelectOption(options[focusedIndex]);
          } else if (freeSolo && inputValue.trim() !== "") {
            handleFreeSolo();
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

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (searchTimeoutRef.current !== null) {
          clearTimeout(searchTimeoutRef.current);
        }
      };
    }, []);

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

    // Highlight matching text
    const highlightText = (text: string, query: string) => {
      if (!highlightMatches || !query || query.length < minChars) {
        return text;
      }

      const regex = new RegExp(
        `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
        "gi"
      );
      const parts = text.split(regex);

      return parts.map((part, index) =>
        regex.test(part) ? (
          <span
            key={index}
            className={highlightClass}
            style={{
              backgroundColor: theme.colors.brand[100],
              color: theme.colors.brand[600],
              fontWeight: "600",
            }}
          >
            {part}
          </span>
        ) : (
          part
        )
      );
    };

    // Group options
    const groupedOptions = useMemo(() => {
      if (!groupBy || options.length === 0) return null;

      return options.reduce((groups, option) => {
        const groupKey = String(option[groupBy] || "Other");
        if (!groups[groupKey]) groups[groupKey] = [];
        groups[groupKey].push(option);
        return groups;
      }, {} as Record<string, AutocompleteOption<T>[]>);
    }, [options, groupBy]);

    // Calculate dropdown position
    const calculateDropdownPosition = () => {
      if (dropdownPosition === "auto") {
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

    // Render recent searches
    const renderRecentSearches = () => {
      if (!showRecent || recentSearches.length === 0 || inputValue.length > 0)
        return null;

      const recentOptions = recentSearches
        .map((val) => findOptionByValue(val))
        .filter(Boolean) as AutocompleteOption<T>[];

      if (recentOptions.length === 0) return null;

      return (
        <div
          className="border-b"
          style={{ borderColor: theme.colors.surfaceBorder }}
        >
          <div
            className="px-4 py-2 text-xs font-semibold"
            style={{ color: theme.colors.text.muted }}
          >
            Recent Searches
          </div>
          {recentOptions.map((option, index) => (
            <div
              key={String(option.value)}
              className="px-4 py-2 cursor-pointer hover:bg-surfaceHover transition-colors flex items-center gap-2"
              onClick={() => {
                handleSelectOption(option);
                if (onRecentSearchClick) {
                  onRecentSearchClick(option.value);
                }
              }}
              style={{ color: theme.colors.text.primary }}
            >
              <Icon name="History" size="sm" color="text-muted" />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={`relative ${className}`}
        style={style}
        {...props}
      >
        {/* Label */}
        {label && (
          <label
            className="block mb-2 text-sm font-medium"
            style={{ color: theme.colors.text.primary }}
          >
            {label}
          </label>
        )}

        {/* Autocomplete trigger */}
        <div
          ref={containerRef}
          className={`
          flex items-center justify-between
          rounded-lg transition-all duration-200
          ${disabled ? "cursor-not-allowed" : ""}
          ${sizeClasses[size]}
        `}
          style={{
            ...getVariantStyles(),
            ...getFocusStyles(),
            ...getErrorStyles(),
            ...getSuccessStyles(),
            ...getDisabledStyles(),
          }}
        >
          {/* Left side */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {prefixIcon && <span>{prefixIcon}</span>}

            <input
              ref={inputRef}
              type="text"
              value={getDisplayValue()}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => inputValue.length >= minChars && setIsOpen(true)}
              onBlur={handleBlur}
              className="flex-1 bg-transparent border-none outline-none min-w-0"
              style={{ color: theme.colors.text.primary }}
              placeholder={placeholder}
              disabled={disabled}
              {...inputProps}
            />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 ml-2">
            {/* Clear button */}
            {clearable && (inputValue || selectedOption) && !disabled && (
              <button
                type="button"
                className="p-1 rounded hover:bg-surfaceHover transition-colors"
                onClick={handleClear}
                style={{ color: theme.colors.text.muted }}
                aria-label="Clear"
              >
                <Icon name="X" size="sm" />
              </button>
            )}

            {/* Suffix icon */}
            {suffixIcon && !loading && <span>{suffixIcon}</span>}

            {/* Loading spinner */}
            {showLoading && loading && (
              <Icon name="Loader2" size="sm" spin color="text-muted" />
            )}

            {/* Error icon */}
            {error && typeof error === "string" && (
              <Icon name="AlertCircle" size="sm" color="error" />
            )}

            {/* Success icon */}
            {success && <Icon name="CheckCircle" size="sm" color="success" />}
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
              {/* Recent searches */}
              {renderRecentSearches()}

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
                  {/* Empty state (no input) */}
                  {inputValue.length === 0 && !showRecent && (
                    <div
                      className="py-4 text-center"
                      style={{ color: theme.colors.text.muted }}
                    >
                      {emptyMessage}
                    </div>
                  )}

                  {/* No options */}
                  {inputValue.length >= minChars && options.length === 0 && (
                    <div
                      className="py-4 text-center"
                      style={{ color: theme.colors.text.muted }}
                    >
                      {noOptionsMessage}
                    </div>
                  )}

                  {/* Grouped options */}
                  {groupedOptions
                    ? Object.entries(groupedOptions).map(
                        ([groupName, groupOptions]) => (
                          <div key={groupName}>
                            <div
                              className="px-4 py-2 text-xs font-semibold sticky top-0"
                              style={{
                                backgroundColor: theme.colors.backgroundSubtle,
                                color: theme.colors.text.muted,
                              }}
                            >
                              {groupName}
                            </div>
                            {groupOptions.map((option, index) => (
                              <AutocompleteOptionItem
                                key={String(option.value)}
                                option={option}
                                query={inputValue}
                                isSelected={
                                  selectedOption?.value === option.value
                                }
                                isFocused={index === focusedIndex}
                                onSelect={handleSelectOption}
                                renderOption={renderOption}
                                highlightText={highlightText}
                              />
                            ))}
                          </div>
                        )
                      )
                    : /* Ungrouped options */
                      options.map((option, index) => (
                        <AutocompleteOptionItem
                          key={String(option.value)}
                          option={option}
                          query={inputValue}
                          isSelected={selectedOption?.value === option.value}
                          isFocused={index === focusedIndex}
                          onSelect={handleSelectOption}
                          renderOption={renderOption}
                          highlightText={highlightText}
                        />
                      ))}

                  {/* Free solo option */}
                  {freeSolo &&
                    inputValue.trim() !== "" &&
                    !options.some((opt) => opt.label === inputValue) && (
                      <div
                        className="px-4 py-3 cursor-pointer hover:bg-surfaceHover transition-colors border-t"
                        onClick={handleFreeSolo}
                        style={{
                          borderColor: theme.colors.surfaceBorder,
                          color: theme.colors.brand[500],
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Icon name="Plus" size="sm" />
                          <span>Use "{inputValue}"</span>
                        </div>
                      </div>
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
  props: AutocompleteProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;

// Set display name
(Autocomplete as { displayName?: string }).displayName = "Autocomplete";

// Option item component
interface AutocompleteOptionItemProps<T> {
  option: AutocompleteOption<T>;
  query: string;
  isSelected: boolean;
  isFocused: boolean;
  onSelect: (option: AutocompleteOption<T>) => void;
  renderOption?: AutocompleteProps<T>["renderOption"];
  highlightText: (text: string, query: string) => React.ReactNode;
}

const AutocompleteOptionItem = <T,>({
  option,
  query,
  isSelected,
  isFocused,
  onSelect,
  renderOption,
  highlightText,
}: AutocompleteOptionItemProps<T>) => {
  const { theme } = useTheme(); // Add this line

  const handleClick = () => {
    onSelect(option);
  };

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
      <div className="flex items-center gap-3">
        {option.icon && <span>{option.icon}</span>}

        <div className="flex-1">
          <div className="font-medium">
            {highlightText(option.label, query)}
          </div>
          {option.description && (
            <div
              className="text-sm mt-0.5"
              style={{ color: theme.colors.text.muted }}
            >
              {highlightText(option.description, query)}
            </div>
          )}
          {option.category && (
            <div className="text-xs mt-1">
              <span
                className="px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: theme.colors.surfaceHover,
                  color: theme.colors.text.muted,
                }}
              >
                {option.category}
              </span>
            </div>
          )}
        </div>

        {isSelected && <Icon name="Check" size="sm" color="brand" />}
      </div>
    </div>
  );
};

// Pre-configured variants
export const PrimaryAutocomplete = React.forwardRef<
  HTMLDivElement,
  Omit<AutocompleteProps, "variant">
>((props, ref) => <Autocomplete ref={ref} variant="filled" {...props} />);
(PrimaryAutocomplete as { displayName?: string }).displayName =
  "PrimaryAutocomplete";

export const OutlineAutocomplete = React.forwardRef<
  HTMLDivElement,
  Omit<AutocompleteProps, "variant">
>((props, ref) => <Autocomplete ref={ref} variant="outline" {...props} />);
(OutlineAutocomplete as { displayName?: string }).displayName =
  "OutlineAutocomplete";

export const AsyncAutocomplete = React.forwardRef<
  HTMLDivElement,
  Omit<AutocompleteProps, "source"> & {
    source: (query: string) => Promise<AutocompleteOption[]>;
  }
>((props, ref) => <Autocomplete ref={ref} {...props} />);
(AsyncAutocomplete as { displayName?: string }).displayName =
  "AsyncAutocomplete";

export const FreeSoloAutocomplete = React.forwardRef<
  HTMLDivElement,
  Omit<AutocompleteProps, "freeSolo">
>((props, ref) => <Autocomplete ref={ref} freeSolo={true} {...props} />);
(FreeSoloAutocomplete as { displayName?: string }).displayName =
  "FreeSoloAutocomplete";
