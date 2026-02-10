import type { VariantProps } from 'class-variance-authority'
import type { spinnerVariants } from './styles'

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string
}

export type { SpinnerProps }
