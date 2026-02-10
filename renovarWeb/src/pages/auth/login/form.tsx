import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { useAuthQuery } from '@/hooks/useAuth'
import { Auth } from '../components'
import { AuthInput, PasswordInput } from '../components/input'
import { type loginFormData, loginSchema } from './schema'

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })
  const { loginUser, isLogging } = useAuthQuery()

  const onSubmit = async (data: loginFormData) => {
    await loginUser({
      email: data.email,
      password: data.password,
    })
  }

  return (
    <Auth>
      <Auth.Header title="Bem-vindo de Volta" className="pb-6 " />
      <Auth.Form onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          label="Email"
          id="email"
          type="email"
          {...register('email')}
          required
          error={errors.email?.message}
        />

        <PasswordInput
          label="Senha"
          id="password"
          {...register('password')}
          required
          error={errors.password?.message}
          viewError={true}
        />
        <div className="flex justify-between items-center pt-8">
          <Button
            disabled={isSubmitting || isLogging}
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="w-full bg-renovar-primary hover:bg-teal-700 py-4 align-middle self-center"
          >
            {isLogging ? 'Entrando...' : 'Entrar'}
          </Button>
        </div>
      </Auth.Form>
    </Auth>
  )
}
