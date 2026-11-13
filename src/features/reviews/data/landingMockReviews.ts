
export interface LandingReview {
  id: string;
  name: string;
  initials: string;
  course: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  avatarColor: string;
}

export const landingMockReviews: LandingReview[] = [
  {
    id: "review-001",

    name: "Demo Student 01",

    initials: "D1",

    course: "MAH AAC CET Complete Preparation",

    rating: 5,

    comment:
      "The drawing lessons are easy to understand and follow. The structured practice exercises and mock tests make exam preparation much more manageable.",

    avatarColor: "bg-cyan-400/15 text-cyan-300",
  },

  {
    id: "review-002",

    name: "Demo Student 02",

    initials: "D2",

    course: "Perspective Drawing Masterclass",

    rating: 5,

    comment:
      "The step-by-step explanations helped me understand perspective drawing and improve my confidence. The practical exercises are especially useful.",

    avatarColor: "bg-violet-400/15 text-violet-300",
  },

  {
    id: "review-003",

    name: "Demo Student 03",

    initials: "D3",

    course: "2D Design & Colour Theory",

    rating: 4,

    comment:
      "The colour theory lessons and creative assignments make learning design interesting. I enjoyed practicing different compositions and colour combinations.",

    avatarColor: "bg-pink-400/15 text-pink-300",
  },

  {
    id: "review-004",

    name: "Demo Student 04",

    initials: "D4",

    course: "Memory Drawing & Creative Composition",

    rating: 5,

    comment:
      "The memory drawing exercises helped me develop new ideas and improve my observation skills. The lessons are well structured and easy to practice.",

    avatarColor: "bg-emerald-400/15 text-emerald-300",
  },

  {
    id: "review-005",

    name: "Demo Student 05",

    initials: "D5",

    course: "Object Drawing & Still Life",

    rating: 4,

    comment:
      "The shading techniques and practical demonstrations are very helpful. I can now understand proportions and object drawing much better.",

    avatarColor: "bg-amber-400/15 text-amber-300",
  },

  {
    id: "review-006",

    name: "Demo Student 06",

    initials: "D6",

    course: "Introduction to MAH AAC CET",

    rating: 5,

    comment:
      "The mock tests and previous-year questions helped me organize my preparation. It's convenient to learn and practice at my own pace.",

    avatarColor: "bg-blue-400/15 text-blue-300",
  },
];
