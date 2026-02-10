import { createContext } from 'react'

const AuthBackgroundContext = createContext<{
  bgColor: string
  setBgColor: (color: string) => void
} | null>(null)

export { AuthBackgroundContext }
