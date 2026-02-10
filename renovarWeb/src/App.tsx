import { QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { Toaster } from 'react-hot-toast'
import { queryClient } from './lib/react-query'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-center" />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
