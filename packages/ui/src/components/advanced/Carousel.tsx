// // packages/ui/src/components/DataDisplay/Carousel.tsx
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useTheme } from "../../contexts/themeContext";
// import { Icon } from "../utility/Icon";

// export type CarouselVariant = "default" | "cards" | "gallery" | "contained";
// export type CarouselControlPosition = "bottom" | "top" | "side" | "none";
// export type CarouselTransition = "slide" | "fade" | "slide-fade";

// export interface CarouselItem {
//   /** Unique identifier for the item */
//   id: string | number;

//   /** Item content */
//   content: React.ReactNode;

//   /** Optional thumbnail for navigation */
//   thumbnail?: React.ReactNode;

//   /** Optional caption */
//   caption?: React.ReactNode;

//   /** Optional data for custom usage */
//   data?: Record<string, any>;
// }

// export interface CarouselProps
//   extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
//   /** Array of carousel items */
//   items: CarouselItem[];

//   /** Active slide index (controlled) */
//   activeIndex?: number;

//   /** Initial active slide index (uncontrolled) */
//   defaultActiveIndex?: number;

//   /** Callback when active slide changes */
//   onSlideChange?: (index: number, item: CarouselItem) => void;

//   /** Whether to auto-play the carousel */
//   autoplay?: boolean;

//   /** Autoplay interval in milliseconds */
//   autoplayInterval?: number;

//   /** Whether to show navigation arrows */
//   showArrows?: boolean;

//   /** Whether to show navigation dots */
//   showDots?: boolean;

//   /** Whether to show navigation thumbnails */
//   showThumbnails?: boolean;

//   /** Position of navigation controls */
//   controlsPosition?: CarouselControlPosition;

//   /** Transition effect */
//   transition?: CarouselTransition;

//   /** Transition duration in milliseconds */
//   transitionDuration?: number;

//   /** Whether to enable infinite looping */
//   infinite?: boolean;

//   /** Whether to pause on hover */
//   pauseOnHover?: boolean;

//   /** Whether the carousel is disabled */
//   disabled?: boolean;

//   /** Variant style */
//   variant?: CarouselVariant;

//   /** Height of the carousel */
//   height?: number | string;

//   /** Width of the carousel */
//   width?: number | string;

//   /** Custom previous arrow component */
//   customPrevArrow?: React.ReactNode;

//   /** Custom next arrow component */
//   customNextArrow?: React.ReactNode;

//   /** Custom dot component */
//   customDot?: (props: {
//     index: number;
//     isActive: boolean;
//     onClick: () => void;
//   }) => React.ReactNode;

//   /** Custom thumbnail component */
//   customThumbnail?: (props: {
//     item: CarouselItem;
//     index: number;
//     isActive: boolean;
//     onClick: () => void;
//   }) => React.ReactNode;

//   /** Number of slides to show at once */
//   slidesToShow?: number;

//   /** Number of slides to scroll */
//   slidesToScroll?: number;

//   /** Whether to center the active slide */
//   centerMode?: boolean;

//   /** Padding around slides in center mode */
//   centerPadding?: string;

//   /** Responsive breakpoints */
//   responsive?: Array<{
//     breakpoint: number;
//     settings: {
//       slidesToShow?: number;
//       slidesToScroll?: number;
//       centerMode?: boolean;
//       centerPadding?: string;
//     };
//   }>;
// }

// export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
//   (
//     {
//       items,
//       activeIndex: controlledActiveIndex,
//       defaultActiveIndex = 0,
//       onSlideChange,
//       autoplay = false,
//       autoplayInterval = 3000,
//       showArrows = true,
//       showDots = true,
//       showThumbnails = false,
//       controlsPosition = "bottom",
//       transition = "slide",
//       transitionDuration = 300,
//       infinite = true,
//       pauseOnHover = true,
//       disabled = false,
//       variant = "default",
//       height = "400px",
//       width = "100%",
//       customPrevArrow,
//       customNextArrow,
//       customDot,
//       customThumbnail,
//       slidesToShow = 1,
//       slidesToScroll = 1,
//       centerMode = false,
//       centerPadding = "60px",
//       responsive = [],
//       className = "",
//       style,
//       ...props
//     },

//     ref
//   ) => {
//     const { theme } = useTheme();

