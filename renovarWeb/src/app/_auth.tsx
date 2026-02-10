import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useState } from 'react'
import { Sidebar } from '@/pages/auth/components/sidebar'
import { AuthBackgroundContext } from '@/pages/auth/context/authBackground'
import { COOKIES_KEYS } from '@/shared/cookies'
import { cookies } from '@/utils/cookies'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
  beforeLoad: () => {
    const token = cookies.get(COOKIES_KEYS.authToken)
    if (token) {
      throw redirect({ to: '/dashboard' })
    }
  },
})

function AuthLayout() {
  const [bgColor, setBgColor] = useState('bg-renovar-primary')

  return (
    <AuthBackgroundContext.Provider value={{ bgColor, setBgColor }}>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        <Sidebar bgColor={bgColor} />
        <Outlet />
      </div>
    </AuthBackgroundContext.Provider>
  )
}
