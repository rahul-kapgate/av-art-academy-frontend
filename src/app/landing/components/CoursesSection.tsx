import Link from "next/link";

import CourseCard from "@/src/features/courses/components/CourseCard";

import type { Course } from "@/src/features/courses/types";

import CoursesCarousel from "@/src/features/courses/components/CoursesCarousel";

interface CoursesSectionProps {
  courses : Course[];
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
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

function GraduationIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v7" />
      <path d="M2 10 12 5l10 5-10 5-10-5Z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function EmptyCourses() {
  return (
    <div
      className="
        mx-auto max-w-xl
        rounded-2xl border
        border-white/10
        bg-[#101A34]
        px-6 py-12
        text-center
      "
    >
      <div
        className="
          mx-auto flex h-14 w-14
          items-center justify-center
          rounded-2xl
          bg-cyan-400/10
          text-cyan-300
        "
      >
        <GraduationIcon />
      </div>

      <h3 className="mt-5 text-xl font-bold text-white">
        New courses coming soon
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-400">
        We are working on new learning experiences. Contact us to know more
        about upcoming courses and admissions.
      </p>

      <Link
        href="/contact"
        className="
          mt-6 inline-flex
          items-center gap-2
          rounded-xl bg-cyan-400
          px-5 py-3
          text-sm font-semibold
          text-[#061426]
          hover:bg-cyan-300
        "
      >
        Contact Us
        <ArrowIcon />
      </Link>
    </div>
  );
}

function CoursesSection({ courses  }: CoursesSectionProps) {
  return (
    <section
      id="courses"
      aria-labelledby="courses-heading"
      className="
        relative isolate overflow-hidden
        scroll-mt-24
        bg-[#080D1D]
        font-sans text-white
      "
    >
      {/* Decorative Background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-40 top-0
          h-[400px] w-[400px]
          rounded-full
          bg-blue-500/5
          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-40 bottom-0
          h-[450px] w-[450px]
          rounded-full
          bg-cyan-400/5
          blur-[140px]
        "
      />

      {/* Main Container */}
      <div
        className="
          relative mx-auto
          max-w-7xl px-4 py-16
          sm:px-8 sm:py-20
          lg:py-24
        "
      >
        {/* =========================================
            SECTION HEADER
        ========================================== */}
        <div
          className="
            mx-auto max-w-3xl
            text-center
          "
        >
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
            <GraduationIcon />
            Explore Our Courses
          </div>

          {/* Section Heading */}
          <h2
            id="courses-heading"
            className="
              mt-6 text-3xl
              font-extrabold
              leading-[1.15]
              tracking-[-0.04em]
              sm:text-4xl
              lg:text-5xl
            "
          >
            Start Your{" "}
            <span
              className="
                bg-linear-to-r
                from-cyan-300
                via-cyan-400
                to-blue-400
                bg-clip-text
                text-transparent
              "
            >
              Creative Journey.
            </span>
          </h2>

          {/* Section Description */}
          <p
            className="
              mx-auto mt-5
              max-w-2xl
              text-sm leading-7
              text-slate-400
              sm:text-base
              sm:leading-8
            "
          >
            Explore structured art courses designed to build your drawing and
            design skills, strengthen your fundamentals and prepare you for MAH
            AAC CET with confidence.
          </p>
        </div>

        {/* =========================================
            COURSE LIST HEADER
        ========================================== */}
        {courses.length > 0 && (
          <div
            className="
              mt-10 mb-6 flex
              flex-wrap items-center
              justify-between gap-3
              border-b border-white/10
              pb-4 sm:mt-12
            "
          >
            <div>
              <h3 className="text-base font-bold text-white sm:text-lg">
                Available Courses
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                {courses.length} {courses.length === 1 ? "course" : "courses"}{" "}
                to explore
              </p>
            </div>

            <div
              className="
                flex items-center gap-2
                rounded-lg border
                border-white/10
                bg-white/5
                px-3 py-2
                text-[11px] font-medium
                text-slate-300
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-1.5 w-1.5
                  rounded-full
                  bg-emerald-400
                "
              />
              Online Learning
            </div>
          </div>
        )}

        {/* =========================================
    COURSE CAROUSEL
========================================== */}
        {courses.length > 0 ? (
          <CoursesCarousel>
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="
          h-full min-w-0
          snap-start
        "
              >
                <CourseCard course={course} index={index} />
              </div>
            ))}
          </CoursesCarousel>
        ) : (
          <div className="mt-12">
            <EmptyCourses />
          </div>
        )}

        {/* =========================================
            COURSE GUIDANCE CTA
        ========================================== */}
        <div
          className="
            relative mt-12
            overflow-hidden rounded-2xl
            border border-cyan-400/15
            bg-linear-to-r
            from-[#101A34]
            to-[#13234A]
            p-6 sm:p-8
          "
        >
          {/* Decorative Glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -right-16 -top-20
              h-48 w-48 rounded-full
              bg-cyan-400/10
              blur-[65px]
            "
          />

          <div
            className="
              relative flex flex-col
              gap-5 sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <p className="text-lg font-bold text-white">
                Not sure which course to choose?
              </p>

              <p
                className="
                  mt-2 max-w-xl
                  text-sm leading-6
                  text-slate-400
                "
              >
                Let us help you find the right course based on your artistic
                skills and MAH AAC CET preparation goals.
              </p>
            </div>

            <Link
              href="/contact"
              className="
                inline-flex min-h-11
                shrink-0 items-center
                justify-center gap-2
                self-start rounded-xl
                border border-cyan-400/30
                bg-cyan-400/10
                px-5 py-3
                text-sm font-semibold
                text-cyan-300
                transition-colors
                hover:border-cyan-400/60
                hover:bg-cyan-400/20
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-cyan-400
                sm:self-auto
              "
            >
              Get Course Guidance
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoursesSection;
