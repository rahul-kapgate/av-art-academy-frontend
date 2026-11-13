
import axios from "axios";

import type { ApiErrorResponse } from "./types";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly errors?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function normalizeApiError(
  error: unknown
): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const status = error.response?.status ?? 0;

    const data = error.response?.data;

    const message =
      typeof data?.message === "string"
        ? data.message
        : status === 0
          ? "Unable to connect to the server. Please try again."
          : "Something went wrong. Please try again.";

    return new ApiError(
      message,
      status,
      data?.errors
    );
  }

  return new ApiError(
    "An unexpected error occurred.",
    0
  );
}

export function getApiErrorMessage(
  error: unknown
): string {
  return normalizeApiError(error).message;
}
