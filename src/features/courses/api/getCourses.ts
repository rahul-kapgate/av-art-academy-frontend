import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { mockCourses } from "../data/mockCourses";
import type { Course, CoursesResponse } from "../types";

export async function getCourses(): Promise<Course[]> {
  "use cache";

  cacheLife({
    stale: 300,
    revalidate: 300,
    expire: 3600,
  });

  cacheTag("courses");

  // Use dummy data during frontend development.
  const dataSource = process.env.COURSES_DATA_SOURCE || "mock";

  if (dataSource === "mock") {
    return mockCourses;
  }

  // Actual backend integration.
  const apiBaseUrl = process.env.API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API_BASE_URL is not configured.");
  }

  const endpoint = `${apiBaseUrl.replace(/\/$/, "")}/api/v1/courses`;

  const response = await fetch(endpoint, {
    method: "GET",

    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch courses: ${response.status}`);
  }

  const result: CoursesResponse = await response.json();

  if (!result.success || !Array.isArray(result.data)) {
    throw new Error("Invalid courses API response.");
  }

  return result.data;
}
