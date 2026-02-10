import type { IDocumentsInfoCardProps } from './types'

export function DocumentsInfoCard({
  title,
  description,
  icon,
  moreInfo,
}: IDocumentsInfoCardProps) {
  return (
    <div className="flex gap-4">
      {icon && <div className="flex itmes-start">{icon}</div>}
      <div className="flex flex-col gap-1.5 w-full">
        {typeof title === 'string' ? (
          <h4 className="text-renovar-gray-secondary font-semibold text-lg">
            {title}
          </h4>
        ) : (
          title
        )}
        <p className="text-renovar-other-gray-soft">{description}</p>
        {moreInfo}
      </div>
    </div>
  )
}
