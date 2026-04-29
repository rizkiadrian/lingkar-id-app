/**
 * Verify Email Screen — instructs user to check email for verification link.
 *
 * - Shows instruction message
 * - Displays user's email
 * - "Kirim Ulang Email" button with loading state
 * - "Kembali ke Login" button → logout
 */

import React, { useCallback, useState } from 'react';

import { StyleSheet, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Text } from '@/components/ui';
import { authService } from '@/services/auth';
import { useAuthStore } from '@/store/useAuthStore';
import { useNotificationSheet } from '@/store/useErrorStore';
import { colors, spacing, useTheme } from '@/theme';
import { radius } from '@/theme/spacing';

export function VerifyEmailScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuthStore();

  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = useCallback(async () => {
    setIsResending(true);
    try {
      await authService.resendVerificationEmail();
      useNotificationSheet.getState().show('success', 'Email verifikasi telah dikirim ulang ke inbox Anda.');
    } catch {
      // Non-form error handled by global ErrorBottomSheet via interceptor
    } finally {
      setIsResending(false);
    }
  }, []);

  const handleBackToLogin = useCallback(async () => {
    await logout();
  }, [logout]);

  return (
    <View style={[styles.root, { backgroundColor: theme.bgApp }]}>
      <View style={[styles.content, { paddingTop: insets.top + spacing['5xl'] }]}>
        {/* ─── Header ──────────────────────────────────────────── */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text variant="title1" style={styles.logoText}>
              L
            </Text>
          </View>
          <Text variant="title2" align="center">
            Cek Email Anda
          </Text>
          <Text variant="subheadline" color="textSecondary" align="center" style={styles.subtitle}>
            Cek email Anda untuk link verifikasi
          </Text>
        </View>

        {/* ─── Email Card ────────────────────────────────────────── */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
        >
          <Text variant="body" color="textSecondary" align="center">
            Kami telah mengirim link verifikasi ke:
          </Text>
          <Text variant="headline" color="textAccent" align="center" style={styles.emailText}>
            {user?.email || '-'}
          </Text>
          <Text variant="footnote" color="textTertiary" align="center" style={styles.hint}>
            Klik link di email untuk memverifikasi akun Anda. Periksa juga folder spam.
          </Text>
        </View>

        {/* ─── Actions ───────────────────────────────────────────── */}
        <View style={styles.actions}>
          <Button onPress={handleResendEmail} loading={isResending} disabled={isResending}>
            Kirim Ulang Email
          </Button>

          <Button
            variant="ghost"
            onPress={handleBackToLogin}
            disabled={isResending}
            style={styles.backButton}
          >
            Kembali ke Login
          </Button>
        </View>
      </View>

      <View style={{ height: insets.bottom + spacing.lg }} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing['2xl'],
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: spacing['4xl'],
  },
  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: radius.xl,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  logoText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 32,
  },
  subtitle: {
    marginTop: spacing.xs,
  },

  // Card
  card: {
    borderRadius: radius.lg,
    padding: spacing['2xl'],
    borderWidth: 1,
  },
  emailText: {
    marginTop: spacing.md,
  },
  hint: {
    marginTop: spacing.lg,
  },

  // Actions
  actions: {
    marginTop: spacing['3xl'],
  },
  backButton: {
    marginTop: spacing.lg,
  },
});
