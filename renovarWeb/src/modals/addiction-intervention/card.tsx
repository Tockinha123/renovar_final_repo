interface AddictionInterventionCardProps {
  title: string
  description: string
}

export function AddictionInterventionCard({
  title,
  description,
}: AddictionInterventionCardProps) {
  return (
    <div className="rounded-lg border-[#E1E1E1] border p-4">
      <div className="text-center">
        <h3 className="font-bold text-2xl mb-2">{title}</h3>
        <p className="text-base text-gray-600">{description}</p>
      </div>
    </div>
  )
}
