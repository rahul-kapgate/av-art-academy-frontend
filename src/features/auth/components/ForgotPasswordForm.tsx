"use client";

import { useEffect, useState, type FormEvent } from "react";

import { toast } from "sonner";

import { authApi, AuthApiError } from "../api/authApi";

import type { VerifyPasswordResetResponse } from "../types";

/* =========================================
   TYPES
========================================== */

type RecoveryStep = "email" | "otp" | "password";

interface ForgotPasswordFormProps {
  initialEmail?: string;

  busy: boolean;

  runRequest: (action: () => Promise<void>) => Promise<void>;

  onError: (message: string) => void;

  onBack: () => void;

  onComplete: (email: string) => void;
}

/* =========================================
   COMMON STYLES
========================================== */

const inputClassName = `
  h-12 w-full min-w-0
  rounded-xl border border-white/10
  bg-[#080D1D]
  px-4 text-base text-white
  outline-none transition-colors
  placeholder:text-slate-500
  focus:border-cyan-400/60
  focus:ring-2 focus:ring-cyan-400/10
  disabled:cursor-not-allowed
  disabled:opacity-60
`;

const buttonClassName = `
  flex min-h-12 w-full
  items-center justify-center gap-2
  rounded-xl bg-cyan-400
  px-5 py-3
  text-sm font-bold text-[#061426]
  transition-colors
  hover:bg-cyan-300
  disabled:cursor-not-allowed
  disabled:opacity-50
`;

const labelClassName = `
  mb-2 block text-xs
  font-semibold text-slate-200
`;

const textButtonClassName = `
  text-xs font-semibold
  text-cyan-300
  hover:text-cyan-200
  disabled:cursor-not-allowed
  disabled:opacity-50
`;

const GENERIC_OTP_MESSAGE =
  "If an account exists for this email, a verification code has been sent.";

// Frontend resend cooldown.
// Backend rate limiting remains authoritative.
const RESEND_COOLDOWN_SECONDS = 60;

const steps: {
  id: RecoveryStep;
  label: string;
}[] = [
  { id: "email", label: "Email" },
  { id: "otp", label: "Verification" },
  { id: "password", label: "New password" },
];

/* =========================================
   LOADING SPINNER
========================================== */

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="
        h-4 w-4 animate-spin
        rounded-full border-2
        border-current border-t-transparent
        motion-reduce:animate-none
      "
    />
  );
}

/* =========================================
   COUNTDOWN
========================================== */

function formatCountdown(seconds: number) {
  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
}

/* =========================================
   FORGOT PASSWORD FORM
========================================== */

