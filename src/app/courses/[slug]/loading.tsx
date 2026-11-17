
import Header from "@/src/app/landing/components/Header";

export default function CourseDetailsLoading() {
  return (
    <>
      <Header />

      <main
        aria-busy="true"
        aria-label="Loading course details"
        className="min-h-screen bg-[#080D1D]"
      >
        {/* Hero skeleton */}
        <div
          className="
            border-b border-white/10
            bg-gradient-to-br
            from-[#080D27] to-[#1A237E]
          "
        >
          <div
            className="
              mx-auto max-w-7xl
              animate-pulse px-4 py-10
              sm:px-6 lg:px-8
              motion-reduce:animate-none
            "
          >
            <div className="h-3 w-40 rounded bg-white/10" />

            <div className="mt-7 h-7 w-40 rounded-full bg-white/10" />

            <div className="mt-5 h-10 w-full max-w-2xl rounded-lg bg-white/10" />

            <div className="mt-3 h-10 w-3/4 max-w-xl rounded-lg bg-white/10" />

            <div className="mt-5 h-4 w-full max-w-2xl rounded bg-white/10" />

            <div className="mt-3 h-4 w-2/3 max-w-lg rounded bg-white/10" />
          </div>
        </div>

        {/* Course content skeleton */}
        <div
          className="
            mx-auto grid max-w-7xl
            animate-pulse grid-cols-1
            items-start gap-6
            px-4 py-8
            sm:px-6
            lg:grid-cols-[minmax(0,1fr)_360px]
            lg:gap-8 lg:px-8
            motion-reduce:animate-none
          "
        >
          {/* Pricing card */}
          <div
            className="
              overflow-hidden rounded-2xl
              border border-white/10
              bg-[#101A34]
              lg:order-2
            "
          >
            <div className="aspect-[16/10] bg-white/5" />

            <div className="space-y-5 p-6">
              <div className="h-4 w-24 rounded bg-white/10" />

              <div className="h-9 w-40 rounded bg-white/10" />

              <div className="h-12 rounded-xl bg-white/10" />

              <div className="h-px bg-white/10" />

              <div className="h-4 w-3/4 rounded bg-white/10" />

              <div className="h-4 w-2/3 rounded bg-white/10" />

              <div className="h-4 w-3/4 rounded bg-white/10" />
            </div>
          </div>

          {/* Main sections */}
          <div className="space-y-6 lg:order-1">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  space-y-4 rounded-2xl
                  border border-white/10
                  bg-[#101A34] p-6
                "
              >
                <div className="mb-6 h-6 w-48 rounded bg-white/10" />

                <div className="h-4 w-full rounded bg-white/10" />

                <div className="h-4 w-11/12 rounded bg-white/10" />

                <div className="h-4 w-3/4 rounded bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
