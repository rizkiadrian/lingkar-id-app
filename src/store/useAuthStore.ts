/**
 * Auth store — Zustand store for authentication state.
 *
 * Manages: login, logout, register, OTP verify, token hydration, user profile.
 * Pattern matches lingkar-crm/src/store/useUserProfile.ts
 *
 * Usage:
 *   const { user, isAuthenticated, login, logout, register } = useAuthStore();
 */

import { create } from 'zustand';

import { setForceLogoutHandler } from '@/lib/api';
import type { CustomApiError } from '@/lib/api';
import { secureStorage } from '@/lib/secure-storage';
import { authService } from '@/services/auth';
import type { ILoginPayload, IRegisterPayload, IUserAuth } from '@/services/auth';

interface AuthState {
  /** Authenticated user profile */
  user: IUserAuth | null;
  /** Whether the user is authenticated (has valid token) */
  isAuthenticated: boolean;
  /** Whether initial token hydration from storage is complete */
  isHydrated: boolean;
  /** Whether an auth operation is in progress */
  isLoading: boolean;
  /** Which verification method is pending after registration */
  pendingVerification: 'otp' | 'email' | null;

  /** Hydrate auth state from secure storage on app start */
  hydrate: () => Promise<void>;
  /** Login with credentials, store tokens, fetch profile */
  login: (payload: ILoginPayload) => Promise<void>;
  /** Register a new account, store tokens, fetch profile */
  register: (payload: IRegisterPayload) => Promise<void>;
  /** Verify OTP code, refresh profile on success */
  verifyOtp: (otp: string) => Promise<void>;
  /** Resend OTP code */
  resendOtp: () => Promise<void>;
  /** Logout — revoke backend tokens, clear storage, reset state */
  logout: () => Promise<void>;
  /** Fetch user profile from /auth/me */
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => {
  // Register force-logout handler so API interceptor can trigger logout
  setForceLogoutHandler(() => {
    set({ user: null, isAuthenticated: false, pendingVerification: null });
  });

  return {
    user: null,
    isAuthenticated: false,
    isHydrated: false,
    isLoading: false,
    pendingVerification: null,

    hydrate: async () => {
      try {
        const accessToken = await secureStorage.getAccessToken();

        if (!accessToken) {
          set({ isHydrated: true, isAuthenticated: false });
          return;
        }

        // Token exists — try to fetch profile to validate it
        set({ isAuthenticated: true });
        await get().fetchProfile();
      } catch {
        // Token invalid or expired — interceptor will handle refresh
        // If refresh also fails, force-logout handler clears state
        await secureStorage.clearTokens();
        set({ user: null, isAuthenticated: false });
      } finally {
        set({ isHydrated: true });
      }
    },

    login: async (payload: ILoginPayload) => {
      set({ isLoading: true });
      try {
        const res = await authService.login(payload);

        if (!res.success) {
          throw { message: res.message, status: 400 } as CustomApiError;
        }

        // Store tokens securely
        await secureStorage.setTokens(res.data.access_token, res.data.refresh_token);

        set({ isAuthenticated: true });

        // Fetch user profile
        await get().fetchProfile();
      } finally {
        set({ isLoading: false });
      }
    },

    register: async (payload: IRegisterPayload) => {
      set({ isLoading: true });
      try {
        const res = await authService.register(payload);

        if (!res.success) {
          throw { message: res.message, status: 400 } as CustomApiError;
        }

        // Store tokens from credential
        await secureStorage.setTokens(
          res.data.credential.access_token,
          res.data.credential.refresh_token,
        );

        set({
          isAuthenticated: true,
          pendingVerification: payload.verification_method || 'otp',
        });

        // Fetch user profile
        await get().fetchProfile();
      } finally {
        set({ isLoading: false });
      }
    },

    verifyOtp: async (otp: string) => {
      set({ isLoading: true });
      try {
        const res = await authService.verifyOtp({ otp });

        if (!res.success) {
          throw { message: res.message, status: 400 } as CustomApiError;
        }

        // Refresh profile to get updated is_verified status
        await get().fetchProfile();
        set({ pendingVerification: null });
      } finally {
        set({ isLoading: false });
      }
    },

    resendOtp: async () => {
      set({ isLoading: true });
      try {
        const res = await authService.resendOtp();

        if (!res.success) {
          throw { message: res.message, status: 400 } as CustomApiError;
        }
      } finally {
        set({ isLoading: false });
      }
    },

    logout: async () => {
      set({ isLoading: true });
      try {
        // Best-effort backend logout (revoke tokens)
        await authService.logout().catch(() => {
          // Backend logout failed — still clear local state
        });
      } finally {
        await secureStorage.clearTokens();
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          pendingVerification: null,
        });
      }
    },

    fetchProfile: async () => {
      try {
        const res = await authService.me();
        set({ user: res.data });
      } catch {
        set({ user: null });
      }
    },
  };
});
