import type { Metadata } from "next";
import Link from "next/link";

import Header from "../landing/components/Header";
import Footer from "../landing/components/Footer";

import ReviewsContent from "./ReviewsContent";

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

export const mockReviews: Review[] = [
  {
    id: "sample-001",
    name: "Demo Student 01",
    course: "MAH AAC CET Complete Course",
    rating: 5,
    title: "Great learning experience",
    comment:
      "The drawing lessons are easy to understand. The perspective drawing exercises helped me practice concepts that I previously found difficult.",
    createdAt: "2026-11-05",
    dateLabel: "5 Nov 2026",
  },
  {
    id: "sample-002",
    name: "Demo Student 02",
    course: "Perspective Drawing",
    rating: 5,
    title: "Helpful for beginners",
    comment:
      "I liked the step-by-step explanations and practical examples. The lessons made it easier to understand perspective and object drawing.",
    createdAt: "2026-10-28",
    dateLabel: "28 Oct 2026",
  },
  {
    id: "sample-003",
    name: "Demo Student 03",
    course: "MAH AAC CET Mock Tests",
    rating: 4,
    title: "Useful practice material",
    comment:
      "The mock tests provided a good way to practice exam-style questions. I would also like to see more detailed explanations for every answer.",
    createdAt: "2026-10-20",
    dateLabel: "20 Oct 2026",
  },
  {
    id: "sample-004",
    name: "Demo Student 04",
    course: "Memory Drawing",
    rating: 5,
    title: "Improved my drawing practice",
    comment:
      "The memory drawing lessons gave me ideas for improving composition and storytelling. The exercises were especially interesting.",
    createdAt: "2026-10-12",
    dateLabel: "12 Oct 2026",
  },
  {
    id: "sample-005",
    name: "Demo Student 05",
    course: "2D Design & Colour Theory",
    rating: 4,
    title: "Clear explanations",
    comment:
      "The colour theory and composition lessons were useful. The examples made it easier to understand the fundamentals of 2D design.",
    createdAt: "2026-09-25",
    dateLabel: "25 Sep 2026",
  },
  {
    id: "sample-006",
    name: "Demo Student 06",
    course: "MAH AAC CET Complete Course",
    rating: 5,
    title: "Well-organized lessons",
    comment:
      "The course content was organized clearly. Having different drawing topics and practice resources together made studying more convenient.",
    createdAt: "2026-09-14",
    dateLabel: "14 Sep 2026",
  },
  {
    id: "sample-007",
    name: "Demo Student 07",
    course: "Object Drawing",
    rating: 3,
    title: "Good basics, room for improvement",
    comment:
      "The basic drawing lessons were helpful. I would prefer some additional advanced exercises and more examples of shading techniques.",
    createdAt: "2026-08-30",
    dateLabel: "30 Aug 2026",
  },
  {
    id: "sample-008",
    name: "Demo Student 08",
    course: "Art Awareness & Aptitude",
    rating: 4,
    title: "Good preparation resource",
    comment:
      "The topics provided a useful foundation for exam preparation. More topic-wise practice questions would make the experience even better.",
    createdAt: "2026-08-18",
    dateLabel: "18 Aug 2026",
  },
];

export const metadata: Metadata = {
  title: "Student Reviews & Ratings",

  description:
    "Explore the AV Art Academy student reviews and ratings section for MAH AAC CET coaching, drawing courses and creative learning.",

  alternates: {
    canonical: "/reviews",
  },

  openGraph: {
    title: "Student Reviews & Ratings | AV Art Academy",
    description: "Explore the student feedback section at AV Art Academy.",
    url: "/reviews",
    type: "website",
    siteName: "AV Art Academy",
    locale: "en_IN",
  },

  // Temporary: sample reviews are not genuine testimonials.
  // Enable indexing once real reviews replace the demo data.
  robots: {
    index: false,
    follow: true,
  },
};

export default function ReviewsPage() {
  return (
    <>
      <Header />

      <main className="overflow-hidden bg-[#080D1D] text-white">
        {/* Hero */}
        <section
          aria-labelledby="reviews-heading"
          className="
            relative overflow-hidden
            border-b border-white/5
            bg-gradient-to-br
            from-[#080D27] via-[#10194F]
            to-[#1A237E]
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              -right-20 -top-24
              h-[400px] w-[400px]
              rounded-full bg-cyan-400/10
              blur-[100px]
            "
          />

          <div
            className="
              relative mx-auto max-w-7xl
              px-6 pb-20 pt-10
              md:pb-24
            "
          >
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-cyan-300">
                    Home
                  </Link>
                </li>

                <li aria-hidden="true">/</li>

                <li aria-current="page" className="text-cyan-300">
                  Reviews
                </li>
              </ol>
            </nav>

            <div className="mx-auto mt-16 max-w-3xl text-center">
              <span
                className="
                  inline-flex items-center gap-2
                  rounded-full border
                  border-cyan-400/25
                  bg-cyan-400/10
                  px-4 py-2
                  text-xs font-semibold uppercase
                  tracking-widest text-cyan-300
                "
              >
                Student Feedback
              </span>

              <h1
                id="reviews-heading"
                className="
                  mt-7 text-4xl font-extrabold
                  leading-tight tracking-tight
                  sm:text-5xl lg:text-6xl
                "
              >
                Every Creative Journey
                <span className="block text-cyan-400">Has a Story.</span>
              </h1>

              <p
                className="
                  mx-auto mt-7 max-w-2xl
                  text-base leading-8
                  text-slate-300 sm:text-lg
                "
              >
                Discover our student review experience, featuring course
                feedback, individual ratings and learning experiences.
              </p>

              <div className="mt-8">
                <Link
                  href="#student-reviews"
                  className="
                    inline-flex items-center
                    justify-center rounded-xl
                    bg-cyan-400 px-6 py-3.5
                    text-sm font-bold
                    text-[#061426]
                    transition-colors
                    hover:bg-cyan-300
                  "
                >
                  Explore Reviews
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews and Ratings */}
        <section
          id="student-reviews"
          aria-labelledby="student-reviews-heading"
          className="scroll-mt-24 py-16 md:py-24"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div
              className="
                mb-8 rounded-xl
                border border-amber-400/20
                bg-amber-400/5 p-4
                text-sm leading-6
                text-amber-100
              "
            >
              <strong>Demo preview:</strong> The ratings and reviews below are
              illustrative sample data, not genuine student testimonials. Actual
              student reviews will appear here after API integration.
            </div>

            <h2 id="student-reviews-heading" className="sr-only">
              Student Ratings and Reviews
            </h2>

            <ReviewsContent reviews={mockReviews} />
          </div>
        </section>

        {/* CTA */}
        <section
          className="
            bg-gradient-to-r
            from-[#10194F] to-[#1A237E]
            px-6 py-20 text-center
          "
        >
          <div className="mx-auto max-w-2xl">
            <h2
              className="
                text-3xl font-extrabold
                tracking-tight sm:text-4xl
              "
            >
              Start Your Own
              <span className="text-cyan-400"> Creative Journey.</span>
            </h2>

            <p
              className="
                mt-5 text-base leading-8
                text-slate-300
              "
            >
              Explore AV Art Academy courses, mock tests and learning resources
              to build your drawing and design skills.
            </p>

            <Link
              href="/#courses"
              className="
                mt-8 inline-flex items-center
                justify-center rounded-xl
                bg-cyan-400 px-7 py-3.5
                text-sm font-bold text-[#061426]
                transition-colors hover:bg-cyan-300
              "
            >
              Explore Courses
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
