"use client";

import { useMemo, useState } from "react";

export type ReviewRating = 1 | 2 | 3 | 4 | 5;

export interface Review {
  id: string;
  name: string;
  course: string;
  rating: ReviewRating;
  title: string;
  comment: string;
  createdAt: string;
  dateLabel: string;
}

type ReviewsContentProps = {
  reviews: Review[];
};

type SortOption = "newest" | "highest" | "lowest";
type RatingFilter = ReviewRating | 0;

const PAGE_SIZE = 6;
const ratingLevels: ReviewRating[] = [5, 4, 3, 2, 1];

function Stars({
  rating,
  size = "normal",
}: {
  rating: number;
  size?: "small" | "normal" | "large";
}) {
  const sizes = {
    small: "h-4 w-4",
    normal: "h-5 w-5",
    large: "h-6 w-6",
  };

  return (
    <span
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className="inline-flex items-center gap-1"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`
            ${sizes[size]}
            ${index < Math.round(rating) ? "text-amber-400" : "text-slate-700"}
          `}
        >
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article
      className="
        flex h-full flex-col
        rounded-2xl border border-white/10
        bg-[#101A34] p-6
        transition-colors duration-200
        hover:border-cyan-400/30
        hover:bg-[#13203E]
        sm:p-7
      "
    >
      {/* Student information */}
      <div className="flex items-start gap-4">
        <div
          aria-hidden="true"
          className="
            flex h-12 w-12 shrink-0
            items-center justify-center
            rounded-full border
            border-cyan-400/20
            bg-gradient-to-br
            from-cyan-400/20 to-blue-600/20
            text-sm font-bold text-cyan-300
          "
        >
          {review.name.split(" ").at(-1)}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-white">{review.name}</h3>

          <p className="mt-1 text-xs text-slate-400">{review.course}</p>
        </div>

        <span
          className="
            shrink-0 rounded-full
            border border-cyan-400/20
            bg-cyan-400/10
            px-2.5 py-1
            text-[10px] font-semibold
            text-cyan-300
          "
        >
          Sample
        </span>
      </div>

      {/* Rating */}
      <div className="mt-6 flex items-center gap-3">
        <Stars rating={review.rating} />

        <span className="text-sm font-semibold text-white">
          {review.rating}.0
        </span>
      </div>

      {/* Review */}
      <h4 className="mt-5 text-lg font-bold text-white">{review.title}</h4>

      <p
        className="
          mt-3 flex-1 text-sm
          leading-8 text-slate-300
        "
      >
        &ldquo;{review.comment}&rdquo;
      </p>

      {/* Card footer */}
      <div
        className="
          mt-7 flex items-center
          justify-between gap-3
          border-t border-white/10
          pt-5
        "
      >
        <time dateTime={review.createdAt} className="text-xs text-slate-400">
          {review.dateLabel}
        </time>

        <span className="text-xs text-slate-500">Example feedback</span>
      </div>
    </article>
  );
}

function ReviewsContent({ reviews }: ReviewsContentProps) {
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>(0);

  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Calculate statistics once per reviews update
  const stats = useMemo(() => {
    const counts: Record<ReviewRating, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    let totalRating = 0;

    for (const review of reviews) {
      counts[review.rating] += 1;
      totalRating += review.rating;
    }

    const total = reviews.length;
    const average = total > 0 ? totalRating / total : 0;

    return {
      total,
      average,
      counts,
    };
  }, [reviews]);

  // Filter and sort without mutating original data
  const filteredReviews = useMemo(() => {
    const result = reviews.filter(
      (review) => ratingFilter === 0 || review.rating === ratingFilter,
    );

    result.sort((a, b) => {
      if (sortBy === "highest") {
        return b.rating - a.rating || b.createdAt.localeCompare(a.createdAt);
      }

      if (sortBy === "lowest") {
        return a.rating - b.rating || b.createdAt.localeCompare(a.createdAt);
      }

      return b.createdAt.localeCompare(a.createdAt);
    });

    return result;
  }, [reviews, ratingFilter, sortBy]);

  const visibleReviews = filteredReviews.slice(0, visibleCount);

  const hasMore = visibleCount < filteredReviews.length;

  const handleRatingFilter = (rating: RatingFilter) => {
    setRatingFilter(rating);
    setVisibleCount(PAGE_SIZE);
  };

  const handleSort = (value: SortOption) => {
    setSortBy(value);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div>
      {/* Ratings Summary */}
      <div
        className="
          grid gap-6 rounded-3xl
          border border-white/10
          bg-[#101A34] p-6
          sm:p-8
          lg:grid-cols-[0.8fr_1.2fr]
          lg:gap-10
        "
      >
        {/* Average rating */}
        <div
          className="
            flex flex-col items-center
            justify-center text-center
            lg:border-r lg:border-white/10
            lg:pr-8
          "
        >
          <p
            className="
              text-xs font-semibold
              uppercase tracking-[0.15em]
              text-cyan-300
            "
          >
            Average Sample Rating
          </p>

          <div className="mt-5 flex items-end gap-2">
            <span
              className="
                text-6xl font-extrabold
                tracking-tight text-white
                tabular-nums
                sm:text-7xl
              "
            >
              {stats.average.toFixed(1)}
            </span>

            <span className="mb-3 text-xl text-slate-400">/ 5</span>
          </div>

          <div className="mt-4">
            <Stars rating={stats.average} size="large" />
          </div>

          <p className="mt-4 text-sm text-slate-400">
            Based on {stats.total} sample{" "}
            {stats.total === 1 ? "rating" : "ratings"}
          </p>
        </div>

        {/* Rating Distribution */}
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white">Rating Breakdown</h3>

            <p className="mt-2 text-sm text-slate-400">
              Select a star rating to filter reviews.
            </p>
          </div>

          <div className="space-y-4">
            {ratingLevels.map((rating) => {
              const count = stats.counts[rating];

              const percentage =
                stats.total > 0 ? (count / stats.total) * 100 : 0;

              const selected = ratingFilter === rating;

              return (
                <button
                  key={rating}
                  type="button"
                  aria-label={`Show ${rating}-star reviews (${count})`}
                  aria-pressed={selected}
                  onClick={() => handleRatingFilter(selected ? 0 : rating)}
                  className={`
                    flex w-full items-center
                    gap-3 rounded-lg
                    px-2 py-1.5
                    transition-colors
                    hover:bg-white/5
                    focus-visible:outline-2
                    focus-visible:outline-cyan-400
                    ${selected ? "bg-cyan-400/10" : ""}
                  `}
                >
                  <span
                    className="
                      flex w-9 shrink-0
                      items-center gap-1
                      text-sm font-medium
                      text-slate-300
                    "
                  >
                    {rating}
                    <span className="text-amber-400">★</span>
                  </span>

                  <span
                    className="
                      h-2.5 flex-1 overflow-hidden
                      rounded-full bg-white/10
                    "
                  >
                    <span
                      className="
                        block h-full rounded-full
                        bg-gradient-to-r
                        from-cyan-500 to-cyan-300
                        transition-all duration-300
                      "
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </span>

                  <span
                    className="
                      w-7 shrink-0 text-right
                      text-sm text-slate-400
                      tabular-nums
                    "
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Review List Heading */}
      <div
        className="
          mt-14 flex flex-col
          justify-between gap-5
          sm:flex-row sm:items-end
        "
      >
        <div>
          <p
            className="
              text-xs font-semibold uppercase
              tracking-widest text-cyan-400
            "
          >
            Student Feedback
          </p>

          <h2
            className="
              mt-3 text-2xl font-bold
              tracking-tight text-white
              sm:text-3xl
            "
          >
            Reviews & Ratings
          </h2>

          <p aria-live="polite" className="mt-3 text-sm text-slate-400">
            Showing {filteredReviews.length} of {stats.total} sample reviews
          </p>
        </div>

        {/* Filter and Sort */}
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label
              htmlFor="rating-filter"
              className="
                mb-2 block text-xs
                font-medium text-slate-400
              "
            >
              Filter by Rating
            </label>

            <select
              id="rating-filter"
              value={ratingFilter}
              onChange={(event) =>
                handleRatingFilter(Number(event.target.value) as RatingFilter)
              }
              className="
                min-w-[140px] rounded-lg
                border border-white/10
                bg-[#101A34] px-4 py-3
                text-sm text-white
                outline-none
                focus:border-cyan-400
              "
            >
              <option value={0}>All Ratings</option>

              {ratingLevels.map((rating) => (
                <option key={rating} value={rating}>
                  {rating} Stars
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="review-sort"
              className="
                mb-2 block text-xs
                font-medium text-slate-400
              "
            >
              Sort Reviews
            </label>

            <select
              id="review-sort"
              value={sortBy}
              onChange={(event) => handleSort(event.target.value as SortOption)}
              className="
                min-w-[160px] rounded-lg
                border border-white/10
                bg-[#101A34] px-4 py-3
                text-sm text-white
                outline-none
                focus:border-cyan-400
              "
            >
              <option value="newest">Newest First</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Review Cards */}
      {visibleReviews.length > 0 ? (
        <div
          className="
            mt-8 grid items-stretch
            gap-6 lg:grid-cols-2
          "
        >
          {visibleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div
          className="
            mt-8 rounded-2xl
            border border-white/10
            bg-[#101A34] px-6 py-16
            text-center
          "
        >
          <h3 className="text-xl font-bold text-white">No Reviews Found</h3>

          <p className="mt-3 text-sm text-slate-400">
            There are no sample reviews matching the selected rating.
          </p>

          <button
            type="button"
            onClick={() => handleRatingFilter(0)}
            className="
              mt-6 rounded-lg
              border border-cyan-400/30
              bg-cyan-400/10
              px-5 py-3
              text-sm font-semibold
              text-cyan-300
              hover:bg-cyan-400/20
            "
          >
            Show All Reviews
          </button>
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="
              inline-flex items-center
              justify-center rounded-xl
              border border-cyan-400/30
              bg-cyan-400/10
              px-8 py-3.5
              text-sm font-semibold
              text-cyan-300
              transition-colors
              hover:border-cyan-400/50
              hover:bg-cyan-400/20
            "
          >
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
}

export default ReviewsContent;
