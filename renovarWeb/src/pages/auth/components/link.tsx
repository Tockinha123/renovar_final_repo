export function AuthLink({
  text,
  label,
  onClick,
}: {
  text: string
  label: string
  onClick: () => void
}) {
  return (
    <span className="text-sm text-gray-600">
      {text}{' '}
      <button
        type="button"
        onClick={onClick}
        className="text-teal-600 hover:underline cursor-pointer"
      >
        {label}
      </button>
    </span>
  )
}
