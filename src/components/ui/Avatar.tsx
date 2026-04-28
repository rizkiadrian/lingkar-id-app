/**
 * Avatar component — circular initial or image avatar.
 *
 * Usage:
 *   <Avatar name="John Doe" size="md" />
 *   <Avatar name="AB" size="lg" color="primary" />
 */

import React from 'react';

import { View, StyleSheet } from 'react-native';

import { useTheme } from '@/theme';
import { colors } from '@/theme/colors';

import { Text } from './Text';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
type AvatarColor = 'primary' | 'secondary' | 'tertiary' | 'neutral';

interface AvatarProps {
  /** Full name — first letter(s) will be extracted */
  name: string;
  size?: AvatarSize;
  color?: AvatarColor;
}

const SIZE_MAP: Record<AvatarSize, number> = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

const FONT_VARIANT_MAP: Record<AvatarSize, 'caption1' | 'footnote' | 'headline' | 'title2'> = {
  sm: 'caption1',
  md: 'footnote',
  lg: 'headline',
  xl: 'title2',
};

const COLOR_MAP: Record<AvatarColor, { bg: string; text: string }> = {
  primary: { bg: colors.primary[100], text: colors.primary[700] },
  secondary: { bg: colors.secondary[100], text: colors.secondary[700] },
  tertiary: { bg: colors.tertiary[100], text: colors.tertiary[700] },
  neutral: { bg: colors.neutral[200], text: colors.neutral[700] },
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return (parts[0]?.[0] ?? '?').toUpperCase();
}

export function Avatar({ name, size = 'md', color = 'primary' }: AvatarProps) {
  useTheme(); // ensure re-render on theme change
  const dimension = SIZE_MAP[size];
  const colorConfig = COLOR_MAP[color];
  const initials = getInitials(name);

  return (
    <View
      style={[
        styles.base,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          backgroundColor: colorConfig.bg,
        },
      ]}
    >
      <Text variant={FONT_VARIANT_MAP[size]} style={[styles.text, { color: colorConfig.text }]}>
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
  },
});
