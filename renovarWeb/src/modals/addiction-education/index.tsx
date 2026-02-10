import { useSearch } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useModal } from '@/context/modal'

export function AddicationEducationModal() {
  const { closeModal } = useModal()
  const handleCloseModal = () => {
    closeModal({ removeAllParams: true })
  }
  const { videoId } = useSearch({ from: '__root__' })
  return (
    <Dialog open onOpenChange={handleCloseModal}>
      <DialogContent
        className="sm:max-w-7xl p-0 gap-0 bg-white border-none overflow-hidden min-h-173"
        showCloseButton={false}
      >
        <div className="bg-renovar-primary text-white px-6 py-4 flex items-center justify-between w-full">
          <DialogTitle className="text-lg font-semibold">
            Material Educativo
          </DialogTitle>
          <button
            onClick={handleCloseModal}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Fechar"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-8 px-55">
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