export default function ForgotPasswordForm({
  initialEmail = "",
  busy,
  runRequest,
  onError,
  onBack,
  onComplete,
}: ForgotPasswordFormProps) {
  const [step, setStep] = useState<RecoveryStep>("email");

  const [email, setEmail] = useState(initialEmail);

  const [otp, setOtp] = useState("");

  const [resetSession, setResetSession] =
    useState<VerifyPasswordResetResponse | null>(null);

  const [resendAvailableAt, setResendAvailableAt] = useState(0);

  const [resetExpiresAt, setResetExpiresAt] = useState(0);

  const [now, setNow] = useState(0);

  const [showPassword, setShowPassword] = useState(false);

  /* =======================================
     COUNTDOWN TIMER
  ======================================== */

  useEffect(() => {
    if (step === "email") return;

    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [step]);

  const resendSeconds = Math.max(
    0,
    Math.ceil((resendAvailableAt - now) / 1000),
  );

  const resetSeconds = Math.max(0, Math.ceil((resetExpiresAt - now) / 1000));

  const resetExpired = step === "password" && resetSeconds === 0;

  const activeStepIndex = steps.findIndex((item) => item.id === step);

  /* =======================================
     STEP 1: REQUEST OTP
  ======================================== */

  function handleRequestOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      onError("Please enter your email address.");
      return;
    }

    void runRequest(async () => {
      await authApi.forgotPassword({
        email: normalizedEmail,
      });

      const currentTime = Date.now();

      setEmail(normalizedEmail);
      setNow(currentTime);

      setResendAvailableAt(currentTime + RESEND_COOLDOWN_SECONDS * 1000);

      setOtp("");
      setStep("otp");

      // Do not reveal whether the account exists.
      toast.success("Request accepted", {
        description: GENERIC_OTP_MESSAGE,
        toasterId: "auth-toaster",
      });
    });
  }

  /* =======================================
     RESEND OTP
  ======================================== */

  function handleResendOtp() {
    if (busy || Date.now() < resendAvailableAt) {
      return;
    }

    void runRequest(async () => {
      await authApi.forgotPassword({
        email,
      });

      const currentTime = Date.now();

      setNow(currentTime);

      setResendAvailableAt(currentTime + RESEND_COOLDOWN_SECONDS * 1000);

      setOtp("");

      toast.success("Request accepted", {
        description: GENERIC_OTP_MESSAGE,
        toasterId: "auth-toaster",
      });
    });
  }

  /* =======================================
     STEP 2: VERIFY OTP
  ======================================== */

  function handleVerifyOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
      onError("Please enter a valid 6-digit verification code.");

      return;
    }

    void runRequest(async () => {
      const result = await authApi.verifyPasswordReset({
        email,
        otp,
      });

      // Validate the temporary reset session.
      if (
        !result ||
        typeof result.resetToken !== "string" ||
        !result.resetToken ||
        !Number.isFinite(result.expiresIn) ||
        result.expiresIn <= 0
      ) {
        throw new AuthApiError("Invalid password reset session.", 502);
      }

      const currentTime = Date.now();

      // Keep resetToken in component state only.
      setResetSession(result);

      setNow(currentTime);

      setResetExpiresAt(currentTime + result.expiresIn * 1000);

      setOtp("");
      setShowPassword(false);
      setStep("password");

      toast.success("Verification successful", {
        description: "You can now create a new password.",
        toasterId: "auth-toaster",
      });
    });
  }

  /* =======================================
     STEP 3: RESET PASSWORD
  ======================================== */

  function handleResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!resetSession || Date.now() >= resetExpiresAt) {
      onError("Your password reset session has expired. Please start again.");

      return;
    }

    const formData = new FormData(event.currentTarget);

    const newPassword = String(formData.get("newPassword") ?? "");

    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (newPassword.length < 8) {
      onError("Password must contain at least 8 characters.");

      return;
    }

    if (newPassword !== confirmPassword) {
      onError("Passwords do not match.");

      return;
    }

    void runRequest(async () => {
      await authApi.resetPassword({
        resetToken: resetSession.resetToken,
        newPassword,
        confirmPassword,
      });

      // Remove the temporary reset credentials.
      setResetSession(null);
      setResetExpiresAt(0);
      setOtp("");

      toast.success("Password changed successfully!", {
        description: "Sign in using your new password.",
        toasterId: "auth-toaster",
      });

      // Return to login with email prefilled.
      onComplete(email);
    });
  }

  /* =======================================
     START AGAIN
  ======================================== */

  function restartRecovery() {
    if (busy) return;

    setOtp("");
    setResetSession(null);
    setResetExpiresAt(0);
    setShowPassword(false);
    setStep("email");
  }

  return (
    <div className="mt-5">
      {/* =====================================
          STEP INDICATOR
      ====================================== */}

      <div
        aria-label={`Step ${activeStepIndex + 1} of 3`}
        className="
          mb-6 grid grid-cols-3 gap-2
          rounded-xl border border-white/5
          bg-[#080D1D]/60 p-3
        "
      >
        {steps.map((item, index) => (
          <div
            key={item.id}
            aria-current={step === item.id ? "step" : undefined}
            className="min-w-0"
          >
            <div
              className={`
                h-1 rounded-full
                ${index <= activeStepIndex ? "bg-cyan-400" : "bg-white/10"}
              `}
            />

            <p
              className={`
                mt-2 text-[10px]
                font-medium
                ${step === item.id ? "text-cyan-300" : "text-slate-400"}
              `}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* =====================================
          STEP 1: EMAIL
      ====================================== */}

      {step === "email" && (
        <form key="email" onSubmit={handleRequestOtp} className="space-y-5">
          <div>
            <h3 className="text-lg font-bold text-white">Find your account</h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Enter your registered email address to request a password reset
              code.
            </p>
          </div>

          <div>
            <label htmlFor="recovery-email" className={labelClassName}>
              Email address
            </label>

            <input
              id="recovery-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={busy}
              className={inputClassName}
            />
          </div>

          <button type="submit" disabled={busy} className={buttonClassName}>
            {busy && <Spinner />}

            {busy ? "Sending verification code..." : "Send Verification Code"}
          </button>
        </form>
      )}

      {/* =====================================
          STEP 2: OTP VERIFICATION
      ====================================== */}

      {step === "otp" && (
        <form key="otp" onSubmit={handleVerifyOtp} className="space-y-5">
          <div className="text-center">
            <div
              className="
                mx-auto mb-4 flex h-14 w-14
                items-center justify-center
                rounded-2xl border
                border-cyan-400/20
                bg-cyan-400/10
                text-cyan-300
              "
            >
              <svg
                aria-hidden="true"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />

                <path d="m3 7 9 6 9-6" />
              </svg>
            </div>

            <h3 className="text-lg font-bold text-white">Check your email</h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {GENERIC_OTP_MESSAGE}
            </p>

            <p className="mt-2 break-all text-sm font-semibold text-cyan-300">
              {email}
            </p>

            <button
              type="button"
              onClick={restartRecovery}
              disabled={busy}
              className={`mt-2 ${textButtonClassName}`}
            >
              Change email address
            </button>
          </div>

          <div>
            <label htmlFor="recovery-otp" className={labelClassName}>
              Verification code
            </label>

            <input
              id="recovery-otp"
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              value={otp}
              onChange={(event) =>
                setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="000000"
              required
              disabled={busy}
              className="
                h-16 w-full
                rounded-xl border
                border-white/10
                bg-[#080D1D]
                px-4 text-center
                font-mono text-2xl
                font-bold tracking-[0.3em]
                text-white outline-none
                placeholder:text-slate-700
                focus:border-cyan-400/60
                focus:ring-2
                focus:ring-cyan-400/10
              "
            />
          </div>

          <button
            type="submit"
            disabled={busy || otp.length !== 6}
            className={buttonClassName}
          >
            {busy && <Spinner />}

            {busy ? "Verifying..." : "Verify Code"}
          </button>

          <div
            className="
              rounded-xl border
              border-white/5
              bg-[#080D1D]/60
              p-4 text-center
            "
          >
            <p className="text-xs text-slate-400">
              Didn&apos;t receive the code?
            </p>

            <button
              type="button"
              onClick={handleResendOtp}
              disabled={busy || resendSeconds > 0}
              className={`mt-2 ${textButtonClassName}`}
            >
              {resendSeconds > 0
                ? `Resend in ${formatCountdown(resendSeconds)}`
                : "Resend verification code"}
            </button>
          </div>
        </form>
      )}

      {/* =====================================
          STEP 3: NEW PASSWORD
      ====================================== */}

      {step === "password" && (
        <form
          key="password"
          onSubmit={handleResetPassword}
          className="space-y-5"
        >
          <div>
            <h3 className="text-lg font-bold text-white">
              Create a new password
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Choose a strong password that you haven&apos;t used before.
            </p>
          </div>

          {/* New password */}
          <div>
            <label htmlFor="new-password" className={labelClassName}>
              New password
            </label>

            <input
              id="new-password"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Enter new password"
              minLength={8}
              required
              disabled={busy || resetExpired}
              className={inputClassName}
            />

            <p className="mt-2 text-[11px] leading-5 text-slate-400">
              Use at least 8 characters and a strong, unique password.
            </p>
          </div>

          {/* Confirm password */}
          <div>
            <label htmlFor="confirm-new-password" className={labelClassName}>
              Confirm password
            </label>

            <input
              id="confirm-new-password"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Re-enter new password"
              minLength={8}
              required
              disabled={busy || resetExpired}
              className={inputClassName}
            />
          </div>

          {/* Show passwords */}
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(event) => setShowPassword(event.target.checked)}
              className="h-4 w-4 accent-cyan-400"
            />

            <span className="text-xs text-slate-400">Show passwords</span>
          </label>

          {/* Reset session expiry */}
          <div className="text-center">
            {resetExpired ? (
              <p className="text-xs font-medium text-red-300">
                Your reset session has expired.
              </p>
            ) : (
              <p className="text-xs text-slate-400">
                Reset session expires in{" "}
                <span className="font-semibold tabular-nums text-cyan-300">
                  {formatCountdown(resetSeconds)}
                </span>
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={busy || resetExpired || !resetSession}
            className={buttonClassName}
          >
            {busy && <Spinner />}

            {busy ? "Changing password..." : "Reset Password"}
          </button>

          {resetExpired && (
            <button
              type="button"
              onClick={restartRecovery}
              disabled={busy}
              className={`w-full ${textButtonClassName}`}
            >
              Request a new verification code
            </button>
          )}
        </form>
      )}

      {/* =====================================
          BACK TO LOGIN
      ====================================== */}

      <div className="mt-6 border-t border-white/10 pt-5 text-center">
        <p className="text-xs leading-6 text-slate-400">
          Remember your password?{" "}
          <button
            type="button"
            onClick={onBack}
            disabled={busy}
            className={textButtonClassName}
          >
            Back to Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
