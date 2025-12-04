// packages/ui/src/components/FileUpload.tsx
import React, {
  forwardRef,
  useId,
  useState,
  useRef,
  ChangeEvent,
  useImperativeHandle,
} from "react";
import { useTheme } from "../../contexts/themeContext";

interface FileUploadProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "onChange" | "value" | "defaultValue" // Add both value and defaultValue
  > {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "filled" | "ghost";
  placeholder?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  onChange?: (files: File[] | null) => void;
  value?: File[] | null;
  defaultValue?: File[] | null;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      disabled = false,
      size = "md",
      variant = "outline",
      placeholder = "Choose a file or drag & drop",
      accept,
      multiple = false,
      maxSize,
      maxFiles,
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
    const fileUploadId = props.id || `fileupload-${id}`;
    const [files, setFiles] = useState<File[] | null>(
      controlledValue !== undefined ? controlledValue : defaultValue || null
    );
    const [isDragging, setIsDragging] = useState(false);
    const [dragError, setDragError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => fileInputRef.current!);

    // Size configurations
    const sizeConfig = {
      sm: {
        container: "p-3",
        button: "px-3 py-1.5 text-sm",
        text: "text-sm",
        label: "text-sm",
        fileSize: "text-xs",
      },
      md: {
        container: "p-4",
        button: "px-4 py-2 text-base",
        text: "text-base",
        label: "text-base",
        fileSize: "text-sm",
      },
      lg: {
        container: "p-5",
        button: "px-5 py-3 text-lg",
        text: "text-lg",
        label: "text-lg",
        fileSize: "text-base",
      },
    };

    // Sync with controlled value
    React.useEffect(() => {
      if (controlledValue !== undefined) {
        setFiles(controlledValue);
      }
    }, [controlledValue]);

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

      if (error || dragError) {
        const errorColor = error || dragError ? colors.error : colors.border;
        switch (variant) {
          case "filled":
            return {
              backgroundColor: colors.error + "10",
              border: `1px solid ${errorColor}`,
              color: colors.text.primary,
            };
          case "ghost":
            return {
              backgroundColor: "transparent",
              borderBottom: `2px solid ${errorColor}`,
              color: colors.text.primary,
            };
          case "outline":
          default:
            return {
              backgroundColor: colors.background,
              border: `2px solid ${errorColor}`,
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

    const getDragOverStyles = () => {
      if (disabled) return {};

      const colors = theme.colors;
      return {
        backgroundColor: colors.brand[50],
        borderColor: colors.brand[300],
        borderStyle: "dashed",
      };
    };

    const getFocusStyles = () => {
      const colors = theme.colors;

      if (error || dragError) return { outlineColor: colors.error };
      if (success) return { outlineColor: colors.success };

      return { outlineColor: colors.focusRing };
    };

    // Get label text color
    const getLabelColor = () => {
      if (disabled) return theme.colors.text.disabled;
      if (error || dragError) return theme.colors.error;
      if (success) return theme.colors.success;
      return theme.colors.text.primary;
    };

    // Format file size
    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    // Validate files
    const validateFiles = (
      fileList: FileList
    ): { valid: boolean; errors: string[]; validFiles: File[] } => {
      const errors: string[] = [];
      const validFiles: File[] = [];
      const totalFiles = Array.from(fileList);

      // Check max files
      if (maxFiles && totalFiles.length > maxFiles) {
        errors.push(`Maximum ${maxFiles} file(s) allowed`);
        return { valid: false, errors, validFiles };
      }

      for (const file of totalFiles) {
        // Check file size
        if (maxSize && file.size > maxSize) {
          errors.push(
            `${file.name} exceeds maximum size of ${formatFileSize(maxSize)}`
          );
          continue;
        }

        // Check file type if accept is specified
        if (accept) {
          const acceptTypes = accept.split(",").map((type) => type.trim());
          const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
          const fileType = file.type.toLowerCase();

          const isAccepted = acceptTypes.some((type) => {
            if (type.startsWith(".")) {
              return fileExtension === type.toLowerCase();
            }
            if (type.endsWith("/*")) {
              const mainType = type.slice(0, -2);
              return fileType.startsWith(mainType);
            }
            return fileType === type;
          });

          if (!isAccepted) {
            errors.push(`${file.name} type not allowed`);
            continue;
          }
        }

        validFiles.push(file);
      }

      return { valid: errors.length === 0, errors, validFiles };
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const fileList = event.target.files;
      if (!fileList || fileList.length === 0) {
        setFiles(null);
        setDragError(null);
        if (onChange) onChange(null);
        return;
      }

      const validation = validateFiles(fileList);

      if (!validation.valid) {
        setDragError(validation.errors.join(", "));
        return;
      }

      const newFiles = multiple
        ? validation.validFiles
        : [validation.validFiles[0]];
      setFiles(newFiles);
      setDragError(null);

      if (onChange) {
        onChange(newFiles);
      }
    };

    const handleDragOver = (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (!disabled) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const droppedFiles = event.dataTransfer.files;
      if (droppedFiles.length === 0) return;

      const validation = validateFiles(droppedFiles);

      if (!validation.valid) {
        setDragError(validation.errors.join(", "));
        return;
      }

      const newFiles = multiple
        ? [...(files || []), ...validation.validFiles].slice(0, maxFiles)
        : [validation.validFiles[0]];

      setFiles(newFiles);
      setDragError(null);

      if (onChange) {
        onChange(newFiles);
      }
    };

    const handleButtonClick = () => {
      if (!disabled && fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleRemoveFile = (index: number) => {
      if (disabled) return;

      const newFiles = files ? files.filter((_, i) => i !== index) : null;
      setFiles(newFiles);

      if (onChange) {
        onChange(newFiles);
      }
    };

    const handleClearAll = () => {
      if (disabled) return;

      setFiles(null);
      setDragError(null);

      if (onChange) {
        onChange(null);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    // Get accepted file types description
    const getAcceptDescription = () => {
      if (!accept) return "Any file type";

      const types = accept.split(",").map((type) => {
        if (type.startsWith(".")) return type.toUpperCase();
        if (type.endsWith("/*")) return type.replace("/*", " files");
        return type;
      });

      return types.join(", ");
    };

    // Get file restrictions text
    const getRestrictionsText = () => {
      const restrictions = [];
      if (maxSize) restrictions.push(`Max size: ${formatFileSize(maxSize)}`);
      if (maxFiles) restrictions.push(`Max files: ${maxFiles}`);
      if (accept) restrictions.push(`Allowed: ${getAcceptDescription()}`);
      return restrictions.join(" • ");
    };

    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
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

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          id={fileUploadId}
          className="sr-only"
          onChange={handleFileChange}
          disabled={disabled}
          accept={accept}
          multiple={multiple}
          aria-invalid={!!error || !!dragError}
          aria-describedby={
            helperText ? `${fileUploadId}-description` : undefined
          }
          {...props}
        />

        {/* Drop zone */}
        <div
          className={`
            ${sizeConfig[size].container}
            rounded-lg
            border-2
            border-dashed
            transition-all
            duration-200
            cursor-pointer
            ${disabled ? "cursor-not-allowed opacity-60" : ""}
            ${
              variant === "ghost"
                ? "rounded-none border-t-0 border-l-0 border-r-0"
                : ""
            }
          `}
          style={{
            ...getVariantStyles(),
            ...getFocusStyles(),
            ...(isDragging ? getDragOverStyles() : {}),
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <div className="flex flex-col items-center justify-center text-center">
            {/* Upload icon */}
            <div className="mb-3">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  color: disabled
                    ? theme.colors.text.disabled
                    : error || dragError
                    ? theme.colors.error
                    : success
                    ? theme.colors.success
                    : theme.colors.brand[500],
                }}
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>

            {/* Instruction text */}
            <div
              className={`${sizeConfig[size].text} font-medium mb-1`}
              style={{
                color: disabled
                  ? theme.colors.text.disabled
                  : theme.colors.text.primary,
              }}
            >
              {placeholder}
            </div>

            {/* Restrictions */}
            <div
              className={`${sizeConfig[size].fileSize} mb-3`}
              style={{ color: theme.colors.text.muted }}
            >
              {getRestrictionsText()}
            </div>

            {/* Browse button */}
            <button
              type="button"
              className={`
                ${sizeConfig[size].button}
                rounded
                font-medium
                transition-all
                duration-200
                ${disabled ? "cursor-not-allowed opacity-50" : ""}
              `}
              style={{
                backgroundColor: disabled
                  ? theme.colors.surfaceBorder
                  : theme.colors.brand[500],
                color: disabled
                  ? theme.colors.text.disabled
                  : theme.colors.brand[600],
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleButtonClick();
              }}
              disabled={disabled}
            >
              Browse files
            </button>

            {/* Drag & drop hint */}
            {!disabled && (
              <div
                className={`${sizeConfig[size].fileSize} mt-3`}
                style={{ color: theme.colors.text.muted }}
              >
                or drag & drop here
              </div>
            )}
          </div>
        </div>

        {/* Selected files list */}
        {files && files.length > 0 && (
          <div className="mt-3 space-y-2">
            <div className="flex justify-between items-center">
              <div
                className={`${sizeConfig[size].text} font-medium`}
                style={{ color: theme.colors.text.primary }}
              >
                Selected files ({files.length})
              </div>
              {!disabled && (
                <button
                  type="button"
                  className={`${sizeConfig[size].fileSize} text-brand-600 hover:text-brand-700`}
                  onClick={handleClearAll}
                  style={{ color: theme.colors.brand[500] }}
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-3 rounded"
                  style={{
                    backgroundColor: theme.colors.backgroundSubtle,
                    border: `1px solid ${theme.colors.surfaceBorder}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    {/* File icon */}
                    <div
                      className="w-10 h-10 rounded flex items-center justify-center"
                      style={{
                        backgroundColor: theme.colors.brand[100],
                        color: theme.colors.brand[600],
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                        <polyline points="13 2 13 9 20 9" />
                      </svg>
                    </div>

                    {/* File info */}
                    <div>
                      <div
                        className="font-medium truncate max-w-xs"
                        style={{ color: theme.colors.text.primary }}
                      >
                        {file.name}
                      </div>
                      <div
                        className={sizeConfig[size].fileSize}
                        style={{ color: theme.colors.text.muted }}
                      >
                        {formatFileSize(file.size)}
                      </div>
                    </div>
                  </div>

                  {/* Remove button */}
                  {!disabled && (
                    <button
                      type="button"
                      className="p-1 rounded-full hover:bg-surfaceHover"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(index);
                      }}
                      aria-label={`Remove ${file.name}`}
                      style={{
                        color: theme.colors.text.muted,
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
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Helper Text or Error Message */}
        {(helperText || error || dragError) && (
          <p
            id={`${fileUploadId}-description`}
            className="text-sm"
            style={{
              color:
                error || dragError
                  ? theme.colors.error
                  : theme.colors.text.muted,
            }}
          >
            {error || dragError || helperText}
          </p>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";
