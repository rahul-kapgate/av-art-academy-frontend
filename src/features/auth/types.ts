export type AuthMode = "login" | "signup";

export type AuthStep = AuthMode | "verify" | "forgot";

export interface AuthUser {
  id?: string;
  name?: string;
  email?: string;
  mobile?: string;

  [key: string]: unknown;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

export interface RegistrationChallenge {
  pendingUserId: string;
  verificationId: string;
  expiresIn: number;
  resendAfter: number;
}

export interface VerifyRegistrationRequest {
  pendingUserId: string;
  verificationId: string;
  otp: string;
}

export interface ResendRegistrationRequest {
  pendingUserId: string;
}

export interface ResendRegistrationResponse {
  verificationId: string;
  expiresIn: number;
  resendAfter: number;
}

export interface RegisterVerificationResponse {
  user: AuthUser;
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
  accessTokenExpiresIn: number;
  sessionExpiresAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}



export type Platform =
  | "web"
  | "android"
  | "ios";

export interface DeviceInfo {
  deviceId: string;
  platform: Platform;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginPayload
  extends LoginRequest,
    DeviceInfo {}

export interface GoogleLoginPayload
  extends DeviceInfo {
  idToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  accessTokenExpiresIn: number;
  sessionExpiresAt?: string;

  user?: AuthUser;
}



/* =========================================
   FORGOT PASSWORD
========================================== */

export interface ForgotPasswordRequest {
  email: string;
}

/* =========================================
   VERIFY PASSWORD RESET OTP
========================================== */

export interface VerifyPasswordResetRequest {
  email: string;
  otp: string;
}

export interface VerifyPasswordResetResponse {
  resetToken: string;
  expiresIn: number;
  resetSessionId: string;
}

/* =========================================
   RESET PASSWORD
========================================== */

export interface ResetPasswordRequest {
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
}
