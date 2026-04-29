/**
 * QuickActions — clean grid with subtle tinted icon backgrounds.
 * Minimal, modern style inspired by iOS and fintech apps.
 */

import React from 'react';

import { View, StyleSheet, Pressable } from 'react-native';

import {
  Download,
  History,
  MapPin,
  MoreHorizontal,
  Search,
  Star,
  Ticket,
  Wallet,
} from 'lucide-react-native';

import { Text } from '@/components/ui';
import { useTheme } from '@/theme';
import { colors } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';

import type { LucideIcon } from 'lucide-react-native';

interface QuickAction {
  Icon: LucideIcon;
  label: string;
  iconColor: string;
  bgColor: string;
}

const ACTIONS: QuickAction[] = [
  {
    Icon: Search,
    label: 'Cari Mitra',
    iconColor: colors.primary[600],
    bgColor: colors.primary[50],
  },
  {
    Icon: Star,
    label: 'Jasa',
    iconColor: colors.primary[600],
    bgColor: colors.primary[50],
  },
  {
    Icon: Download,
    label: 'Deposit',
    iconColor: colors.primary[600],
    bgColor: colors.primary[50],
  },
  {
    Icon: Wallet,
    label: 'Wallet',
    iconColor: colors.primary[600],
    bgColor: colors.primary[50],
  },
  {
    Icon: MapPin,
    label: 'Mitra Dekat',
    iconColor: colors.primary[600],
    bgColor: colors.primary[50],
  },
  {
    Icon: Ticket,
    label: 'Voucher',
    iconColor: colors.primary[600],
    bgColor: colors.primary[50],
  },
  {
    Icon: History,
    label: 'Riwayat',
    iconColor: colors.primary[600],
    bgColor: colors.primary[50],
  },
  {
    Icon: MoreHorizontal,
    label: 'Lainnya',
    iconColor: colors.secondary[500],
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
              <action.Icon size={22} color={action.iconColor} strokeWidth={1.8} />
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
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xs,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    textAlign: 'center',
    fontWeight: '500',
  },
});
