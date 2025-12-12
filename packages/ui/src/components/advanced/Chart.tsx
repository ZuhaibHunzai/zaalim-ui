// // packages/ui/src/components/DataDisplay/Chart.tsx
// import React, { useEffect, useRef, useMemo } from "react";
// import { useTheme } from "../../contexts/themeContext";

// export type ChartType =
//   | "line"
//   | "bar"
//   | "horizontalBar"
//   | "pie"
//   | "doughnut"
//   | "radar"
//   | "polarArea"
//   | "scatter"
//   | "bubble"
//   | "area";

// export type ChartVariant = "default" | "minimal" | "gradient" | "monochrome";
// export type ChartSize = "sm" | "md" | "lg" | "xl";

// export interface ChartDataset {
//   /** Dataset label */
//   label: string;

//   /** Data values */
//   data: number[];

//   /** Background colors */
//   backgroundColor?: string | string[];

//   /** Border colors */
//   borderColor?: string | string[];

//   /** Border width */
//   borderWidth?: number;

//   /** Fill for line/area charts */
//   fill?: boolean;

//   /** Tension for line charts */
//   tension?: number;

//   /** Point radius for line charts */
//   pointRadius?: number;

//   /** Point background color */
//   pointBackgroundColor?: string | string[];

//   /** Point border color */
//   pointBorderColor?: string | string[];

//   /** Stack ID for stacked charts */
//   stack?: string;

//   /** Order for drawing */
//   order?: number;

//   /** Type for mixed charts */
//   type?: ChartType;

//   /** Y-axis ID */
//   yAxisID?: string;

//   /** X-axis ID */
//   xAxisID?: string;

//   /** Additional dataset options */
//   options?: Record<string, any>;
// }

// export interface ChartOptions {
//   /** Whether to show legend */
//   legend?:
//     | boolean
//     | {
//         position?: "top" | "bottom" | "left" | "right";
//         align?: "start" | "center" | "end";
//         labels?: {
//           color?: string;
//           font?: {
//             size?: number;
//             family?: string;
//             weight?: string;
//           };
//           padding?: number;
//           usePointStyle?: boolean;
//         };
//       };

//   /** Whether to show tooltips */
//   tooltips?:
//     | boolean
//     | {
//         mode?: "index" | "dataset" | "point" | "nearest" | "x" | "y";
//         intersect?: boolean;
//         backgroundColor?: string;
//         titleColor?: string;
//         bodyColor?: string;
//         borderColor?: string;
//         borderWidth?: number;
//       };

//   /** Animation configuration */
//   animation?:
//     | boolean
//     | {
//         duration?: number;
//         easing?: "linear" | "easeInQuad" | "easeOutQuad" | "easeInOutQuad";
//       };

//   /** Responsive behavior */
//   responsive?: boolean;

//   /** Maintain aspect ratio */
//   maintainAspectRatio?: boolean;

//   /** Scales configuration */
//   scales?: {
//     x?: {
//       type?: "category" | "linear" | "logarithmic" | "time";
//       position?: "bottom" | "top";
//       grid?: {
//         display?: boolean;
//         color?: string;
//         borderDash?: number[];
//       };
//       ticks?: {
//         color?: string;
//         font?: {
//           size?: number;
//           family?: string;
//           weight?: string;
//         };
//         padding?: number;
//       };
//       title?: {
//         display?: boolean;
//         text?: string;
//         color?: string;
//         font?: {
//           size?: number;
//           family?: string;
//           weight?: string;
//         };
//       };
//     };
//     y?: {
//       type?: "linear" | "logarithmic";
//       position?: "left" | "right";
//       grid?: {
//         display?: boolean;
//         color?: string;
//         borderDash?: number[];
//       };
//       ticks?: {
//         color?: string;
//         font?: {
//           size?: number;
//           family?: string;
//           weight?: string;
//         };
//         padding?: number;
//       };
//       title?: {
//         display?: boolean;
//         text?: string;
//         color?: string;
//         font?: {
//           size?: number;
//           family?: string;
//           weight?: string;
//         };
//       };
//       beginAtZero?: boolean;
//     };
//   };

