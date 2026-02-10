import { cn } from '@/lib/utils'

export interface ProgressStepProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function ProgressStep({
  currentStep,
  totalSteps,
  className,
}: ProgressStepProps) {
  const progressPercentage =
    totalSteps > 0 ? Math.min((currentStep / totalSteps) * 100, 100) : 0

  return (
    <div
      className={cn('flex items-center gap-3 w-full', className)}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Passo ${currentStep} de ${totalSteps}`}
    >
      <span className="text-sm font-medium text-renovar-gray-primary shrink-0 tabular-nums">
        {currentStep} de {totalSteps}
      </span>
      <div className="flex-1 min-w-0 h-2 rounded-full bg-renovar-secondary-soft overflow-hidden">
        <div
          className="h-full rounded-full bg-renovar-primary transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  )
}
