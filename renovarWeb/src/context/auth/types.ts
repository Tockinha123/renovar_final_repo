import type { AuthLoginResponse, UserData } from '@/services/auth/types'

interface AuthProviderProps {
  children: React.ReactNode
}

interface AuthContextData {
  user: UserData | null
  setUser: (user: UserData | null) => void
  signIn: (data: AuthLoginResponse) => void
  signOut: () => void
}

export type { AuthContextData, AuthProviderProps }
