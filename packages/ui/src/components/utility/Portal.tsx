// packages/ui/src/components/utility/Portal.tsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export interface PortalProps {
  /** Content to render in portal */
  children: React.ReactNode;

  /** Target container for portal (defaults to document.body) */
  container?: HTMLElement;

  /** Disable portal rendering (render children inline) */
  disabled?: boolean;

  /** Additional CSS class for portal container */
  className?: string;

  /** Additional styles for portal container */
  style?: React.CSSProperties;
}

export const Portal = ({
  children,
  container,
  disabled = false,
  className = "",
  style,
}: PortalProps) => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    if (disabled || typeof document === "undefined") {
      setPortalContainer(null);
      return;
    }

    // Use provided container or default to body
    const targetContainer = container || document.body;

    // Create portal container element
    const div = document.createElement("div");

    // Apply className if provided
    if (className) {
      div.className = className;
    }

    // Apply styles
    Object.assign(div.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      zIndex: "9999",
      pointerEvents: "none", // Allow clicks through container
      ...style,
    });

    // Append to DOM
    targetContainer.appendChild(div);
    setPortalContainer(div);

    // Cleanup on unmount
    return () => {
      if (targetContainer && targetContainer.contains(div)) {
        targetContainer.removeChild(div);
      }
    };
  }, [container, disabled, className, style]);

  // If disabled or no portal container, render children inline
  if (disabled || !portalContainer) {
    return <>{children}</>;
  }

  // Render children through portal
  return ReactDOM.createPortal(
    <div style={{ pointerEvents: "auto" }}>{children}</div>,
    portalContainer
  );
};

Portal.displayName = "Portal";
