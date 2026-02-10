import { useQuery } from '@tanstack/react-query'
import { useAuthContext } from '@/context/auth'
import { assessmentsService } from '@/services/assessments'
import type {
  AssessmentDataMap,
  AssessmentType,
  UseGetAssessmentsParams,
} from './types'

export function useGetAssessments<T extends AssessmentType>({
  type,
}: UseGetAssessmentsParams<T>) {
  const { user } = useAuthContext()
  const {
    data: assementsData,
    isPending,
    isLoading,
    isRefetching,
    isError: isErrorAssessments,
    refetch: refetchGetAssessments,
  } = useQuery({
    queryKey: ['assessments', type, user?.email],
    queryFn: async () => {
      const data = await assessmentsService.getAssessments(type)
      return data as AssessmentDataMap[T]
    },
    staleTime: Number.POSITIVE_INFINITY,
  })

  return {
    assementsData,
    isLoading: isPending || isLoading || isRefetching,
    isErrorAssessments,
    refetchGetAssessments,
  }
}
