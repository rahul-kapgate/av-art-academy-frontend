import { apiRequest } from "@/src/lib/api/client";
import { ApiError } from "@/src/lib/api/apiError";
import { getDeviceId } from "@/src/lib/device";

import { authStorage } from "../utils/authStorage";

import type {
  AuthSession,
  LoginRequest,
  RegisterRequest,
  RegistrationChallenge,
  VerifyRegistrationRequest,
  RegisterVerificationResponse,
  ResendRegistrationRequest,
  ResendRegistrationResponse,
  RefreshResponse,
  AuthUser,
  ForgotPasswordRequest,
  VerifyPasswordResetRequest,
  VerifyPasswordResetResponse,
  ResetPasswordRequest,
} from "../types";

// Keep compatibility with existing AuthDialog
// and AuthProvider imports.
export { ApiError as AuthApiError } from "@/src/lib/api/apiError";

/* =========================================
   WEB DEVICE INFORMATION
========================================== */

function getWebDeviceInfo() {
  return {
    deviceId: getDeviceId(),
    platform: "web" as const,
  };
}

/* =========================================
   VALIDATE AUTHENTICATION SESSION
========================================== */

function validateSession(session: AuthSession): AuthSession {
  if (
    !session?.user ||
    typeof session.accessToken !== "string" ||
    !session.accessToken ||
    !Number.isFinite(session.accessTokenExpiresIn) ||
    session.accessTokenExpiresIn <= 0
  ) {
    throw new ApiError("Invalid authentication session.", 502);
  }

  return {
    user: session.user,
    accessToken: session.accessToken,
    accessTokenExpiresIn: session.accessTokenExpiresIn,
    sessionExpiresAt: session.sessionExpiresAt,
  };
}

/* =========================================
   AUTHENTICATION API
========================================== */

export const authApi = {
  /* =======================================
     REGISTER
  ======================================= */

  register(payload: RegisterRequest) {
    return apiRequest<RegistrationChallenge>({
      method: "POST",
      url: "/auth/register",
      data: payload,
    });
  },

  /* =======================================
     VERIFY REGISTRATION OTP
  ======================================= */

  verifyRegistration(payload: VerifyRegistrationRequest) {
    return apiRequest<RegisterVerificationResponse>({
      method: "POST",
      url: "/auth/register/verify",
      data: payload,
    });
  },

  /* =======================================
     RESEND REGISTRATION OTP
  ======================================= */

  resendRegistration(payload: ResendRegistrationRequest) {
    return apiRequest<ResendRegistrationResponse>({
      method: "POST",
      url: "/auth/register/resend",
      data: payload,
    });
  },

  /* =======================================
     LOGIN
  ======================================= */

  async login(payload: LoginRequest): Promise<AuthSession> {
    const session = await apiRequest<AuthSession>({
      method: "POST",
      url: "/auth/login",

      data: {
        ...payload,
        ...getWebDeviceInfo(),
      },
    });

    return validateSession(session);
  },

  /* =======================================
     GOOGLE LOGIN
  ======================================= */

  async google(idToken: string): Promise<AuthSession> {
    const session = await apiRequest<AuthSession>({
      method: "POST",
      url: "/auth/google",

      data: {
        idToken,
        ...getWebDeviceInfo(),
      },
    });

    return validateSession(session);
  },

  /* =======================================
     REFRESH ACCESS TOKEN
  ======================================= */

  async refresh(currentUser?: AuthUser): Promise<AuthSession> {
    const result = await apiRequest<RefreshResponse>({
      method: "POST",
      url: "/auth/refresh",
      data: getWebDeviceInfo(),
    });

    if (
      !result ||
      typeof result.accessToken !== "string" ||
      !result.accessToken ||
      !Number.isFinite(result.accessTokenExpiresIn) ||
      result.accessTokenExpiresIn <= 0
    ) {
      throw new ApiError("Invalid refresh session.", 502);
    }

    return validateSession({
      user: result.user ??
        currentUser ??
        authStorage.getUser() ?? { name: "My Account" },

      accessToken: result.accessToken,

      accessTokenExpiresIn: result.accessTokenExpiresIn,

      sessionExpiresAt: result.sessionExpiresAt,
    });
  },

  /* =======================================
     LOGOUT
  ======================================= */

  async logout(accessToken?: string): Promise<void> {
    await apiRequest<void>(
      {
        method: "POST",
        url: "/auth/logout",

        data: getWebDeviceInfo(),

        headers: accessToken
          ? {
              Authorization: `Bearer ${accessToken}`,
            }
          : undefined,
      },
      true,
    );
  },

  /* =========================================
   REQUEST PASSWORD RESET OTP
========================================== */

  forgotPassword(payload: ForgotPasswordRequest): Promise<void> {
    return apiRequest<void>(
      {
        method: "POST",
        url: "/auth/forgot-password/request",
        data: payload,
      },
      true,
    );
  },

  /* =========================================
   VERIFY PASSWORD RESET OTP
========================================== */

  verifyPasswordReset(
    payload: VerifyPasswordResetRequest,
  ): Promise<VerifyPasswordResetResponse> {
    return apiRequest<VerifyPasswordResetResponse>({
      method: "POST",
      url: "/auth/forgot-password/verify",
      data: payload,
    });
  },

  /* =========================================
   RESET PASSWORD
========================================== */

  resetPassword(payload: ResetPasswordRequest): Promise<void> {
    return apiRequest<void>(
      {
        method: "POST",
        url: "/auth/forgot-password/reset",
        data: payload,
      },
      true,
    );
  },
};
