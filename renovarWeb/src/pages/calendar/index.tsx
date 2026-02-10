import { PageContainer } from '@/components/page-container'
import { DailyEvaluation } from './components/daily-evaluation'
import { MonthlyEvaluation } from './components/monthly-evaluation'

export function CalendarPage() {
  return (
    <PageContainer title="Avaliações">
      <div className="grid grid-cols-2 gap-3 w-full h-full items-start">
        <DailyEvaluation />
        <MonthlyEvaluation />
      </div>
    </PageContainer>
  )
}
