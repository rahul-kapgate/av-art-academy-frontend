
import Link from "next/link";

import Header from "@/src/app/landing/components/Header";
import Footer from "@/src/app/landing/components/Footer";

export default function CourseNotFound() {
  return (
    <>
      <Header />

      <main
        className="
          flex min-h-[65svh]
          items-center justify-center
          bg-[#080D1D]
          px-4 py-16
        "
      >
        <div
          className="
            w-full max-w-lg
            rounded-2xl border border-white/10
            bg-[#101A34]
            p-8 text-center sm:p-10
          "
        >
          <div
            className="
              mx-auto mb-5
              flex h-16 w-16
              items-center justify-center
              rounded-2xl
              bg-cyan-400/10
              text-cyan-300
            "
          >
            <svg
              aria-hidden="true"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 5 5" />
              <path d="M11 8v3M11 14h.01" />
            </svg>
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
            Course unavailable
          </p>

          <h1 className="mt-3 text-3xl font-extrabold text-white">
            Course not found
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-400">
            The course you are looking for may have
            been removed or is currently unavailable.
            Explore our other courses to continue your
            creative journey.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/courses"
              className="
                rounded-xl bg-cyan-400
                px-5 py-3
                text-sm font-bold
                text-[#061426]
                hover:bg-cyan-300
              "
            >
              Explore Courses
            </Link>

            <Link
              href="/"
              className="
                rounded-xl border
                border-white/15
                px-5 py-3
                text-sm font-semibold
                text-white
                hover:bg-white/5
              "
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
