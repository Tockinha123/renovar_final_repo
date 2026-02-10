import { Clock, Wallet } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useAuthQuery } from '@/hooks/useAuth'
import type { CreateUserDTO } from '@/services/auth/types'
import { Auth } from '../../components'
import { AuthInput } from '../../components/input'
import { Progress } from '../../components/progress'
import type { RegisterFormData } from '../schema'
import type { StepTwoProps } from './types'

export function RegisterStepTwo({ onBack }: StepTwoProps) {
  const {
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { isSubmitting, errors },
  } = useFormContext<RegisterFormData>()

  const { isRegistering, registerUser } = useAuthQuery()

  const hours = watch('sessionTimeBaseline')

  async function onSubmit(data: RegisterFormData) {
    const payload: CreateUserDTO = {
      email: data.email,
      name: data.name,
      password: data.password,
      birthDate: new Date(data.birthDate).toISOString().split('T')[0],
      financialBaseline: data.financialBaseline,
      sessionTimeBaseline: data.sessionTimeBaseline,
    }
    await registerUser(payload)
  }

  return (
    <Auth>
      <div className="flex items-center justify-between mb-6">
        <Auth.Header title="Quase lá!" />
        <Progress step={2} totalSteps={2} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <p className="text-lg text-renovar-gray-primary">
          Quanto <b>tempo (em horas)</b> você acredita que gasta diariamente com
          apostas?
        </p>

        <div className="rounded-xl bg-renovar-secondary-soft/60 p-4 space-y-3">
          <div className="flex items-center gap-2 font-medium">
            <Clock /> Horas gastas diariamente
          </div>

          <Slider
            max={12}
            step={1}
            value={[hours]}
            onValueChange={(value) => setValue('sessionTimeBaseline', value[0])}
            error={errors.sessionTimeBaseline?.message}
          />

          <div className="flex justify-between text-sm p-2 text-[#84818A]">
            <span>0h</span>
            <span>{hours}h</span>
            <span>12h+</span>
          </div>
        </div>

        <p className="text-renovar-gray-primary">
          E quantos reais você gasta diariamente com apostas?
        </p>

        <div className="rounded-xl bg-renovar-secondary-soft/60 space-y-2 p-6">
          <div className="flex items-center gap-2 font-medium">
            <Wallet /> Reais (R$) gastos diariamente
          </div>

          <AuthInput
            type="number"
            className="bg-transparent space-y-0 pt-1"
            placeholder="R$"
            {...register('financialBaseline', {
              valueAsNumber: true,
            })}
            error={errors.financialBaseline?.message}
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="text-sm underline text-muted-foreground"
          >
            Voltar
          </button>

          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting || isRegistering}
            className="bg-renovar-secondary hover:bg-renovar-secondary/90"
          >
            Criar conta
          </Button>
        </div>
      </form>
    </Auth>
  )
}
