interface ProgressProps {
  step: number
  totalSteps: number
}

export function Progress({ step, totalSteps }: ProgressProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      {Array.from({ length: totalSteps }, (_, index) => {
        const currentStep = index + 1
        const active = currentStep <= step

        return (
          <div
            key={currentStep}
            className={`
              w-16 h-2 rounded-full
              transition-all duration-500 ease-out
              ${
                active
                  ? 'bg-renovar-secondary opacity-100'
                  : 'bg-gray-300 opacity-40'
              }
            `}
          />
        )
      })}
    </div>
  )
}
