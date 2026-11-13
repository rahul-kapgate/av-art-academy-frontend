import { apiRequest } from "@/src/lib/api/client";
import { ApiError } from "@/src/lib/api/apiError";

import type {
  AuthSession,
  LoginRequest,
  RegisterRequest,
  RegistrationChallenge,
  VerifyRegistrationRequest,
  RegisterVerificationResponse,
  ResendRegistrationRequest,
  ResendRegistrationResponse,
} from "../types";

// Keep compatibility with existing AuthDialog
// and AuthProvider imports.
export { ApiError as AuthApiError } from "@/src/lib/api/apiError";

const WEB_CLIENT = {
  clientType: "web",
} as const;

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

export const authApi = {
  /* Register */

  register(payload: RegisterRequest) {
    return apiRequest<RegistrationChallenge>({
      method: "POST",
      url: "/auth/register",
      data: payload,
    });
  },

  /* Verify Registration OTP */

  verifyRegistration(payload: VerifyRegistrationRequest) {
    return apiRequest<RegisterVerificationResponse>({
      method: "POST",
      url: "/auth/register/verify",
      data: payload,
    });
  },

  /* Resend Registration OTP */

  resendRegistration(payload: ResendRegistrationRequest) {
    return apiRequest<ResendRegistrationResponse>({
      method: "POST",
      url: "/auth/register/resend",
      data: payload,
    });
  },

  /* Login */

  async login(payload: LoginRequest) {
    const session = await apiRequest<AuthSession>({
      method: "POST",
      url: "/auth/login",
      data: {
        ...payload,
        ...WEB_CLIENT,
      },
    });

    return validateSession(session);
  },

  /* Google Login */

  async google(idToken: string) {
    const session = await apiRequest<AuthSession>({
      method: "POST",
      url: "/auth/google",
      data: {
        idToken,
        ...WEB_CLIENT,
      },
    });

    return validateSession(session);
  },

  /* Refresh Access Token */

  async refresh() {
    const session = await apiRequest<AuthSession>({
      method: "POST",
      url: "/auth/refresh",
      data: WEB_CLIENT,
    });

    return validateSession(session);
  },

  /* Logout */

  logout(accessToken?: string) {
    return apiRequest<void>(
      {
        method: "POST",
        url: "/auth/logout",
        data: WEB_CLIENT,

        headers: accessToken
          ? {
              Authorization: `Bearer ${accessToken}`,
            }
          : undefined,
      },
      true,
    );
  },
};