//   /** Plugins configuration */
//   plugins?: {
//     title?: {
//       display?: boolean;
//       text?: string;
//       color?: string;
//       font?: {
//         size?: number;
//         family?: string;
//         weight?: string;
//       };
//       padding?: number;
//     };
//     subtitle?: {
//       display?: boolean;
//       text?: string;
//       color?: string;
//       font?: {
//         size?: number;
//         family?: string;
//       };
//     };
//   };

//   /** Interaction mode */
//   interaction?: {
//     mode?: "point" | "nearest" | "index" | "dataset" | "x" | "y";
//     intersect?: boolean;
//   };

//   /** Events to listen for */
//   events?: string[];

//   /** Hover configuration */
//   hover?: {
//     mode?: "point" | "nearest" | "index" | "dataset" | "x" | "y";
//     intersect?: boolean;
//     animationDuration?: number;
//   };

//   /** Layout padding */
//   layout?: {
//     padding?:
//       | number
//       | {
//           top?: number;
//           right?: number;
//           bottom?: number;
//           left?: number;
//         };
//   };

//   /** Additional chart options */
//   [key: string]: any;
// }

// export interface ChartProps
//   extends Omit<
//     React.HTMLAttributes<HTMLDivElement>,
//     "children" | "onClick" | "onMouseMove"
//   > {
//   /** Type of chart */
//   type: ChartType;

//   /** Chart data */
//   data: {
//     /** Labels for data points */
//     labels: string[];

//     /** Datasets */
//     datasets: ChartDataset[];
//   };

//   /** Chart options */
//   options?: ChartOptions;

//   /** Variant style */
//   variant?: ChartVariant;

//   /** Size */
//   size?: ChartSize;

//   /** Height of chart */
//   height?: number | string;

//   /** Width of chart */
//   width?: number | string;

//   /** Whether chart is loading */
//   loading?: boolean;

//   /** Loading component */
//   loadingComponent?: React.ReactNode;

//   /** Error state */
//   error?: string | Error | null;

//   /** Error component */
//   errorComponent?: React.ReactNode;

//   /** Chart library to use */
//   library?: "chartjs" | "recharts" | "apexcharts" | "victory";

//   /** Custom chart renderer */
//   renderChart?: (
//     canvas: HTMLCanvasElement,
//     config: any
//   ) => {
//     chart: any;
//     destroy: () => void;
//   };

//   /** Callback when chart is clicked */
//   onClick?: (event: any, elements: any[], chart: any) => void;

//   /** Callback when chart is hovered */
//   onHover?: (event: any, elements: any[], chart: any) => void;

//   /** Update chart when data changes */
//   updateMode?: "none" | "reset" | "update";

//   /** Redraw chart when window resizes */
//   responsive?: boolean;

//   /** Custom colors */
//   colors?: string[];

//   /** Color scheme */
//   colorScheme?: "brand" | "sequential" | "categorical" | "diverging";

//   /** Whether to show grid */
//   showGrid?: boolean;

//   /** Whether to show axis */
//   showAxis?: boolean;

//   /** Whether to animate */
//   animate?: boolean;

//   /** Animation duration */
//   animationDuration?: number;

//   /** Custom class for canvas */
//   canvasClassName?: string;

//   /** Custom style for canvas */
//   canvasStyle?: React.CSSProperties;
// }

// export const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
//   (
//     {
//       type,
//       data: chartData,
//       options: chartOptions = {},
//       variant = "default",
//       size = "md",
//       height = "300px",
//       width = "100%",
//       loading = false,
//       loadingComponent,
//       error = null,
//       errorComponent,
//       library = "chartjs",
//       renderChart,
//       onClick,
//       onHover,
//       updateMode = "update",
//       responsive = true,
//       colors,
//       colorScheme = "brand",
//       showGrid = true,
//       showAxis = true,
//       animate = true,
//       animationDuration = 1000,
//       canvasClassName = "",
//       canvasStyle,
//       className = "",
//       style,
//       ...props
//     },
//     ref
//   ) => {
//     const { theme } = useTheme();
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const chartInstanceRef = useRef<any>(null);
//     const containerRef = useRef<HTMLDivElement>(null);

//     // Generate colors based on theme and color scheme
//     const generateColors = useMemo(() => {
//       if (colors && colors.length > 0) {
//         return colors;
//       }

//       const { colors: themeColors } = theme;

