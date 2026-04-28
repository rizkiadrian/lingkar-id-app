/**
 * Badge component — status indicator pill.
 *
 * Usage:
 *   <Badge variant="success">Active</Badge>
 *   <Badge variant="warning">Pending</Badge>
 */

import React from 'react';

import { View, StyleSheet } from 'react-native';

import { useTheme } from '@/theme';
import { colors } from '@/theme/colors';
import { spacing, radius } from '@/theme/spacing';

import { Text } from './Text';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const VARIANT_CONFIG: Record<BadgeVariant, { bg: string; text: string }> = {
  success: { bg: colors.success[50], text: colors.success[700] },
  warning: { bg: colors.warning[50], text: colors.warning[700] },
  error: { bg: colors.error[50], text: colors.error[700] },
  info: { bg: colors.tertiary[50], text: colors.tertiary[700] },
  neutral: { bg: colors.neutral[100], text: colors.neutral[700] },
};

export function Badge({ variant = 'neutral', children }: BadgeProps) {
  useTheme(); // ensure re-render on theme change
  const config = VARIANT_CONFIG[variant];

  return (
    <View style={[styles.container, { backgroundColor: config.bg }]}>
      <Text variant="caption1" style={[styles.text, { color: config.text }]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  text: {
    fontWeight: '600',
  },
});
