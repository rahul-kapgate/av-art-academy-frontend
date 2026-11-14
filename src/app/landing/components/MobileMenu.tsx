"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import AuthButton from "@/src/features/auth/components/AuthButton";

import { useAuth } from "@/src/features/auth/context/AuthProvider";

type NavLink = {
  label: string;
  href: string;
};

type MobileMenuProps = {
  links: NavLink[];
};

/* =========================================
   LOGOUT ICON
========================================= */

function LogoutIcon() {
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
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M13 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" />
    </svg>
  );
}

/* =========================================
   CHEVRON ICON
========================================= */

function ChevronRightIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

/* =========================================
   MOBILE MENU
========================================= */

function MobileMenu({ links }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { user, isAuthenticated, isInitializing, logout } = useAuth();

  const closeMenu = () => setIsOpen(false);

  const displayName =
    typeof user?.name === "string" && user.name.trim()
      ? user.name.trim()
      : "My Account";

  const initial = displayName.charAt(0).toUpperCase();

  /* =======================================
     LOGOUT
  ======================================== */

  async function handleLogout() {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await logout();

      closeMenu();

      toast.success("Signed out successfully.");
    } catch {
      toast.error("Could not sign out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="lg:hidden">
      {/* =====================================
          MOBILE HEADER ACTIONS
      ====================================== */}

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Avatar skeleton during initialization */}
        {isInitializing && (
          <div
            aria-hidden="true"
            className="
              h-10 w-10 shrink-0
              animate-pulse rounded-full
              bg-white/10
              motion-reduce:animate-none
            "
          />
        )}

        {/* Logged-in user avatar */}
        {!isInitializing && isAuthenticated && (
          <Link
            href="/profile"
            onClick={closeMenu}
            aria-label={`View profile for ${displayName}`}
            title="My Profile"
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-full
              border border-cyan-400/15
              bg-cyan-400/15
              text-sm font-bold
              text-cyan-300
              transition-colors
              hover:bg-cyan-400/25
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-cyan-400
            "
          >
            {initial}
          </Link>
        )}

        {/* Hamburger / Close button */}
        <button
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          aria-controls={isOpen ? "mobile-navigation" : undefined}
          onClick={() => setIsOpen((previous) => !previous)}
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-lg
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
      </div>

      {/* =====================================
          MOBILE NAVIGATION PANEL
      ====================================== */}

      {isOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              closeMenu();
            }
          }}
          className="
            absolute inset-x-0 top-full
            max-h-[calc(100dvh-5rem)]
            overflow-y-auto
            overscroll-contain
            border-t border-blue-900/40
            bg-[#0a0f2c]
            shadow-xl
          "
        >
          <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6">
            {/* Navigation links */}
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
                    hover:bg-white/[0.02]
                    hover:text-cyan-300
                  "
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* =================================
                AUTHENTICATION SECTION
            ================================== */}

            <div className="mt-5">
              {/* Loading skeleton */}
              {isInitializing && (
                <div
                  role="status"
                  aria-label="Restoring session"
                  className="
                    flex animate-pulse
                    items-center gap-3
                    rounded-xl border
                    border-white/10
                    bg-white/5 p-4
                    motion-reduce:animate-none
                  "
                >
                  <div className="h-11 w-11 shrink-0 rounded-full bg-white/10" />

                  <div className="flex flex-1 flex-col gap-2">
                    <div className="h-3 w-32 rounded bg-white/15" />

                    <div className="h-2.5 w-20 rounded bg-white/10" />
                  </div>
                </div>
              )}

              {/* =================================
                  LOGGED-IN USER ACCOUNT
              ================================== */}

              {!isInitializing && isAuthenticated && (
                <div
                  className="
                    overflow-hidden
                    rounded-2xl
                    border border-white/10
                    bg-[#101A34]
                  "
                >
                  {/* Profile link */}
                  <Link
                    href="/profile"
                    onClick={closeMenu}
                    className="
                      flex min-w-0
                      items-center gap-3
                      p-4
                      transition-colors
                      hover:bg-white/5
                    "
                  >
                    {/* Avatar */}
                    <div
                      className="
                        flex h-12 w-12 shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-cyan-400/15
                        text-lg font-bold
                        text-cyan-300
                        ring-1 ring-cyan-400/10
                      "
                    >
                      {initial}
                    </div>

                    {/* Complete user name */}
                    <div className="min-w-0 flex-1">
                      <p
                        className="
                          break-words
                          text-sm font-semibold
                          leading-5 text-white
                        "
                      >
                        {displayName}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Student account
                      </p>
                    </div>

                    <span className="shrink-0 text-slate-400">
                      <ChevronRightIcon />
                    </span>
                  </Link>

                  {/* Divider */}
                  <div className="mx-4 h-px bg-white/10" />

                  {/* Logout button */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="
                      flex min-h-12 w-full
                      items-center gap-3
                      px-4 py-3
                      text-left text-sm
                      font-semibold
                      text-red-300
                      transition-colors
                      hover:bg-red-400/5
                      hover:text-red-200
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    {isLoggingOut ? (
                      <span
                        aria-hidden="true"
                        className="
                          h-4 w-4 animate-spin
                          rounded-full
                          border-2 border-current
                          border-t-transparent
                          motion-reduce:animate-none
                        "
                      />
                    ) : (
                      <LogoutIcon />
                    )}

                    <span>{isLoggingOut ? "Signing out..." : "Logout"}</span>
                  </button>
                </div>
              )}

              {/* =================================
                  GUEST USER LOGIN
              ================================== */}

              {!isInitializing && !isAuthenticated && (
                <AuthButton
                  mode="login"
                  label="Login / Sign Up"
                  onOpen={closeMenu}
                  className="
                    flex min-h-12 w-full
                    items-center justify-center
                    rounded-xl bg-cyan-400
                    px-5 py-3
                    text-sm font-bold
                    text-[#061426]
                    transition-colors
                    hover:bg-cyan-300
                  "
                />
              )}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}

export default MobileMenu;
