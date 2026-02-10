import z from 'zod'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Insira o e-mail')
    .pipe(z.email({ message: 'Insira um e-mail válido' })),
  password: z.string().min(1, 'Insira a senha'),
})

type loginFormData = z.infer<typeof loginSchema>

export { loginSchema }
export type { loginFormData }
