function BrandSignature() {
  return (
    <section
      aria-label="Made in India"
      className="
        relative isolate overflow-hidden
        border-t border-white/5
        bg-[#050816]
        font-sans
      "
    >
      {/* Subtle Background Glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -bottom-40 -right-32
          h-[400px] w-[400px]
          rounded-full
          bg-cyan-400/5
          blur-[120px]
        "
      />

      {/* Main Container */}
      <div
        className="
          relative mx-auto
          max-w-7xl
          px-6 py-12
          sm:px-8 sm:py-16
          lg:py-20
        "
      >
        {/* Large Brand Statement */}
        <div
          className="
            text-[clamp(32px,6vw,82px)]
            font-extrabold
            leading-[1.12]
            tracking-[-0.055em]
          "
        >
          <p className="text-slate-600">Built with passion.</p>

          <p className="text-slate-500">Built in Bengaluru.</p>

          <p className="text-cyan-400">Made for India.</p>
        </div>

        {/* Brand Credit */}
        <div
          className="
            mt-8 flex flex-wrap
            items-center gap-2
            text-xs font-medium
            text-slate-400
            sm:mt-10 sm:text-sm
          "
        >
          <span>Crafted with</span>

          {/* Heart Icon */}
          <svg
            aria-hidden="true"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-red-400"
          >
            <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
          </svg>

          <span>
            by{" "}
            <span className="font-semibold text-slate-300">AV Art Academy</span>
          </span>

          <span role="img" aria-label="Indian flag" className="ml-1 text-base">
            🇮🇳
          </span>
        </div>

        {/* Indian Tricolour Accent */}
        <div aria-hidden="true" className="mt-5 flex w-16 gap-1">
          <span className="h-[3px] flex-1 rounded-full bg-[#FF9933]" />

          <span className="h-[3px] flex-1 rounded-full bg-white" />

          <span className="h-[3px] flex-1 rounded-full bg-[#138808]" />
        </div>
      </div>
    </section>
  );
}

export default BrandSignature;
