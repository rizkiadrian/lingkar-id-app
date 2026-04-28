/**
 * Card component — iOS-modern grouped card style.
 *
 * Usage:
 *   <Card>
 *     <Text variant="headline">Title</Text>
 *   </Card>
 *   <Card variant="elevated" padding="lg">...</Card>
 */

import React from 'react';

import { View, StyleSheet } from 'react-native';
import type { ViewProps, ViewStyle } from 'react-native';

import { useTheme } from '@/theme';
import { spacing, radius, shadows } from '@/theme/spacing';
import type { SpacingToken } from '@/theme/spacing';

type CardVariant = 'flat' | 'elevated' | 'outlined';

interface CardProps extends ViewProps {
  variant?: CardVariant;
  padding?: SpacingToken;
  children: React.ReactNode;
}

export function Card({
  variant = 'elevated',
  padding = 'lg',
  style,
  children,
  ...rest
}: CardProps) {
  const { theme } = useTheme();

  const variantStyle = (): ViewStyle => {
    switch (variant) {
      case 'flat':
        return { backgroundColor: theme.bgCard };
      case 'elevated':
        return {
          backgroundColor: theme.bgCard,
          ...shadows.md,
        };
      case 'outlined':
        return {
          backgroundColor: theme.bgCard,
          borderWidth: 1,
          borderColor: theme.borderSubtle,
        };
    }
  };

  return (
    <View
      style={StyleSheet.flatten([
        styles.base,
        variantStyle(),
        { padding: spacing[padding] },
        style,
      ])}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
});
