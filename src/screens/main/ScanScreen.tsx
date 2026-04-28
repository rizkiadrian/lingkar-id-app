/**
 * ScanScreen — QR/barcode scanner placeholder.
 * Center action tab with prominent visual.
 */

import React from 'react';

import { View, StyleSheet } from 'react-native';

import { QrCode } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Text } from '@/components/ui';
import { useTheme } from '@/theme';
import { colors } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';

export function ScanScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { backgroundColor: theme.bgApp }]}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.lg }]}>
        <Text variant="largeTitle">Scan</Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.scanFrame, { borderColor: colors.primary[400] }]}>
          <QrCode size={48} color={colors.primary[400]} strokeWidth={1.5} />
          <Text variant="headline" align="center" color="textSecondary" style={styles.scanLabel}>
            Scan QR Code
          </Text>
          <Text variant="footnote" align="center" color="textTertiary" style={styles.scanDesc}>
            Arahkan kamera ke QR code untuk melakukan pembayaran
          </Text>
        </View>

        <Button
          onPress={() => {
            // Template — no camera logic
          }}
          style={styles.scanButton}
        >
          Buka Kamera
        </Button>

        <Button
          variant="secondary"
          onPress={() => {
            // Template
          }}
        >
          QR Code Saya
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing['2xl'],
    marginBottom: spacing['2xl'],
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: spacing['6xl'],
    gap: spacing.md,
  },
  scanFrame: {
    width: 220,
    height: 220,
    borderRadius: radius['2xl'],
    borderWidth: 3,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing['3xl'],
    padding: spacing.xl,
    gap: spacing.md,
  },
  scanLabel: {
    marginBottom: spacing.xs,
  },
  scanDesc: {
    marginTop: spacing.xs,
  },
  scanButton: {
    marginTop: spacing.sm,
  },
});
