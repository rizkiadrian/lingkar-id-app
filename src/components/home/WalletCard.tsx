/**
 * WalletCard — hero card showing user balance with gradient-like crimson background.
 * iOS modern style with glassmorphism feel.
 */

import React from 'react';

import { View, StyleSheet, Pressable } from 'react-native';

import { ArrowRight } from 'lucide-react-native';

import { Text } from '@/components/ui';
import { colors } from '@/theme/colors';
import { radius, shadows, spacing } from '@/theme/spacing';

export function WalletCard() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="footnote" style={styles.label}>
          Saldo Anda
        </Text>
        <Pressable hitSlop={8} style={styles.topUpButton}>
          <Text variant="footnote" style={styles.topUpLink}>
            Top Up
          </Text>
          <ArrowRight size={12} color={colors.white} strokeWidth={2.5} />
        </Pressable>
      </View>

      <Text variant="largeTitle" style={styles.balance}>
        Rp 2.450.000
      </Text>

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text variant="caption2" style={styles.footerLabel}>
            Poin
          </Text>
          <Text variant="headline" style={styles.footerValue}>
            1.250
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.footerItem}>
          <Text variant="caption2" style={styles.footerLabel}>
            Voucher
          </Text>
          <Text variant="headline" style={styles.footerValue}>
            3
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.footerItem}>
          <Text variant="caption2" style={styles.footerLabel}>
            Level
          </Text>
          <Text variant="headline" style={styles.footerValue}>
            Gold
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary[600],
    borderRadius: radius['2xl'],
    padding: spacing['2xl'],
    ...shadows.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    color: 'rgba(255,255,255,0.7)',
  },
  topUpLink: {
    color: colors.white,
    fontWeight: '600',
  },
  topUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  balance: {
    color: colors.white,
    marginBottom: spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: radius.md,
    paddingVertical: spacing.md,
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
  },
  footerLabel: {
    color: 'rgba(255,255,255,0.6)',
    marginBottom: spacing['2xs'],
  },
  footerValue: {
    color: colors.white,
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});
