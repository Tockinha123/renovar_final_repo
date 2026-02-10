import z from 'zod'

const registerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .pipe(z.email({ message: 'Email inválido' })),
  password: z
    .string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(/\d/, 'Senha deve conter pelo menos um número')
    .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
      'Senha deve conter pelo menos um caractere especial',
    ),
  birthDate: z
    .date({
      error: 'Data de nascimento obrigatória',
    })
    .refine(
      (date) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return date < today
      },
      {
        message: 'A data de nascimento deve ser no passado',
      },
    ),
  financialBaseline: z
    .number({
      error: 'Informe o quanto você gasta diariamente',
    })
    .min(1, 'Informe o quanto você gasta diariamente'),

  sessionTimeBaseline: z
    .number({
      error: 'Informe o tempo diário',
    })
    .min(1, 'Informe o tempo diário')
    .max(24, 'Tempo máximo de 24h'),
})

type RegisterFormData = z.infer<typeof registerSchema>

export { registerSchema }
export type { RegisterFormData }
