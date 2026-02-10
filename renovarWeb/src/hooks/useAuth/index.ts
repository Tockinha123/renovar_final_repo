import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useAuthContext } from '@/context/auth'
import { authService } from '@/services/auth'
import type { CreateUserDTO, LoginDTO } from '@/services/auth/types'

export function useAuthQuery() {
  const { signIn } = useAuthContext()

  const { isPending: isRegistering, mutateAsync: registerUser } = useMutation({
    mutationFn: (data: CreateUserDTO) => authService.registerUser({ data }),
    onSuccess: (data) => {
      signIn(data)
      toast.success(
        'Conta criada com sucesso! 🎉 Redirecionando para o dashboard...',
      )
    },
    onError: () => {
      toast.error('Erro ao criar conta. Por favor, tente novamente.')
    },
  })

  const { isPending: isLogging, mutateAsync: loginUser } = useMutation({
    mutationFn: (data: LoginDTO) => authService.login({ data }),
    onSuccess: (data) => {
      signIn(data)
      toast.success(
        'Login realizado com sucesso! 🎉 Redirecionando para o dashboard...',
      )
    },
    onError: () => {
      toast.error('Erro ao realizar login. Por favor, tente novamente.')
    },
  })

  return {
    isRegistering,
    registerUser,
    isLogging,
    loginUser,
  }
}
