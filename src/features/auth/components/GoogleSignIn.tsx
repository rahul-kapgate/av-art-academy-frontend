"use client";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

interface GoogleSignInProps {
  onCredential: (idToken: string) => void;
  onError: (message: string) => void;
  disabled?: boolean;
}

export default function GoogleSignIn({
  onCredential,
  onError,
  disabled = false,
}: GoogleSignInProps) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    // Email authentication still works when
    // Google authentication is not configured.
    return null;
  }

  return (
    <div
      className={`
        flex w-full justify-center
        ${disabled ? "pointer-events-none opacity-50" : ""}
      `}
    >
      <GoogleOAuthProvider
        clientId={clientId}
        onScriptLoadError={() => {
          onError("Google sign-in is currently unavailable.");
        }}
      >
        <GoogleLogin
          theme="outline"
          size="large"
          shape="rectangular"
          text="continue_with"
          width="280"
          logo_alignment="left"
          onSuccess={(response) => {
            if (disabled) return;

            if (!response.credential) {
              onError("Google did not return a valid credential.");

              return;
            }

            onCredential(response.credential);
          }}
          onError={() => {
            onError("Google sign-in failed. Please try again.");
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
}
