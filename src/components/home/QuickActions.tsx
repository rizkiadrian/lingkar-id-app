/**
 * QuickActions — grid of circular action buttons (iOS style).
 * Transfer, Bayar, Deposit, Riwayat, etc.
 */

import React from 'react';

import { View, StyleSheet, Pressable } from 'react-native';

import {
  ArrowUpRight,
  BarChart3,
  CreditCard,
  Download,
  History,
  MoreHorizontal,
  Shield,
  Ticket,
} from 'lucide-react-native';

import { Text } from '@/components/ui';
import { useTheme } from '@/theme';
import { colors } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';

import type { LucideIcon } from 'lucide-react-native';

interface QuickAction {
  Icon: LucideIcon;
  label: string;
  color: string;
  bgColor: string;
}

const ACTIONS: QuickAction[] = [
  {
    Icon: ArrowUpRight,
    label: 'Transfer',
    color: colors.primary[600],
    bgColor: colors.primary[50],
  },
  { Icon: CreditCard, label: 'Bayar', color: colors.tertiary[600], bgColor: colors.tertiary[50] },
  { Icon: Download, label: 'Deposit', color: colors.success[600], bgColor: colors.success[50] },
  { Icon: History, label: 'Riwayat', color: colors.warning[600], bgColor: colors.warning[50] },
  { Icon: Ticket, label: 'Voucher', color: colors.primary[600], bgColor: colors.primary[50] },
  {
    Icon: BarChart3,
    label: 'Investasi',
    color: colors.tertiary[600],
    bgColor: colors.tertiary[50],
  },
  { Icon: Shield, label: 'Asuransi', color: colors.success[600], bgColor: colors.success[50] },
  {
    Icon: MoreHorizontal,
    label: 'Lainnya',
    color: colors.secondary[600],
    bgColor: colors.neutral[100],
  },
];

export function QuickActions() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.bgCard }]}>
      <View style={styles.grid}>
        {ACTIONS.map((action) => (
          <Pressable key={action.label} style={styles.item}>
            <View style={[styles.iconCircle, { backgroundColor: action.bgColor }]}>
              <action.Icon size={24} color={action.color} strokeWidth={1.8} />
            </View>
            <Text variant="caption1" color="textSecondary" style={styles.label}>
              {action.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    textAlign: 'center',
  },
});
