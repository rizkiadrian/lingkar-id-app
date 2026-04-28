/**
 * Color palette — synced with Lingkar CRM (globals.css).
 *
 * Usage:
 *   import { colors } from '@/theme';
 *   style={{ backgroundColor: colors.primary[500] }}
 */

export const colors = {
  // ─── Primary: Crimson Red ──────────────────────────────────────
  primary: {
    50: '#fdf2f2',
    100: '#fbe5e5',
    200: '#f5c2c2',
    300: '#ee9f9f',
    400: '#e46767',
    500: '#d32f2f',
    600: '#be2a2a',
    700: '#9e2323',
    800: '#7f1c1c',
    900: '#681717',
    950: '#390c0c',
  },

  // ─── Secondary: Charcoal Gray ──────────────────────────────────
  secondary: {
    50: '#f6f6f6',
    100: '#e7e7e7',
    200: '#d1d1d1',
    300: '#b0b0b0',
    400: '#888888',
    500: '#6d6d6d',
    600: '#5d5d5d',
    700: '#4f4f4f',
    800: '#424242',
    900: '#3b3b3b',
    950: '#222222',
  },

  // ─── Tertiary: Ocean Blue ──────────────────────────────────────
  tertiary: {
    50: '#f0f9fb',
    100: '#dbf1f6',
    200: '#bae3ed',
    300: '#8bcce0',
    400: '#55abcb',
    500: '#368fb2',
    600: '#00799c',
    700: '#26647f',
    800: '#265369',
    900: '#244558',
    950: '#132c3a',
  },

  // ─── Neutral: Light Gray ───────────────────────────────────────
  neutral: {
    50: '#f8f9fa',
    100: '#f1f3f5',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#868e96',
    700: '#495057',
    800: '#343a40',
    900: '#212529',
    950: '#121416',
  },

  // ─── Success: Emerald Green ────────────────────────────────────
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },

  // ─── Warning: Amber/Orange ─────────────────────────────────────
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // ─── Error: Crimson (alias of primary) ─────────────────────────
  error: {
    50: '#fdf2f2',
    100: '#fbe5e5',
    200: '#f5c2c2',
    300: '#ee9f9f',
    400: '#e46767',
    500: '#d32f2f',
    600: '#be2a2a',
    700: '#9e2323',
    800: '#7f1c1c',
    900: '#681717',
  },

  // ─── Absolute ──────────────────────────────────────────────────
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type ColorPalette = typeof colors;