//     // Refs
//     const containerRef = useRef<HTMLDivElement>(null);
//     const autoplayTimerRef = useRef<number | null>(null);
//     const touchStartRef = useRef<number>(0);
//     const touchEndRef = useRef<number>(0);
//     const resizeTimeoutRef = useRef<number | null>(null);

//     // State
//     const [internalActiveIndex, setInternalActiveIndex] =
//       useState(defaultActiveIndex);
//     const [isTransitioning, setIsTransitioning] = useState(false);
//     const [isPaused, setIsPaused] = useState(false);
//     const [currentSlidesToShow, setCurrentSlidesToShow] =
//       useState(slidesToShow);
//     const [currentSlidesToScroll, setCurrentSlidesToScroll] =
//       useState(slidesToScroll);
//     const [currentCenterMode, setCurrentCenterMode] = useState(centerMode);
//     const [currentCenterPadding, setCurrentCenterPadding] =
//       useState(centerPadding);

//     // Use controlled or uncontrolled active index
//     const activeIndex =
//       controlledActiveIndex !== undefined
//         ? controlledActiveIndex
//         : internalActiveIndex;

//     // Calculate actual index considering infinite loop
//     const getActualIndex = useCallback(
//       (index: number): number => {
//         if (!infinite || items.length === 0) return index;

//         if (index < 0) return items.length - 1;
//         if (index >= items.length) return 0;
//         return index;
//       },
//       [items.length, infinite]
//     );

//     const actualActiveIndex = getActualIndex(activeIndex);

//     // Create goToSlide with useCallback to avoid infinite loops
//     const goToSlide = useCallback(
//       (index: number) => {
//         if (disabled || isTransitioning || items.length === 0) return;

//         const newIndex = getActualIndex(index);
//         setIsTransitioning(true);

//         // Update state
//         if (controlledActiveIndex === undefined) {
//           setInternalActiveIndex(newIndex);
//         }

//         // Call callback
//         if (onSlideChange) {
//           onSlideChange(newIndex, items[newIndex]);
//         }

//         // Reset transitioning state after animation
//         setTimeout(() => {
//           setIsTransitioning(false);
//         }, transitionDuration);
//       },
//       [
//         disabled,
//         isTransitioning,
//         items,
//         getActualIndex,
//         controlledActiveIndex,
//         onSlideChange,
//         transitionDuration,
//       ]
//     );

//     // Handle responsive breakpoints
//     useEffect(() => {
//       const handleResize = () => {
//         if (resizeTimeoutRef.current !== null) {
//           clearTimeout(resizeTimeoutRef.current);
//         }

//         resizeTimeoutRef.current = window.setTimeout(() => {
//           const windowWidth = window.innerWidth;

//           // Find matching responsive settings
//           const matchedSettings = responsive
//             .filter((bp) => windowWidth <= bp.breakpoint)
//             .sort((a, b) => a.breakpoint - b.breakpoint)[0];

//           if (matchedSettings) {
//             const { settings } = matchedSettings;
//             setCurrentSlidesToShow(settings.slidesToShow || slidesToShow);
//             setCurrentSlidesToScroll(settings.slidesToScroll || slidesToScroll);
//             setCurrentCenterMode(settings.centerMode ?? centerMode);
//             setCurrentCenterPadding(settings.centerPadding || centerPadding);
//           } else {
//             // Use default settings
//             setCurrentSlidesToShow(slidesToShow);
//             setCurrentSlidesToScroll(slidesToScroll);
//             setCurrentCenterMode(centerMode);
//             setCurrentCenterPadding(centerPadding);
//           }
//         }, 150);
//       };

//       // Initial call
//       handleResize();

//       window.addEventListener("resize", handleResize);
//       return () => {
//         window.removeEventListener("resize", handleResize);
//         if (resizeTimeoutRef.current !== null) {
//           clearTimeout(resizeTimeoutRef.current);
//         }
//       };
//     }, [responsive, slidesToShow, slidesToScroll, centerMode, centerPadding]);

//     // Autoplay logic
//     useEffect(() => {
//       if (!autoplay || disabled || isPaused || items.length <= 1) return;

//       const playNextSlide = () => {
//         if (
//           !infinite &&
//           actualActiveIndex >= items.length - currentSlidesToShow
//         ) {
//           return; // Don't auto-play past the end in non-infinite mode
//         }

