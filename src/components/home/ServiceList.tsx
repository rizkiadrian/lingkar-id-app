/**
 * ServiceList — horizontal scrollable list of mitra services.
 * Template data — no API integration yet.
 */

import React from 'react';

import { View, ScrollView, StyleSheet, Pressable } from 'react-native';

import { MapPin, Star } from 'lucide-react-native';

import { Text } from '@/components/ui';
import { useTheme } from '@/theme';
import { colors } from '@/theme/colors';
import { radius, shadows, spacing } from '@/theme/spacing';
import { fonts } from '@/theme/typography';

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  mitraName: string;
  rating: string;
  location: string;
  price: string;
  accentColor: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: '1',
    name: 'Servis AC',
    category: 'Elektronik',
    mitraName: 'Jaya Teknik',
    rating: '4.8',
    location: 'Jakarta Selatan',
    price: 'Rp 150.000',
    accentColor: colors.primary[500],
  },
  {
    id: '2',
    name: 'Cleaning Service',
    category: 'Kebersihan',
    mitraName: 'Bersih Sejahtera',
    rating: '4.9',
    location: 'Jakarta Barat',
    price: 'Rp 200.000',
    accentColor: colors.tertiary[500],
  },
  {
    id: '3',
    name: 'Renovasi Rumah',
    category: 'Konstruksi',
    mitraName: 'Bangun Mandiri',
    rating: '4.7',
    location: 'Tangerang',
    price: 'Rp 500.000',
    accentColor: colors.success[500],
  },
  {
    id: '4',
    name: 'Pest Control',
    category: 'Kebersihan',
    mitraName: 'Anti Hama Pro',
    rating: '4.6',
    location: 'Bekasi',
    price: 'Rp 300.000',
    accentColor: colors.warning[500],
  },
];

function ServiceCard({ item }: { item: ServiceItem }) {
  const { theme } = useTheme();

  return (
    <Pressable style={[styles.card, { backgroundColor: theme.bgCard }]}>
      {/* Color accent bar */}
      <View style={[styles.accentBar, { backgroundColor: item.accentColor }]} />

      <View style={styles.cardContent}>
        {/* Category badge */}
        <View style={[styles.categoryBadge, { backgroundColor: `${item.accentColor}15` }]}>
          <Text variant="caption2" style={[styles.categoryText, { color: item.accentColor }]}>
            {item.category}
          </Text>
        </View>

        {/* Service name */}
        <Text variant="headline" style={{ fontFamily: fonts.bold }}>
          {item.name}
        </Text>

        {/* Mitra name */}
        <Text variant="caption1" color="textSecondary" style={styles.mitraName}>
          {item.mitraName}
        </Text>

        {/* Rating + Location */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Star size={12} color={colors.warning[500]} strokeWidth={2.5} fill={colors.warning[500]} />
            <Text variant="caption2" color="textSecondary">
              {item.rating}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <MapPin size={12} color={colors.secondary[400]} strokeWidth={2} />
            <Text variant="caption2" color="textTertiary">
              {item.location}
            </Text>
          </View>
        </View>

        {/* Price */}
        <Text variant="subheadline" color="textAccent" style={styles.price}>
          {item.price}
        </Text>
      </View>
    </Pressable>
  );
}

export function ServiceList() {
  return (
    <View>
      <View style={styles.header}>
        <Text variant="headline">Jasa dari Mitra</Text>
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
        snapToInterval={200 + spacing.md}
        snapToAlignment="start"
      >
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} item={service} />
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
    width: 200,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  accentBar: {
    height: 4,
  },
  cardContent: {
    padding: spacing.lg,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing['2xs'] + 1,
    borderRadius: radius.sm,
    marginBottom: spacing.sm,
  },
  categoryText: {
    fontWeight: '600',
  },
  mitraName: {
    marginTop: spacing['2xs'],
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['2xs'] + 1,
  },
  price: {
    fontWeight: '700',
    marginTop: spacing.md,
  },
});
