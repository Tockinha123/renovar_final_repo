import { useNavigate } from '@tanstack/react-router'
import { useContext, useEffect } from 'react'
import { Auth } from '../components'
import { AuthBackgroundContext } from '../context/authBackground'
import { LoginForm } from './form'

export function LoginPage() {
  const navigate = useNavigate()

  const handleRedirectToRegister = () => {
    navigate({ to: '/register' })
  }
  const backgroundContext = useContext(AuthBackgroundContext)

  useEffect(() => {
    backgroundContext?.setBgColor('bg-renovar-primary')
  }, [backgroundContext?.setBgColor])

  return (
    <div className="relative min-h-screen flex items-center justify-center w-full bg-neutral-100">
      <div className="absolute top-6 right-6 text-sm text-gray-700 z-9999">
        <Auth.Link
          text="Não possui conta?"
          label="Cadastre-se"
          onClick={handleRedirectToRegister}
        />
      </div>

      <LoginForm />
    </div>
  )
}
