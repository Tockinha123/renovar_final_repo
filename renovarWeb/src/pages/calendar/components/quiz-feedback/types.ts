import type { RISK_LEVEL } from '@/services/dashboard/types'

interface FeedbackProps {
  riskLevel: keyof typeof RISK_LEVEL
  result: string
  variation: number
}

interface QuizFeedbackProps {
  feedback: FeedbackProps | null
  highlightColor: string
}

export type { QuizFeedbackProps }
