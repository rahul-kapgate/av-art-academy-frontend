import Link from "next/link";

import { faqCategories } from "@/src/features/faqs/data/faqs";

import type { FAQ, FAQCategory } from "@/src/features/faqs/types";

function QuestionIcon() {
  return (
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
      <circle cx="12" cy="12" r="9" />

      <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4" />

      <path d="M12 17h.01" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="
          M21 11.5a8.4 8.4 0 0 1-.9 3.8
          8.5 8.5 0 0 1-7.6 4.7
          8.4 8.4 0 0 1-3.8-.9
          L3 21l1.9-5.7
          a8.4 8.4 0 0 1-.9-3.8
          8.5 8.5 0 0 1 4.7-7.6
          8.4 8.4 0 0 1 3.8-.9h.5
          a8.5 8.5 0 0 1 8 8v.5Z
        "
      />
    </svg>
  );
}

/* =========================================
   REUSABLE FAQ ITEM
========================================== */

interface FAQItemProps {
  faq: FAQ;
  groupName: string;
}

function FAQItem({ faq, groupName }: FAQItemProps) {
  const linkClassName = `
    inline-flex items-center gap-2
    text-sm font-semibold text-cyan-300
    transition-colors
    hover:text-cyan-200
    focus-visible:outline-2
    focus-visible:outline-offset-4
    focus-visible:outline-cyan-400
  `;

  return (
    <details
      id={`faq-${faq.id}`}
      name={groupName}
      className="
        group/faq overflow-hidden
        rounded-xl border
        border-white/10
        bg-[#101A34]

        transition-colors duration-200

        hover:border-white/20

        open:border-cyan-400/35
        open:bg-[#13203D]
      "
    >
      {/* Question */}
      <summary
        className="
          flex min-h-16
          cursor-pointer list-none
          items-center justify-between
          gap-4 px-4 py-4
          sm:px-5

          [&::-webkit-details-marker]:hidden

          focus-visible:outline-2
          focus-visible:outline-inset
          focus-visible:outline-cyan-400
        "
      >
        <span
          className="
            text-sm font-semibold
            leading-6 text-slate-200
            transition-colors

            group-open/faq:text-cyan-300
          "
        >
          {faq.question}
        </span>

        {/* Expand / Collapse Icon */}
        <span
          className="
            flex h-8 w-8
            shrink-0 items-center
            justify-center rounded-full
            border border-cyan-400/15
            bg-cyan-400/5
            text-cyan-300

            transition-[transform,background-color]
            duration-200

            group-open/faq:rotate-45
            group-open/faq:bg-cyan-400/15

            motion-reduce:transition-none
          "
        >
          <PlusIcon />
        </span>
      </summary>

      {/* Answer */}
      <div
        className="
          px-4 pb-5
          sm:px-5
        "
      >
        <div className="border-t border-white/10 pt-4">
          <p
            className="
              text-sm leading-7
              text-slate-400
            "
          >
            {faq.answer}
          </p>

          {/* Optional Related Link */}
          {faq.link && (
            <div className="mt-4">
              {faq.link.external ? (
                <a
                  href={faq.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  {faq.link.label}
                  <ArrowIcon />
                </a>
              ) : (
                <Link href={faq.link.href} className={linkClassName}>
                  {faq.link.label}
                  <ArrowIcon />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </details>
  );
}

/* =========================================
   REUSABLE FAQ CATEGORY
========================================== */

function FAQGroup({ category }: { category: FAQCategory }) {
  return (
    <div className="min-w-0">
      {/* Category Heading */}
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="
              flex h-9 w-9
              shrink-0 items-center
              justify-center rounded-lg
              border border-cyan-400/15
              bg-cyan-400/10
              text-cyan-300
            "
          >
            <QuestionIcon />
          </span>

          <h3
            className="
              text-base font-bold
              leading-snug tracking-tight
              text-white
              sm:text-lg
            "
          >
            {category.title}
          </h3>
        </div>

        <p
          className="
            mt-2 text-xs
            leading-6 text-slate-400
            sm:text-sm
          "
        >
          {category.description}
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {category.faqs.map((faq) => (
          <FAQItem
            key={faq.id}
            faq={faq}
            groupName={`faq-group-${category.id}`}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================================
   MAIN FAQ SECTION
========================================== */

function FAQSection() {
  return (
    <section
      id="faqs"
      aria-labelledby="faq-heading"
      className="
        relative isolate overflow-hidden
        scroll-mt-24
        border-t border-white/5
        bg-[#080D1D]
        font-sans text-white
      "
    >
      {/* Background Gradient */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-linear-to-br
          from-[#080D1D]
          via-[#0C142B]
          to-[#101638]
        "
      />

      {/* Decorative Background Grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)]
          bg-size-[48px_48px]
        "
      />

      {/* Decorative Glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-40 top-0
          h-[450px] w-[450px]
          rounded-full bg-cyan-400/5
          blur-[130px]
        "
      />

      {/* Main Container */}
      <div
        className="
          relative mx-auto
          max-w-7xl px-4 py-14
          sm:px-8 sm:py-16
          lg:py-20
        "
      >
        {/* =========================================
            SECTION HEADER
        ========================================== */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Section Label */}
          <div
            className="
              inline-flex items-center
              gap-2 rounded-full
              border border-cyan-400/20
              bg-cyan-400/5
              px-4 py-2
              text-[11px] font-semibold
              uppercase tracking-[0.12em]
              text-cyan-300
            "
          >
            <QuestionIcon />
            Frequently Asked Questions
          </div>

          {/* Main Heading */}
          <h2
            id="faq-heading"
            className="
              mt-5 text-3xl
              font-extrabold
              leading-[1.15]
              tracking-[-0.04em]
              sm:text-4xl
              lg:text-5xl
            "
          >
            Have Questions?{" "}
            <span
              className="
                bg-linear-to-r
                from-cyan-300
                via-cyan-400
                to-blue-400
                bg-clip-text
                text-transparent
              "
            >
              We&apos;ve Got Answers.
            </span>
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto mt-4
              max-w-2xl
              text-sm leading-7
              text-slate-400
              sm:text-base sm:leading-8
            "
          >
            Everything you need to know about MAH AAC CET preparation, our
            online art courses, enrollment, payments and learning with AV Art
            Academy.
          </p>
        </div>

        {/* =========================================
            FAQ CATEGORY NAVIGATION
        ========================================== */}
        <nav
          aria-label="FAQ categories"
          className="
            mt-8 flex flex-wrap
            items-center justify-center
            gap-2 sm:gap-3
          "
        >
          {faqCategories.map((category) => (
            <a
              key={category.id}
              href={`#faq-category-${category.id}`}
              className="
                inline-flex items-center
                rounded-full border
                border-white/10
                bg-white/5
                px-4 py-2.5

                text-xs font-medium
                text-slate-300

                transition-colors
                hover:border-cyan-400/30
                hover:bg-cyan-400/10
                hover:text-cyan-300

                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-cyan-400
              "
            >
              {category.title}
            </a>
          ))}
        </nav>

        {/* =========================================
            FAQ CATEGORIES
        ========================================== */}
        <div
          className="
            mt-10 grid
            grid-cols-1 items-start
            gap-x-8 gap-y-10

            lg:mt-12 lg:grid-cols-2
            lg:gap-x-10 lg:gap-y-12
          "
        >
          {faqCategories.map((category) => (
            <div
              key={category.id}
              id={`faq-category-${category.id}`}
              className="min-w-0 scroll-mt-28"
            >
              <FAQGroup category={category} />
            </div>
          ))}
        </div>

        {/* =========================================
            CONTACT SUPPORT CTA
        ========================================== */}
        <div
          className="
            relative mt-12
            overflow-hidden rounded-2xl
            border border-cyan-400/15
            bg-linear-to-r
            from-[#101A34]
            to-[#13234A]
            p-6 sm:p-8
            lg:mt-16
          "
        >
          {/* Decorative Glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              -right-16 -top-20
              h-56 w-56
              rounded-full
              bg-cyan-400/10
              blur-[70px]
            "
          />

          <div
            className="
              relative flex flex-col
              gap-5 sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* Support Information */}
            <div className="flex items-start gap-4">
              {/* Support Icon */}
              <div
                className="
                  flex h-12 w-12
                  shrink-0 items-center
                  justify-center rounded-xl
                  border border-cyan-400/20
                  bg-cyan-400/10
                  text-cyan-300
                  sm:h-14 sm:w-14
                "
              >
                <MessageIcon />
              </div>

              <div>
                <h3
                  className="
                    text-lg font-bold
                    tracking-tight
                    text-white sm:text-xl
                  "
                >
                  Still have questions?
                </h3>

                <p
                  className="
                    mt-2 max-w-xl
                    text-sm leading-7
                    text-slate-400
                  "
                >
                  Our team is here to help you with course selection,
                  admissions, payments and your creative learning journey.
                </p>
              </div>
            </div>

            {/* Contact Button */}
            <Link
              href="/contact"
              className="
                group inline-flex
                min-h-12 shrink-0
                items-center justify-center
                gap-2.5 self-start
                rounded-xl bg-cyan-400
                px-6 py-3
                text-sm font-bold
                text-[#061426]

                transition-colors
                hover:bg-cyan-300

                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-cyan-400

                sm:self-auto
              "
            >
              Contact Us
              <span
                className="
                  transition-transform
                  motion-safe:group-hover:translate-x-1
                "
              >
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
