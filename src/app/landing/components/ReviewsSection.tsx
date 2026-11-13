import CoursesCarousel from "@/src/features/courses/components/CoursesCarousel";

import {
  landingMockReviews,
  type LandingReview,
} from "@/src/features/reviews/data/landingMockReviews";

interface ReviewsSectionProps {
  reviews?: readonly LandingReview[];
  isDemo?: boolean;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={filled ? "text-amber-400" : "text-slate-600"}
    >
      <path
        d="
          m12 3 2.8 5.7
          6.3.9-4.5 4.4
          1 6.3-5.6-3
          -5.6 3 1.1-6.3
          L3 9.6l6.3-.9L12 3Z
        "
      />
    </svg>
  );
}

function StarRating({ rating }: { rating: LandingReview["rating"] }) {
  return (
    <div
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className="flex items-center gap-1"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon key={star} filled={star <= rating} />
      ))}
    </div>
  );
}

function QuoteIcon() {
  return (
    <svg
      aria-hidden="true"
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M3 21c3 0 7-2 7-8V5H2v8h4c0 3-1 5-4 6l1 2Zm12 0c3 0 7-2 7-8V5h-8v8h4c0 3-1 5-4 6l1 2Z" />
    </svg>
  );
}

function MessageIcon() {
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
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
    </svg>
  );
}

/* =========================================
   REUSABLE REVIEW CARD
========================================== */

function ReviewCard({ review }: { review: LandingReview }) {
  return (
    <article
      className="
        group relative
        flex h-full min-w-0 flex-col
        overflow-hidden
        rounded-2xl
        border border-white/10
        bg-[#101A34]
        p-5
        shadow-lg shadow-black/10
        transition-[border-color,transform]
        duration-300
        hover:border-cyan-400/30
        motion-safe:hover:-translate-y-1
        sm:p-6
      "
    >
      {/* =========================================
          RATING & QUOTE
      ========================================== */}
      <div className="flex items-center justify-between gap-3">
        <StarRating rating={review.rating} />

        <span
          className="
            shrink-0 text-cyan-400/30
            transition-colors
            group-hover:text-cyan-400/60
          "
        >
          <QuoteIcon />
        </span>
      </div>

      {/* =========================================
          REVIEW CONTENT
      ========================================== */}
      <blockquote
        className="
          mt-4 flex-1
          text-sm leading-7
          text-slate-300
        "
      >
        <p>&ldquo;{review.comment}&rdquo;</p>
      </blockquote>

      {/* =========================================
          STUDENT INFORMATION
      ========================================== */}
      <div
        className="
          mt-6 flex items-center gap-3
          border-t border-white/10
          pt-4
        "
      >
        {/* Student Avatar */}
        <div
          aria-hidden="true"
          className={`
            flex h-11 w-11
            shrink-0 items-center
            justify-center
            rounded-full
            text-sm font-bold
            ${review.avatarColor}
          `}
        >
          {review.initials}
        </div>

        {/* Student Name & Course */}
        <div className="min-w-0">
          <h3
            className="
              text-sm font-semibold
              leading-5 text-white
            "
          >
            {review.name}
          </h3>

          <p
            className="
              mt-1 text-[11px]
              leading-[1.6]
              text-slate-400
              sm:text-xs
            "
          >
            {review.course}
          </p>
        </div>
      </div>
    </article>
  );
}

/* =========================================
   STUDENT REVIEWS SECTION
========================================== */

function ReviewsSection({
  reviews = landingMockReviews,
  isDemo = true,
}: ReviewsSectionProps) {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="
        relative isolate overflow-hidden
        scroll-mt-24
        border-t border-white/5
        bg-[#080D1D]
        font-sans text-white
      "
    >
      {/* Background Gradient */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-linear-to-br
          from-[#080D1D]
          via-[#0C142B]
          to-[#101A34]
        "
      />

      {/* Decorative Background Glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-40 top-1/4
          h-[400px] w-[400px]
          rounded-full bg-blue-500/5
          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-40 bottom-0
          h-[400px] w-[400px]
          rounded-full bg-cyan-400/5
          blur-[120px]
        "
      />

      {/* Main Container */}
      <div
        className="
          relative mx-auto
          max-w-7xl
          px-4 py-14
          sm:px-8 sm:py-16
          lg:py-20
        "
      >
        {/* =========================================
            SECTION HEADER
        ========================================== */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Section Label */}
          <div
            className="
              inline-flex items-center
              gap-2 rounded-full
              border border-cyan-400/20
              bg-cyan-400/5
              px-4 py-2
              text-[11px] font-semibold
              uppercase tracking-[0.12em]
              text-cyan-300
            "
          >
            <MessageIcon />
            Student Reviews
          </div>

          {/* Main Heading */}
          <h2
            id="reviews-heading"
            className="
              mt-5 text-3xl
              font-extrabold
              leading-[1.15]
              tracking-[-0.04em]
              sm:text-4xl
              lg:text-5xl
            "
          >
            What Our{" "}
            <span
              className="
                bg-linear-to-r
                from-cyan-300
                via-cyan-400
                to-blue-400
                bg-clip-text text-transparent
              "
            >
              Students Say.
            </span>
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto mt-4
              max-w-2xl
              text-sm leading-7
              text-slate-400
              sm:text-base
            "
          >
            Discover the learning experiences of our creative community and how
            AV Art Academy helps students develop their artistic skills and
            prepare for MAH AAC CET.
          </p>
        </div>

        {/* =========================================
            REVIEWS CAROUSEL
        ========================================== */}
        {reviews.length > 0 ? (
          <div className="mt-8 sm:mt-10">
            {/* Sample Data Notice */}
            {isDemo && (
              <p
                className="
                  mb-4 text-center
                  text-xs text-amber-300/80
                "
              >
                Sample student reviews for design preview.
              </p>
            )}

            {/* Reuse Existing Carousel */}
            <CoursesCarousel
              itemLabel="review"
              regionLabel="Student reviews carousel"
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="
                    h-full min-w-0
                    snap-start
                  "
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </CoursesCarousel>
          </div>
        ) : (
          /* =========================================
             EMPTY STATE
          ========================================== */
          <div
            className="
              mx-auto mt-10
              max-w-lg rounded-2xl
              border border-white/10
              bg-[#101A34]
              px-6 py-10
              text-center
            "
          >
            <div
              className="
                mx-auto flex h-12 w-12
                items-center justify-center
                rounded-xl bg-cyan-400/10
                text-cyan-300
              "
            >
              <MessageIcon />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-white">
              Student reviews coming soon
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Check back later to discover feedback from our students.
            </p>
          </div>
        )}

        {/* =========================================
            BOTTOM BRAND MESSAGE
        ========================================== */}
        <div className="mt-8 text-center">
          <p
            className="
              text-xs font-medium
              uppercase tracking-[0.15em]
              text-cyan-300/70
            "
          >
            Learn. Practice. Grow Together.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
