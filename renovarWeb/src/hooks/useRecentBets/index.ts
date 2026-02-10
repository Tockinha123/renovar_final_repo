import { useQuery } from '@tanstack/react-query'
import { betService } from '@/services/bet'

export function useRecentBets() {
  const {
    data: recentBets,
    isLoading,
    isPending,
    isRefetching,
    isError: isErrorRecentBets,
    refetch: refetchRecentBets,
  } = useQuery({
    queryKey: ['recentBets'],
    queryFn: () => betService.recentBets(),
    staleTime: Number.POSITIVE_INFINITY,
  })

  return {
    recentBets,
    isLoadingRecentBets: isLoading || isPending || isRefetching,
    isErrorRecentBets,
    refetchRecentBets,
  }
}
