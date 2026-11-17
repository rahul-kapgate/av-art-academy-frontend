
import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { apiRequest } from "@/src/lib/api/client";
import { ApiError } from "@/src/lib/api/apiError";

import type { CourseDetails } from "../types";

export async function getCourseBySlug(
  slug: string,
): Promise<CourseDetails | null> {
  "use cache";

  cacheLife({
    stale: 300,
    revalidate: 300,
    expire: 3600,
  });

  cacheTag("courses");
  cacheTag(`course:${slug}`);

  const apiBaseUrl = process.env.API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error(
      "API_BASE_URL is not configured.",
    );
  }

  if (!slug || slug === "." || slug === "..") {
    return null;
  }

  try {
    const course = await apiRequest<CourseDetails>({
      method: "GET",

      baseURL:
        `${apiBaseUrl.replace(/\/+$/, "")}/api/v1`,

      url: `/courses/${encodeURIComponent(slug)}`,

      requiresAuth: false,

      withCredentials: false,
    });

    if (
      !course ||
      typeof course.id !== "string" ||
      typeof course.title !== "string" ||
      typeof course.slug !== "string" ||
      !course.pricing ||
      !course.media ||
      !course.access
    ) {
      throw new ApiError(
        "Invalid course details response.",
        502,
      );
    }

    return course;
  } catch (error) {
    // Return null only when the course doesn't exist
    // or is not publicly available.
    if (
      error instanceof ApiError &&
      error.status === 404
    ) {
      return null;
    }

    // Let Next.js handle actual server/network errors.
    throw error;
  }
}
