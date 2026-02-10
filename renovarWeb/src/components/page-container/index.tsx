import type { ReactNode } from 'react'
import { useModal } from '@/context/modal'

interface PageContainerProps {
  children: ReactNode
  title: string | ReactNode
}

export function PageContainer({ children, title }: PageContainerProps) {
  const { openModal } = useModal()

  const handleOpenModalAddictionIntervention = () => {
    openModal({ modal: 'addiction-intervention' })
  }

  return (
    <div className="flex flex-col gap-3 w-[calc(100%-4rem)] max-w-360 m-auto mt-16 mb-8">
      <div className="flex items-center justify-between w-full mb-4">
        {typeof title === 'string' ? (
          <h3 className="text-3xl font-medium">{title}</h3>
        ) : (
          title
        )}
        <button
          type="button"
          onClick={handleOpenModalAddictionIntervention}
          className="bg-red-800 text-white px-4 py-2 rounded-md text-xs"
        >
          Emergência
        </button>
      </div>
      {children}
    </div>
  )
}
