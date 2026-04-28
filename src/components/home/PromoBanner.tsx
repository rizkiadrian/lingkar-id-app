/**
 * PromoBanner — horizontal scrollable promo cards.
 * iOS modern style with rounded corners and auto-sizing.
 */

import React from 'react';

import { View, ScrollView, StyleSheet, Pressable } from 'react-native';

import { Text } from '@/components/ui';
import { useTheme } from '@/theme';
import { colors } from '@/theme/colors';
import { radius, shadows, spacing } from '@/theme/spacing';

interface PromoItem {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  bgColor: string;
  textColor: string;
}

const PROMOS: PromoItem[] = [
  {
    id: '1',
    title: 'Cashback 20%',
    subtitle: 'Untuk deposit pertama kamu',
    cta: 'Klaim Sekarang',
    bgColor: colors.primary[500],
    textColor: colors.white,
  },
  {
    id: '2',
    title: 'Gratis Transfer',
    subtitle: '10x transfer gratis bulan ini',
    cta: 'Lihat Detail',
    bgColor: colors.tertiary[600],
    textColor: colors.white,
  },
  {
    id: '3',
    title: 'Referral Bonus',
    subtitle: 'Ajak teman, dapat Rp 50.000',
    cta: 'Bagikan Link',
    bgColor: colors.secondary[800],
    textColor: colors.white,
  },
];

export function PromoBanner() {
  const { theme } = useTheme();

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
          <Pressable
            key={promo.id}
            style={[
              styles.card,
              {
                backgroundColor: promo.bgColor,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            <Text
              variant="caption2"
              style={[styles.promoSubtitle, { color: `${promo.textColor}99` }]}
            >
              {promo.subtitle}
            </Text>
            <Text variant="title3" style={[styles.promoTitle, { color: promo.textColor }]}>
              {promo.title}
            </Text>
            <View style={styles.ctaContainer}>
              <Text variant="footnote" style={[styles.ctaText, { color: promo.textColor }]}>
                {promo.cta}
              </Text>
            </View>
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
    padding: spacing.xl,
    justifyContent: 'space-between',
    minHeight: 140,
    ...shadows.md,
  },
  promoSubtitle: {
    marginBottom: spacing.xs,
  },
  promoTitle: {
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
    fontWeight: '600',
  },
});
