/**
 * ProfileScreen — user profile and settings.
 * iOS Settings-style grouped list.
 */

import React from 'react';

import { View, ScrollView, StyleSheet, Pressable } from 'react-native';

import {
  Bell,
  ChevronRight,
  CreditCard,
  FileText,
  Globe,
  HelpCircle,
  Lock,
  MapPin,
  Moon,
  User,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar, Badge, Button, Divider, Text } from '@/components/ui';
import { useAuthStore } from '@/store/useAuthStore';
import { useTheme } from '@/theme';
import { colors } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';

import type { LucideIcon } from 'lucide-react-native';

interface MenuItem {
  Icon: LucideIcon;
  label: string;
  value?: string;
}

const ACCOUNT_ITEMS: MenuItem[] = [
  { Icon: User, label: 'Data Pribadi' },
  { Icon: Lock, label: 'Keamanan Akun' },
  { Icon: CreditCard, label: 'Metode Pembayaran' },
  { Icon: MapPin, label: 'Alamat Tersimpan' },
];

const GENERAL_ITEMS: MenuItem[] = [
  { Icon: Moon, label: 'Tampilan', value: 'Otomatis' },
  { Icon: Globe, label: 'Bahasa', value: 'Indonesia' },
  { Icon: Bell, label: 'Notifikasi' },
  { Icon: HelpCircle, label: 'Bantuan' },
  { Icon: FileText, label: 'Syarat & Ketentuan' },
];

function MenuGroup({ items }: { items: MenuItem[] }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.menuGroup, { backgroundColor: theme.bgCard }]}>
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          <Pressable style={styles.menuItem}>
            <View style={styles.menuIconWrap}>
              <item.Icon size={20} color={colors.secondary[500]} strokeWidth={1.8} />
            </View>
            <Text variant="body" style={styles.menuLabel}>
              {item.label}
            </Text>
            {item.value && (
              <Text variant="subheadline" color="textTertiary">
                {item.value}
              </Text>
            )}
            <ChevronRight size={16} color={colors.secondary[300]} strokeWidth={2} />
          </Pressable>
          {index < items.length - 1 && <Divider inset="left" />}
        </React.Fragment>
      ))}
    </View>
  );
}

export function ProfileScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { user, logout, isLoading } = useAuthStore();

  const displayName = user?.name ?? 'User';
  const displayEmail = user?.email ?? '-';

  return (
    <View style={[styles.root, { backgroundColor: theme.bgApp }]}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.lg }]}
        showsVerticalScrollIndicator={false}
      >
        <Text variant="largeTitle" style={styles.title}>
          Profil
        </Text>

        {/* ─── Profile Card ────────────────────────────────────── */}
        <View style={[styles.profileCard, { backgroundColor: theme.bgCard }]}>
          <Avatar name={displayName} size="xl" />
          <View style={styles.profileInfo}>
            <Text variant="title3">{displayName}</Text>
            <Text variant="subheadline" color="textSecondary">
              {displayEmail}
            </Text>
            <Badge variant="warning">{user?.role_name ?? 'Client'}</Badge>
          </View>
        </View>

        {/* ─── Account Settings ────────────────────────────────── */}
        <Text variant="footnote" color="textTertiary" style={styles.sectionLabel}>
          AKUN
        </Text>
        <MenuGroup items={ACCOUNT_ITEMS} />

        {/* ─── General Settings ────────────────────────────────── */}
        <Text variant="footnote" color="textTertiary" style={styles.sectionLabel}>
          UMUM
        </Text>
        <MenuGroup items={GENERAL_ITEMS} />

        {/* ─── Logout ──────────────────────────────────────────── */}
        <View style={styles.logoutSection}>
          <Button variant="destructive" loading={isLoading} disabled={isLoading} onPress={logout}>
            Keluar
          </Button>
          <Text variant="caption2" color="textTertiary" align="center" style={styles.version}>
            LingkarID v1.0.0
          </Text>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing['2xl'],
  },
  title: {
    marginBottom: spacing.xl,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xl,
    borderRadius: radius.lg,
    gap: spacing.lg,
    marginBottom: spacing['2xl'],
  },
  profileInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  sectionLabel: {
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
    letterSpacing: 0.5,
  },
  menuGroup: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing['2xl'],
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 2,
  },
  menuIconWrap: {
    marginRight: spacing.md,
    width: 28,
    alignItems: 'center',
  },
  menuLabel: {
    flex: 1,
  },
  logoutSection: {
    gap: spacing.md,
  },
  version: {
    marginTop: spacing.sm,
  },
  bottomPadding: {
    height: 100,
  },
});
