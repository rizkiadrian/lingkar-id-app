/**
 * RecentTransactions — list of recent transaction items.
 * iOS grouped list style with avatars and amounts.
 */

import React from 'react';

import { View, StyleSheet, Pressable } from 'react-native';

import { Avatar, Divider, Text } from '@/components/ui';
import { useTheme } from '@/theme';
import { colors } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';

interface Transaction {
  id: string;
  name: string;
  description: string;
  amount: string;
  type: 'credit' | 'debit';
  date: string;
}

const TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    name: 'Deposit BCA VA',
    description: 'Top up saldo',
    amount: '+ Rp 500.000',
    type: 'credit',
    date: 'Hari ini',
  },
  {
    id: '2',
    name: 'Transfer ke Budi',
    description: 'Pembayaran jasa',
    amount: '- Rp 150.000',
    type: 'debit',
    date: 'Hari ini',
  },
  {
    id: '3',
    name: 'Cashback Promo',
    description: 'Bonus deposit',
    amount: '+ Rp 25.000',
    type: 'credit',
    date: 'Kemarin',
  },
  {
    id: '4',
    name: 'Bayar Listrik',
    description: 'PLN Prepaid',
    amount: '- Rp 200.000',
    type: 'debit',
    date: 'Kemarin',
  },
  {
    id: '5',
    name: 'Deposit QRIS',
    description: 'Top up saldo',
    amount: '+ Rp 1.000.000',
    type: 'credit',
    date: '25 Apr',
  },
];

function TransactionItem({ item }: { item: Transaction }) {
  const amountColor = item.type === 'credit' ? colors.success[600] : colors.secondary[900];

  return (
    <Pressable style={styles.item}>
      <Avatar name={item.name} size="md" color={item.type === 'credit' ? 'tertiary' : 'neutral'} />
      <View style={styles.itemContent}>
        <View style={styles.itemRow}>
          <Text variant="subheadline" style={styles.itemName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text variant="subheadline" style={[styles.amountText, { color: amountColor }]}>
            {item.amount}
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text variant="caption1" color="textTertiary">
            {item.description}
          </Text>
          <Text variant="caption1" color="textTertiary">
            {item.date}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export function RecentTransactions() {
  const { theme } = useTheme();

  return (
    <View>
      <View style={styles.header}>
        <Text variant="headline">Transaksi Terakhir</Text>
        <Pressable hitSlop={8}>
          <Text variant="footnote" color="textAccent">
            Lihat Semua
          </Text>
        </Pressable>
      </View>

      <View style={[styles.list, { backgroundColor: theme.bgCard }]}>
        {TRANSACTIONS.map((tx, index) => (
          <React.Fragment key={tx.id}>
            <TransactionItem item={tx} />
            {index < TRANSACTIONS.length - 1 && <Divider inset="left" />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  list: {
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  itemContent: {
    flex: 1,
    gap: spacing['2xs'],
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    flex: 1,
    marginRight: spacing.sm,
  },
  amountText: {
    fontWeight: '600',
  },
});
