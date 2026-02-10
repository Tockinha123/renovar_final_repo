import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { reportService } from '@/services/report'

export function useGetReport() {
  const { isPending, mutateAsync: getReport } = useMutation({
    mutationFn: () => reportService.getReport(),
    onError: (error) => {
      if (error.message) {
        toast.error(error.message)
        return
      }

      toast.error('Algo de errado ocorreu! Tente novamente.')
    },
  })

  return {
    isLoading: isPending,
    getReport,
  }
}
