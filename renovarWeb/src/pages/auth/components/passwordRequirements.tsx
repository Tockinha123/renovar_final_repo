import { RequirementItem } from './requirementItem'

export function PasswordRequirements({ password }: { password: string }) {
  const requirements = {
    hasNumber: /\d/.test(password),
    hasMinLength: password?.length >= 8,
    hasLowerCase: /[a-z]/.test(password),
    hasUpperCase: /[A-Z]/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  }

  return (
    <div className="pt-2">
      <div className="flex items-center gap-1 mb-4">
        <div className="flex-1 h-px bg-gray-300" />
        <p className="text-sm font-normal text-[#84818a]">Requisitos</p>
        <div className="flex-1 h-px bg-gray-300" />
      </div>
      <div className="space-y-1.5">
        <RequirementItem
          valid={requirements.hasNumber}
          text="Pelo menos um número"
        />
        <RequirementItem
          valid={requirements.hasMinLength}
          text="Pelo menos 8 caracteres"
        />
        <RequirementItem
          valid={requirements.hasLowerCase}
          text="Pelo menos uma letra minúscula"
        />
        <RequirementItem
          valid={requirements.hasUpperCase}
          text="Pelo menos uma letra maiúscula"
        />
        <RequirementItem
          valid={requirements.hasSpecialChar}
          text="Pelo menos um caractere especial (!@#$%^&*()_+-=<>)"
        />
      </div>
    </div>
  )
}
