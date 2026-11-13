
import type { CoursesResponse } from "../types";

export const mockCoursesResponse: CoursesResponse = {
  success: true,

  data: [
    {
      id: "aaf1a4a7-8531-41e0-a27e-f5850f781234",

      title: "MAH AAC CET Complete Preparation",

      slug: "mah-aac-cet-complete-preparation",

      shortDescription:
        "Complete preparation for MAH AAC CET with drawing, design, art awareness, mock tests and expert guidance.",

      thumbnailPath: "/courses/thumbnails/aac-cet.jpg",

      estimatedDurationMinutes: 7200,

      pricing: {
        isFree: false,
        priceAmount: 9999,
        salePriceAmount: 5999,
        currency: "INR",
      },

      courseIncludes: [
        "Recorded Lectures",
        "Live Classes",
        "Mock Tests",
        "Study Material",
      ],
    },

    {
      id: "b8f34d21-6c12-4e01-8d31-48fca9182001",

      title: "Perspective Drawing Masterclass",

      slug: "perspective-drawing-masterclass",

      shortDescription:
        "Master one-point, two-point and three-point perspective with practical drawing techniques and guided exercises.",

      thumbnailPath: "/courses/thumbnails/perspective.jpg",

      estimatedDurationMinutes: 2400,

      pricing: {
        isFree: false,
        priceAmount: 3999,
        salePriceAmount: 2499,
        currency: "INR",
      },

      courseIncludes: [
        "Recorded Lectures",
        "Drawing Exercises",
        "Practice Assignments",
        "Study Material",
      ],
    },

    {
      id: "c7b24a92-131a-473b-bb46-5df821830002",

      title: "2D Design & Colour Theory",

      slug: "2d-design-colour-theory",

      shortDescription:
        "Explore colour combinations, visual composition, design principles and creative techniques for art entrance exams.",

      thumbnailPath: "/courses/thumbnails/2d-design.jpg",

      estimatedDurationMinutes: 1800,

      pricing: {
        isFree: false,
        priceAmount: 2999,
        salePriceAmount: 1999,
        currency: "INR",
      },

      courseIncludes: [
        "Recorded Lectures",
        "Practical Exercises",
        "Study Material",
        "Practice Assignments",
      ],
    },

    {
      id: "d28af4d3-8a93-4b5f-a2d1-39c8d4510003",

      title: "Memory Drawing & Creative Composition",

      slug: "memory-drawing-creative-composition",

      shortDescription:
        "Improve observation, imagination and storytelling through memory drawing and creative composition exercises.",

      thumbnailPath: "/courses/thumbnails/memory-drawing.jpg",

      estimatedDurationMinutes: 1500,

      pricing: {
        isFree: false,
        priceAmount: 2499,
        salePriceAmount: 1499,
        currency: "INR",
      },

      courseIncludes: [
        "Recorded Lectures",
        "Composition Techniques",
        "Drawing Exercises",
        "Practice Assignments",
      ],
    },

    {
      id: "e1c4b5a8-27d3-48f0-b5a1-6c492a710004",

      title: "Object Drawing & Still Life",

      slug: "object-drawing-still-life",

      shortDescription:
        "Develop accurate observation, proportions, shading and rendering skills through practical still-life drawing lessons.",

      thumbnailPath: "/courses/thumbnails/object-drawing.jpg",

      estimatedDurationMinutes: 1200,

      pricing: {
        isFree: false,
        priceAmount: 1999,
        salePriceAmount: null,
        currency: "INR",
      },

      courseIncludes: [
        "Recorded Lectures",
        "Shading Techniques",
        "Practical Exercises",
        "Study Material",
      ],
    },

    {
      id: "f472d61e-9b40-4e32-a6c2-7e314b820005",

      title: "Introduction to MAH AAC CET",

      slug: "introduction-to-mah-aac-cet",

      shortDescription:
        "Begin your art entrance preparation with an introduction to the exam, essential drawing skills and sample practice questions.",

      thumbnailPath: "/courses/thumbnails/introduction.jpg",

      estimatedDurationMinutes: 180,

      pricing: {
        isFree: true,
        priceAmount: 0,
        salePriceAmount: null,
        currency: "INR",
      },

      courseIncludes: [
        "Introduction Lectures",
        "Exam Overview",
        "Sample Questions",
        "Preparation Guidance",
      ],
    },
  ],
};

export const mockCourses = mockCoursesResponse.data;
