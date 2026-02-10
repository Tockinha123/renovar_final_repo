import { Sun } from 'lucide-react'
import type { JSX } from 'react'
import { HighlightCard } from '@/components/highlight-card'
import { RefreshError } from '@/components/refresh-error'
import { useGetAssessments } from '@/hooks/useGetAssessments'
import { useSendAssessments } from '@/hooks/useSendAssessments'
import type { IRequestAssementDTO } from '@/services/assessments/types'
import { resolveEvaluationState } from '../../utils/resolve-evaluation'
import type { EvaluationViewState } from '../../utils/resolve-evaluation/types'
import { Quiz } from '../quiz'
import { QuizFeedback } from '../quiz-feedback'
import { QuizLoading } from '../quiz-loading'

export function DailyEvaluation() {
  const {
    assementsData: dailyEvaluationData,
    isErrorAssessments,
    isLoading,
    refetchGetAssessments,
  } = useGetAssessments({ type: 'DAILY' })

  const { sendAssessments, isSendingAssessments } = useSendAssessments({
    type: 'DAILY',
  })

  async function handleSubmitAnswers(answers: IRequestAssementDTO['answers']) {
    await sendAssessments({ answers })
  }

  const highlightColor = '#009580'

  const evaluationState = resolveEvaluationState({
    evaluationData: dailyEvaluationData,
    isErrorAssessments,
    isLoading,
  })

  const dailyEvaluationViewMap: Record<EvaluationViewState, JSX.Element> = {
    error: (
      <RefreshError
        message="Error ao carregar os dados da avaliação"
        className="bg-transparent max-w-full"
        onRetry={refetchGetAssessments}
      />
    ),
    loading: <QuizLoading questionsCount={1} optionsPerQuestion={4} />,
    finished: (
      <QuizFeedback
        highlightColor={highlightColor}
        feedback={
          dailyEvaluationData?.feedback
            ? {
                result: dailyEvaluationData.feedback.resultScore,
                riskLevel: dailyEvaluationData.feedback.riskLevelScore,
                variation: dailyEvaluationData.feedback.variationScore,
              }
            : null
        }
      />
    ),
    quiz: (
      <Quiz
        questions={dailyEvaluationData?.questions ?? []}
        highlightColor={highlightColor}
        isSubmitting={isSendingAssessments}
        handleSubmitAnswers={handleSubmitAnswers}
      />
    ),
  }

  return (
    <HighlightCard
      highlightColor={highlightColor}
      icon={<Sun className="w-6 h-6" style={{ color: highlightColor }} />}
      title="Avaliação Diária"
      mode="vertical"
      content={
        <div className="flex flex-col items-end justify-between h-full gap-4">
          <p className="text-base font-medium text-gray-500">
            Reserve alguns minutos para refletir sobre seu bem-estar hoje: esse
            é o primeiro e mais importante passo para superar o vício em
            apostas.
          </p>
          {dailyEvaluationViewMap[evaluationState]}
        </div>
      }
    />
  )
}
