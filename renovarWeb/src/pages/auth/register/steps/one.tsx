import { Controller, useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Auth } from '../../components'
import { DatePickerSimple } from '../../components/date-picker'
import { AuthInput, PasswordInput } from '../../components/input'
import { PasswordRequirements } from '../../components/passwordRequirements'
import { Progress } from '../../components/progress'
import type { RegisterFormData } from '../schema'
import type { ErrorFieldMessageMap, StepOneProps } from './types'

export function RegisterStepOne({ onNext }: StepOneProps) {
  const {
    register,
    control,
    watch,
    trigger,
    formState: { isSubmitting, errors },
  } = useFormContext<RegisterFormData>()

  const password = watch('password')

  const fieldMessageErrors: ErrorFieldMessageMap = {
    name: errors.name?.message,
    birthDate: errors.birthDate?.message,
    email: errors.email?.message,
    password: errors.password?.message,
  }
  async function handleNext() {
    const isValid = await trigger(['name', 'birthDate', 'email', 'password'])

    if (isValid) {
      onNext()
    }
  }

  return (
    <Auth>
      <div className="flex items-center justify-between mb-6">
        <Auth.Header title="Insira seus dados:" />
        <Progress step={1} totalSteps={2} />
      </div>

      <div className="space-y-4">
        <AuthInput
          label="Nome Completo"
          {...register('name')}
          error={fieldMessageErrors.name}
          required
        />

        <Controller
          name="birthDate"
          control={control}
          render={({ field }) => (
            <DatePickerSimple
              value={field.value}
              onChange={field.onChange}
              hasError={Boolean(fieldMessageErrors.birthDate)}
            />
          )}
        />

        <AuthInput
          label="Email"
          type="email"
          {...register('email')}
          error={fieldMessageErrors.email}
          required
        />

        <PasswordInput
          label="Senha"
          {...register('password')}
          error={fieldMessageErrors.password}
          required
        />

        <PasswordRequirements password={password || ''} />

        <div className="flex justify-end pt-4">
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={handleNext}
            className="bg-renovar-secondary hover:bg-renovar-secondary/90"
          >
            Avançar
          </Button>
        </div>
      </div>
    </Auth>
  )
}
