"use client";

import { useState } from "react";

import { useAuth } from "../context/AuthProvider";
import type { AuthMode } from "../types";

interface AuthButtonProps {
  mode?: AuthMode;
  label?: string;
  className?: string;
  showSession?: boolean;
  onOpen?: () => void;
}

const defaultClassName = `
  inline-flex min-h-10
  items-center justify-center
  gap-2 rounded-xl
  bg-cyan-400 px-5 py-2.5
  text-sm font-bold text-[#061426]
  transition-colors
  hover:bg-cyan-300
`;

function AuthSkeleton({ showSession }: { showSession: boolean }) {
  if (!showSession) {
    return (
      <div
        role="status"
        aria-label="Checking authentication"
        className="h-10 w-24 animate-pulse rounded-xl bg-white/10"
      />
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Mobile skeleton */}
      <div className="h-9 w-9 animate-pulse rounded-full bg-white/10 md:hidden" />

      {/* Desktop skeleton */}
      <div className="hidden h-10 w-[180px] animate-pulse items-center gap-3 md:flex">
        <div className="h-9 w-9 rounded-full bg-white/10" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-3 w-[100px] rounded-md bg-white/15" />
          <div className="h-2.5 w-[45px] rounded-md bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export default function AuthButton({
  mode = "login",
  label,
  className = defaultClassName,
  showSession = false,
  onOpen,
}: AuthButtonProps) {
  const { user, isAuthenticated, isInitializing, openAuth, logout } = useAuth();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    if (isLoggingOut) return;

    setError("");
    setIsLoggingOut(true);

    try {
      await logout();
    } catch {
      setError("Could not sign out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  if (isInitializing) {
    return <AuthSkeleton showSession={showSession} />;
  }

  if (showSession && isAuthenticated) {
    const displayName =
      typeof user?.name === "string" && user.name.trim()
        ? user.name
        : "My Account";

    const initial = displayName.charAt(0).toUpperCase();

    return (
      <div className="min-w-0 shrink-0">
        {/* Mobile View - only avatar */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            title={isLoggingOut ? "Signing out..." : `${displayName} - Logout`}
            aria-label={isLoggingOut ? "Signing out" : `Logout ${displayName}`}
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full bg-cyan-400/15
              text-sm font-bold text-cyan-300
              transition-colors hover:bg-cyan-400/25
              disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            {initial}
          </button>
        </div>

        {/* Desktop View - avatar + name + logout */}
        <div className="hidden md:block">
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-full
                bg-cyan-400/15
                text-sm font-bold text-cyan-300
              "
            >
              {initial}
            </div>

            <div className="min-w-0">
              <p
                className="max-w-[150px] truncate text-xs font-semibold text-white"
                title={displayName}
              >
                {displayName}
              </p>

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="
                  mt-1 text-[11px]
                  font-medium text-slate-400
                  transition-colors
                  hover:text-cyan-300
                  disabled:opacity-50
                "
              >
                {isLoggingOut ? "Signing out..." : "Logout"}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="mt-2 text-xs text-red-300">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        openAuth(mode);
        onOpen?.();
      }}
      className={className}
    >
      {label || (mode === "signup" ? "Sign Up" : "Login")}
    </button>
  );
}
