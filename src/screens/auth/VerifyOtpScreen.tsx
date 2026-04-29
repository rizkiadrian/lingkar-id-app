/**
 * Verify OTP Screen — 6-digit code input with auto-advance and auto-submit.
 *
 * - 6 individual digit TextInput boxes
 * - Auto-advance focus on digit entry
 * - Auto-submit when all 6 digits entered
 * - 60-second countdown timer for resend
 * - Error display with input clear
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
  TextInput as RNTextInput,
} from 'react-native';
import type {
  TextInput as RNTextInputType,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui';
import type { CustomApiError } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { colors, spacing, useTheme } from '@/theme';
import { radius } from '@/theme/spacing';
import { typography } from '@/theme/typography';

// Use RNTextInput directly for the digit boxes (not the themed wrapper)

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

export function VerifyOtpScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { verifyOtp, resendOtp, isLoading, user } = useAuthStore();

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef<(RNTextInputType | null)[]>([]);
  const isSubmitting = useRef(false);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      return;
    }
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  // Auto-submit when all digits filled
  const handleSubmit = useCallback(
    async (otpDigits: string[]) => {
      if (isSubmitting.current) {
        return;
      }
      const otp = otpDigits.join('');
      if (otp.length !== OTP_LENGTH) {
        return;
      }

      isSubmitting.current = true;
      setError(null);

      try {
        await verifyOtp(otp);
        // Success — App.tsx auth guard will auto-navigate to Dashboard
      } catch (err: unknown) {
        const apiError = err as CustomApiError;
        setError(apiError.message || 'Kode OTP tidak valid.');
        // Clear inputs and focus first box
        setDigits(Array(OTP_LENGTH).fill(''));
        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);
      } finally {
        isSubmitting.current = false;
      }
    },
    [verifyOtp],
  );

  const handleDigitChange = useCallback(
    (index: number, value: string) => {
      // Only accept single digit
      const digit = value.replace(/[^0-9]/g, '').slice(-1);

      setDigits((prev) => {
        const next = [...prev];
        next[index] = digit;

        // Auto-advance to next input
        if (digit && index < OTP_LENGTH - 1) {
          setTimeout(() => {
            inputRefs.current[index + 1]?.focus();
          }, 0);
        }

        // Auto-submit when all digits filled
        if (digit && index === OTP_LENGTH - 1) {
          const allFilled = next.every((d) => d !== '');
          if (allFilled) {
            setTimeout(() => handleSubmit(next), 50);
          }
        }

        return next;
      });

      setError(null);
    },
    [handleSubmit],
  );

  const handleKeyPress = useCallback(
    (index: number, e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
        // Move focus back on backspace when current box is empty
        inputRefs.current[index - 1]?.focus();
        setDigits((prev) => {
          const next = [...prev];
          next[index - 1] = '';
          return next;
        });
      }
    },
    [digits],
  );

  const handleResend = useCallback(async () => {
    setIsResending(true);
    setError(null);
    try {
      await resendOtp();
      setCountdown(RESEND_COOLDOWN);
      Alert.alert('Berhasil', 'Kode OTP baru telah dikirim.');
    } catch {
      // Non-form error handled by global ErrorBottomSheet via interceptor
    } finally {
      setIsResending(false);
    }
  }, [resendOtp]);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isInputDisabled = isLoading || isResending;

  return (
    <View style={[styles.root, { backgroundColor: theme.bgApp }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.content, { paddingTop: insets.top + spacing['5xl'] }]}>
          {/* ─── Header ──────────────────────────────────────────── */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text variant="title1" style={styles.logoText}>
                L
              </Text>
            </View>
            <Text variant="title2" align="center">
              Verifikasi OTP
            </Text>
            <Text
              variant="subheadline"
              color="textSecondary"
              align="center"
              style={styles.subtitle}
            >
              Masukkan kode 6 digit yang dikirim ke
            </Text>
            {user?.email && (
              <Text variant="subheadline" color="textAccent" align="center">
                {user.email}
              </Text>
            )}
          </View>

          {/* ─── OTP Input Boxes ─────────────────────────────────── */}
          <View style={styles.otpContainer}>
            {digits.map((digit, index) => (
              <RNTextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={[
                  styles.otpBox,
                  typography.title2,
                  {
                    color: theme.textPrimary,
                    backgroundColor: theme.bgInput,
                    borderColor: error
                      ? theme.statusError
                      : digit
                      ? theme.textAccent
                      : theme.borderSubtle,
                  },
                ]}
                value={digit}
                onChangeText={(value) => handleDigitChange(index, value)}
                onKeyPress={(e) => handleKeyPress(index, e)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                selectTextOnFocus
                editable={!isInputDisabled}
                selectionColor={theme.textAccent}
              />
            ))}
          </View>

          {/* ─── Error Message ────────────────────────────────────── */}
          {error && (
            <Text variant="footnote" color="statusError" align="center" style={styles.errorText}>
              {error}
            </Text>
          )}

          {/* ─── Loading Indicator ────────────────────────────────── */}
          {isLoading && <ActivityIndicator color={colors.primary[500]} style={styles.loader} />}

          {/* ─── Resend Section ───────────────────────────────────── */}
          <View style={styles.resendSection}>
            {countdown > 0 ? (
              <Text variant="footnote" color="textSecondary" align="center">
                Kirim ulang kode dalam {formatCountdown(countdown)}
              </Text>
            ) : (
              <Pressable onPress={handleResend} disabled={isResending} hitSlop={8}>
                <Text
                  variant="subheadline"
                  color="textAccent"
                  align="center"
                  style={[styles.resendLink, isResending && styles.resendDisabled]}
                >
                  {isResending ? 'Mengirim...' : 'Kirim Ulang'}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>

      <View style={{ height: insets.bottom + spacing.lg }} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flex: {
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

  // OTP
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  otpBox: {
    width: 48,
    height: 56,
    borderRadius: radius.md,
    borderWidth: 1.5,
    fontSize: 24,
    fontWeight: '700',
  },

  // Error
  errorText: {
    marginTop: spacing.lg,
  },

  // Loader
  loader: {
    marginTop: spacing.lg,
  },

  // Resend
  resendSection: {
    marginTop: spacing['3xl'],
    alignItems: 'center',
  },
  resendLink: {
    fontWeight: '600',
  },
  resendDisabled: {
    opacity: 0.5,
  },
});
