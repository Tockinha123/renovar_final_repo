import type { EvaluationViewState, ResolveEvaluationProps } from './types'

function resolveEvaluationState({
  evaluationData,
  isErrorAssessments,
  isLoading,
}: ResolveEvaluationProps): EvaluationViewState {
  const hasError = isErrorAssessments || !evaluationData

  if (isLoading) return 'loading'
  if (hasError) return 'error'
  if (evaluationData.feedback !== null) return 'finished'

  return 'quiz'
}

export { resolveEvaluationState }
