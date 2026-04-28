/**
 * NotificationsScreen — notification center placeholder.
 * iOS modern style with large title.
 */

import React from 'react';

import { View, StyleSheet } from 'react-native';

import { BellOff } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui';
import { useTheme } from '@/theme';
import { spacing } from '@/theme/spacing';

export function NotificationsScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { backgroundColor: theme.bgApp }]}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.lg }]}>
        <Text variant="largeTitle">Notifikasi</Text>
        <Text variant="subheadline" color="textSecondary" style={styles.subtitle}>
          Pemberitahuan dan update terbaru
        </Text>
      </View>

      <View style={styles.emptyState}>
        <View style={styles.emptyIconWrap}>
          <BellOff size={40} color={theme.textTertiary} strokeWidth={1.5} />
        </View>
        <Text variant="headline" align="center" color="textSecondary">
          Belum Ada Notifikasi
        </Text>
        <Text variant="subheadline" align="center" color="textTertiary" style={styles.emptyDesc}>
          Notifikasi transaksi dan promo akan muncul di sini
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing['2xl'],
    marginBottom: spacing['2xl'],
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing['3xl'],
    paddingBottom: spacing['6xl'],
  },
  emptyIconWrap: {
    marginBottom: spacing.lg,
  },
  emptyDesc: {
    marginTop: spacing.sm,
  },
});
