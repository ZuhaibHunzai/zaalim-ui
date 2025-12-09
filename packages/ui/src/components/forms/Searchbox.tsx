// packages/ui/src/components/forms/SearchBox.tsx
import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
  forwardRef,
} from "react";
import { useTheme } from "../../contexts/themeContext";
import { Box } from "../foundation/Box";
import { Flex } from "../foundation/Flex";

export type SearchBoxVariant = "default" | "filled" | "outline" | "ghost";

export interface SearchBoxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children"> {
  /** Current search value */
  value?: string;

  /** Default value (uncontrolled) */
  defaultValue?: string;

  /** Callback when search value changes */
  onChange?: (value: string) => void;

  /** Callback when search is submitted (Enter key or search button) */
  onSearch?: (value: string) => void;

  /** Callback when clear button is clicked */
  onClear?: () => void;

  /** Placeholder text */
  placeholder?: string;

  /** Whether search is disabled */
  disabled?: boolean;

  /** Loading state (shows spinner) */
  loading?: boolean;

  /** Size of the search box */
  size?: "sm" | "md" | "lg";

  /** Variant style */
  variant?: SearchBoxVariant;

  /** Whether to show clear button */
  clearable?: boolean;

  /** Whether to show search button */
  showSearchButton?: boolean;

  /** Custom search button text/icon */
  searchButton?: React.ReactNode;

  /** Custom clear button text/icon */
  clearButton?: React.ReactNode;

  /** Additional CSS classes */
  className?: string;

  /** Auto-focus on mount */
  autoFocus?: boolean;

  /** Debounce delay in milliseconds */
  debounceDelay?: number;

  /** Minimum characters before triggering search */
  minLength?: number;

  /** Children (not used directly, but allows forwardRef) */
  children?: never;
}

