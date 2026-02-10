import type { ReactNode } from 'react'
import { type RISK_LEVEL, RISK_LEVEL_COLOR } from '@/services/dashboard/types'
import { hexToRgba } from '@/utils/hex-to-rgba'

interface DashboardCardProps {
  icon: ReactNode
  title: string
  highlight: string
  legend: string
  riskLevel?: keyof typeof RISK_LEVEL
}

export function DashboardCard({
  icon,
  title,
  highlight,
  legend,
  riskLevel,
}: DashboardCardProps) {
  const hasRiskLevel = Boolean(riskLevel)
  const highlightColor = hasRiskLevel ? RISK_LEVEL_COLOR[riskLevel!] : undefined
  const legendColor = hasRiskLevel ? RISK_LEVEL_COLOR[riskLevel!] : undefined

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="shrink-0">{icon}</div>
        <h3 className="text-xl font-normal text-gray-600">{title}</h3>
      </div>

      <div className="flex-1">
        <p
          className="text-4xl font-bold"
          style={{ color: highlightColor || '#1f2937' }}
        >
          {highlight}
        </p>
      </div>

      <div className="flex justify-end">
        <div
          className={`${hasRiskLevel ? 'p-1.5 py-1 rounded-md max-w-max' : ''}`}
          style={
            hasRiskLevel && legendColor
              ? {
                  backgroundColor: hexToRgba(legendColor, 0.1),
                }
              : undefined
          }
        >
          <p
            className="text-xs font-normal"
            style={{ color: legendColor || '#9ca3af' }}
          >
            {legend}
          </p>
        </div>
      </div>
    </div>
  )
}
