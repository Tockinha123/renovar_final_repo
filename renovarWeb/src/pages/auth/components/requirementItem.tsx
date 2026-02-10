import { Check, X } from 'lucide-react'

function RequirementItem({ valid, text }: { valid: boolean; text: string }) {
  const renderIcon = () =>
    valid ? (
      <Check className="w-4 h-4 text-teal-600 shrink-0" />
    ) : (
      <X className="w-4 h-4 text-gray-400 shrink-0" />
    )

  return (
    <div className="flex items-center gap-2 text-sm">
      {renderIcon()}
      <span className={valid ? 'text-teal-600' : 'text-gray-500'}>{text}</span>
    </div>
  )
}

export { RequirementItem }
