import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react'
import { useState } from 'react'
import { CalendarDays } from './components/calendar-days'

dayjs.locale('pt-br')

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  function handlePreviousMonth() {
    setCurrentDate((prev) => prev.subtract(1, 'month'))
  }

  function handleNextMonth() {
    setCurrentDate((prev) => prev.add(1, 'month'))
  }

  return (
    <div className="flex flex-col max-w-2xl border border-gray-200 rounded-2xl py-6">
      <div className="flex items-center justify-between w-full mb-6 px-6 pb-4 border-b border-gray-200">
        <button
          className="rounded-sm leading-0"
          type="button"
          onClick={handlePreviousMonth}
          title="Mês anterior"
        >
          <CircleChevronLeft className="w-6 h-6 text-renovar-secondary" />
        </button>

        <h2 className="font-semibold capitalize text-gray-800">
          {currentMonth} {currentYear}
        </h2>

        <button
          className="rounded-sm leading-0"
          type="button"
          onClick={handleNextMonth}
          title="Próximo mês"
        >
          <CircleChevronRight className="w-6 h-6 text-renovar-secondary" />
        </button>
      </div>

      <CalendarDays currentDate={currentDate} />
    </div>
  )
}
