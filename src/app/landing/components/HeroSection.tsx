import Link from "next/link";
import HeroVisual from "./HeroVisual";

const skills = [
  "Perspective Drawing",
  "Memory Drawing",
  "Object Drawing",
  "2D Design",
  "Colour Theory",
  "Art Awareness",
  "Mock Tests",
  "PYQ Practice",
];

const learningHighlights = [
  {
    title: "Learn",
    description: "Video Lessons",
  },
  {
    title: "Practice",
    description: "Drawing Skills",
  },
  {
    title: "Prepare",
    description: "Mock Tests & PYQs",
  },
];

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

      <path d="M2 10 12 5l10 5-10 5L2 10Z" />

      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function ClipboardIcon() {
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
      <rect x="8" y="2" width="8" height="4" rx="1" />

      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />

      <path d="m9 14 2 2 4-4" />
    </svg>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="
        relative isolate flex flex-col
        overflow-hidden font-sans
        bg-linear-to-br
        from-[#080D27]
        via-[#10194F]
        to-[#1A237E]
        text-white
        lg:min-h-[calc(100svh_-_80px)]
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

      {/* Background Glow - Left */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-40 -top-40
          h-[400px] w-[400px]
          rounded-full
          bg-blue-500/10
          blur-[120px]
        "
      />

      {/* Background Glow - Right */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-32 top-1/4
          h-[450px] w-[450px]
          rounded-full
          bg-cyan-400/10
          blur-[120px]
        "
      />

      {/* Main Hero Container */}
      <div
        className="
          relative mx-auto grid
          w-full max-w-7xl flex-1
          items-center
          gap-8 px-4 py-10
          sm:gap-12 sm:px-8 sm:py-14
          lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]
          lg:gap-10 lg:py-8
          xl:gap-14
        "
      >
        {/* =========================================
            LEFT SIDE - Hero Content
        ========================================== */}
        <div className="min-w-0 max-w-[620px]">
          {/* Top Badge */}
          <div
            className="
              inline-flex items-center
              gap-2.5 rounded-full
              border border-cyan-400/25
              bg-cyan-400/5
              px-4 py-2
              text-[11px] font-medium
              tracking-[0.1em]
              text-cyan-300
              sm:text-xs
            "
          >
            <span
              aria-hidden="true"
              className="
                h-2 w-2 shrink-0
                rounded-full bg-cyan-400
                shadow-[0_0_10px_rgba(34,211,238,0.7)]
              "
            />
            MAH AAC CET Online Coaching
          </div>

          {/* Main Academy Branding */}
          <div className="mt-6">
            <h1
              id="hero-heading"
              className="
                text-[36px]
                font-extrabold
                leading-[1.1]
                tracking-[-0.04em]
                text-cyan-400
                sm:text-5xl
                lg:text-[clamp(36px,3.35vw,56px)]
                xl:whitespace-nowrap
              "
            >
              AV ART ACADEMY
            </h1>

            {/* Academy Tagline */}
            <p
              className="
                mt-2 text-[11px]
                font-semibold uppercase
                tracking-[0.25em]
                text-cyan-200
                sm:text-xs
              "
            >
              Inspire. Create. Master.
            </p>
          </div>

          {/* Main Value Proposition */}
          <p
            className="
              mt-6 max-w-xl
              text-[23px]
              font-bold
              leading-[1.4]
              tracking-tight
              text-white
              sm:text-3xl
              lg:text-[clamp(23px,2vw,32px)]
            "
          >
            Learn Art. Master Skills.
            <span className="block text-cyan-300">Create Your Future.</span>
          </p>

          {/* Highlighted Learning Topic */}
          <div
            className="
              mt-4 flex flex-wrap
              items-baseline gap-x-2
              gap-y-1
              text-sm font-medium
              sm:text-base
            "
          >
            <span className="text-slate-300">Master</span>

            <span className="font-bold text-amber-400">
              Perspective Drawing
            </span>

            <span className="text-slate-400">&</span>

            <span className="font-bold text-amber-400">Creative Design</span>
          </div>

          {/* Description */}
          <p
            className="
              mt-5 max-w-[570px]
              text-sm leading-[1.85]
              text-slate-300
              sm:text-base
            "
          >
            Prepare for{" "}
            <strong className="font-semibold text-white">MAH AAC CET</strong>{" "}
            with AV Art Academy. Learn drawing, design and creative skills
            through structured video lessons, practical exercises, mock tests
            and previous-year questions with guidance from Vickey.
          </p>

          {/* CTA Buttons */}
          <div
            className="
              mt-7 flex flex-wrap
              items-center gap-3
              sm:gap-4
            "
          >
            {/* Primary CTA */}
            <Link
              href="/#courses"
              className="
                group inline-flex
                min-h-12
                items-center justify-center
                gap-2.5 rounded-xl
                bg-linear-to-r
                from-cyan-500 to-cyan-400
                px-6 py-3.5
                text-sm font-bold
                text-[#061426]
                shadow-[0_6px_24px_rgba(34,211,238,0.15)]
                transition-colors duration-200
                hover:from-cyan-400
                hover:to-cyan-300
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-cyan-400
              "
            >
              <GraduationIcon />
              Explore Courses
              <span
                className="
                  transition-transform
                  motion-safe:group-hover:translate-x-1
                "
              >
                <ArrowIcon />
              </span>
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/login"
              className="
                inline-flex min-h-12
                items-center justify-center
                gap-2.5 rounded-xl
                border border-cyan-400/35
                bg-cyan-400/5
                px-6 py-3.5
                text-sm font-semibold
                text-cyan-300
                transition-colors duration-200
                hover:border-cyan-400/60
                hover:bg-cyan-400/10
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-cyan-400
              "
            >
              <ClipboardIcon />
              Try Free Mock Test
            </Link>
          </div>

          {/* Learning Highlights */}
          <div
            className="
              mt-8 flex flex-wrap
              items-start
              gap-x-8 gap-y-5
              border-t border-white/10
              pt-6
              sm:gap-x-10
            "
          >
            {learningHighlights.map((item) => (
              <div key={item.title}>
                <p
                  className="
                    text-xl font-bold
                    leading-tight
                    tracking-tight
                    text-amber-400
                    sm:text-2xl
                  "
                >
                  {item.title}
                </p>

                <p
                  className="
                    mt-1.5 text-xs
                    font-medium
                    text-slate-400
                    sm:text-sm
                  "
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================
            RIGHT SIDE - Keep Existing Visual
        ========================================== */}
        <HeroVisual />
      </div>

      {/* Bottom Skills Strip */}
      <div
        className="
          relative shrink-0
          border-y border-cyan-400/10
          bg-[#050B20]/60
        "
      >
        <div className="mx-auto max-w-7xl px-6 py-3">
          <ul
            className="
              flex flex-wrap
              items-center justify-center
              gap-x-6 gap-y-2
              lg:gap-x-5
              xl:gap-x-7
            "
          >
            {skills.map((skill) => (
              <li
                key={skill}
                className="
                  flex items-center gap-2
                  whitespace-nowrap
                  text-[11px]
                  font-medium
                  text-slate-300
                  xl:text-xs
                "
              >
                <span aria-hidden="true" className="text-cyan-400">
                  ✦
                </span>

                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
