/**
 * Spacing scale — 4pt grid system.
 *
 * iOS modern apps use consistent 4pt/8pt spacing.
 * Named tokens for common use cases.
 *
 * Usage:
 *   import { spacing } from '@/theme';
 *   style={{ padding: spacing.md }}
 */

export const spacing = {
  /** 0 */
  none: 0,
  /** 2px */
  '2xs': 2,
  /** 4px */
  xs: 4,
  /** 8px */
  sm: 8,
  /** 12px */
  md: 12,
  /** 16px — default padding */
  lg: 16,
  /** 20px */
  xl: 20,
  /** 24px */
  '2xl': 24,
  /** 32px */
  '3xl': 32,
  /** 40px */
  '4xl': 40,
  /** 48px */
  '5xl': 48,
  /** 64px */
  '6xl': 64,
} as const;

/**
 * Border radius tokens — iOS-modern rounded corners.
 */
export const radius = {
  /** 0 */
  none: 0,
  /** 4px — subtle rounding */
  xs: 4,
  /** 8px — small elements (chips, tags) */
  sm: 8,
  /** 12px — cards, inputs */
  md: 12,
  /** 16px — large cards, modals */
  lg: 16,
  /** 20px — bottom sheets */
  xl: 20,
  /** 24px — prominent cards */
  '2xl': 24,
  /** 9999px — pill / full round */
  full: 9999,
} as const;

/**
 * Shadow presets — iOS-style elevation.
 */
export const shadows = {
  /** No shadow */
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  /** Subtle card shadow */
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  /** Default card shadow */
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  /** Elevated elements (modals, popovers) */
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  /** Top-level overlays (bottom sheets) */
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 10,
  },
} as const;

export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;
export type ShadowToken = keyof typeof shadows;
