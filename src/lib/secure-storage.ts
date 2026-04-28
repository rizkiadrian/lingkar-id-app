/**
 * Secure storage wrapper — encrypts tokens at rest.
 *
 * Uses react-native-encrypted-storage (Keychain on iOS, EncryptedSharedPreferences on Android).
 * This is the React Native equivalent of HTTP-only cookies in the CRM.
 *
 * Usage:
 *   import { secureStorage } from '@/lib/secure-storage';
 *   await secureStorage.setAccessToken('...');
 *   const token = await secureStorage.getAccessToken();
 */

import EncryptedStorage from 'react-native-encrypted-storage';

import { STORAGE_KEYS } from '@/config/env';

// ─── Token getters ───────────────────────────────────────────────────────────

async function getAccessToken(): Promise<string | null> {
  try {
    return await EncryptedStorage.getItem(STORAGE_KEYS.accessToken);
  } catch {
    return null;
  }
}

async function getRefreshToken(): Promise<string | null> {
  try {
    return await EncryptedStorage.getItem(STORAGE_KEYS.refreshToken);
  } catch {
    return null;
  }
}

// ─── Token setters ───────────────────────────────────────────────────────────

async function setAccessToken(token: string): Promise<void> {
  await EncryptedStorage.setItem(STORAGE_KEYS.accessToken, token);
}

async function setRefreshToken(token: string): Promise<void> {
  await EncryptedStorage.setItem(STORAGE_KEYS.refreshToken, token);
}

// ─── Batch operations ────────────────────────────────────────────────────────

async function setTokens(accessToken: string, refreshToken: string): Promise<void> {
  await Promise.all([setAccessToken(accessToken), setRefreshToken(refreshToken)]);
}

async function clearTokens(): Promise<void> {
  await Promise.all([
    EncryptedStorage.removeItem(STORAGE_KEYS.accessToken),
    EncryptedStorage.removeItem(STORAGE_KEYS.refreshToken),
  ]).catch(() => {
    // Graceful — storage might already be empty
  });
}

// ─── Export ──────────────────────────────────────────────────────────────────

export const secureStorage = {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  setTokens,
  clearTokens,
} as const;