//       switch (colorScheme) {
//         case "brand":
//           return [
//             themeColors.brand[500],
//             themeColors.accent,
//             themeColors.success,
//             themeColors.warning,
//             themeColors.error,
//             themeColors.info,
//             themeColors.brand[300],
//             themeColors.brand[400],
//           ];

//         case "sequential":
//           return [
//             themeColors.brand[100],
//             themeColors.brand[200],
//             themeColors.brand[300],
//             themeColors.brand[400],
//             themeColors.brand[500],
//             themeColors.brand[600],
//           ];

//         case "diverging":
//           return [
//             themeColors.error,
//             themeColors.warning,
//             themeColors.brand[300],
//             themeColors.brand[500],
//             themeColors.success,
//             themeColors.info,
//           ];

//         case "categorical":
//         default:
//           return [
//             themeColors.brand[500],
//             themeColors.accent,
//             themeColors.success,
//             themeColors.warning,
//             themeColors.error,
//             themeColors.info,
//             themeColors.secondary,
//             themeColors.brand[300],
//           ];
//       }
//     }, [theme, colors, colorScheme]);

//     // Prepare chart configuration
//     const chartConfig = useMemo(() => {
//       const config: any = {
//         type,
//         data: {
//           labels: chartData.labels,
//           datasets: chartData.datasets.map((dataset, index) => {
//             const isLineOrArea = type === "line" || type === "area";
//             const isBar = type === "bar" || type === "horizontalBar";
//             const isPieLike =
//               type === "pie" || type === "doughnut" || type === "polarArea";

//             // Generate colors for dataset
//             const backgroundColor =
//               dataset.backgroundColor ||
//               (isPieLike
//                 ? generateColors
//                 : generateColors[index % generateColors.length]);

//             const borderColor =
//               dataset.borderColor ||
//               (isLineOrArea
//                 ? generateColors[index % generateColors.length]
//                 : backgroundColor);

//             return {
//               ...dataset,
//               backgroundColor,
//               borderColor,
//               borderWidth: dataset.borderWidth ?? (isBar ? 1 : 2),
//               fill: dataset.fill ?? type === "area",
//               tension: dataset.tension ?? (type === "line" ? 0.4 : 0),
//               pointRadius: dataset.pointRadius ?? (isLineOrArea ? 3 : 0),
//               pointBackgroundColor: dataset.pointBackgroundColor || borderColor,
//               pointBorderColor:
//                 dataset.pointBorderColor || theme.colors.background,
//             };
//           }),
//         },
//         options: {
//           responsive,
//           maintainAspectRatio: false,
//           animation: animate
//             ? {
//                 duration: animationDuration,
//                 easing: "easeOutQuad",
//               }
//             : false,
//           plugins: {
//             legend: {
//               display: chartOptions.legend !== false,
//               position:
//                 typeof chartOptions.legend === "object"
//                   ? chartOptions.legend.position || "top"
//                   : "top",
//               labels: {
//                 color: theme.colors.text.primary,
//                 font: {
//                   size: 12,
//                   family: "system-ui, -apple-system, sans-serif",
//                 },
//                 padding: 20,
//                 usePointStyle: true,
//                 ...(typeof chartOptions.legend === "object"
//                   ? chartOptions.legend.labels
//                   : {}),
//               },
//             },
//             tooltip: {
//               enabled: chartOptions.tooltips !== false,
//               backgroundColor: theme.colors.surface,
//               titleColor: theme.colors.text.primary,
//               bodyColor: theme.colors.text.secondary,
//               borderColor: theme.colors.surfaceBorder,
//               borderWidth: 1,
//               ...(typeof chartOptions.tooltips === "object"
//                 ? chartOptions.tooltips
//                 : {}),
//             },
//             title: {
//               display: chartOptions.plugins?.title?.display || false,
//               text: chartOptions.plugins?.title?.text || "",
//               color:
//                 chartOptions.plugins?.title?.color || theme.colors.text.primary,
//               font: {
//                 size: chartOptions.plugins?.title?.font?.size || 16,
//                 family:
//                   chartOptions.plugins?.title?.font?.family ||
//                   "system-ui, -apple-system, sans-serif",
//                 weight: chartOptions.plugins?.title?.font?.weight || "bold",
//               },
//               padding: chartOptions.plugins?.title?.padding || 10,
//             },
//           },
//           scales: {
//             x: {
//               display: showAxis,
//               grid: {
//                 display: showGrid,
//                 color: theme.colors.surfaceBorder,
//                 borderDash: [3, 3],
//                 ...(chartOptions.scales?.x?.grid || {}),
//               },
//               ticks: {
//                 color: theme.colors.text.secondary,
//                 font: {
//                   size: 11,
//                   family: "system-ui, -apple-system, sans-serif",
//                 },
//                 ...(chartOptions.scales?.x?.ticks || {}),
//               },
//               ...(chartOptions.scales?.x || {}),
//             },
//             y: {
//               display: showAxis,
//               grid: {
//                 display: showGrid,
//                 color: theme.colors.surfaceBorder,
//                 borderDash: [3, 3],
//                 ...(chartOptions.scales?.y?.grid || {}),
//               },
//               ticks: {
//                 color: theme.colors.text.secondary,
//                 font: {
//                   size: 11,
//                   family: "system-ui, -apple-system, sans-serif",
//                 },
//                 ...(chartOptions.scales?.y?.ticks || {}),
//               },
//               beginAtZero: true,
//               ...(chartOptions.scales?.y || {}),
//             },
//           },
//           interaction: {
//             mode: "nearest",
//             intersect: false,
//             ...(chartOptions.interaction || {}),
//           },
//           hover: {
//             mode: "nearest",
//             intersect: false,
//             ...(chartOptions.hover || {}),
//           },
//           ...chartOptions,
//         },
//       };

