/**
 * MainTabNavigator — bottom tab navigation with 5 tabs.
 * iOS modern style with Lucide icons.
 */

import React, { useCallback } from 'react';

import { StyleSheet, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Bell, Home, LayoutList, Scan, User } from 'lucide-react-native';

import {
  ActivityScreen,
  HomeScreen,
  NotificationsScreen,
  ProfileScreen,
  ScanScreen,
} from '@/screens/main';
import { useTheme } from '@/theme';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

import type { LucideIcon } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

// ─── Stable tab icon components ──────────────────────────────────────────────

function TabIcon({
  Icon,
  focused,
  isScan,
}: {
  Icon: LucideIcon;
  focused: boolean;
  isScan?: boolean;
}) {
  const { theme } = useTheme();

  if (isScan) {
    return (
      <View style={styles.scanButton}>
        <Icon size={24} color={colors.white} strokeWidth={2} />
      </View>
    );
  }

  return (
    <Icon
      size={24}
      color={focused ? theme.textAccent : theme.textTertiary}
      strokeWidth={focused ? 2.2 : 1.8}
    />
  );
}

function HomeIcon({ focused }: { focused: boolean }) {
  return <TabIcon Icon={Home} focused={focused} />;
}

function ActivityIcon({ focused }: { focused: boolean }) {
  return <TabIcon Icon={LayoutList} focused={focused} />;
}

function ScanTabIcon({ focused }: { focused: boolean }) {
  return <TabIcon Icon={Scan} focused={focused} isScan />;
}

function NotificationsIcon({ focused }: { focused: boolean }) {
  return <TabIcon Icon={Bell} focused={focused} />;
}

function ProfileIcon({ focused }: { focused: boolean }) {
  return <TabIcon Icon={User} focused={focused} />;
}

// ─── Navigator ───────────────────────────────────────────────────────────────

export function MainTabNavigator() {
  const { theme } = useTheme();

  const homeIcon = useCallback(
    ({ focused }: { focused: boolean }) => <HomeIcon focused={focused} />,
    [],
  );
  const activityIcon = useCallback(
    ({ focused }: { focused: boolean }) => <ActivityIcon focused={focused} />,
    [],
  );
  const scanIcon = useCallback(
    ({ focused }: { focused: boolean }) => <ScanTabIcon focused={focused} />,
    [],
  );
  const notificationsIcon = useCallback(
    ({ focused }: { focused: boolean }) => <NotificationsIcon focused={focused} />,
    [],
  );
  const profileIcon = useCallback(
    ({ focused }: { focused: boolean }) => <ProfileIcon focused={focused} />,
    [],
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.bgCard,
          borderTopColor: theme.separator,
          borderTopWidth: StyleSheet.hairlineWidth,
          paddingTop: spacing.sm,
          height: 88,
        },
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: theme.textTertiary,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          marginTop: spacing['2xs'],
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Beranda', tabBarIcon: homeIcon }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{ tabBarLabel: 'Aktivitas', tabBarIcon: activityIcon }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{ tabBarLabel: '', tabBarIcon: scanIcon }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ tabBarLabel: 'Notifikasi', tabBarIcon: notificationsIcon }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profil', tabBarIcon: profileIcon }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  scanButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    shadowColor: colors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});
