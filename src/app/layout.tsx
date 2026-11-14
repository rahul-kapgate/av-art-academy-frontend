import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/src/features/auth/context/AuthProvider";
import { Toaster } from "sonner";

import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://artisticvickey.in";

const description =
  "AV Art Academy provides MAH AAC CET online coaching, art and drawing courses, video lectures, mock tests, previous-year questions and expert guidance to help aspiring artists build their creative future.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: "AV Art Academy",

  title: {
    default: "AV Art Academy | MAH AAC CET Online Coaching",
    template: "%s | AV Art Academy",
  },

  description,

  authors: [
    {
      name: "AV Art Academy",
      url: SITE_URL,
    },
  ],

  creator: "AV Art Academy",
  publisher: "AV Art Academy",

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "AV Art Academy",

    title: "AV Art Academy | MAH AAC CET Online Coaching",

    description,

    images: [
      {
        url: "/logo.jpeg",
        alt: "AV Art Academy Logo",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: "AV Art Academy | MAH AAC CET Online Coaching",
    description,
    images: ["/logo.jpeg"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },

  category: "Education",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`
        ${jakartaSans.variable}
        ${geistMono.variable}
        h-full antialiased
      `}
    >
      <body
        className="
          flex min-h-full flex-col
          font-sans antialiased
        "
      >
        <AuthProvider>{children}</AuthProvider>
        <Toaster
          position="bottom-right"
          theme="dark"
          richColors
          closeButton
          duration={4000}
        />
      </body>
    </html>
  );
}
