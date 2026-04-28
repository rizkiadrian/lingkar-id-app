/**
 * Typography scale — iOS-modern inspired.
 *
 * Uses SF Pro (system font) on iOS and Roboto on Android.
 * Scale follows Apple HIG typography guidelines.
 *
 * Usage:
 *   import { typography } from '@/theme';
 *   style={typography.title1}
 */

import { Platform } from 'react-native';
import type { TextStyle } from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

const fontFamilyMedium = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

const fontFamilyBold = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

/**
 * iOS HIG-inspired type scale.
 * Each entry is a complete TextStyle ready to spread into a StyleSheet.
 */
export const typography = {
  // ─── Display ─────────────────────────────────────────────────
  /** 34pt bold — Large Title (iOS navigation) */
  largeTitle: {
    fontFamily: fontFamilyBold,
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700',
    letterSpacing: 0.37,
  } satisfies TextStyle,

  // ─── Headings ────────────────────────────────────────────────
  /** 28pt bold */
  title1: {
    fontFamily: fontFamilyBold,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: 0.36,
  } satisfies TextStyle,

  /** 22pt bold */
  title2: {
    fontFamily: fontFamilyBold,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    letterSpacing: 0.35,
  } satisfies TextStyle,

  /** 20pt semibold */
  title3: {
    fontFamily: fontFamilyMedium,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600',
    letterSpacing: 0.38,
  } satisfies TextStyle,

  // ─── Body ────────────────────────────────────────────────────
  /** 17pt semibold — Headline */
  headline: {
    fontFamily: fontFamilyMedium,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    letterSpacing: -0.41,
  } satisfies TextStyle,

  /** 17pt regular — Body */
  body: {
    fontFamily,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400',
    letterSpacing: -0.41,
  } satisfies TextStyle,

  /** 16pt regular — Callout */
  callout: {
    fontFamily,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: -0.32,
  } satisfies TextStyle,

  /** 15pt regular — Subheadline */
  subheadline: {
    fontFamily,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: -0.24,
  } satisfies TextStyle,

  // ─── Small ───────────────────────────────────────────────────
  /** 13pt regular — Footnote */
  footnote: {
    fontFamily,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    letterSpacing: -0.08,
  } satisfies TextStyle,

  /** 12pt regular — Caption 1 */
  caption1: {
    fontFamily,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0,
  } satisfies TextStyle,

  /** 11pt regular — Caption 2 */
  caption2: {
    fontFamily,
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '400',
    letterSpacing: 0.07,
  } satisfies TextStyle,

  // ─── Utility ─────────────────────────────────────────────────
  /** 10pt medium — Overline / label */
  overline: {
    fontFamily: fontFamilyMedium,
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '500',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  } satisfies TextStyle,
} as const;

export type TypographyVariant = keyof typeof typography;
