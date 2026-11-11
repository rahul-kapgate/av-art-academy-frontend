import Link from "next/link";

// Static year to support Next.js prerendering
const COPYRIGHT_YEAR = 2026;

// Footer navigation
const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
];

// Social media links
const socialLinks = [
  {
    name: "Instagram",
    handle: "@artistic.Vickey",
    href: "https://www.instagram.com/artistic.Vickey",
    icon: "instagram",
    color: "text-pink-300",
    background: "bg-pink-500/10 border-pink-500/20",
  },
  {
    name: "YouTube",
    handle: "@artisticVickey",
    href: "https://www.youtube.com/@ArtisticVickey",
    icon: "youtube",
    color: "text-red-300",
    background: "bg-red-500/10 border-red-500/20",
  },
  {
    name: "Facebook",
    handle: "mayur.tembhurne.148",
    href: "https://www.facebook.com/mayur.tembhurne.148",
    icon: "facebook",
    color: "text-blue-300",
    background: "bg-blue-500/10 border-blue-500/20",
  },
  {
    name: "WhatsApp",
    handle: "+91 9325217691",
    href: `https://wa.me/919325217691?text=${encodeURIComponent(
      "Hello AV Art Academy! I'm interested in your MAH AAC CET coaching courses. Could you please share more details about the courses, fees, and admission process? Thank you!",
    )}`,
    icon: "whatsapp",
    color: "text-green-300",
    background: "bg-green-500/10 border-green-500/20",
  },
  {
    name: "LinkedIn",
    handle: "vickey-tembhurne",
    href: "https://in.linkedin.com/in/vickey-tembhurne-597b61407",
    icon: "linkedin",
    color: "text-blue-300",
    background: "bg-blue-600/10 border-blue-600/20",
  },
] as const;

type SocialIconName = (typeof socialLinks)[number]["icon"];

// Lightweight SVG social icons
function SocialIcon({ name }: { name: SocialIconName }) {
  const iconProps = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true as const,
  };

  switch (name) {
    case "instagram":
      return (
        <svg {...iconProps}>
          <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.5-3a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
        </svg>
      );

    case "youtube":
      return (
        <svg {...iconProps}>
          <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.6V8.4l6.3 3.6z" />
        </svg>
      );

    case "facebook":
      return (
        <svg {...iconProps}>
          <path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1C0 18.1 4.4 23.1 10.1 24v-8.4h-3v-3.5h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9v2.3h3.3l-.5 3.5h-2.8V24C19.6 23.1 24 18.1 24 12.1z" />
        </svg>
      );

    case "whatsapp":
      return (
        <svg {...iconProps}>
          <path d="M12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.1 1.5 5.8L.1 23.4c-.1.3.2.6.5.5l5.7-1.5A12 12 0 1012 0zm0 21.8a9.8 9.8 0 01-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1112 21.8zm5.5-7.4c-.3-.2-1.8-.9-2-.9-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z" />
        </svg>
      );

    case "linkedin":
      return (
        <svg {...iconProps}>
          <path d="M20.4 20.5h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3zM5.3 7.4a2.1 2.1 0 110-4.1 2.1 2.1 0 010 4.1zm1.8 13.1H3.6V9h3.5v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 1 .8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z" />
        </svg>
      );
  }
}

