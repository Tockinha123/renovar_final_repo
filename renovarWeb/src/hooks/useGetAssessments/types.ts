import type {
  IFeedbackDailyProps,
  IFeedbackMonthlyProps,
  IGetAssessmentResponseDTO,
} from '@/services/assessments/types'

type AssessmentType = 'DAILY' | 'MONTHLY'

type AssessmentDataMap = {
  DAILY: Omit<IGetAssessmentResponseDTO, 'feedback'> & {
    feedback: IFeedbackDailyProps
  }
  MONTHLY: Omit<IGetAssessmentResponseDTO, 'feedback'> & {
    feedback: IFeedbackMonthlyProps
  }
}

type UseGetAssessmentsParams<T extends AssessmentType> = {
  type: T
}

export type { AssessmentDataMap, AssessmentType, UseGetAssessmentsParams }
