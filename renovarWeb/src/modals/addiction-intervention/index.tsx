import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useModal } from '@/context/modal'
import { AddictionInterventionCard } from './card'
import type { AddictionInterventionModalProps } from './types'

export function AddictionInterventionModal({
  onClose,
}: AddictionInterventionModalProps) {
  const { openModal } = useModal()

  const handleAction = (action: 'deny' | 'wantToBet') => {
    if (action === 'deny') {
      return openModal({ modal: 'breathe-background' })
    }

    return onClose()
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-7xl p-0 gap-0 bg-white border-none overflow-hidden min-h-173"
        showCloseButton={false}
      >
        <div className="bg-red-700 text-white px-6 py-4 flex items-center justify-between">
          <DialogTitle className="text-lg font-semibold">
            Emergência
          </DialogTitle>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Fechar"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-8 px-16">
          <h2 className="text-5xl font-bold text-center mb-6 text-renovar-other-gray">
            <span className="text-red-900">Não perca</span> o controle da sua
            vida
          </h2>

          <p className="text-center text-renovar-other-gray mb-8 text-2xl font-semibold">
            Efeitos Colaterais do Vício em Apostas:
          </p>

          <div className="grid grid-cols-4 gap-6 mb-16">
            <AddictionInterventionCard
              title="Dívidas"
              description="A busca incessante por recuperar perdas pode levar a dívidas significativas e dificuldades financeiras."
            />
            <AddictionInterventionCard
              title="Isolamento"
              description="Isolamento de amigos e familiares para dedicar mais tempo ao jogo."
            />
            <AddictionInterventionCard
              title="Relacionamentos"
              description="Desconfiança, afastamento e conflitos constantes criam um ciclo de isolamento e sofrimento mútuo."
            />
            <AddictionInterventionCard
              title="Comportamento"
              description="Irritabilidade, agressividade, depressão e ansiedade são comuns em pessoas com vício em apostas."
            />
          </div>

          <div className="flex items-center gap-6 mb-8 p-6 rounded-lg">
            <div className="absolute left-16 bottom-0 w-21.5 h-36.5 pointer-events-none z-10">
              <div className="w-full h-full rounded-lg flex items-center justify-center">
                <img
                  className="text-6xl"
                  src="/modal/plant-2.svg"
                  alt="Meditação"
                />
              </div>
            </div>
            <div className="absolute left-24 -bottom-56 w-89.5 h-127.75 pointer-events-none">
              <div className="w-full h-full rounded-lg flex items-center justify-center">
                <img
                  className="text-6xl"
                  src="/modal/psychologist.svg"
                  alt="Meditação"
                />
              </div>
            </div>
            <div className="flex-1 max-w-198.75 ml-auto">
              <blockquote className="text-right italic text-renovar-other-gray text-lg">
                "Embora ninguém possa voltar atrás e fazer um novo começo,
                qualquer um pode começar agora e fazer um novo fim."
              </blockquote>
              <p className="text-right mt-2 font-semibold text-gray-800">
                — Carl Bard
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              onClick={() => handleAction('deny')}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 rounded-md font-semibold"
            >
              Não apostei
            </Button>
            <Button
              onClick={() => handleAction('wantToBet')}
              className="bg-red-700 hover:bg-red-800 text-white px-8 py-6 rounded-md font-semibold"
            >
              Eu apostei
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
