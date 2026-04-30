/**
 * Dashboard service — API calls for the client dashboard.
 *
 * Usage:
 *   import { dashboardService } from '@/services/dashboard';
 *   const res = await dashboardService.getDashboard();
 */

import { api } from '@/lib/api';

import type { IDashboardResponse } from './dashboard.types';

export const dashboardService = {
  /** Get dashboard data (banners, etc.) */
  getDashboard: () => api.get<IDashboardResponse>('/client/dashboard'),
} as const;
