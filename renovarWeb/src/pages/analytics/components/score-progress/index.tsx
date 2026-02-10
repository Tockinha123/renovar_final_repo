import dayjs from 'dayjs'
import { Frown, Loader2, Smile } from 'lucide-react'
import { RefreshError } from '@/components/refresh-error'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useGetBetDays } from '@/hooks/useGetBetDays'
import { cn } from '@/lib/utils'

export function ScoreProgress() {
  const year = dayjs().year()
  const month = dayjs().month() + 1
  const { betDays, isLoading, isErrorBetDays, refetchGetBetDays } =
    useGetBetDays({ year, month })

  const current = betDays?.filter((day) => day.status === 'LIMPO').length ?? 0
  const total = dayjs().date()
  const progressPercent = total > 0 ? Math.min((current / total) * 100, 100) : 0

  const hasGoodPerformance = progressPercent >= 50
  const message = hasGoodPerformance
    ? 'Você está indo muito bem! Continue assim.'
    : 'Temos alguns pontos a melhorar, mas não desista!'

  const currentIcon = hasGoodPerformance ? (
    <Smile className="size-5 text-renovar-primary" strokeWidth={2} />
  ) : (
    <Frown className="size-5 text-[#EF4444]" strokeWidth={2} />
  )

  const currentBorderColor = hasGoodPerformance ? '#A5D6A7' : '#FCA5A5'
  const currentBgColor = hasGoodPerformance ? '#CCEAE6' : '#FEE2E2'
  const currentProgressBgColor = hasGoodPerformance ? '#009580' : '#EF4444'

  if (isLoading) {
    return (
      <Card className="flex items-center justify-center min-h-48">
        <Loader2 className="text-gray-500 animate-spin" />
      </Card>
    )
  }

  if (isErrorBetDays) {
    return (
      <Card className="flex items-center justify-center min-h-48">
        <RefreshError onRetry={refetchGetBetDays} />
      </Card>
    )
  }

  return (
    <Card className={cn('gap-4 py-6 min-h-48')}>
      <CardHeader className="gap-0 pb-0 flex items-center justify-between">
        <CardTitle className="text-base font-semibold text-gray-900">
          Progresso
        </CardTitle>
        <CardAction>{currentIcon}</CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 pt-0">
        <div className="flex items-center justify-between">
          <span className="text-base text-renovar-gray-primary">
            Dias sem aposta este mês:
          </span>
          <span className="text-xs text-renovar-gray-primary">
            {current}/{total}
          </span>
        </div>

        <div
          className="h-11 w-full overflow-hidden p-1 rounded-sm border"
          style={{
            borderColor: currentBorderColor,
            backgroundColor: currentBgColor,
          }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`Dias sem aposta este mês: ${current} de ${total}`}
        >
          <div
            className="h-full rounded-sm transition-[width] duration-300 ease-out"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: currentProgressBgColor,
            }}
          />
        </div>

        <p className="text-xs text-renovar-gray-primary">{message}</p>
      </CardContent>
    </Card>
  )
}