function Footer() {
  return (
    <footer
      className="
        relative isolate overflow-hidden
        border-t border-indigo-900/30
        bg-gradient-to-b
        from-[#050816]
        via-[#0a0f2c]
        to-[#10194f]
        text-slate-400
      "
    >
      {/* Background decorations */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-16 -top-20
          h-72 w-72 rounded-full
          bg-blue-600/10 blur-[90px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -bottom-10 -right-10
          h-60 w-60 rounded-full
          bg-purple-600/10 blur-[80px]
        "
      />

      {/* Main content */}
      <div
        className="
          relative mx-auto grid
          max-w-7xl grid-cols-1
          gap-10 px-6 pb-12 pt-14
          sm:grid-cols-2
          lg:grid-cols-4
          lg:gap-12
        "
      >
        {/* Academy Information */}
        <div className="space-y-5">
          <Link
            href="/"
            aria-label="AV Art Academy Home"
            className="
              inline-flex items-center gap-1
              text-xl font-extrabold
              tracking-tight
              sm:text-2xl
            "
          >
            <span className="text-cyan-400">AV Art</span>

            <span className="text-white">Academy</span>
          </Link>

          <p
            className="
              max-w-xs text-sm
              leading-7 text-slate-400
            "
          >
            Online coaching for MAH AAC CET. Learn perspective, sketching,
            aptitude, and more with courses, mock tests, and guidance from
            expert artist Vickey.
          </p>

          <div
            className="
              inline-flex items-center
              gap-2 rounded-full
              border border-indigo-500/30
              bg-indigo-500/10
              px-3 py-2
              text-xs font-medium
              text-indigo-300
            "
          >
            <span
              aria-hidden="true"
              className="
                h-2 w-2 rounded-full
                bg-green-400
              "
            />
            MAH AAC CET Coaching
          </div>
        </div>

        {/* Quick Links */}
        <nav aria-label="Footer navigation">
          <h2
            className="
              mb-5 text-xs font-semibold
              uppercase tracking-[0.15em]
              text-slate-300
            "
          >
            Quick Links
          </h2>

          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="
                    group inline-flex
                    items-center gap-2
                    text-sm text-slate-400
                    transition-colors duration-200
                    hover:text-cyan-300
                    focus-visible:rounded
                    focus-visible:outline-2
                    focus-visible:outline-cyan-400
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      text-cyan-400
                      transition-transform
                      duration-200
                      group-hover:translate-x-1
                    "
                  >
                    →
                  </span>

                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Media */}
        <div>
          <h2
            className="
              mb-5 text-xs font-semibold
              uppercase tracking-[0.15em]
              text-slate-300
            "
          >
            Follow Us
          </h2>

          <ul className="flex flex-col gap-2.5">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`AV Art Academy on ${social.name}`}
                  className="
                    group flex items-center
                    gap-3 rounded-xl
                    border border-white/5
                    bg-white/[0.02]
                    p-2.5
                    transition-all duration-200
                    hover:translate-x-1
                    hover:border-white/10
                    hover:bg-white/[0.06]
                    focus-visible:outline-2
                    focus-visible:outline-cyan-400
                  "
                >
                  <span
                    className={`
                      flex h-9 w-9 shrink-0
                      items-center justify-center
                      rounded-lg border
                      ${social.background}
                      ${social.color}
                    `}
                  >
                    <SocialIcon name={social.icon} />
                  </span>

                  <span className="min-w-0">
                    <span
                      className={`
                        block text-xs font-semibold
                        ${social.color}
                      `}
                    >
                      {social.name}
                    </span>

                    <span
                      className="
                        block truncate text-[11px]
                        text-slate-400
                      "
                    >
                      {social.handle}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h2
            className="
              mb-5 text-xs font-semibold
              uppercase tracking-[0.15em]
              text-slate-300
            "
          >
            Contact
          </h2>

          <address className="flex flex-col gap-5 not-italic">
            {/* Email */}
            <a
              href="mailto:vikkitembhurne358@gmail.com"
              className="
                flex items-start gap-3
                text-sm text-slate-400
                transition-colors
                hover:text-cyan-300
                focus-visible:rounded
                focus-visible:outline-2
                focus-visible:outline-cyan-400
              "
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="mt-0.5 shrink-0 text-cyan-400"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 6 10 7 10-7" />
              </svg>

              <span className="break-all">vikkitembhurne358@gmail.com</span>
            </a>

            {/* Phone */}
            <a
              href="tel:+919325217691"
              className="
                flex items-center gap-3
                text-sm text-slate-400
                transition-colors
                hover:text-cyan-300
                focus-visible:rounded
                focus-visible:outline-2
                focus-visible:outline-cyan-400
              "
            >
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
                className="shrink-0 text-cyan-400"
              >
                <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.1-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7l.5 3a2 2 0 01-.6 1.7L7.1 10a16 16 0 006.9 6.9l1.6-1.9a2 2 0 011.7-.6l3 .5a2 2 0 011.7 2z" />
              </svg>

              <span>+91 9325217691</span>
            </a>
          </address>

          {/* Contact CTA */}
          <Link
            href="/contact"
            className="
              mt-7 inline-flex
              items-center gap-2
              rounded-lg border
              border-cyan-500/30
              bg-cyan-500/10
              px-4 py-2.5
              text-sm font-medium
              text-cyan-300
              transition-colors duration-200
              hover:bg-cyan-500/20
              focus-visible:outline-2
              focus-visible:outline-cyan-400
            "
          >
            Get in Touch
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>

      {/* Copyright Bar */}
      <div
        className="
          relative border-t
          border-indigo-900/30
          bg-black/10
        "
      >
        <div
          className="
            mx-auto flex max-w-7xl
            flex-col items-center
            justify-between gap-3
            px-6 py-5
            text-center sm:flex-row
            sm:text-left
          "
        >
          <p className="text-xs text-slate-400">
            © {COPYRIGHT_YEAR}{" "}
            <span className="font-medium text-cyan-400">AV Art Academy</span>.
            All rights reserved.
          </p>

          <p className="text-xs text-slate-500">Inspire. Create. Master.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
