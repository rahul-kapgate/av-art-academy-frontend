
"use client";

import Link from "next/link";

import { useAuth } from "@/src/features/auth/context/AuthProvider";

export default function CourseEnrollmentAction({
  isFree,
}: {
  isFree: boolean;
}) {
  const {
    isAuthenticated,
    isInitializing,
    openAuth,
  } = useAuth();

  const buttonClassName = `
    flex min-h-12 w-full
    items-center justify-center gap-2
    rounded-xl bg-cyan-400
    px-5 py-3
    text-sm font-bold text-[#061426]
    transition-colors
    hover:bg-cyan-300
    focus-visible:outline-2
    focus-visible:outline-offset-4
    focus-visible:outline-cyan-400
  `;

  if (isInitializing) {
    return (
      <div
        role="status"
        aria-label="Checking account"
        className="
          h-12 w-full animate-pulse
          rounded-xl bg-white/10
          motion-reduce:animate-none
        "
      />
    );
  }

  if (isAuthenticated) {
    return (
      <Link
        href="/contact"
        className={buttonClassName}
      >
        Enquire About Enrollment

        <ArrowIcon />
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => openAuth("login")}
      className={buttonClassName}
    >
      {isFree
        ? "Sign In to Get Started"
        : "Sign In to Enroll"}

      <ArrowIcon />
    </button>
  );
}

function ArrowIcon() {
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
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
