import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import Header from "../landing/components/Header";
import Footer from "../landing/components/Footer";
import ContactForm from "./ContactForm";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://artisticvickey.in"
).replace(/\/$/, "");

const EMAIL = "vikkitembhurne358@gmail.com";
const PHONE = "+91 9325217691";

const WHATSAPP_URL = `https://wa.me/919325217691?text=${encodeURIComponent(
  "Hello AV Art Academy! I'm interested in MAH AAC CET coaching. Could you please share more information?",
)}`;

const description =
  "Contact AV Art Academy for MAH AAC CET coaching, art courses, admissions, fees, mock tests and enrollment enquiries. Reach us by WhatsApp, phone or email.";

export const metadata: Metadata = {
  title: "Contact Us | MAH AAC CET Coaching Enquiries",
  description,

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    title: "Contact AV Art Academy | Courses & Admissions",
    description,
    url: "/contact",
    type: "website",
    siteName: "AV Art Academy",
    locale: "en_IN",
  },

  twitter: {
    card: "summary",
    title: "Contact AV Art Academy",
    description,
  },

  robots: {
    index: true,
    follow: true,
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact#webpage`,
  name: "Contact AV Art Academy",
  url: `${SITE_URL}/contact`,
  description,
  mainEntity: {
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: "AV Art Academy",
    url: SITE_URL,
    email: EMAIL,
    telephone: "+919325217691",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: EMAIL,
      telephone: "+919325217691",
    },
  },
};

const faqs = [
  {
    question: "How can I contact AV Art Academy?",
    answer:
      "You can contact AV Art Academy through WhatsApp at +91 9325217691 or email at vikkitembhurne358@gmail.com. You can also use the enquiry form on this page.",
  },
  {
    question: "Can I enquire about MAH AAC CET coaching fees?",
    answer:
      "Yes. You can contact the academy to ask about available courses, fees, enrollment and learning resources.",
  },
  {
    question: "Can I ask questions before enrolling?",
    answer:
      "Yes. If you need information about course content, mock tests, study materials or getting started, you can send an enquiry before enrolling.",
  },
];

