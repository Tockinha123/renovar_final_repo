import { useNavigate } from '@tanstack/react-router'
import { createContext, useContext, useState } from 'react'
import type { AuthLoginResponse, UserData } from '@/services/auth/types'
import { COOKIES_KEYS } from '@/shared/cookies'
import { cookies } from '@/utils/cookies'
import type { AuthContextData, AuthProviderProps } from './types'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserData | null>(null)
  const navigate = useNavigate()

  const signIn = (data: AuthLoginResponse) => {
    cookies.set(COOKIES_KEYS.authToken, data.token, {
      expires: 7,
      secure: true,
      sameSite: 'strict',
    })
    setUser({ email: data.email, name: data.name })
    setTimeout(() => {
      navigate({ to: '/dashboard' })
    }, 900)
  }

  const signOut = () => {
    Object.values(COOKIES_KEYS).forEach((cookieKey) => {
      cookies.remove(cookieKey)
    })
    navigate({ to: '/login' })
    setTimeout(() => {
      setUser(null)
    }, 100)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }

  return context
}
