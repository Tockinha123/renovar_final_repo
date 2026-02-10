import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: '/login' })
  },
  component: BaseRoute,
})

function BaseRoute() {
  return null
}
