"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import { authApi, AuthApiError } from "../api/authApi";

import GoogleSignIn from "./GoogleSignIn";

import type {
  AuthMode,
  AuthStep,
  AuthSession,
  RegistrationChallenge,
} from "../types";

interface AuthDialogProps {
  initialMode: AuthMode;
  onClose: () => void;
  onAuthenticated: (session: AuthSession) => void;
}

interface ActiveChallenge extends RegistrationChallenge {
  expiresAt: number;
  resendAvailableAt: number;
}

const inputClassName = `
  h-12 w-full min-w-0
  rounded-xl border border-white/10
  bg-[#080D1D]
  px-4 text-sm text-white
  placeholder:text-slate-500
  outline-none
  transition-colors
  focus:border-cyan-400/60
  focus:ring-2 focus:ring-cyan-400/10
  disabled:cursor-not-allowed
  disabled:opacity-60
`;

const primaryButtonClassName = `
  inline-flex min-h-12 w-full
  items-center justify-center gap-2
  rounded-xl bg-cyan-400
  px-5 py-3
  text-sm font-bold
  text-[#061426]
  transition-colors
  hover:bg-cyan-300
  focus-visible:outline-2
  focus-visible:outline-offset-4
  focus-visible:outline-cyan-400
  disabled:cursor-not-allowed
  disabled:opacity-50
`;

const textButtonClassName = `
  text-sm font-semibold text-cyan-300
  transition-colors
  hover:text-cyan-200
  focus-visible:outline-2
  focus-visible:outline-offset-4
  focus-visible:outline-cyan-400
  disabled:cursor-not-allowed
  disabled:opacity-50
`;

/* =========================================
   COMMON ICONS
========================================== */

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function EyeIcon({ visible }: { visible: boolean }) {
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
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />

      <circle cx="12" cy="12" r="3" />

      {visible && <path d="M3 3l18 18" />}
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      width="30"
      height="30"
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
  );
}

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
   FORM FIELD WRAPPER
========================================== */

function FormField({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="
          mb-2 block text-xs
          font-semibold text-slate-200
        "
      >
        {label}
      </label>

      {children}
    </div>
  );
}

/* =========================================
   PASSWORD FIELD
========================================== */

function PasswordField({
  isSignup = false,
  disabled = false,
}: {
  isSignup?: boolean;
  disabled?: boolean;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <FormField id="auth-password" label="Password">
      <div className="relative">
        <input
          id="auth-password"
          name="password"
          type={visible ? "text" : "password"}
          placeholder={
            isSignup ? "Create your password" : "Enter your password"
          }
          autoComplete={isSignup ? "new-password" : "current-password"}
          minLength={isSignup ? 8 : undefined}
          required
          disabled={disabled}
          className={`${inputClassName} pr-12`}
        />

        <button
          type="button"
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          onClick={() => setVisible((previous) => !previous)}
          className="
            absolute right-1.5 top-1/2
            flex h-9 w-9
            -translate-y-1/2
            items-center justify-center
            rounded-lg text-slate-400
            hover:bg-white/5
            hover:text-white
          "
        >
          <EyeIcon visible={visible} />
        </button>
      </div>

      {isSignup && (
        <p className="mt-2 text-[11px] leading-5 text-slate-400">
          Use at least 8 characters and a strong, unique password.
        </p>
      )}
    </FormField>
  );
}

/* =========================================
   TIMER HELPERS
========================================== */

function getRemainingSeconds(deadline: number, now: number): number {
  return Math.max(0, Math.ceil((deadline - now) / 1000));
}

function formatCountdown(seconds: number): string {
  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
}

function createActiveChallenge(
  challenge: RegistrationChallenge,
  now: number,
): ActiveChallenge {
  return {
    ...challenge,

    expiresAt: now + challenge.expiresIn * 1000,

    resendAvailableAt: now + challenge.resendAfter * 1000,
  };
}

