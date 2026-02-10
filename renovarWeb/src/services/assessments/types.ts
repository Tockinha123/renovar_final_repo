import type { RISK_LEVEL } from '../dashboard/types'

type AssessmentRouteType = 'DAILY' | 'MONTHLY'

interface IFeedbackDailyProps {
  riskLevelScore: keyof typeof RISK_LEVEL
  resultScore: string
  variationScore: number
}

interface IFeedbackMonthlyProps {
  riskLevelPgsi: keyof typeof RISK_LEVEL
  variationPgsi: number
  resultPgsi: string
}

type IFeedbackProps = IFeedbackDailyProps | IFeedbackMonthlyProps

interface IOptionsProps {
  id: string
  label: string
  scoreValue: number
}

interface IQuestionsProps {
  id: string
  title: string
  options: IOptionsProps[]
}

interface IAnswerProps {
  optionId: string
  questionId: string
}

interface IGetAssessmentResponseDTO {
  questions: IQuestionsProps[]
  feedback: IFeedbackProps
}

interface IRequestAssementDTO {
  answers: IAnswerProps[]
}

export type {
  AssessmentRouteType,
  IFeedbackDailyProps,
  IFeedbackMonthlyProps,
  IFeedbackProps,
  IGetAssessmentResponseDTO,
  IRequestAssementDTO,
}
