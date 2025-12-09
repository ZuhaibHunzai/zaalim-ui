// packages/ui/src/components/DataDisplay/Timeline.tsx
import React from "react";
import { useTheme } from "../../contexts/themeContext";
import { Box } from "../foundation/Box";
import { Flex } from "../foundation/Flex";
import { Badge } from "./Badge";
import { Avatar } from "./Avatar";
import { Chip } from "./Chip";

// ============================================
// Types and Interfaces
// ============================================

export type TimelineVariant =
  | "default"
  | "compact"
  | "rich"
  | "vertical"
  | "horizontal";
export type TimelineSize = "sm" | "md" | "lg";
export type TimelineItemType =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "brand";

export interface TimelineItem {
  /** Unique identifier for the timeline item */
  id: string;

  /** Item title */
  title: string;

  /** Item content/description */
  content: React.ReactNode;

  /** Timestamp (can be string or Date) */
  timestamp: string | Date;

  /** Formatted time (optional, auto-generated from timestamp) */
  time?: string;

  /** Item type for styling */
  type?: TimelineItemType;

  /** Icon for the item (replaces default dot/icon) */
  icon?: React.ReactNode;

  /** Avatar for user/item */
  avatarSrc?: string;
  avatarAlt?: string;
  avatarFallback?: string;

  /** Badge content */
  badge?: string | React.ReactNode;

  /** Chip content */
  chip?: string | React.ReactNode;

  /** Whether item is active/current */
  active?: boolean;

  /** Whether item is completed */
  completed?: boolean;

  /** Custom dot/indicator color */
  dotColor?: string;

  /** Custom connector color */
  connectorColor?: string;

  /** Additional data */
  data?: Record<string, any>;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Timeline items */
  items: TimelineItem[];

  /** Timeline variant */
  variant?: TimelineVariant;

  /** Timeline size */
  size?: TimelineSize;

  /** Whether to show connecting lines */
  showConnectors?: boolean;

  /** Connector style */
  connectorStyle?: "solid" | "dashed" | "dotted";

  /** Whether to alternate sides (for vertical timeline) */
  alternate?: boolean;

  /** Whether to show timestamps */
  showTimestamps?: boolean;

  /** Timestamp format (for Date objects) */
  timestampFormat?: string | Intl.DateTimeFormatOptions;

  /** Whether timeline is interactive */
  interactive?: boolean;

  /** Callback when item is clicked */
  onItemClick?: (item: TimelineItem, index: number) => void;

  /** Maximum height (for scrollable timeline) */
  maxHeight?: string;

  /** Additional CSS classes */
  className?: string;

  /** Children for custom rendering */
  children?: React.ReactNode;
}

// ============================================
// Main Timeline Component
// ============================================

