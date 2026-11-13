import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import AuthButton from "@/src/features/auth/components/AuthButton";

const navLinks = [
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQs", href: "/#faqs" },
];

function Header() {
  return (
    <header
      className="
        sticky top-0 z-50 w-full
        border-b border-blue-900/40
        bg-gradient-to-r
        from-[#0a0f2c]
        via-[#10194f]
        to-[#1a237e]
        shadow-md
      "
    >
      <div
        className="
          mx-auto flex h-20 max-w-7xl
          items-center justify-between
          gap-5 px-4 sm:px-6
        "
      >
        {/* Brand */}
        <Link
          href="/"
          aria-label="AV Art Academy - Home"
          className="
            group flex shrink-0
            items-center gap-3
          "
        >
          <Image
            src="/logo.jpeg"
            alt="AV Art Academy logo"
            width={44}
            height={44}
            loading="eager"
            sizes="44px"
            className="
              h-11 w-11 rounded-lg
              object-contain
              transition-transform duration-200
              group-hover:scale-105
            "
          />

          <div className="flex flex-col leading-tight">
            <span
              className="
                text-lg font-bold
                tracking-tight sm:text-xl
                md:text-2xl
              "
            >
              <span className="text-cyan-400">AV Art</span>
              <span className="text-white"> Academy</span>
            </span>

            <span
              className="
                hidden text-[10px]
                uppercase tracking-widest
                text-gray-400 sm:block
              "
            >
              Inspire. Create. Master.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="
            hidden items-center
            gap-8 lg:flex
          "
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="
                text-base font-medium
                text-gray-200
                transition-colors duration-200
                hover:text-cyan-300
                focus-visible:rounded
                focus-visible:outline-2
                focus-visible:outline-cyan-400
              "
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Login */}

        <AuthButton
          mode="login"
          showSession
          className="
    inline-flex min-h-10
    items-center justify-center
    rounded-lg bg-cyan-400
    px-5 py-2.5
    text-sm font-bold
    text-[#061426]
    transition-colors
    hover:bg-cyan-300
    disabled:cursor-not-allowed
    disabled:opacity-50
  "
        />

        {/* Interactive Mobile Menu */}
        <MobileMenu links={navLinks} />
      </div>
    </header>
  );
}

export default Header;
