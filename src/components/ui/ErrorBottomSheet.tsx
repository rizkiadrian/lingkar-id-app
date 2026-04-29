/**
 * ErrorBottomSheet — global error display as iOS-style bottom sheet.
 *
 * Renders at the root level (App.tsx). Automatically shown by the API
 * interceptor for non-form errors. Slides up from bottom with backdrop.
 *
 * Usage:
 *   // In App.tsx root:
 *   <ErrorBottomSheet />
 */

import React, { useEffect, useRef } from 'react';

import { Animated, Modal, Pressable, StyleSheet, View } from 'react-native';

import { AlertCircle } from 'lucide-react-native';

import { useErrorStore } from '@/store/useErrorStore';
import { useTheme } from '@/theme';
import { colors } from '@/theme/colors';
import { radius, shadows, spacing } from '@/theme/spacing';
import { fonts } from '@/theme/typography';

import { Button } from './Button';
import { Text } from './Text';

export function ErrorBottomSheet() {
  const { theme } = useTheme();
  const { visible, title, message, dismiss } = useErrorStore();

  const slideAnim = useRef(new Animated.Value(300)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          speed: 14,
          bounciness: 4,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, backdropAnim]);

  if (!visible) {
    return null;
  }

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={dismiss}>
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={dismiss}>
        <Animated.View style={[styles.backdropFill, { opacity: backdropAnim }]} />
      </Pressable>

      {/* Sheet */}
      <Animated.View
        style={[
          styles.sheet,
          {
            backgroundColor: theme.bgCard,
            transform: [{ translateY: slideAnim }],
          },
          shadows.xl,
        ]}
      >
        {/* Handle bar */}
        <View style={[styles.handle, { backgroundColor: theme.borderSubtle }]} />

        {/* Icon */}
        <View style={styles.iconContainer}>
          <AlertCircle size={40} color={colors.primary[500]} strokeWidth={1.8} />
        </View>

        {/* Title */}
        <Text variant="title3" align="center" style={[styles.title, { fontFamily: fonts.bold }]}>
          {title}
        </Text>

        {/* Message */}
        <Text variant="body" color="textSecondary" align="center" style={styles.message}>
          {message}
        </Text>

        {/* Dismiss button */}
        <Button onPress={dismiss} style={styles.button}>
          Mengerti
        </Button>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdropFill: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: radius['2xl'],
    borderTopRightRadius: radius['2xl'],
    paddingHorizontal: spacing['2xl'],
    paddingTop: spacing.md,
    paddingBottom: spacing['4xl'],
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: spacing['2xl'],
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.sm,
  },
  message: {
    marginBottom: spacing['3xl'],
    paddingHorizontal: spacing.lg,
  },
  button: {
    marginBottom: spacing.sm,
  },
});
