import { cva } from 'class-variance-authority'

export const spinnerVariants = cva(
  'animate-spin rounded-full border-2 border-current/30 border-t-current',
  {
    variants: {
      size: {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)
