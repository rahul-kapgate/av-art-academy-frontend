"use client";

import { useMemo, useState, type ReactNode } from "react";

import type { Course } from "../types";

type CourseFilter = "all" | "free" | "paid";

type CourseSort = "default" | "price-low" | "price-high" | "duration" | "name";

interface CourseCatalogItem {
  course: Course;
  card: ReactNode;
}

interface CoursesCatalogProps {
  items: CourseCatalogItem[];
}

const filterOptions: {
  label: string;
  value: CourseFilter;
}[] = [
  {
    label: "All Courses",
    value: "all",
  },
  {
    label: "Free",
    value: "free",
  },
  {
    label: "Paid",
    value: "paid",
  },
];

const sortOptions: {
  label: string;
  value: CourseSort;
}[] = [
  {
    label: "Recommended",
    value: "default",
  },
  {
    label: "Price: Low to High",
    value: "price-low",
  },
  {
    label: "Price: High to Low",
    value: "price-high",
  },
  {
    label: "Duration: Shortest",
    value: "duration",
  },
  {
    label: "Name: A to Z",
    value: "name",
  },
];

function getEffectivePrice(course: Course): number {
  const { isFree, priceAmount, salePriceAmount } = course.pricing;

  if (isFree) {
    return 0;
  }

  if (
    salePriceAmount !== null &&
    salePriceAmount >= 0 &&
    salePriceAmount < priceAmount
  ) {
    return salePriceAmount;
  }

  return priceAmount;
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CoursesCatalog({ items }: CoursesCatalogProps) {
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<CourseFilter>("all");

  const [sort, setSort] = useState<CourseSort>("default");

  /* =========================================
     SEARCH, FILTER & SORT
  ========================================== */
  const filteredItems = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    let result = items.filter(({ course }) => {
      // Search by course title, description and features.
      const searchableText = [
        course.title,
        course.shortDescription,
        ...course.courseIncludes,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(searchTerm);

      const matchesFilter =
        filter === "all" ||
        (filter === "free" && course.pricing.isFree) ||
        (filter === "paid" && !course.pricing.isFree);

      return matchesSearch && matchesFilter;
    });

    // Sort without mutating the original data.
    result = [...result];

    switch (sort) {
      case "price-low":
        result.sort(
          (a, b) => getEffectivePrice(a.course) - getEffectivePrice(b.course),
        );
        break;

      case "price-high":
        result.sort(
          (a, b) => getEffectivePrice(b.course) - getEffectivePrice(a.course),
        );
        break;

      case "duration":
        result.sort(
          (a, b) =>
            a.course.estimatedDurationMinutes -
            b.course.estimatedDurationMinutes,
        );
        break;

      case "name":
        result.sort((a, b) => a.course.title.localeCompare(b.course.title));
        break;

      case "default":
      default:
        break;
    }

    return result;
  }, [items, search, filter, sort]);

  const freeCourseCount = items.filter(
    ({ course }) => course.pricing.isFree,
  ).length;

  const paidCourseCount = items.length - freeCourseCount;

  const filterCounts: Record<CourseFilter, number> = {
    all: items.length,
    free: freeCourseCount,
    paid: paidCourseCount,
  };

  const hasActiveFilters =
    search.trim() !== "" || filter !== "all" || sort !== "default";

  function resetFilters() {
    setSearch("");
    setFilter("all");
    setSort("default");
  }

  return (
    <div className="min-w-0">
      {/* =========================================
          SEARCH & FILTER TOOLBAR
      ========================================== */}
      <div
        className="
          rounded-2xl border
          border-white/10
          bg-[#101A34]
          p-4 sm:p-5
        "
      >
        {/* Search & Sorting */}
        <div
          className="
            flex flex-col gap-4
            md:flex-row
            md:items-end
          "
        >
          {/* Search */}
          <div className="min-w-0 flex-1">
            <label
              htmlFor="course-search"
              className="
                mb-2 block text-xs
                font-semibold text-slate-300
              "
            >
              Search courses
            </label>

            <div className="relative">
              <div
                className="
                  pointer-events-none absolute
                  left-3.5 top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              >
                <SearchIcon />
              </div>

              <input
                id="course-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search drawing, design, MAH AAC CET..."
                className="
                  h-12 w-full min-w-0
                  rounded-xl border
                  border-white/10
                  bg-[#080D1D]
                  pl-11 pr-11
                  text-sm text-white
                  placeholder:text-slate-500
                  outline-none
                  transition-colors
                  focus:border-cyan-400/60
                  focus:ring-2
                  focus:ring-cyan-400/10
                  [&::-webkit-search-cancel-button]:appearance-none
                "
              />

              {search.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear course search"
                  className="
                    absolute right-2 top-1/2
                    flex h-8 w-8
                    -translate-y-1/2
                    items-center justify-center
                    rounded-lg text-slate-400
                    transition-colors
                    hover:bg-white/5
                    hover:text-white
                  "
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          </div>

          {/* Sorting */}
          <div className="w-full md:w-[240px]">
            <label
              htmlFor="course-sort"
              className="
                mb-2 block text-xs
                font-semibold text-slate-300
              "
            >
              Sort by
            </label>

            <div className="relative">
              <select
                id="course-sort"
                value={sort}
                onChange={(event) => setSort(event.target.value as CourseSort)}
                className="
                  h-12 w-full
                  appearance-none
                  rounded-xl border
                  border-white/10
                  bg-[#080D1D]
                  px-4 pr-10
                  text-sm text-slate-200
                  outline-none
                  transition-colors
                  focus:border-cyan-400/60
                  focus:ring-2
                  focus:ring-cyan-400/10
                "
              >
                {sortOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-[#080D1D]"
                  >
                    {option.label}
                  </option>
                ))}
              </select>

              <div
                className="
                  pointer-events-none absolute
                  right-4 top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              >
                <ChevronDownIcon />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            FILTER BUTTONS
        ========================================== */}
        <div
          className="
            mt-5 flex flex-wrap
            items-center justify-between
            gap-3
            border-t border-white/10
            pt-4
          "
        >
          <div
            role="group"
            aria-label="Filter courses by pricing"
            className="flex flex-wrap items-center gap-2"
          >
            {filterOptions.map((option) => {
              const isActive = filter === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setFilter(option.value)}
                  className={`
                    inline-flex min-h-10
                    items-center gap-2
                    rounded-lg border
                    px-3 py-2
                    text-xs font-semibold
                    transition-colors
                    sm:px-4 sm:text-sm
                    ${
                      isActive
                        ? `
                          border-cyan-400/40
                          bg-cyan-400/10
                          text-cyan-300
                        `
                        : `
                          border-white/10
                          bg-[#080D1D]
                          text-slate-400
                          hover:border-white/20
                          hover:text-white
                        `
                    }
                  `}
                >
                  {option.label}

                  <span
                    className={`
                      rounded-md px-1.5
                      py-0.5 text-[10px]
                      ${
                        isActive
                          ? "bg-cyan-400/15 text-cyan-300"
                          : "bg-white/5 text-slate-400"
                      }
                    `}
                  >
                    {filterCounts[option.value]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="
                inline-flex items-center gap-1.5
                text-xs font-medium text-cyan-300
                transition-colors
                hover:text-cyan-200
                sm:text-sm
              "
            >
              <CloseIcon />
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* =========================================
          RESULTS COUNT
      ========================================== */}
      <div
        className="
          mb-5 mt-8 flex flex-wrap
          items-center justify-between
          gap-3
        "
      >
        <div>
          <h2 className="text-lg font-bold text-white">
            {filter === "free"
              ? "Free Courses"
              : filter === "paid"
                ? "Paid Courses"
                : "All Courses"}
          </h2>

          <p
            role="status"
            aria-live="polite"
            className="mt-1 text-xs text-slate-400"
          >
            Showing {filteredItems.length} of {items.length} courses
          </p>
        </div>
      </div>

      {/* =========================================
          COURSE GRID
      ========================================== */}
      {filteredItems.length > 0 ? (
        <div
          className="
            grid grid-cols-1
            items-stretch gap-5
            sm:grid-cols-2 sm:gap-6
            lg:grid-cols-3
          "
        >
          {filteredItems.map(({ course, card }) => (
            <div key={course.id} className="h-full min-w-0">
              {card}
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div
          className="
            rounded-2xl border
            border-white/10
            bg-[#101A34]
            px-6 py-16
            text-center
          "
        >
          <div
            className="
              mx-auto flex h-16 w-16
              items-center justify-center
              rounded-2xl
              bg-cyan-400/10
              text-cyan-300
            "
          >
            <SearchIcon />
          </div>

          <h3 className="mt-5 text-xl font-bold text-white">
            No courses found
          </h3>

          <p
            className="
              mx-auto mt-3 max-w-md
              text-sm leading-7
              text-slate-400
            "
          >
            {items.length === 0
              ? "New courses will be available soon. Please check back later."
              : "We couldn't find any courses matching your search. Try a different keyword or change your filters."}
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="
                mt-6 inline-flex
                min-h-11 items-center
                justify-center
                rounded-xl bg-cyan-400
                px-5 py-3
                text-sm font-semibold
                text-[#061426]
                hover:bg-cyan-300
              "
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default CoursesCatalog;
