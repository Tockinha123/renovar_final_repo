import { Spinner } from '@/components/loading'
import { cn } from '@/lib/utils'

interface PageLoaderProps {
  /** Texto exibido durante o carregamento */
  message?: string
  className?: string
}

export function PageLoader({
  message = 'Carregando dados...',
  className,
}: PageLoaderProps) {
  return (
    <output
      aria-live="polite"
      aria-label={message}
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 border-0 bg-bg-neutral/95 p-0 backdrop-blur-sm',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" className="text-renovar-primary" />
        <p className="text-sm font-medium text-renovar-gray-primary animate-pulse">
          {message}
        </p>
      </div>
    </output>
  )
}
