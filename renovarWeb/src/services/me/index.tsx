import { ApiRoutes } from '@/shared/route'
import type { UserData } from '../auth/types'
import { httpClient } from '../http/http-client'

export const meService = {
  me() {
    return httpClient<UserData>(ApiRoutes.USER.ME, {
      method: 'GET',
    })
  },
}
