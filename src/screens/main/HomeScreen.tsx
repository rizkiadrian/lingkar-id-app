/**
 * HomeScreen — main dashboard with wallet, quick actions, promos, and transactions.
 * iOS modern style with large title and grouped sections.
 *
 * Fetches dashboard data from GET /api/v1/client/dashboard on mount.
 * Passes banner data to PromoBanner; shows skeleton while loading.
 */

import React, { useEffect, useReducer, useCallback } from 'react';

import { View, ScrollView, StyleSheet, Pressable, RefreshControl } from 'react-native';

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
import { dashboardService } from '@/services/dashboard';
import type { IDashboardBanner } from '@/services/dashboard';
import { useAuthStore } from '@/store/useAuthStore';
import { useTheme } from '@/theme';
import { spacing } from '@/theme/spacing';

// ─── State (useReducer for React 19 compliance) ─────────────────────────────

interface DashboardState {
  banners: IDashboardBanner[] | null;
  isLoading: boolean;
  isRefreshing: boolean;
}

type DashboardAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; banners: IDashboardBanner[] }
  | { type: 'FETCH_ERROR' }
  | { type: 'REFRESH_START' }
  | { type: 'REFRESH_SUCCESS'; banners: IDashboardBanner[] }
  | { type: 'REFRESH_ERROR' };

function reducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, banners: action.banners };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false };
    case 'REFRESH_START':
      return { ...state, isRefreshing: true };
    case 'REFRESH_SUCCESS':
      return { ...state, isRefreshing: false, banners: action.banners };
    case 'REFRESH_ERROR':
      return { ...state, isRefreshing: false };
    default:
      return state;
  }
}

const initialState: DashboardState = {
  banners: null,
  isLoading: true,
  isRefreshing: false,
};

// ─── Component ───────────────────────────────────────────────────────────────

export function HomeScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);
  const displayName = user?.name ?? 'User';

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchDashboard = useCallback(async (isRefresh = false) => {
    dispatch({ type: isRefresh ? 'REFRESH_START' : 'FETCH_START' });
    try {
      const res = await dashboardService.getDashboard();
      setTimeout(() => {
        dispatch({
          type: isRefresh ? 'REFRESH_SUCCESS' : 'FETCH_SUCCESS',
          banners: res.data.banners,
        });
      }, 0);
    } catch {
      setTimeout(() => {
        dispatch({ type: isRefresh ? 'REFRESH_ERROR' : 'FETCH_ERROR' });
      }, 0);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleRefresh = useCallback(() => {
    fetchDashboard(true);
  }, [fetchDashboard]);

  return (
    <View style={[styles.root, { backgroundColor: theme.bgApp }]}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.lg }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={state.isRefreshing} onRefresh={handleRefresh} />
        }
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
          <PromoBanner banners={state.banners} isLoading={state.isLoading} />
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