function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <span
      className="
        inline-flex items-center gap-2
        rounded-full border border-cyan-400/25
        bg-cyan-400/10 px-4 py-2
        text-xs font-semibold uppercase
        tracking-[0.15em] text-cyan-300
      "
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-cyan-400"
      />
      {children}
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function ContactIcon({ type }: { type: "whatsapp" | "mail" | "phone" }) {
  if (type === "whatsapp") {
    return (
      <svg
        aria-hidden="true"
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8A8.5 8.5 0 0 1 12.5 20a8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
        <path d="M9 9a6.5 6.5 0 0 0 6 6l1.3-1.3" />
      </svg>
    );
  }

  if (type === "mail") {
    return (
      <svg
        aria-hidden="true"
        width="26"
        height="26"
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
    );
  }

  return (
    <svg
      aria-hidden="true"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.7L7.1 10a16 16 0 0 0 6.9 6.9l1.6-1.9a2 2 0 0 1 1.7-.6l3 .5a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

type ContactCardProps = {
  icon: "whatsapp" | "mail" | "phone";
  title: string;
  description: string;
  detail: string;
  href: string;
  action: string;
  color: string;
  external?: boolean;
};

function ContactCard({
  icon,
  title,
  description,
  detail,
  href,
  action,
  color,
  external = false,
}: ContactCardProps) {
  return (
    <article
      className="
        group flex h-full flex-col
        rounded-2xl border border-white/10
        bg-[#101A34] p-6
        transition-all duration-200
        hover:-translate-y-1
        hover:border-cyan-400/30
        hover:bg-[#14203D]
      "
    >
      <div
        className={`
          flex h-14 w-14 items-center
          justify-center rounded-2xl
          border border-white/10
          bg-white/5 ${color}
        `}
      >
        <ContactIcon type={icon} />
      </div>

      <h3 className="mt-6 text-xl font-bold text-white">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>

      <p className="mt-4 break-all text-sm font-medium text-slate-200">
        {detail}
      </p>

      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="
          mt-auto inline-flex w-fit
          items-center gap-2 pt-7
          text-sm font-semibold text-cyan-300
          transition-colors hover:text-cyan-200
          focus-visible:rounded
          focus-visible:outline-2
          focus-visible:outline-cyan-400
        "
      >
        {action}
        <ArrowIcon />
      </a>
    </article>
  );
}

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="overflow-hidden bg-[#080D1D] text-white">
        {/* Hero */}
        <section
          aria-labelledby="contact-heading"
          className="
            relative overflow-hidden
            border-b border-white/5
            bg-gradient-to-br
            from-[#080D27] via-[#10194F]
            to-[#1A237E]
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              -right-24 -top-32
              h-[460px] w-[460px]
              rounded-full bg-cyan-400/10
              blur-[110px]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              -bottom-32 -left-20
              h-[400px] w-[400px]
              rounded-full bg-violet-500/10
              blur-[100px]
            "
          />

          <div
            className="
              relative mx-auto max-w-7xl
              px-6 pb-20 pt-10
              sm:pb-24 md:pt-12
            "
          >
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-cyan-300">
                    Home
                  </Link>
                </li>

                <li aria-hidden="true">/</li>

                <li aria-current="page" className="text-cyan-300">
                  Contact Us
                </li>
              </ol>
            </nav>

            <div className="mx-auto mt-16 max-w-3xl text-center">
              <SectionBadge>Get in Touch</SectionBadge>

              <h1
                id="contact-heading"
                className="
                  mt-7 text-4xl font-extrabold
                  leading-[1.15] tracking-tight
                  sm:text-5xl lg:text-6xl
                "
              >
                Have a Question?
                <span className="block text-cyan-400">Let's Connect.</span>
              </h1>

              <p
                className="
                  mx-auto mt-7 max-w-2xl
                  text-base leading-8 text-slate-300
                  sm:text-lg
                "
              >
                Whether you're exploring MAH AAC CET coaching, need help
                choosing a course, or have a question about enrollment, we'd
                love to hear from you.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <a
                  href="#send-enquiry"
                  className="
                    inline-flex items-center
                    justify-center gap-2
                    rounded-xl bg-cyan-400
                    px-6 py-3.5
                    text-sm font-bold text-[#061426]
                    transition-colors hover:bg-cyan-300
                  "
                >
                  Send an Enquiry
                  <ArrowIcon />
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center
                    justify-center gap-2
                    rounded-xl border
                    border-white/25 bg-white/5
                    px-6 py-3.5
                    text-sm font-semibold text-white
                    transition-colors hover:bg-white/10
                  "
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section
          aria-labelledby="contact-methods-heading"
          className="py-20 md:py-24"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <SectionBadge>Contact Details</SectionBadge>

              <h2
                id="contact-methods-heading"
                className="
                  mt-6 text-3xl font-bold
                  tracking-tight sm:text-4xl
                "
              >
                Choose How to
                <span className="text-cyan-400"> Reach Us</span>
              </h2>

              <p className="mt-5 leading-8 text-slate-400">
                Get in touch using whichever method works best for you.
              </p>
            </div>

            <div
              className="
                mt-12 grid gap-5
                md:grid-cols-3
              "
            >
              <ContactCard
                icon="whatsapp"
                title="WhatsApp"
                description="Ask about coaching, courses, admissions and learning resources."
                detail={PHONE}
                href={WHATSAPP_URL}
                action="Start WhatsApp Chat"
                color="text-green-400"
                external
              />

              <ContactCard
                icon="mail"
                title="Email Us"
                description="Send your course-related questions or detailed enquiries by email."
                detail={EMAIL}
                href={`mailto:${EMAIL}`}
                action="Send an Email"
                color="text-cyan-400"
              />

              <ContactCard
                icon="phone"
                title="Call Us"
                description="Prefer speaking directly? Use the number below to contact the academy."
                detail={PHONE}
                href="tel:+919325217691"
                action="Call Now"
                color="text-violet-400"
              />
            </div>
          </div>
        </section>

        {/* Enquiry Form */}
        <section
          id="send-enquiry"
          aria-labelledby="form-heading"
          className="
            scroll-mt-24
            bg-[#0B122A] py-20 md:py-28
          "
        >
          <div
            className="
              mx-auto grid max-w-7xl
              items-start gap-12 px-6
              lg:grid-cols-[0.85fr_1.15fr]
              lg:gap-20
            "
          >
            <div className="lg:sticky lg:top-28">
              <SectionBadge>Send an Enquiry</SectionBadge>

              <h2
                id="form-heading"
                className="
                  mt-6 text-3xl font-bold
                  leading-tight tracking-tight
                  sm:text-4xl
                "
              >
                Let's Talk About
                <span className="block text-cyan-400">
                  Your Creative Journey.
                </span>
              </h2>

              <p
                className="
                  mt-6 max-w-md text-base
                  leading-8 text-slate-400
                "
              >
                Have a question about MAH AAC CET preparation, available
                courses, fees, or how to get started?
              </p>

              <p
                className="
                  mt-4 max-w-md text-base
                  leading-8 text-slate-400
                "
              >
                Fill in your details and continue to WhatsApp with your enquiry
                already prepared.
              </p>

              <div
                className="
                  mt-9 rounded-2xl
                  border border-cyan-400/15
                  bg-cyan-400/5 p-6
                "
              >
                <p className="font-semibold text-cyan-300">Here to Help</p>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Whether you're just getting started with drawing or preparing
                  for an art entrance examination, you can ask questions before
                  choosing a course.
                </p>
              </div>
            </div>

            <div
              className="
                rounded-3xl border
                border-white/10 bg-[#101A34]
                p-6 shadow-2xl
                shadow-black/10
                sm:p-8 lg:p-10
              "
            >
              <h3 className="text-2xl font-bold">Tell Us About Your Enquiry</h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Complete the form below to prepare your WhatsApp message.
              </p>

              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section
          aria-labelledby="contact-faq-heading"
          className="py-20 md:py-24"
        >
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center">
              <SectionBadge>Common Questions</SectionBadge>

              <h2
                id="contact-faq-heading"
                className="
                  mt-6 text-3xl font-bold
                  sm:text-4xl
                "
              >
                Frequently Asked Questions
              </h2>

              <p className="mt-5 text-slate-400">
                A few quick answers before you contact us.
              </p>
            </div>

            <div className="mt-10 space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="
                    group rounded-xl border
                    border-white/10
                    bg-[#101A34] p-5
                    open:border-cyan-400/20
                  "
                >
                  <summary
                    className="
                      flex cursor-pointer
                      list-none items-center
                      justify-between gap-4
                      font-medium text-slate-100
                      marker:content-none
                    "
                  >
                    <span>{faq.question}</span>

                    <span
                      aria-hidden="true"
                      className="
                        shrink-0 text-xl
                        text-cyan-400
                        transition-transform
                        group-open:rotate-45
                      "
                    >
                      +
                    </span>
                  </summary>

                  <p
                    className="
                      mt-4 border-t
                      border-white/10 pt-4
                      text-sm leading-7 text-slate-400
                    "
                  >
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section
          className="
            bg-gradient-to-r
            from-[#10194F] to-[#1A237E]
            px-6 py-16 text-center md:py-20
          "
        >
          <div className="mx-auto max-w-2xl">
            <h2
              className="
                text-3xl font-extrabold
                tracking-tight sm:text-4xl
              "
            >
              Ready to Start
              <span className="text-cyan-400"> Learning?</span>
            </h2>

            <p className="mt-5 leading-8 text-slate-300">
              Explore our MAH AAC CET courses, mock tests and learning resources
              to take the next step.
            </p>

            <Link
              href="/#courses"
              className="
                mt-8 inline-flex items-center
                gap-2 rounded-xl bg-cyan-400
                px-7 py-3.5
                text-sm font-bold text-[#061426]
                transition-colors hover:bg-cyan-300
              "
            >
              Explore Courses
              <ArrowIcon />
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
