import { Download, Loader2 } from 'lucide-react'
import { useGetReport } from '@/hooks/useGetReport'

export function DownloadReportCard() {
  const { getReport, isLoading } = useGetReport()

  async function downloadReport() {
    const { url } = await getReport()
    window.open(url, '_blank')
  }

  return (
    <button
      type="button"
      onClick={downloadReport}
      disabled={isLoading}
      className="w-full max-w-2xl flex items-center justify-between gap-4 p-5 bg-white rounded-lg border border-line-gray text-left transition-colors hover:bg-gray-50/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-renovar-secondary focus-visible:ring-offset-2 disabled:opacity-60"
    >
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-renovar-gray-secondary">
          Compartilhar com Profissional
        </h3>
        <p className="mt-1 text-sm font-normal text-renovar-gray-primary">
          Para apoio especializado, gere um relatório e repasse estes resultados
          a um profissional de saúde adequado e de sua confiança.
        </p>
      </div>

      <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-download-icon">
        {isLoading ? (
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        ) : (
          <Download className="w-6 h-6 text-white" strokeWidth={2.5} />
        )}
      </div>
    </button>
  )
}
