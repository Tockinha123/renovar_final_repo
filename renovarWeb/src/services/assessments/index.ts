import { ApiRoutes } from '@/shared/route'
import { httpClient } from '../http/http-client'
import type {
  AssessmentRouteType,
  IGetAssessmentResponseDTO,
  IRequestAssementDTO,
} from './types'

export const assessmentsService = {
  getAssessments(type: AssessmentRouteType) {
    const route = ApiRoutes.ASSESSMENTS[type]

    return httpClient<IGetAssessmentResponseDTO>(route, {
      method: 'GET',
    })
  },

  sendQuestions({
    data,
    type,
  }: {
    data: IRequestAssementDTO
    type: AssessmentRouteType
  }) {
    const route = ApiRoutes.ASSESSMENTS[type]
    return httpClient<IGetAssessmentResponseDTO>(route, {
      method: 'POST',
      body: data,
    })
  },
}
