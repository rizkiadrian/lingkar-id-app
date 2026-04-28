/**
 * Login Screen — iOS-modern style.
 *
 * Clean, spacious layout with:
 * - Brand logo area at top
 * - Welcome text
 * - Email + Password inputs
 * - Login button
 * - Forgot password link
 * - Bottom registration prompt
 */

import React, { useState } from 'react';

import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, Button, TextInput } from '@/components/ui';
import { useTheme, spacing, radius, colors } from '@/theme';

export function LoginScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  // Template state — no actual auth logic
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
            <View style={[styles.logoContainer, { backgroundColor: colors.primary[500] }]}>
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
              label="Email"
              placeholder="nama@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
            />

            <View style={styles.inputGap} />

            <TextInput
              label="Password"
              placeholder="Masukkan password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
              textContentType="password"
            />

            <Pressable style={styles.forgotButton} hitSlop={8}>
              <Text variant="footnote" color="textAccent">
                Lupa password?
              </Text>
            </Pressable>

            <Button
              onPress={() => {
                // Template — no auth logic
              }}
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
            <Pressable hitSlop={8}>
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
