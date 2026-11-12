import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import Header from "../landing/components/Header";
import Footer from "../landing/components/Footer";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://artisticvickey.in"
).replace(/\/$/, "");

const EMAIL = "vikkitembhurne358@gmail.com";
const PHONE = "+91 9325217691";

// Update this date when the policy is revised.
const LAST_UPDATED = "12 November 2026";
const LAST_UPDATED_ISO = "2026-11-12";

const description =
  "Read the AV Art Academy Privacy Policy to understand how we collect, use, protect and manage personal information across our website and mobile application.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,

  alternates: {
    canonical: "/privacy-policy",
  },

  openGraph: {
    title: "Privacy Policy | AV Art Academy",
    description,
    url: "/privacy-policy",
    siteName: "AV Art Academy",
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary",
    title: "Privacy Policy | AV Art Academy",
    description,
  },

  robots: {
    index: true,
    follow: true,
  },
};

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "how-we-use-data", title: "How We Use Your Information" },
  { id: "authentication", title: "Account & Authentication" },
  { id: "payments", title: "Payments & Transactions" },
  { id: "cookies", title: "Cookies & Local Storage" },
  { id: "third-party-services", title: "Third-Party Services" },
  { id: "data-sharing", title: "Data Sharing" },
  { id: "data-security", title: "Data Security" },
  { id: "data-retention", title: "Data Retention" },
  { id: "account-deletion", title: "Account & Data Deletion" },
  { id: "your-rights", title: "Your Privacy Rights" },
  { id: "children-privacy", title: "Children's Privacy" },
  { id: "external-links", title: "External Links" },
  { id: "policy-updates", title: "Changes to This Policy" },
  { id: "contact", title: "Contact Us" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/privacy-policy#webpage`,
  name: "Privacy Policy | AV Art Academy",
  description,
  url: `${SITE_URL}/privacy-policy`,
  dateModified: LAST_UPDATED_ISO,
  publisher: {
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: "AV Art Academy",
    url: SITE_URL,
  },
};

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function PolicySection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="
        scroll-mt-28
        border-b border-white/10
        pb-10 pt-9
        first:pt-0
        last:border-b-0
      "
    >
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-xl border
            border-cyan-400/20
            bg-cyan-400/10
            text-sm font-bold text-cyan-300
          "
        >
          {number}
        </span>

        <h2
          id={`${id}-heading`}
          className="
            pt-1 text-xl font-bold
            tracking-tight text-white
            sm:text-2xl
          "
        >
          {title}
        </h2>
      </div>

      <div
        className="
          mt-6 space-y-4
          text-sm leading-7
          text-slate-300
          sm:text-base sm:leading-8
        "
      >
        {children}
      </div>
    </section>
  );
}

function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 pl-1">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="
              mt-3 h-1.5 w-1.5
              shrink-0 rounded-full
              bg-cyan-400
            "
          />

          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PolicySubheading({ children }: { children: ReactNode }) {
  return (
    <h3 className="pt-3 text-base font-semibold text-white sm:text-lg">
      {children}
    </h3>
  );
}

