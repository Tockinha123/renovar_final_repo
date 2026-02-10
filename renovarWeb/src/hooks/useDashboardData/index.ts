import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/services/dashboard'

export function useDashboardData() {
  const {
    data: metricsData,
    isLoading,
    isPending,
    isRefetching,
    isError: isErrorMetricsData,
    refetch: refetchMetricsData,
  } = useQuery({
    queryKey: ['metricsData'],
    queryFn: () => dashboardService.metricsData(),
    staleTime: Number.POSITIVE_INFINITY,
  })

  return {
    metricsData,
    isLoadingMetricsData: isLoading || isPending || isRefetching,
    isErrorMetricsData,
    refetchMetricsData,
  }
}
