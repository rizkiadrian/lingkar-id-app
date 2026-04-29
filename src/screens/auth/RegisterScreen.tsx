/**
 * Register Screen — iOS-modern style with verification method selector.
 *
 * - Full name, email, password, password confirmation fields
 * - Segmented control for verification method (Email Link / Kode OTP)
 * - Calls useAuthStore.register()
 * - Shows field errors from backend validation
 * - Loading state on submit
 * - Navigates to VerifyOtp or VerifyEmail on success
 */

import React, { useCallback, useState } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Text, TextInput } from '@/components/ui';
import type { CustomApiError } from '@/lib/api';
import type { AuthStackParamList } from '@/navigation/AuthNavigator';
import { useAuthStore } from '@/store/useAuthStore';
import { colors, spacing, useTheme } from '@/theme';
import { radius } from '@/theme/spacing';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type VerificationMethod = 'otp' | 'email';

interface FieldErrors {
  full_name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  verification_method?: string;
}

export function RegisterScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { register, isLoading } = useAuthStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [verificationMethod, setVerificationMethod] = useState<VerificationMethod>('otp');
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleRegister = useCallback(async () => {
    // Client-side validation
    const newErrors: FieldErrors = {};
    if (!fullName.trim()) {
      newErrors.full_name = 'Nama lengkap wajib diisi.';
    }
    if (!email.trim()) {
      newErrors.email = 'Email wajib diisi.';
    }
    if (!password.trim()) {
      newErrors.password = 'Password wajib diisi.';
    }
    if (!passwordConfirmation.trim()) {
      newErrors.password_confirmation = 'Konfirmasi password wajib diisi.';
    } else if (password !== passwordConfirmation) {
      newErrors.password_confirmation = 'Konfirmasi password tidak cocok.';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      await register({
        full_name: fullName.trim(),
        email: email.trim(),
        password,
        password_confirmation: passwordConfirmation,
        verification_method: verificationMethod,
      });

      // Navigate to appropriate verification screen
      if (verificationMethod === 'otp') {
        navigation.navigate('VerifyOtp');
      } else {
        navigation.navigate('VerifyEmail');
      }
    } catch (err: unknown) {
      const apiError = err as CustomApiError;

      if (apiError.errors) {
        setErrors({
          full_name: apiError.errors.full_name?.[0],
          email: apiError.errors.email?.[0],
          password: apiError.errors.password?.[0],
          password_confirmation: apiError.errors.password_confirmation?.[0],
          verification_method: apiError.errors.verification_method?.[0],
        });
      }
      // Non-form errors handled by global ErrorBottomSheet via interceptor
    }
  }, [fullName, email, password, passwordConfirmation, verificationMethod, register, navigation]);

  return (
    <View style={[styles.root, { backgroundColor: theme.bgApp }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: insets.top + spacing['4xl'] },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ─── Brand Area ─────────────────────────────────────── */}
          <View style={styles.brandArea}>
            <View style={styles.logoContainer}>
              <Text variant="title1" style={styles.logoText}>
                L
              </Text>
            </View>
            <Text variant="title2" align="center">
              Buat Akun
            </Text>
            <Text
              variant="subheadline"
              color="textSecondary"
              align="center"
              style={styles.subtitle}
            >
              Daftar untuk mulai menggunakan LingkarID
            </Text>
          </View>

          {/* ─── Form Card ──────────────────────────────────────── */}
          <View
            style={[
              styles.formCard,
              {
                backgroundColor: theme.bgCard,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            <TextInput
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                if (errors.full_name) {
                  setErrors((prev) => ({ ...prev, full_name: undefined }));
                }
              }}
              error={errors.full_name}
              autoCapitalize="words"
              autoComplete="name"
              textContentType="name"
              editable={!isLoading}
            />

            <View style={styles.inputGap} />

            <TextInput
              label="Email"
              placeholder="nama@email.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }
              }}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              editable={!isLoading}
            />

            <View style={styles.inputGap} />

            <TextInput
              label="Password"
              placeholder="Masukkan password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: undefined }));
                }
              }}
              error={errors.password}
              secureTextEntry
              autoComplete="new-password"
              textContentType="newPassword"
              editable={!isLoading}
            />

            <View style={styles.inputGap} />

            <TextInput
              label="Konfirmasi Password"
              placeholder="Ulangi password"
              value={passwordConfirmation}
              onChangeText={(text) => {
                setPasswordConfirmation(text);
                if (errors.password_confirmation) {
                  setErrors((prev) => ({ ...prev, password_confirmation: undefined }));
                }
              }}
              error={errors.password_confirmation}
              secureTextEntry
              autoComplete="new-password"
              textContentType="newPassword"
              editable={!isLoading}
            />

            <View style={styles.inputGap} />

            {/* ─── Verification Method Selector ──────────────────── */}
            <Text variant="overline" color="textSecondary" style={styles.selectorLabel}>
              Metode Verifikasi
            </Text>
            <View style={[styles.segmentedControl, { backgroundColor: theme.tertiarySystemFill }]}>
              <Pressable
                style={[
                  styles.segment,
                  verificationMethod === 'email' && [
                    styles.segmentActive,
                    { backgroundColor: theme.bgCard },
                  ],
                ]}
                onPress={() => setVerificationMethod('email')}
                disabled={isLoading}
              >
                <Text
                  variant="footnote"
                  color={verificationMethod === 'email' ? 'textPrimary' : 'textSecondary'}
                  style={verificationMethod === 'email' ? styles.segmentTextActive : undefined}
                >
                  Email Link
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.segment,
                  verificationMethod === 'otp' && [
                    styles.segmentActive,
                    { backgroundColor: theme.bgCard },
                  ],
                ]}
                onPress={() => setVerificationMethod('otp')}
                disabled={isLoading}
              >
                <Text
                  variant="footnote"
                  color={verificationMethod === 'otp' ? 'textPrimary' : 'textSecondary'}
                  style={verificationMethod === 'otp' ? styles.segmentTextActive : undefined}
                >
                  Kode OTP
                </Text>
              </Pressable>
            </View>

            <Button
              onPress={handleRegister}
              loading={isLoading}
              disabled={isLoading}
              style={styles.registerButton}
            >
              Daftar
            </Button>
          </View>

          {/* ─── Bottom Login Prompt ─────────────────────────────── */}
          <View style={styles.loginPrompt}>
            <Text variant="subheadline" color="textSecondary">
              Sudah punya akun?{' '}
            </Text>
            <Pressable
              hitSlop={8}
              disabled={isLoading}
              onPress={() => navigation.navigate('Login')}
            >
              <Text variant="subheadline" color="textAccent" style={styles.loginLink}>
                Masuk
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ─── Bottom Safe Area ─────────────────────────────────── */}
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing['2xl'],
  },

  // Brand
  brandArea: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
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

  // Form
  formCard: {
    borderRadius: radius.lg,
    padding: spacing['2xl'],
    borderWidth: 1,
  },
  inputGap: {
    height: spacing.lg,
  },
  selectorLabel: {
    marginBottom: spacing.sm,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: radius.sm,
    padding: 2,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    alignItems: 'center',
    borderRadius: radius.sm - 1,
  },
  segmentActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  segmentTextActive: {
    fontWeight: '600',
  },
  registerButton: {
    marginTop: spacing['2xl'],
  },

  // Login
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing['3xl'],
  },
  loginLink: {
    fontWeight: '600',
  },
});
