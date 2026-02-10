function AuthHeader({
  title,
  className,
}: {
  title: string
  className?: string
}) {
  return (
    <h1 className={`text-2xl text-gray-900 font-semibold ${className || ''}`}>
      {title}
    </h1>
  )
}
export { AuthHeader }
