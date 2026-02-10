import dayjs from 'dayjs'
import { Frown, Loader2, Smile } from 'lucide-react'
import { RefreshError } from '@/components/refresh-error'
import { useGetBetDays } from '@/hooks/useGetBetDays'
import { DAY_STATUS } from '@/services/bet'
import { getWeekDays } from '@/utils/get-week-days'
import type { CalendarWeeks } from './types'

type CalendarDaysProps = {
  currentDate: dayjs.Dayjs
}

export function CalendarDays({ currentDate }: CalendarDaysProps) {
  const year = currentDate.year()
  const month = currentDate.month() + 1

  const { betDays, isLoading, isErrorBetDays, refetchGetBetDays } =
    useGetBetDays({
      year,
      month,
    })

  const shortWeekDays = getWeekDays({ short: true })

  function calendarWeeks() {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled: false, // TODO: Implement disabled days
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }

  if (isLoading) {
    return (
      <div className="min-h-96 w-full flex items-center justify-center">
        <Loader2 className="text-gray-500 animate-spin" />
      </div>
    )
  }

  if (isErrorBetDays) {
    return (
      <div className="min-h-96 w-full flex items-center justify-center">
        <RefreshError onRetry={refetchGetBetDays} />
      </div>
    )
  }

  return (
    <table className="w-full table-fixed border-separate border-spacing-2">
      <tbody className="before:leading-1 before:content-[.] before:block before:text-gray-800">
        {calendarWeeks().map(({ week, days }) => (
          <tr key={week}>
            {days.map(({ date, disabled }) => {
              const weekDayIndex = date.get('day')
              const weekDayLabel = shortWeekDays[weekDayIndex]

              const dayStatus =
                betDays?.find((bet) => {
                  return dayjs(bet.date).isSame(date, 'date')
                })?.status ?? DAY_STATUS.FUTURO

              const dayContent = {
                [DAY_STATUS.LIMPO]: <Smile />,
                [DAY_STATUS.APOSTOU]: <Frown />,
                [DAY_STATUS.FUTURO]: date.get('date'),
              }

              const dayColor = {
                [DAY_STATUS.LIMPO]:
                  'bg-[#E6F5EA] text-[#009580] border-[#009580]',
                [DAY_STATUS.APOSTOU]:
                  'bg-[#FEE2E2] text-[#990000] border-[#990000]',
                [DAY_STATUS.FUTURO]:
                  'bg-[#F1F5F9] text-[#84818A] border-[#84818A]',
              }

              return (
                <td key={date.toString()} className="px-5">
                  <div className="flex flex-col items-center gap-0.5">
                    <span
                      data-disabled={disabled}
                      className={`
                  w-full aspect-square ${dayColor[dayStatus]}
                  text-center rounded-sm text-base
                  data-[disabled=true]:opacity-30 data-[disabled=true]:bg-none
                  font-semibold flex items-center justify-center
                  border
                `}
                    >
                      {dayContent[dayStatus]}
                    </span>
                    <span
                      data-disabled={disabled}
                      className="text-base font-semibold text-gray-950 data-[disabled=true]:opacity-30"
                    >
                      {weekDayLabel}
                    </span>
                  </div>
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
