import { createFileRoute } from '@tanstack/react-router'
import { CalendarPage } from '@/pages/calendar'

export const Route = createFileRoute('/dashboard/calendar')({
  component: CalendarPage,
})
