import type { Metadata } from "next";
import Link from "next/link";

import Header from "../landing/components/Header";
import Footer from "../landing/components/Footer";

import CourseCard from "@/src/features/courses/components/CourseCard";
import CoursesCatalog from "@/src/features/courses/components/CoursesCatalog";
import { getCourses } from "@/src/features/courses/api/getCourses";

const description =
  "Explore MAH AAC CET preparation courses, perspective drawing, memory drawing, object drawing, 2D design, colour theory and art entrance exam preparation at AV Art Academy.";

const isMockData = process.env.COURSES_DATA_SOURCE !== "api";

export const metadata: Metadata = {
  title: "Online Art Courses & MAH AAC CET Preparation",

  description,

  alternates: {
    canonical: "/courses",
  },

  openGraph: {
    title: "Explore Art Courses | AV Art Academy",
    description,
    url: "/courses",
    type: "website",
    siteName: "AV Art Academy",
    locale: "en_IN",
  },

  twitter: {
    card: "summary",
    title: "Explore Art Courses | AV Art Academy",
    description,
  },

  // Do not index dummy course prices or content.
  robots: {
    index: !isMockData,
    follow: true,
  },
};

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

function ChevronRightIcon() {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function GraduationIcon() {
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
      <path d="M22 10v7" />
      <path d="M2 10 12 5l10 5-10 5-10-5Z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

export default async function CoursesPage() {
  const courses = await getCourses();

  const catalogItems = courses.map((course, index) => ({
    course,

    // Reuse the same server-rendered course card.
    card: <CourseCard course={course} index={index} />,
  }));

  return (
    <>
      <Header />

      <main
        id="main-content"
        className="
          min-h-screen
          bg-[#080D1D]
          font-sans text-white
        "
      >
        {/* =========================================
            PAGE HERO
        ========================================== */}
        <section
          aria-labelledby="courses-page-heading"
          className="
            relative isolate overflow-hidden
            border-b border-white/10
            bg-linear-to-br
            from-[#080D27]
            via-[#10194F]
            to-[#1A237E]
          "
        >
          {/* Background Grid */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0
              bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]
              bg-size-[48px_48px]
            "
          />

          {/* Decorative Glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              -right-24 top-0
              h-[400px] w-[400px]
              rounded-full bg-cyan-400/10
              blur-[120px]
            "
          />

          <div
            className="
              relative mx-auto
              max-w-7xl px-4
              pb-12 pt-6
              sm:px-8 sm:pb-16
              sm:pt-8
            "
          >
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb">
              <ol
                className="
                  flex items-center gap-2
                  text-xs font-medium
                  text-slate-400
                "
              >
                <li>
                  <Link
                    href="/"
                    className="
                      transition-colors
                      hover:text-cyan-300
                    "
                  >
                    Home
                  </Link>
                </li>

                <li aria-hidden="true">
                  <ChevronRightIcon />
                </li>

                <li aria-current="page" className="text-cyan-300">
                  Courses
                </li>
              </ol>
            </nav>

            {/* Hero Content */}
            <div className="mx-auto mt-8 max-w-3xl text-center">
              <div
                className="
                  inline-flex items-center
                  gap-2 rounded-full
                  border border-cyan-400/25
                  bg-cyan-400/10
                  px-4 py-2
                  text-[11px] font-semibold
                  uppercase tracking-[0.12em]
                  text-cyan-300
                "
              >
                <GraduationIcon />
                Explore Our Courses
              </div>

              <h1
                id="courses-page-heading"
                className="
                  mt-5 text-3xl
                  font-extrabold
                  leading-[1.15]
                  tracking-[-0.04em]
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                Find Your Next{" "}
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
              </h1>

              <p
                className="
                  mx-auto mt-5
                  max-w-2xl
                  text-sm leading-7
                  text-slate-300
                  sm:text-base
                  sm:leading-8
                "
              >
                Explore our structured art courses, build your drawing and
                design skills, and prepare for MAH AAC CET with practical
                exercises, video lessons and expert guidance.
              </p>

              {/* Course Count */}
              <div
                className="
                  mt-6 flex flex-wrap
                  items-center justify-center
                  gap-x-6 gap-y-3
                  text-xs font-medium
                  text-slate-300
                  sm:text-sm
                "
              >
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="
                      h-1.5 w-1.5
                      rounded-full
                      bg-cyan-400
                    "
                  />
                  {courses.length} {courses.length === 1 ? "Course" : "Courses"}
                </span>

                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="
                      h-1.5 w-1.5
                      rounded-full
                      bg-cyan-400
                    "
                  />
                  Online Learning
                </span>

                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="
                      h-1.5 w-1.5
                      rounded-full
                      bg-cyan-400
                    "
                  />
                  Learn at Your Own Pace
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            COURSE CATALOGUE
        ========================================== */}
        <section
          aria-label="Course catalogue"
          className="
            mx-auto max-w-7xl
            px-4 py-10
            sm:px-8 sm:py-14
          "
        >
          {/* Dummy Data Notice */}
          {isMockData && (
            <div
              className="
                mb-5 rounded-xl
                border border-amber-400/20
                bg-amber-400/5
                px-4 py-3
                text-xs leading-6
                text-amber-200
              "
            >
              Preview catalogue: course information and prices are sample data
              for development.
            </div>
          )}

          <CoursesCatalog items={catalogItems} />

          {/* =========================================
              COURSE GUIDANCE CTA
          ========================================== */}
          <div
            className="
              relative mt-12
              overflow-hidden
              rounded-2xl
              border border-cyan-400/15
              bg-linear-to-r
              from-[#101A34]
              to-[#13234A]
              p-6 sm:p-8
              lg:mt-16
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute
                -right-16 -top-20
                h-48 w-48
                rounded-full
                bg-cyan-400/10
                blur-[65px]
              "
            />

            <div
              className="
                relative flex flex-col
                gap-5
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div>
                <h2 className="text-lg font-bold text-white sm:text-xl">
                  Not sure which course is right for you?
                </h2>

                <p
                  className="
                    mt-2 max-w-xl
                    text-sm leading-7
                    text-slate-400
                  "
                >
                  Connect with AV Art Academy for guidance on choosing the right
                  course for your artistic goals and entrance exam preparation.
                </p>
              </div>

              <Link
                href="/contact"
                className="
                  inline-flex min-h-12
                  shrink-0 items-center
                  justify-center gap-2
                  self-start rounded-xl
                  bg-cyan-400
                  px-6 py-3
                  text-sm font-bold
                  text-[#061426]
                  transition-colors
                  hover:bg-cyan-300
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
        </section>
      </main>

      <Footer />
    </>
  );
}
