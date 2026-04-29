# LingkarID Mobile App

React Native client app for the LingkarID platform — a fintech/marketplace connecting clients with service partners (mitra).

## Tech Stack

- **React Native** 0.85 + **React** 19
- **TypeScript** 5.8
- **Navigation:** React Navigation 7 (native-stack + bottom-tabs)
- **State:** Zustand 5
- **HTTP:** Axios
- **Icons:** Lucide React Native
- **Fonts:** Inter (custom, linked via react-native-asset)
- **Storage:** react-native-encrypted-storage (secure token storage)

## Project Structure

```
src/
├── assets/              # Fonts, images
├── components/
│   ├── ui/              # Design system primitives
│   │   ├── Text.tsx         # Typography component (maps to theme variants)
│   │   ├── Button.tsx       # Primary, secondary, ghost, destructive
│   │   ├── TextInput.tsx    # Form input with label, error state
│   │   ├── Card.tsx         # Elevated, outlined, flat variants
│   │   ├── Badge.tsx        # Status badges (success, warning, error, info, neutral)
│   │   ├── Divider.tsx      # Separator with inset support
│   │   ├── Avatar.tsx       # Initials avatar with size/color variants
│   │   └── ErrorBottomSheet.tsx  # Global notification bottom sheet
│   └── home/            # Home screen composites
│       ├── WalletCard.tsx       # Gradient hero card (balance, points, voucher, level)
│       ├── QuickActions.tsx     # 4×2 icon grid (flat tinted backgrounds)
│       ├── PromoBanner.tsx      # Horizontal scroll gradient promo cards
│       ├── MitraHighlight.tsx   # Featured mitra search + categories
│       ├── ServiceList.tsx      # Horizontal service cards from mitra
│       └── RecentTransactions.tsx  # Latest transaction list
├── config/
│   └── env.ts           # Environment config (API base URL)
├── hooks/               # Custom React hooks
├── lib/
│   ├── api.ts           # Axios client with silent token refresh
│   └── secure-storage.ts  # Encrypted storage wrapper
├── navigation/
│   ├── AuthNavigator.tsx    # Login → Register → VerifyOtp → VerifyEmail
│   └── MainTabNavigator.tsx # Beranda, Aktivitas, Scan, Notifikasi, Profil
├── screens/
│   ├── auth/            # Login, Register, VerifyOtp, VerifyEmail
│   ├── main/            # Home, Activity, Scan, Notifications, Profile
│   └── dev/             # Design System showcase (dev only)
├── services/
│   └── auth/            # Auth API service + types
├── store/
│   ├── useAuthStore.ts  # Auth state (user, tokens, hydration)
│   └── useErrorStore.ts # Global error/notification state
├── theme/
│   ├── colors.ts        # Color palette (primary, secondary, tertiary, neutral, status)
│   ├── semantic.ts      # Light/dark semantic tokens (bgApp, textPrimary, etc.)
│   ├── typography.ts    # iOS HIG type scale (Inter font, 12 variants)
│   ├── spacing.ts       # 4pt grid spacing + border radius + shadow tokens
│   └── ThemeContext.tsx  # React context for light/dark mode
├── types/               # Shared TypeScript types
└── utils/               # Utility functions
```

## Design System

The app uses a code-first design system with iOS-modern aesthetics.

### Color Palette

| Name      | Role                  | Key Shades |
| --------- | --------------------- | ---------- |
| Primary   | Crimson Red — brand   | 50–950     |
| Secondary | Charcoal Gray — text  | 50–950     |
| Tertiary  | Ocean Blue — accents  | 50–950     |
| Neutral   | Light Gray — surfaces | 50–950     |
| Success   | Emerald Green         | 50–900     |
| Warning   | Amber/Orange          | 50–900     |
| Error     | Crimson (alias)       | 50–900     |

### Typography (Inter)

iOS HIG-inspired scale: `largeTitle` (34pt) → `overline` (10pt). 12 variants total.

### Spacing

4pt grid system: `2xs` (2px) → `6xl` (64px). Named tokens for consistency.

### Component Patterns

**Gradient cards** (WalletCard, PromoBanner): Use a wrapper/inner pattern to avoid clipping:

- `LinearGradient` handles `borderRadius` only
- Inner `View` handles `padding` and content layout
- Never use `overflow: 'hidden'` on the gradient wrapper

**Quick action icons**: Flat tinted backgrounds (`primary[50]`) with `primary[600]` icons. No gradients, no shadows. "Lainnya" uses neutral tint for visual separation.

**Color usage**: Component-specific colors reference `colors.ts` palette directly. Semantic tokens (`semantic.ts`) are reserved for theme-aware values that change between light/dark mode.

### Design System Showcase

In dev mode, tap the "DS" button (top-right) to open the Design System screen. It showcases all tokens, UI primitives, and home screen composites.

## Getting Started

### Prerequisites

- Node.js ≥ 22.11.0
- React Native CLI environment ([setup guide](https://reactnative.dev/docs/set-up-your-environment))
- Xcode (iOS) / Android Studio (Android)
- CocoaPods (iOS)

### Install

```bash
npm install

# iOS only
bundle install
bundle exec pod install
```

### Run

```bash
# Start Metro bundler
npm start

# iOS
npm run ios

# Android
npm run android
```

### Quality Checks

```bash
npm run typecheck    # TypeScript (must pass)
npm run lint         # ESLint
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier
npm test             # Jest
```

## Auth Flow

1. **Not hydrated** → Splash screen (loading tokens from secure storage)
2. **Not authenticated** → AuthNavigator (Login, Register)
3. **Authenticated, not verified** → VerifyOtp or VerifyEmail screen
4. **Authenticated + verified** → MainTabNavigator (Dashboard)

Tokens are stored in encrypted storage and silently refreshed via the Axios interceptor in `lib/api.ts`.

## Navigation

| Tab        | Screen              | Description                   |
| ---------- | ------------------- | ----------------------------- |
| Beranda    | HomeScreen          | Wallet, quick actions, promos |
| Aktivitas  | ActivityScreen      | Transaction/activity history  |
| Scan       | ScanScreen          | QR code scanner               |
| Notifikasi | NotificationsScreen | Push notification inbox       |
| Profil     | ProfileScreen       | User profile & settings       |

## Backend

This app connects to the [Lingkar ID Backend](../lingkar-id-backend) API. See that project's README for API documentation and setup.
