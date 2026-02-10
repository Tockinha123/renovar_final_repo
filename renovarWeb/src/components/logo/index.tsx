import type { ILogoProps } from './types'

function LogoBase({
  src,
  className = '',
  alt = 'Logo',
  loading = 'lazy',
}: ILogoProps & { src: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={className}
      draggable={false}
    />
  )
}

function LogoFull(props: ILogoProps) {
  return <LogoBase {...props} src="/logo-full.svg" />
}

function LogoSymbol(props: ILogoProps) {
  return <LogoBase {...props} src="/logo-symbol.svg" />
}

export const Logo = {
  Full: LogoFull,
  Symbol: LogoSymbol,
}
