import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import { AuthProvider } from '@/context/auth'
import { ModalProvider } from '@/context/modal'
import { modalMap } from '@/modals'

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <p>Not Found</p>,
  validateSearch: (
    search: Record<string, unknown>,
  ): Record<string, unknown> => {
    return search
  },
})

function RootLayout() {
  return (
    <AuthProvider>
      <ModalProvider modalMap={modalMap}>
        <HeadContent />
        <div className="min-h-screen bg-neutral-50">
          <Outlet />
        </div>
      </ModalProvider>
    </AuthProvider>
  )
}
