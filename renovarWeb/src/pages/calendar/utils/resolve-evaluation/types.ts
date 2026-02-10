import type { IGetAssessmentResponseDTO } from '@/services/assessments/types'

type EvaluationViewState = 'loading' | 'finished' | 'quiz' | 'error'

interface ResolveEvaluationProps {
  isErrorAssessments: boolean
  isLoading: boolean
  evaluationData: IGetAssessmentResponseDTO | undefined
}

export type { EvaluationViewState, ResolveEvaluationProps }
