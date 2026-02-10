import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { type JSX, useContext, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Auth } from '../components'
import { AuthBackgroundContext } from '../context/authBackground'
import type { RegisterFormData } from './schema'
import { registerSchema } from './schema'
import { RegisterStepOne } from './steps/one'
import { RegisterStepTwo } from './steps/two'
import type { Step } from './types'

export function RegisterPage() {
  const [step, setStep] = useState<Step>(1)
  const navigate = useNavigate()
  const backgroundContext = useContext(AuthBackgroundContext)

  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      birthDate: undefined,
      sessionTimeBaseline: 0,
      financialBaseline: 0,
    },
  })

  useEffect(() => {
    backgroundContext?.setBgColor('bg-renovar-secondary')
  }, [backgroundContext?.setBgColor])

  function nextStep() {
    setStep(2)
  }

  function prevStep() {
    setStep(1)
  }

  const steps: Record<Step, JSX.Element> = {
    1: <RegisterStepOne onNext={nextStep} />,
    2: <RegisterStepTwo onBack={prevStep} />,
  }

  return (
    <FormProvider {...methods}>
      <div className="relative min-h-screen flex items-center justify-center w-full bg-neutral-100">
        <div className="absolute top-6 right-6 text-sm text-gray-700 z-9999">
          <Auth.Link
            text="Já possui conta?"
            label="Faça Login"
            onClick={() => navigate({ to: '/login' })}
          />
        </div>

        {steps[step]}
      </div>
    </FormProvider>
  )
}
