/** biome-ignore-all lint/a11y/useButtonType: xd */
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useLocation,
} from '@tanstack/react-router'
import { Book, Calendar, LayoutGrid, LineChart, LogOut } from 'lucide-react'
import { Logo } from '@/components/logo'
import { PageLoader } from '@/components/page-loader'
import { useAuthContext } from '@/context/auth'
import { useUserData } from '@/hooks/useUserData'
import { COOKIES_KEYS } from '@/shared/cookies'
import { cookies } from '@/utils/cookies'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
  beforeLoad: () => {
    const token = cookies.get(COOKIES_KEYS.authToken)
    if (!token) {
      throw redirect({ to: '/login' })
    }
  },
})

function DashboardLayout() {
  const location = useLocation()
  const { signOut } = useAuthContext()
  const { isLoadingUserData } = useUserData()
  const currentPath = location.pathname

  const navItems = [
    { path: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
    { path: '/dashboard/analytics', icon: LineChart, label: 'Analytics' },
    { path: '/dashboard/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/dashboard/documents', icon: Book, label: 'Documents' },
  ]

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return currentPath === '/dashboard' || currentPath === '/dashboard/'
    }
    return currentPath.startsWith(path)
  }

  function handleLogout() {
    signOut()
  }

  if (isLoadingUserData) {
    return <PageLoader />
  }

  return (
    <div className="flex h-screen">
      <aside className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6">
        <div className="border-b border-gray-200 w-full flex items-center justify-center mb-6 pb-6">
          <div className="bg-renovar-primary rounded-full py-2 size-10 flex justify-center">
            <Logo.Symbol className="max-w-5" />
          </div>
        </div>

        <nav className="flex flex-col items-center gap-6 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  w-12 h-12 rounded-lg flex items-center justify-center transition-colors
                  ${
                    active
                      ? 'bg-renovar-primary text-white'
                      : 'text-gray-500 hover:bg-renovar-primary hover:text-white'
                  }
                `}
              >
                <Icon />
              </Link>
            )
          })}
        </nav>

        <div className="flex flex-col items-center gap-6">
          <button
            className="w-12 h-12 flex items-center justify-center hover:bg-red-50 rounded-lg transition-colors"
            type="button"
            title="button lougout"
            onClick={handleLogout}
          >
            <LogOut className="w-6 h-6 text-red-600" />
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
