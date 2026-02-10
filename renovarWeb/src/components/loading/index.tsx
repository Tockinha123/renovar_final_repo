import { cn } from '@/lib/utils'
import { spinnerVariants } from './styles'
import type { SpinnerProps } from './types'

export function Spinner({ size, className }: SpinnerProps) {
  return (
    <output
      aria-label="Carregando"
      className={cn(spinnerVariants({ size }), className)}
    />
  )
}
