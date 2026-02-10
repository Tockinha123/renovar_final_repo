import { useModal } from '@/context/modal'
import type { IDocumentsListItemProps } from './types'

export const documentListMock: IDocumentsListItemProps['steps'] = [
  {
    position: 1,
    text: 'Desmitificando mito comuns sobre apostas online',
    videoId: 'DlMLfxxvKD8',
  },
  {
    position: 2,
    text: 'A neurociência do vício em apostas e jogos',
    videoId: 'IV2T4UIIzbs',
  },
  {
    position: 3,
    text: 'Reconhecimento dos sinais do jogo patológico',
    videoId: 'u2BtY-z8XuY',
  },
  {
    position: 4,
    text: 'Impacto na saúde mental e ansiedade financeira',
    videoId: 'fQ9qp9UftEE',
  },
  {
    position: 5,
    text: 'Criando um plano de recuperação personalizado',
    videoId: '1Ta7uI6m_Ts',
  },
]

export function DocumentsListItem({ steps, title }: IDocumentsListItemProps) {
  const { openModal } = useModal()
  return (
    <div className="flex flex-col gap-1.5">
      <h3 className="font-semibold text-2xl text-renovar-other-gray-soft/80">
        {title}
      </h3>
      <div className="flex gap-3">
        {steps.map((item) => (
          <button
            type="button"
            onClick={() =>
              openModal({
                modal: 'addiction-education',
                generalSearchParams: [{ name: 'videoId', value: item.videoId }],
              })
            }
            key={`${item.position}-${item.videoId}`}
            className="p-4 border border-other-renovar-gray-soft/80 rounded-md min-w-80"
          >
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="size-10 flex justify-center items-center rounded-full bg-renovar-other-gray/10">
                <h4 className="text-center font-semibold text-lg text-renovar-gray-primary">
                  {item.position}
                </h4>
              </div>
              <p className="text-renovar-other-gray-soft text-sm">
                {item.text}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
