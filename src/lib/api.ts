/**
 * API client — Axios instance with silent refresh interceptor.
 *
 * Pattern matches lingkar-crm/src/lib/api.ts:
 * - Request interceptor: attaches Bearer token from secure storage
 * - Response interceptor: on 401, queues failed requests, refreshes token, retries
 * - Typed error handling
 *
 * Usage:
 *   import { api } from '@/lib/api';
 *   const res = await api.get<IUser>('/auth/me');
 */

import axios from 'axios';

import { ENV } from '@/config/env';
import { secureStorage } from '@/lib/secure-storage';
import { useErrorStore } from '@/store/useErrorStore';

import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';

// ─── Error types (same as CRM) ──────────────────────────────────────────────

export interface IFieldErrors {
  [key: string]: string[];
}

export interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
  errors?: IFieldErrors;
}

export interface CustomApiError {
  message: string;
  status?: number;
  errors?: IFieldErrors;
}

// ─── Failed queue for concurrent 401s ────────────────────────────────────────

interface FailedQueueItem {
  resolve: (token?: string) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

/** Callback to force-logout — set by auth store on init */
let onForceLogout: (() => void) | null = null;

export function setForceLogoutHandler(handler: () => void) {
  onForceLogout = handler;
}

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token ?? undefined);
    }
  });
  failedQueue = [];
};

// ─── Axios instance ──────────────────────────────────────────────────────────

const apiClient: AxiosInstance = axios.create({
  baseURL: ENV.API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

// ─── Request interceptor: attach Bearer token ────────────────────────────────

apiClient.interceptors.request.use(async (config) => {
  const token = await secureStorage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Response interceptor: silent refresh on 401 ─────────────────────────────

apiClient.interceptors.response.use(
  // Success: unwrap response.data (same as CRM)
  (response) => response.data,

  // Error: handle 401 with silent refresh
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only attempt refresh on 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise<string | undefined>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => apiClient(originalRequest))
          .catch((err: unknown) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await secureStorage.getRefreshToken();

        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        // Call refresh endpoint directly (not through apiClient to avoid interceptor loop)
        const res = await axios.post(
          `${ENV.API_URL}/auth/refresh-token`,
          { refresh_token: refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        );

        const newAccessToken: string = res.data?.data?.access_token;

        if (!newAccessToken) {
          throw new Error('No access token in refresh response');
        }

        // Store new access token
        await secureStorage.setAccessToken(newAccessToken);

        // Process queued requests
        processQueue(null, newAccessToken);

        // Retry original request
        return apiClient(originalRequest);
      } catch (refreshError: unknown) {
        processQueue(refreshError, null);

        // Force logout — clear tokens and redirect to login
        await secureStorage.clearTokens();
        onForceLogout?.();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Standard error handling (same as CRM)
    const customError: CustomApiError = {
      message: error.response?.data?.message || error.message || 'Terjadi kesalahan server',
      status: error.response?.status,
      errors: error.response?.data?.errors,
    };

    // Auto-show global error bottom sheet for non-form errors.
    // Only 422 with field-level `errors` object is considered a form validation error
    // (handled by screens). All other errors trigger the global bottom sheet.
    const isFormValidationError =
      customError.status === 422 &&
      customError.errors &&
      Object.keys(customError.errors).length > 0;

    if (!isFormValidationError) {
      useErrorStore.getState().showError(customError.message);
    }

    return Promise.reject(customError);
  },
);

// ─── Typed API methods (same interface as CRM) ──────────────────────────────

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) => apiClient.get<T, T>(url, config),

  post: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>) =>
    apiClient.post<T, T>(url, data, config),

  put: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>) =>
    apiClient.put<T, T>(url, data, config),

  patch: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>) =>
    apiClient.patch<T, T>(url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig) => apiClient.delete<T, T>(url, config),
} as const;
