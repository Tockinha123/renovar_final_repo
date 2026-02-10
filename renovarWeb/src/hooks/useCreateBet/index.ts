import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { queryClient } from '@/lib/react-query'
import { betService, type CreateBetDTO } from '@/services/bet'

export function useCreateBet() {
  const { mutateAsync: createBet, isPending } = useMutation({
    mutationFn: (data: CreateBetDTO) => betService.createBet(data),
    onSuccess: async () => {
      toast.success('Aposta criada com sucesso!')
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['recentBets'] }),
        queryClient.invalidateQueries({ queryKey: ['metricsData'] }),
        queryClient.invalidateQueries({ queryKey: ['betDays'] }),
      ])
    },
    onError: () => {
      toast.error('Erro ao criar aposta. Por favor, tente novamente.')
    },
  })

  return {
    createBet,
    isCreatingBet: isPending,
  }
}
