/**
 * Global error store — manages error bottom sheet visibility.
 *
 * Used by the API interceptor to automatically show non-form errors.
 * Screens no longer need Alert.alert() for API errors.
 *
 * Usage:
 *   // Show error (called automatically by interceptor)
 *   useErrorStore.getState().showError('Kredensial salah');
 *
 *   // Dismiss (called by bottom sheet)
 *   useErrorStore.getState().dismiss();
 */

import { create } from 'zustand';

interface ErrorState {
  /** Whether the error bottom sheet is visible */
  visible: boolean;
  /** Error title */
  title: string;
  /** Error message body */
  message: string;
  /** Show the error bottom sheet */
  showError: (message: string, title?: string) => void;
  /** Dismiss the error bottom sheet */
  dismiss: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  visible: false,
  title: '',
  message: '',

  showError: (message: string, title = 'Terjadi Kesalahan') => {
    set({ visible: true, title, message });
  },

  dismiss: () => {
    set({ visible: false });
  },
}));
