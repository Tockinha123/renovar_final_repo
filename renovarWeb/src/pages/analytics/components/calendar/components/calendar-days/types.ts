import type dayjs from 'dayjs'

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

export type CalendarWeeks = CalendarWeek[]
