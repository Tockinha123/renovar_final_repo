import type { ReactNode } from 'react'
import { hexToRgba } from '@/utils/hex-to-rgba'

type HighlightCardMode = 'default' | 'vertical'

interface HighlightCardProps {
  highlightColor: string
  icon: ReactNode
  title: string
  content: ReactNode | string
  mode?: HighlightCardMode
}

export function HighlightCard({
  highlightColor,
  icon,
  title,
  content,
  mode = 'default',
}: HighlightCardProps) {
  const lightBackgroundColor = hexToRgba(highlightColor, 0.1)
  const isVertical = mode === 'vertical'

  return (
    <div className="bg-white rounded-lg shadow-sm relative overflow-hidden flex flex-col">
      <div
        className={
          isVertical
            ? 'absolute left-0 right-0 top-0 h-5 rounded-t-lg'
            : 'absolute left-0 top-0 bottom-0 w-5 rounded-l-lg'
        }
        style={{ backgroundColor: highlightColor }}
      />

      <div
        className={
          isVertical
            ? 'p-6 pt-10 flex flex-col gap-4 flex-1'
            : 'p-6 pl-10 flex flex-col gap-4 flex-1'
        }
      >
        <div className="flex items-center gap-2">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: lightBackgroundColor }}
          >
            <div style={{ color: highlightColor }}>{icon}</div>
          </div>

          <h3 className="text-xl font-bold text-black flex-1">{title}</h3>
        </div>

        <div className="text-gray-600 text-sm leading-relaxed flex-1">
          {typeof content === 'string' ? <p>{content}</p> : content}
        </div>
      </div>
    </div>
  )
}
