export function AuthForm({
  children,
  onSubmit,
}: {
  children: React.ReactNode
  onSubmit?: VoidFunction
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {children}
    </form>
  )
}