export const SearchBox = forwardRef<HTMLDivElement, SearchBoxProps>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      onChange,
      onSearch,
      onClear,
      placeholder = "Search...",
      disabled = false,
      loading = false,
      size = "md",
      variant = "default",
      clearable = true,
      showSearchButton = true,
      searchButton,
      clearButton,
      className = "",
      autoFocus = false,
      debounceDelay,
      minLength = 1,
      ...props
    }: SearchBoxProps,
    ref
  ) => {
    const { theme } = useTheme();
    const colors = theme.colors;

    // State for uncontrolled usage
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout>>();

    // Determine value (controlled vs uncontrolled)
    const value =
      controlledValue !== undefined ? controlledValue : internalValue;
    const isEmpty = value.trim().length === 0;
    const canSearch = value.trim().length >= minLength;

    // Handle value changes
    const handleValueChange = (newValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      if (onChange) {
        onChange(newValue);
      }

      // Debounce logic
      if (debounceDelay && debounceDelay > 0 && onSearch) {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        debounceTimerRef.current = setTimeout(() => {
          if (newValue.trim().length >= minLength) {
            onSearch(newValue);
          }
        }, debounceDelay);
      }
    };

    // Handle input change
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      handleValueChange(e.target.value);
    };

    // Handle clear
    const handleClear = () => {
      handleValueChange("");
      inputRef.current?.focus();
      if (onClear) {
        onClear();
      }
    };

    // Handle search submit
    const handleSearch = () => {
      if (canSearch && onSearch) {
        onSearch(value);
      }
    };

    // Handle Enter key
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && canSearch && onSearch) {
        e.preventDefault();
        onSearch(value);
      }
      if (e.key === "Escape" && clearable && !isEmpty) {
        e.preventDefault();
        handleClear();
      }
    };

    // Auto-focus
    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, [autoFocus]);

    // Cleanup debounce timer
    useEffect(() => {
      return () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
      };
    }, []);

    // Size classes
    const sizeClasses = {
      sm: "h-8 text-sm",
      md: "h-10 text-base",
      lg: "h-12 text-lg",
    };

    // Variant styles
    const getVariantStyles = () => {
      switch (variant) {
        case "filled":
          return {
            backgroundColor: colors.surfaceHover,
            border: `1px solid ${colors.surfaceHover}`,
            color: colors.text.primary,
          };
        case "outline":
          return {
            backgroundColor: colors.background,
            border: `1px solid ${colors.border}`,
            color: colors.text.primary,
          };
        case "ghost":
          return {
            backgroundColor: "transparent",
            border: `1px solid transparent`,
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
    const getFocusStyles = () => {
      if (!isFocused) return {};

      return {
        borderColor: colors.brand[500],
        boxShadow: `0 0 0 3px ${colors.brand[500]}20`,
      };
    };

    // Combined styles for input
    const inputStyle: React.CSSProperties = {
      ...getVariantStyles(),
      ...getFocusStyles(),
      outline: "none",
      width: "100%",
      paddingLeft: "2.5rem",
      paddingRight: clearable && !isEmpty ? "2.5rem" : "1rem",
      transition: "all 0.2s ease",
    };

    // Render search icon
    const renderSearchIcon = () => (
      <div
        className="absolute left-3 top-1/2 transform -translate-y-1/2"
        style={{ color: colors.text.muted }}
      >
        {loading ? (
          <Spinner size={size} />
        ) : (
          <svg
            width={size === "sm" ? "14" : size === "md" ? "16" : "18"}
            height={size === "sm" ? "14" : size === "md" ? "16" : "18"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        )}
      </div>
    );

    // Render clear button
    const renderClearButton = () => {
      if (!clearable || isEmpty || disabled) return null;

      return (
        <button
          type="button"
          onClick={handleClear}
          disabled={disabled}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-surfaceHover transition-colors"
          style={{ color: colors.text.muted }}
          aria-label="Clear search"
        >
          {clearButton || (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </button>
      );
    };

    // Render search button
    const renderSearchButton = () => {
      if (!showSearchButton) return null;

      return (
        <button
          type="button"
          onClick={handleSearch}
          disabled={disabled || !canSearch}
          className="ml-2 px-4 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: canSearch
              ? colors.brand[500]
              : colors.surfaceHover,
            color: canSearch ? colors.brand[600] : colors.text.disabled,
            height: sizeClasses[size].split(" ")[0],
          }}
          aria-label="Search"
        >
          {searchButton || "Search"}
        </button>
      );
    };

    return (
      <div ref={ref} className={className} {...props}>
        <Flex align="center">
          <Box className="relative flex-1">
            {renderSearchIcon()}

            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              disabled={disabled}
              className={`
              ${sizeClasses[size]}
              rounded-md
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-text"}
              w-full
            `}
              style={inputStyle}
              aria-label="Search input"
            />

            {renderClearButton()}
          </Box>

          {renderSearchButton()}
        </Flex>
      </div>
    );
  }
);

SearchBox.displayName = "SearchBox";

// Spinner component
interface SpinnerProps {
  size?: "sm" | "md" | "lg";
}

const Spinner = ({ size = "md" }: SpinnerProps) => {
  const { theme } = useTheme();

  const dimensions = {
    sm: "12px",
    md: "14px",
    lg: "16px",
  };

  return (
    <div className="animate-spin">
      <svg
        width={dimensions[size]}
        height={dimensions[size]}
        viewBox="0 0 24 24"
        fill="none"
        stroke={theme.colors.brand[500]}
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
        <path d="M12 2 a10 10 0 0 1 10 10" />
      </svg>
    </div>
  );
};

// Autocomplete Option Interface
export interface AutocompleteOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  group?: string;
}

// SearchBox with Autocomplete
export interface SearchBoxAutocompleteProps
  extends Omit<SearchBoxProps, "onSearch" | "onSelect" | "children"> {
  options?: AutocompleteOption[];
  showAutocomplete?: boolean;
  maxResults?: number;
  onSelect?: (option: AutocompleteOption) => void;
  renderOption?: (option: AutocompleteOption) => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  children?: never;
}

export const SearchBoxAutocomplete = forwardRef<
  HTMLDivElement,
  SearchBoxAutocompleteProps
>(
  (
    {
      options = [],
      showAutocomplete = true,
      maxResults = 10,
      onSelect,
      renderOption,
      renderEmpty,
      onChange,
      value,
      ...props
    }: SearchBoxAutocompleteProps,
    ref
  ) => {
    const { theme } = useTheme();
    const colors = theme.colors;
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState<
      AutocompleteOption[]
    >([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Filter options based on search value
    useEffect(() => {
      if (!value || !showAutocomplete) {
        setFilteredOptions([]);
        setIsOpen(false);
        return;
      }

      const searchTerm = value.toLowerCase();
      const filtered = options
        .filter(
          (option) =>
            option.label.toLowerCase().includes(searchTerm) ||
            option.value.toLowerCase().includes(searchTerm) ||
            option.description?.toLowerCase().includes(searchTerm)
        )
        .slice(0, maxResults);

      setFilteredOptions(filtered);
      setIsOpen(filtered.length > 0);
    }, [value, options, showAutocomplete, maxResults]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle option selection
    const handleOptionSelect = (option: AutocompleteOption) => {
      if (onChange) {
        onChange(option.label);
      }
      if (onSelect) {
        onSelect(option);
      }
      setIsOpen(false);
    };

    // Handle search box change
    const handleSearchBoxChange = (newValue: string) => {
      if (onChange) {
        onChange(newValue);
      }
    };

    // Default option renderer
    const defaultRenderOption = (option: AutocompleteOption) => (
      <Flex
        key={option.value}
        align="center"
        className="px-4 py-3 hover:bg-surfaceHover cursor-pointer transition-colors"
        onClick={() => handleOptionSelect(option)}
      >
        {option.icon && (
          <Box className="mr-3" style={{ color: colors.text.muted }}>
            {option.icon}
          </Box>
        )}
        <Box className="flex-1">
          <div style={{ color: colors.text.primary, fontWeight: 500 }}>
            {option.label}
          </div>
          {option.description && (
            <div className="text-sm mt-1" style={{ color: colors.text.muted }}>
              {option.description}
            </div>
          )}
        </Box>
      </Flex>
    );

    // Render grouped options
    const renderOptions = () => {
      if (filteredOptions.length === 0) {
        return renderEmpty ? (
          renderEmpty()
        ) : (
          <Box
            className="px-4 py-3 text-center"
            style={{ color: colors.text.muted }}
          >
            No results found
          </Box>
        );
      }

      const groups: Record<string, AutocompleteOption[]> = {};

      filteredOptions.forEach((option) => {
        const group = option.group || "Results";
        if (!groups[group]) {
          groups[group] = [];
        }
        groups[group].push(option);
      });

      return Object.entries(groups).map(([groupName, groupOptions]) => (
        <div key={groupName}>
          {groupName !== "Results" && (
            <Box
              className="px-4 py-2 text-xs font-semibold uppercase"
              style={{
                backgroundColor: colors.backgroundSubtle,
                color: colors.text.muted,
              }}
            >
              {groupName}
            </Box>
          )}
          {groupOptions.map((option) =>
            renderOption ? renderOption(option) : defaultRenderOption(option)
          )}
        </div>
      ));
    };

    return (
      <div className="relative" ref={wrapperRef}>
        <SearchBox
          ref={ref}
          value={value}
          onChange={handleSearchBoxChange}
          {...props}
          onFocus={() => {
            if (filteredOptions.length > 0) setIsOpen(true);
          }}
        />

        {isOpen && (
          <Box
            className="absolute top-full left-0 right-0 mt-1 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
            style={{
              backgroundColor: colors.surface,
              border: `1px solid ${colors.surfaceBorder}`,
            }}
          >
            {renderOptions()}
          </Box>
        )}
      </div>
    );
  }
);

SearchBoxAutocomplete.displayName = "SearchBoxAutocomplete";

// QuickSearch component
export const QuickSearch = forwardRef<
  HTMLDivElement,
  Omit<SearchBoxProps, "size" | "showSearchButton">
>((props, ref) => (
  <SearchBox
    ref={ref}
    size="sm"
    showSearchButton={false}
    clearable={false}
    {...props}
  />
));

QuickSearch.displayName = "QuickSearch";
