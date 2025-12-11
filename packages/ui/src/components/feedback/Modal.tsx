// packages/ui/src/components/feedback/Modal.tsx
import React, { useEffect } from "react";
import { useTheme } from "../../contexts/themeContext";
import { createPortal } from "react-dom";

// ============================================
// Types and Interfaces
// ============================================

export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";
export type ModalVariant = "default" | "centered" | "drawer";

export interface ModalProps {
  /** Whether modal is open */
  isOpen: boolean;

  /** Callback when modal closes */
  onClose: () => void;

  /** Modal title */
  title?: string;

  /** Modal content */
  children: React.ReactNode;

  /** Modal size */
  size?: ModalSize;

  /** Modal variant */
  variant?: ModalVariant;

  /** Whether to show close button */
  showCloseButton?: boolean;

  /** Whether clicking overlay closes modal */
  closeOnOverlayClick?: boolean;

  /** Whether pressing Escape closes modal */
  closeOnEsc?: boolean;

  /** Whether to show overlay */
  showOverlay?: boolean;

  /** Whether modal is fullscreen on mobile */
  mobileFullscreen?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** Additional styles */
  style?: React.CSSProperties;

  /** Footer content */
  footer?: React.ReactNode;

  /** Whether modal is loading */
  isLoading?: boolean;

  /** Loading text */
  loadingText?: string;
}

