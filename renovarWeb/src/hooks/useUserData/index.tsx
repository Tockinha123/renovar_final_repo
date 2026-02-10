/** biome-ignore-all lint/correctness/useExhaustiveDependencies: xd */
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useAuthContext } from '@/context/auth'
import { meService } from '@/services/me'
import { COOKIES_KEYS } from '@/shared/cookies'
import { cookies } from '@/utils/cookies'

export function useUserData() {
  const navigate = useNavigate()
  const { setUser, user } = useAuthContext()
  const { isLoading, isError } = useQuery({
    queryKey: ['userData', user?.name, user?.email],
    queryFn: async () => {
      const response = await meService.me()
      setUser(response)
      return response
    },
    enabled: !user && Boolean(cookies.get(COOKIES_KEYS.authToken)),
  })

  useEffect(() => {
    if (isError) {
      cookies.remove(COOKIES_KEYS.authToken)
      navigate({ to: '/login' })
    }
  }, [isError])

  return {
    isLoadingUserData: isLoading,
  }
}
