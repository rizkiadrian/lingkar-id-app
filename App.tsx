/**
 * LingkarID App — Root component.
 *
 * Auth-gated navigation:
 * - Not hydrated → splash/loading
 * - Not authenticated → AuthNavigator (Login, Register, VerifyOtp, VerifyEmail)
 * - Authenticated but not verified → VerifyOtp or VerifyEmail based on pendingVerification
 * - Authenticated and verified → MainTabNavigator (Dashboard)
 *
 * Dev toggle retained for Design System access.
 */

import React, { useEffect, useState } from 'react';

import { ActivityIndicator, Pressable, StatusBar, StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Text } from '@/components/ui';
import { ErrorBottomSheet } from '@/components/ui/ErrorBottomSheet';
import { AuthNavigator, MainTabNavigator } from '@/navigation';
import { VerifyEmailScreen, VerifyOtpScreen } from '@/screens/auth';
import { DesignSystemScreen } from '@/screens/dev';
import { useAuthStore } from '@/store/useAuthStore';
import { ThemeProvider, useTheme } from '@/theme';
import { colors } from '@/theme/colors';

function AppContent() {
  const { isDark, theme } = useTheme();
  const { isHydrated, isAuthenticated, user, pendingVerification, hydrate } = useAuthStore();
  const [showDesignSystem, setShowDesignSystem] = useState(false);

  // Hydrate auth state on mount
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Splash screen while hydrating
  if (!isHydrated) {
    return (
      <View style={[styles.splash, { backgroundColor: theme.bgApp }]}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <View style={styles.splashLogo}>
          <Text variant="title1" style={styles.splashLogoText}>
            L
          </Text>
        </View>
        <ActivityIndicator color={colors.primary[500]} style={styles.splashSpinner} />
      </View>
    );
  }

  // Design System override (dev only)
  if (showDesignSystem) {
    return (
      <View style={styles.root}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <DesignSystemScreen />
        <Pressable
          onPress={() => setShowDesignSystem(false)}
          style={[styles.devToggle, { backgroundColor: theme.buttonPrimary }]}
        >
          <Text variant="caption2" style={styles.devToggleText}>
            ← Back
          </Text>
        </Pressable>
      </View>
    );
  }

  // Determine which screen tree to show
  const isVerified = user?.is_verified !== false;
  const needsVerification = isAuthenticated && !isVerified;

  return (
    <View style={styles.root}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {isAuthenticated && isVerified ? (
        // Authenticated + verified → Dashboard
        <NavigationContainer>
          <MainTabNavigator />
        </NavigationContainer>
      ) : needsVerification ? (
        // Authenticated but not verified → show verification screen
        pendingVerification === 'email' ? (
          <VerifyEmailScreen />
        ) : (
          <VerifyOtpScreen />
        )
      ) : (
        // Not authenticated → Auth flow
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      )}

      {/* Dev toggle for Design System — remove in production */}
      {__DEV__ && (
        <Pressable
          onPress={() => setShowDesignSystem(true)}
          style={[styles.devToggle, { backgroundColor: theme.bgElevated }]}
        >
          <Text variant="caption2" color="textSecondary" style={styles.devToggleText}>
            DS
          </Text>
        </Pressable>
      )}
    </View>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
        <ErrorBottomSheet />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashLogo: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashLogoText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 32,
  },
  splashSpinner: {
    marginTop: 24,
  },
  devToggle: {
    position: 'absolute',
    top: 60,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 13,
    opacity: 0.85,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  devToggleText: {
    fontWeight: '600',
  },
});

export default App;
