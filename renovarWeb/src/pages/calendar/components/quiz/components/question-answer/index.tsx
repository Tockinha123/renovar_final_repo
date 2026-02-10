import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface AnswerOptionProps<T = string> {
  title: string
  value: T
  selected?: boolean
  onChange?: (value: T) => void
  className?: string
}

export function QuestionAnswer({
  title,
  value,
  selected = false,
  onChange,
  className,
}: AnswerOptionProps) {
  const handleClick = () => {
    onChange?.(value)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'w-full flex items-center justify-center gap-3 rounded-lg border border-line-gray bg-white px-6 py-4 text-left transition-colors',
        'hover:border-renovar-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-renovar-primary focus-visible:ring-offset-2',
        className,
      )}
    >
      <span
        className={cn(
          'flex size-7 shrink-0 items-center justify-center rounded-[4px] border transition-colors',
          selected
            ? 'border-renovar-primary bg-renovar-primary text-white'
            : 'border-line-gray bg-white',
        )}
      >
        {selected && <Check className="size-4 stroke-[3.5]" />}
      </span>
      <span
        className={cn(
          'flex-1 font-normal transition-colors text-base',
          selected
            ? 'text-renovar-primary font-semibold'
            : 'text-renovar-gray-primary',
        )}
      >
        {title}
      </span>
    </button>
  )
}
