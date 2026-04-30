/**
 * Dashboard types — matches backend GET /api/v1/client/dashboard response.
 */

import type { IApiResponse } from '@/services/auth';

/** A single banner item from the dashboard API */
export interface IDashboardBanner {
  id: string;
  title: string;
  type: 'image' | 'text_placement';
  image_url: string | null;
  target_url: string | null;
  cta_config: {
    text: string;
    bg_color: string;
    text_color: string;
    border_radius: number;
    font_size: number;
    padding_x: number;
    padding_y: number;
    position_x: number;
    position_y: number;
  } | null;
  display_order: number;
}

/** Dashboard API response data */
export interface IDashboardData {
  banners: IDashboardBanner[];
}

/** Full typed API response */
export type IDashboardResponse = IApiResponse<IDashboardData>;
