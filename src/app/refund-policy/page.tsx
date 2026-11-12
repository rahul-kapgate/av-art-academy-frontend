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

// Update when the policy is approved and published.
const LAST_UPDATED = "12 November 2026";
const LAST_UPDATED_ISO = "2026-11-12";

const description =
  "Read AV Art Academy's Refund and Cancellation Policy for MAH AAC CET courses, mock tests, digital study materials, payments and refund requests.";

const refundMessage = [
  "Hello AV Art Academy! 👋",
  "",
  "I would like to request assistance with a refund.",
  "",
  "Registered Name:",
  "Registered Email:",
  "Course Name:",
  "Transaction / Order ID:",
  "Payment Date:",
  "Reason for Refund:",
  "",
  "Please help me with the next steps.",
  "",
  "Thank you!",
].join("\n");

const WHATSAPP_URL = `https://wa.me/919325217691?text=${encodeURIComponent(
  refundMessage,
)}`;

const REFUND_EMAIL_URL = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "AV Art Academy - Refund Request",
)}&body=${encodeURIComponent(refundMessage)}`;

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description,

  alternates: {
    canonical: "/refund-policy",
  },

  openGraph: {
    title: "Refund & Cancellation Policy | AV Art Academy",
    description,
    url: "/refund-policy",
    siteName: "AV Art Academy",
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary",
    title: "Refund Policy | AV Art Academy",
    description,
  },

  // Enable indexing after approving the final policy.
  robots: {
    index: false,
    follow: true,
  },
};

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "scope", title: "Scope of This Policy" },
  { id: "course-purchases", title: "Course Purchases" },
  { id: "refund-eligibility", title: "Refund Eligibility" },
  { id: "digital-products", title: "Digital Products" },
  { id: "payment-failures", title: "Failed & Duplicate Payments" },
  { id: "cancellation", title: "Course Cancellation" },
  { id: "refund-request", title: "How to Request a Refund" },
  { id: "refund-processing", title: "Refund Processing" },
  { id: "course-access", title: "Course Access After Refund" },
  { id: "payment-disputes", title: "Payment Disputes" },
  { id: "policy-updates", title: "Policy Updates" },
  { id: "contact", title: "Contact Support" },
];

const refundSteps = [
  {
    title: "Contact Our Support Team",
    description:
      "Send your refund request through WhatsApp or email using the contact details provided on this page.",
  },
  {
    title: "Share Purchase Details",
    description:
      "Provide your registered email, course name, payment date, order ID and reason for requesting a refund.",
  },
  {
    title: "Request Verification",
    description:
      "Our team reviews your payment records, enrollment details and the circumstances of your request.",
  },
  {
    title: "Refund Decision",
    description:
      "We communicate the outcome and any applicable next steps, including the refund amount and estimated processing timeline.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/refund-policy#webpage`,
  name: "Refund & Cancellation Policy | AV Art Academy",
  description,
  url: `${SITE_URL}/refund-policy`,
  dateModified: LAST_UPDATED_ISO,
  publisher: {
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: "AV Art Academy",
    url: SITE_URL,
  },
};

const linkClassName =
  "font-medium text-cyan-300 underline decoration-cyan-400/30 underline-offset-4 transition-colors hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-cyan-400";

