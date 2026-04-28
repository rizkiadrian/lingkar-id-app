/**
 * Semantic design tokens — maps intent to color values.
 * Supports light & dark mode for iOS-modern aesthetic.
 *
 * Usage:
 *   import { lightTheme, darkTheme } from '@/theme/semantic';
 */

import { colors } from './colors';

export interface SemanticColors {
  // Backgrounds
  bgApp: string;
  bgCard: string;
  bgElevated: string;
  bgGrouped: string;
  bgInput: string;

  // Text
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverted: string;
  textAccent: string;
  textPlaceholder: string;

  // Borders & Separators
  borderDefault: string;
  borderSubtle: string;
  separator: string;
  separatorOpaque: string;

  // Interactive
  buttonPrimary: string;
  buttonPrimaryPressed: string;
  buttonSecondaryBg: string;
  buttonSecondaryPressed: string;
  buttonDestructive: string;
  buttonDestructivePressed: string;

  // Status
  statusSuccess: string;
  statusWarning: string;
  statusError: string;
  statusInfo: string;

  // iOS-specific
  systemFill: string;
  secondarySystemFill: string;
  tertiarySystemFill: string;
}

export const lightTheme: SemanticColors = {
  // Backgrounds — iOS grouped style
  bgApp: colors.neutral[50],
  bgCard: colors.white,
  bgElevated: colors.white,
  bgGrouped: colors.neutral[100],
  bgInput: colors.neutral[50],

  // Text
  textPrimary: colors.secondary[900],
  textSecondary: colors.secondary[500],
  textTertiary: colors.secondary[400],
  textInverted: colors.neutral[50],
  textAccent: colors.primary[500],
  textPlaceholder: colors.secondary[300],

  // Borders & Separators
  borderDefault: colors.neutral[300],
  borderSubtle: colors.neutral[200],
  separator: 'rgba(60, 60, 67, 0.12)',
  separatorOpaque: colors.neutral[200],

  // Interactive
  buttonPrimary: colors.primary[600],
  buttonPrimaryPressed: colors.primary[700],
  buttonSecondaryBg: colors.secondary[100],
  buttonSecondaryPressed: colors.secondary[200],
  buttonDestructive: colors.error[500],
  buttonDestructivePressed: colors.error[700],

  // Status
  statusSuccess: colors.success[500],
  statusWarning: colors.warning[500],
  statusError: colors.error[500],
  statusInfo: colors.tertiary[500],

  // iOS system fills
  systemFill: 'rgba(120, 120, 128, 0.2)',
  secondarySystemFill: 'rgba(120, 120, 128, 0.16)',
  tertiarySystemFill: 'rgba(118, 118, 128, 0.12)',
};

export const darkTheme: SemanticColors = {
  // Backgrounds
  bgApp: colors.black,
  bgCard: '#1c1c1e',
  bgElevated: '#2c2c2e',
  bgGrouped: '#1c1c1e',
  bgInput: '#1c1c1e',

  // Text
  textPrimary: colors.neutral[50],
  textSecondary: colors.neutral[500],
  textTertiary: colors.neutral[600],
  textInverted: colors.secondary[900],
  textAccent: colors.primary[400],
  textPlaceholder: colors.secondary[600],

  // Borders & Separators
  borderDefault: 'rgba(84, 84, 88, 0.65)',
  borderSubtle: 'rgba(84, 84, 88, 0.36)',
  separator: 'rgba(84, 84, 88, 0.36)',
  separatorOpaque: '#38383a',

  // Interactive
  buttonPrimary: colors.primary[500],
  buttonPrimaryPressed: colors.primary[600],
  buttonSecondaryBg: '#2c2c2e',
  buttonSecondaryPressed: '#3a3a3c',
  buttonDestructive: colors.error[400],
  buttonDestructivePressed: colors.error[600],

  // Status
  statusSuccess: colors.success[400],
  statusWarning: colors.warning[400],
  statusError: colors.error[400],
  statusInfo: colors.tertiary[400],

  // iOS system fills
  systemFill: 'rgba(120, 120, 128, 0.36)',
  secondarySystemFill: 'rgba(120, 120, 128, 0.32)',
  tertiarySystemFill: 'rgba(118, 118, 128, 0.24)',
};
