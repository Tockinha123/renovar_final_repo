import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/pt-br'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('pt-br')

interface BetCardProps {
  titulo: string
  data: string
  valor: number
  vitoriosa: boolean
}

export function BetCard({ titulo, data, valor, vitoriosa }: BetCardProps) {
  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor)
  }

  const formatarDataHora = (dataIso: string) => {
    return dayjs
      .utc(dataIso)
      .tz('America/Sao_Paulo')
      .format('DD/MM/YYYY, HH:mm')
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-2 relative w-full">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900">{titulo}</h3>
          <p className="text-sm text-gray-600">
            {formatarDataHora(data)} - {formatarValor(valor)}
          </p>
        </div>

        <span
          className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap ml-4 block ${
            vitoriosa ? 'bg-teal-100 text-teal-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {vitoriosa ? 'Vitória' : 'Derrota'}
        </span>
      </div>
    </div>
  )
}
