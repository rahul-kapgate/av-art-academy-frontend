import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Header from "../landing/components/Header";
import Footer from "../landing/components/Footer";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://artisticvickey.in"
).replace(/\/$/, "");

const description =
  "Learn about AV Art Academy, founded by Vickey to help aspiring artists prepare for MAH AAC CET through art courses, video lessons, mock tests and practical guidance.";

export const metadata: Metadata = {
  title: "About Us | MAH AAC CET Art Coaching",
  description,

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title: "About AV Art Academy | Learn, Create & Grow",
    description,
    url: "/about",
    siteName: "AV Art Academy",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "About AV Art Academy",
    description,
  },

  robots: {
    index: true,
    follow: true,
  },
};

const learningAreas = [
  {
    number: "01",
    title: "Perspective Drawing",
    description:
      "Understand depth, proportion, space and visual perspective through drawing practice.",
  },
  {
    number: "02",
    title: "Object & Still Life Drawing",
    description:
      "Practice observation, composition, shading and accurate representation of objects.",
  },
  {
    number: "03",
    title: "Memory Drawing",
    description:
      "Develop visual memory, storytelling and the ability to express ideas through drawing.",
  },
  {
    number: "04",
    title: "2D Design & Colour Theory",
    description:
      "Explore balance, composition, colours, patterns and essential design principles.",
  },
  {
    number: "05",
    title: "Art Awareness & Aptitude",
    description:
      "Build foundational knowledge of art, design and exam-oriented aptitude topics.",
  },
  {
    number: "06",
    title: "Mock Tests & PYQs",
    description:
      "Practice with mock tests and previous-year questions to prepare for exam-style assessments.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Learn with Guidance",
    description:
      "Build your understanding of art and design concepts with structured lessons and practical explanations.",
  },
  {
    number: "02",
    title: "Practice with Purpose",
    description:
      "Use drawing exercises, mock tests, study resources and previous-year questions to strengthen your preparation.",
  },
  {
    number: "03",
    title: "Grow with Confidence",
    description:
      "Develop creative thinking, improve your technique and approach your art entrance preparation with greater clarity.",
  },
];

