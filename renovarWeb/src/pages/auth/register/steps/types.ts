import type { RegisterFormData } from '../schema'

interface StepOneProps {
  onNext: () => void
}

interface StepTwoProps {
  onBack: () => void
}

interface StepTwoData {
  hoursPerDay: number
  moneyPerDay: number
}

type ErrorFieldMessageMap = Partial<Record<keyof RegisterFormData, string>>

export type { StepTwoData, StepTwoProps, StepOneProps, ErrorFieldMessageMap }
