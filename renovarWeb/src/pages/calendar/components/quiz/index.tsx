import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ProgressStep } from './components/progress-step'
import { QuestionAnswer } from './components/question-answer'

type QuestionOption = {
  id: string
  label: string
  scoreValue: number
}

export type Question = {
  id: string
  title: string
  options: QuestionOption[]
}

export interface QuizProps {
  questions: Question[]
  highlightColor: string
  isSubmitting: boolean
  handleSubmitAnswers: (
    answers: { questionId: string; optionId: string }[],
  ) => void
}

export function Quiz({
  questions,
  highlightColor,
  isSubmitting,
  handleSubmitAnswers,
}: QuizProps) {
  const [answers, setAnswers] = useState<
    { questionId: string; optionId: string }[]
  >([])
  const [currentStep, setCurrentStep] = useState(1)

  function selectAnswer(questionId: string, optionId: string) {
    setAnswers((prev) => {
      const hasSomeAnswerSelected = prev.some(
        (answer) => answer.questionId === questionId,
      )

      if (hasSomeAnswerSelected) {
        return prev
          .filter((answer) => answer.questionId !== questionId)
          .concat({ questionId, optionId })
      }

      return [...prev, { questionId, optionId }]
    })
  }

  function nextStep() {
    setCurrentStep((prev) => prev + 1)
  }

  function prevStep() {
    setCurrentStep((prev) => prev - 1)
  }

  function submitAnswers() {
    handleSubmitAnswers(answers)
  }

  if (questions.length === 0) {
    return null
  }

  const currentQuestion = questions[currentStep - 1]
  const enableToNextStep = answers.some(
    (answer) => answer.questionId === currentQuestion.id,
  )
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === questions.length

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 mb-8 border border-gray-300 p-6 rounded-2xl">
        <span className="font-semibold capitalize text-gray-800 block text-base">
          {currentQuestion.title}
        </span>

        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.options.map((option) => {
            const isSelected = answers.some(
              (answer) =>
                answer.questionId === currentQuestion.id &&
                answer.optionId === option.id,
            )
            return (
              <QuestionAnswer
                key={option.id}
                value={option.id}
                title={option.label}
                selected={isSelected}
                onChange={(value) => selectAnswer(currentQuestion.id, value)}
              />
            )
          })}
        </div>
      </div>

      <div className="flex items-center gap-4 justify-between">
        <ProgressStep currentStep={currentStep} totalSteps={questions.length} />
        {isFirstStep ? null : (
          <Button
            type="button"
            onClick={prevStep}
            variant="ghost"
            disabled={isSubmitting || isFirstStep}
            className="flex items-center min-w-20"
          >
            Voltar
          </Button>
        )}
        {isLastStep ? (
          <Button
            type="button"
            onClick={submitAnswers}
            variant="default"
            style={{ backgroundColor: highlightColor }}
            disabled={!enableToNextStep || isSubmitting}
            className="flex items-center min-w-20"
          >
            {isSubmitting ? (
              <Loader2 className="text-white animate-spin" />
            ) : (
              'Enviar'
            )}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={nextStep}
            variant="default"
            style={{ backgroundColor: highlightColor }}
            disabled={!enableToNextStep}
          >
            Próximo
          </Button>
        )}
      </div>
    </div>
  )
}
