/**
 * Design System Showcase — visual reference for all tokens and components.
 *
 * Similar to the CRM /design-system page.
 * Shows: Colors, Typography, Spacing, Buttons, Inputs, Cards, Badges, Avatars, Home Components.
 */

import React from 'react';

import { View, ScrollView, StyleSheet } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { WalletCard, QuickActions, PromoBanner } from '@/components/home';
import { Text, Button, TextInput, Card, Badge, Divider, Avatar } from '@/components/ui';
import type { typography } from '@/theme';
import { useTheme, colors, spacing, radius } from '@/theme';

// ─── Section wrapper ──────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={sectionStyles.container}>
      <Text variant="title3" style={sectionStyles.title}>
        {title}
      </Text>
      {children}
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  container: { marginBottom: spacing['3xl'] },
  title: { marginBottom: spacing.lg },
});

// ─── Color swatch ─────────────────────────────────────────────────

function ColorSwatch({ name, palette }: { name: string; palette: Record<string, string> }) {
  return (
    <View style={swatchStyles.container}>
      <Text variant="headline" style={swatchStyles.name}>
        {name}
      </Text>
      <View style={swatchStyles.row}>
        {Object.entries(palette).map(([shade, hex]) => (
          <View key={shade} style={swatchStyles.item}>
            <View style={[swatchStyles.color, { backgroundColor: hex }]} />
            <Text variant="caption2" color="textTertiary">
              {shade}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const swatchStyles = StyleSheet.create({
  container: { marginBottom: spacing.xl },
  name: { marginBottom: spacing.sm, textTransform: 'capitalize' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  item: { alignItems: 'center', width: 44 },
  color: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    marginBottom: spacing.xs,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.08)',
  },
});

// ─── Typography sample ────────────────────────────────────────────

function TypographySample({ name, variant }: { name: string; variant: keyof typeof typography }) {
  return (
    <View style={typoStyles.row}>
      <Text variant="caption1" color="textTertiary" style={typoStyles.label}>
        {name}
      </Text>
      <Text variant={variant} style={typoStyles.sample}>
        The quick brown fox
      </Text>
    </View>
  );
}

const typoStyles = StyleSheet.create({
  row: { marginBottom: spacing.md },
  label: { marginBottom: spacing['2xs'] },
  sample: {},
});

// ─── Main Screen ──────────────────────────────────────────────────

export function DesignSystemScreen() {
  const { theme, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { backgroundColor: theme.bgApp }]}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + spacing.lg,
            paddingBottom: insets.bottom + spacing['3xl'],
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text variant="largeTitle" style={styles.header}>
          Design System
        </Text>
        <Text variant="body" color="textSecondary" style={styles.headerSub}>
          LingkarID Mobile — {isDark ? 'Dark' : 'Light'} Mode
        </Text>

        <Divider />
        <View style={styles.dividerGap} />

        {/* ─── Colors ──────────────────────────────────────────── */}
        <Section title="Colors">
          <ColorSwatch name="Primary (Crimson)" palette={colors.primary} />
          <ColorSwatch name="Secondary (Charcoal)" palette={colors.secondary} />
          <ColorSwatch name="Tertiary (Ocean)" palette={colors.tertiary} />
          <ColorSwatch name="Neutral" palette={colors.neutral} />
          <ColorSwatch name="Success" palette={colors.success} />
          <ColorSwatch name="Warning" palette={colors.warning} />
          <ColorSwatch name="Error" palette={colors.error} />
        </Section>

        {/* ─── Typography ──────────────────────────────────────── */}
        <Section title="Typography">
          <TypographySample name="Large Title (34pt)" variant="largeTitle" />
          <TypographySample name="Title 1 (28pt)" variant="title1" />
          <TypographySample name="Title 2 (22pt)" variant="title2" />
          <TypographySample name="Title 3 (20pt)" variant="title3" />
          <TypographySample name="Headline (17pt semi)" variant="headline" />
          <TypographySample name="Body (17pt)" variant="body" />
          <TypographySample name="Callout (16pt)" variant="callout" />
          <TypographySample name="Subheadline (15pt)" variant="subheadline" />
          <TypographySample name="Footnote (13pt)" variant="footnote" />
          <TypographySample name="Caption 1 (12pt)" variant="caption1" />
          <TypographySample name="Caption 2 (11pt)" variant="caption2" />
          <TypographySample name="Overline (10pt)" variant="overline" />
        </Section>

        {/* ─── Buttons ─────────────────────────────────────────── */}
        <Section title="Buttons">
          <View style={styles.buttonGroup}>
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="destructive">Destructive</Button>
            <Button loading>Loading...</Button>
            <Button disabled>Disabled</Button>
          </View>

          <Text variant="footnote" color="textTertiary" style={styles.sizeLabel}>
            Size variants:
          </Text>
          <View style={styles.buttonGroup}>
            <Button size="sm" fullWidth={false}>
              Small
            </Button>
            <Button size="md" fullWidth={false}>
              Medium
            </Button>
            <Button size="lg" fullWidth={false}>
              Large
            </Button>
          </View>
        </Section>

        {/* ─── Text Inputs ─────────────────────────────────────── */}
        <Section title="Text Inputs">
          <TextInput
            label="Default Input"
            placeholder="Type something..."
            containerStyle={styles.inputSpacing}
          />
          <TextInput
            label="Password Input"
            placeholder="Enter password"
            secureTextEntry
            containerStyle={styles.inputSpacing}
          />
          <TextInput
            label="Error State"
            placeholder="Invalid input"
            value="bad@"
            error="Please enter a valid email address"
            containerStyle={styles.inputSpacing}
          />
        </Section>

        {/* ─── Cards ───────────────────────────────────────────── */}
        <Section title="Cards">
          <Card variant="elevated" style={styles.cardSpacing}>
            <Text variant="headline">Elevated Card</Text>
            <Text variant="subheadline" color="textSecondary">
              Default card with shadow elevation
            </Text>
          </Card>
          <Card variant="outlined" style={styles.cardSpacing}>
            <Text variant="headline">Outlined Card</Text>
            <Text variant="subheadline" color="textSecondary">
              Card with border, no shadow
            </Text>
          </Card>
          <Card variant="flat" style={styles.cardSpacing}>
            <Text variant="headline">Flat Card</Text>
            <Text variant="subheadline" color="textSecondary">
              No shadow, no border
            </Text>
          </Card>
        </Section>

        {/* ─── Badges ──────────────────────────────────────────── */}
        <Section title="Badges">
          <View style={styles.badgeRow}>
            <Badge variant="success">Active</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="error">Rejected</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="neutral">Draft</Badge>
          </View>
        </Section>

        {/* ─── Avatars ─────────────────────────────────────────── */}
        <Section title="Avatars">
          <View style={styles.avatarRow}>
            <Avatar name="John Doe" size="sm" />
            <Avatar name="Jane Smith" size="md" color="tertiary" />
            <Avatar name="Admin User" size="lg" color="secondary" />
            <Avatar name="Rizki Adrian" size="xl" />
          </View>
        </Section>

        {/* ─── Home Components ──────────────────────────────── */}
        <Section title="Home Components">
          <Text variant="footnote" color="textTertiary" style={styles.componentNote}>
            Composite components used on the Home screen.
          </Text>

          <Text variant="headline" style={styles.componentLabel}>
            WalletCard
          </Text>
          <Text variant="caption1" color="textTertiary" style={styles.componentDesc}>
            Gradient hero card. Pattern: LinearGradient (borderRadius only) → inner View (padding).
            No overflow hidden.
          </Text>
          <View style={styles.componentPreview}>
            <WalletCard />
          </View>

          <Text variant="headline" style={styles.componentLabel}>
            QuickActions
          </Text>
          <Text variant="caption1" color="textTertiary" style={styles.componentDesc}>
            Clean 4×2 grid. Flat tinted backgrounds (primary/50) with primary/600 icons. No
            gradients, no shadows.
          </Text>
          <View style={styles.componentPreview}>
            <QuickActions />
          </View>

          <Text variant="headline" style={styles.componentLabel}>
            PromoBanner
          </Text>
          <Text variant="caption1" color="textTertiary" style={styles.componentDesc}>
            Horizontal scroll with gradient cards. Pattern: LinearGradient (borderRadius only) →
            inner View (padding + content). Snap-to-card scrolling. Supports API banners, fallback
            promos, and skeleton loading state.
          </Text>

          <Text variant="footnote" color="textTertiary" style={styles.stateLabel}>
            Loading (skeleton):
          </Text>
          <View style={styles.fullBleedPreview}>
            <PromoBanner isLoading />
          </View>

          <Text variant="footnote" color="textTertiary" style={styles.stateLabel}>
            Fallback (no API data):
          </Text>
          <View style={styles.fullBleedPreview}>
            <PromoBanner />
          </View>
        </Section>

        {/* ─── Spacing Scale ───────────────────────────────────── */}
        <Section title="Spacing Scale">
          {(Object.entries(spacing) as [string, number][]).map(([name, value]) => (
            <View key={name} style={styles.spacingRow}>
              <Text variant="caption1" color="textTertiary" style={styles.spacingLabel}>
                {name} ({value}px)
              </Text>
              <View
                style={[
                  styles.spacingBar,
                  {
                    width: value,
                    backgroundColor: colors.primary[400],
                  },
                ]}
              />
            </View>
          ))}
        </Section>

        {/* ─── Border Radius ───────────────────────────────────── */}
        <Section title="Border Radius">
          <View style={styles.radiusRow}>
            {(Object.entries(radius) as [string, number][])
              .filter(([_, v]) => v <= 24)
              .map(([name, value]) => (
                <View key={name} style={styles.radiusItem}>
                  <View
                    style={[
                      styles.radiusBox,
                      {
                        borderRadius: value,
                        backgroundColor: colors.tertiary[100],
                        borderColor: colors.tertiary[400],
                      },
                    ]}
                  />
                  <Text variant="caption2" color="textTertiary">
                    {name}
                  </Text>
                </View>
              ))}
          </View>
        </Section>

        {/* ─── Dividers ────────────────────────────────────────── */}
        <Section title="Dividers">
          <Text variant="footnote" color="textTertiary" style={styles.divLabel}>
            Default:
          </Text>
          <Divider />
          <View style={styles.divGap} />
          <Text variant="footnote" color="textTertiary" style={styles.divLabel}>
            Left inset:
          </Text>
          <Divider inset="left" />
        </Section>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingHorizontal: spacing['2xl'] },
  header: { marginBottom: spacing.xs },
  headerSub: { marginBottom: spacing['2xl'] },
  dividerGap: { height: spacing['2xl'] },

  // Buttons
  buttonGroup: { gap: spacing.md, marginBottom: spacing.lg },
  sizeLabel: { marginBottom: spacing.sm },

  // Inputs
  inputSpacing: { marginBottom: spacing.lg },

  // Cards
  cardSpacing: { marginBottom: spacing.md },

  // Badges
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },

  // Avatars
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },

  // Spacing
  spacingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  spacingLabel: { width: 90 },
  spacingBar: { height: 12, borderRadius: radius.xs },

  // Radius
  radiusRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.lg },
  radiusItem: { alignItems: 'center' },
  radiusBox: {
    width: 48,
    height: 48,
    borderWidth: 1.5,
    marginBottom: spacing.xs,
  },

  // Dividers
  divLabel: { marginBottom: spacing.sm },
  divGap: { height: spacing.lg },

  // Home Components
  componentNote: { marginBottom: spacing.xl },
  componentLabel: { marginBottom: spacing.xs },
  componentDesc: { marginBottom: spacing.md },
  componentPreview: { marginBottom: spacing['2xl'] },
  fullBleedPreview: { marginHorizontal: -spacing['2xl'], marginBottom: spacing['2xl'] },
  stateLabel: { marginBottom: spacing.sm },
});