const faqs = [
  {
    question: "What is AV Art Academy?",
    answer:
      "AV Art Academy is an online art education platform focused on MAH AAC CET preparation, creative skill development and practical learning resources for aspiring artists.",
  },
  {
    question: "Who founded AV Art Academy?",
    answer:
      "AV Art Academy was founded by Vickey, an artist with an Applied Art background who shares drawing, design and entrance-exam preparation guidance.",
  },
  {
    question: "What subjects can students learn?",
    answer:
      "Learning topics include perspective drawing, memory drawing, object drawing, still life, 2D design, colour theory, art awareness and exam practice.",
  },
  {
    question: "Does AV Art Academy offer mock tests?",
    answer:
      "Yes. Students can explore mock test courses and previous-year question practice designed to support MAH AAC CET preparation.",
  },
  {
    question: "Can students learn online?",
    answer:
      "Yes. AV Art Academy provides online learning resources, including video lessons, study material and practice-based content.",
  },
];

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
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="
        inline-flex items-center gap-2
        rounded-full border border-cyan-400/25
        bg-cyan-400/10 px-4 py-2
        text-xs font-semibold tracking-widest
        text-cyan-300 uppercase
      "
    >
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
      {children}
    </span>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about#webpage`,
  name: "About AV Art Academy",
  url: `${SITE_URL}/about`,
  description,
  mainEntity: {
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: "AV Art Academy",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.jpeg`,
    description: "Online art education and MAH AAC CET preparation platform.",
    founder: {
      "@type": "Person",
      name: "Vickey",
    },
    sameAs: [
      "https://www.instagram.com/artistic.Vickey",
      "https://www.youtube.com/@ArtisticVickey",
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="overflow-hidden bg-[#080D1D] text-white">
        {/* Hero Section */}
        <section
          aria-labelledby="about-heading"
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
              -right-20 -top-32 h-[450px] w-[450px]
              rounded-full bg-cyan-400/10 blur-[110px]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              -bottom-40 left-0 h-[400px] w-[400px]
              rounded-full bg-violet-500/10 blur-[100px]
            "
          />

          <div
            className="
              relative mx-auto grid max-w-7xl
              items-center gap-14 px-6
              py-16 md:py-24 lg:grid-cols-2
              lg:gap-20 lg:py-28
            "
          >
            <div>
              <nav
                aria-label="Breadcrumb"
                className="mb-8 text-sm text-slate-400"
              >
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
                    About Us
                  </li>
                </ol>
              </nav>

              <SectionBadge>About AV Art Academy</SectionBadge>

              <h1
                id="about-heading"
                className="
                  mt-7 max-w-2xl text-4xl
                  leading-[1.13] font-extrabold
                  tracking-tight sm:text-5xl
                  lg:text-[60px]
                "
              >
                Inspiring the
                <span className="text-cyan-400"> Next Generation </span>
                of Artists.
              </h1>

              <p
                className="
                  mt-7 max-w-xl text-base
                  leading-8 text-slate-300
                  sm:text-lg
                "
              >
                At AV Art Academy, we believe every creative journey begins with
                curiosity, practice and the right guidance.
              </p>

              <p
                className="
                  mt-4 max-w-xl text-base
                  leading-8 text-slate-400
                "
              >
                We help aspiring artists develop their drawing and design skills
                while preparing for MAH AAC CET and other creative learning
                opportunities.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/#courses"
                  className="
                    inline-flex items-center
                    justify-center gap-2
                    rounded-xl bg-cyan-400
                    px-6 py-3.5
                    text-sm font-bold text-[#061426]
                    transition-colors
                    hover:bg-cyan-300
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-cyan-400
                  "
                >
                  Explore Courses
                  <ArrowIcon />
                </Link>

                <a
                  href="#our-story"
                  className="
                    inline-flex items-center
                    justify-center rounded-xl
                    border border-white/20
                    bg-white/5 px-6 py-3.5
                    text-sm font-semibold
                    text-white transition-colors
                    hover:bg-white/10
                  "
                >
                  Our Story
                </a>
              </div>
            </div>

            {/* Brand Visual */}
            <div className="relative mx-auto w-full max-w-md">
              <div
                className="
                  relative overflow-hidden
                  rounded-[32px]
                  border border-cyan-400/20
                  bg-[#07162F]/80
                  p-7 shadow-2xl
                  shadow-black/30 sm:p-10
                "
              >
                <div
                  aria-hidden="true"
                  className="
                    absolute -right-20 -top-20
                    h-64 w-64 rounded-full
                    bg-cyan-400/10 blur-3xl
                  "
                />

                <div className="relative flex flex-col items-center text-center">
                  <div
                    className="
                      flex h-28 w-28 items-center
                      justify-center rounded-3xl
                      bg-white p-3 shadow-xl
                      shadow-cyan-400/10
                      sm:h-36 sm:w-36
                    "
                  >
                    <Image
                      src="/logo.jpeg"
                      alt="AV Art Academy official logo"
                      width={144}
                      height={144}
                      sizes="(max-width: 640px) 112px, 144px"
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <h2 className="mt-7 text-2xl font-bold tracking-tight">
                    <span className="text-cyan-400">AV Art</span> Academy
                  </h2>

                  <p className="mt-2 text-sm tracking-[0.2em] text-slate-400 uppercase">
                    Inspire. Create. Master.
                  </p>

                  <div className="my-8 h-px w-full bg-white/10" />

                  <p className="max-w-xs text-sm leading-7 text-slate-300">
                    A creative learning space for future artists, designers and
                    art entrance exam aspirants.
                  </p>

                  <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {["Learn", "Create", "Practice", "Grow"].map((item) => (
                      <span
                        key={item}
                        className="
                          rounded-full border
                          border-cyan-400/20
                          bg-cyan-400/5
                          px-3 py-1.5
                          text-xs font-medium
                          text-cyan-200
                        "
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section
          id="our-story"
          aria-labelledby="story-heading"
          className="scroll-mt-24 py-20 md:py-28"
        >
          <div
            className="
              mx-auto grid max-w-7xl
              items-start gap-12 px-6
              lg:grid-cols-2 lg:gap-20
            "
          >
            <div>
              <SectionBadge>Our Story</SectionBadge>

              <h2
                id="story-heading"
                className="
                  mt-6 text-3xl font-bold
                  tracking-tight sm:text-4xl
                "
              >
                More than an academy.
                <span className="block text-cyan-400">A place to create.</span>
              </h2>

              <div
                className="
                  mt-8 h-1 w-20
                  rounded-full bg-cyan-400
                "
              />
            </div>

            <div className="space-y-5 text-base leading-8 text-slate-400">
              <p>
                AV Art Academy was founded by Vickey with a passion for art,
                design and sharing creative knowledge.
              </p>

              <p>
                The academy brings together art education and entrance exam
                preparation through structured courses, drawing practice, video
                lessons, mock tests and study resources.
              </p>

              <p>
                Our aim is to make creative learning approachable and
                meaningful, helping students strengthen their fundamentals,
                explore their abilities and prepare with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section
          aria-label="Our mission and vision"
          className="bg-[#0B122A] py-16 md:py-20"
        >
          <div
            className="
              mx-auto grid max-w-7xl
              gap-6 px-6 md:grid-cols-2
            "
          >
            <article
              className="
                rounded-3xl border
                border-cyan-400/15
                bg-gradient-to-br
                from-cyan-400/10 to-transparent
                p-8 md:p-10
              "
            >
              <span className="text-sm font-bold tracking-widest text-cyan-400">
                OUR MISSION
              </span>

              <h2 className="mt-5 text-2xl font-bold">
                Make Creative Learning Accessible
              </h2>

              <p className="mt-5 leading-8 text-slate-400">
                To help aspiring artists strengthen their artistic foundations
                through practical education, guided preparation and useful
                learning resources.
              </p>
            </article>

            <article
              className="
                rounded-3xl border
                border-violet-400/15
                bg-gradient-to-br
                from-violet-400/10 to-transparent
                p-8 md:p-10
              "
            >
              <span className="text-sm font-bold tracking-widest text-violet-300">
                OUR VISION
              </span>

              <h2 className="mt-5 text-2xl font-bold">
                Nurture Future Creative Talent
              </h2>

              <p className="mt-5 leading-8 text-slate-400">
                To create a supportive space where learners can express their
                ideas, improve their skills and pursue opportunities in art and
                design.
              </p>
            </article>
          </div>
        </section>

        {/* Founder */}
        <section
          id="founder"
          aria-labelledby="founder-heading"
          className="scroll-mt-24 py-20 md:py-28"
        >
          <div
            className="
              mx-auto grid max-w-7xl
              items-center gap-12 px-6
              lg:grid-cols-2 lg:gap-20
            "
          >
            <div
              className="
                relative flex min-h-[340px]
                items-center justify-center
                overflow-hidden rounded-3xl
                border border-white/10
                bg-gradient-to-br
                from-[#121E4B] to-[#071426]
                p-8
              "
            >
              <div
                aria-hidden="true"
                className="
                  absolute h-64 w-64
                  rounded-full border
                  border-cyan-400/15
                "
              />
              <div
                aria-hidden="true"
                className="
                  absolute h-52 w-52
                  rounded-full border
                  border-dashed
                  border-cyan-400/20
                "
              />

              <div className="relative text-center">
                <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border-4 border-cyan-400/40 shadow-[0_0_35px_rgba(34,211,238,0.15)] sm:h-44 sm:w-44">
                  <Image
                    src="/vicky.jpg"
                    alt="Vickey, founder of AV Art Academy"
                    fill
                    sizes="(max-width: 640px) 144px, 176px"
                    className="object-cover object-center"
                  />
                </div>

                <p className="mt-6 text-2xl font-bold">Vickey</p>

                <p className="mt-2 text-sm text-cyan-300">
                  Founder · Artist · Mentor
                </p>
              </div>
            </div>

            <div>
              <SectionBadge>Meet the Founder</SectionBadge>

              <h2
                id="founder-heading"
                className="
                  mt-6 text-3xl font-bold
                  tracking-tight sm:text-4xl
                "
              >
                Meet Vickey
                <span className="block text-cyan-400">
                  The Artist Behind the Academy
                </span>
              </h2>

              <div className="mt-7 space-y-5 leading-8 text-slate-400">
                <p>
                  Vickey is the founder of AV Art Academy, an artist passionate
                  about drawing, design, visual communication and creative
                  education.
                </p>

                <p>
                  His creative journey includes studying Applied Art at
                  Government College of Art & Design, Nagpur, where he has
                  developed knowledge of drawing, design and visual
                  storytelling.
                </p>

                <p>
                  Through AV Art Academy, he shares practical knowledge and
                  learning guidance to help aspiring artists build their skills
                  and prepare for art entrance examinations.
                </p>
              </div>

              <Link
                href="/#courses"
                className="
                  mt-8 inline-flex items-center
                  gap-2 font-semibold
                  text-cyan-400
                  transition-colors
                  hover:text-cyan-300
                "
              >
                Explore Learning Opportunities
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>

        {/* Learning Areas */}
        <section
          aria-labelledby="learning-heading"
          className="bg-[#0B122A] py-20 md:py-28"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <SectionBadge>What We Teach</SectionBadge>

              <h2
                id="learning-heading"
                className="
                  mt-6 text-3xl font-bold
                  tracking-tight sm:text-4xl
                "
              >
                Build Skills That
                <span className="text-cyan-400"> Matter</span>
              </h2>

              <p className="mt-5 leading-8 text-slate-400">
                Explore the foundations of visual art and exam-oriented
                preparation through practical learning topics.
              </p>
            </div>

            <div
              className="
                mt-12 grid gap-5
                sm:grid-cols-2 lg:grid-cols-3
              "
            >
              {learningAreas.map((area) => (
                <article
                  key={area.number}
                  className="
                    group rounded-2xl border
                    border-white/10
                    bg-[#101A34] p-7
                    transition-colors
                    hover:border-cyan-400/30
                    hover:bg-[#13203F]
                  "
                >
                  <span
                    className="
                      text-sm font-bold
                      tracking-widest text-cyan-400
                    "
                  >
                    {area.number}
                  </span>

                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {area.title}
                  </h3>

                  <p
                    className="
                      mt-4 text-sm leading-7
                      text-slate-400
                    "
                  >
                    {area.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Approach */}
        <section aria-labelledby="approach-heading" className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <SectionBadge>Our Approach</SectionBadge>

              <h2
                id="approach-heading"
                className="
                  mt-6 text-3xl font-bold
                  tracking-tight sm:text-4xl
                "
              >
                Learn. Practice.
                <span className="text-cyan-400"> Grow.</span>
              </h2>
            </div>

            <div
              className="
                mt-12 grid gap-6
                md:grid-cols-3
              "
            >
              {benefits.map((benefit) => (
                <article
                  key={benefit.number}
                  className="
                    rounded-2xl border
                    border-white/10
                    bg-white/[0.03] p-7
                  "
                >
                  <div
                    className="
                      flex h-12 w-12
                      items-center justify-center
                      rounded-xl bg-cyan-400/10
                      text-lg font-bold
                      text-cyan-400
                    "
                  >
                    {benefit.number}
                  </div>

                  <h3 className="mt-6 text-xl font-bold">{benefit.title}</h3>

                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    {benefit.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section
          className="
            relative overflow-hidden
            bg-gradient-to-r
            from-[#10194F] to-[#1A237E]
            py-20
          "
        >
          <div
            className="
              relative mx-auto max-w-3xl
              px-6 text-center
            "
          >
            <SectionBadge>Your Creative Journey Starts Here</SectionBadge>

            <h2
              className="
                mt-7 text-3xl font-extrabold
                tracking-tight sm:text-5xl
              "
            >
              Ready to Turn Your
              <span className="text-cyan-400"> Passion into Progress?</span>
            </h2>

            <p
              className="
                mx-auto mt-6 max-w-xl
                text-base leading-8
                text-slate-300
              "
            >
              Explore our courses and learning resources designed to help you
              develop your skills and prepare for your next creative step.
            </p>

            <div
              className="
                mt-9 flex flex-wrap
                justify-center gap-4
              "
            >
              <Link
                href="/#courses"
                className="
                  inline-flex items-center
                  gap-2 rounded-xl
                  bg-cyan-400 px-7 py-3.5
                  text-sm font-bold
                  text-[#061426]
                  transition-colors
                  hover:bg-cyan-300
                "
              >
                Explore Courses
                <ArrowIcon />
              </Link>

              <Link
                href="/contact"
                className="
                  inline-flex items-center
                  rounded-xl border
                  border-white/25
                  px-7 py-3.5
                  text-sm font-semibold
                  text-white transition-colors
                  hover:bg-white/10
                "
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Search-engine structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
