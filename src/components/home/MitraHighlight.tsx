/**
 * MitraHighlight — prominent CTA card to search for mitra partners.
 * Two-column layout: crimson card for "Cari Mitra" + tertiary card for "Jasa Populer".
 */

import React from 'react';

import { View, StyleSheet, Pressable } from 'react-native';

import { Search, Star } from 'lucide-react-native';

import { Text } from '@/components/ui';
import { colors } from '@/theme/colors';
import { radius, shadows, spacing } from '@/theme/spacing';
import { fonts } from '@/theme/typography';

export function MitraHighlight() {
  return (
    <View style={styles.container}>
      {/* Cari Mitra — primary CTA */}
      <Pressable style={[styles.card, styles.mitraCard]}>
        <View style={styles.iconBadge}>
          <Search size={20} color={colors.white} strokeWidth={2.2} />
        </View>
        <Text variant="headline" style={[styles.cardTitle, { fontFamily: fonts.bold }]}>
          Cari Mitra
        </Text>
        <Text variant="caption1" style={styles.cardDesc}>
          Temukan mitra terpercaya di sekitar Anda
        </Text>
        <View style={styles.cardArrow}>
          <Text variant="footnote" style={styles.arrowText}>
            Jelajahi →
          </Text>
        </View>
      </Pressable>

      {/* Jasa Populer — secondary CTA */}
      <Pressable style={[styles.card, styles.jasaCard]}>
        <View style={[styles.iconBadge, styles.jasaIconBadge]}>
          <Star size={20} color={colors.white} strokeWidth={2.2} />
        </View>
        <Text variant="headline" style={[styles.jasaTitle, { fontFamily: fonts.bold }]}>
          Jasa Populer
        </Text>
        <Text variant="caption1" style={styles.jasaDesc}>
          Layanan paling diminati minggu ini
        </Text>
        <View style={styles.cardArrow}>
          <Text variant="footnote" style={styles.jasaArrowText}>
            Lihat →
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  card: {
    flex: 1,
    borderRadius: radius.xl,
    padding: spacing.lg,
    minHeight: 150,
    justifyContent: 'space-between',
    ...shadows.md,
  },
  mitraCard: {
    backgroundColor: colors.primary[500],
    shadowColor: colors.primary[500],
  },
  jasaCard: {
    backgroundColor: colors.secondary[800],
    shadowColor: colors.secondary[800],
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  jasaIconBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  cardTitle: {
    color: colors.white,
    marginBottom: spacing['2xs'],
  },
  cardDesc: {
    color: 'rgba(255,255,255,0.75)',
  },
  jasaTitle: {
    color: colors.white,
    marginBottom: spacing['2xs'],
  },
  jasaDesc: {
    color: 'rgba(255,255,255,0.65)',
  },
  cardArrow: {
    marginTop: spacing.sm,
  },
  arrowText: {
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
  },
  jasaArrowText: {
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
  },
});
