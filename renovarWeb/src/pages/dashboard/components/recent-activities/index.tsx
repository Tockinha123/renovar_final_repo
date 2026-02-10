import { Clock } from 'lucide-react'
import { HighlightCard } from '../../../../components/highlight-card'
import { RecentBetsContent } from './components/recent-bets-content'

export function RecentActivities() {
  return (
    <HighlightCard
      highlightColor="#E67341"
      icon={<Clock className="w-6 h-6 text-[#E67341]" />}
      title="Atividade Recente"
      content={
        <div className="flex flex-col items-center justify-center gap-4">
          <RecentBetsContent />
        </div>
      }
    />
  )
}
