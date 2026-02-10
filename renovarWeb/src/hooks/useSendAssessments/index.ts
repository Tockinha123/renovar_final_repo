import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useAuthContext } from '@/context/auth'
import { queryClient } from '@/lib/react-query'
import { assessmentsService } from '@/services/assessments'
import type { IRequestAssementDTO } from '@/services/assessments/types'

type UseSendAssessmentsParams = {
  type: 'DAILY' | 'MONTHLY'
}

export function useSendAssessments({ type }: UseSendAssessmentsParams) {
  const { user } = useAuthContext()
  const { mutateAsync: sendAssessments, isPending } = useMutation({
    mutationFn: (data: IRequestAssementDTO) =>
      assessmentsService.sendQuestions({ data, type }),
    onSuccess: async () => {
      toast.success('Questões enviadas com sucesso!')
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['assessments', type, user?.email],
        }),
      ])
    },
    onError: () => {
      toast.error('Erro ao enviar questões. Por favor, tente novamente.')
    },
  })

  return {
    sendAssessments,
    isSendingAssessments: isPending,
  }
}
