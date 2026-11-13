import "client-only";

import axios, { type AxiosRequestConfig } from "axios";

import { ApiError, normalizeApiError } from "./apiError";

import type { ApiResponse } from "./types";

/* =========================================
   AXIOS INSTANCE
========================================== */

const apiClient = axios.create({
  baseURL: "/api/v1",

  timeout: 20000,

  withCredentials: true,

  headers: {
    Accept: "application/json",
  },
});

/* =========================================
   COMMON API REQUEST
========================================== */

export async function apiRequest<T>(
  config: AxiosRequestConfig,
  allowEmptyResponse = false,
): Promise<T> {
  try {
    const response = await apiClient.request<ApiResponse<T> | "" | null>(
      config,
    );

    const result = response.data;

    // Support logout and other empty responses.
    if (
      allowEmptyResponse &&
      (response.status === 204 || result === "" || result === null)
    ) {
      return undefined as T;
    }

    // Validate the common API response.
    if (!result || typeof result !== "object") {
      throw new ApiError("Invalid server response.", 502);
    }

    if (result.success !== true) {
      throw new ApiError(
        result.message || "Unable to complete the request.",
        response.status,
      );
    }

    if (allowEmptyResponse) {
      return undefined as T;
    }

    if (!("data" in result)) {
      throw new ApiError("Server response is missing data.", 502);
    }

    return result.data;
  } catch (error) {
    // Preserve intentional request cancellation.
    if (axios.isCancel(error)) {
      throw error;
    }

    throw normalizeApiError(error);
  }
}
