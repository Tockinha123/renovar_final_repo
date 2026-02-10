function AuthContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-6 w-full animate-fade-in-scale animate-delay-300">
      <div className="w-full max-w-150 bg-white rounded-lg shadow-sm p-12 ">
        {children}
      </div>
    </div>
  )
}

export { AuthContainer }
