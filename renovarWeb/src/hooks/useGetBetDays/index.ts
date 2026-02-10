import { useQuery } from '@tanstack/react-query'
import { betService } from '@/services/bet'

type UseGetBetDaysParams = {
  year: number
  month: number
}

export function useGetBetDays({ year, month }: UseGetBetDaysParams) {
  const {
    data: betDays,
    isPending,
    isLoading,
    isRefetching,
    isError: isErrorBetDays,
    refetch: refetchGetBetDays,
  } = useQuery({
    queryKey: ['betDays', year, month],
    queryFn: () => betService.getBetDays({ year, month }),
    staleTime: Number.POSITIVE_INFINITY,
  })

  return {
    betDays,
    isLoading: isPending || isLoading || isRefetching,
    isErrorBetDays,
    refetchGetBetDays,
  }
}
