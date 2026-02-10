import { ApiRoutes } from '@/shared/route'
import { httpClient } from '../http/http-client'
import type { InfoUserResponseDTO } from './types'

export const dashboardService = {
  metricsData() {
    return httpClient<InfoUserResponseDTO>(ApiRoutes.USER.DASHBOARD, {
      method: 'GET',
    })
  },
}
