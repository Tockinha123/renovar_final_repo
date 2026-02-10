import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import type { BreatheBackgroundModalProps } from './types'

export function BreatheBackgroundModal({
  onClose,
  videoId = 'DiCPrlpPGEE',
}: BreatheBackgroundModalProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-7xl p-0 gap-0 bg-white border-none overflow-hidden min-h-173"
        showCloseButton={false}
      >
        <div className="bg-yellow-600 text-white px-6 py-4 flex items-center justify-between w-full">
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

        <div className="p-8  px-55">
          <h2 className="text-renovar-other-gray text-5xl font-bold text-center mb-4">
            Respire Fundo
          </h2>

          <p className="text-center text-gray-600 mb-8">
            Você está sentindo um impulso, e ele parece urgente.{' '}
            <span className="font-semibold">
              Mas a verdade é: esse impulso vai passar.
            </span>{' '}
            E você tem o poder de esperar por isso. Faça nossa meditação guiada
            para te ajudar neste momento.
          </p>

          <div className="mb-8 flex items-center gap-6">
            <div className="flex-1">
              <div className="relative rounded-lg overflow-hidden aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                  title="Meditação Guiada"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>

            <div className="absolute -left-26 -bottom-12 w-102.75 h-83.5 pointer-events-none">
              <div className="w-full h-full rounded-lg flex items-center justify-center">
                <img
                  className="text-6xl"
                  src="/modal/man-mediating.svg"
                  alt="Meditação"
                />
              </div>
            </div>

            <div className="absolute -right-10 -bottom-2 w-60 h-82.5 pointer-events-none">
              <div className="w-full h-full rounded-lg flex items-center justify-center">
                <img
                  className="text-6xl"
                  src="/modal/plant.svg"
                  alt="Meditação"
                />
              </div>
            </div>
          </div>

          <p className="text-center text-renovar-other-gray-soft mb-6">
            Você acabou de vencer um momento difícil. Isso já é uma vitória. Se
            a vontade voltar, este espaço estará aqui por você sempre. Assuma um
            voto pessoal de auto-cuidado: escolha não apostar.
          </p>

          <div className="flex justify-center">
            <Button
              onClick={onClose}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-12 py-6 rounded-md font-semibold text-lg"
            >
              Entendido
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
