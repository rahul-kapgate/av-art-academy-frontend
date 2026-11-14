import axios, {
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";

import { ApiError, normalizeApiError } from "./apiError";

import type { ApiResponse } from "./types";

/* =========================================
   AUTHENTICATED REQUEST CONFIG
========================================== */

interface ApiRequestConfig extends AxiosRequestConfig {
  requiresAuth?: boolean;
}

interface InternalApiRequestConfig extends InternalAxiosRequestConfig {
  requiresAuth?: boolean;

  _authRetried?: boolean;
}

type AccessTokenProvider = (rejectedToken?: string) => Promise<string | null>;

/* =========================================
   ACCESS TOKEN PROVIDER
========================================== */

let getValidAccessToken: AccessTokenProvider | null = null;

export function configureApiAuth(provider: AccessTokenProvider) {
  getValidAccessToken = provider;

  return () => {
    if (getValidAccessToken === provider) {
      getValidAccessToken = null;
    }
  };
}

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
   REQUEST INTERCEPTOR
========================================== */

apiClient.interceptors.request.use(async (config) => {
  const request = config as InternalApiRequestConfig;

  // Public APIs and authentication endpoints
  // do not need an access token.
  if (!request.requiresAuth) {
    return config;
  }

  // Only attach tokens to our own API.
  if (
    request.baseURL !== "/api/v1" ||
    !request.url?.startsWith("/") ||
    request.url.startsWith("//")
  ) {
    throw new ApiError("Invalid protected API URL.", 400);
  }

  if (!getValidAccessToken) {
    throw new ApiError("Authentication is not initialized.", 401);
  }

  // AuthProvider checks whether the token
  // is valid or needs refreshing.
  const accessToken = await getValidAccessToken();

  if (!accessToken) {
    throw new ApiError("Please sign in to continue.", 401);
  }

  request.headers.set("Authorization", `Bearer ${accessToken}`);

  return request;
});

/* =========================================
   RESPONSE INTERCEPTOR
========================================== */

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as
      | InternalApiRequestConfig
      | undefined;

    /* =====================================
       HANDLE UNEXPECTED 401
    ===================================== */

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      !originalRequest.requiresAuth ||
      originalRequest._authRetried ||
      !getValidAccessToken
    ) {
      return Promise.reject(error);
    }

    // Automatically retry only safe read requests.
    // Do not replay payments or other mutations.
    if (originalRequest.method?.toLowerCase() !== "get") {
      return Promise.reject(error);
    }

    // Prevent infinite retry loops.
    originalRequest._authRetried = true;

    try {
      const authorization = originalRequest.headers.get("Authorization");

      const rejectedToken =
        typeof authorization === "string" && authorization.startsWith("Bearer ")
          ? authorization.slice(7)
          : undefined;

      // Refresh the rejected token.
      // AuthProvider handles concurrent refreshes.
      const accessToken = await getValidAccessToken(rejectedToken);

      if (!accessToken) {
        throw new ApiError(
          "Your session has expired. Please sign in again.",
          401,
        );
      }

      originalRequest.headers.set("Authorization", `Bearer ${accessToken}`);

      // Retry the original request once.
      return apiClient.request(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);

/* =========================================
   CENTRALIZED API REQUEST
========================================== */

export async function apiRequest<T>(
  config: ApiRequestConfig,

  allowEmptyResponse = false,
): Promise<T> {
  try {
    const response = await apiClient.request<ApiResponse<T> | "" | null>(
      config,
    );

    const result = response.data;

    // Logout or other empty responses.
    if (
      allowEmptyResponse &&
      (response.status === 204 || result === "" || result === null)
    ) {
      return undefined as T;
    }

    // Validate response structure.
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
    if (axios.isCancel(error)) {
      throw error;
    }

    throw normalizeApiError(error);
  }
}
