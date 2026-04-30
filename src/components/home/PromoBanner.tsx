/**
 * PromoBanner — horizontal scrollable promo cards.
 *
 * Supports two modes:
 * - API banners: renders image banners from the dashboard API
 * - Fallback: renders hardcoded gradient promo cards when no API data
 *
 * Shows skeleton placeholders while loading.
 */

import React from 'react';

import { View, ScrollView, StyleSheet, Pressable, Image } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Text } from '@/components/ui';
import type { IDashboardBanner } from '@/services/dashboard';
import { colors } from '@/theme/colors';
import { radius, shadows, spacing } from '@/theme/spacing';

// ─── Fallback data (used when API returns no banners) ────────────────────────

interface FallbackPromo {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  gradient: string[];
}

const FALLBACK_PROMOS: FallbackPromo[] = [
  {
    id: 'fallback-1',
    title: 'Cashback 20%',
    subtitle: 'Untuk deposit pertama kamu',
    cta: 'Klaim Sekarang',
    gradient: [colors.primary[400], colors.primary[600], colors.primary[800]],
  },
  {
    id: 'fallback-2',
    title: 'Gratis Transfer',
    subtitle: '10x transfer gratis bulan ini',
    cta: 'Lihat Detail',
    gradient: [colors.tertiary[500], colors.tertiary[700]],
  },
  {
    id: 'fallback-3',
    title: 'Referral Bonus',
    subtitle: 'Ajak teman, dapat Rp 50.000',
    cta: 'Bagikan Link',
    gradient: [colors.secondary[700], colors.secondary[950]],
  },
];

// ─── Props ───────────────────────────────────────────────────────────────────

interface PromoBannerProps {
  /** Banners from the dashboard API. When undefined/null, shows fallback. */
  banners?: IDashboardBanner[] | null;
  /** Whether the dashboard data is loading. Shows skeleton when true. */
  isLoading?: boolean;
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function BannerSkeleton() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      scrollEnabled={false}
    >
      {[1, 2, 3].map((i) => (
        <View key={i} style={[styles.card, styles.skeletonCard]}>
          <View style={styles.skeletonInner}>
            <View style={styles.skeletonLine1} />
            <View style={styles.skeletonLine2} />
            <View style={styles.skeletonCta} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// ─── API Banner Card ─────────────────────────────────────────────────────────

function ApiBannerCard({ banner }: { banner: IDashboardBanner }) {
  if (banner.image_url) {
    return (
      <Pressable>
        <View style={[styles.card, shadows.md, styles.imageBannerCard]}>
          <Image source={{ uri: banner.image_url }} style={styles.bannerImage} resizeMode="cover" />
        </View>
      </Pressable>
    );
  }

  // Fallback for banners without image
  return (
    <Pressable>
      <LinearGradient
        colors={[colors.primary[400], colors.primary[600], colors.primary[800]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, shadows.md]}
      >
        <View style={styles.cardInner}>
          <Text variant="title3" style={styles.promoTitle}>
            {banner.title}
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

// ─── Fallback Card ───────────────────────────────────────────────────────────

function FallbackCard({ promo }: { promo: FallbackPromo }) {
  return (
    <Pressable>
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
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function PromoBanner({ banners, isLoading = false }: PromoBannerProps) {
  const hasApiBanners = banners && banners.length > 0;

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

      {isLoading ? (
        <BannerSkeleton />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          decelerationRate="fast"
          snapToInterval={280 + spacing.md}
          snapToAlignment="start"
        >
          {hasApiBanners
            ? banners.map((banner) => <ApiBannerCard key={banner.id} banner={banner} />)
            : FALLBACK_PROMOS.map((promo) => <FallbackCard key={promo.id} promo={promo} />)}
        </ScrollView>
      )}
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

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

  // Image banner
  imageBannerCard: {
    overflow: 'hidden',
  },
  bannerImage: {
    width: 280,
    height: 140,
    borderRadius: radius.xl,
  },

  // Skeleton
  skeletonCard: {
    backgroundColor: colors.neutral[200],
    overflow: 'hidden',
  },
  skeletonInner: {
    padding: spacing.xl,
    justifyContent: 'space-between',
    minHeight: 140,
  },
  skeletonLine1: {
    width: '60%',
    height: 12,
    borderRadius: radius.xs,
    backgroundColor: colors.neutral[300],
    marginBottom: spacing.sm,
  },
  skeletonLine2: {
    width: '80%',
    height: 20,
    borderRadius: radius.xs,
    backgroundColor: colors.neutral[300],
    marginBottom: spacing.lg,
  },
  skeletonCta: {
    width: 100,
    height: 28,
    borderRadius: radius.full,
    backgroundColor: colors.neutral[300],
  },
});
