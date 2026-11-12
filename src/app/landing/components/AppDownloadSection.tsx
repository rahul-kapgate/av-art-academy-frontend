import Image from "next/image";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.rahulkapgatesteam.artisticvickey";

const features = [
  {
    title: "Video Lectures",
    description: "Learn drawing and design at your own pace.",
    icon: "video",
  },
  {
    title: "Mock Tests & PYQs",
    description: "Practice and strengthen your exam preparation.",
    icon: "clipboard",
  },
  {
    title: "Your Courses",
    description: "Access your enrolled courses in one place.",
    icon: "book",
  },
  {
    title: "Learn Anywhere",
    description: "Continue your creative journey on mobile.",
    icon: "phone",
  },
] as const;

type FeatureIconName = (typeof features)[number]["icon"];

function FeatureIcon({ name }: { name: FeatureIconName }) {
  const iconProps = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "video":
      return (
        <svg {...iconProps}>
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="m10 9 5 3-5 3V9Z" />
        </svg>
      );

    case "clipboard":
      return (
        <svg {...iconProps}>
          <rect x="8" y="2" width="8" height="4" rx="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="m9 14 2 2 4-4" />
        </svg>
      );

    case "book":
      return (
        <svg {...iconProps}>
          <path d="M12 7v14" />
          <path d="M3 18V5a2 2 0 0 1 2-2h3a4 4 0 0 1 4 4 4 4 0 0 1 4-4h3a2 2 0 0 1 2 2v13a1 1 0 0 1-1 1h-4a4 4 0 0 0-4 2 4 4 0 0 0-4-2H4a1 1 0 0 1-1-1Z" />
        </svg>
      );

    case "phone":
      return (
        <svg {...iconProps}>
          <rect x="5" y="2" width="14" height="20" rx="3" />
          <path d="M11 18h2" />
        </svg>
      );
  }
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="m17.523 15.341 1.023-1.772a.213.213 0 0 0-.369-.213l-1.036 1.794a10.617 10.617 0 0 0-5.141-1.306c-1.863 0-3.617.476-5.141 1.306l-1.036-1.794a.213.213 0 0 0-.369.213l1.023 1.772C2.788 17.343.266 21.136 0 24h24c-.266-2.864-2.788-6.657-6.477-8.659ZM6.5 21a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm11 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
    </svg>
  );
}

