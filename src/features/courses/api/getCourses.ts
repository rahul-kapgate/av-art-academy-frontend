
import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { apiRequest } from "@/src/lib/api/client";
import { ApiError } from "@/src/lib/api/apiError";

import type { Course } from "../types";

export async function getCourses(): Promise<Course[]> {
  "use cache";

  cacheLife({
    stale: 300,
    revalidate: 300,
    expire: 3600,
  });

  cacheTag("courses");

  const apiBaseUrl = process.env.API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API_BASE_URL is not configured.");
  }

  const courses = await apiRequest<Course[]>({
    method: "GET",

    baseURL: `${apiBaseUrl.replace(/\/+$/, "")}/api/v1`,

    url: "/courses",

    requiresAuth: false,

    withCredentials: false,
  });

  if (!Array.isArray(courses)) {
    throw new ApiError(
      "Invalid courses API response.",
      502,
    );
  }

  return courses;
}
