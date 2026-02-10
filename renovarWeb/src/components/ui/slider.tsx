/** biome-ignore-all lint/suspicious/noArrayIndexKey: xd */
import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface SliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  error?: string | boolean
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  error,
  ...props
}: SliderProps) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  )

  return (
    <div className="flex flex-col w-full">
      <SliderPrimitive.Root
        data-slot="slider"
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        className={cn(
          'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
          className,
        )}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            'relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5',
            error ? 'bg-red-400' : 'bg-[#7A9EA4]',
          )}
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={cn(
              'bg-[#007F95] absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
            )}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={`thumb-${index}`}
            className="border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Root>
      {error && typeof error === 'string' && (
        <span className="mt-1 text-sm text-red-600">{error}</span>
      )}
    </div>
  )
}

export { Slider }
