
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

import { authApi } from "../api/authApi";

import { ApiError } from "@/src/lib/api/apiError";

import {
  configureApiAuth,
} from "@/src/lib/api/client";

import {
  authStorage,
  type StoredSession,
} from "../utils/authStorage";

import AuthDialog from "../components/AuthDialog";

import type {
  AuthMode,
  AuthSession,
  AuthUser,
} from "../types";

/* =========================================
   AUTH CONTEXT
========================================== */

interface AuthContextValue {
  user: AuthUser | null;

  isAuthenticated: boolean;

  isInitializing: boolean;

  openAuth: (mode?: AuthMode) => void;

  closeAuth: () => void;

  setAuthSession: (
    session: AuthSession,
  ) => void;

  getAccessToken: (
    rejectedToken?: string,
  ) => Promise<string | null>;

  logout: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextValue | null>(null);

/* =========================================
   AUTH PROVIDER
========================================== */

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [
    isInitializing,
    setIsInitializing,
  ] = useState(true);

  const [dialogMode, setDialogMode] =
    useState<AuthMode | null>(null);

  // Current session in memory.
  const sessionRef =
    useRef<StoredSession | null>(null);

  // Prevent duplicate refresh calls.
  const refreshPromiseRef =
    useRef<Promise<StoredSession | null> | null>(
      null,
    );

  // Prevent duplicate initialization.
  const initializedRef = useRef(false);

  const loggingOutRef = useRef(false);

  /* =======================================
     SAVE AUTH SESSION
  ======================================== */

  const setAuthSession = useCallback(
    (session: AuthSession) => {
      const storedSession: StoredSession = {
        user: {
          id: session.user.id,
          name: session.user.name,
        },

        accessToken: session.accessToken,

        accessTokenExpiresIn:
          session.accessTokenExpiresIn,

        sessionExpiresAt:
          session.sessionExpiresAt,

        expiresAt:
          Date.now() +
          session.accessTokenExpiresIn * 1000,
      };

      // Save in memory.
      sessionRef.current = storedSession;

      // Persist session in localStorage.
      authStorage.setSession(storedSession);

      // Update React state.
      setUser(storedSession.user);
    },
    [],
  );

  /* =======================================
     CLEAR AUTH SESSION
  ======================================== */

  const clearSession = useCallback(() => {
    sessionRef.current = null;

    authStorage.clearSession();

    setUser(null);
  }, []);

  /* =======================================
     REFRESH ACCESS TOKEN
  ======================================== */

  const refreshSession = useCallback(() => {
    // Reuse an already-running refresh request.
    if (refreshPromiseRef.current) {
      return refreshPromiseRef.current;
    }

    // Do not refresh for guest users.
    if (!sessionRef.current) {
      return Promise.resolve(null);
    }

    const currentUser =
      sessionRef.current.user;

    const promise = (async () => {
      try {
        const session =
          await authApi.refresh(currentUser);

        // Save the new access token,
        // expiry and user information.
        setAuthSession(session);

        return sessionRef.current;
      } catch (error) {
        // Clear authentication only when
        // the backend rejects the session.
        if (
          error instanceof ApiError &&
          (
            error.status === 401 ||
            error.status === 403
          )
        ) {
          clearSession();

          return null;
        }

        // Network/server errors can be retried.
        throw error;
      } finally {
        refreshPromiseRef.current = null;
      }
    })();

    refreshPromiseRef.current = promise;

    return promise;
  }, [setAuthSession, clearSession]);

  /* =======================================
     GET VALID ACCESS TOKEN
  ======================================== */

  const getAccessToken = useCallback(
    async (
      rejectedToken?: string,
    ): Promise<string | null> => {
      if (loggingOutRef.current) {
        return null;
      }

      const currentSession =
        sessionRef.current;

      if (!currentSession) {
        return null;
      }

      const isExpired =
        authStorage.isTokenExpired(
          currentSession,
        );

      // Return the existing token if valid.
      if (
        !isExpired &&
        currentSession.accessToken !==
          rejectedToken
      ) {
        return currentSession.accessToken;
      }

      // Refresh only when the token has
      // expired or the backend rejected it.
      const refreshedSession =
        await refreshSession();

      return (
        refreshedSession?.accessToken ??
        null
      );
    },
    [refreshSession],
  );

  /* =======================================
     CONNECT AXIOS INTERCEPTORS
  ======================================== */

  useEffect(() => {
    return configureApiAuth(getAccessToken);
  }, [getAccessToken]);

  /* =======================================
     INITIALIZE AUTHENTICATION
  ======================================== */

  useEffect(() => {
    if (initializedRef.current) return;

    initializedRef.current = true;

    async function initializeAuth() {
      try {
        const savedSession =
          authStorage.getSession();

        // CASE 1:
        // Guest user. No API call.
        if (!savedSession) {
          return;
        }

        // Restore the saved session into memory.
        sessionRef.current = savedSession;

        const isExpired =
          authStorage.isTokenExpired(
            savedSession,
          );

        // CASE 2:
        // Access token is still valid.
        // Restore user without calling refresh API.
        if (!isExpired) {
          setUser(savedSession.user);

          return;
        }

        // CASE 3:
        // Access token expired.
        // Refresh once using HttpOnly cookie.
        await refreshSession();
      } catch (error) {
        console.error(
          "Authentication initialization failed:",
          error instanceof Error
            ? error.message
            : "Unknown error",
        );
      } finally {
        setIsInitializing(false);
      }
    }

    void initializeAuth();
  }, [refreshSession]);

  /* =======================================
     AUTH DIALOG
  ======================================== */

  const openAuth = useCallback(
    (mode: AuthMode = "login") => {
      setDialogMode(mode);
    },
    [],
  );

  const closeAuth = useCallback(() => {
    setDialogMode(null);
  }, []);

  /* =======================================
     LOGOUT
  ======================================== */

  const logout = useCallback(async () => {
    if (loggingOutRef.current) return;

    loggingOutRef.current = true;

    try {
      // Wait for an existing refresh to finish.
      // Do not start a new refresh for logout.
      if (refreshPromiseRef.current) {
        try {
          await refreshPromiseRef.current;
        } catch {
          // Still attempt backend logout.
        }
      }

      const accessToken =
        sessionRef.current?.accessToken;

      await authApi.logout(accessToken);

      clearSession();

      closeAuth();
    } finally {
      loggingOutRef.current = false;
    }
  }, [clearSession, closeAuth]);

  /* =======================================
     RENDER
  ======================================== */

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

/* =========================================
   USE AUTH HOOK
========================================== */

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider.",
    );
  }

  return context;
}
