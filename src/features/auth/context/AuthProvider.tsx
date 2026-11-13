"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { authApi, AuthApiError } from "../api/authApi";

import AuthDialog from "../components/AuthDialog";

import type { AuthMode, AuthSession, AuthUser } from "../types";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitializing: boolean;

  openAuth: (mode?: AuthMode) => void;
  closeAuth: () => void;

  setAuthSession: (session: AuthSession) => void;

  getAccessToken: () => Promise<string | null>;

  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const [isInitializing, setIsInitializing] = useState(true);

  const [dialogMode, setDialogMode] = useState<AuthMode | null>(null);

  // Tokens remain in memory, never localStorage.
  const sessionRef = useRef<AuthSession | null>(null);

  const tokenExpiresAtRef = useRef(0);

  // Prevent duplicate refresh requests in this tab.
  const refreshPromiseRef = useRef<Promise<AuthSession | null> | null>(null);

  const initializedRef = useRef(false);

  /* =========================================
     APPLY SESSION
  ========================================== */
  const setAuthSession = useCallback((session: AuthSession) => {
    sessionRef.current = session;

    tokenExpiresAtRef.current =
      Date.now() + session.accessTokenExpiresIn * 1000;

    setUser(session.user);
  }, []);

  /* =========================================
     CLEAR SESSION
  ========================================== */
  const clearSession = useCallback(() => {
    sessionRef.current = null;
    tokenExpiresAtRef.current = 0;

    setUser(null);
  }, []);

  /* =========================================
     REFRESH SESSION
  ========================================== */
  const refreshSession = useCallback(() => {
    if (refreshPromiseRef.current) {
      return refreshPromiseRef.current;
    }

    const promise = (async () => {
      try {
        const session = await authApi.refresh();

        setAuthSession(session);

        return session;
      } catch (error) {
        if (
          error instanceof AuthApiError &&
          (error.status === 401 || error.status === 403)
        ) {
          clearSession();

          return null;
        }

        // Do not silently treat temporary network
        // failures as successful session revocation.
        throw error;
      } finally {
        refreshPromiseRef.current = null;
      }
    })();

    refreshPromiseRef.current = promise;

    return promise;
  }, [clearSession, setAuthSession]);

  /* =========================================
     RESTORE SESSION ON PAGE LOAD
  ========================================== */
  useEffect(() => {
    if (initializedRef.current) return;

    initializedRef.current = true;

    async function initialize() {
      try {
        await refreshSession();
      } catch {
        // The website remains usable as a guest
        // when session restoration is unavailable.
      } finally {
        setIsInitializing(false);
      }
    }

    void initialize();
  }, [refreshSession]);

  /* =========================================
     GET VALID ACCESS TOKEN
  ========================================== */
  const getAccessToken = useCallback(async (): Promise<string | null> => {
    const currentSession = sessionRef.current;

    const expiresSoon = Date.now() >= tokenExpiresAtRef.current - 30_000;

    if (currentSession && !expiresSoon) {
      return currentSession.accessToken;
    }

    const refreshedSession = await refreshSession();

    return refreshedSession?.accessToken ?? null;
  }, [refreshSession]);

  /* =========================================
     OPEN / CLOSE AUTH DIALOG
  ========================================== */
  const openAuth = useCallback((mode: AuthMode = "login") => {
    setDialogMode(mode);
  }, []);

  const closeAuth = useCallback(() => {
    setDialogMode(null);
  }, []);

  /* =========================================
     LOGOUT
  ========================================== */
  const logout = useCallback(async () => {
    // Wait for any already-running refresh request.
    if (refreshPromiseRef.current) {
      await refreshPromiseRef.current;
    }

    const accessToken = sessionRef.current?.accessToken;

    await authApi.logout(accessToken);

    clearSession();
    closeAuth();
  }, [clearSession, closeAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isInitializing,
        openAuth,
        closeAuth,
        setAuthSession,
        getAccessToken,
        logout,
      }}
    >
      {children}

      {/* Only one authentication dialog globally */}
      {dialogMode && (
        <AuthDialog
          key={dialogMode}
          initialMode={dialogMode}
          onClose={closeAuth}
          onAuthenticated={(session) => {
            setAuthSession(session);
            closeAuth();
          }}
        />
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
