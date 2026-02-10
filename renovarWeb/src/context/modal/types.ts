import type { modalMap } from '@/modals'

interface ISearchParamsProps {
  name: string
  value: string
}

interface OpenModalProps {
  modal: keyof typeof modalMap
  generalSearchParams?: ISearchParamsProps[]
}

type ModalContextType = {
  activeModal: string | null
  openModal: ({ modal, generalSearchParams }: OpenModalProps) => void
  closeModal: ({ removeAllParams }: { removeAllParams?: boolean }) => void
}

export type { ISearchParamsProps, ModalContextType, OpenModalProps }
