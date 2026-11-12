import Image from "next/image";

const subjects = [
  {
    title: "Perspective Drawing",
    icon: "perspective",
    color: "text-cyan-300",
    border: "border-cyan-400/25",
    x: 50,
    y: 12,
  },
  {
    title: "Memory Drawing",
    icon: "memory",
    color: "text-violet-300",
    border: "border-violet-400/25",
    x: 77,
    y: 23,
  },
  {
    title: "Object Drawing",
    icon: "object",
    color: "text-blue-300",
    border: "border-blue-400/25",
    x: 86,
    y: 50,
  },
  {
    title: "2D Design",
    icon: "design",
    color: "text-pink-300",
    border: "border-pink-400/25",
    x: 77,
    y: 77,
  },
  {
    title: "Colour Theory",
    icon: "palette",
    color: "text-amber-300",
    border: "border-amber-400/25",
    x: 50,
    y: 88,
  },
  {
    title: "Art Awareness",
    icon: "art",
    color: "text-emerald-300",
    border: "border-emerald-400/25",
    x: 23,
    y: 77,
  },
  {
    title: "Mock Tests & PYQs",
    icon: "test",
    color: "text-cyan-300",
    border: "border-cyan-400/25",
    x: 14,
    y: 50,
  },
  {
    title: "Video Lessons",
    icon: "video",
    color: "text-violet-300",
    border: "border-violet-400/25",
    x: 23,
    y: 23,
  },
] as const;

type SubjectIconName = (typeof subjects)[number]["icon"];

function SubjectIcon({ name }: { name: SubjectIconName }) {
  const iconProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    className: "h-[44%] w-[44%]",
  };

  switch (name) {
    case "perspective":
      return (
        <svg {...iconProps}>
          <rect x="3" y="3" width="18" height="18" rx="1" />

          <path d="m3 3 9 9 9-9M3 21l9-9 9 9" />

          <circle cx="12" cy="12" r="2" />
        </svg>
      );

    case "memory":
      return (
        <svg {...iconProps}>
          <path d="M9 18h6M10 22h4" />

          <path d="M12 2a7 7 0 0 0-4 12.7c1 .8 1 1.3 1 2.3h6c0-1 0-1.5 1-2.3A7 7 0 0 0 12 2Z" />

          <path d="M12 6v3M10.5 7.5h3" />
        </svg>
      );

    case "object":
      return (
        <svg {...iconProps}>
          <path d="m12 2 9 5v10l-9 5-9-5V7z" />

          <path d="m3 7 9 5 9-5M12 12v10" />
        </svg>
      );

    case "design":
      return (
        <svg {...iconProps}>
          <rect x="3" y="3" width="18" height="18" rx="2" />

          <path d="M3 12h18M12 3v18" />

          <circle cx="7.5" cy="7.5" r="1.5" />

          <path d="m15 15 3 3" />
        </svg>
      );

    case "palette":
      return (
        <svg {...iconProps}>
          <path d="M12 3a9 9 0 1 0 0 18h1.5a1.5 1.5 0 0 0 1.5-1.5c0-.4-.2-.7-.4-1a1.5 1.5 0 0 1 1.1-2.5H18a3 3 0 0 0 3-3 10 10 0 0 0-9-10Z" />

          <circle cx="7.5" cy="11.5" r="0.8" />

          <circle cx="10" cy="7.5" r="0.8" />

          <circle cx="15" cy="7.5" r="0.8" />

          <circle cx="17.5" cy="11.5" r="0.8" />
        </svg>
      );

    case "art":
      return (
        <svg {...iconProps}>
          <rect x="3" y="3" width="18" height="18" rx="2" />

          <circle cx="9" cy="8" r="2" />

          <path d="m3 17 6-6 4 4 3-3 5 5" />
        </svg>
      );

    case "test":
      return (
        <svg {...iconProps}>
          <rect x="8" y="2" width="8" height="4" rx="1" />

          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />

          <path d="m9 14 2 2 4-4" />
        </svg>
      );

    case "video":
      return (
        <svg {...iconProps}>
          <rect x="3" y="5" width="18" height="14" rx="3" />

          <path d="m10 9 5 3-5 3V9Z" />
        </svg>
      );
  }
}

