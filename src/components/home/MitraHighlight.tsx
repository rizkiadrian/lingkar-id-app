/**
 * MitraHighlight — gradient CTA cards for Cari Mitra and Jasa Populer.
 */

import React from 'react';

import { View, StyleSheet, Pressable } from 'react-native';

import { Search, Star } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Text } from '@/components/ui';
import { colors } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';
import { fonts } from '@/theme/typography';

export function MitraHighlight() {
  return (
    <View style={styles.container}>
      {/* Cari Mitra — crimson gradient */}
      <Pressable style={styles.cardWrapper}>
        <LinearGradient
          colors={[colors.primary[400], colors.primary[600], colors.primary[800]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.inner}>
            <View style={styles.iconBadge}>
              <Search size={20} color={colors.white} strokeWidth={2.2} />
            </View>
            <Text variant="headline" style={[styles.cardTitle, { fontFamily: fonts.bold }]}>
              Cari Mitra
            </Text>
            <Text variant="caption1" style={styles.cardDesc}>
              Temukan mitra terpercaya di sekitar Anda
            </Text>
            <Text variant="footnote" style={styles.arrowText}>
              Jelajahi →
            </Text>
          </View>
        </LinearGradient>
      </Pressable>

      {/* Jasa Populer — ocean blue gradient */}
      <Pressable style={styles.cardWrapper}>
        <LinearGradient
          colors={[colors.tertiary[500], colors.tertiary[700]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.inner}>
            <View style={styles.iconBadge}>
              <Star size={20} color={colors.warning[300]} strokeWidth={2.2} />
            </View>
            <Text variant="headline" style={[styles.cardTitle, { fontFamily: fonts.bold }]}>
              Jasa Populer
            </Text>
            <Text variant="caption1" style={styles.cardDesc}>
              Layanan paling diminati minggu ini
            </Text>
            <Text variant="footnote" style={styles.arrowText}>
              Lihat →
            </Text>
          </View>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  cardWrapper: {
    flex: 1,
  },
  gradient: {
    borderRadius: radius.lg,
  },
  inner: {
    padding: spacing.lg,
    minHeight: 170,
    justifyContent: 'space-between',
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  cardTitle: {
    color: colors.white,
    marginBottom: spacing['2xs'],
  },
  cardDesc: {
    color: 'rgba(255,255,255,0.7)',
  },
  arrowText: {
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    marginTop: spacing.sm,
  },
});
