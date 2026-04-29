/**
 * Auth service — API calls for authentication.
 *
 * Usage:
 *   import { authService } from '@/services/auth';
 *   const res = await authService.login({ login: 'user@email.com', password: '...' });
 */

import { api } from '@/lib/api';

import type {
  IApiResponse,
  ILoginPayload,
  ILoginResponse,
  IRegisterPayload,
  IRegisterResponse,
  IUserAuth,
  IVerifyOtpPayload,
} from './auth.types';

export const authService = {
  /** Login with email/phone + password */
  login: (payload: ILoginPayload) =>
    api.post<IApiResponse<ILoginResponse>, ILoginPayload>('/auth/login', payload),

  /** Get authenticated user profile */
  me: () => api.get<IApiResponse<IUserAuth>>('/auth/me'),

  /** Logout — revoke tokens on backend */
  logout: () => api.post<IApiResponse<null>>('/auth/logout'),

  /** Register a new user account */
  register: (payload: IRegisterPayload) =>
    api.post<IApiResponse<IRegisterResponse>, IRegisterPayload>('/auth/register', payload),

  /** Verify OTP code for account verification */
  verifyOtp: (payload: IVerifyOtpPayload) =>
    api.post<IApiResponse<null>, IVerifyOtpPayload>('/auth/otp/verify', payload),

  /** Resend OTP code */
  resendOtp: () => api.post<IApiResponse<null>>('/auth/otp/resend'),

  /** Resend email verification link */
  resendVerificationEmail: () => api.post<IApiResponse<null>>('/auth/verify/resend'),
} as const;