//         goToSlide(actualActiveIndex + currentSlidesToScroll);
//       };

//       autoplayTimerRef.current = window.setTimeout(
//         playNextSlide,
//         autoplayInterval
//       );

//       return () => {
//         if (autoplayTimerRef.current !== null) {
//           clearTimeout(autoplayTimerRef.current);
//           autoplayTimerRef.current = null;
//         }
//       };
//     }, [
//       autoplay,
//       autoplayInterval,
//       actualActiveIndex,
//       items.length,
//       disabled,
//       isPaused,
//       infinite,
//       currentSlidesToShow,
//       currentSlidesToScroll,
//       goToSlide, // This needs to be wrapped in useCallback
//     ]);

//     // Navigation functions
//     const goToPrev = useCallback(() => {
//       goToSlide(actualActiveIndex - currentSlidesToScroll);
//     }, [goToSlide, actualActiveIndex, currentSlidesToScroll]);

//     const goToNext = useCallback(() => {
//       goToSlide(actualActiveIndex + currentSlidesToScroll);
//     }, [goToSlide, actualActiveIndex, currentSlidesToScroll]);

//     const goToIndex = useCallback(
//       (index: number) => {
//         goToSlide(index);
//       },
//       [goToSlide]
//     );

//     // Touch/swipe handling
//     const handleTouchStart = (e: React.TouchEvent) => {
//       touchStartRef.current = e.touches[0].clientX;
//     };

//     const handleTouchMove = (e: React.TouchEvent) => {
//       touchEndRef.current = e.touches[0].clientX;
//     };

//     const handleTouchEnd = () => {
//       if (!touchStartRef.current || !touchEndRef.current) return;

//       const distance = touchStartRef.current - touchEndRef.current;
//       const minSwipeDistance = 50;

//       if (Math.abs(distance) < minSwipeDistance) return;

//       if (distance > 0) {
//         // Swipe left - next slide
//         goToNext();
//       } else {
//         // Swipe right - previous slide
//         goToPrev();
//       }

//       // Reset touch values
//       touchStartRef.current = 0;
//       touchEndRef.current = 0;
//     };

//     // Mouse enter/leave for pause on hover
//     const handleMouseEnter = () => {
//       if (pauseOnHover) {
//         setIsPaused(true);
//       }
//     };

//     const handleMouseLeave = () => {
//       if (pauseOnHover) {
//         setIsPaused(false);
//       }
//     };

//     // Calculate slide width for multiple slides
//     const getSlideWidth = () => {
//       if (!containerRef.current || currentSlidesToShow <= 1) return "100%";

//       const containerWidth = containerRef.current.offsetWidth;
//       const slideWidth = containerWidth / currentSlidesToShow;
//       return `${slideWidth}px`;
//     };

//     // Calculate transform for slide animation
//     const getTransformStyle = () => {
//       if (currentSlidesToShow <= 1) {
//         const percentage = -actualActiveIndex * 100;
//         return `translateX(${percentage}%)`;
//       }

//       // For multiple slides, calculate based on slide width
//       const slideWidth = 100 / currentSlidesToShow;
//       const percentage = -actualActiveIndex * slideWidth;
//       return `translateX(${percentage}%)`;
//     };

//     // Get container classes based on variant
//     const getContainerClasses = () => {
//       const classes = [
//         "relative overflow-hidden rounded-lg",
//         disabled ? "opacity-60 cursor-not-allowed" : "",
//       ];

//       switch (variant) {
//         case "cards":
//           classes.push("bg-surface border border-surfaceBorder");
//           break;
//         case "gallery":
//           classes.push("bg-backgroundSubtle");
//           break;
//         case "contained":
//           classes.push("bg-surface border-2 border-surfaceBorder");
//           break;
//         case "default":
//         default:
//           classes.push("bg-surface");
//           break;
//       }

//       return classes.filter(Boolean).join(" ");
//     };

//     // Render arrows
//     const renderArrows = () => {
//       if (!showArrows || items.length <= currentSlidesToShow) return null;

//       const prevDisabled = disabled || (!infinite && actualActiveIndex === 0);
//       const nextDisabled =
//         disabled ||
//         (!infinite && actualActiveIndex >= items.length - currentSlidesToShow);

