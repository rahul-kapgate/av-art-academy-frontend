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
  disabled:cursor-not-allowed
  disabled:opacity-50
`;

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

  if (showSession && isAuthenticated) {
    const displayName =
      typeof user?.name === "string" ? user.name : "My Account";

    return (
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          {/* User Avatar */}
          <div
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-full
              bg-cyan-400/15
              text-sm font-bold text-cyan-300
            "
          >
            {displayName.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <p
              className="
                max-w-[150px] truncate
                text-xs font-semibold
                text-white
              "
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
    );
  }

  return (
    <button
      type="button"
      disabled={isInitializing}
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
