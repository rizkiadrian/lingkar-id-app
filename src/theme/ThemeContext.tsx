/**
 * Theme context — provides semantic colors based on system color scheme.
 *
 * Usage:
 *   const { theme, isDark } = useTheme();
 *   style={{ color: theme.textPrimary }}
 */

import React, { createContext, useContext, useMemo } from 'react';

import { useColorScheme } from 'react-native';

import { lightTheme, darkTheme } from './semantic';

import type { SemanticColors } from './semantic';

interface ThemeContextValue {
  theme: SemanticColors;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  isDark: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: isDark ? darkTheme : lightTheme,
      isDark,
    }),
    [isDark],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
