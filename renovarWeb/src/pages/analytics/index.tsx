import { PageContainer } from '@/components/page-container'
import { Calendar } from './components/calendar'
import { DownloadReportCard } from './components/download-report-card'
import { MonthlyTrendChart } from './components/monthly-trend-chart'
import { ScoreProgress } from './components/score-progress'

export function AnalyticsPage() {
  return (
    <PageContainer title="Análises">
      <div className="grid grid-cols-[max-content_1fr] gap-4">
        <div className="flex flex-col gap-4">
          <Calendar />
          <DownloadReportCard />
        </div>

        <div className="bg-white rounded-lg border border-line-gray p-4">
          <span className="font-semibold capitalize text-gray-800 block text-base">
            Tendência Mensal
          </span>

          <div className="mt-4 flex flex-col gap-4">
            <MonthlyTrendChart />
            <ScoreProgress />
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
