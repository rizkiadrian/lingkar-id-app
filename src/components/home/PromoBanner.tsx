/**
 * PromoBanner — horizontal scrollable promo cards with gradient backgrounds.
 */

import React from 'react';

import { View, ScrollView, StyleSheet, Pressable } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Text } from '@/components/ui';
import { colors } from '@/theme/colors';
import { radius, shadows, spacing } from '@/theme/spacing';

interface PromoItem {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  gradient: string[];
}

const PROMOS: PromoItem[] = [
  {
    id: '1',
    title: 'Cashback 20%',
    subtitle: 'Untuk deposit pertama kamu',
    cta: 'Klaim Sekarang',
    gradient: [colors.primary[400], colors.primary[600], colors.primary[800]],
  },
  {
    id: '2',
    title: 'Gratis Transfer',
    subtitle: '10x transfer gratis bulan ini',
    cta: 'Lihat Detail',
    gradient: [colors.tertiary[500], colors.tertiary[700]],
  },
  {
    id: '3',
    title: 'Referral Bonus',
    subtitle: 'Ajak teman, dapat Rp 50.000',
    cta: 'Bagikan Link',
    gradient: [colors.secondary[700], colors.secondary[950]],
  },
];

export function PromoBanner() {
  return (
    <View>
      <View style={styles.header}>
        <Text variant="headline">Promo Spesial</Text>
        <Pressable hitSlop={8}>
          <Text variant="footnote" color="textAccent">
            Lihat Semua
          </Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={280 + spacing.md}
        snapToAlignment="start"
      >
        {PROMOS.map((promo) => (
          <Pressable key={promo.id}>
            <LinearGradient
              colors={promo.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.card, shadows.md]}
            >
              <View style={styles.cardInner}>
                <Text variant="caption2" style={styles.promoSubtitle}>
                  {promo.subtitle}
                </Text>
                <Text variant="title3" style={styles.promoTitle}>
                  {promo.title}
                </Text>
                <View style={styles.ctaContainer}>
                  <Text variant="footnote" style={styles.ctaText}>
                    {promo.cta}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing['2xl'],
  },
  scrollContent: {
    paddingHorizontal: spacing['2xl'],
    gap: spacing.md,
  },
  card: {
    width: 280,
    borderRadius: radius.xl,
    minHeight: 140,
  },
  cardInner: {
    padding: spacing.xl,
    justifyContent: 'space-between',
    minHeight: 140,
  },
  promoSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    marginBottom: spacing.xs,
  },
  promoTitle: {
    color: colors.white,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
  ctaContainer: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
  ctaText: {
    color: colors.white,
    fontWeight: '600',
  },
});
