import type { FAQCategory } from "../types";

export const faqCategories: FAQCategory[] = [
  /* =========================================
     MAH AAC CET & EXAM PREPARATION
  ========================================== */
  {
    id: "exam-preparation",

    title: "MAH AAC CET & Exam Preparation",

    description: "Everything about preparing for your art entrance exam.",

    faqs: [
      {
        id: "what-is-av-art-academy",

        question: "What is AV Art Academy?",

        answer:
          "AV Art Academy is an online art learning platform focused on helping students prepare for MAH AAC CET and develop their drawing, design and creative skills through structured courses, video lessons, practical exercises and mock tests.",
      },

      {
        id: "what-is-mah-aac-cet",

        question: "What is MAH AAC CET?",

        answer:
          "MAH AAC CET is the Maharashtra Applied Arts and Crafts Common Entrance Test for admission to relevant undergraduate fine art programmes in Maharashtra. AV Art Academy provides preparation resources and practical art guidance for aspiring students.",

        link: {
          label: "Visit the official Maharashtra CET Cell",
          href: "https://cetcell.mahacet.org/",
          external: true,
        },
      },

      {
        id: "subjects-covered",

        question: "Which subjects are covered in your courses?",

        answer:
          "Our learning areas include perspective drawing, memory drawing, object drawing, still life, 2D design, colour theory and art awareness. We also provide exam preparation resources, mock tests and previous-year questions. Please check individual course details for the exact topics included.",
      },

      {
        id: "beginners-can-join",

        question: "Can I join if I have no previous drawing experience?",

        answer:
          "Yes. Beginners can start with foundational drawing concepts and gradually develop their artistic skills through structured lessons and regular practice. You can choose a course based on your current experience and preparation goals.",

        link: {
          label: "Explore beginner-friendly courses",
          href: "/courses",
        },
      },

      {
        id: "exam-preparation-time",

        question: "How long does it take to prepare for MAH AAC CET?",

        answer:
          "Preparation time depends on your current drawing skills, familiarity with the exam and daily practice schedule. We recommend starting early, following a structured learning plan and regularly practicing drawing exercises and mock tests. Each course includes an estimated duration to help you plan your learning.",
      },
    ],
  },

  /* =========================================
     COURSES & LEARNING
  ========================================== */
  {
    id: "courses-learning",

    title: "Courses & Learning",

    description: "Learn more about course content, access and practice.",

    faqs: [
      {
        id: "how-courses-work",

        question: "How do online courses work?",

        answer:
          "Choose a course from our course catalogue, review its content and enrollment details, and enroll to access the included learning resources. Depending on the course, these may include recorded video lessons, practical assignments, study materials, live sessions and mock tests.",

        link: {
          label: "Browse all courses",
          href: "/courses",
        },
      },

      {
        id: "free-courses",

        question: "Are there any free courses available?",

        answer:
          "You can explore our course catalogue to find available free and paid courses. Free courses are clearly marked, so you can identify learning resources that do not require a course fee.",

        link: {
          label: "Explore available courses",
          href: "/courses",
        },
      },

      {
        id: "recorded-live-classes",

        question: "Are the classes recorded or conducted live?",

        answer:
          "Course offerings may include recorded lectures, live classes or a combination of both. Recorded lessons allow you to learn at your own pace. Please review the 'This course includes' section on each course to understand the learning format before enrolling.",
      },

      {
        id: "mock-tests-pyqs",

        question: "Do you provide mock tests and previous-year questions?",

        answer:
          "Mock tests and previous-year questions are part of our exam preparation learning resources. These help students understand question patterns, practice regularly and evaluate their preparation. Availability depends on the selected course and its included resources.",
      },

      {
        id: "course-access-duration",

        question: "How long will I have access to my purchased course?",

        answer:
          "Course access duration may vary depending on the course and its enrollment terms. Please check the course details and applicable access conditions before purchasing. If you need clarification about course validity, our support team can help.",

        link: {
          label: "Contact our support team",
          href: "/contact",
        },
      },
    ],
  },

  /* =========================================
     PAYMENTS & ENROLLMENT
  ========================================== */
  {
    id: "payments-enrollment",

    title: "Payments & Enrollment",

    description: "Information about course fees, purchases and refunds.",

    faqs: [
      {
        id: "enroll-in-course",

        question: "How do I enroll in a course?",

        answer:
          "Visit the Courses page, select a course and review its description, pricing and included learning resources. Sign in to your account and follow the enrollment instructions. For paid courses, complete the payment process to gain access according to the course terms.",

        link: {
          label: "View available courses",
          href: "/courses",
        },
      },

      {
        id: "payment-methods",

        question: "Which payment methods are accepted?",

        answer:
          "AV Art Academy uses Razorpay for online payments. Available payment options may include UPI, debit cards, credit cards and net banking, depending on the payment gateway options displayed during checkout.",
      },

      {
        id: "secure-payments",

        question: "Are online payments secure?",

        answer:
          "Payments are processed through Razorpay's payment infrastructure. Always complete your purchase through the official AV Art Academy website or application. Never share your payment PIN, banking password or OTP with anyone.",

        link: {
          label: "Read our Privacy Policy",
          href: "/privacy-policy",
        },
      },

      {
        id: "payment-failed",

        question: "What should I do if my payment fails or money is deducted?",

        answer:
          "If your payment fails or your account is debited without receiving course access, please check your payment status and contact our support team with your registered email address, course name and transaction reference. We will help you investigate the issue.",

        link: {
          label: "Get payment support",
          href: "/contact",
        },
      },

      {
        id: "refund-policy",

        question: "Can I request a refund after purchasing a course?",

        answer:
          "Refund eligibility depends on the circumstances of your purchase and the applicable refund conditions. Please review our Refund and Cancellation Policy for information about eligible requests, payment issues and the refund process.",

        link: {
          label: "Read the Refund Policy",
          href: "/refund-policy",
        },
      },
    ],
  },

  /* =========================================
     ANDROID APP & ACCOUNT SUPPORT
  ========================================== */
  {
    id: "app-account-support",

    title: "Android App & Account Support",

    description:
      "Access your learning resources and get help with your account.",

    faqs: [
      {
        id: "android-app",

        question: "Does AV Art Academy have a mobile app?",

        answer:
          "Yes. AV Art Academy has an Android application available on Google Play. You can access learning resources, explore courses and continue your art preparation directly from your smartphone.",

        link: {
          label: "Download the Android app",
          href: "https://play.google.com/store/apps/details?id=com.rahulkapgatesteam.artisticvickey",
          external: true,
        },
      },

      {
        id: "website-app-account",

        question: "Can I use my existing account on the Android app?",

        answer:
          "Sign in to the Android app using the account associated with your AV Art Academy enrollment. If your enrolled courses are not appearing, check that you are using the correct account or contact our support team for assistance.",
      },

      {
        id: "forgot-password",

        question: "What should I do if I forget my password?",

        answer:
          "Use the Forgot Password option on the login screen and follow the instructions sent to your registered email address. If you originally signed in using Google, you can continue using your Google account.",

        link: {
          label: "Go to Login",
          href: "/login",
        },
      },

      {
        id: "delete-account",

        question: "Can I delete my AV Art Academy account?",

        answer:
          "You can request account deletion through the available account settings or by contacting our support team. Please review our Privacy Policy for information about account deletion, data retention and the handling of personal information.",

        link: {
          label: "Read our Privacy Policy",
          href: "/privacy-policy",
        },
      },

      {
        id: "contact-support",

        question: "How can I contact AV Art Academy for support?",

        answer:
          "You can contact our team through the Contact Us page for course guidance, enrollment assistance, technical issues, payment enquiries or general questions about your learning journey.",

        link: {
          label: "Contact AV Art Academy",
          href: "/contact",
        },
      },
    ],
  },
];