function HeroVisual() {
  return (
    <div
      className="
        relative mx-auto w-full
        max-w-[460px]
        [container-type:inline-size]
        lg:max-w-[clamp(320px,calc(100svh_-_220px),460px)]
      "
    >
      {/* =========================================
          RESPONSIVE CIRCULAR VISUAL

          Same layout on mobile, tablet and desktop.
      ========================================== */}
      <div
        className="
          relative isolate
          aspect-square w-full
        "
      >
        {/* Center Glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            left-1/2 top-1/2
            h-[65%] w-[65%]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-cyan-400/10
            blur-[60px]
          "
        />

        {/* Outer Orbit */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            inset-[7%]
            rounded-full border
            border-cyan-400/15
          "
        />

        {/* Middle Orbit */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            inset-[13%]
            rounded-full
            border border-dashed
            border-cyan-400/20
          "
        />

        {/* Inner Orbit */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            inset-[24%]
            rounded-full border
            border-cyan-400/10
          "
        />

        {/* Connecting Lines */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          className="
            pointer-events-none absolute
            inset-0 h-full w-full
            text-cyan-400
          "
        >
          <g
            stroke="currentColor"
            strokeWidth="0.22"
            strokeDasharray="0.7 1.4"
            opacity="0.2"
          >
            {subjects.map((subject) => (
              <line
                key={subject.title}
                x1="50"
                y1="50"
                x2={subject.x}
                y2={subject.y}
              />
            ))}
          </g>
        </svg>

        {/* Decorative Orbit Dots */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none absolute
            left-[34%] top-[10%]
            h-1.5 w-1.5 rounded-full
            bg-cyan-400/70
            shadow-[0_0_12px_#22d3ee]
          "
        />

        <span
          aria-hidden="true"
          className="
            pointer-events-none absolute
            right-[9%] top-[35%]
            h-1 w-1 rounded-full
            bg-violet-400/80
            shadow-[0_0_10px_#a78bfa]
          "
        />

        <span
          aria-hidden="true"
          className="
            pointer-events-none absolute
            bottom-[10%] right-[31%]
            h-1.5 w-1.5 rounded-full
            bg-cyan-400/70
            shadow-[0_0_12px_#22d3ee]
          "
        />

        {/* =========================================
            CENTER LOGO
        ========================================== */}
        <div
          className="
            absolute left-1/2 top-1/2
            z-20 flex aspect-square
            w-[31%]
            -translate-x-1/2
            -translate-y-1/2
            items-center justify-center
          "
        >
          {/* Outer Logo Ring */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              -inset-[8%]
              rounded-full border
              border-cyan-400/20
              bg-cyan-400/5
            "
          />

          {/* Main Logo Container */}
          <div
            className="
              relative flex h-full w-full
              items-center justify-center
              overflow-hidden rounded-full
              border-2 border-cyan-400/50
              bg-[#0A1434]
              shadow-[0_0_40px_rgba(34,211,238,0.15)]
            "
          >
            {/* Logo Glow */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute
                inset-0
                bg-radial-[at_50%_50%]
                from-cyan-400/10
                to-transparent
              "
            />

            {/* Academy Logo */}
            <div
              className="
                relative aspect-square
                w-[68%] overflow-hidden
                rounded-[14%]
                bg-white
              "
            >
              <Image
                src="/logo.jpeg"
                alt="AV Art Academy logo"
                fill
                sizes="
                  (max-width: 640px) 22vw,
                  100px
                "
                className="
                  object-contain p-[6%]
                "
              />
            </div>
          </div>
        </div>

        {/* =========================================
            CIRCULAR SUBJECT ICONS
        ========================================== */}
        <ul
          aria-label="Learning subjects at AV Art Academy"
          className="absolute inset-0"
        >
          {subjects.map((subject) => (
            <li
              key={subject.title}
              style={{
                left: `${subject.x}%`,
                top: `${subject.y}%`,
              }}
              className="
                group absolute z-10
                flex w-[27%]
                -translate-x-1/2
                -translate-y-1/2
                flex-col items-center
                justify-center
                gap-[clamp(4px,1.5cqw,8px)]
                text-center
              "
            >
              {/* Responsive Icon Box */}
              <div
                className={`
                  flex aspect-square
                  w-[clamp(32px,12cqw,56px)]
                  shrink-0 items-center
                  justify-center
                  rounded-[clamp(10px,3cqw,16px)]
                  border
                  ${subject.border}
                  ${subject.color}
                  bg-[#0C1735]
                  shadow-sm shadow-black/10
                  transition-[transform,background-color,border-color]
                  duration-300
                  group-hover:bg-[#142449]
                  group-hover:border-cyan-400/50
                  motion-safe:group-hover:scale-110
                `}
              >
                <SubjectIcon name={subject.icon} />
              </div>

              {/* Responsive Subject Label */}
              <span
                className="
                  max-w-full
                  text-[clamp(9px,2.4cqw,11px)]
                  font-medium
                  leading-[1.35]
                  text-slate-300
                  transition-colors
                  group-hover:text-cyan-300
                "
              >
                {subject.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Caption */}
      <div className="mt-4 text-center sm:mt-3">
        <p
          className="
            text-[clamp(9px,2.4cqw,10px)]
            font-medium uppercase
            tracking-[0.15em]
            text-cyan-300/80
          "
        >
          One Academy. Endless Creativity.
        </p>
      </div>
    </div>
  );
}

export default HeroVisual;
