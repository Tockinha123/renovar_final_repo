import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type RefreshErrorProps = {
  onRetry: () => void
  message?: string
  className?: string
}

export function RefreshError({
  onRetry,
  message = 'Erro ao carregar os dados',
  className,
}: RefreshErrorProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-xl border border-destructive/20 bg-destructive/5 py-10 px-6 w-full max-w-max m-auto my-4',
        className,
      )}
    >
      <p className="text-center text-sm font-medium text-destructive">
        {message}
      </p>
      <Button variant="outline" size="sm" onClick={onRetry}>
        <span className="flex items-center gap-2">
          <RefreshCw className="size-4" />
          Tentar novamente
        </span>
      </Button>
    </div>
  )
}