// ============================================
// Main Modal Component
// ============================================

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  variant = "default",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showOverlay = true,
  mobileFullscreen = true,
  className = "",
  style,
  footer,
  isLoading = false,
  loadingText = "Loading...",
}: ModalProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  // Handle Escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEsc && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden"; // Prevent scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = ""; // Restore scrolling
    };
  }, [isOpen, closeOnEsc, onClose]);

  // Handle overlay click
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case "xs":
        return "max-w-xs";
      case "sm":
        return "max-w-sm";
      case "md":
        return "max-w-md";
      case "lg":
        return "max-w-lg";
      case "xl":
        return "max-w-xl";
      case "full":
        return "max-w-full mx-4";
      default:
        return "max-w-md";
    }
  };

  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case "centered":
        return {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        };
      case "drawer":
        return {
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        };
      case "default":
      default:
        return {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        };
    }
  };

  // Get modal styles based on variant
  const getModalStyles = () => {
    const baseStyles: React.CSSProperties = {
      backgroundColor: colors.surface,
      color: colors.text.primary,
      borderRadius: "0.75rem",
      boxShadow: `0 20px 25px -5px ${colors.overlay}30, 0 10px 10px -5px ${colors.overlay}15`,
    };

    if (variant === "drawer") {
      baseStyles.borderRadius = "0.75rem 0.75rem 0 0";
      baseStyles.width = "100%";
      baseStyles.maxHeight = "90vh";
      baseStyles.marginTop = "auto";
    }

    if (size === "full") {
      baseStyles.width = "100%";
      baseStyles.height = mobileFullscreen ? "100vh" : "90vh";
      baseStyles.borderRadius =
        variant === "drawer" ? "0.75rem 0.75rem 0 0" : "0";
    }

    return baseStyles;
  };

  // Don't render if not open
  if (!isOpen) return null;

  const sizeClasses = getSizeClasses();
  const variantStyles = getVariantStyles();
  const modalStyles = getModalStyles();

  // Render modal portal
  const modalContent = (
    <div
      className={`fixed inset-0 z-50 ${
        variant === "drawer" ? "overflow-hidden" : "overflow-y-auto"
      }`}
      style={variantStyles}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Overlay */}
      {showOverlay && (
        <div
          className="fixed inset-0 transition-opacity"
          style={{
            backgroundColor: colors.overlay,
            backdropFilter: "blur(4px)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Modal container */}
      <div
        className={`relative ${sizeClasses} ${
          mobileFullscreen ? "w-full md:w-auto" : "w-full"
        } ${className}`}
        style={{
          ...modalStyles,
          ...style,
        }}
      >
        {/* Loading overlay */}
        {isLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center z-10 rounded-lg"
            style={{
              backgroundColor: `${colors.surface}CC`,
              backdropFilter: "blur(2px)",
            }}
          >
            <div className="text-center">
              <div
                className="inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                style={{
                  width: "2rem",
                  height: "2rem",
                  color: colors.brand[500],
                }}
                role="status"
              />
              {loadingText && (
                <div className="mt-2" style={{ color: colors.text.primary }}>
                  {loadingText}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Header */}
        {(title || showCloseButton) && (
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: colors.surfaceBorder }}
          >
            {title && (
              <h3
                id="modal-title"
                className="text-lg font-semibold"
                style={{ color: colors.text.primary }}
              >
                {title}
              </h3>
            )}

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-md hover:bg-surfaceHover focus:outline-none focus:ring-2 focus:ring-focusRing transition-colors"
                style={{ color: colors.text.muted }}
                aria-label="Close modal"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="15" y1="5" x2="5" y2="15" />
                  <line x1="5" y1="5" x2="15" y2="15" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div
            className="px-6 py-4 border-t"
            style={{
              borderColor: colors.surfaceBorder,
              backgroundColor: colors.backgroundSubtle,
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

// ============================================
// Pre-built Modal Components
// ============================================

// Confirmation Modal
export interface ConfirmationModalProps
  extends Omit<ModalProps, "children" | "footer" | "variant"> {
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: "danger" | "warning" | "info";
}

export const ConfirmationModal = ({
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = "info",
  onClose,
  ...props
}: ConfirmationModalProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  const getVariantColor = () => {
    switch (variant) {
      case "danger":
        return colors.error;
      case "warning":
        return colors.warning;
      case "info":
      default:
        return colors.info;
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    onClose();
  };

  const footer = (
    <div className="flex justify-end gap-3">
      <button
        type="button"
        onClick={handleCancel}
        className="px-4 py-2 rounded-lg font-medium transition-colors"
        style={{
          backgroundColor: colors.surfaceHover,
          color: colors.text.primary,
          border: `1px solid ${colors.surfaceBorder}`,
        }}
      >
        {cancelText}
      </button>
      <button
        type="button"
        onClick={handleConfirm}
        className="px-4 py-2 rounded-lg font-medium transition-colors"
        style={{
          backgroundColor: getVariantColor(),
          color: colors.text.inverted,
          border: `1px solid ${getVariantColor()}`,
        }}
      >
        {confirmText}
      </button>
    </div>
  );

  return (
    <Modal {...props} onClose={onClose} footer={footer}>
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 p-2 rounded-full"
          style={{
            backgroundColor: `${getVariantColor()}20`,
            color: getVariantColor(),
          }}
        >
          {variant === "danger" ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="10" cy="10" r="9" />
              <line x1="10" y1="6" x2="10" y2="10" />
              <line x1="10" y1="14" x2="10.01" y2="14" />
            </svg>
          ) : variant === "warning" ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="10" y1="8" x2="10" y2="12" />
              <line x1="10" y1="16" x2="10.01" y2="16" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="10" cy="10" r="9" />
              <line x1="10" y1="14" x2="10" y2="10" />
              <line x1="10" y1="6" x2="10.01" y2="6" />
            </svg>
          )}
        </div>
        <div style={{ color: colors.text.primary }}>{message}</div>
      </div>
    </Modal>
  );
};

// Alert Modal (uses Alert component inside)
export const AlertModal = ({
  children,
  ...props
}: Omit<ModalProps, "children"> & { children: React.ReactNode }) => {
  return (
    <Modal size="sm" {...props}>
      <div className="text-center">{children}</div>
    </Modal>
  );
};

// Fullscreen Modal
export const FullscreenModal = (
  props: Omit<ModalProps, "size" | "mobileFullscreen">
) => <Modal size="full" mobileFullscreen={true} {...props} />;

// Drawer Modal (side modal)
export interface DrawerModalProps extends Omit<ModalProps, "variant"> {
  position?: "left" | "right" | "top" | "bottom";
}

export const DrawerModal = ({
  position = "right",
  ...props
}: DrawerModalProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  const getDrawerStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      backgroundColor: colors.surface,
      color: colors.text.primary,
      boxShadow: `0 20px 25px -5px ${colors.overlay}30`,
    };

    switch (position) {
      case "left":
        return {
          ...baseStyles,
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "400px",
          maxWidth: "90vw",
          borderRadius: "0 0.75rem 0.75rem 0",
          transform: props.isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
        };
      case "right":
        return {
          ...baseStyles,
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "400px",
          maxWidth: "90vw",
          borderRadius: "0.75rem 0 0 0.75rem",
          transform: props.isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
        };
      case "top":
        return {
          ...baseStyles,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "400px",
          maxHeight: "90vh",
          borderRadius: "0 0 0.75rem 0.75rem",
          transform: props.isOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease",
        };
      case "bottom":
        return {
          ...baseStyles,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "400px",
          maxHeight: "90vh",
          borderRadius: "0.75rem 0.75rem 0 0",
          transform: props.isOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease",
        };
      default:
        return baseStyles;
    }
  };

  const drawerStyles = getDrawerStyles();

  if (!props.isOpen && position !== "right") return null;

  const drawerContent = (
    <>
      {/* Overlay */}
      {props.showOverlay && props.isOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity"
          style={{
            backgroundColor: colors.overlay,
            backdropFilter: "blur(4px)",
            opacity: props.isOpen ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
          onClick={props.closeOnOverlayClick ? props.onClose : undefined}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div className="fixed z-50 overflow-y-auto" style={drawerStyles}>
        <div className="h-full flex flex-col">
          {/* Header */}
          {(props.title || props.showCloseButton) && (
            <div
              className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
              style={{ borderColor: colors.surfaceBorder }}
            >
              {props.title && (
                <h3
                  className="text-lg font-semibold"
                  style={{ color: colors.text.primary }}
                >
                  {props.title}
                </h3>
              )}

              {props.showCloseButton && (
                <button
                  type="button"
                  onClick={props.onClose}
                  className="p-1 rounded-md hover:bg-surfaceHover focus:outline-none focus:ring-2 focus:ring-focusRing transition-colors"
                  style={{ color: colors.text.muted }}
                  aria-label="Close drawer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="15" y1="5" x2="5" y2="15" />
                    <line x1="5" y1="5" x2="15" y2="15" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 px-6 py-4 overflow-y-auto">
            {props.children}
          </div>

          {/* Footer */}
          {props.footer && (
            <div
              className="px-6 py-4 border-t flex-shrink-0"
              style={{ borderColor: colors.surfaceBorder }}
            >
              {props.footer}
            </div>
          )}
        </div>
      </div>
    </>
  );

  return createPortal(drawerContent, document.body);
};

// Modal Hook (for programmatic control)
export const useModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);

  return {
    isOpen,
    open,
    close,
    toggle,
    modalProps: {
      isOpen,
      onClose: close,
    },
  };
};