/* =========================================
   MAIN AUTHENTICATION DIALOG
========================================== */

export default function AuthDialog({
  initialMode,
  onClose,
  onAuthenticated,
}: AuthDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const requestInProgressRef = useRef(false);

  const [step, setStep] = useState<AuthStep>(initialMode);

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");

  const [challenge, setChallenge] = useState<ActiveChallenge | null>(null);

  const [now, setNow] = useState(0);

  const [busy, setBusy] = useState(false);

  const [error, setError] = useState("");

  const [notice, setNotice] = useState("");

  /* =========================================
     OPEN NATIVE DIALOG
  ========================================== */
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    dialog.showModal();

    // Prevent the page behind the modal
    // from scrolling.
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;

      if (dialog.open) {
        dialog.close();
      }
    };
  }, []);

  /* =========================================
     OTP COUNTDOWN
  ========================================== */
  useEffect(() => {
    if (step !== "verify" || !challenge) {
      return;
    }

    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [step, challenge]);

  useEffect(() => {
    dialogRef.current?.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [step]);

  const expirySeconds = challenge
    ? getRemainingSeconds(challenge.expiresAt, now)
    : 0;

  const resendSeconds = challenge
    ? getRemainingSeconds(challenge.resendAvailableAt, now)
    : 0;

  const isExpired = step === "verify" && expirySeconds === 0;

  /* =========================================
     SHARED REQUEST HANDLER
  ========================================== */
  async function runRequest(action: () => Promise<void>) {
    if (requestInProgressRef.current) return;

    requestInProgressRef.current = true;

    setBusy(true);
    setError("");

    try {
      await action();
    } catch (requestError) {
      if (requestError instanceof AuthApiError) {
        if (requestError.status === 410 && step === "verify") {
          setError(
            "Your verification code or registration session has expired. Try resending the code or start registration again.",
          );
        } else {
          setError(requestError.message);
        }
      } else {
        setError(
          "Unable to connect. Please check your internet connection and try again.",
        );
      }
    } finally {
      requestInProgressRef.current = false;
      setBusy(false);
    }
  }

  /* =========================================
     SWITCH AUTH SCREEN
  ========================================== */
  function changeStep(nextStep: AuthStep) {
    if (requestInProgressRef.current) return;

    setError("");
    setNotice("");
    setOtp("");

    if (nextStep !== "verify") {
      setChallenge(null);
    }

    setStep(nextStep);
  }

  function requestClose() {
    if (!requestInProgressRef.current) {
      onClose();
    }
  }

  /* =========================================
     LOGIN
  ========================================== */
  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const loginEmail = String(formData.get("email") ?? "").trim();

    const password = String(formData.get("password") ?? "");

    void runRequest(async () => {
      const session = await authApi.login({
        email: loginEmail,
        password,
      });

      onAuthenticated(session);
    });
  }

  /* =========================================
     SIGN UP
  ========================================== */
  function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();

    const registrationEmail = String(formData.get("email") ?? "").trim();

    const mobile = String(formData.get("mobile") ?? "")
      .trim()
      .replace(/[\s-]/g, "");

    const password = String(formData.get("password") ?? "");

    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (name.length < 2) {
      setError("Please enter your full name.");

      return;
    }

    if (!/^\+[1-9]\d{7,14}$/.test(mobile)) {
      setError(
        "Enter a valid mobile number with country code, for example +919876543210.",
      );

      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");

      return;
    }

    if (formData.get("terms") !== "on") {
      setError("Please accept the Terms of Use and Privacy Policy.");

      return;
    }

    void runRequest(async () => {
      const registration = await authApi.register({
        name,
        email: registrationEmail,
        mobile,
        password,
      });

      const currentTime = Date.now();

      setNow(currentTime);

      setEmail(registrationEmail);

      setChallenge(createActiveChallenge(registration, currentTime));

      // Passwords are not carried into
      // the verification screen.
      setOtp("");
      setNotice("");
      setStep("verify");
    });
  }

  /* =========================================
     VERIFY REGISTRATION OTP
  ========================================== */
  function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!challenge) {
      setError("Registration session not found. Please register again.");

      return;
    }

    if (Date.now() >= challenge.expiresAt) {
      setError(
        "Your verification code has expired. Please request a new code.",
      );

      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit code.");

      return;
    }

    void runRequest(async () => {
      await authApi.verifyRegistration({
        pendingUserId: challenge.pendingUserId,

        verificationId: challenge.verificationId,

        otp,
      });

      // The verification API returns a user,
      // but does not return an access token.
      // Therefore, show the login screen.
      setChallenge(null);
      setOtp("");
      setStep("login");

      setNotice(
        "Your account has been created successfully. Sign in to continue.",
      );
    });
  }

  /* =========================================
     RESEND OTP
  ========================================== */
  function handleResend() {
    if (!challenge || Date.now() < challenge.resendAvailableAt) {
      return;
    }

    void runRequest(async () => {
      const result = await authApi.resendRegistration({
        pendingUserId: challenge.pendingUserId,
      });

      const currentTime = Date.now();

      setNow(currentTime);

      setChallenge(
        createActiveChallenge(
          {
            pendingUserId: challenge.pendingUserId,

            verificationId: result.verificationId,

            expiresIn: result.expiresIn,

            resendAfter: result.resendAfter,
          },
          currentTime,
        ),
      );

      setOtp("");

      setNotice("A new verification code has been sent to your email.");
    });
  }

  /* =========================================
     GOOGLE SIGN-IN
  ========================================== */
  function handleGoogle(idToken: string) {
    void runRequest(async () => {
      const session = await authApi.google(idToken);

      onAuthenticated(session);
    });
  }

  /* =========================================
     RENDER
  ========================================== */
  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="auth-dialog-title"
      aria-describedby="auth-dialog-description"
      onCancel={(event) => {
        event.preventDefault();

        requestClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          requestClose();
        }
      }}
      className="
        fixed inset-x-0 bottom-0 top-auto
        m-0 w-full max-w-none
        max-h-[94dvh]
        overflow-y-auto
        rounded-t-[28px]
        border border-white/10
        bg-[#101A34]
        font-sans text-white
        shadow-2xl

        backdrop:bg-black/70
        backdrop:backdrop-blur-sm

        sm:inset-0 sm:m-auto
        sm:w-[calc(100%-2rem)]
        sm:max-w-[460px]
        sm:rounded-[24px]
      "
    >
      <div className="px-5 pb-6 pt-4 sm:p-7">
        {/* =====================================
            MOBILE HANDLE
        ====================================== */}
        <div
          aria-hidden="true"
          className="
            mx-auto mb-4 h-1 w-10
            rounded-full bg-white/20
            sm:hidden
          "
        />

        {/* =====================================
            BRAND HEADER
        ====================================== */}
        <div
          className="
            flex items-center
            justify-between gap-4
            border-b border-white/10
            pb-4
          "
        >
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpeg"
              alt=""
              width={42}
              height={42}
              className="
                h-10 w-10 shrink-0
                rounded-xl bg-white
                object-contain
              "
            />

            <div>
              <p className="text-sm font-extrabold text-cyan-400">
                AV Art Academy
              </p>

              <p className="mt-1 text-[9px] tracking-wider text-slate-400">
                INSPIRE. CREATE. MASTER.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={requestClose}
            disabled={busy}
            aria-label="Close authentication dialog"
            className="
              flex h-10 w-10
              shrink-0 items-center
              justify-center rounded-xl
              text-slate-400
              hover:bg-white/5
              hover:text-white
              disabled:opacity-40
            "
          >
            <CloseIcon />
          </button>
        </div>

        {/* =====================================
            LOGIN / SIGNUP / VERIFY HEADING
        ====================================== */}
        <div
          className={`
            mt-5
            ${step === "verify" ? "text-center" : ""}
          `}
        >
          {step === "verify" && (
            <div
              className="
                mx-auto mb-4
                flex h-16 w-16
                items-center justify-center
                rounded-2xl
                border border-cyan-400/20
                bg-cyan-400/10
                text-cyan-300
              "
            >
              <MailIcon />
            </div>
          )}

          <h2
            id="auth-dialog-title"
            className="
              text-2xl font-extrabold
              leading-tight tracking-tight
              sm:text-[28px]
            "
          >
            {step === "login"
              ? "Welcome back!"
              : step === "signup"
                ? "Create your account"
                : "Verify your email"}
          </h2>

          <p
            id="auth-dialog-description"
            className="
              mt-2 text-sm
              leading-6 text-slate-400
            "
          >
            {step === "login"
              ? "Sign in to continue your creative journey."
              : step === "signup"
                ? "Start learning with AV Art Academy."
                : "Enter the 6-digit verification code sent to your email."}
          </p>

          {step === "verify" && (
            <p className="mt-2 break-all text-sm font-semibold text-cyan-300">
              {email}
            </p>
          )}
        </div>

        {/* =====================================
            API ERROR
        ====================================== */}
        {error && (
          <div
            role="alert"
            className="
              mt-4 rounded-xl
              border border-red-400/20
              bg-red-400/10
              px-4 py-3
              text-xs leading-6
              text-red-300
            "
          >
            {error}
          </div>
        )}

        {/* =====================================
            SUCCESS MESSAGE
        ====================================== */}
        {notice && (
          <div
            role="status"
            className="
              mt-4 rounded-xl
              border border-emerald-400/20
              bg-emerald-400/10
              px-4 py-3
              text-xs leading-6
              text-emerald-300
            "
          >
            {notice}
          </div>
        )}

        {/* =====================================
            GOOGLE SIGN-IN
        ====================================== */}
        {step !== "verify" && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && (
          <div className="mt-5">
            <GoogleSignIn
              onCredential={handleGoogle}
              onError={setError}
              disabled={busy}
            />

            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-white/10" />

              <span
                className="
                    text-[10px] font-medium
                    uppercase tracking-wider
                    text-slate-500
                  "
              >
                Or continue with email
              </span>

              <span className="h-px flex-1 bg-white/10" />
            </div>
          </div>
        )}

        {/* =====================================
            LOGIN FORM
        ====================================== */}
        {step === "login" && (
          <form key="login" onSubmit={handleLogin} className="mt-5 space-y-4">
            <FormField id="login-email" label="Email address">
              <input
                id="login-email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                disabled={busy}
                className={inputClassName}
              />
            </FormField>

            <PasswordField disabled={busy} />

            <div className="flex justify-end">
              <Link
                href="/contact"
                className="text-xs font-semibold text-cyan-300 hover:text-cyan-200"
              >
                Need help with your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={busy}
              className={primaryButtonClassName}
            >
              {busy && <Spinner />}

              {busy ? "Signing in..." : "Sign In"}
            </button>

            <p className="text-center text-xs leading-6 text-slate-400">
              New to AV Art Academy?{" "}
              <button
                type="button"
                disabled={busy}
                onClick={() => changeStep("signup")}
                className={textButtonClassName}
              >
                Create account
              </button>
            </p>
          </form>
        )}

        {/* =====================================
            SIGNUP FORM
        ====================================== */}
        {step === "signup" && (
          <form key="signup" onSubmit={handleSignup} className="mt-5 space-y-4">
            <FormField id="signup-name" label="Full name">
              <input
                id="signup-name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                required
                disabled={busy}
                className={inputClassName}
              />
            </FormField>

            <FormField id="signup-email" label="Email address">
              <input
                id="signup-email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                disabled={busy}
                className={inputClassName}
              />
            </FormField>

            <FormField id="signup-mobile" label="Mobile number">
              <input
                id="signup-mobile"
                name="mobile"
                type="tel"
                inputMode="tel"
                placeholder="+91 98765 43210"
                defaultValue="+91"
                autoComplete="tel"
                required
                disabled={busy}
                className={inputClassName}
              />
            </FormField>

            <PasswordField isSignup disabled={busy} />

            <FormField id="confirm-password" label="Confirm password">
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                autoComplete="new-password"
                minLength={8}
                required
                disabled={busy}
                className={inputClassName}
              />
            </FormField>

            {/* Terms and Privacy */}
            <div className="flex items-start gap-3">
              <input
                id="signup-terms"
                name="terms"
                type="checkbox"
                required
                disabled={busy}
                className="
                  mt-1 h-4 w-4 shrink-0
                  cursor-pointer
                  accent-cyan-400
                "
              />

              <label
                htmlFor="signup-terms"
                className="text-xs leading-6 text-slate-400"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-cyan-300"
                >
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-cyan-300"
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            <button
              type="submit"
              disabled={busy}
              className={primaryButtonClassName}
            >
              {busy && <Spinner />}

              {busy ? "Sending verification code..." : "Create Account"}
            </button>

            <p className="text-center text-xs leading-6 text-slate-400">
              Already have an account?{" "}
              <button
                type="button"
                disabled={busy}
                onClick={() => changeStep("login")}
                className={textButtonClassName}
              >
                Sign in
              </button>
            </p>
          </form>
        )}

        {/* =====================================
            OTP VERIFICATION FORM
        ====================================== */}
        {step === "verify" && (
          <form key="verify" onSubmit={handleVerify} className="mt-6 space-y-5">
            <FormField id="verification-otp" label="Verification code">
              <input
                id="verification-otp"
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
                  border-white/15
                  bg-[#080D1D]
                  px-3 text-center
                  font-mono text-[26px]
                  font-bold tracking-[0.3em]
                  text-white outline-none
                  placeholder:text-slate-700
                  focus:border-cyan-400/60
                  focus:ring-2
                  focus:ring-cyan-400/10
                "
              />
            </FormField>

            {/* Expiry Timer */}
            <div
              className="
                text-center text-xs
                leading-6 text-slate-400
              "
            >
              {isExpired ? (
                <span className="font-medium text-red-300">
                  Verification code expired.
                </span>
              ) : (
                <>
                  Code expires in{" "}
                  <span
                    className="
                      font-semibold tabular-nums
                      text-cyan-300
                    "
                  >
                    {formatCountdown(expirySeconds)}
                  </span>
                </>
              )}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={busy || otp.length !== 6 || isExpired || !challenge}
              className={primaryButtonClassName}
            >
              {busy && <Spinner />}

              {busy ? "Processing..." : "Verify Email"}
            </button>

            {/* Resend OTP */}
            <div
              className="
                rounded-xl border
                border-white/5
                bg-[#080D1D]/60
                px-4 py-4
                text-center
              "
            >
              <p className="text-xs text-slate-400">
                Didn&apos;t receive the code?
              </p>

              <button
                type="button"
                onClick={handleResend}
                disabled={busy || resendSeconds > 0 || !challenge}
                className={`
                  mt-2
                  ${textButtonClassName}
                `}
              >
                {resendSeconds > 0
                  ? `Resend in ${formatCountdown(resendSeconds)}`
                  : "Resend verification code"}
              </button>
            </div>

            {/* Return to Signup */}
            <div className="text-center">
              <button
                type="button"
                disabled={busy}
                onClick={() => changeStep("signup")}
                className="text-xs font-medium text-slate-400 hover:text-cyan-300"
              >
                Change email or start again
              </button>
            </div>
          </form>
        )}

        {/* =====================================
            DIALOG FOOTER
        ====================================== */}
        <div
          className="
            mt-6 border-t
            border-white/10 pt-4
            text-center text-[11px]
            leading-5 text-slate-500
          "
        >
          Learn. Create. Grow with AV Art Academy.
        </div>
      </div>
    </dialog>
  );
}
