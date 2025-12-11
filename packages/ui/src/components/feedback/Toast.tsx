// packages/ui/src/components/feedback/Toast.tsx
import React, { createContext, useContext, useState, useCallback } from "react";
import { useTheme } from "../../contexts/themeContext";
import { Alert, AlertStatus } from "./Alert";

// ============================================
// Types and Interfaces
// ============================================

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastOptions {
  /** Toast ID (auto-generated if not provided) */
  id?: string;

  /** Toast title */
  title: string;

  /** Toast message/description */
  description?: string;

  /** Toast status/type */
  status?: AlertStatus;

  /** Duration in milliseconds (0 = persistent) */
  duration?: number;

  /** Whether toast is dismissible */
  dismissible?: boolean;

  /** Custom icon */
  icon?: React.ReactNode;

  /** Action buttons */
  actions?: React.ReactNode;

  /** Callback when toast is dismissed */
  onDismiss?: () => void;

  /** Additional data */
  data?: Record<string, any>;
}

export interface ToastProps extends ToastOptions {
  /** Callback to remove this toast */
  onRemove: (id: string) => void;
}

// ============================================
// Toast Component (Individual Toast)
// ============================================

export const Toast = ({
  id,
  title,
  description,
  status = "info",
  duration = 5000,
  dismissible = true,
  icon,
  actions,
  onDismiss,
  onRemove,
  data,
}: ToastProps) => {
  const handleDismiss = useCallback(() => {
    if (onDismiss) {
      onDismiss();
    }
    if (id) {
      onRemove(id);
    }
  }, [id, onDismiss, onRemove]);

  return (
    <Alert
      status={status}
      title={title}
      description={description}
      size="sm"
      dismissible={dismissible}
      onDismiss={handleDismiss}
      icon={icon}
      actions={actions}
      inline={true}
      className="mb-2 last:mb-0 shadow-lg"
    />
  );
};

// ============================================
// Toast Context & Provider
// ============================================

interface ToastContextType {
  toasts: Array<ToastOptions & { id: string }>;
  addToast: (options: ToastOptions) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

export const ToastProvider = ({
  children,
  position = "top-right",
  maxToasts = 5,
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Array<ToastOptions & { id: string }>>(
    []
  );

  const addToast = useCallback(
    (options: ToastOptions) => {
      const id =
        options.id ||
        `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      setToasts((prev) => {
        const newToasts = [{ ...options, id }, ...prev];
        // Limit number of toasts
        if (newToasts.length > maxToasts) {
          return newToasts.slice(0, maxToasts);
        }
        return newToasts;
      });

      // Auto-remove if duration is set
      if (options.duration !== 0 && options.duration !== undefined) {
        setTimeout(() => {
          removeToast(id);
        }, options.duration);
      }

      return id;
    },
    [maxToasts]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const contextValue: ToastContextType = {
    toasts,
    addToast,
    removeToast,
    clearToasts,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer position={position} />
    </ToastContext.Provider>
  );
};

// ============================================
// Toast Container (Renders all toasts)
// ============================================

interface ToastContainerProps {
  position: ToastPosition;
}

export const ToastContainer = ({ position }: ToastContainerProps) => {
  const { toasts, removeToast } = useToast();
  const { theme } = useTheme();

  if (toasts.length === 0) return null;

  // Get position classes
  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "top-4 left-4";
      case "top-center":
        return "top-4 left-1/2 transform -translate-x-1/2";
      case "top-right":
        return "top-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "bottom-center":
        return "bottom-4 left-1/2 transform -translate-x-1/2";
      case "bottom-right":
        return "bottom-4 right-4";
      default:
        return "top-4 right-4";
    }
  };

  // Get container width based on position
  const getContainerWidth = () => {
    if (position.includes("center")) {
      return "w-full max-w-md";
    }
    return "w-80";
  };

  const positionClasses = getPositionClasses();
  const containerWidth = getContainerWidth();

  return (
    <div
      className={`fixed z-50 ${positionClasses} ${containerWidth}`}
      style={{ pointerEvents: "none" }}
    >
      <div style={{ pointerEvents: "auto" }}>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onRemove={removeToast} />
        ))}
      </div>
    </div>
  );
};

// ============================================
// Toast Hook (Convenience functions)
// ============================================

export const useToastNotifications = () => {
  const { addToast, removeToast, clearToasts } = useToast();

  const showToast = useCallback(
    (options: ToastOptions) => {
      return addToast(options);
    },
    [addToast]
  );

  const success = useCallback(
    (title: string, description?: string, options?: Partial<ToastOptions>) => {
      return addToast({
        title,
        description,
        status: "success",
        ...options,
      });
    },
    [addToast]
  );

  const error = useCallback(
    (title: string, description?: string, options?: Partial<ToastOptions>) => {
      return addToast({
        title,
        description,
        status: "error",
        ...options,
      });
    },
    [addToast]
  );

  const warning = useCallback(
    (title: string, description?: string, options?: Partial<ToastOptions>) => {
      return addToast({
        title,
        description,
        status: "warning",
        ...options,
      });
    },
    [addToast]
  );

  const info = useCallback(
    (title: string, description?: string, options?: Partial<ToastOptions>) => {
      return addToast({
        title,
        description,
        status: "info",
        ...options,
      });
    },
    [addToast]
  );

  return {
    showToast,
    success,
    error,
    warning,
    info,
    removeToast,
    clearToasts,
  };
};

// ============================================
// Pre-built Toast Functions
// ============================================

// For direct usage without hook
export const toast = {
  success: (
    title: string,
    description?: string,
    options?: Partial<ToastOptions>
  ) => {
    console.warn(
      "toast.success() requires ToastProvider. Use useToastNotifications() hook instead."
    );
    return "";
  },
  error: (
    title: string,
    description?: string,
    options?: Partial<ToastOptions>
  ) => {
    console.warn(
      "toast.error() requires ToastProvider. Use useToastNotifications() hook instead."
    );
    return "";
  },
  warning: (
    title: string,
    description?: string,
    options?: Partial<ToastOptions>
  ) => {
    console.warn(
      "toast.warning() requires ToastProvider. Use useToastNotifications() hook instead."
    );
    return "";
  },
  info: (
    title: string,
    description?: string,
    options?: Partial<ToastOptions>
  ) => {
    console.warn(
      "toast.info() requires ToastProvider. Use useToastNotifications() hook instead."
    );
    return "";
  },
  show: (options: ToastOptions) => {
    console.warn(
      "toast.show() requires ToastProvider. Use useToastNotifications() hook instead."
    );
    return "";
  },
};
