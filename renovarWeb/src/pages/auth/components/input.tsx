import { Eye, EyeOff } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  viewError?: boolean
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, id, error, className, ...props }, ref) => {
    const hasError = Boolean(error)

    return (
      <div className="relative space-y-1">
        <Input
          ref={ref}
          id={id}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          placeholder=" "
          className={cn(
            'peer h-12 pt-4 bg-white focus:bg-white cursor-text',
            hasError && 'border-destructive focus-visible:ring-destructive/30',
            className,
          )}
          {...props}
        />

        {label && (
          <label
            htmlFor={id}
            className={cn(
              `
            absolute left-3 z-10 bg-white px-1
            text-sm text-[#84818A]
            transition-all duration-200 pointer-events-none

            top-3.5
            peer-focus:-top-2
            peer-focus:text-xs
            peer-focus:text-[#84818A]

            peer-[:not(:placeholder-shown)]:-top-2
            peer-[:not(:placeholder-shown)]:text-xs
          `,
              hasError && 'text-destructive peer-focus:text-destructive',
            )}
          >
            {label}
          </label>
        )}

        {hasError && (
          <p id={`${id}-error`} className="text-xs text-destructive mt-1">
            {error}
          </p>
        )}
      </div>
    )
  },
)

export const PasswordInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ className, error, viewError = false, ...props }, ref) => {
    const [show, setShow] = useState(false)
    const hasError = Boolean(error)
    return (
      <div className="relative">
        <AuthInput
          ref={ref}
          type={show ? 'text' : 'password'}
          className={cn(
            'pr-10 cursor-text',
            className,
            hasError && 'border-destructive focus-visible:ring-destructive/30',
          )}
          {...props}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          tabIndex={-1}
          onClick={() => setShow((v) => !v)}
          className={`absolute right-2 -translate-y-1/2 hover:bg-transparent ${error && viewError ? 'top-[35%]' : 'top-1/2'}`}
        >
          {show ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
        {viewError && <p className="text-xs text-destructive mt-1">{error}</p>}
      </div>
    )
  },
)

PasswordInput.displayName = 'PasswordInput'
AuthInput.displayName = 'AuthInput'
