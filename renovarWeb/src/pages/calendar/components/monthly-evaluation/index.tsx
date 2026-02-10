import { Calendar } from 'lucide-react'
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

export function MonthlyEvaluation() {
  const {
    assementsData: monthlyEvaluationData,
    isErrorAssessments,
    isLoading,
    refetchGetAssessments,
  } = useGetAssessments({ type: 'MONTHLY' })

  const { isSendingAssessments, sendAssessments } = useSendAssessments({
    type: 'MONTHLY',
  })

  const highlightColor = '#007F95'

  const evaluationState = resolveEvaluationState({
    evaluationData: monthlyEvaluationData,
    isErrorAssessments,
    isLoading,
  })

  async function handleSubmitAnswers(answers: IRequestAssementDTO['answers']) {
    await sendAssessments({ answers })
  }

  const monthlyEvaluationViewMap: Record<EvaluationViewState, JSX.Element> = {
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
          monthlyEvaluationData?.feedback
            ? {
                result: monthlyEvaluationData.feedback.resultPgsi,
                riskLevel: monthlyEvaluationData.feedback.riskLevelPgsi,
                variation: monthlyEvaluationData.feedback.variationPgsi,
              }
            : null
        }
      />
    ),
    quiz: (
      <Quiz
        questions={monthlyEvaluationData?.questions ?? []}
        highlightColor={highlightColor}
        isSubmitting={isSendingAssessments}
        handleSubmitAnswers={handleSubmitAnswers}
      />
    ),
  }

  return (
    <HighlightCard
      highlightColor={highlightColor}
      icon={<Calendar className="w-6 h-6" style={{ color: highlightColor }} />}
      title="Avaliação Mensal"
      mode="vertical"
      content={
        <div className="flex flex-col items-end justify-between h-full gap-4">
          <p className="text-base font-medium text-gray-500">
            Esta avaliação usa o PGSI (Problematic Gambling Severity Index) para
            medir a gravidade do seu comportamento de apostas e sugerir ações
            para o seu bem-estar.
          </p>
          {monthlyEvaluationViewMap[evaluationState]}
        </div>
      }
    />
  )
}
