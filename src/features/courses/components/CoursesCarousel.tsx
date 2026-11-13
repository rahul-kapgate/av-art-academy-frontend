"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface CoursesCarouselProps {
  children: ReactNode;
  itemLabel?: string;
  regionLabel?: string;
}

function ChevronLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function CoursesCarousel({
  children,
  itemLabel = "course",
  regionLabel = "Available courses carousel",
}: CoursesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const [canScrollRight, setCanScrollRight] = useState(false);

  /* =========================================
     UPDATE ARROW STATE
  ========================================== */
  const updateScrollState = useCallback(() => {
    const container = scrollRef.current;

    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    const maxScrollLeft = Math.max(0, scrollWidth - clientWidth);

    // Small tolerance for fractional pixel values.
    const tolerance = 2;

    setCanScrollLeft(scrollLeft > tolerance);

    setCanScrollRight(scrollLeft < maxScrollLeft - tolerance);
  }, []);

  /* =========================================
     HANDLE INITIAL RENDER & SCREEN RESIZE
  ========================================== */
  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    updateScrollState();

    const resizeObserver = new ResizeObserver(() => {
      updateScrollState();
    });

    resizeObserver.observe(container);

    // Observe card size changes as well.
    Array.from(container.children).forEach((child) => {
      resizeObserver.observe(child);
    });

    return () => {
      resizeObserver.disconnect();
    };
  }, [children, updateScrollState]);

  /* =========================================
     SCROLL BY ONE COURSE CARD
  ========================================== */
  const scrollCourses = (direction: "left" | "right") => {
    const container = scrollRef.current;

    if (!container) return;

    const firstCard = container.children[0];

    const secondCard = container.children[1];

    if (!firstCard) return;

    // Measure the actual distance between cards.
    // This automatically includes the responsive gap.
    const scrollAmount = secondCard
      ? Math.abs(
          secondCard.getBoundingClientRect().left -
            firstCard.getBoundingClientRect().left,
        )
      : firstCard.getBoundingClientRect().width;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,

      // Uses CSS scroll behavior, including
      // prefers-reduced-motion.
      behavior: "auto",
    });
  };

  const hasOverflow = canScrollLeft || canScrollRight;

  /* =========================================
     SHARED ARROW STYLES
  ========================================== */
  const arrowClassName = `
    absolute top-1/2 z-30
    flex h-10 w-10
    -translate-y-1/2
    items-center justify-center
    rounded-full
    border-2 border-cyan-400
    bg-[#080D1D]
    text-cyan-300
    shadow-[0_4px_20px_rgba(0,0,0,0.35)]

    transition-[background-color,color,opacity,transform]
    duration-200

    hover:bg-cyan-400
    hover:text-[#061426]

    motion-safe:active:scale-95

    focus-visible:outline-2
    focus-visible:outline-offset-4
    focus-visible:outline-cyan-400

    disabled:cursor-not-allowed
    disabled:border-slate-600
    disabled:bg-[#080D1D]
    disabled:text-slate-500
    disabled:opacity-40

    sm:h-11 sm:w-11
  `;

  return (
    <div className="relative min-w-0">
      {/* =========================================
          CAROUSEL CONTAINER
      ========================================== */}
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        role="region"
        aria-label={regionLabel}
        tabIndex={0}
        className="
          grid min-w-0
          grid-flow-col grid-rows-1
          auto-cols-[100%]
          items-stretch gap-5

          overflow-x-auto
          overflow-y-hidden
          overscroll-x-contain

          snap-x snap-mandatory
          scroll-smooth
          motion-reduce:scroll-auto

          pt-2 pb-4

          sm:auto-cols-[calc((100%_-_1.5rem)/2)]
          sm:gap-6

          lg:auto-cols-[calc((100%_-_3rem)/3)]

          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden

          rounded-xl

          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-cyan-400
        "
      >
        {children}
      </div>

      {/* =========================================
          LEFT NAVIGATION ARROW
      ========================================== */}
      {hasOverflow && (
        <button
          type="button"
          aria-label={`Scroll to previous ${itemLabel}`}
          disabled={!canScrollLeft}
          onClick={() => scrollCourses("left")}
          className={`
            ${arrowClassName}
            left-1
            sm:-left-4
            lg:-left-5
          `}
        >
          <ChevronLeftIcon />
        </button>
      )}

      {/* =========================================
          RIGHT NAVIGATION ARROW
      ========================================== */}
      {hasOverflow && (
        <button
          type="button"
          aria-label={`Scroll to next ${itemLabel}`}
          disabled={!canScrollRight}
          onClick={() => scrollCourses("right")}
          className={`
            ${arrowClassName}
            right-1
            sm:-right-4
            lg:-right-5
          `}
        >
          <ChevronRightIcon />
        </button>
      )}

      {/* =========================================
          SCROLL INDICATOR
      ========================================== */}
      {hasOverflow && (
        <div
          className="
            mt-3 flex items-center
            justify-center gap-2
            text-xs font-medium
            text-slate-400
          "
        >
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12h16" />
            <path d="m8 8-4 4 4 4" />
            <path d="m16 8 4 4-4 4" />
          </svg>

          <span className="sm:hidden">Swipe to explore more {itemLabel}s</span>

          <span className="hidden sm:inline">
            Use arrows to explore more {itemLabel}s
          </span>
        </div>
      )}
    </div>
  );
}

export default CoursesCarousel;
