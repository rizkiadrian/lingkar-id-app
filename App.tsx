/**
 * LingkarID App — Root component.
 *
 * Wraps the app with providers and shows either Login or Main Dashboard.
 * Dev toggle to switch between Login, Dashboard, and Design System.
 */

import React, { useState } from 'react';

import { Pressable, StatusBar, StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Text } from '@/components/ui';
import { MainTabNavigator } from '@/navigation';
import { LoginScreen } from '@/screens/auth';
import { DesignSystemScreen } from '@/screens/dev';
import { ThemeProvider, useTheme } from '@/theme';

type DevScreen = 'login' | 'dashboard' | 'design-system';

const DEV_SCREENS: { key: DevScreen; label: string }[] = [
  { key: 'login', label: 'Login' },
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'design-system', label: 'DS' },
];

function AppContent() {
  const { isDark, theme } = useTheme();
  const [currentScreen, setCurrentScreen] = useState<DevScreen>('dashboard');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen />;
      case 'design-system':
        return <DesignSystemScreen />;
      case 'dashboard':
        return (
          <NavigationContainer>
            <MainTabNavigator />
          </NavigationContainer>
        );
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      {renderScreen()}

      {/* Dev toggle — remove in production */}
      <View style={[styles.devBar, { backgroundColor: theme.bgElevated }]}>
        {DEV_SCREENS.map((screen) => (
          <Pressable
            key={screen.key}
            onPress={() => setCurrentScreen(screen.key)}
            style={[
              styles.devTab,
              currentScreen === screen.key && {
                backgroundColor: theme.buttonPrimary,
              },
            ]}
          >
            <Text
              variant="caption2"
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                color:
                  currentScreen === screen.key
                    ? theme.textInverted
                    : theme.textSecondary,
                fontWeight: '600',
              }}
            >
              {screen.label}
            </Text>
          </Pressable>
        ))}
      </View>
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
  devBar: {
    position: 'absolute',
    top: 60,
    right: 12,
    flexDirection: 'row',
    borderRadius: 16,
    padding: 3,
    gap: 2,
    opacity: 0.85,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  devTab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 13,
  },
});

export default App;
