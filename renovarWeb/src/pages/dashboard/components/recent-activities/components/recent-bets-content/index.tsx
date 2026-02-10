import { Spinner } from '@/components/loading'
import { RefreshError } from '@/components/refresh-error'
import { useRecentBets } from '@/hooks/useRecentBets'
import { BetCard } from './components/bet-card'

export function RecentBetsContent() {
  const {
    recentBets,
    isLoadingRecentBets,
    isErrorRecentBets,
    refetchRecentBets,
  } = useRecentBets()

  if (isLoadingRecentBets) {
    return <Spinner />
  }

  if (isErrorRecentBets) {
    return <RefreshError onRetry={refetchRecentBets} />
  }

  if (recentBets?.content.length === 0) {
    return (
      <div className="text-center text-sm text-gray-500">
        Nenhuma aposta recente
      </div>
    )
  }

  return (
    <>
      {recentBets?.content.map((bet) => (
        <BetCard
          key={bet.id}
          titulo={bet.category}
          data={bet.date}
          valor={bet.amount}
          vitoriosa={bet.won}
        />
      ))}
    </>
  )
}
