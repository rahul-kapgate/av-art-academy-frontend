import Image from "next/image";
import Link from "next/link";

import type { Course } from "../types";

interface CourseCardProps {
  course: Course;
  index?: number;
  thumbnailSrc?: string | null;
}

const thumbnailThemes = [
  "from-[#172554] via-[#1E3A8A] to-[#0E7490]",
  "from-[#312E81] via-[#4338CA] to-[#1E40AF]",
  "from-[#4C1D95] via-[#7E22CE] to-[#BE185D]",
  "from-[#164E63] via-[#0E7490] to-[#155E75]",
  "from-[#78350F] via-[#92400E] to-[#713F12]",
  "from-[#064E3B] via-[#047857] to-[#115E59]",
];

function formatDuration(minutes: number | null): string | null {
  if (minutes === null || !Number.isFinite(minutes) || minutes <= 0) {
    return null;
  }

  const totalMinutes = Math.floor(minutes);

  const hours = Math.floor(totalMinutes / 60);

  const remainingMinutes = totalMinutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} min`;
  }

  if (remainingMinutes === 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function ArtworkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      fill="none"
      className="h-16 w-16 sm:h-20 sm:w-20"
    >
      <rect
        x="18"
        y="12"
        width="76"
        height="92"
        rx="7"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.45"
      />

      <path
        d="
          M32 35 L60 24 L86 40
          L60 53 Z
          M32 35 V65 L60 81
          L86 65 V40
          M60 53 V81
        "
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="M34 89H77M34 95H66"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />

      <path
        d="M87 92L107 31L113 33L93 94L84 101Z"
        fill="currentColor"
        opacity="0.85"
      />

      <path d="M104 37L110 39" stroke="#FFFFFF" strokeWidth="2" />
    </svg>
  );
}

function CourseCard({ course, index = 0, thumbnailSrc }: CourseCardProps) {
  const {
    title,
    slug,
    shortDescription,
    thumbnailUrl,
    estimatedDurationMinutes,
    pricing,
    courseIncludes,
  } = course;

  const { isFree, priceAmount, salePriceAmount, currency } = pricing;

  /* =========================================
     COURSE IMAGE
  ========================================== */

  const imageSrc = thumbnailSrc ?? thumbnailUrl;

  /* =========================================
     COURSE DURATION
  ========================================== */

  const duration = formatDuration(estimatedDurationMinutes);

  /* =========================================
     COURSE PRICING
  ========================================== */

  const discountedPrice =
    !isFree &&
    priceAmount > 0 &&
    salePriceAmount !== null &&
    salePriceAmount >= 0 &&
    salePriceAmount < priceAmount
      ? salePriceAmount
      : null;

  const hasDiscount = discountedPrice !== null;

  const finalPrice = discountedPrice ?? priceAmount;

  const discountPercentage = hasDiscount
    ? Math.round(((priceAmount - finalPrice) / priceAmount) * 100)
    : 0;

  /* =========================================
     COURSE UI
  ========================================== */

  const theme = thumbnailThemes[index % thumbnailThemes.length];

  const courseUrl = `/courses/${encodeURIComponent(slug)}`;

  const visibleFeatures = courseIncludes.slice(0, 4);

  const remainingFeatures = Math.max(
    0,
    courseIncludes.length - visibleFeatures.length,
  );

  return (
    <article
      className="
        group flex h-full min-w-0
        flex-col overflow-hidden
        rounded-2xl
        border border-white/10
        bg-[#101A34]
        shadow-lg shadow-black/10
        transition-[border-color,transform]
        duration-300
        hover:border-cyan-400/35
        motion-safe:hover:-translate-y-1
      "
    >
      {/* =========================================
          COMPACT COURSE THUMBNAIL
      ========================================== */}
      <div
        className="
          relative h-36
          shrink-0 overflow-hidden
          bg-[#0A1434]
          sm:h-40
        "
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            unoptimized
            loading="lazy"
            className="
      object-cover
      transition-transform duration-500
      motion-safe:group-hover:scale-105
    "
          />
        ) : (
          <div
            aria-hidden="true"
            className={`
      absolute inset-0
      flex items-center justify-between
      overflow-hidden
      bg-linear-to-br
      ${theme}
      px-4 pt-8 pb-7
    `}
          >
            {/* Background Grid */}
            <div
              className="
        absolute inset-0
        bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]
        bg-size-[24px_24px]
      "
            />

            {/* Decorative Ring */}
            <div
              className="
        absolute -bottom-24
        -right-12 h-52 w-52
        rounded-full
        border border-white/10
      "
            />

            {/* Course Branding */}
            <div className="relative z-10 min-w-0 max-w-[65%]">
              <p
                className="
          text-[9px] font-semibold
          uppercase tracking-[0.15em]
          text-white/70
        "
              >
                AV Art Academy
              </p>

              <p
                className="
          mt-1.5 line-clamp-3
          text-base font-extrabold
          leading-tight
          tracking-tight text-white
          sm:text-lg
        "
              >
                {title}
              </p>
            </div>

            {/* Artwork Illustration */}
            <div className="relative z-10 shrink-0 text-white/65">
              <ArtworkIcon />
            </div>
          </div>
        )}

        {/* Bottom Gradient */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            inset-x-0 bottom-0 h-12
            bg-linear-to-t
            from-black/40 to-transparent
          "
        />

        {/* Free / Discount Badge */}
        {isFree ? (
          <span
            className="
              absolute left-3 top-3 z-20
              rounded-md bg-emerald-500
              px-2 py-1
              text-[10px] font-bold
              uppercase text-white
            "
          >
            Free Course
          </span>
        ) : discountPercentage > 0 ? (
          <span
            className="
              absolute left-3 top-3 z-20
              rounded-md bg-cyan-400
              px-2 py-1
              text-[10px] font-bold
              text-[#061426]
            "
          >
            {discountPercentage}% OFF
          </span>
        ) : null}

        {/* Course Duration */}

        {duration && (
          <div
            className="
      absolute bottom-2.5 right-3
      z-20 flex items-center gap-1.5
      rounded-md
      bg-[#050816]/85
      px-2 py-1
      text-[10px] font-medium
      text-white
    "
          >
            <ClockIcon />

            {duration}
          </div>
        )}
      </div>

      {/* =========================================
          COMPACT COURSE CONTENT
      ========================================== */}
      <div className="flex flex-1 flex-col p-4">
        {/* Course Title */}
        <h3
          className="
            line-clamp-2
            text-base font-bold
            leading-snug
            tracking-tight text-white
            sm:text-lg
          "
        >
          <Link
            href={courseUrl}
            className="
              transition-colors
              hover:text-cyan-300
              focus-visible:outline-2
              focus-visible:outline-cyan-400
            "
          >
            {title}
          </Link>
        </h3>

        {/* Short Description */}
        <p
          className="
            mt-2 line-clamp-2
            text-xs leading-5
            text-slate-400
            sm:text-[13px]
          "
        >
          {shortDescription}
        </p>

        {/* =========================================
            COURSE INCLUDES - TWO COLUMNS
        ========================================== */}
        {courseIncludes.length > 0 && (
          <div className="mt-3 border-t border-white/10 pt-3">
            <p className="text-xs font-semibold text-slate-200">
              This course includes:
            </p>

            <ul className="mt-2 grid grid-cols-2 gap-x-2 gap-y-2">
              {visibleFeatures.map((feature, featureIndex) => (
                <li
                  key={`${feature}-${featureIndex}`}
                  className="
                      flex min-w-0
                      items-start gap-1.5
                      text-[11px] leading-4
                      text-slate-300
                    "
                >
                  <span className="mt-px shrink-0 text-cyan-400">
                    <CheckIcon />
                  </span>

                  <span className="min-w-0 wrap-break-word">{feature}</span>
                </li>
              ))}
            </ul>

            {remainingFeatures > 0 && (
              <p className="mt-2 text-[11px] font-medium text-cyan-300">
                +{remainingFeatures} more
              </p>
            )}
          </div>
        )}

        {/* =========================================
            PRICING AND CTA
        ========================================== */}
        <div className="mt-auto pt-4">
          <div className="border-t border-white/10 pt-3">
            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              {isFree ? (
                <p className="text-2xl font-extrabold text-emerald-400">Free</p>
              ) : (
                <>
                  <p
                    className="
                      text-2xl font-extrabold
                      tracking-tight text-white
                    "
                  >
                    {formatPrice(finalPrice, currency)}
                  </p>

                  {hasDiscount && (
                    <p
                      className="
                        text-xs text-slate-400
                        line-through
                      "
                    >
                      {formatPrice(priceAmount, currency)}
                    </p>
                  )}
                </>
              )}

              {hasDiscount && (
                <span
                  className="
                    ml-auto rounded-md
                    bg-emerald-400/10
                    px-2 py-1
                    text-[10px] font-semibold
                    text-emerald-300
                  "
                >
                  Save {formatPrice(priceAmount - finalPrice, currency)}
                </span>
              )}
            </div>

            {/* View Course Button */}
            <Link
              href={courseUrl}
              aria-label={`View course: ${title}`}
              className="
                group/button mt-3
                inline-flex min-h-10
                w-full items-center
                justify-center gap-2
                rounded-lg
                bg-cyan-400
                px-4 py-2.5
                text-xs font-bold
                text-[#061426]
                transition-colors
                hover:bg-cyan-300
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-cyan-400
                sm:text-sm
              "
            >
              View Course
              <span
                className="
                  transition-transform
                  motion-safe:group-hover/button:translate-x-1
                "
              >
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default CourseCard;