//       // Apply variant-specific options
//       switch (variant) {
//         case "minimal":
//           config.options.plugins.legend.display = false;
//           config.options.plugins.tooltip.enabled = false;
//           config.options.scales.x.grid.display = false;
//           config.options.scales.y.grid.display = false;
//           config.options.scales.x.ticks.display = false;
//           config.options.scales.y.ticks.display = false;
//           config.options.scales.x.border.display = false;
//           config.options.scales.y.border.display = false;
//           break;

//         case "gradient":
//           // Add gradient fills for datasets
//           config.data.datasets = config.data.datasets.map(
//             (dataset: any, index: number) => {
//               if (type === "line" || type === "area") {
//                 const gradient = canvasRef.current
//                   ?.getContext("2d")
//                   ?.createLinearGradient(0, 0, 0, 400);
//                 if (gradient) {
//                   gradient.addColorStop(0, `${dataset.borderColor}80`);
//                   gradient.addColorStop(1, `${dataset.borderColor}10`);
//                   dataset.backgroundColor = gradient;
//                   dataset.fill = true;
//                 }
//               }
//               return dataset;
//             }
//           );
//           break;

//         case "monochrome":
//           // Use single color with different opacities
//           const baseColor = generateColors[0];
//           config.data.datasets = config.data.datasets.map(
//             (dataset: any, index: number) => {
//               const opacity = 0.3 + (index * 0.7) / config.data.datasets.length;
//               const bgColor = baseColor
//                 .replace(")", `, ${opacity})`)
//                 .replace("rgb", "rgba");
//               const borderColor = baseColor;

//               return {
//                 ...dataset,
//                 backgroundColor: bgColor,
//                 borderColor,
//               };
//             }
//           );
//           break;
//       }

//       return config;
//     }, [
//       type,
//       chartData,
//       chartOptions,
//       variant,
//       generateColors,
//       theme,
//       responsive,
//       animate,
//       animationDuration,
//       showGrid,
//       showAxis,
//     ]);

//     // Initialize chart
//     useEffect(() => {
//       if (!canvasRef.current || loading || error) return;

//       const initChart = async () => {
//         try {
//           let ChartConstructor: any;
//           let chartConfigToUse = chartConfig;

//           // Load chart library based on selection
//           switch (library) {
//             case "chartjs":
//               const ChartJS = await import("chart.js/auto");
//               ChartConstructor = ChartJS.default || ChartJS;
//               break;

//             case "recharts":
//               // For recharts, we'd use a different approach
//               console.warn("Recharts integration requires a custom renderer");
//               return;

//             case "apexcharts":
//               // For ApexCharts, we'd use a different approach
//               console.warn("ApexCharts integration requires a custom renderer");
//               return;

//             case "victory":
//               // For Victory, we'd use a different approach
//               console.warn("Victory integration requires a custom renderer");
//               return;