function RefundIcon() {
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
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <path d="M2 10h20M6 15h4" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.521.149-.174.198-.298.298-.497.099-.199.05-.373-.025-.522-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.12 1.533 5.845L.057 23.428c-.073.28.178.538.46.476l5.698-1.457A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.826 9.826 0 01-5.013-1.374l-.36-.214-3.724.953.984-3.617-.234-.373A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
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
        first:pt-0 last:border-b-0
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

function TableOfContents() {
  return (
    <nav aria-label="Refund policy sections">
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
              <span className="shrink-0 text-cyan-400/70">
                {String(index + 1).padStart(2, "0")}.
              </span>

              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function RefundActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex items-center
          justify-center gap-2
          rounded-xl bg-emerald-500
          px-5 py-3
          text-sm font-bold
          text-[#052E16]
          transition-colors
          hover:bg-emerald-400
          focus-visible:outline-2
          focus-visible:outline-offset-2
          focus-visible:outline-emerald-400
        "
      >
        <WhatsAppIcon />
        Request via WhatsApp
      </a>

      <a
        href={REFUND_EMAIL_URL}
        className="
          inline-flex items-center
          justify-center gap-2
          rounded-xl border
          border-white/20
          bg-white/5 px-5 py-3
          text-sm font-semibold
          text-white
          transition-colors
          hover:border-cyan-400/40
          hover:bg-white/10
          focus-visible:outline-2
          focus-visible:outline-cyan-400
        "
      >
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m2 6 10 7 10-7" />
        </svg>
        Request via Email
      </a>
    </div>
  );
}

export default function RefundPolicyPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="bg-[#080D1D] text-white">
        {/* Hero Section */}
        <section
          aria-labelledby="refund-heading"
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
                    className="transition-colors hover:text-cyan-300"
                  >
                    Home
                  </Link>
                </li>

                <li aria-hidden="true">/</li>

                <li aria-current="page" className="text-cyan-300">
                  Refund Policy
                </li>
              </ol>
            </nav>

            <div className="mx-auto mt-14 max-w-3xl text-center">
              {/* Hero Icon */}
              <div
                className="
                  mx-auto flex h-16 w-16
                  items-center justify-center
                  rounded-2xl border
                  border-cyan-400/25
                  bg-cyan-400/10
                  text-cyan-300
                "
              >
                <RefundIcon />
              </div>

              <p
                className="
                  mt-6 text-xs font-semibold
                  uppercase tracking-[0.2em]
                  text-cyan-300
                "
              >
                AV Art Academy · Payments
              </p>

              <h1
                id="refund-heading"
                className="
                  mt-5 text-4xl font-extrabold
                  leading-tight tracking-tight
                  sm:text-5xl lg:text-6xl
                "
              >
                Refund &{" "}
                <span className="text-cyan-400">Cancellation Policy</span>
              </h1>

              <p
                className="
                  mx-auto mt-6 max-w-2xl
                  text-base leading-8
                  text-slate-300 sm:text-lg
                "
              >
                Understand our course purchase conditions, refund eligibility,
                payment-related assistance and cancellation process.
              </p>

              <div
                className="
                  mt-7 inline-flex
                  items-center gap-2
                  rounded-full border
                  border-white/10
                  bg-white/5 px-4 py-2
                  text-xs text-slate-300
                "
              >
                <span className="text-slate-400">Last updated:</span>

                <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED}</time>
              </div>

              <div className="mt-8">
                <a
                  href="#refund-request"
                  className="
                    inline-flex items-center
                    justify-center gap-2
                    rounded-xl bg-cyan-400
                    px-6 py-3.5
                    text-sm font-bold
                    text-[#061426]
                    transition-colors
                    hover:bg-cyan-300
                  "
                >
                  Request a Refund
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Policy Layout */}
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
            <div
              className="
                max-h-[calc(100dvh-9rem)]
                overflow-y-auto
                rounded-2xl border
                border-white/10
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

              <TableOfContents />
            </div>
          </aside>

          {/* Main Policy Content */}
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

              <div className="mt-5">
                <TableOfContents />
              </div>
            </details>

            {/* 01 - Introduction */}
            <PolicySection id="introduction" number="01" title="Introduction">
              <p>
                AV Art Academy aims to provide a transparent and reliable
                experience for students purchasing our educational courses and
                learning resources.
              </p>

              <p>
                This Refund & Cancellation Policy explains how refund requests,
                course cancellations and payment-related issues are handled
                across our website and mobile application.
              </p>

              <p>
                Please review this policy before purchasing any course, mock
                test, masterclass or digital learning resource from AV Art
                Academy.
              </p>

              <p>
                This policy should be read together with our{" "}
                <Link href="/terms" className={linkClassName}>
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className={linkClassName}>
                  Privacy Policy
                </Link>
                .
              </p>
            </PolicySection>

            {/* 02 - Scope */}
            <PolicySection id="scope" number="02" title="Scope of This Policy">
              <p>
                This policy applies to purchases of educational services and
                digital learning products offered by AV Art Academy, including:
              </p>

              <PolicyList
                items={[
                  "MAH AAC CET entrance examination preparation courses.",
                  "Elementary and Intermediate Grade examination preparation courses.",
                  "Recorded video lectures and online learning programmes.",
                  "Mock test series and previous-year question practice packages.",
                  "Digital study materials, PDFs and educational resources.",
                  "Art masterclasses and other paid learning services.",
                ]}
              />

              <p>
                Where a product or course has specific purchase or cancellation
                conditions, those conditions will also apply, provided they
                comply with applicable consumer protection requirements.
              </p>
            </PolicySection>

            {/* 03 - Course Purchases */}
            <PolicySection
              id="course-purchases"
              number="03"
              title="Course Purchases"
            >
              <p>
                Students should carefully review the course description,
                included learning materials, pricing, validity period and access
                conditions before completing a purchase.
              </p>

              <p>
                After successful payment verification, course access is
                activated according to the applicable enrollment conditions.
              </p>

              <PolicySubheading>Before Purchasing</PolicySubheading>

              <PolicyList
                items={[
                  "Confirm that you have selected the correct course.",
                  "Review the course content, features and access duration.",
                  "Check the final payable amount and applicable charges.",
                  "Review the refund and cancellation conditions communicated before payment.",
                  "Contact our support team if you have questions about a course.",
                ]}
              />

              <div
                className="
                  rounded-xl border
                  border-cyan-400/20
                  bg-cyan-400/5 p-5
                "
              >
                <p className="font-semibold text-cyan-300">
                  Need Help Choosing a Course?
                </p>

                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Contact us before purchasing if you need clarification about
                  the course, learning resources, fees or enrollment process.
                </p>

                <Link
                  href="/contact"
                  className="
                    mt-4 inline-flex
                    text-sm font-semibold
                    text-cyan-300
                    hover:text-cyan-200
                  "
                >
                  Contact AV Art Academy
                  <span aria-hidden="true"> →</span>
                </Link>
              </div>
            </PolicySection>

            {/* 04 - Refund Eligibility */}
            <PolicySection
              id="refund-eligibility"
              number="04"
              title="Refund Eligibility"
            >
              <p>
                Refund requests are reviewed according to the applicable
                purchase conditions, payment records, circumstances of the
                request and applicable law.
              </p>

              <PolicySubheading>Situations We Will Review</PolicySubheading>

              <PolicyList
                items={[
                  "A verified duplicate payment for the same purchase.",
                  "A successful payment where the purchased course or resource has not been provided.",
                  "An incorrect amount charged due to a confirmed payment or platform error.",
                  "A course or paid service cancelled by AV Art Academy.",
                  "A significant issue with the delivery of purchased educational services.",
                  "Other circumstances where a refund or remedy is required under applicable law.",
                ]}
              />

              <PolicySubheading>Change-of-Mind Requests</PolicySubheading>

              <p>
                Requests arising from a change of mind, personal scheduling
                difficulties, incorrect course selection or a decision not to
                continue studying will be handled according to the conditions
                applicable to the purchase and relevant consumer protection
                laws.
              </p>

              <p>
                Where a technical issue can be resolved, we may first offer
                reasonable assistance to restore access or provide the purchased
                service, without limiting any applicable rights to a refund or
                other remedy.
              </p>

              <p>
                Submitting a refund request does not automatically confirm
                approval. We will review the relevant information and
                communicate the outcome.
              </p>
            </PolicySection>

            {/* 05 - Digital Products */}
            <PolicySection
              id="digital-products"
              number="05"
              title="Digital Products & Learning Materials"
            >
              <p>
                AV Art Academy provides digital educational products that may
                become accessible immediately after successful payment and
                enrollment.
              </p>

              <PolicyList
                items={[
                  "Downloadable study materials and PDFs.",
                  "Recorded video lectures.",
                  "Mock test and previous-year question packages.",
                  "Digital masterclasses and course resources.",
                ]}
              />

              <p>
                Because digital products can be accessed or downloaded after
                purchase, their refund conditions may differ from those
                applicable to other services.
              </p>

              <p>
                Refund eligibility for digital products will be determined by
                the conditions communicated before purchase, the nature of the
                product, any access or delivery issues and applicable law.
              </p>

              <p>
                Accessing or downloading digital content does not remove any
                mandatory consumer rights that apply to defective, undelivered
                or misrepresented products.
              </p>
            </PolicySection>

            {/* 06 - Payment Failures */}
            <PolicySection
              id="payment-failures"
              number="06"
              title="Failed & Duplicate Payments"
            >
              <PolicySubheading>Failed Payments</PolicySubheading>

              <p>
                If a payment fails but an amount is deducted from your bank
                account or payment method, please check the transaction status
                with your bank or payment service provider.
              </p>

              <p>
                Failed or incomplete transactions may be reversed by the
                relevant bank or payment provider in accordance with its
                processing procedures.
              </p>

              <PolicySubheading>
                Successful Payment Without Course Access
              </PolicySubheading>

              <p>
                If your payment is successful but your course is not activated,
                please contact AV Art Academy with your payment reference and
                registered email address.
              </p>

              <p>
                We will investigate the payment and enrollment status and assist
                with course activation or the appropriate payment resolution.
              </p>

              <PolicySubheading>Duplicate Payments</PolicySubheading>

              <p>
                If you are charged more than once for the same purchase, contact
                our support team with the relevant transaction references.
              </p>

              <p>
                Verified duplicate charges will be corrected through the
                appropriate refund or payment resolution process.
              </p>

              <div
                className="
                  rounded-xl border
                  border-amber-400/20
                  bg-amber-400/5 p-5
                "
              >
                <p className="font-semibold text-amber-300">
                  Important Payment Advice
                </p>

                <p className="mt-2 text-sm leading-7 text-slate-300">
                  If your payment is pending, avoid making repeated payments
                  until you have checked the status of the original transaction.
                </p>
              </div>
            </PolicySection>

            {/* 07 - Cancellation */}
            <PolicySection
              id="cancellation"
              number="07"
              title="Course Cancellation"
            >
              <PolicySubheading>Cancellation by a Student</PolicySubheading>

              <p>
                Students who wish to cancel an enrollment should contact our
                support team as soon as possible.
              </p>

              <p>
                Eligibility for a cancellation and any associated refund depends
                on the course conditions, the services already provided and
                applicable law.
              </p>

              <PolicySubheading>
                Cancellation by AV Art Academy
              </PolicySubheading>

              <p>
                If AV Art Academy cancels a purchased course, masterclass or
                other paid service, affected students will be informed of the
                available options.
              </p>

              <p>Depending on the circumstances, these options may include:</p>

              <PolicyList
                items={[
                  "Rescheduling the purchased learning programme.",
                  "Providing an appropriate alternative with the student's agreement.",
                  "A partial or full refund, as applicable to the undelivered service and required by law.",
                ]}
              />

              <p>
                Students will not be required to accept an alternative service
                where they are entitled to a different remedy under applicable
                law.
              </p>
            </PolicySection>

            {/* 08 - Refund Request */}
            <PolicySection
              id="refund-request"
              number="08"
              title="How to Request a Refund"
            >
              <p>
                To request a refund or assistance with a payment-related issue,
                please follow the steps below.
              </p>

              {/* Request Process */}
              <ol className="space-y-4">
                {refundSteps.map((step, index) => (
                  <li
                    key={step.title}
                    className="
                      flex items-start gap-4
                      rounded-2xl border
                      border-white/10
                      bg-[#101A34] p-5
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="
                        flex h-10 w-10 shrink-0
                        items-center justify-center
                        rounded-xl
                        bg-cyan-400/10
                        text-sm font-bold
                        text-cyan-300
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3 className="font-semibold text-white">{step.title}</h3>

                      <p className="mt-2 text-sm leading-7 text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <PolicySubheading>Information Required</PolicySubheading>

              <PolicyList
                items={[
                  "Your registered name and email address.",
                  "Name of the purchased course or product.",
                  "Payment date and amount.",
                  "Payment transaction ID or order reference.",
                  "Reason for requesting a refund.",
                  "Relevant payment confirmation, if requested for verification.",
                ]}
              />

              <div
                className="
                  rounded-2xl border
                  border-cyan-400/20
                  bg-cyan-400/5
                  p-6 sm:p-8
                "
              >
                <h3 className="text-lg font-bold text-white">
                  Submit Your Refund Request
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Contact our support team using WhatsApp or email. Your message
                  will include a template so you can easily provide the required
                  purchase information.
                </p>

                <div className="mt-6">
                  <RefundActions />
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-400">
                  You can review and complete your message before sending it.
                  Opening WhatsApp or email does not automatically submit or
                  approve a refund.
                </p>
              </div>

              <p className="text-sm">
                For your security, never share your card PIN, CVV, banking
                password, UPI PIN or payment verification OTP when submitting a
                refund request.
              </p>
            </PolicySection>

            {/* 09 - Refund Processing */}
            <PolicySection
              id="refund-processing"
              number="09"
              title="Refund Processing"
            >
              <p>
                Once a refund request is received, AV Art Academy will review
                the relevant transaction details, enrollment records and
                applicable purchase conditions.
              </p>

              <PolicySubheading>Refund Approval</PolicySubheading>

              <p>
                If a refund is approved, we will communicate the applicable
                refund amount and processing details.
              </p>

              <p>
                Approved refunds will generally be processed through the
                original payment method, unless an alternative method is
                necessary and permitted.
              </p>

              <PolicySubheading>Processing Timeline</PolicySubheading>

              <p>
                Refund processing and credit timelines may depend on the payment
                provider, bank, payment method and transaction status.
              </p>

              <p>
                The estimated processing timeline will be communicated when the
                refund is approved or initiated, subject to applicable legal
                requirements.
              </p>

              <p>
                Where available, we will provide a refund reference to help you
                track the transaction.
              </p>

              <div
                className="
                  rounded-xl border
                  border-white/10
                  bg-[#101A34] p-5
                "
              >
                <p className="font-semibold text-white">Payment Provider</p>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Our supported online payment services include Razorpay.
                  Payment reversals and refunds may also be subject to the
                  procedures of the relevant payment provider and bank.
                </p>

                <a
                  href="https://razorpay.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-4 inline-flex
                    text-sm font-semibold
                    text-cyan-300
                    hover:text-cyan-200
                  "
                >
                  Visit Razorpay
                  <span aria-hidden="true"> ↗</span>
                </a>
              </div>
            </PolicySection>

            {/* 10 - Access After Refund */}
            <PolicySection
              id="course-access"
              number="10"
              title="Course Access After Refund"
            >
              <p>
                When a purchase is refunded or cancelled, access to the
                corresponding paid educational content may be adjusted or
                removed according to the refund conditions.
              </p>

              <PolicyList
                items={[
                  "Access to a fully refunded course may be revoked.",
                  "A refunded mock test package or digital resource may no longer be available through your account.",
                  "Partial refunds may affect only the relevant portion of a purchased service.",
                  "Other separately purchased courses should remain unaffected unless there is a separate lawful reason to restrict access.",
                ]}
              />

              <p>
                Account deletion and refunds are separate processes. Deleting an
                account does not automatically initiate a refund for previous
                purchases.
              </p>

              <p>
                For information about personal data and account deletion, please
                refer to our{" "}
                <Link
                  href="/privacy-policy#account-deletion"
                  className={linkClassName}
                >
                  Account & Data Deletion Policy
                </Link>
                .
              </p>
            </PolicySection>

            {/* 11 - Payment Disputes */}
            <PolicySection
              id="payment-disputes"
              number="11"
              title="Payment Disputes"
            >
              <p>
                If you believe that a payment was incorrect, unauthorized or not
                properly processed, please notify our support team with the
                relevant transaction information.
              </p>

              <p>
                We encourage students to contact us so that we can investigate
                and assist with resolving payment-related concerns.
              </p>

              <p>
                You may also contact your bank or payment provider directly to
                report an unauthorized transaction or exercise available payment
                dispute rights.
              </p>

              <p>
                Nothing in this policy limits your rights to pursue remedies
                through applicable consumer protection procedures or competent
                authorities.
              </p>
            </PolicySection>

            {/* 12 - Policy Updates */}
            <PolicySection
              id="policy-updates"
              number="12"
              title="Changes to This Policy"
            >
              <p>
                AV Art Academy may update this Refund & Cancellation Policy to
                reflect changes in its educational services, purchase processes
                or applicable legal requirements.
              </p>

              <p>
                Updated versions will be published on this page with a revised
                last-updated date.
              </p>

              <p>
                Changes will not remove rights already acquired under completed
                purchases or override mandatory consumer protection
                requirements.
              </p>
            </PolicySection>

            {/* 13 - Contact Support */}
            <PolicySection id="contact" number="13" title="Contact Support">
              <p>
                If you have questions about course purchases, refunds,
                cancellations or payment issues, please contact AV Art Academy.
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

                <p className="mt-2 text-sm text-slate-400">
                  Course & Payment Support
                </p>

                <div className="mt-6 space-y-5">
                  {/* Email */}
                  <div>
                    <p
                      className="
                        text-xs font-semibold
                        uppercase tracking-widest
                        text-slate-400
                      "
                    >
                      Support Email
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

                  {/* Phone */}
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

                  {/* Website */}
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
                      {SITE_URL}
                    </a>
                  </div>
                </div>

                <div className="mt-7">
                  <RefundActions />
                </div>
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
                Learn more about our platform, account usage and personal data
                protection practices.
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
                  href="/privacy-policy"
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
                  Privacy Policy
                </Link>

                <Link
                  href="/contact"
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
                  Contact Us
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
