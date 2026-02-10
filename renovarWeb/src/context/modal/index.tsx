import { useNavigate, useSearch } from '@tanstack/react-router'
import { createContext, type JSX, useContext, useEffect } from 'react'
import type { ModalContextType, OpenModalProps } from './types'

const ModalContext = createContext<ModalContextType | null>(null)

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within an ModalProvider')
  }
  return context
}

type ModalProviderProps = {
  children: React.ReactNode
  modalMap: Record<string, (props: { onClose: () => void }) => JSX.Element>
}

export const ModalProvider = ({ children, modalMap }: ModalProviderProps) => {
  const navigate = useNavigate()
  const search = useSearch({ strict: false }) as Record<string, unknown>

  const activeModal = (search.modal as string | undefined) ?? null

  useEffect(() => {
    if (activeModal && !modalMap[activeModal]) {
      const { modal, ...rest } = search
      navigate({
        search: (() => rest) as any,
        replace: true,
      })
    }
  }, [activeModal, modalMap, navigate, search])

  const openModal = ({ modal, generalSearchParams }: OpenModalProps) => {
    const dynamicParams = Object.fromEntries(
      (generalSearchParams ?? []).map(({ name, value }) => [name, value]),
    )

    navigate({
      search: ((prev: Record<string, unknown>) => ({
        ...prev,
        modal,
        ...dynamicParams,
      })) as any,
      replace: false,
    })
  }

  const closeModal = ({
    removeAllParams,
  }: {
    removeAllParams?: boolean
  } = {}) => {
    if (removeAllParams) {
      return navigate({
        search: (() => ({})) as any,
        replace: false,
      })
    }

    const { modal, ...rest } = search
    return navigate({
      search: (() => rest) as any,
      replace: false,
    })
  }

  const ModalComponent =
    activeModal && modalMap[activeModal] ? modalMap[activeModal] : null

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
      {ModalComponent && <ModalComponent onClose={closeModal} />}
    </ModalContext.Provider>
  )
}