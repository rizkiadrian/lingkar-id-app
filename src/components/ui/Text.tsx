/**
 * Themed Text component — wraps RN Text with typography variants and semantic colors.
 *
 * Usage:
 *   <Text variant="headline">Hello</Text>
 *   <Text variant="body" color="textSecondary">Subtitle</Text>
 */

import React from 'react';

import { Text as RNText, StyleSheet } from 'react-native';
import type { TextProps as RNTextProps, TextStyle } from 'react-native';

import { useTheme } from '@/theme';
import type { SemanticColors } from '@/theme/semantic';
import { typography } from '@/theme/typography';
import type { TypographyVariant } from '@/theme/typography';

type SemanticTextColor = Extract<
  keyof SemanticColors,
  | 'textPrimary'
  | 'textSecondary'
  | 'textTertiary'
  | 'textInverted'
  | 'textAccent'
  | 'textPlaceholder'
  | 'statusSuccess'
  | 'statusWarning'
  | 'statusError'
  | 'statusInfo'
>;

interface TextProps extends RNTextProps {
  /** Typography variant from the design system. Default: "body" */
  variant?: TypographyVariant;
  /** Semantic color token. Default: "textPrimary" */
  color?: SemanticTextColor;
  /** Text alignment */
  align?: TextStyle['textAlign'];
  children: React.ReactNode;
}

export function Text({
  variant = 'body',
  color = 'textPrimary',
  align,
  style,
  children,
  ...rest
}: TextProps) {
  const { theme } = useTheme();

  return (
    <RNText
      style={StyleSheet.flatten([
        typography[variant],
        { color: theme[color] },
        align ? { textAlign: align } : undefined,
        style,
      ])}
      {...rest}
    >
      {children}
    </RNText>
  );
}
