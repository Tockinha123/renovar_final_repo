import { zodResolver } from '@hookform/resolvers/zod'
import { FilePen } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCreateBet } from '@/hooks/useCreateBet'
import { BET_CATEGORIES, BET_SESSION_TIMES } from '@/services/bet'
import { HighlightCard } from '../../../../components/highlight-card'

const createBetSchema = z.object({
  amount: z.string().min(1),
  category: z.enum(
    Object.keys(BET_CATEGORIES) as [
      keyof typeof BET_CATEGORIES,
      ...(keyof typeof BET_CATEGORIES)[],
    ],
  ),
  sessionTime: z.enum(
    Object.keys(BET_SESSION_TIMES) as [
      keyof typeof BET_SESSION_TIMES,
      ...(keyof typeof BET_SESSION_TIMES)[],
    ],
  ),
  won: z.boolean(),
})

type createBetFormData = z.infer<typeof createBetSchema>

const SESSION_TIME_LABELS = {
  [BET_SESSION_TIMES.FIVE_MINUTES]: '5 minutos',
  [BET_SESSION_TIMES.FIFTEEN_MINUTES]: '15 minutos',
  [BET_SESSION_TIMES.THIRTY_MINUTES]: '30 minutos',
  [BET_SESSION_TIMES.SIXTY_PLUS_MINUTES]: '+60 minutos',
}

export function RegisterNewBetCard() {
  const { createBet, isCreatingBet } = useCreateBet()
  const { register, handleSubmit, control, reset } = useForm<createBetFormData>(
    {
      resolver: zodResolver(createBetSchema),
      defaultValues: {
        won: false,
      },
    },
  )

  async function onSubmit(data: createBetFormData) {
    await createBet({ ...data, amount: Number(data.amount) })
    reset()
  }

  return (
    <HighlightCard
      highlightColor="#DFA123"
      icon={<FilePen className="w-6 h-6 text-[#DFA123]" />}
      title="Registrar Uma Nova Aposta"
      content={
        <div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              placeholder="Valor apostado"
              type="number"
              {...register('amount')}
            />

            <Controller
              control={control}
              name="category"
              render={({ field: { onChange, value } }) => (
                <Select
                  onValueChange={(value) => onChange(value)}
                  value={value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o tipo de jogo" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(BET_CATEGORIES).map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        {key}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <Controller
              control={control}
              name="sessionTime"
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a duração estimada da sessão" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(BET_SESSION_TIMES).map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        {SESSION_TIME_LABELS[value]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <div className="flex items-center justify-between gap-2">
              <Controller
                control={control}
                name="won"
                render={({ field: { onChange, value } }) => (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="bet"
                      checked={value}
                      className="data-[state=checked]:bg-[#DFA123] data-[state=checked]:border-[#DFA123]"
                      onCheckedChange={onChange}
                    />
                    <Label htmlFor="bet" className="font-medium text-gray-500">
                      Ganhei esta aposta
                    </Label>
                  </div>
                )}
              />

              <Button
                className="bg-[#DFA123] hover:bg-[#DFA123]/90"
                disabled={isCreatingBet}
                type="submit"
              >
                Salvar
              </Button>
            </div>
          </form>
        </div>
      }
    />
  )
}
