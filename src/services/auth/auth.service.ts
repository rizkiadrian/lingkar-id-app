/**
 * Auth service — API calls for authentication.
 *
 * Usage:
 *   import { authService } from '@/services/auth';
 *   const res = await authService.login({ login: 'user@email.com', password: '...' });
 */

import { api } from '@/lib/api';

import type { IApiResponse, ILoginPayload, ILoginResponse, IUserAuth } from './auth.types';

export const authService = {
  /** Login with email/phone + password */
  login: (payload: ILoginPayload) =>
    api.post<IApiResponse<ILoginResponse>, ILoginPayload>('/auth/login', payload),

  /** Get authenticated user profile */
  me: () => api.get<IApiResponse<IUserAuth>>('/auth/me'),

  /** Logout — revoke tokens on backend */
  logout: () => api.post<IApiResponse<null>>('/auth/logout'),
} as const;
