import { useCallback, useEffect, useState } from 'react'
import type { DashboardData } from '../types'
import { getDashboardData } from '../services/threeCxService'

const REFRESH_MS = 10_000

export function useThreeCxDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async (silent = false) => {
    try {
      silent ? setRefreshing(true) : setLoading(true)
      setError(null)
      setData(await getDashboardData())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load 3CX dashboard data.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    refresh()
    const interval = window.setInterval(() => refresh(true), REFRESH_MS)
    return () => window.clearInterval(interval)
  }, [refresh])

  return { data, loading, refreshing, error, refresh }
}
