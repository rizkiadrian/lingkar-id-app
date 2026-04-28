/**
 * Divider component — iOS-style separator line.
 *
 * Usage:
 *   <Divider />
 *   <Divider inset="left" />
 */

import React from 'react';

import { View, StyleSheet } from 'react-native';

import { useTheme } from '@/theme';
import { spacing } from '@/theme/spacing';

interface DividerProps {
  /** Inset from left (iOS list style), right, or none */
  inset?: 'none' | 'left' | 'right' | 'both';
}

export function Divider({ inset = 'none' }: DividerProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.base,
        { backgroundColor: theme.separator },
        inset === 'left' || inset === 'both' ? { marginLeft: spacing.lg } : undefined,
        inset === 'right' || inset === 'both' ? { marginRight: spacing.lg } : undefined,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
});
