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

// Update when the terms are officially published or revised.
const LAST_UPDATED = "12 November 2026";
const LAST_UPDATED_ISO = "2026-11-12";

const description =
  "Read AV Art Academy's Terms of Use covering student accounts, MAH AAC CET courses, payments, educational resources, intellectual property and acceptable use.";

export const metadata: Metadata = {
  title: "Terms of Use",
  description,

  alternates: {
    canonical: "/terms",
  },

  openGraph: {
    title: "Terms of Use | AV Art Academy",
    description,
    url: "/terms",
    siteName: "AV Art Academy",
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary",
    title: "Terms of Use | AV Art Academy",
    description,
  },

  robots: {
    index: true,
    follow: true,
  },
};

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "eligibility", title: "Eligibility" },
  { id: "user-accounts", title: "User Accounts" },
  { id: "educational-services", title: "Educational Services" },
  { id: "course-access", title: "Course Access & Enrollment" },
  { id: "payments", title: "Payments & Pricing" },
  { id: "refunds", title: "Cancellations & Refunds" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "acceptable-use", title: "Acceptable Use" },
  { id: "student-content", title: "Student Content & Reviews" },
  { id: "third-party-services", title: "Third-Party Services" },
  { id: "disclaimer", title: "Educational Disclaimer" },
  { id: "availability", title: "Platform Availability" },
  { id: "termination", title: "Account Termination" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "privacy", title: "Privacy & Data Protection" },
  { id: "governing-law", title: "Governing Law & Disputes" },
  { id: "changes", title: "Changes to These Terms" },
  { id: "contact", title: "Contact Us" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/terms#webpage`,
  name: "Terms of Use | AV Art Academy",
  description,
  url: `${SITE_URL}/terms`,
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

function DocumentIcon() {
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M8 13h8M8 17h8" />
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
          text-sm leading-7 text-slate-300
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

function TableOfContents({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav aria-label={mobile ? "Mobile terms navigation" : "Terms navigation"}>
      <ol className={mobile ? "space-y-3" : "space-y-1"}>
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`
                flex items-start gap-2
                rounded-lg px-3 py-2.5
                leading-5 text-slate-400
                transition-colors
                hover:bg-cyan-400/5
                hover:text-cyan-300
                focus-visible:outline-2
                focus-visible:outline-cyan-400
                ${mobile ? "text-sm" : "text-xs"}
              `}
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

export default function TermsPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="bg-[#080D1D] text-white">
        {/* Hero Section */}
        <section
          aria-labelledby="terms-heading"
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
                  Terms of Use
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
                <DocumentIcon />
              </div>

              <p
                className="
                  mt-6 text-xs font-semibold
                  uppercase tracking-[0.2em]
                  text-cyan-300
                "
              >
                AV Art Academy · Legal
              </p>

              <h1
                id="terms-heading"
                className="
                  mt-5 text-4xl font-extrabold
                  tracking-tight
                  sm:text-5xl lg:text-6xl
                "
              >
                Terms of <span className="text-cyan-400">Use</span>
              </h1>

              <p
                className="
                  mx-auto mt-6 max-w-2xl
                  text-base leading-8
                  text-slate-300 sm:text-lg
                "
              >
                Please read these terms carefully before accessing our website,
                mobile application, courses and educational services.
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
            <div
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

              <TableOfContents />
            </div>
          </aside>

          {/* Terms Content */}
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
                <TableOfContents mobile />
              </div>
            </details>

            {/* 01 - Introduction */}
            <PolicySection id="introduction" number="01" title="Introduction">
              <p>
                Welcome to AV Art Academy, an online educational platform
                dedicated to art education, creative skill development and
                preparation for the Maharashtra Applied Arts and Crafts Common
                Entrance Test (MAH AAC CET).
              </p>

              <p>
                These Terms of Use govern your access to and use of our website,
                mobile application, courses, video lectures, mock tests, study
                materials and related educational services.
              </p>

              <p>
                These terms apply to{" "}
                <a href={SITE_URL} className={linkClassName}>
                  {SITE_URL}
                </a>
                , the AV Art Academy mobile application, and other services
                provided by AV Art Academy.
              </p>

              <p>
                References to &ldquo;we,&rdquo; &ldquo;us,&rdquo; and
                &ldquo;our&rdquo; refer to AV Art Academy. References to
                &ldquo;you&rdquo; and &ldquo;your&rdquo; refer to students,
                parents, guardians and other users of our services.
              </p>
            </PolicySection>

            {/* 02 - Acceptance */}
            <PolicySection
              id="acceptance"
              number="02"
              title="Acceptance of Terms"
            >
              <p>
                By accessing or using our services, creating an account or
                enrolling in a course, you agree to comply with these Terms of
                Use and applicable laws.
              </p>

              <p>
                Please review these terms together with our{" "}
                <Link href="/privacy-policy" className={linkClassName}>
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/refund-policy" className={linkClassName}>
                  Refund Policy
                </Link>
                .
              </p>

              <p>
                If you do not agree with these terms, you should not create an
                account or purchase services through the platform.
              </p>

              <p>
                Nothing in these terms limits any mandatory consumer rights or
                other protections available to you under applicable law.
              </p>
            </PolicySection>

            {/* 03 - Eligibility */}
            <PolicySection id="eligibility" number="03" title="Eligibility">
              <p>
                AV Art Academy provides educational services for aspiring
                artists, art entrance examination candidates and individuals
                interested in developing creative skills.
              </p>

              <PolicyList
                items={[
                  "You must provide accurate and complete information when registering or purchasing a course.",
                  "If you are under 18 years of age, a parent or legal guardian must review these terms and authorize your use of paid services where required by law.",
                  "You must comply with applicable laws and use the platform for lawful educational purposes.",
                ]}
              />

              <p>
                Our courses are intended to support learning and exam
                preparation. Eligibility for official entrance examinations is
                determined by the relevant examination authorities.
              </p>
            </PolicySection>

            {/* 04 - User Accounts */}
            <PolicySection id="user-accounts" number="04" title="User Accounts">
              <p>
                Certain features, including course access, mock tests and
                learning progress, require an AV Art Academy student account.
              </p>

              <PolicySubheading>Account Registration</PolicySubheading>

              <p>
                You may create an account using supported registration methods,
                including email-based registration or Google Sign-In, where
                available.
              </p>

              <PolicySubheading>Account Responsibilities</PolicySubheading>

              <PolicyList
                items={[
                  "Maintain accurate and up-to-date account information.",
                  "Keep your password and authentication credentials confidential.",
                  "Do not share your account credentials with unauthorized individuals.",
                  "Do not sell, rent or transfer your account or course access without permission.",
                  "Notify us promptly if you suspect unauthorized access to your account.",
                ]}
              />

              <p>
                You are responsible for taking reasonable steps to protect your
                account and notifying us of suspicious activity. This does not
                remove our responsibility to maintain appropriate platform
                security.
              </p>
            </PolicySection>

            {/* 05 - Educational Services */}
            <PolicySection
              id="educational-services"
              number="05"
              title="Educational Services"
            >
              <p>
                AV Art Academy offers educational content and learning resources
                designed to help students develop their artistic and creative
                abilities.
              </p>

              <PolicyList
                items={[
                  "MAH AAC CET entrance examination preparation courses.",
                  "Perspective drawing, memory drawing and object drawing lessons.",
                  "Still life, sketching, shading and composition practice.",
                  "2D design, colour theory and art awareness resources.",
                  "Mock tests and previous-year question practice.",
                  "Video lectures, digital study materials and other course resources.",
                  "Masterclasses and other creative learning programmes, where offered.",
                ]}
              />

              <p>
                The exact features, learning materials, duration and support
                included in each course are described on the relevant course
                page.
              </p>

              <p>
                Not every course includes every feature listed above. Please
                review the course details before purchasing.
              </p>
            </PolicySection>

            {/* 06 - Course Access */}
            <PolicySection
              id="course-access"
              number="06"
              title="Course Access & Enrollment"
            >
              <p>
                When you enroll in a course, you receive access to the
                educational content and features included in that course,
                subject to these terms and the applicable enrollment conditions.
              </p>

              <PolicySubheading>Course Access Conditions</PolicySubheading>

              <PolicyList
                items={[
                  "Paid course access is provided after successful payment verification, unless otherwise stated.",
                  "Course access is intended for the enrolled student.",
                  "The access duration is determined by the applicable course description and purchase terms.",
                  "Free courses and promotional learning resources may have separate access conditions.",
                  "Access to a course does not transfer ownership of its educational content.",
                ]}
              />

              <PolicySubheading>Access Duration and Expiry</PolicySubheading>

              <p>
                Course validity, access expiry and any applicable renewal
                conditions will be communicated in the course details or
                purchase information.
              </p>

              <p>
                Please review these conditions before enrolling. If your course
                access has expired, contact our support team for available
                options.
              </p>

              <div
                className="
                  rounded-xl border
                  border-cyan-400/20
                  bg-cyan-400/5 p-5
                "
              >
                <p className="text-sm font-semibold text-cyan-300">Important</p>

                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Purchasing a course does not grant permission to redistribute,
                  resell or commercially reproduce its lectures, tests or study
                  materials.
                </p>
              </div>
            </PolicySection>

            {/* 07 - Payments */}
            <PolicySection id="payments" number="07" title="Payments & Pricing">
              <p>
                Certain courses and educational resources are available for
                purchase through AV Art Academy.
              </p>

              <PolicySubheading>Course Pricing</PolicySubheading>

              <PolicyList
                items={[
                  "Course prices and applicable charges are displayed before purchase.",
                  "Prices are generally displayed in Indian Rupees (INR), unless otherwise stated.",
                  "Applicable taxes and other charges will be communicated as part of the purchase process.",
                  "Discounts and promotional offers may be subject to eligibility and validity conditions.",
                  "Price changes apply to future purchases and do not retroactively alter a completed purchase.",
                ]}
              />

              <PolicySubheading>Payment Processing</PolicySubheading>

              <p>
                Payments may be processed through supported third-party payment
                providers, including Razorpay.
              </p>

              <p>
                Payment authorization, verification and transaction processing
                are subject to the applicable payment provider's terms and
                supported payment methods.
              </p>

              <p>
                If a payment is deducted but your course is not activated,
                please contact our support team with your transaction reference
                so that we can investigate.
              </p>

              <p>
                Do not share your banking password, card PIN, UPI PIN or payment
                verification OTP with anyone claiming to represent AV Art
                Academy.
              </p>
            </PolicySection>

            {/* 08 - Refunds */}
            <PolicySection
              id="refunds"
              number="08"
              title="Cancellations & Refunds"
            >
              <p>
                Course cancellations and refund requests are handled in
                accordance with our published Refund Policy, applicable purchase
                conditions and consumer protection laws.
              </p>

              <p>
                Refund eligibility may depend on the type of purchase, the
                circumstances of the request and the applicable course
                conditions.
              </p>

              <p>
                Please review our Refund Policy before making a purchase.
                Nothing in that policy or these terms excludes remedies
                available under applicable law for deficient or misrepresented
                services.
              </p>

              <div
                className="
                  rounded-2xl border
                  border-white/10
                  bg-[#101A34] p-6
                "
              >
                <h3 className="font-semibold text-white">Need a Refund?</h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Review our refund guidelines or contact support with your
                  purchase details and transaction reference.
                </p>

                <Link
                  href="/refund-policy"
                  className="
                    mt-5 inline-flex
                    rounded-lg border
                    border-cyan-400/30
                    bg-cyan-400/10
                    px-5 py-3
                    text-sm font-semibold
                    text-cyan-300
                    transition-colors
                    hover:bg-cyan-400/20
                  "
                >
                  View Refund Policy
                </Link>
              </div>
            </PolicySection>

            {/* 09 - Intellectual Property */}
            <PolicySection
              id="intellectual-property"
              number="09"
              title="Intellectual Property"
            >
              <p>
                Educational content, website design, branding, videos,
                illustrations, course materials and other resources provided
                through AV Art Academy are protected by applicable intellectual
                property laws.
              </p>

              <p>
                Such content is owned by AV Art Academy or its respective rights
                holders and is made available for authorized use.
              </p>

              <PolicySubheading>Permitted Use</PolicySubheading>

              <p>
                Students are granted a limited, non-exclusive and
                non-transferable permission to access enrolled course materials
                for personal educational purposes during the applicable access
                period.
              </p>

              <PolicySubheading>Restricted Activities</PolicySubheading>

              <PolicyList
                items={[
                  "Recording or copying protected video lectures without authorization.",
                  "Uploading paid course content to public websites, social media or file-sharing platforms without permission.",
                  "Selling or distributing course materials to unauthorized individuals.",
                  "Removing copyright notices, watermarks or ownership information.",
                  "Using our educational content to create competing commercial products without permission.",
                ]}
              />

              <p>
                These restrictions do not limit uses permitted by applicable
                copyright law or permissions expressly granted by the relevant
                rights holder.
              </p>
            </PolicySection>

            {/* 10 - Acceptable Use */}
            <PolicySection
              id="acceptable-use"
              number="10"
              title="Acceptable Use"
            >
              <p>
                You agree to use AV Art Academy responsibly, respectfully and
                for lawful purposes.
              </p>

              <p>The following activities are prohibited:</p>

              <PolicyList
                items={[
                  "Attempting to gain unauthorized access to accounts, servers or protected course resources.",
                  "Sharing login credentials to bypass paid course access restrictions.",
                  "Uploading malicious software or attempting to disrupt platform functionality.",
                  "Using automated tools to bypass access controls or extract restricted course content.",
                  "Submitting fraudulent payments, misleading information or false identities.",
                  "Harassing, threatening or abusing other students, instructors or academy staff.",
                  "Publishing unlawful, harmful or infringing content through the platform.",
                  "Interfering with assessments or engaging in dishonest activities that undermine test integrity.",
                ]}
              />

              <p>
                We may investigate suspected misuse and take proportionate
                action to protect students, educational content and platform
                security.
              </p>
            </PolicySection>

            {/* 11 - Student Content */}
            <PolicySection
              id="student-content"
              number="11"
              title="Student Content & Reviews"
            >
              <p>
                AV Art Academy may allow students to submit reviews, ratings,
                artwork, assessment responses and other learning-related
                content.
              </p>

              <p>
                You retain ownership of original artwork and other content that
                you create, subject to the rights of any third-party rights
                holders.
              </p>

              <PolicyList
                items={[
                  "You must have the necessary rights or permissions to submit content.",
                  "Reviews and ratings should reflect genuine experiences and honest opinions.",
                  "Submitted content must not violate the rights or privacy of others.",
                  "We may remove spam, abusive, unlawful or infringing content.",
                ]}
              />

              <p>
                By submitting content, you permit us to store, process and
                display it as reasonably necessary to provide the relevant
                platform feature.
              </p>

              <p>
                We will seek appropriate permission before using identifiable
                student artwork, photographs or testimonials for public
                promotional purposes.
              </p>

              <p>
                Personal information associated with student submissions is
                handled in accordance with our{" "}
                <Link href="/privacy-policy" className={linkClassName}>
                  Privacy Policy
                </Link>
                .
              </p>
            </PolicySection>

            {/* 12 - Third Party Services */}
            <PolicySection
              id="third-party-services"
              number="12"
              title="Third-Party Services"
            >
              <p>
                Our platform may use third-party services to support
                authentication, payment processing, hosting, video delivery and
                communication.
              </p>

              <PolicyList
                items={[
                  "Google services for supported account authentication.",
                  "Payment providers such as Razorpay for online transactions.",
                  "Cloud infrastructure and storage providers for platform operations.",
                  "External communication and social media services.",
                ]}
              />

              <p>
                When using an external service, additional terms and privacy
                policies of that provider may apply.
              </p>

              <p>
                AV Art Academy is not responsible for the independent practices
                of external websites or services, except where responsibility is
                imposed by applicable law.
              </p>
            </PolicySection>

            {/* 13 - Educational Disclaimer */}
            <PolicySection
              id="disclaimer"
              number="13"
              title="Educational Disclaimer"
            >
              <p>
                AV Art Academy provides independent educational resources
                intended to support art education and preparation for entrance
                examinations.
              </p>

              <p>
                Our courses, mock tests and study materials are intended for
                learning and practice. They do not constitute official
                examination papers, results or admission decisions unless
                expressly identified as such.
              </p>

              <PolicyList
                items={[
                  "Enrollment does not guarantee examination success, a particular score, rank or admission to an institution.",
                  "Learning outcomes depend on individual effort, practice, preparation and other relevant factors.",
                  "Official examination patterns, eligibility criteria, dates and admission rules may change.",
                  "Students should verify official examination information with the relevant authorities.",
                ]}
              />

              <p>
                AV Art Academy is an independent coaching platform and does not
                conduct MAH AAC CET or make official admission decisions.
              </p>

              <p>
                For official MAH AAC CET information, students should refer to
                the{" "}
                <a
                  href="https://cetcell.mahacet.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  Maharashtra State Common Entrance Test Cell
                </a>
                .
              </p>
            </PolicySection>

            {/* 14 - Platform Availability */}
            <PolicySection
              id="availability"
              number="14"
              title="Platform Availability"
            >
              <p>
                We aim to provide reliable access to our educational services.
                However, temporary interruptions may occur because of
                maintenance, infrastructure issues, software updates or external
                service outages.
              </p>

              <p>
                We may update course materials, improve platform features or
                correct technical and educational errors from time to time.
              </p>

              <p>
                Where a material change affects a purchased course, we will
                handle the matter in accordance with the relevant purchase
                conditions and applicable consumer rights.
              </p>

              <p>
                If you experience difficulty accessing purchased content, please
                contact our support team.
              </p>
            </PolicySection>

            {/* 15 - Termination */}
            <PolicySection
              id="termination"
              number="15"
              title="Account Termination"
            >
              <p>
                You may stop using AV Art Academy at any time and request
                deletion of your account through the available account deletion
                process.
              </p>

              <PolicySubheading>Suspension or Termination</PolicySubheading>

              <p>
                We may restrict or suspend access where reasonably necessary in
                circumstances including:
              </p>

              <PolicyList
                items={[
                  "Material or repeated violations of these Terms of Use.",
                  "Fraudulent activity or unauthorized use of payment methods.",
                  "Unauthorized distribution of protected course materials.",
                  "Security threats, harmful activity or unlawful use of the platform.",
                  "Requirements imposed by applicable law or valid legal orders.",
                ]}
              />

              <p>
                Where appropriate, we will provide notice and an opportunity to
                resolve the issue before imposing a permanent restriction,
                except where immediate action is necessary for security or legal
                reasons.
              </p>

              <p>
                Account termination and deletion may affect access to purchased
                courses, learning progress and saved results. Any refund or
                other remedy will be handled under the applicable policy and
                law.
              </p>

              <p>
                For information about account deletion and personal data
                retention, refer to our{" "}
                <Link
                  href="/privacy-policy#account-deletion"
                  className={linkClassName}
                >
                  Account & Data Deletion Policy
                </Link>
                .
              </p>
            </PolicySection>

            {/* 16 - Liability */}
            <PolicySection
              id="liability"
              number="16"
              title="Limitation of Liability"
            >
              <p>
                AV Art Academy takes reasonable care to provide useful
                educational content and a reliable learning experience.
              </p>

              <p>
                To the extent permitted by applicable law, we are not
                responsible for losses arising solely from unauthorized account
                use attributable to the user, independent third-party service
                failures or circumstances beyond our reasonable control.
              </p>

              <p>
                We do not guarantee specific academic results, admission
                outcomes or uninterrupted platform availability.
              </p>

              <p>
                Nothing in these terms excludes or restricts liability that
                cannot lawfully be excluded, including liability arising from
                fraud or other conduct for which exclusion is prohibited by law.
              </p>

              <p>
                These terms do not limit your statutory consumer rights or
                remedies for deficient services.
              </p>
            </PolicySection>

            {/* 17 - Privacy */}
            <PolicySection
              id="privacy"
              number="17"
              title="Privacy & Data Protection"
            >
              <p>
                We handle personal information in accordance with our Privacy
                Policy and applicable data protection requirements.
              </p>

              <p>
                Our Privacy Policy explains how we collect, use, store, share
                and protect information associated with student accounts,
                learning activities, payments and other platform features.
              </p>

              <Link href="/privacy-policy" className={linkClassName}>
                Read our Privacy Policy
              </Link>
            </PolicySection>

            {/* 18 - Governing Law */}
            <PolicySection
              id="governing-law"
              number="18"
              title="Governing Law & Disputes"
            >
              <p>
                These Terms of Use are governed by the applicable laws of India,
                subject to any mandatory protections that apply to you.
              </p>

              <p>
                If you have a complaint or dispute relating to our services, we
                encourage you to contact AV Art Academy so that we can
                understand and address your concern.
              </p>

              <p>
                You may also pursue remedies through competent courts, consumer
                commissions or other authorities with jurisdiction under
                applicable law.
              </p>

              <p>
                Nothing in these terms prevents you from exercising your rights
                under applicable consumer protection legislation.
              </p>
            </PolicySection>

            {/* 19 - Changes */}
            <PolicySection
              id="changes"
              number="19"
              title="Changes to These Terms"
            >
              <p>
                We may revise these Terms of Use from time to time to reflect
                changes in our services, platform features, business practices
                or legal requirements.
              </p>

              <p>
                Updated terms will be published on this page together with a
                revised &ldquo;Last updated&rdquo; date.
              </p>

              <p>
                Where required, we will provide appropriate notice of material
                changes or obtain renewed acceptance.
              </p>

              <p>
                Changes will not remove rights already acquired under completed
                purchases or override mandatory legal protections.
              </p>
            </PolicySection>

            {/* 20 - Contact */}
            <PolicySection id="contact" number="20" title="Contact Us">
              <p>
                If you have questions about these Terms of Use, course access,
                purchases, account issues or complaints, please contact AV Art
                Academy.
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
                Learn more about our privacy practices and course refund
                conditions.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
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
