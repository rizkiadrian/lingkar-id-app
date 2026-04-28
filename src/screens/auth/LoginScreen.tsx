/**
 * Login Screen — iOS-modern style with real auth integration.
 *
 * - Email/phone + password form
 * - Calls useAuthStore.login()
 * - Shows field errors from backend validation
 * - Loading state on submit
 */

import React, { useCallback, useState } from 'react';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Text, TextInput } from '@/components/ui';
import type { CustomApiError } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { colors, spacing, useTheme } from '@/theme';
import { radius } from '@/theme/spacing';

export function LoginScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { login, isLoading } = useAuthStore();

  const [loginField, setLoginField] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ login?: string; password?: string; general?: string }>({});

  const handleLogin = useCallback(async () => {
    // Client-side validation
    const newErrors: typeof errors = {};
    if (!loginField.trim()) {
      newErrors.login = 'Email atau nomor HP wajib diisi.';
    }
    if (!password.trim()) {
      newErrors.password = 'Password wajib diisi.';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      await login({ login: loginField.trim(), password });
    } catch (err: unknown) {
      const apiError = err as CustomApiError;

      if (apiError.errors) {
        // Field-level errors from backend validation
        setErrors({
          login: apiError.errors.login?.[0],
          password: apiError.errors.password?.[0],
        });
      } else {
        // General error
        Alert.alert('Login Gagal', apiError.message || 'Terjadi kesalahan. Coba lagi.');
      }
    }
  }, [loginField, password, login]);

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
              LingkarID
            </Text>
            <Text
              variant="subheadline"
              color="textSecondary"
              align="center"
              style={styles.subtitle}
            >
              Selamat datang kembali
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
              label="Email atau Nomor HP"
              placeholder="nama@email.com atau 08xxxxxxxxxx"
              value={loginField}
              onChangeText={(text) => {
                setLoginField(text);
                if (errors.login) {
                  setErrors((prev) => ({ ...prev, login: undefined }));
                }
              }}
              error={errors.login}
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
              autoComplete="password"
              textContentType="password"
              editable={!isLoading}
            />

            <Pressable style={styles.forgotButton} hitSlop={8} disabled={isLoading}>
              <Text variant="footnote" color="textAccent">
                Lupa password?
              </Text>
            </Pressable>

            <Button
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
              style={styles.loginButton}
            >
              Masuk
            </Button>
          </View>

          {/* ─── Bottom Registration Prompt ──────────────────────── */}
          <View style={styles.registerPrompt}>
            <Text variant="subheadline" color="textSecondary">
              Belum punya akun?{' '}
            </Text>
            <Pressable hitSlop={8} disabled={isLoading}>
              <Text variant="subheadline" color="textAccent" style={styles.registerLink}>
                Daftar
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

  // Form
  formCard: {
    borderRadius: radius.lg,
    padding: spacing['2xl'],
    borderWidth: 1,
  },
  inputGap: {
    height: spacing.lg,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: spacing.md,
    marginBottom: spacing['2xl'],
  },
  loginButton: {
    marginTop: spacing.xs,
  },

  // Register
  registerPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing['3xl'],
  },
  registerLink: {
    fontWeight: '600',
  },
});