//       if (customPrevArrow && customNextArrow) {
//         return (
//           <>
//             <div
//               className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 ${
//                 prevDisabled
//                   ? "opacity-50 cursor-not-allowed"
//                   : "cursor-pointer"
//               }`}
//               onClick={prevDisabled ? undefined : goToPrev}
//             >
//               {customPrevArrow}
//             </div>
//             <div
//               className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 ${
//                 nextDisabled
//                   ? "opacity-50 cursor-not-allowed"
//                   : "cursor-pointer"
//               }`}
//               onClick={nextDisabled ? undefined : goToNext}
//             >
//               {customNextArrow}
//             </div>
//           </>
//         );
//       }

//       return (
//         <>
//           <button
//             type="button"
//             className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-surface border border-surfaceBorder shadow-lg transition-all hover:scale-105 ${
//               prevDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
//             }`}
//             onClick={prevDisabled ? undefined : goToPrev}
//             disabled={prevDisabled}
//             aria-label="Previous slide"
//           >
//             <Icon name="ChevronLeft" size="lg" color="inherit" />
//           </button>
//           <button
//             type="button"
//             className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-surface border border-surfaceBorder shadow-lg transition-all hover:scale-105 ${
//               nextDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
//             }`}
//             onClick={nextDisabled ? undefined : goToNext}
//             disabled={nextDisabled}
//             aria-label="Next slide"
//           >
//             <Icon name="ChevronRight" size="lg" color="inherit" />
//           </button>
//         </>
//       );
//     };

//     // Render dots
//     const renderDots = () => {
//       if (!showDots || items.length <= 1) return null;

//       const totalDots = Math.ceil(items.length / currentSlidesToShow);

//       return (
//         <div className="flex justify-center gap-2 mt-4">
//           {Array.from({ length: totalDots }).map((_, index) => {
//             const isActive =
//               Math.floor(actualActiveIndex / currentSlidesToShow) === index;

//             if (customDot) {
//               return React.createElement(customDot, {
//                 key: index,
//                 index,
//                 isActive,
//                 onClick: () => goToIndex(index * currentSlidesToShow),
//               });
//             }

//             return (
//               <button
//                 key={index}
//                 type="button"
//                 className={`w-2 h-2 rounded-full transition-all ${
//                   isActive ? "w-8" : ""
//                 }`}
//                 style={{
//                   backgroundColor: isActive
//                     ? theme.colors.brand[500]
//                     : theme.colors.surfaceBorder,
//                 }}
//                 onClick={() => goToIndex(index * currentSlidesToShow)}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             );
//           })}
//         </div>
//       );
//     };

//     // Render thumbnails
//     const renderThumbnails = () => {
//       if (!showThumbnails || items.length <= 1) return null;

//       return (
//         <div className="flex gap-2 mt-4 overflow-x-auto py-2">
//           {items.map((item, index) => {
//             const isActive = actualActiveIndex === index;

//             if (customThumbnail) {
//               return React.createElement(customThumbnail, {
//                 key: item.id,
//                 item,
//                 index,
//                 isActive,
//                 onClick: () => goToIndex(index),
//               });
//             }

//             return (
//               <button
//                 key={item.id}
//                 type="button"
//                 className={`flex-shrink-0 overflow-hidden rounded transition-all ${
//                   isActive
//                     ? "ring-2 ring-brand-500"
//                     : "opacity-70 hover:opacity-100"
//                 }`}
//                 onClick={() => goToIndex(index)}
//                 style={{
//                   width: "80px",
//                   height: "60px",
//                 }}
//                 aria-label={`Go to slide ${index + 1}`}
//               >
//                 {item.thumbnail || (
//                   <div className="w-full h-full flex items-center justify-center bg-surfaceHover">
//                     {index + 1}
//                   </div>
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       );
//     };

//     // Render slides
//     const renderSlides = () => {
//       if (items.length === 0) {
//         return (
//           <div
//             className="w-full h-full flex items-center justify-center"
//             style={{ color: theme.colors.text.muted }}
//           >
//             No items to display
//           </div>
//         );
//       }

//       // For infinite loop, we need to clone slides
//       const slidesToRender = infinite ? [...items, ...items, ...items] : items;
//       const offset = infinite ? items.length : 0;

