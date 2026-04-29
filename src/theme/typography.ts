/**
 * Typography scale — iOS-modern inspired, using Inter font (same as CRM).
 *
 * Font weights mapped to Inter font files:
 * - 300: Inter-Light
 * - 400: Inter-Regular
 * - 500: Inter-Medium
 * - 600: Inter-SemiBold
 * - 700: Inter-Bold
 *
 * Scale follows Apple HIG typography guidelines.
 *
 * Usage:
 *   import { typography } from '@/theme';
 *   style={typography.title1}
 */

import type { TextStyle } from 'react-native';

/**
 * Inter font family names — must match the file names linked via react-native-asset.
 * On iOS, the font name is the PostScript name (same as filename without extension).
 * On Android, the font name is the filename without extension.
 */
export const fonts = {
  light: 'Inter-Light',
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
  italic: 'Inter-Italic',
  semiBoldItalic: 'Inter-SemiBoldItalic',
} as const;

/**
 * iOS HIG-inspired type scale using Inter font.
 * Each entry is a complete TextStyle ready to spread into a StyleSheet.
 */
export const typography = {
  // ─── Display ─────────────────────────────────────────────────
  /** 34pt bold — Large Title (iOS navigation) */
  largeTitle: {
    fontFamily: fonts.bold,
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700',
    letterSpacing: 0.37,
  } satisfies TextStyle,

  // ─── Headings ────────────────────────────────────────────────
  /** 28pt bold */
  title1: {
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: 0.36,
  } satisfies TextStyle,

  /** 22pt bold */
  title2: {
    fontFamily: fonts.bold,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    letterSpacing: 0.35,
  } satisfies TextStyle,

  /** 20pt semibold */
  title3: {
    fontFamily: fonts.semiBold,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600',
    letterSpacing: 0.38,
  } satisfies TextStyle,

  // ─── Body ────────────────────────────────────────────────────
  /** 17pt semibold — Headline */
  headline: {
    fontFamily: fonts.semiBold,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    letterSpacing: -0.41,
  } satisfies TextStyle,

  /** 17pt regular — Body */
  body: {
    fontFamily: fonts.regular,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400',
    letterSpacing: -0.41,
  } satisfies TextStyle,

  /** 16pt regular — Callout */
  callout: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: -0.32,
  } satisfies TextStyle,

  /** 15pt regular — Subheadline */
  subheadline: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: -0.24,
  } satisfies TextStyle,

  // ─── Small ───────────────────────────────────────────────────
  /** 13pt regular — Footnote */
  footnote: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    letterSpacing: -0.08,
  } satisfies TextStyle,

  /** 12pt regular — Caption 1 */
  caption1: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0,
  } satisfies TextStyle,

  /** 11pt regular — Caption 2 */
  caption2: {
    fontFamily: fonts.regular,
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '400',
    letterSpacing: 0.07,
  } satisfies TextStyle,

  // ─── Utility ─────────────────────────────────────────────────
  /** 10pt medium — Overline / label */
  overline: {
    fontFamily: fonts.medium,
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '500',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  } satisfies TextStyle,
} as const;

export type TypographyVariant = keyof typeof typography;
