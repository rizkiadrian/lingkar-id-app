/**
 * NotificationBottomSheet — global notification display as iOS-style bottom sheet.
 *
 * Supports both success (green) and error (red) types.
 * Renders at the root level (App.tsx). Automatically shown by the API
 * interceptor for non-form errors. Can also be triggered manually for success.
 *
 * Usage:
 *   // In App.tsx root:
 *   <NotificationBottomSheet />
 *
 *   // Show success from any screen:
 *   useNotificationSheet.getState().show('success', 'OTP berhasil dikirim ulang');
 */

import React, { useEffect, useRef } from 'react';

import { Animated, Modal, Pressable, StyleSheet, View } from 'react-native';

import { AlertCircle, CheckCircle } from 'lucide-react-native';

import { useNotificationSheet } from '@/store/useErrorStore';
import { useTheme } from '@/theme';
import { colors } from '@/theme/colors';
import { radius, shadows, spacing } from '@/theme/spacing';
import { fonts } from '@/theme/typography';

import { Button } from './Button';
import { Text } from './Text';

const ICON_CONFIG = {
  success: { Icon: CheckCircle, color: colors.success[500] },
  error: { Icon: AlertCircle, color: colors.primary[500] },
};

export function NotificationBottomSheet() {
  const { theme } = useTheme();
  const { visible, type, title, message, dismiss } = useNotificationSheet();

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

  const iconConfig = ICON_CONFIG[type];

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
          <iconConfig.Icon size={40} color={iconConfig.color} strokeWidth={1.8} />
        </View>

        {/* Title */}
        <Text
          variant="title3"
          align="center"
          style={[styles.title, { fontFamily: fonts.bold }]}
        >
          {title}
        </Text>

        {/* Message */}
        <Text variant="body" color="textSecondary" align="center" style={styles.message}>
          {message}
        </Text>

        {/* Dismiss button */}
        <Button
          variant={type === 'success' ? 'primary' : 'primary'}
          onPress={dismiss}
          style={styles.button}
        >
          Mengerti
        </Button>
      </Animated.View>
    </Modal>
  );
}

// Keep backward-compatible export name
export { NotificationBottomSheet as ErrorBottomSheet };

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
