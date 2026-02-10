import { Link } from '@tanstack/react-router'
import { Calendar, Clock, Shield, Sun, Wallet } from 'lucide-react'
import { HighlightCard } from '@/components/highlight-card'
import { PageContainer } from '@/components/page-container'
import { PageLoader } from '@/components/page-loader'
import { RefreshError } from '@/components/refresh-error'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/auth'
import { useDashboardData } from '@/hooks/useDashboardData'
import { DashboardCard } from './components/dashboard-card'
import { RecentActivities } from './components/recent-activities'
import { RegisterNewBetCard } from './components/register-new-bet'

export function DashboardPage() {
  const { user } = useAuthContext()
  const {
    metricsData,
    isLoadingMetricsData,
    isErrorMetricsData,
    refetchMetricsData,
  } = useDashboardData()

  if (isLoadingMetricsData) {
    return <PageLoader />
  }

  if (isErrorMetricsData) {
    return <RefreshError onRetry={refetchMetricsData} />
  }

  const riskLevelName = metricsData?.riskLevel.replace('_', ' ')

  return (
    <PageContainer
      title={
        <h3 className="text-3xl text-renovar-other-gray font-medium">
          <b>Olá, {user?.name}!</b> Como você está hoje?
        </h3>
      }
    >
      <div className="grid grid-cols-4 gap-3 w-full">
        <DashboardCard
          icon={<Shield className="w-6 h-6 text-renovar-primary" />}
          title="Risco Atual"
          highlight={`Score: ${metricsData?.currentScore}`}
          legend={riskLevelName || ''}
          riskLevel={metricsData?.riskLevel}
        />
        <DashboardCard
          icon={<Clock className="w-6 h-6 text-yellow-500" />}
          title="Dias sem apostar"
          highlight={`${metricsData?.diasLimpos} dias`}
          legend="Dias consecutivos"
        />
        <DashboardCard
          icon={<Calendar className="w-6 h-6 text-purple-500" />}
          title="Tempo Salvo"
          highlight={`${metricsData?.horasSalvas} horas`}
          legend="Horas totais recuperadas"
        />
        <DashboardCard
          icon={<Wallet className="w-6 h-6 text-orange-500" />}
          title="Economia Acumulada"
          highlight={`R$ ${metricsData?.economiaAcumulada}`}
          legend="Dinheiro economizado"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        <HighlightCard
          highlightColor="#009580"
          icon={<Sun className="w-6 h-6 text-renovar-primary" />}
          title="Avaliação Diária"
          content={
            <div className="flex flex-col items-end justify-between h-full gap-4">
              <p className="text-base font-medium text-gray-500">
                Reserve alguns minutos para refletir sobre seu bem-estar hoje:
                esse é o primeiro e mais importante passo para superar o vício
                em apostas.
              </p>
              <Link to="/dashboard/calendar">
                <Button className="bg-renovar-primary hover:bg-renovar-primary/90">
                  Check-in Diário
                </Button>
              </Link>
            </div>
          }
        />
        <HighlightCard
          highlightColor="#007F95"
          icon={<Calendar className="w-6 h-6 text-[#007F95]" />}
          title="Avaliação Mensal"
          content={
            <div className="flex flex-col items-end justify-between h-full gap-4">
              <p className="text-base font-medium text-gray-500">
                Esta avaliação usa o PGSI (Problematic Gambling Severity Index)
                para medir a gravidade do seu comportamento de apostas e sugerir
                ações para o seu bem-estar.
              </p>
              <Link to="/dashboard/calendar">
                <Button className="bg-[#007F95] hover:bg-[#007F95]/90">
                  Começar avaliação
                </Button>
              </Link>
            </div>
          }
        />
        <RegisterNewBetCard />
        <RecentActivities />
      </div>
    </PageContainer>
  )
}