export const Timeline = ({
  items,
  variant = "default",
  size = "md",
  showConnectors = true,
  connectorStyle = "solid",
  alternate = false,
  showTimestamps = true,
  timestampFormat = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  },
  interactive = false,
  onItemClick,
  maxHeight,
  className = "",
  children,
  ...props
}: TimelineProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  // Format timestamp
  const formatTimestamp = (timestamp: string | Date): string => {
    if (timestamp instanceof Date) {
      if (typeof timestampFormat === "string") {
        return timestamp.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
      return timestamp.toLocaleDateString(undefined, timestampFormat);
    }
    return timestamp;
  };

  // Get type color
  const getTypeColor = (type: TimelineItemType = "default") => {
    switch (type) {
      case "success":
        return colors.success;
      case "warning":
        return colors.warning;
      case "error":
        return colors.error;
      case "info":
        return colors.info;
      case "brand":
        return colors.brand[500];
      case "default":
      default:
        return colors.brand[300];
    }
  };

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return {
          itemGap: "1rem",
          dotSize: "0.75rem",
          dotBorder: "2px",
          padding: "0.5rem",
          titleSize: "text-sm",
          contentSize: "text-xs",
          timeSize: "text-xs",
          avatarSize: "sm" as const,
        };
      case "md":
        return {
          itemGap: "1.5rem",
          dotSize: "1rem",
          dotBorder: "3px",
          padding: "1rem",
          titleSize: "text-base",
          contentSize: "text-sm",
          timeSize: "text-sm",
          avatarSize: "md" as const,
        };
      case "lg":
        return {
          itemGap: "2rem",
          dotSize: "1.25rem",
          dotBorder: "4px",
          padding: "1.5rem",
          titleSize: "text-lg",
          contentSize: "text-base",
          timeSize: "text-base",
          avatarSize: "lg" as const,
        };
      default:
        return {
          itemGap: "1.5rem",
          dotSize: "1rem",
          dotBorder: "3px",
          padding: "1rem",
          titleSize: "text-base",
          contentSize: "text-sm",
          timeSize: "text-sm",
          avatarSize: "md" as const,
        };
    }
  };

  // Get connector style
  const getConnectorStyle = () => {
    switch (connectorStyle) {
      case "dashed":
        return "dashed";
      case "dotted":
        return "dotted";
      case "solid":
      default:
        return "solid";
    }
  };

  const sizeClasses = getSizeClasses();
  const connectorStyleValue = getConnectorStyle();

  // Render dot/indicator
  const renderDot = (item: TimelineItem, index: number) => {
    const { type = "default", icon, active, completed, dotColor } = item;
    const color = dotColor || getTypeColor(type);

    if (icon) {
      return (
        <Box
          className="flex items-center justify-center rounded-full"
          style={{
            width: `calc(${sizeClasses.dotSize} * 2)`,
            height: `calc(${sizeClasses.dotSize} * 2)`,
            backgroundColor: active ? color : colors.surface,
            border: `${sizeClasses.dotBorder} solid ${color}`,
            color: active ? colors.brand[600] : color,
            zIndex: 1,
          }}
        >
          {icon}
        </Box>
      );
    }

    if (completed) {
      return (
        <Box
          className="flex items-center justify-center rounded-full"
          style={{
            width: `calc(${sizeClasses.dotSize} * 1.5)`,
            height: `calc(${sizeClasses.dotSize} * 1.5)`,
            backgroundColor: color,
            border: `${sizeClasses.dotBorder} solid ${color}`,
            zIndex: 1,
          }}
        >
          <svg
            width={size === "sm" ? "8" : size === "md" ? "10" : "12"}
            height={size === "sm" ? "8" : size === "md" ? "10" : "12"}
            viewBox="0 0 12 12"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="1 6 4 9 11 2" />
          </svg>
        </Box>
      );
    }

    return (
      <Box
        className="rounded-full"
        style={{
          width: sizeClasses.dotSize,
          height: sizeClasses.dotSize,
          backgroundColor: active ? color : colors.surface,
          border: `${sizeClasses.dotBorder} solid ${color}`,
          zIndex: 1,
        }}
      />
    );
  };

  // Render avatar
  const renderAvatar = (item: TimelineItem) => {
    if (!item.avatarSrc && !item.avatarFallback) return null;

    return (
      <Avatar
        src={item.avatarSrc}
        alt={item.avatarAlt || "Avatar"}
        fallback={item.avatarFallback}
        size={sizeClasses.avatarSize}
        className="mr-3"
      />
    );
  };

  // Render timestamp
  const renderTimestamp = (item: TimelineItem) => {
    if (!showTimestamps) return null;

    const time = item.time || formatTimestamp(item.timestamp);

    return (
      <div
        className={`${sizeClasses.timeSize} font-medium`}
        style={{ color: colors.text.muted }}
      >
        {time}
      </div>
    );
  };

  // Render badge
  const renderBadge = (item: TimelineItem) => {
    if (!item.badge) return null;

    if (typeof item.badge === "string") {
      return (
        <Badge
          variant={"neutral"}
          size={size === "sm" ? "sm" : "md"}
          className="ml-2"
        >
          {item.badge}
        </Badge>
      );
    }

    return item.badge;
  };

  // Render chip
  const renderChip = (item: TimelineItem) => {
    if (!item.chip) return null;

    if (typeof item.chip === "string") {
      return (
        <Chip size={size === "sm" ? "sm" : "md"} className="ml-2">
          {item.chip}
        </Chip>
      );
    }

    return item.chip;
  };

  // Handle item click
  const handleItemClick = (item: TimelineItem, index: number) => {
    if (interactive && onItemClick) {
      onItemClick(item, index);
    }
  };

  // Render vertical timeline (default)
  const renderVerticalTimeline = () => {
    return (
      <div className="relative">
        {/* Main vertical line */}
        {showConnectors && (
          <div
            className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2"
            style={{
              width: "2px",
              backgroundColor: colors.surfaceBorder,
              zIndex: 0,
            }}
          />
        )}

        <div className="space-y-8">
          {items.map((item, index) => {
            const isEven = index % 2 === 0;
            const shouldAlternate = alternate && isEven;

            return (
              <div
                key={item.id}
                className={`relative flex items-start ${
                  shouldAlternate ? "flex-row-reverse" : ""
                }`}
                style={{ gap: sizeClasses.itemGap }}
                onClick={() => handleItemClick(item, index)}
              >
                {/* Left/Right content based on alternation */}
                <div
                  className={`flex-1 ${shouldAlternate ? "text-right" : ""}`}
                  style={{ padding: sizeClasses.padding }}
                >
                  <div
                    className={`${sizeClasses.titleSize} font-semibold mb-1`}
                    style={{ color: colors.text.primary }}
                  >
                    {item.title}
                    {renderBadge(item)}
                    {renderChip(item)}
                  </div>

                  <div
                    className={`${sizeClasses.contentSize} mb-2`}
                    style={{ color: colors.text.secondary }}
                  >
                    {item.content}
                  </div>

                  {renderTimestamp(item)}
                </div>

                {/* Center dot with connector */}
                <div className="relative flex flex-col items-center">
                  {renderDot(item, index)}

                  {/* Vertical connector line */}
                  {showConnectors && index < items.length - 1 && (
                    <div
                      className="absolute top-full"
                      style={{
                        width: "2px",
                        height: sizeClasses.itemGap,
                        backgroundColor:
                          item.connectorColor || colors.surfaceBorder,
                        borderStyle: connectorStyleValue,
                        zIndex: 0,
                      }}
                    />
                  )}
                </div>

                {/* Avatar on the other side */}
                <div
                  className={`flex-1 ${shouldAlternate ? "" : "text-right"}`}
                >
                  {renderAvatar(item)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render compact timeline
  const renderCompactTimeline = () => {
    return (
      <div className="relative pl-8">
        {/* Vertical line */}
        {showConnectors && (
          <div
            className="absolute top-0 bottom-0 left-4"
            style={{
              width: "2px",
              backgroundColor: colors.surfaceBorder,
              zIndex: 0,
            }}
          />
        )}

        <div className="space-y-6">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="relative"
              onClick={() => handleItemClick(item, index)}
            >
              {/* Dot */}
              <div className="absolute left-0 transform -translate-x-1/2">
                {renderDot(item, index)}
              </div>

              {/* Content */}
              <div className="ml-6">
                <Flex align="center" gap={2} className="mb-1">
                  <div
                    className={`${sizeClasses.titleSize} font-semibold`}
                    style={{ color: colors.text.primary }}
                  >
                    {item.title}
                  </div>
                  {renderBadge(item)}
                  {renderChip(item)}
                </Flex>

                <div
                  className={`${sizeClasses.contentSize} mb-1`}
                  style={{ color: colors.text.secondary }}
                >
                  {item.content}
                </div>

                {renderTimestamp(item)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render rich timeline
  const renderRichTimeline = () => {
    return (
      <div className="space-y-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`relative pl-12 ${
              interactive
                ? "cursor-pointer hover:bg-surfaceHover rounded-lg transition-colors"
                : ""
            }`}
            style={{ padding: sizeClasses.padding }}
            onClick={() => handleItemClick(item, index)}
          >
            {/* Dot with connecting line */}
            <div className="absolute left-0 top-6 transform -translate-x-1/2">
              {renderDot(item, index)}

              {/* Connector line */}
              {showConnectors && index < items.length - 1 && (
                <div
                  className="absolute top-full left-1/2 transform -translate-x-1/2"
                  style={{
                    width: "2px",
                    height: `calc(100% + ${sizeClasses.itemGap})`,
                    backgroundColor:
                      item.connectorColor || colors.surfaceBorder,
                    borderStyle: connectorStyleValue,
                    zIndex: 0,
                  }}
                />
              )}
            </div>

            {/* Header with avatar and title */}
            <Flex align="center" gap={3} className="mb-3">
              {renderAvatar(item)}

              <div className="flex-1">
                <Flex align="center" gap={2}>
                  <div
                    className={`${sizeClasses.titleSize} font-semibold`}
                    style={{ color: colors.text.primary }}
                  >
                    {item.title}
                  </div>
                  {renderBadge(item)}
                  {renderChip(item)}
                </Flex>

                {renderTimestamp(item)}
              </div>
            </Flex>

            {/* Content */}
            <div
              className={`${sizeClasses.contentSize}`}
              style={{ color: colors.text.secondary }}
            >
              {item.content}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render horizontal timeline
  const renderHorizontalTimeline = () => {
    return (
      <div className="relative">
        {/* Horizontal line */}
        {showConnectors && (
          <div
            className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2"
            style={{
              height: "2px",
              backgroundColor: colors.surfaceBorder,
              zIndex: 0,
            }}
          />
        )}

        <Flex justify="between" className="relative">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex flex-col items-center relative"
              style={{ width: `${100 / items.length}%` }}
              onClick={() => handleItemClick(item, index)}
            >
              {/* Dot */}
              <div className="mb-4">{renderDot(item, index)}</div>

              {/* Content */}
              <div className="text-center px-2">
                <div
                  className={`${sizeClasses.titleSize} font-semibold mb-1`}
                  style={{ color: colors.text.primary }}
                >
                  {item.title}
                </div>

                <div
                  className={`${sizeClasses.contentSize} mb-2`}
                  style={{ color: colors.text.secondary }}
                >
                  {item.content}
                </div>

                {renderTimestamp(item)}
              </div>

              {/* Connector line to next item */}
              {showConnectors && index < items.length - 1 && (
                <div
                  className="absolute top-1/2 left-1/2 w-full h-2 transform -translate-y-1/2"
                  style={{
                    backgroundColor:
                      item.connectorColor || colors.surfaceBorder,
                    borderStyle: connectorStyleValue,
                    zIndex: 0,
                    marginLeft: "50%",
                  }}
                />
              )}
            </div>
          ))}
        </Flex>
      </div>
    );
  };

  // Choose renderer based on variant
  const renderTimeline = () => {
    switch (variant) {
      case "compact":
        return renderCompactTimeline();
      case "rich":
        return renderRichTimeline();
      case "horizontal":
        return renderHorizontalTimeline();
      case "vertical":
        return renderVerticalTimeline();
      case "default":
      default:
        return renderCompactTimeline();
    }
  };

  return (
    <Box
      className={`timeline ${className}`}
      style={maxHeight ? { maxHeight, overflowY: "auto" } : {}}
      {...props}
    >
      {renderTimeline()}
      {children}
    </Box>
  );
};

// ============================================
// Timeline Item Component (for composition)
// ============================================

export interface TimelineItemCompositionProps
  extends Omit<TimelineItem, "id" | "title" | "content" | "timestamp"> {
  id: string;
  title: string;
  children: React.ReactNode;
  timestamp: string | Date;
  time?: string;
}

export const TimelineItemComponent = ({
  id,
  title,
  children,
  timestamp,
  time,
  ...itemProps
}: TimelineItemCompositionProps) => {
  const item: TimelineItem = {
    id,
    title,
    content: children,
    timestamp,
    time,
    ...itemProps,
  };

  return null; // This is just for type composition, actual rendering is in Timeline
};

// ============================================
// Preset Timeline Components
// ============================================

// Compact Timeline
export const CompactTimeline = (props: Omit<TimelineProps, "variant">) => (
  <Timeline variant="compact" {...props} />
);

// Rich Timeline (with avatars and more details)
export const RichTimeline = (props: Omit<TimelineProps, "variant">) => (
  <Timeline variant="rich" {...props} />
);

// Vertical Timeline (with alternating sides)
export const VerticalTimeline = (props: Omit<TimelineProps, "variant">) => (
  <Timeline variant="vertical" {...props} />
);

// Horizontal Timeline
export const HorizontalTimeline = (props: Omit<TimelineProps, "variant">) => (
  <Timeline variant="horizontal" {...props} />
);

// Activity Timeline (for activity feeds)
export interface ActivityTimelineProps
  extends Omit<TimelineProps, "variant" | "showTimestamps"> {
  showAvatars?: boolean;
  showActions?: boolean;
}

export const ActivityTimeline = ({
  showAvatars = true,
  showActions = true,
  items,
  ...props
}: ActivityTimelineProps) => {
  const processedItems: TimelineItem[] = items.map((item) => ({
    ...item,
    avatarSrc: showAvatars ? item.avatarSrc : undefined,
    avatarFallback: showAvatars ? item.avatarFallback : undefined,
  }));

  return (
    <Timeline
      variant="rich"
      showTimestamps={true}
      items={processedItems}
      {...props}
    />
  );
};

// Progress Timeline (for step-by-step progress)
export interface ProgressTimelineItem
  extends Omit<TimelineItem, "type" | "completed"> {
  step: number;
  totalSteps: number;
  completed?: boolean;
}

export interface ProgressTimelineProps
  extends Omit<TimelineProps, "items" | "variant"> {
  items: ProgressTimelineItem[];
}

export const ProgressTimeline = ({
  items,
  ...props
}: ProgressTimelineProps) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  const processedItems: TimelineItem[] = items.map((item, index) => {
    const isCompleted = index < items.findIndex((i) => !i.completed);
    const isCurrent =
      item.completed === false &&
      items.slice(0, index).every((i) => i.completed !== false);

    return {
      ...item,
      type: isCompleted ? "success" : isCurrent ? "brand" : "default",
      completed: isCompleted,
      active: isCurrent,
      icon: isCompleted ? (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="1 6 4 9 11 2" />
        </svg>
      ) : isCurrent ? (
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: colors.brand[600],
          }}
        />
      ) : (
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: colors.text.muted,
          }}
        />
      ),
      badge: `Step ${item.step}/${item.totalSteps}`,
    };
  });

  return <Timeline variant="compact" items={processedItems} {...props} />;
};

// Status Timeline (for status updates/changes)
export const StatusTimeline = (props: Omit<TimelineProps, "variant">) => (
  <Timeline
    variant="compact"
    showConnectors={true}
    connectorStyle="dashed"
    {...props}
  />
);

// No separate type exports needed - interfaces are exported above