//             default:
//               const ChartJSDefault = await import("chart.js/auto");
//               ChartConstructor = ChartJSDefault.default || ChartJSDefault;
//           }

//           // Destroy existing chart
//           if (chartInstanceRef.current) {
//             chartInstanceRef.current.destroy();
//           }

//           // Create new chart
//           if (renderChart) {
//             const result = renderChart(canvasRef.current!, chartConfigToUse);
//             chartInstanceRef.current = result.chart;
//           } else {
//             chartInstanceRef.current = new ChartConstructor(
//               canvasRef.current!,
//               chartConfigToUse
//             );
//           }

//           // Add event listeners
//           if (onClick && chartInstanceRef.current) {
//             canvasRef.current?.addEventListener("click", (event) => {
//               const elements =
//                 chartInstanceRef.current.getElementsAtEventForMode(
//                   event,
//                   chartConfigToUse.options.interaction.mode,
//                   chartConfigToUse.options.interaction.intersect,
//                   false
//                 );
//               onClick(event, elements, chartInstanceRef.current);
//             });
//           }

//           if (onHover && chartInstanceRef.current) {
//             canvasRef.current?.addEventListener("mousemove", (event) => {
//               const elements =
//                 chartInstanceRef.current.getElementsAtEventForMode(
//                   event,
//                   chartConfigToUse.options.hover.mode,
//                   chartConfigToUse.options.hover.intersect,
//                   false
//                 );
//               onHover(event, elements, chartInstanceRef.current);
//             });
//           }
//         } catch (err) {
//           console.error("Failed to initialize chart:", err);
//         }
//       };

//       initChart();

//       // Cleanup
//       return () => {
//         if (chartInstanceRef.current) {
//           chartInstanceRef.current.destroy();
//           chartInstanceRef.current = null;
//         }
//       };
//     }, [library, renderChart, onClick, onHover, loading, error]);

//     // Update chart when data changes
//     useEffect(() => {
//       if (!chartInstanceRef.current || loading || error) return;

//       try {
//         switch (updateMode) {
//           case "reset":
//             chartInstanceRef.current.destroy();
//             const ChartConstructor = require("chart.js/auto").default;
//             chartInstanceRef.current = new ChartConstructor(
//               canvasRef.current!,
//               chartConfig
//             );
//             break;

//           case "update":
//             chartInstanceRef.current.data = chartConfig.data;
//             chartInstanceRef.current.options = chartConfig.options;
//             chartInstanceRef.current.update();
//             break;

//           case "none":
//           default:
//             break;
//         }
//       } catch (err) {
//         console.error("Failed to update chart:", err);
//       }
//     }, [chartConfig, updateMode, loading, error]);

//     // Handle window resize
//     useEffect(() => {
//       if (!responsive || !chartInstanceRef.current) return;

//       const handleResize = () => {
//         if (chartInstanceRef.current) {
//           chartInstanceRef.current.resize();
//         }
//       };

//       window.addEventListener("resize", handleResize);
//       return () => window.removeEventListener("resize", handleResize);
//     }, [responsive]);

//     // Size classes
//     const sizeClasses = {
//       sm: "text-xs",
//       md: "text-sm",
//       lg: "text-base",
//       xl: "text-lg",
//     };

//     // Render loading state
//     if (loading) {
//       if (loadingComponent) {
//         return <>{loadingComponent}</>;
//       }

//       return (
//         <div
//           ref={ref}
//           className={`flex items-center justify-center rounded-lg bg-surface ${className}`}
//           style={{
//             height,
//             width,
//             ...style,
//           }}
//           {...props}
//         >
//           <div
//             className="text-center"
//             style={{ color: theme.colors.text.muted }}
//           >
//             <div className="animate-spin mb-2">
//               <svg
//                 className="w-8 h-8 mx-auto"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                 />
//               </svg>
//             </div>
//             Loading chart...
//           </div>
//         </div>
//       );
//     }

//     // Render error state
//     if (error) {
//       if (errorComponent) {
//         return <>{errorComponent}</>;
//       }

//       const errorMessage =
//         typeof error === "string"
//           ? error
//           : error?.message || "Failed to load chart";

