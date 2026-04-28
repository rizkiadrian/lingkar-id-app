/**
 * Theme barrel export.
 *
 * Usage:
 *   import { colors, typography, spacing, radius, shadows, lightTheme, darkTheme } from '@/theme';
 */

export { colors } from './colors';
export type { ColorPalette } from './colors';

export { lightTheme, darkTheme } from './semantic';
export type { SemanticColors } from './semantic';

export { typography } from './typography';
export type { TypographyVariant } from './typography';

export { spacing, radius, shadows } from './spacing';
export type { SpacingToken, RadiusToken, ShadowToken } from './spacing';
