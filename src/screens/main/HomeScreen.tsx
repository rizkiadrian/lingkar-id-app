/**
 * HomeScreen — main dashboard with wallet, quick actions, promos, and transactions.
 * iOS modern style with large title and grouped sections.
 */

import React from 'react';

import { View, ScrollView, StyleSheet, Pressable } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  MitraHighlight,
  PromoBanner,
  QuickActions,
  RecentTransactions,
  ServiceList,
  WalletCard,
} from '@/components/home';
import { Avatar, Text } from '@/components/ui';
import { useAuthStore } from '@/store/useAuthStore';
import { useTheme } from '@/theme';
import { spacing } from '@/theme/spacing';

export function HomeScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);
  const displayName = user?.name ?? 'User';

  return (
    <View style={[styles.root, { backgroundColor: theme.bgApp }]}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.lg }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Header ──────────────────────────────────────────── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text variant="footnote" color="textSecondary">
              Selamat pagi 👋
            </Text>
            <Text variant="title2">{displayName}</Text>
          </View>
          <Pressable hitSlop={8}>
            <Avatar name={displayName} size="md" />
          </Pressable>
        </View>

        {/* ─── Wallet Card ─────────────────────────────────────── */}
        <View style={styles.section}>
          <WalletCard />
        </View>

        {/* ─── Quick Actions ───────────────────────────────────── */}
        <View style={styles.section}>
          <QuickActions />
        </View>

        {/* ─── Cari Mitra + Jasa Populer ───────────────────────── */}
        <View style={styles.section}>
          <MitraHighlight />
        </View>

        {/* ─── Jasa dari Mitra (full-bleed scroll) ─────────────── */}
        <View style={styles.promoSection}>
          <ServiceList />
        </View>

        {/* ─── Promo Banner (full-bleed scroll) ────────────────── */}
        <View style={styles.promoSection}>
          <PromoBanner />
        </View>

        {/* ─── Recent Transactions ─────────────────────────────── */}
        <View style={styles.section}>
          <RecentTransactions />
        </View>

        {/* Bottom padding for tab bar */}
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
    paddingBottom: spacing['3xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing['2xl'],
    marginBottom: spacing.xl,
  },
  headerLeft: {
    gap: spacing['2xs'],
  },
  section: {
    paddingHorizontal: spacing['2xl'],
    marginBottom: spacing['2xl'],
  },
  promoSection: {
    marginBottom: spacing['2xl'],
  },
  bottomPadding: {
    height: 100,
  },
});
