/**
 * TextInput component — iOS-modern style with floating label feel.
 *
 * Features:
 *   - Label above input
 *   - Error state with message
 *   - Secure text toggle for passwords
 *   - Left/right icon slots
 *
 * Usage:
 *   <TextInput label="Email" value={email} onChangeText={setEmail} />
 *   <TextInput label="Password" secureTextEntry value={pw} onChangeText={setPw} />
 */

import React, { useState, useCallback } from 'react';

import { View, TextInput as RNTextInput, Pressable, StyleSheet } from 'react-native';
import type { TextInputProps as RNTextInputProps, ViewStyle } from 'react-native';

import { useTheme } from '@/theme';
import { spacing, radius } from '@/theme/spacing';
import { typography } from '@/theme/typography';

import { Text } from './Text';

interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  /** Label displayed above the input */
  label: string;
  /** Error message — triggers error styling when present */
  error?: string;
  /** Additional style for the outer container */
  containerStyle?: ViewStyle;
}

export function TextInput({
  label,
  error,
  secureTextEntry,
  containerStyle,
  onFocus,
  onBlur,
  ...rest
}: TextInputProps) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isSecureVisible, setIsSecureVisible] = useState(false);

  const handleFocus = useCallback(
    (e: Parameters<NonNullable<RNTextInputProps['onFocus']>>[0]) => {
      setIsFocused(true);
      onFocus?.(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: Parameters<NonNullable<RNTextInputProps['onBlur']>>[0]) => {
      setIsFocused(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  const borderColor = error ? theme.statusError : isFocused ? theme.textAccent : theme.borderSubtle;

  const isSecure = secureTextEntry && !isSecureVisible;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text variant="overline" color="textSecondary" style={styles.label}>
        {label}
      </Text>

      <View
        style={[
          styles.inputWrapper,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: theme.bgInput,
            borderColor,
            borderWidth: isFocused || error ? 1.5 : 1,
          },
        ]}
      >
        <RNTextInput
          style={[typography.body, styles.input, { color: theme.textPrimary }]}
          placeholderTextColor={theme.textPlaceholder}
          selectionColor={theme.textAccent}
          secureTextEntry={isSecure}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCorrect={false}
          {...rest}
        />

        {secureTextEntry && (
          <Pressable
            onPress={() => setIsSecureVisible((v) => !v)}
            style={styles.toggleButton}
            hitSlop={8}
          >
            <Text variant="footnote" color="textSecondary">
              {isSecureVisible ? 'Hide' : 'Show'}
            </Text>
          </Pressable>
        )}
      </View>

      {error && (
        <Text variant="caption1" color="statusError" style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: spacing.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 2,
    margin: 0,
  },
  toggleButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  errorText: {
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});
