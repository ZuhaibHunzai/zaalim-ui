// packages/ui/src/components/navigation/Steps.tsx
import React from "react";
import { useTheme } from "../../contexts/themeContext";
import { Box } from "../foundation/Box";
import { Flex } from "../foundation/Flex";

export type StepStatus =
  | "pending"
  | "current"
  | "completed"
  | "error"
  | "warning";
export type StepsVariant = "default" | "cards" | "minimal" | "vertical";
export type StepsSize = "sm" | "md" | "lg";

export interface Step {
  /** Unique identifier for the step */
  id: string;

  /** Step number (1-based) */
  number?: number;

  /** Step title */
  title: string;

  /** Step description/subtitle */
  description?: string;

  /** Step status */
  status?: StepStatus;

  /** Icon to display (overrides default status icons) */
  icon?: React.ReactNode;

  /** Whether step is disabled */
  disabled?: boolean;

  /** Error message (when status is 'error') */
  errorMessage?: string;

  /** Warning message (when status is 'warning') */
  warningMessage?: string;

  /** Additional data */
  data?: Record<string, any>;
}

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of steps */
  steps: Step[];

  /** Current active step (0-based index) */
  currentStep?: number;

  /** Callback when a step is clicked */
  onStepClick?: (step: Step, index: number) => void;

  /** Variant style */
  variant?: StepsVariant;

  /** Size */
  size?: StepsSize;

  /** Whether to show step numbers */
  showNumbers?: boolean;

  /** Whether to show step descriptions */
  showDescriptions?: boolean;

  /** Whether to show connecting lines between steps */
  showConnectors?: boolean;

  /** Whether steps are clickable */
  clickable?: boolean;

  /** Custom connector component */
  customConnector?: React.ReactNode;

  /** Whether to show step status icons */
  showStatusIcons?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** Children for custom rendering */
  children?: React.ReactNode;
}

