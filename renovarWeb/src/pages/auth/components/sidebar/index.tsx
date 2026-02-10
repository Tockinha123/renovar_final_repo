'use client'

import { Logo } from '@/components/logo'
import { SIDEBAR_IMAGE } from './constants'
import type { SidebarProps } from './types'

export function Sidebar({ bgColor = 'bg-renovar-primary' }: SidebarProps) {
  const isLoginPage = bgColor === 'bg-renovar-primary'
  const image = isLoginPage ? SIDEBAR_IMAGE.login : SIDEBAR_IMAGE.register
  return (
    <aside
      className={`hidden md:flex flex-col ${bgColor} p-12 text-white max-h-svh overflow-hidden`}
    >
      <div className="pr-16 flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center gap-3 mb-6 ">
          <Logo.Full className="animate-fade-in-scale animation-delay-200" />
        </header>

        <h1 className="text-4xl leading-snug mb-4 animate-fade-in-scale animation-delay-300">
          Recupere o controle.
          <br />
          <span className="font-bold">Comece agora.</span>
        </h1>

        <div className="flex flex-col gap-7 flex-1 overflow-hidden">
          <p className="text-md animate-fade-in-scale animation-delay-400">
            Nossa plataforma utiliza inteligência artificial para te ajudar a
            identificar comportamentos de risco relacionados a apostas e oferece
            ferramentas práticas para fortalecer sua autonomia.
          </p>

          <div className="flex-1 overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className={`w-full h-auto max-w-2xl mx-auto ${isLoginPage ? 'animate-fade-in-scale' : 'animate-fade-in-right'} animation-delay-300`}
              draggable={false}
            />
          </div>
        </div>
      </div>

      <footer className="pt-2">
        <p>
          <span className="font-bold">Você não está sozinho.</span> Dê o
          primeiro passo para retomar o equilíbrio.
        </p>
      </footer>
    </aside>
  )
}
