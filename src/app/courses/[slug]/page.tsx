
import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import { notFound } from "next/navigation";

import Header from "@/src/app/landing/components/Header";
import Footer from "@/src/app/landing/components/Footer";

import CourseEnrollmentAction from "@/src/features/courses/components/CourseEnrollmentAction";

import { getCourseBySlug } from "@/src/features/courses/api/getCourseBySlug";

import { getCoursePricing } from "@/src/features/courses/utils/coursePricing";

import { getCourseImageUrl } from "@/src/features/courses/utils/courseMedia";

import type {
  CourseAccess,
  CourseDetails,
} from "@/src/features/courses/types";

/* =========================================
   PAGE PROPS
========================================== */

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* =========================================
   DYNAMIC SEO METADATA
========================================== */

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;

  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath =
    `/courses/${encodeURIComponent(course.slug)}`;

  const image =
    getCourseImageUrl(
      course.media.bannerPath,
    ) ??
    getCourseImageUrl(
      course.media.thumbnailPath,
    );

  return {
    title: course.title,

    description: course.shortDescription,

    alternates: {
      canonical: canonicalPath,
    },

    openGraph: {
      type: "website",

      title: course.title,

      description:
        course.shortDescription,

      url: canonicalPath,

      siteName: "AV Art Academy",

      ...(image
        ? {
            images: [
              {
                url: image,
                alt: course.title,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",

      title: course.title,

      description:
        course.shortDescription,

      ...(image
        ? { images: [image] }
        : {}),
    },
  };
}

/* =========================================
   FORMAT COURSE DURATION
========================================== */

function formatDuration(
  minutes: number | null,
): string | null {
  if (
    minutes === null ||
    !Number.isFinite(minutes) ||
    minutes <= 0
  ) {
    return null;
  }

  const hours = Math.floor(minutes / 60);

  const remainingMinutes =
    Math.floor(minutes % 60);

  if (hours === 0) {
    return `${remainingMinutes} min`;
  }

  return remainingMinutes > 0
    ? `${hours}h ${remainingMinutes}m`
    : `${hours} hours`;
}

/* =========================================
   FORMAT COURSE ACCESS
========================================== */

function formatAccess(
  access: CourseAccess,
): string {
  if (access.type === "lifetime") {
    return "Lifetime access";
  }

  if (access.durationDays && access.durationDays > 0) {
    return `${access.durationDays} days access`;
  }

  if (access.endAt) {
    const date = new Date(access.endAt);

    if (!Number.isNaN(date.getTime())) {
      return `Access until ${date.toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
          timeZone: "Asia/Kolkata",
        },
      )}`;
    }
  }

  return "Access as per course terms";
}

/* =========================================
   COMMON ICONS
========================================== */

function CheckIcon() {
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
      className="shrink-0"
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
      width="18"
      height="18"
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

function BookIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 7c-3-3-6-3-9-2v14c3-1 6-1 9 2 3-3 6-3 9-2V5c-3-1-6-1-9 2Z" />
      <path d="M12 7v14" />
    </svg>
  );
}

function LanguageIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z" />
    </svg>
  );
}

/* =========================================
   COURSE INFORMATION CARD
========================================== */