export const Steps = ({
  steps,
  currentStep = 0,
  onStepClick,
  variant = "default",
  size = "md",
  showNumbers = true,
  showDescriptions = true,
  showConnectors = true,
  clickable = true,
  customConnector,
  showStatusIcons = true,
  className = "",
  children,
  ...props
}: StepsProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  // Process steps with numbers and status
  const processedSteps = React.useMemo(() => {
    return steps.map((step, index) => {
      const stepNumber = step.number || index + 1;
      let status = step.status;

      // Determine status if not explicitly set
      if (!status) {
        if (index < currentStep) {
          status = "completed";
        } else if (index === currentStep) {
          status = "current";
        } else {
          status = "pending";
        }
      }

      return {
        ...step,
        number: stepNumber,
        status,
      };
    });
  }, [steps, currentStep]);

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return {
          stepGap: "1rem",
          titleSize: "text-sm",
          descriptionSize: "text-xs",
          iconSize: "1rem",
          numberSize: "0.875rem",
        };
      case "lg":
        return {
          stepGap: "2rem",
          titleSize: "text-lg",
          descriptionSize: "text-base",
          iconSize: "1.5rem",
          numberSize: "1.125rem",
        };
      case "md":
      default:
        return {
          stepGap: "1.5rem",
          titleSize: "text-base",
          descriptionSize: "text-sm",
          iconSize: "1.25rem",
          numberSize: "1rem",
        };
    }
  };

  const sizeClasses = getSizeClasses();

  // Get status colors
  const getStatusColors = (status: StepStatus) => {
    switch (status) {
      case "completed":
        return {
          background: colors.brand[500],
          text: colors.brand[600],
          border: colors.brand[400],
          icon: colors.brand[600],
        };
      case "current":
        return {
          background: colors.brand[500],
          text: colors.text.primary,
          border: colors.brand[500],
          icon: colors.brand[600],
        };
      case "error":
        return {
          background: colors.error,
          text: colors.text.primary,
          border: colors.error,
          icon: "#FFFFFF",
        };
      case "warning":
        return {
          background: colors.warning,
          text: colors.text.primary,
          border: colors.warning,
          icon: "#FFFFFF",
        };
      case "pending":
      default:
        return {
          background: colors.surface,
          text: colors.text.secondary,
          border: colors.border,
          icon: colors.text.muted,
        };
    }
  };

  // Get status icon
  const getStatusIcon = (status: StepStatus) => {
    switch (status) {
      case "completed":
        return (
          <svg
            width={sizeClasses.iconSize}
            height={sizeClasses.iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        );
      case "error":
        return (
          <svg
            width={sizeClasses.iconSize}
            height={sizeClasses.iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        );
      case "warning":
        return (
          <svg
            width={sizeClasses.iconSize}
            height={sizeClasses.iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        );
      case "current":
        return (
          <div
            style={{
              width: sizeClasses.iconSize,
              height: sizeClasses.iconSize,
              borderRadius: "50%",
              backgroundColor: colors.brand[600],
            }}
          />
        );
      default:
        return null;
    }
  };

  // Handle step click
  const handleStepClick = (step: Step, index: number) => {
    if (step.disabled || !clickable) return;

    // Don't allow clicking future steps unless they're completed
    if (index > currentStep && step.status !== "completed") return;

    if (onStepClick) {
      onStepClick(step, index);
    }
  };

  // Render connector between steps
  const renderConnector = (
    index: number,
    prevStatus: StepStatus,
    nextStatus: StepStatus
  ) => {
    if (!showConnectors || index >= processedSteps.length - 1) return null;

    const isCompleted = prevStatus === "completed";
    const connectorColor = isCompleted ? colors.brand[300] : colors.border;

    if (customConnector) {
      return customConnector;
    }

    if (variant === "vertical") {
      return (
        <Box
          className="absolute left-5 top-full"
          style={{
            width: "2px",
            height: `calc(100% - ${sizeClasses.iconSize})`,
            backgroundColor: connectorColor,
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            transition: "background-color 0.3s ease",
          }}
        />
      );
    }

    return (
      <Box
        className="flex-1 h-0.5 mx-2"
        style={{
          backgroundColor: connectorColor,
          transition: "background-color 0.3s ease",
          minWidth: "1rem",
        }}
      />
    );
  };

  // Render step content based on variant
  const renderStepContent = (step: Step, index: number) => {
    const statusColors = getStatusColors(step.status || "pending");
    const isClickable =
      clickable &&
      !step.disabled &&
      (index <= currentStep || step.status === "completed");

    const baseStepStyle: React.CSSProperties = {
      cursor: isClickable
        ? "pointer"
        : step.disabled
        ? "not-allowed"
        : "default",
      opacity: step.disabled ? 0.6 : 1,
      transition: "all 0.2s ease",
    };

    const hoverStyle = isClickable
      ? {
          transform: "translateY(-2px)",
        }
      : {};

    // Common step indicator
    const renderStepIndicator = () => {
      if (step.icon && showStatusIcons) {
        return (
          <Box
            className="flex items-center justify-center rounded-full"
            style={{
              width: `calc(${sizeClasses.iconSize} * 2)`,
              height: `calc(${sizeClasses.iconSize} * 2)`,
              backgroundColor: statusColors.background,
              color: statusColors.icon,
              border: `2px solid ${statusColors.border}`,
            }}
          >
            {step.icon}
          </Box>
        );
      }

      if (showStatusIcons && step.status && step.status !== "pending") {
        return (
          <Box
            className="flex items-center justify-center rounded-full"
            style={{
              width: `calc(${sizeClasses.iconSize} * 2)`,
              height: `calc(${sizeClasses.iconSize} * 2)`,
              backgroundColor: statusColors.background,
              color: statusColors.icon,
              border: `2px solid ${statusColors.border}`,
            }}
          >
            {getStatusIcon(step.status)}
          </Box>
        );
      }

      // Default number indicator
      return (
        <Box
          className="flex items-center justify-center rounded-full font-semibold"
          style={{
            width: `calc(${sizeClasses.iconSize} * 2)`,
            height: `calc(${sizeClasses.iconSize} * 2)`,
            backgroundColor: statusColors.background,
            color: statusColors.text,
            border: `2px solid ${statusColors.border}`,
            fontSize: sizeClasses.numberSize,
          }}
        >
          {showNumbers ? step.number : ""}
        </Box>
      );
    };

    // Render based on variant
    switch (variant) {
      case "cards": {
        const isCurrent = step.status === "current";

        return (
          <Box
            className={`p-4 rounded-lg ${sizeClasses.titleSize}`}
            style={{
              ...baseStepStyle,
              backgroundColor: isCurrent ? colors.surfaceHover : colors.surface,
              border: `1px solid ${
                isCurrent ? colors.brand[300] : colors.surfaceBorder
              }`,
              boxShadow: isCurrent ? `0 0 0 3px ${colors.brand[100]}` : "none",
              flex: 1,
            }}
            onClick={() => handleStepClick(step, index)}
            onMouseEnter={(e) => {
              if (isClickable) {
                Object.assign(e.currentTarget.style, hoverStyle);
              }
            }}
            onMouseLeave={(e) => {
              if (isClickable) {
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            <Flex direction="column" gap={2}>
              <Flex align="center" gap={3}>
                {renderStepIndicator()}
                <Box>
                  <div style={{ color: statusColors.text, fontWeight: 600 }}>
                    {step.title}
                  </div>
                  {showDescriptions && step.description && (
                    <div
                      className={`mt-1 ${sizeClasses.descriptionSize}`}
                      style={{ color: colors.text.muted }}
                    >
                      {step.description}
                    </div>
                  )}
                </Box>
              </Flex>

              {/* Error/Warning messages */}
              {(step.errorMessage || step.warningMessage) && (
                <Box
                  className={`mt-2 p-2 rounded ${sizeClasses.descriptionSize}`}
                  style={{
                    backgroundColor: step.errorMessage
                      ? `${colors.error}15`
                      : `${colors.warning}15`,
                    color: step.errorMessage ? colors.error : colors.warning,
                    borderLeft: `3px solid ${
                      step.errorMessage ? colors.error : colors.warning
                    }`,
                  }}
                >
                  {step.errorMessage || step.warningMessage}
                </Box>
              )}
            </Flex>
          </Box>
        );
      }

      case "minimal":
        return (
          <Flex
            align="center"
            gap={2}
            style={baseStepStyle}
            onClick={() => handleStepClick(step, index)}
            onMouseEnter={(e) => {
              if (isClickable) {
                Object.assign(e.currentTarget.style, hoverStyle);
              }
            }}
            onMouseLeave={(e) => {
              if (isClickable) {
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            {renderStepIndicator()}
            <Box>
              <div
                className={sizeClasses.titleSize}
                style={{ color: statusColors.text, fontWeight: 500 }}
              >
                {step.title}
              </div>
            </Box>
          </Flex>
        );

      case "vertical":
        return (
          <Box
            className="relative"
            style={{ paddingLeft: `calc(${sizeClasses.iconSize} * 2 + 1rem)` }}
          >
            {/* Connector line */}
            {renderConnector(
              index,
              step.status || "pending",
              index < processedSteps.length - 1
                ? processedSteps[index + 1].status || "pending"
                : "pending"
            )}

            <Flex
              align="start"
              gap={3}
              style={baseStepStyle}
              onClick={() => handleStepClick(step, index)}
              onMouseEnter={(e) => {
                if (isClickable) {
                  Object.assign(e.currentTarget.style, hoverStyle);
                }
              }}
              onMouseLeave={(e) => {
                if (isClickable) {
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              <Box style={{ position: "absolute", left: 0 }}>
                {renderStepIndicator()}
              </Box>

              <Box style={{ flex: 1 }}>
                <div
                  className={sizeClasses.titleSize}
                  style={{ color: statusColors.text, fontWeight: 600 }}
                >
                  {step.title}
                </div>
                {showDescriptions && step.description && (
                  <div
                    className={`mt-1 ${sizeClasses.descriptionSize}`}
                    style={{ color: colors.text.muted }}
                  >
                    {step.description}
                  </div>
                )}

                {/* Error/Warning messages */}
                {(step.errorMessage || step.warningMessage) && (
                  <Box
                    className={`mt-2 p-2 rounded ${sizeClasses.descriptionSize}`}
                    style={{
                      backgroundColor: step.errorMessage
                        ? `${colors.error}15`
                        : `${colors.warning}15`,
                      color: step.errorMessage ? colors.error : colors.warning,
                      borderLeft: `3px solid ${
                        step.errorMessage ? colors.error : colors.warning
                      }`,
                    }}
                  >
                    {step.errorMessage || step.warningMessage}
                  </Box>
                )}
              </Box>
            </Flex>
          </Box>
        );

      case "default":
      default:
        return (
          <Flex
            direction="column"
            align="center"
            style={{
              ...baseStepStyle,
              flex: 1,
              position: "relative",
            }}
            onClick={() => handleStepClick(step, index)}
            onMouseEnter={(e) => {
              if (isClickable) {
                Object.assign(e.currentTarget.style, hoverStyle);
              }
            }}
            onMouseLeave={(e) => {
              if (isClickable) {
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            {/* Connector line (before step) */}
            {index > 0 &&
              renderConnector(
                index - 1,
                processedSteps[index - 1].status || "pending",
                step.status || "pending"
              )}

            <Flex direction="column" align="center" gap={2}>
              {renderStepIndicator()}

              <Box style={{ textAlign: "center" }}>
                <div
                  className={sizeClasses.titleSize}
                  style={{ color: statusColors.text, fontWeight: 600 }}
                >
                  {step.title}
                </div>
                {showDescriptions && step.description && (
                  <div
                    className={`mt-1 ${sizeClasses.descriptionSize}`}
                    style={{ color: colors.text.muted }}
                  >
                    {step.description}
                  </div>
                )}
              </Box>
            </Flex>

            {/* Error/Warning messages */}
            {(step.errorMessage || step.warningMessage) && (
              <Box
                className={`mt-2 p-2 rounded ${sizeClasses.descriptionSize}`}
                style={{
                  backgroundColor: step.errorMessage
                    ? `${colors.error}15`
                    : `${colors.warning}15`,
                  color: step.errorMessage ? colors.error : colors.warning,
                  borderLeft: `3px solid ${
                    step.errorMessage ? colors.error : colors.warning
                  }`,
                  position: "absolute",
                  top: "100%",
                  marginTop: "0.5rem",
                  width: "100%",
                }}
              >
                {step.errorMessage || step.warningMessage}
              </Box>
            )}
          </Flex>
        );
    }
  };

  // Render steps based on variant
  const renderSteps = () => {
    if (children) {
      return children;
    }

    if (variant === "vertical") {
      return (
        <Flex direction="column" gap={4}>
          {processedSteps.map((step, index) => (
            <React.Fragment key={step.id}>
              {renderStepContent(step, index)}
            </React.Fragment>
          ))}
        </Flex>
      );
    }

    return (
      <Flex
        align={variant === "cards" ? "stretch" : "center"}
        justify="between"
        style={{ gap: sizeClasses.stepGap }}
      >
        {processedSteps.map((step, index) => (
          <React.Fragment key={step.id}>
            {renderStepContent(step, index)}

            {/* Connector for default variant */}
            {variant === "default" && index < processedSteps.length - 1 && (
              <Box style={{ flex: 1, maxWidth: "2rem" }}>
                {renderConnector(
                  index,
                  step.status || "pending",
                  processedSteps[index + 1].status || "pending"
                )}
              </Box>
            )}
          </React.Fragment>
        ))}
      </Flex>
    );
  };

  return (
    <Box className={`steps ${className}`} {...props}>
      {renderSteps()}
    </Box>
  );
};

// Stepper (alias for Steps with wizard behavior)
export interface StepperProps extends Omit<StepsProps, "children"> {
  /** Content for each step */
  stepContent?: Record<string, React.ReactNode>;

  /** Custom navigation buttons */
  navigation?: React.ReactNode;

  /** Whether to show step content */
  showStepContent?: boolean;
}

export const Stepper = ({
  stepContent,
  navigation,
  showStepContent = true,
  steps,
  currentStep,
  onStepClick,
  ...props
}: StepperProps) => {
  const currentStepData = steps[currentStep || 0];

  return (
    <Box className="stepper">
      <Steps
        steps={steps}
        currentStep={currentStep}
        onStepClick={onStepClick}
        {...props}
      />

      {showStepContent && currentStepData && stepContent && (
        <Box
          className="mt-8 p-6 rounded-lg"
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--surface-border)",
          }}
        >
          {stepContent[currentStepData.id] || (
            <div
              style={{
                color: "var(--text-muted)",
                textAlign: "center",
                padding: "2rem",
              }}
            >
              No content available for this step
            </div>
          )}
        </Box>
      )}

      {navigation && (
        <Flex justify="between" className="mt-6">
          {navigation}
        </Flex>
      )}
    </Box>
  );
};

// Wizard component (full-featured multi-step form)
export interface WizardProps extends Omit<StepperProps, "steps"> {
  /** Wizard steps */
  steps: Array<
    Step & {
      /** Validation function for the step */
      validate?: () => boolean | Promise<boolean>;

      /** Step content component */
      content: React.ReactNode;
    }
  >;

  /** Callback when wizard is completed */
  onComplete?: (data: Record<string, any>) => void;

  /** Callback when wizard is cancelled */
  onCancel?: () => void;

  /** Whether to show cancel button */
  showCancel?: boolean;

  /** Cancel button text */
  cancelText?: string;

  /** Next button text */
  nextText?: string;

  /** Previous button text */
  previousText?: string;

  /** Complete button text */
  completeText?: string;

  /** Whether to save step data */
  saveStepData?: boolean;
}

export const Wizard = ({
  steps,
  onComplete,
  onCancel,
  showCancel = true,
  cancelText = "Cancel",
  nextText = "Next",
  previousText = "Previous",
  completeText = "Complete",
  saveStepData = true,
  ...props
}: WizardProps) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [stepData, setStepData] = React.useState<Record<string, any>>({});
  const [isValidating, setIsValidating] = React.useState(false);

  const currentStepInfo = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = async () => {
    // Validate current step if validation function exists
    if (currentStepInfo.validate) {
      setIsValidating(true);
      try {
        const isValid = await currentStepInfo.validate();
        if (!isValid) {
          setIsValidating(false);
          return;
        }
      } catch (error) {
        console.error("Step validation failed:", error);
        setIsValidating(false);
        return;
      }
      setIsValidating(false);
    }

    if (isLastStep) {
      // Complete wizard
      if (onComplete) {
        onComplete(stepData);
      }
    } else {
      // Go to next step
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleStepClick = (step: Step, index: number) => {
    // Only allow clicking completed steps or current step
    if (index > currentStep && step.status !== "completed") return;

    setCurrentStep(index);
    if (props.onStepClick) {
      props.onStepClick(step, index);
    }
  };

  const updateStepData = (stepId: string, data: any) => {
    if (saveStepData) {
      setStepData((prev) => ({
        ...prev,
        [stepId]: data,
      }));
    }
  };

  // Prepare steps for display
  const displaySteps: Step[] = steps.map((step, index) => ({
    id: step.id,
    number: step.number || index + 1,
    title: step.title,
    description: step.description,
    status:
      index < currentStep
        ? "completed"
        : index === currentStep
        ? "current"
        : "pending",
    disabled: index > currentStep,
  }));

  // Clone step content with data handler
  const enhancedStepContent = React.useMemo(() => {
    if (!currentStepInfo?.content) return null;

    return React.cloneElement(currentStepInfo.content as React.ReactElement, {
      stepData: stepData[currentStepInfo.id] || {},
      updateStepData: (data: any) => updateStepData(currentStepInfo.id, data),
    });
  }, [currentStepInfo, stepData]);

  return (
    <Box className="wizard">
      <Stepper
        steps={displaySteps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
        stepContent={{ [currentStepInfo.id]: enhancedStepContent }}
        navigation={
          <Flex justify="between" className="w-full">
            <Flex gap={2}>
              {showCancel && (
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-lg font-medium transition-colors"
                  style={{
                    backgroundColor: "var(--surface-hover)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--surface-border)",
                  }}
                >
                  {cancelText}
                </button>
              )}

              {!isFirstStep && (
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 rounded-lg font-medium transition-colors"
                  style={{
                    backgroundColor: "var(--surface-hover)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--surface-border)",
                  }}
                >
                  {previousText}
                </button>
              )}
            </Flex>

            <button
              onClick={handleNext}
              disabled={isValidating}
              className="px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "var(--brand-500)",
                color: "var(--brand-600)",
              }}
            >
              {isValidating
                ? "Validating..."
                : isLastStep
                ? completeText
                : nextText}
            </button>
          </Flex>
        }
        {...props}
      />
    </Box>
  );
};

// Progress Steps (shows progress bar)
export interface ProgressStepsProps
  extends Omit<StepsProps, "variant" | "showConnectors"> {
  /** Show progress percentage */
  showPercentage?: boolean;

  /** Progress bar height */
  barHeight?: number;

  /** Progress bar color */
  barColor?: string;

  /** Progress bar background color */
  barBackground?: string;
}

export const ProgressSteps = ({
  showPercentage = true,
  barHeight = 4,
  barColor,
  barBackground,
  steps,
  currentStep,
  ...props
}: ProgressStepsProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  const progress = ((currentStep || 0) / (steps.length - 1)) * 100;

  return (
    <Box className="progress-steps">
      <Box
        className="relative rounded-full mb-6"
        style={{
          height: `${barHeight}px`,
          backgroundColor: barBackground || colors.surfaceBorder,
        }}
      >
        <Box
          className="absolute top-0 left-0 rounded-full"
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: barColor || colors.brand[500],
            transition: "width 0.3s ease",
          }}
        />
      </Box>

      {showPercentage && (
        <Flex justify="between" className="mb-2">
          <span className="text-sm" style={{ color: colors.text.secondary }}>
            Progress
          </span>
          <span
            className="text-sm font-semibold"
            style={{ color: colors.brand[500] }}
          >
            {Math.round(progress)}%
          </span>
        </Flex>
      )}

      <Steps
        steps={steps}
        currentStep={currentStep}
        variant="minimal"
        showConnectors={false}
        {...props}
      />
    </Box>
  );
};

// No separate type exports needed - interfaces are exported above