//       return (
//         <div
//           ref={ref}
//           className={`flex items-center justify-center rounded-lg bg-surface border border-error ${className}`}
//           style={{
//             height,
//             width,
//             ...style,
//           }}
//           {...props}
//         >
//           <div
//             className="text-center p-4"
//             style={{ color: theme.colors.error }}
//           >
//             <svg
//               className="w-8 h-8 mx-auto mb-2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
//               />
//             </svg>
//             <div className="font-medium">Chart Error</div>
//             <div className="text-sm mt-1">{errorMessage}</div>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div
//         ref={ref}
//         className={`relative rounded-lg overflow-hidden ${sizeClasses[size]} ${className}`}
//         style={{
//           height,
//           width,
//           ...style,
//         }}
//         {...props}
//       >
//         <div ref={containerRef} className="relative w-full h-full">
//           <canvas
//             ref={canvasRef}
//             className={canvasClassName}
//             style={canvasStyle}
//             role="img"
//             aria-label={`${type} chart showing ${chartData.datasets.length} datasets`}
//           />
//         </div>
//       </div>
//     );
//   }
// );

// // Set display name
// (Chart as { displayName?: string }).displayName = "Chart";

// // Pre-configured chart types
// export const LineChart = React.forwardRef<
//   HTMLDivElement,
//   Omit<ChartProps, "type">
// >((props, ref) => <Chart ref={ref} type="line" {...props} />);
// (LineChart as { displayName?: string }).displayName = "LineChart";

// export const BarChart = React.forwardRef<
//   HTMLDivElement,
//   Omit<ChartProps, "type">
// >((props, ref) => <Chart ref={ref} type="bar" {...props} />);
// (BarChart as { displayName?: string }).displayName = "BarChart";

// export const PieChart = React.forwardRef<
//   HTMLDivElement,
//   Omit<ChartProps, "type">
// >((props, ref) => <Chart ref={ref} type="pie" {...props} />);
// (PieChart as { displayName?: string }).displayName = "PieChart";

// export const DoughnutChart = React.forwardRef<
//   HTMLDivElement,
//   Omit<ChartProps, "type">
// >((props, ref) => <Chart ref={ref} type="doughnut" {...props} />);
// (DoughnutChart as { displayName?: string }).displayName = "DoughnutChart";

// export const AreaChart = React.forwardRef<
//   HTMLDivElement,
//   Omit<ChartProps, "type">
// >((props, ref) => <Chart ref={ref} type="area" {...props} />);
// (AreaChart as { displayName?: string }).displayName = "AreaChart";

// export const ScatterChart = React.forwardRef<
//   HTMLDivElement,
//   Omit<ChartProps, "type">
// >((props, ref) => <Chart ref={ref} type="scatter" {...props} />);
// (ScatterChart as { displayName?: string }).displayName = "ScatterChart";

// // Pre-configured variants
// export const MinimalChart = React.forwardRef<
//   HTMLDivElement,
//   Omit<ChartProps, "variant">
// >((props, ref) => <Chart ref={ref} variant="minimal" {...props} />);
// (MinimalChart as { displayName?: string }).displayName = "MinimalChart";

// export const GradientChart = React.forwardRef<
//   HTMLDivElement,
//   Omit<ChartProps, "variant">
// >((props, ref) => <Chart ref={ref} variant="gradient" {...props} />);
// (GradientChart as { displayName?: string }).displayName = "GradientChart";

// // Helper hooks
// export const useChartColors = () => {
//   const { theme } = useTheme();

//   return {
//     brand: theme.colors.brand[500],
//     accent: theme.colors.accent,
//     success: theme.colors.success,
//     warning: theme.colors.warning,
//     error: theme.colors.error,
//     info: theme.colors.info,
//     text: theme.colors.text.primary,
//     background: theme.colors.background,
//     surface: theme.colors.surface,
//     border: theme.colors.border,
//   };
// };

// export const generateChartData = (
//   labels: string[],
//   datasets: Omit<ChartDataset, "data">[],
//   dataGenerator?: (datasetIndex: number, labelIndex: number) => number
// ) => {
//   return {
//     labels,
//     datasets: datasets.map((dataset, datasetIndex) => ({
//       ...dataset,
//       data: labels.map((_, labelIndex) =>
//         dataGenerator
//           ? dataGenerator(datasetIndex, labelIndex)
//           : Math.random() * 100
//       ),
//     })),
//   };
// };
