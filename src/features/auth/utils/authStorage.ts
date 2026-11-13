import "client-only";

import type { AuthSession, AuthUser } from "../types";

const SESSION_KEY = "av_academy_session";

export interface StoredSession extends AuthSession {
  expiresAt: number;
}

export const authStorage = {
  /* Get saved session */

  getSession(): StoredSession | null {
    try {
      const stored = localStorage.getItem(SESSION_KEY);

      if (!stored) return null;

      const session = JSON.parse(stored) as StoredSession;

      if (
        !session?.user ||
        typeof session.user !== "object" ||
        typeof session.accessToken !== "string" ||
        !session.accessToken ||
        !Number.isFinite(session.expiresAt)
      ) {
        return null;
      }

      return session;
    } catch {
      return null;
    }
  },

  /* Save session */

  setSession(session: StoredSession): void {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {
      // Continue using in-memory authentication
      // if localStorage is unavailable.
    }
  },

  /* Get cached user */

  getUser(): AuthUser | null {
    return this.getSession()?.user ?? null;
  },

  /* Check access token expiry */

  isTokenExpired(session: StoredSession): boolean {
    return Date.now() >= session.expiresAt;
  },

  /* Clear authentication */

  clearSession(): void {
    try {
      localStorage.removeItem(SESSION_KEY);

      // Remove the old user-only storage.
      localStorage.removeItem("av_academy_user");
    } catch {
      // Ignore storage errors.
    }
  },
};