const linkClassName =
  "font-medium text-cyan-300 underline decoration-cyan-400/30 underline-offset-4 transition-colors hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-cyan-400";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="bg-[#080D1D] text-white">
        {/* Hero Section */}
        <section
          aria-labelledby="privacy-heading"
          className="
            relative overflow-hidden
            border-b border-white/5
            bg-gradient-to-br
            from-[#080D27]
            via-[#10194F]
            to-[#1A237E]
          "
        >
          {/* Background decoration */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              -right-20 -top-32
              h-96 w-96 rounded-full
              bg-cyan-400/10 blur-[100px]
            "
          />

          <div
            className="
              relative mx-auto max-w-7xl
              px-6 pb-16 pt-10
              sm:pb-20 md:pt-12
            "
          >
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
              <ol className="flex items-center gap-2">
                <li>
                  <Link
                    href="/"
                    className="
                      transition-colors
                      hover:text-cyan-300
                    "
                  >
                    Home
                  </Link>
                </li>

                <li aria-hidden="true">/</li>

                <li aria-current="page" className="text-cyan-300">
                  Privacy Policy
                </li>
              </ol>
            </nav>

            <div className="mx-auto mt-14 max-w-3xl text-center">
              <div
                className="
                  mx-auto flex h-16 w-16
                  items-center justify-center
                  rounded-2xl
                  border border-cyan-400/25
                  bg-cyan-400/10
                  text-cyan-300
                "
              >
                <ShieldIcon />
              </div>

              <p
                className="
                  mt-6 text-xs font-semibold
                  uppercase tracking-[0.2em]
                  text-cyan-300
                "
              >
                Your Privacy Matters
              </p>

              <h1
                id="privacy-heading"
                className="
                  mt-5 text-4xl font-extrabold
                  tracking-tight
                  sm:text-5xl lg:text-6xl
                "
              >
                Privacy <span className="text-cyan-400">Policy</span>
              </h1>

              <p
                className="
                  mx-auto mt-6 max-w-2xl
                  text-base leading-8
                  text-slate-300 sm:text-lg
                "
              >
                Learn how AV Art Academy collects, uses, stores and protects
                your personal information across our website and mobile
                application.
              </p>

              <div
                className="
                  mt-7 inline-flex
                  items-center gap-2
                  rounded-full
                  border border-white/10
                  bg-white/5 px-4 py-2
                  text-xs text-slate-300
                "
              >
                <span className="text-slate-400">Last updated:</span>

                <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED}</time>
              </div>
            </div>
          </div>
        </section>

        {/* Main Policy Layout */}
        <div
          className="
            mx-auto grid max-w-7xl
            items-start gap-10
            px-6 py-14
            lg:grid-cols-[260px_minmax(0,1fr)]
            lg:gap-12 lg:py-20
          "
        >
          {/* Desktop Table of Contents */}
          <aside className="hidden lg:sticky lg:top-28 lg:block">
            <nav
              aria-label="Privacy policy sections"
              className="
                max-h-[calc(100dvh-9rem)]
                overflow-y-auto rounded-2xl
                border border-white/10
                bg-[#101A34] p-5
              "
            >
              <h2
                className="
                  mb-5 text-xs font-semibold
                  uppercase tracking-widest
                  text-cyan-300
                "
              >
                Table of Contents
              </h2>

              <ol className="space-y-1">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="
                        flex items-start gap-2
                        rounded-lg px-3 py-2.5
                        text-xs leading-5
                        text-slate-400
                        transition-colors
                        hover:bg-cyan-400/5
                        hover:text-cyan-300
                        focus-visible:outline-2
                        focus-visible:outline-cyan-400
                      "
                    >
                      <span className="text-cyan-400/70">
                        {String(index + 1).padStart(2, "0")}.
                      </span>

                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* Policy Content */}
          <article className="min-w-0">
            {/* Mobile Table of Contents */}
            <details
              className="
                group mb-8 rounded-xl
                border border-white/10
                bg-[#101A34] p-5
                lg:hidden
              "
            >
              <summary
                className="
                  flex cursor-pointer
                  list-none items-center
                  justify-between
                  font-semibold text-cyan-300
                  marker:content-none
                "
              >
                Table of Contents
                <span
                  aria-hidden="true"
                  className="
                    text-xl transition-transform
                    group-open:rotate-45
                  "
                >
                  +
                </span>
              </summary>

              <nav aria-label="Mobile privacy policy sections" className="mt-5">
                <ol className="space-y-3">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="
                          block text-sm
                          text-slate-300
                          hover:text-cyan-300
                        "
                      >
                        {index + 1}. {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </details>

            {/* Introduction */}
            <PolicySection id="introduction" number="01" title="Introduction">
              <p>
                AV Art Academy respects your privacy and is committed to
                handling your personal information responsibly.
              </p>

              <p>
                This Privacy Policy explains how AV Art Academy collects, uses,
                stores, shares and protects your information when you access our
                website, mobile application or educational services.
              </p>

              <p>
                This policy applies to our website at{" "}
                <a href={SITE_URL} className={linkClassName}>
                  artisticvickey.in
                </a>
                , the AV Art Academy mobile application, and related learning
                services, including courses, video lectures, mock tests,
                previous-year questions and study resources.
              </p>

              <p>
                References to &ldquo;we,&rdquo; &ldquo;us,&rdquo; and
                &ldquo;our&rdquo; refer to AV Art Academy.
              </p>
            </PolicySection>

            {/* Information Collection */}
            <PolicySection
              id="information-we-collect"
              number="02"
              title="Information We Collect"
            >
              <p>
                The information we collect depends on the features you use and
                how you interact with our services.
              </p>

              <PolicySubheading>
                Personal and Account Information
              </PolicySubheading>

              <PolicyList
                items={[
                  "Your name, email address and phone number, when provided.",
                  "Account registration and profile information.",
                  "Password hashes, authentication identifiers and account verification information.",
                  "Profile images or selected avatars, where supported.",
                  "Messages and information you provide when contacting us.",
                ]}
              />

              <PolicySubheading>
                Learning and Course Information
              </PolicySubheading>

              <PolicyList
                items={[
                  "Courses you enroll in or purchase.",
                  "Course access and learning progress.",
                  "Mock test and previous-year question attempts.",
                  "Submitted answers, assessment results and scores.",
                  "Student feedback, reviews or artwork you choose to submit.",
                ]}
              />

              <PolicySubheading>Payment Information</PolicySubheading>

              <PolicyList
                items={[
                  "Course purchase and enrollment records.",
                  "Payment order IDs and transaction references.",
                  "Payment amount, currency and transaction status.",
                  "Invoices, billing details and refund records, where applicable.",
                ]}
              />

              <PolicySubheading>
                Device and Technical Information
              </PolicySubheading>

              <p>
                When you access our services, our systems and service providers
                may process technical information needed to deliver, maintain
                and protect the platform.
              </p>

              <PolicyList
                items={[
                  "IP address and request information.",
                  "Browser type, operating system and application version, where available.",
                  "Login activity and session information.",
                  "Error reports and technical logs used for troubleshooting and security.",
                ]}
              />
            </PolicySection>

            {/* Information Usage */}
            <PolicySection
              id="how-we-use-data"
              number="03"
              title="How We Use Your Information"
            >
              <p>
                We use your information to provide, maintain and improve our
                educational services.
              </p>

              <PolicyList
                items={[
                  "Create, verify and manage your student account.",
                  "Authenticate users and protect account access.",
                  "Provide access to enrolled courses, lectures and learning resources.",
                  "Record learning progress, test attempts and assessment results.",
                  "Process course purchases, verify payments and manage enrollments.",
                  "Send account verification emails, OTPs, invoices and important service notifications.",
                  "Respond to enquiries and provide student support.",
                  "Troubleshoot technical issues and improve platform reliability.",
                  "Detect fraud, prevent unauthorized access and protect our services.",
                  "Comply with applicable legal and regulatory requirements.",
                ]}
              />

              <p>
                Where we request consent for an optional use of personal
                information, you may withdraw that consent through available
                settings or by contacting us.
              </p>
            </PolicySection>

            {/* Authentication */}
            <PolicySection
              id="authentication"
              number="04"
              title="Account & Authentication"
            >
              <p>
                AV Art Academy provides account registration and login features
                to allow students to access courses and manage their learning
                activities.
              </p>

              <PolicySubheading>
                Email and Password Authentication
              </PolicySubheading>

              <p>
                When you register using your email address and password, we
                process your account details and authentication information to
                create and protect your account.
              </p>

              <p>
                Passwords are stored using password hashing rather than as
                readable plain-text passwords.
              </p>

              <PolicySubheading>Google Sign-In</PolicySubheading>

              <p>
                If you choose to sign in using Google, we receive the account
                information authorized through the sign-in process, such as your
                name, email address and Google account identifier.
              </p>

              <p>
                This information is used to authenticate you and manage your AV
                Art Academy account. We do not receive your Google account
                password.
              </p>

              <p>
                You can learn more about how Google handles personal information
                in its{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  Privacy Policy
                </a>
                .
              </p>
            </PolicySection>

            {/* Payments */}
            <PolicySection
              id="payments"
              number="05"
              title="Payments & Transactions"
            >
              <p>
                AV Art Academy uses third-party payment processing services,
                including Razorpay, to facilitate supported online course
                purchases.
              </p>

              <p>
                Payment information required to complete a transaction is
                processed by the applicable payment service provider.
              </p>

              <p>
                We receive and maintain transaction information necessary to
                verify payments, activate course enrollments, provide invoices
                and manage refunds.
              </p>

              <p>
                You should not share your card PIN, banking password, UPI PIN or
                payment verification OTP with academy staff or through our
                contact forms.
              </p>

              <p>
                For more information about payment processing, refer to the{" "}
                <a
                  href="https://razorpay.com/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  Razorpay Privacy Policy
                </a>
                .
              </p>

              <p>
                Information regarding cancellation and eligible refunds is
                available in our{" "}
                <Link href="/refund-policy" className={linkClassName}>
                  Refund Policy
                </Link>
                .
              </p>
            </PolicySection>

            {/* Cookies */}
            <PolicySection
              id="cookies"
              number="06"
              title="Cookies & Local Storage"
            >
              <p>
                Our website may use cookies and browser storage to support
                authentication, session management, user preferences and
                essential website functionality.
              </p>

              <PolicyList
                items={[
                  "Authentication and session cookies help maintain secure account access.",
                  "Browser storage may retain supported interface preferences.",
                  "Security-related cookies and session information may help prevent unauthorized access and abuse.",
                ]}
              />

              <p>
                Our mobile application may use local device storage to maintain
                sessions, preferences and other information required for
                application functionality.
              </p>

              <p>
                You can manage cookies through your browser settings. Disabling
                essential cookies may prevent certain features, including
                account login, from working correctly.
              </p>
            </PolicySection>

            {/* Third-Party Services */}
            <PolicySection
              id="third-party-services"
              number="07"
              title="Third-Party Services"
            >
              <p>
                We use external service providers to support the operation of AV
                Art Academy. These providers may process information necessary
                to deliver their services.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    name: "Google",
                    purpose:
                      "Account authentication and supported Google Sign-In.",
                    href: "https://policies.google.com/privacy",
                  },
                  {
                    name: "Razorpay",
                    purpose:
                      "Payment processing and transaction-related services.",
                    href: "https://razorpay.com/privacy/",
                  },
                  {
                    name: "Supabase",
                    purpose:
                      "Database services and supported data storage operations.",
                    href: "https://supabase.com/privacy",
                  },
                  {
                    name: "Resend",
                    purpose:
                      "Transactional emails, verification emails and account notifications.",
                    href: "https://resend.com/legal/privacy-policy",
                  },
                ].map((service) => (
                  <article
                    key={service.name}
                    className="
                      rounded-xl
                      border border-white/10
                      bg-[#101A34] p-5
                    "
                  >
                    <h3 className="font-semibold text-white">{service.name}</h3>

                    <p
                      className="
                        mt-3 text-sm
                        leading-7 text-slate-400
                      "
                    >
                      {service.purpose}
                    </p>

                    <a
                      href={service.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        mt-4 inline-flex
                        text-xs font-semibold
                        text-cyan-300
                        hover:text-cyan-200
                      "
                    >
                      View Privacy Policy
                      <span aria-hidden="true"> ↗</span>
                    </a>
                  </article>
                ))}
              </div>

              <p>
                We may also use cloud hosting, file storage and content delivery
                providers to operate the platform and deliver educational
                content.
              </p>

              <p>
                If you contact us through WhatsApp or another external
                communication service, that service processes your information
                under its own privacy policy.
              </p>
            </PolicySection>

            {/* Data Sharing */}
            <PolicySection id="data-sharing" number="08" title="Data Sharing">
              <p>
                We may share personal information in the following
                circumstances:
              </p>

              <PolicyList
                items={[
                  "With service providers that support authentication, hosting, storage, payments and communication.",
                  "With authorized academy staff who need access to provide educational services or student support.",
                  "With payment providers and financial institutions to process transactions or resolve payment disputes.",
                  "With authorities where disclosure is required by applicable law or a valid legal request.",
                  "Where reasonably necessary to investigate fraud, protect users or maintain platform security.",
                  "With your permission when information is intended for public display.",
                ]}
              />

              <p>
                If you submit a student testimonial, review or artwork for
                publication, we will seek appropriate permission before
                publishing identifiable information.
              </p>
            </PolicySection>

            {/* Data Security */}
            <PolicySection id="data-security" number="09" title="Data Security">
              <p>
                We use technical and organizational safeguards designed to
                protect personal information from unauthorized access,
                disclosure, alteration or loss.
              </p>

              <PolicyList
                items={[
                  "Secure HTTPS communication for production services.",
                  "Password hashing and account authentication mechanisms.",
                  "Restricted access to administrative features and user information.",
                  "Server-side authorization for protected learning resources.",
                  "Monitoring and maintenance intended to reduce security risks.",
                ]}
              />

              <p>
                While we work to protect your information, no method of internet
                transmission or electronic storage can be guaranteed to be
                completely secure.
              </p>

              <p>
                You are encouraged to use a strong password, protect your
                account credentials and notify us if you suspect unauthorized
                account access.
              </p>
            </PolicySection>

            {/* Data Retention */}
            <PolicySection
              id="data-retention"
              number="10"
              title="Data Retention"
            >
              <p>
                We retain personal information for as long as reasonably
                necessary to provide our services, maintain your account and
                fulfill the purposes described in this policy.
              </p>

              <PolicyList
                items={[
                  "Account and learning information may be retained while your account is active.",
                  "Transaction records and invoices may be retained to satisfy applicable accounting, tax and legal obligations.",
                  "Support communications may be retained as needed to resolve enquiries and disputes.",
                  "Security and technical logs may be retained for troubleshooting, fraud prevention and security purposes.",
                ]}
              />

              <p>
                When personal information is no longer required, we take
                appropriate steps to delete it or make it anonymous, subject to
                applicable retention obligations.
              </p>
            </PolicySection>

            {/* Account Deletion */}
            <PolicySection
              id="account-deletion"
              number="11"
              title="Account & Data Deletion"
            >
              <p>
                You can request deletion of your AV Art Academy account and
                associated personal information.
              </p>

              <PolicySubheading>
                How to Request Account Deletion
              </PolicySubheading>

              <PolicyList
                items={[
                  "Sign in to the AV Art Academy mobile application and use the account deletion option in your account settings.",
                  "Alternatively, send an account deletion request to our support email using your registered email address.",
                  "We may request reasonable verification to confirm your identity before processing the request.",
                ]}
              />

              <div
                className="
                  rounded-2xl border
                  border-cyan-400/20
                  bg-cyan-400/5 p-6
                "
              >
                <h3 className="font-semibold text-cyan-300">
                  Account Deletion Request
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  You can request account deletion even if you no longer have
                  the mobile application installed. Contact us using the email
                  address associated with your account.
                </p>

                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                    "AV Art Academy - Account Deletion Request",
                  )}&body=${encodeURIComponent(
                    "Hello AV Art Academy,\n\nI would like to request deletion of my account and associated personal data.\n\nRegistered email address:\n\nThank you.",
                  )}`}
                  className="
                    mt-5 inline-flex
                    items-center justify-center
                    rounded-xl border
                    border-cyan-400/30
                    bg-cyan-400/10
                    px-5 py-3
                    text-sm font-semibold
                    text-cyan-300
                    transition-colors
                    hover:bg-cyan-400/20
                  "
                >
                  Request Account Deletion
                </a>
              </div>

              <PolicySubheading>
                What Happens After a Deletion Request?
              </PolicySubheading>

              <p>
                A confirmed account deletion request starts a 30-day account
                deletion period. During this period, your account is scheduled
                for permanent deletion.
              </p>

              <p>
                If you choose to restore your account by signing in again before
                the deletion period ends, the pending deletion may be cancelled.
              </p>

              <p>
                After the deletion period, account information and associated
                personal learning data are scheduled for permanent removal,
                except for records that must be retained for legitimate legal,
                accounting, fraud prevention or security purposes.
              </p>

              <p>
                Account deletion may result in the loss of access to enrolled
                courses, saved progress, assessment history and other
                account-related features.
              </p>

              <p>
                Uninstalling the mobile application does not automatically
                delete your AV Art Academy account.
              </p>
            </PolicySection>

            {/* Privacy Rights */}
            <PolicySection
              id="your-rights"
              number="12"
              title="Your Privacy Rights"
            >
              <p>
                Depending on applicable law, you may have rights relating to the
                personal information we hold about you.
              </p>

              <PolicyList
                items={[
                  "Request information about the personal data we process about you.",
                  "Request correction of inaccurate or incomplete personal information.",
                  "Request deletion of personal information, subject to applicable legal obligations.",
                  "Withdraw consent where processing is based on your consent.",
                  "Raise a privacy-related concern or grievance.",
                  "Request information about how your personal information is used and shared.",
                ]}
              />

              <p>
                To exercise these rights, contact us at{" "}
                <a href={`mailto:${EMAIL}`} className={linkClassName}>
                  {EMAIL}
                </a>
                .
              </p>

              <p>
                We may need to verify your identity before responding to
                requests involving personal information.
              </p>
            </PolicySection>

            {/* Children */}
            <PolicySection
              id="children-privacy"
              number="13"
              title="Children's Privacy"
            >
              <p>
                AV Art Academy provides educational services that may be used by
                students under the age of 18.
              </p>

              <p>
                Students under 18 should involve a parent or legal guardian
                before creating an account, providing personal information or
                purchasing courses.
              </p>

              <p>
                Where applicable law requires parental or guardian consent, such
                consent must be obtained before the relevant personal
                information is processed.
              </p>

              <p>
                If you are a parent or guardian and believe that your child has
                provided personal information without the required permission,
                please contact us so we can review the situation and take
                appropriate action.
              </p>
            </PolicySection>

            {/* External Links */}
            <PolicySection
              id="external-links"
              number="14"
              title="External Links"
            >
              <p>
                Our website and mobile application may contain links to external
                websites, video platforms, social media services, payment
                providers and other resources.
              </p>

              <p>
                When you visit an external service, its own privacy policy and
                terms may apply.
              </p>

              <p>
                We encourage you to review the privacy practices of external
                services before sharing personal information with them.
              </p>
            </PolicySection>

            {/* Policy Updates */}
            <PolicySection
              id="policy-updates"
              number="15"
              title="Changes to This Policy"
            >
              <p>
                We may update this Privacy Policy to reflect changes to our
                services, data handling practices or applicable legal
                requirements.
              </p>

              <p>
                The updated policy will be published on this page with a revised
                &ldquo;Last updated&rdquo; date.
              </p>

              <p>
                Where required, we will provide additional notice or obtain
                consent for material changes affecting the processing of
                personal information.
              </p>
            </PolicySection>

            {/* Contact */}
            <PolicySection id="contact" number="16" title="Contact Us">
              <p>
                If you have questions, concerns or requests regarding this
                Privacy Policy, your personal information or account deletion,
                please contact AV Art Academy.
              </p>

              <address
                className="
                  rounded-2xl border
                  border-white/10
                  bg-[#101A34] p-6
                  not-italic
                "
              >
                <p className="text-lg font-bold text-white">AV Art Academy</p>

                <div className="mt-5 space-y-5">
                  <div>
                    <p
                      className="
                        text-xs font-semibold
                        uppercase tracking-widest
                        text-slate-400
                      "
                    >
                      Email
                    </p>

                    <a
                      href={`mailto:${EMAIL}`}
                      className="
                        mt-2 inline-block
                        break-all font-medium
                        text-cyan-300
                        hover:text-cyan-200
                      "
                    >
                      {EMAIL}
                    </a>
                  </div>

                  <div>
                    <p
                      className="
                        text-xs font-semibold
                        uppercase tracking-widest
                        text-slate-400
                      "
                    >
                      Phone / WhatsApp
                    </p>

                    <a
                      href="tel:+919325217691"
                      className="
                        mt-2 inline-block
                        font-medium text-cyan-300
                        hover:text-cyan-200
                      "
                    >
                      {PHONE}
                    </a>
                  </div>

                  <div>
                    <p
                      className="
                        text-xs font-semibold
                        uppercase tracking-widest
                        text-slate-400
                      "
                    >
                      Website
                    </p>

                    <a
                      href={SITE_URL}
                      className="
                        mt-2 inline-block
                        break-all font-medium
                        text-cyan-300
                        hover:text-cyan-200
                      "
                    >
                      artisticvickey.in
                    </a>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="
                    mt-7 inline-flex
                    items-center justify-center
                    rounded-xl bg-cyan-400
                    px-6 py-3
                    text-sm font-bold
                    text-[#061426]
                    transition-colors
                    hover:bg-cyan-300
                  "
                >
                  Contact Support
                </Link>
              </address>
            </PolicySection>

            {/* Related Policies */}
            <div
              className="
                mt-8 rounded-2xl
                border border-white/10
                bg-[#101A34] p-6
              "
            >
              <h2 className="text-lg font-bold text-white">Related Policies</h2>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Learn more about using our platform, purchasing courses and our
                service policies.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/terms"
                  className="
                    rounded-lg border
                    border-white/10
                    bg-white/5 px-4 py-2.5
                    text-sm text-slate-300
                    transition-colors
                    hover:border-cyan-400/30
                    hover:text-cyan-300
                  "
                >
                  Terms of Use
                </Link>

                <Link
                  href="/refund-policy"
                  className="
                    rounded-lg border
                    border-white/10
                    bg-white/5 px-4 py-2.5
                    text-sm text-slate-300
                    transition-colors
                    hover:border-cyan-400/30
                    hover:text-cyan-300
                  "
                >
                  Refund Policy
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
