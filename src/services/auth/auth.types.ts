/**
 * Auth types — matches backend API response shapes.
 * Synced with lingkar-crm/src/services/auth/auth.types.ts
 */

/** Standard API response wrapper from backend */
export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta: {
    http_status: number;
  };
}

/** Login request payload — backend accepts email or phone as "login" */
export interface ILoginPayload {
  login: string;
  password: string;
}

/** Login success response data */
export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

/** Authenticated user profile from /auth/me */
export interface IUserAuth {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  role_id: number;
  phone: string | null;
  is_verified: boolean;
  deleted_at: string | null;
  sales_id: string | null;
  role_name: string;
}
