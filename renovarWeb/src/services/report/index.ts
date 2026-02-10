import { httpClient } from '../http/http-client'

export const reportService = {
  getReport() {
    return httpClient<{ url: string }>('reports/download', {
      method: 'GET',
    })
  },
}
