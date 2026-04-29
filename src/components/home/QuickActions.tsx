/**
 * QuickActions — vibrant grid of action buttons with brand colors.
 * Menu items focused on client app features: mitra, jasa, deposit, wallet, etc.
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
  shadowColor: string;
}

const ACTIONS: QuickAction[] = [
  {
    Icon: Search,
    label: 'Cari Mitra',
    iconColor: colors.white,
    bgColor: colors.primary[500],
    shadowColor: colors.primary[500],
  },
  {
    Icon: Star,
    label: 'Jasa',
    iconColor: colors.white,
    bgColor: colors.tertiary[600],
    shadowColor: colors.tertiary[600],
  },
  {
    Icon: Download,
    label: 'Deposit',
    iconColor: colors.white,
    bgColor: colors.success[500],
    shadowColor: colors.success[500],
  },
  {
    Icon: Wallet,
    label: 'Wallet',
    iconColor: colors.white,
    bgColor: colors.warning[500],
    shadowColor: colors.warning[500],
  },
  {
    Icon: MapPin,
    label: 'Mitra Dekat',
    iconColor: colors.white,
    bgColor: colors.primary[400],
    shadowColor: colors.primary[400],
  },
  {
    Icon: Ticket,
    label: 'Voucher',
    iconColor: colors.white,
    bgColor: colors.tertiary[500],
    shadowColor: colors.tertiary[500],
  },
  {
    Icon: History,
    label: 'Riwayat',
    iconColor: colors.white,
    bgColor: colors.secondary[700],
    shadowColor: colors.secondary[700],
  },
  {
    Icon: MoreHorizontal,
    label: 'Lainnya',
    iconColor: colors.secondary[600],
    bgColor: colors.neutral[200],
    shadowColor: colors.neutral[400],
  },
];

export function QuickActions() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.bgCard }]}>
      <View style={styles.grid}>
        {ACTIONS.map((action) => (
          <Pressable key={action.label} style={styles.item}>
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: action.bgColor,
                  shadowColor: action.shadowColor,
                },
              ]}
            >
              <action.Icon size={22} color={action.iconColor} strokeWidth={2} />
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
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    textAlign: 'center',
    fontWeight: '500',
  },
});
