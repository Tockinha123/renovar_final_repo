import { ClipboardCheck, Frown, Smile } from 'lucide-react'
import { RISK_LEVEL, RISK_LEVEL_COLOR } from '@/services/dashboard/types'
import { hexToRgba } from '@/utils/hex-to-rgba'
import type { QuizFeedbackProps } from './types'

export function QuizFeedback({ feedback, highlightColor }: QuizFeedbackProps) {
  if (!feedback) return null

  const riskLevelColor = RISK_LEVEL_COLOR[feedback.riskLevel]
  const riskLevelColorRgba = hexToRgba(riskLevelColor, 0.1)
  const riskLevelName = feedback.riskLevel?.replace('_', ' ')
  const goodRecommendation =
    feedback.riskLevel === RISK_LEVEL.EXCELENTE ||
    feedback.riskLevel === RISK_LEVEL.BOM

  return (
    <div className="w-full rounded-2xl border border-gray-300 p-6 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{ backgroundColor: hexToRgba(highlightColor, 0.1) }}
        >
          <ClipboardCheck
            className="w-6 h-6"
            style={{ color: highlightColor }}
          />
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-3 relative">
        <span className="text-xl font-normal text-gray-400 absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1 rounded-full">
          Concluída
        </span>
        <span className="font-semibold text-gray-600 text-base">
          Status da Avaliação
        </span>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Nível de Risco:</span>
            <span
              className="px-2 py-0.5 rounded-sm text-[10px] font-semibold"
              style={{
                backgroundColor: riskLevelColorRgba,
                color: riskLevelColor,
              }}
            >
              {riskLevelName}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Resultado:</span>
            <span
              className="text-[11px] font-semibold"
              style={{ color: riskLevelColor }}
            >
              {feedback.result}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Mudança:</span>
            <span
              className="text-[11px] font-semibold"
              style={{ color: riskLevelColor }}
            >
              {feedback?.variation?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-gray-600 text-base">
          Recomendações Personalizadas
        </h3>
        <div className="flex flex-col gap-3">
          <div
            className={`rounded-xl p-4 flex gap-3 ${goodRecommendation ? 'bg-[#CCEAE6]' : 'bg-[#FEE2E2]'}`}
          >
            {goodRecommendation ? (
              <Smile className="min-w-5 min-h-5 text-green-500" />
            ) : (
              <Frown className="min-w-5 min-h-5 text-red-500" />
            )}
            <div className="flex flex-col gap-1 min-w-0">
              <h4 className="font-semibold text-gray-600 text-base">
                {goodRecommendation ? 'Continue Assim' : 'Ajuste seu Padrão'}
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {goodRecommendation
                  ? 'Você está mantendo um padrão saudável de autocontrole.'
                  : 'Você está com um padrão de autocontrole que pode ser ajustado para melhorar sua saúde mental.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