function AppDownloadSection() {
  return (
    <section
      id="download-app"
      aria-labelledby="app-download-heading"
      className="
        relative isolate overflow-hidden
        scroll-mt-24
        border-y border-white/5
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
          via-[#101638]
          to-[#111D46]
        "
      />

      {/* Background Grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)]
          bg-size-[48px_48px]
        "
      />

      {/* Decorative Glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-32 top-1/4
          h-[450px] w-[450px]
          rounded-full bg-cyan-400/10
          blur-[130px]
        "
      />

      {/* Main Container */}
      <div
        className="
          relative mx-auto grid
          max-w-7xl items-center
          gap-12 px-5 py-16
          sm:px-8 sm:py-20
          lg:grid-cols-[1.05fr_0.95fr]
          lg:gap-16 lg:py-24
        "
      >
        {/* =========================================
            LEFT SIDE - App Information
        ========================================== */}
        <div className="min-w-0 max-w-xl">
          {/* Top Badge */}
          <div
            className="
              inline-flex items-center
              gap-2.5 rounded-full
              border border-emerald-400/20
              bg-emerald-400/10
              px-4 py-2
              text-xs font-semibold
              text-emerald-300
            "
          >
            <span
              aria-hidden="true"
              className="
                h-2 w-2 rounded-full
                bg-emerald-400
              "
            />
            Available on Android
          </div>

          {/* Main Heading */}
          <h2
            id="app-download-heading"
            className="
              mt-6 text-3xl font-extrabold
              leading-[1.15]
              tracking-[-0.035em]
              sm:text-4xl lg:text-5xl
            "
          >
            Your Art Academy.
            <span className="mt-2 block text-cyan-400">In Your Pocket.</span>
          </h2>

          {/* Description */}
          <p
            className="
              mt-6 max-w-lg
              text-sm leading-7
              text-slate-400
              sm:text-base sm:leading-8
            "
          >
            Take your creative journey anywhere with the{" "}
            <strong className="font-semibold text-white">
              AV Art Academy Android app.
            </strong>{" "}
            Prepare for MAH AAC CET, watch video lectures, practice mock tests
            and access your learning resources directly from your smartphone.
          </p>

          {/* App Features */}
          <div
            className="
              mt-8 grid gap-x-6 gap-y-6
              sm:grid-cols-2
            "
          >
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3.5">
                {/* Icon */}
                <div
                  className="
                    flex h-11 w-11
                    shrink-0 items-center
                    justify-center
                    rounded-xl border
                    border-cyan-400/20
                    bg-cyan-400/10
                    text-cyan-300
                  "
                >
                  <FeatureIcon name={feature.icon} />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p
                    className="
                      mt-1 text-xs
                      leading-6 text-slate-400
                    "
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Download Button */}
          <div
            className="
              mt-9 flex flex-wrap
              items-center gap-5
            "
          >
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download AV Art Academy on Google Play"
              className="
                inline-flex
                rounded-lg
                transition-transform duration-200
                motion-safe:hover:scale-105
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-cyan-400
              "
            >
              <Image
                src="/google-play-badge.png"
                alt="Get it on Google Play"
                width={180}
                height={70}
                className="
                  h-auto w-[180px]
                  object-contain
                "
              />
            </a>

            <div className="space-y-1.5">
              <p className="text-sm font-semibold text-white">
                Start learning today
              </p>

              <p className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="text-emerald-400">
                  <CheckIcon />
                </span>
                Free to download
              </p>
            </div>
          </div>

          {/* Small Note */}
          <p className="mt-4 text-xs leading-6 text-slate-500">
            Available for Android devices through Google Play. Some courses and
            learning resources may require a paid enrollment.
          </p>
        </div>

        {/* =========================================
            RIGHT SIDE - Mobile App Mockup
        ========================================== */}
        <div
          className="
            relative mx-auto flex
            w-full max-w-[500px]
            items-center justify-center
            py-6 sm:py-10
          "
        >
          {/* Background Circular Glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              left-1/2 top-1/2
              aspect-square w-[85%]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-cyan-400/10
              blur-[80px]
            "
          />

          {/* Outer Decorative Ring */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              left-1/2 top-1/2
              aspect-square w-full
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border border-cyan-400/10
            "
          />

          {/* Inner Decorative Ring */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              left-1/2 top-1/2
              aspect-square w-[82%]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border border-dashed
              border-cyan-400/15
            "
          />

          {/* Phone Mockup */}
          <div
            className="
              relative z-10
              w-[230px]
              rounded-[36px]
              border-2 border-[#53617A]
              bg-[#050816]
              p-[7px]
              shadow-[0_25px_80px_rgba(0,0,0,0.45)]
              sm:w-[280px]
              sm:rounded-[42px]
              sm:p-[9px]
              lg:w-[290px]
            "
          >
            {/* Volume Buttons */}
            <div
              aria-hidden="true"
              className="
                absolute -left-[5px] top-[20%]
                h-10 w-[3px]
                rounded-l-sm bg-slate-600
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute -left-[5px] top-[31%]
                h-10 w-[3px]
                rounded-l-sm bg-slate-600
              "
            />

            {/* Power Button */}
            <div
              aria-hidden="true"
              className="
                absolute -right-[5px] top-[28%]
                h-12 w-[3px]
                rounded-r-sm bg-slate-600
              "
            />

            {/* Screen */}
            <div
              className="
                relative aspect-[9/19.5]
                overflow-hidden
                rounded-[28px]
                bg-[#080D1D]
                sm:rounded-[32px]
              "
            >
              <Image
                src="/app-screenshot.png"
                alt="AV Art Academy Android app showing courses and learning resources for MAH AAC CET preparation"
                fill
                sizes="
                  (max-width: 640px) 216px,
                  (max-width: 1024px) 262px,
                  272px
                "
                className="
                  object-contain
                  object-center
                "
              />
            </div>
          </div>

          {/* Floating Card - Video Lessons */}
          <div
            className="
              absolute left-0 top-[19%]
              z-20 hidden items-center
              gap-3 rounded-2xl
              border border-white/10
              bg-[#101A34]
              p-3 shadow-xl
              shadow-black/20
              sm:flex lg:-left-2
            "
          >
            <div
              className="
                flex h-10 w-10
                shrink-0 items-center
                justify-center rounded-xl
                bg-cyan-400/10
                text-cyan-300
              "
            >
              <FeatureIcon name="video" />
            </div>

            <div>
              <p className="text-xs font-semibold text-white">Video Lessons</p>

              <p className="mt-1 text-[10px] text-slate-400">Learn on the go</p>
            </div>
          </div>

          {/* Floating Card - Mock Tests */}
          <div
            className="
              absolute bottom-[20%] right-0
              z-20 hidden items-center
              gap-3 rounded-2xl
              border border-white/10
              bg-[#101A34]
              p-3 shadow-xl
              shadow-black/20
              sm:flex lg:-right-2
            "
          >
            <div
              className="
                flex h-10 w-10
                shrink-0 items-center
                justify-center rounded-xl
                bg-violet-400/10
                text-violet-300
              "
            >
              <FeatureIcon name="clipboard" />
            </div>

            <div>
              <p className="text-xs font-semibold text-white">Mock Tests</p>

              <p className="mt-1 text-[10px] text-slate-400">
                Practice anytime
              </p>
            </div>
          </div>

          {/* Bottom Android Label */}
          <div
            className="
              absolute bottom-0 left-1/2
              flex -translate-x-1/2
              items-center gap-2
              whitespace-nowrap
              text-[11px] font-medium
              text-emerald-300/80
            "
          >
            <AndroidIcon />
            Built for Android
          </div>
        </div>
      </div>
    </section>
  );
}

export default AppDownloadSection;
