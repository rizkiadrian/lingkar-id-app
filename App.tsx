/**
 * LingkarID App — Root component.
 *
 * Wraps the app with ThemeProvider and SafeAreaProvider.
 * Currently shows LoginScreen with a dev toggle to DesignSystemScreen.
 */

import React, { useState } from 'react';
import { StatusBar, View, Pressable, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useTheme } from '@/theme';
import { Text } from '@/components/ui';
import { LoginScreen } from '@/screens/auth';
import { DesignSystemScreen } from '@/screens/dev';

function AppContent() {
  const { isDark, theme } = useTheme();
  const [showDesignSystem, setShowDesignSystem] = useState(false);

  return (
    <View style={styles.root}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {showDesignSystem ? <DesignSystemScreen /> : <LoginScreen />}

      {/* Dev toggle — remove in production */}
      <Pressable
        onPress={() => setShowDesignSystem((v) => !v)}
        style={[styles.devToggle, { backgroundColor: theme.buttonPrimary }]}
      >
        <Text variant="caption1" style={styles.devToggleText}>
          {showDesignSystem ? '← Login' : 'Design System →'}
        </Text>
      </Pressable>
    </View>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  devToggle: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    opacity: 0.9,
  },
  devToggleText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default App;
