'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Field } from '@/components/ui/field'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DatePickerSimpleProps {
  value?: Date
  onChange: (date?: Date) => void
  hasError?: boolean
}

export function DatePickerSimple({
  value,
  onChange,
  hasError,
}: DatePickerSimpleProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Field className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            type="button"
            className={`justify-start font-normal py-6 w-full ${
              hasError
                ? 'border-destructive focus-visible:ring-destructive/30'
                : ''
            }`}
          >
            <span
              className={`${value ? 'text-black' : 'text-renovar-gray-primary'}`}
            >
              {value ? value.toLocaleDateString('pt-BR') : 'Data de Nascimento'}
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            defaultMonth={value}
            className="py-4"
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
