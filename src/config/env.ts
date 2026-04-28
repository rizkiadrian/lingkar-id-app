/**
 * Environment configuration.
 *
 * In production, use react-native-config or similar for env vars.
 * For now, hardcoded for development.
 */

export const ENV = {
  /** Backend API base URL (no trailing slash) */
  API_URL: 'http://localhost:8000/api/v1',
} as const;

/** Keys used for secure storage */
export const STORAGE_KEYS = {
  accessToken: 'lingkarid_access_token',
  refreshToken: 'lingkarid_refresh_token',
} as const;
