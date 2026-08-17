import type { DashboardData } from '../types'
import { getDashboardData as getMockDashboardData } from './mockThreeCxService'

/**
 * Single integration boundary for the dashboard.
 *
 * Replace this implementation later with a call to an authenticated backend
 * or Supabase Edge Function that communicates with 3CX.
 *
 * Never expose 3CX client secrets in this frontend.
 */
export async function getDashboardData(): Promise<DashboardData> {
  return getMockDashboardData()
}
