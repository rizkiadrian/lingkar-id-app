/**
 * Global notification store — manages bottom sheet for success and error messages.
 *
 * Used by:
 * - API interceptor: auto-show non-form errors
 * - Screens: manually show success messages
 *
 * Usage:
 *   useNotificationSheet.getState().show('success', 'Berhasil!');
 *   useNotificationSheet.getState().show('error', 'Terjadi kesalahan');
 */

import { create } from 'zustand';

export type SheetType = 'success' | 'error';

interface NotificationSheetState {
  visible: boolean;
  type: SheetType;
  title: string;
  message: string;
  show: (type: SheetType, message: string, title?: string) => void;
  dismiss: () => void;
}

const DEFAULT_TITLES: Record<SheetType, string> = {
  success: 'Berhasil',
  error: 'Terjadi Kesalahan',
};

export const useNotificationSheet = create<NotificationSheetState>((set) => ({
  visible: false,
  type: 'error',
  title: '',
  message: '',

  show: (type: SheetType, message: string, title?: string) => {
    set({
      visible: true,
      type,
      title: title ?? DEFAULT_TITLES[type],
      message,
    });
  },

  dismiss: () => {
    set({ visible: false });
  },
}));

/**
 * @deprecated Use useNotificationSheet instead. Kept for backward compatibility.
 */
export const useErrorStore = {
  getState: () => {
    const state = useNotificationSheet.getState();
    return {
      ...state,
      showError: (message: string, title?: string) => state.show('error', message, title),
    };
  },
};