function CourseInfoCard({
  course,
}: {
  course: CourseDetails;
}) {
  const pricing =
    getCoursePricing(course.pricing);

  const duration = formatDuration(
    course.estimatedDurationMinutes,
  );

  const access = formatAccess(course.access);

  const imageSrc =
    getCourseImageUrl(
      course.media.bannerPath,
    ) ??
    getCourseImageUrl(
      course.media.thumbnailPath,
    );

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl border border-white/10
        bg-[#101A34]
        shadow-xl shadow-black/20
      "
    >
      {/* =====================================
          COURSE IMAGE
      ====================================== */}

      <div className="relative aspect-[16/10] overflow-hidden bg-[#10194F]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={course.title}
            fill
            sizes="(max-width: 1023px) 100vw, 380px"
            className="object-contain"
          />
        ) : (
          <div
            className="
              flex h-full flex-col
              items-center justify-center
              bg-gradient-to-br
              from-[#172554]
              via-[#1A237E]
              to-[#164E63]
              p-6 text-center
            "
          >
            <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-2xl bg-white">
              <Image
                src="/logo.jpeg"
                alt="AV Art Academy"
                fill
                sizes="64px"
                className="object-contain"
              />
            </div>

            <p className="text-lg font-bold text-white">
              {course.title}
            </p>

            <p className="mt-2 text-xs uppercase tracking-widest text-cyan-200">
              AV Art Academy
            </p>
          </div>
        )}

        {pricing.isFree && (
          <span
            className="
              absolute left-3 top-3
              rounded-full bg-emerald-500
              px-3 py-1.5
              text-xs font-bold text-white
            "
          >
            Free Course
          </span>
        )}

        {pricing.hasDiscount && (
          <span
            className="
              absolute right-3 top-3
              rounded-full bg-amber-400
              px-3 py-1.5
              text-xs font-bold
              text-[#1C1917]
            "
          >
            {pricing.discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* =====================================
          PRICING
      ====================================== */}

      <div className="p-5 sm:p-6">
        <p className="text-xs font-medium text-slate-400">
          Course price
        </p>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span
            className="
              text-3xl font-extrabold
              tracking-tight text-white
            "
          >
            {pricing.displayPrice}
          </span>

          {pricing.hasDiscount && (
            <span className="text-base text-slate-400 line-through">
              {pricing.originalPrice}
            </span>
          )}
        </div>

        {pricing.hasDiscount && (
          <p className="mt-2 text-xs font-semibold text-emerald-400">
            Save {pricing.displaySavings} on this course
          </p>
        )}

        {/* Authentication / Enrollment */}
        <div className="mt-5">
          <CourseEnrollmentAction
            isFree={pricing.isFree}
          />
        </div>

        <p className="mt-3 text-center text-xs leading-5 text-slate-400">
          {access}
        </p>

        {/* ===================================
            COURSE FEATURES
        ==================================== */}

        <div className="mt-6 border-t border-white/10 pt-5">
          <h2 className="text-sm font-bold text-white">
            Course information
          </h2>

          <dl className="mt-4 space-y-4 text-sm">

            {course.language && (
              <div className="flex items-center justify-between gap-3">
                <dt className="flex items-center gap-2 text-slate-400">
                  <span className="text-cyan-300">
                    <LanguageIcon />
                  </span>
                  Language
                </dt>

                <dd className="text-right font-medium text-slate-200">
                  {course.language}
                </dd>
              </div>
            )}

            {duration && (
              <div className="flex items-center justify-between gap-3">
                <dt className="flex items-center gap-2 text-slate-400">
                  <span className="text-cyan-300">
                    <ClockIcon />
                  </span>
                  Duration
                </dt>

                <dd className="text-right font-medium text-slate-200">
                  {duration}
                </dd>
              </div>
            )}

            {course.level && (
              <div className="flex items-center justify-between gap-3">
                <dt className="flex items-center gap-2 text-slate-400">
                  <span className="text-cyan-300">
                    <BookIcon />
                  </span>
                  Level
                </dt>

                <dd className="text-right font-medium text-slate-200">
                  {course.level}
                </dd>
              </div>
            )}

            <div className="flex items-center justify-between gap-3">
              <dt className="flex items-center gap-2 text-slate-400">
                <span className="text-cyan-300">
                  <CheckIcon />
                </span>
                Access
              </dt>

              <dd className="max-w-[55%] text-right font-medium text-slate-200">
                {access}
              </dd>
            </div>

            {course.liveClassesAvailable && (
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-400">
                  Live classes
                </dt>

                <dd className="font-semibold text-emerald-400">
                  Available
                </dd>
              </div>
            )}

            {course.certificateAvailable && (
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-400">
                  Certificate
                </dt>

                <dd className="font-semibold text-emerald-400">
                  Available
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Course help */}
        <div className="mt-6 border-t border-white/10 pt-5 text-center">
          <p className="text-xs text-slate-400">
            Have questions about this course?
          </p>

          <Link
            href="/contact"
            className="
              mt-2 inline-block
              text-sm font-semibold
              text-cyan-300
              hover:text-cyan-200
            "
          >
            Talk to our team
          </Link>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   COURSE CONTENT SECTION
========================================== */

function CourseContentSection({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: string[];
}) {
  if (!items?.length) {
    return null;
  }

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="
        scroll-mt-24
        rounded-2xl border border-white/10
        bg-[#101A34] p-5 sm:p-7
      "
    >
      <h2
        id={`${id}-title`}
        className="
          text-xl font-bold
          tracking-tight text-white
          sm:text-2xl
        "
      >
        {title}
      </h2>

      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {items.map((item, index) => (
          <li
            key={`${index}-${item}`}
            className="
              flex min-w-0 items-start gap-3
              rounded-xl border border-white/5
              bg-[#080D1D]/60
              p-4
            "
          >
            <span className="mt-0.5 shrink-0 text-cyan-300">
              <CheckIcon />
            </span>

            <span className="text-sm leading-6 text-slate-300">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* =========================================
   MAIN COURSE DETAILS PAGE
========================================== */

export default async function CourseDetailsPage({
  params,
}: CoursePageProps) {
  const { slug } = await params;

  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const duration = formatDuration(
    course.estimatedDurationMinutes,
  );

  return (
    <>
      <Header />

      <main
        id="main-content"
        className="min-h-screen bg-[#080D1D]"
      >
        {/* ===================================
            COURSE HERO
        ==================================== */}

        <section
          className="
            relative isolate overflow-hidden
            border-b border-white/10
            bg-gradient-to-br
            from-[#080D27]
            via-[#10194F]
            to-[#1A237E]
          "
        >
          {/* Background glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -right-32 -top-40
              h-96 w-96 rounded-full
              bg-cyan-500/10 blur-3xl
            "
          />

          <div
            className="
              relative mx-auto max-w-7xl
              px-4 py-8
              sm:px-6 sm:py-10
              lg:px-8 lg:py-12
            "
          >
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="
                mb-7 flex flex-wrap
                items-center gap-2
                text-xs text-slate-400
              "
            >
              <Link
                href="/"
                className="hover:text-cyan-300"
              >
                Home
              </Link>

              <span aria-hidden="true">/</span>

              <Link
                href="/courses"
                className="hover:text-cyan-300"
              >
                Courses
              </Link>

              <span aria-hidden="true">/</span>

              <span
                aria-current="page"
                className="text-cyan-300"
              >
                Course Details
              </span>
            </nav>

            <div className="max-w-4xl">
              {/* Category / Level */}
              <div className="flex flex-wrap items-center gap-2">
                {course.category && (
                  <span
                    className="
                      rounded-full
                      border border-cyan-400/25
                      bg-cyan-400/10
                      px-3 py-1.5
                      text-xs font-semibold
                      text-cyan-300
                    "
                  >
                    {course.category}
                  </span>
                )}

                {course.level && (
                  <span
                    className="
                      rounded-full border
                      border-white/10
                      bg-white/5
                      px-3 py-1.5
                      text-xs text-slate-300
                    "
                  >
                    {course.level}
                  </span>
                )}
              </div>

              {/* Course title */}
              <h1
                className="
                  mt-5
                  text-3xl font-extrabold
                  leading-tight tracking-tight
                  text-white
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                {course.title}
              </h1>

              {course.subtitle && (
                <p
                  className="
                    mt-3 text-base font-medium
                    leading-7 text-cyan-300
                    sm:text-lg
                  "
                >
                  {course.subtitle}
                </p>
              )}

              <p
                className="
                  mt-4 max-w-3xl
                  text-sm leading-7
                  text-slate-300
                  sm:text-base
                "
              >
                {course.shortDescription}
              </p>

              {/* Course metadata */}
              <div
                className="
                  mt-6 flex flex-wrap
                  items-center gap-x-6 gap-y-3
                  text-xs text-slate-200
                  sm:text-sm
                "
              >
                {course.language && (
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-300">
                      <LanguageIcon />
                    </span>

                    {course.language}
                  </div>
                )}

                {duration && (
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-300">
                      <ClockIcon />
                    </span>

                    {duration}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <span className="text-cyan-300">
                    <CheckIcon />
                  </span>

                  {formatAccess(course.access)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================
            MAIN COURSE CONTENT
        ==================================== */}

        <div
          className="
            mx-auto grid max-w-7xl
            grid-cols-1 items-start gap-6
            px-4 py-8
            sm:px-6 sm:py-10
            lg:grid-cols-[minmax(0,1fr)_360px]
            lg:gap-8 lg:px-8
            xl:grid-cols-[minmax(0,1fr)_380px]
          "
        >
          {/* =================================
              ENROLLMENT CARD

              Mobile: appears first.
              Desktop: sticky right sidebar.
          ================================== */}

          <aside
            aria-label="Course pricing and enrollment"
            className="
              min-w-0
              lg:sticky lg:top-24
              lg:order-2
            "
          >
            <CourseInfoCard course={course} />
          </aside>

          {/* =================================
              COURSE DETAILS
          ================================== */}

          <div className="min-w-0 space-y-6 lg:order-1">

            {/* About course */}
            <section
              aria-labelledby="about-course-title"
              className="
                rounded-2xl border
                border-white/10
                bg-[#101A34]
                p-5 sm:p-7
              "
            >
              <h2
                id="about-course-title"
                className="
                  text-xl font-bold
                  tracking-tight text-white
                  sm:text-2xl
                "
              >
                About this course
              </h2>

              <p
                className="
                  mt-4 whitespace-pre-line
                  break-words text-sm
                  leading-7 text-slate-300
                  sm:text-base sm:leading-8
                "
              >
                {course.description ||
                  course.shortDescription}
              </p>
            </section>

            {/* Learning outcomes */}
            <CourseContentSection
              id="what-you-will-learn"
              title="What you'll learn"
              items={course.whatYouWillLearn}
            />

            {/* Course inclusions */}
            <CourseContentSection
              id="course-includes"
              title="This course includes"
              items={course.courseIncludes}
            />

            {/* Course highlights */}
            <CourseContentSection
              id="course-highlights"
              title="Course highlights"
              items={course.courseHighlights}
            />

            {/* =================================
                COURSE SUPPORT CTA
            ================================== */}

            <section
              className="
                overflow-hidden
                rounded-2xl border
                border-cyan-400/15
                bg-gradient-to-br
                from-[#101A34]
                to-[#132C47]
                p-5 sm:p-7
              "
            >
              <h2 className="text-xl font-bold text-white">
                Ready to start your creative journey?
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                Need help choosing the right course?
                Our team can guide you based on your
                learning goals and exam preparation
                requirements.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="
                    inline-flex min-h-11
                    items-center justify-center
                    rounded-xl bg-cyan-400
                    px-5 py-3 text-sm font-bold
                    text-[#061426]
                    hover:bg-cyan-300
                  "
                >
                  Contact Us
                </Link>

                <Link
                  href="/courses"
                  className="
                    inline-flex min-h-11
                    items-center justify-center
                    rounded-xl border
                    border-white/15
                    px-5 py-3
                    text-sm font-semibold
                    text-slate-200
                    hover:bg-white/5
                  "
                >
                  Explore Other Courses
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
