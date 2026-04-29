/**
 * WalletCard — hero card with gradient background.
 */

import React from 'react';

import { View, StyleSheet, Pressable } from 'react-native';

import { ArrowRight } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Text } from '@/components/ui';
import { colors } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';

export function WalletCard() {
  return (
    <LinearGradient
      colors={[colors.primary[500], colors.primary[700], colors.primary[900]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.wrapper}
    >
      <View style={styles.inner}>
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radius.xl,
  },
  inner: {
    padding: spacing.xl,
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