//       return (
//         <div
//           className={`flex h-full transition-transform ease-out`}
//           style={{
//             transform: getTransformStyle(),
//             transitionDuration: `${transitionDuration}ms`,
//             width: `${(slidesToRender.length / currentSlidesToShow) * 100}%`,
//           }}
//         >
//           {slidesToRender.map((item, index) => {
//             const isActive = actualActiveIndex === index - offset;

//             return (
//               <div
//                 key={`${item.id}-${index}`}
//                 className="flex-shrink-0 h-full"
//                 style={{
//                   width: getSlideWidth(),
//                   padding: currentCenterMode
//                     ? `0 ${currentCenterPadding}`
//                     : "0",
//                 }}
//               >
//                 <div
//                   className={`h-full transition-all ${
//                     currentCenterMode && isActive ? "scale-105" : ""
//                   }`}
//                   style={{
//                     padding: "1rem",
//                   }}
//                 >
//                   {item.content}
//                   {item.caption && (
//                     <div
//                       className="mt-2 text-center"
//                       style={{ color: theme.colors.text.secondary }}
//                     >
//                       {item.caption}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       );
//     };

//     // Determine controls container class based on position
//     const getControlsContainerClass = () => {
//       switch (controlsPosition) {
//         case "top":
//           return "flex-col";
//         case "side":
//           return "flex-row items-center";
//         case "none":
//           return "hidden";
//         case "bottom":
//         default:
//           return "flex-col-reverse";
//       }
//     };

//     return (
//       <div
//         ref={ref}
//         className={`${getContainerClasses()} ${className}`}
//         style={{
//           width,
//           height,
//           ...style,
//         }}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//         {...props}
//       >
//         <div ref={containerRef} className="relative h-full overflow-hidden">
//           {/* Slides container */}
//           <div className="h-full">{renderSlides()}</div>

//           {/* Navigation arrows */}
//           {renderArrows()}
//         </div>

//         {/* Controls container (dots, thumbnails) */}
//         {(showDots || showThumbnails) && controlsPosition !== "none" && (
//           <div className={`flex ${getControlsContainerClass()} p-4`}>
//             {showDots && renderDots()}
//             {showThumbnails && renderThumbnails()}
//           </div>
//         )}
//       </div>
//     );
//   }
// );

// // Set display name
// (Carousel as { displayName?: string }).displayName = "Carousel";

// // Pre-configured variants
// export const CardCarousel = React.forwardRef<
//   HTMLDivElement,
//   Omit<CarouselProps, "variant">
// >((props, ref) => <Carousel ref={ref} variant="cards" {...props} />);
// (CardCarousel as { displayName?: string }).displayName = "CardCarousel";

// export const GalleryCarousel = React.forwardRef<
//   HTMLDivElement,
//   Omit<CarouselProps, "variant">
// >((props, ref) => <Carousel ref={ref} variant="gallery" {...props} />);
// (GalleryCarousel as { displayName?: string }).displayName = "GalleryCarousel";

// export const AutoPlayCarousel = React.forwardRef<
//   HTMLDivElement,
//   Omit<CarouselProps, "autoplay">
// >((props, ref) => <Carousel ref={ref} autoplay={true} {...props} />);
// (AutoPlayCarousel as { displayName?: string }).displayName = "AutoPlayCarousel";

// export const InfiniteCarousel = React.forwardRef<
//   HTMLDivElement,
//   Omit<CarouselProps, "infinite">
// >((props, ref) => <Carousel ref={ref} infinite={true} {...props} />);
// (InfiniteCarousel as { displayName?: string }).displayName = "InfiniteCarousel";

// export const MultiSlideCarousel = React.forwardRef<
//   HTMLDivElement,
//   Omit<CarouselProps, "slidesToShow">
// >((props, ref) => <Carousel ref={ref} slidesToShow={3} {...props} />);
// (MultiSlideCarousel as { displayName?: string }).displayName =
//   "MultiSlideCarousel";

// export const CenterModeCarousel = React.forwardRef<
//   HTMLDivElement,
//   Omit<CarouselProps, "centerMode">
// >((props, ref) => <Carousel ref={ref} centerMode={true} {...props} />);
// (CenterModeCarousel as { displayName?: string }).displayName =
//   "CenterModeCarousel";
