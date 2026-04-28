/**
 * Button component — iOS-modern style with variants.
 *
 * Variants:
 *   - primary: Crimson filled button
 *   - secondary: Gray filled button
 *   - ghost: Transparent with accent text
 *   - destructive: Red filled for dangerous actions
 *
 * Usage:
 *   <Button onPress={handleLogin}>Login</Button>
 *   <Button variant="secondary" size="sm">Cancel</Button>
 */

import React, { useCallback, useRef } from 'react';

import { Animated, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import type { PressableProps, ViewStyle } from 'react-native';

import { useTheme } from '@/theme';
import { radius, spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const SIZE_CONFIG: Record<ButtonSize, { height: number; paddingH: number; fontSize: number }> = {
  sm: { height: 36, paddingH: spacing.lg, fontSize: 14 },
  md: { height: 48, paddingH: spacing['2xl'], fontSize: 16 },
  lg: { height: 56, paddingH: spacing['3xl'], fontSize: 17 },
};

export function Button({
  variant = 'primary',
  size = 'lg',
  loading = false,
  fullWidth = true,
  disabled,
  children,
  style,
  ...rest
}: ButtonProps) {
  const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const sizeConfig = SIZE_CONFIG[size];

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  }, [scaleAnim]);

  const getVariantStyles = (): {
    bg: string;
    bgPressed: string;
    text: string;
    border?: string;
  } => {
    switch (variant) {
      case 'primary':
        return {
          bg: theme.buttonPrimary,
          bgPressed: theme.buttonPrimaryPressed,
          text: theme.textInverted,
        };
      case 'secondary':
        return {
          bg: theme.buttonSecondaryBg,
          bgPressed: theme.buttonSecondaryPressed,
          text: theme.textPrimary,
        };
      case 'ghost':
        return {
          bg: 'transparent',
          bgPressed: theme.tertiarySystemFill,
          text: theme.textAccent,
        };
      case 'destructive':
        return {
          bg: theme.buttonDestructive,
          bgPressed: theme.buttonDestructivePressed,
          text: theme.textInverted,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const isDisabled = disabled || loading;

  return (
    <Animated.View
      style={[{ transform: [{ scale: scaleAnim }] }, fullWidth ? styles.fullWidth : undefined]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        style={({ pressed }) => [
          styles.base,
          {
            height: sizeConfig.height,
            paddingHorizontal: sizeConfig.paddingH,
            backgroundColor: pressed ? variantStyles.bgPressed : variantStyles.bg,
            borderRadius: radius.md,
            opacity: isDisabled ? 0.5 : 1,
          },
          variantStyles.border ? { borderWidth: 1, borderColor: variantStyles.border } : undefined,
          style as ViewStyle,
        ]}
        {...rest}
      >
        {loading ? (
          <ActivityIndicator color={variantStyles.text} size="small" />
        ) : (
          <Animated.Text
            style={[
              typography.headline,
              {
                color: variantStyles.text,
                fontSize: sizeConfig.fontSize,
              },
            ]}
          >
            {children}
          </Animated.Text>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
});
