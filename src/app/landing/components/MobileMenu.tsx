"use client";

import Link from "next/link";
import { useState } from "react";
import AuthButton from "@/src/features/auth/components/AuthButton";

type NavLink = {
  label: string;
  href: string;
};

type MobileMenuProps = {
  links: NavLink[];
};

function MobileMenu({ links }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          flex h-10 w-10 items-center
          justify-center rounded-lg
          border border-blue-400/60
          text-cyan-300
          transition-colors
          hover:bg-white/10
          focus-visible:outline-2
          focus-visible:outline-cyan-400
        "
      >
        {isOpen ? (
          <svg
            aria-hidden="true"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="
            absolute inset-x-0 top-full
            max-h-[calc(100dvh-5rem)]
            overflow-y-auto
            border-t border-blue-900/40
            bg-[#0a0f2c]
            shadow-xl
          "
        >
          <div className="mx-auto max-w-7xl px-6 py-5">
            <div className="flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="
                    border-b border-white/10
                    px-2 py-4
                    text-base font-medium
                    text-gray-200
                    transition-colors
                    hover:text-cyan-300
                  "
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <AuthButton
              mode="login"
              label="Login / Sign Up"
              showSession
              onOpen={() => {
                // Use your existing mobile menu close handler.
                setIsOpen(false);
              }}
              className="
    flex min-h-12 w-full
    items-center justify-center
    rounded-xl bg-cyan-400
    px-5 py-3
    text-sm font-bold
    text-[#061426]
    hover:bg-cyan-300
    disabled:opacity-50
  "
            />
          </div>
        </nav>
      )}
    </div>
  );
}

export default MobileMenu;
