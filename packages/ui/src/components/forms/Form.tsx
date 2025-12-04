// packages/ui/src/components/Form.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FormEvent,
} from "react";
import { useTheme } from "../../contexts/themeContext";

// Form context for validation and state management
interface FormContextType {
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  values: Record<string, any>;
  setFieldValue: (name: string, value: any) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  setFieldError: (name: string, error: string) => void;
  validateField: (name: string, value: any) => string | null;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

// Hook to use form context
export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a Form component");
  }
  return context;
};

// Main Form component props
interface FormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  children: ReactNode;
  initialValues?: Record<string, any>;
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
  validate?: (values: Record<string, any>) => Record<string, string>;
  className?: string;
  spacing?: "none" | "sm" | "md" | "lg";
  layout?: "vertical" | "horizontal";
}

export const Form = ({
  children,
  initialValues = {},
  onSubmit,
  validate,
  className = "",
  spacing = "md",
  layout = "vertical",
  ...props
}: FormProps) => {
  const { theme } = useTheme();
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Spacing classes
  const spacingClasses = {
    none: "",
    sm: "space-y-3",
    md: "space-y-4",
    lg: "space-y-6",
  };

  // Layout classes
  const layoutClasses =
    layout === "horizontal" ? "space-y-0 space-x-4 flex items-start" : "";

  const setFieldValue = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));

    // Clear error when field value changes
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Validate if field has been touched
    if (touched[name] && validate) {
      const newErrors = validate({ ...values, [name]: value });
      if (newErrors[name]) {
        setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
      }
    }
  };

  const setFieldTouched = (name: string, isTouched: boolean) => {
    setTouched((prev) => ({ ...prev, [name]: isTouched }));

    // Validate on blur if validate function exists
    if (isTouched && validate) {
      const newErrors = validate(values);
      if (newErrors[name]) {
        setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
      }
    }
  };

  const setFieldError = (name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateField = (name: string, value: any): string | null => {
    if (!validate) return null;

    const newErrors = validate({ ...values, [name]: value });
    return newErrors[name] || null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Validate all fields
      if (validate) {
        const newErrors = validate(values);
        setErrors(newErrors);

        // If there are errors, don't submit
        if (Object.keys(newErrors).some((key) => newErrors[key])) {
          setIsSubmitting(false);
          return;
        }
      }

      // Mark all fields as touched
      const allTouched: Record<string, boolean> = {};
      Object.keys(values).forEach((key) => {
        allTouched[key] = true;
      });
      setTouched(allTouched);

      // Call onSubmit if provided
      if (onSubmit) {
        await onSubmit(values);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contextValue: FormContextType = {
    errors,
    touched,
    values,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    validateField,
    isSubmitting,
    setIsSubmitting,
  };

  return (
    <FormContext.Provider value={contextValue}>
      <form
        onSubmit={handleSubmit}
        className={`${spacingClasses[spacing]} ${layoutClasses} ${className}`}
        style={{
          color: theme.colors.text.primary,
        }}
        {...props}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

// Form Group component for grouping related fields
interface FormGroupProps {
  children: ReactNode;
  label?: string;
  helperText?: string;
  error?: string;
  className?: string;
  spacing?: "none" | "sm" | "md" | "lg";
}

export const FormGroup = ({
  children,
  label,
  helperText,
  error,
  className = "",
  spacing = "sm",
}: FormGroupProps) => {
  const { theme } = useTheme();
  const { errors } = useForm();

  const groupError =
    error || Object.values(errors).find((err) => err) || undefined;

  const spacingClasses = {
    none: "",
    sm: "space-y-2",
    md: "space-y-3",
    lg: "space-y-4",
  };

  return (
    <div className={`flex flex-col ${spacingClasses[spacing]} ${className}`}>
      {label && (
        <label
          className="text-base font-semibold"
          style={{
            color: groupError ? theme.colors.error : theme.colors.text.primary,
          }}
        >
          {label}
        </label>
      )}

      <div className={spacingClasses[spacing]}>{children}</div>

      {(helperText || groupError) && (
        <p
          className="text-sm"
          style={{
            color: groupError ? theme.colors.error : theme.colors.text.muted,
          }}
        >
          {groupError || helperText}
        </p>
      )}
    </div>
  );
};

// Form Field component for wrapping individual form controls
interface FormFieldProps {
  children: ReactNode;
  name: string;
  label?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
}

export const FormField = ({
  children,
  name,
  label,
  helperText,
  required,
  className = "",
}: FormFieldProps) => {
  const { theme } = useTheme();
  const { errors, touched, setFieldTouched } = useForm();

  const error = errors[name];
  const isTouched = touched[name];

  // Clone child with form props
  const enhancedChild = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps: any = {
        name,
        error: isTouched && error ? error : undefined,
        required,
        onBlur: () => setFieldTouched(name, true),
      };

      // Only add value and onChange for controlled components
      if (
        child.props.value !== undefined ||
        child.props.onChange !== undefined
      ) {
        const { values, setFieldValue } = useForm();
        childProps.value = values[name];
        childProps.onChange = (value: any) => {
          setFieldValue(name, value);
          if (child.props.onChange) {
            child.props.onChange(value);
          }
        };
      }

      return React.cloneElement(child, childProps);
    }
    return child;
  });

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          className="text-sm font-medium"
          style={{
            color:
              isTouched && error
                ? theme.colors.error
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

      {enhancedChild}

      {helperText && !error && (
        <p className="text-sm" style={{ color: theme.colors.text.muted }}>
          {helperText}
        </p>
      )}
    </div>
  );
};

// Form Actions component for submit/reset buttons
interface FormActionsProps {
  children: ReactNode;
  className?: string;
  justify?: "start" | "center" | "end" | "between";
}

export const FormActions = ({
  children,
  className = "",
  justify = "end",
}: FormActionsProps) => {
  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
  };

  return (
    <div className={`flex gap-3 ${justifyClasses[justify]} ${className}`}>
      {children}
    </div>
  );
};

// Form Error component for displaying form-level errors
interface FormErrorProps {
  message: string;
  className?: string;
}

export const FormError = ({ message, className = "" }: FormErrorProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={`p-3 rounded-lg ${className}`}
      style={{
        backgroundColor: theme.colors.error + "10",
        border: `1px solid ${theme.colors.error}`,
        color: theme.colors.error,
      }}
    >
      <div className="flex items-center gap-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

// Form Success component for displaying success messages
interface FormSuccessProps {
  message: string;
  className?: string;
}

export const FormSuccess = ({ message, className = "" }: FormSuccessProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={`p-3 rounded-lg ${className}`}
      style={{
        backgroundColor: theme.colors.success + "10",
        border: `1px solid ${theme.colors.success}`,
        color: theme.colors.success,
      }}
    >
      <div className="flex items-center gap-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

// Form Row component for horizontal layouts
interface FormRowProps {
  children: ReactNode;
  className?: string;
  spacing?: "none" | "sm" | "md" | "lg";
}

export const FormRow = ({
  children,
  className = "",
  spacing = "md",
}: FormRowProps) => {
  const spacingClasses = {
    none: "gap-0",
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
  };

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 ${spacingClasses[spacing]} ${className}`}
    >
      {children}
    </div>
  );
};
