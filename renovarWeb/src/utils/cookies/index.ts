/** biome-ignore-all lint/suspicious/noDocumentCookie: xd */
import type { CookieOptions } from './types'

export const cookies = {
  set(name: string, value: string, options: CookieOptions = {}): void {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

    if (options.expires) {
      const expires =
        typeof options.expires === 'number'
          ? new Date(Date.now() + options.expires * 864e5) // dias para ms
          : options.expires
      cookieString += `; expires=${expires.toUTCString()}`
    }

    if (options.path) {
      cookieString += `; path=${options.path}`
    } else {
      cookieString += '; path=/'
    }

    if (options.domain) {
      cookieString += `; domain=${options.domain}`
    }

    if (options.secure) {
      cookieString += '; secure'
    }

    if (options.sameSite) {
      cookieString += `; samesite=${options.sameSite}`
    }

    document.cookie = cookieString
  },

  get(name: string): string | undefined {
    const nameEQ = `${encodeURIComponent(name)}=`
    const cookies = document.cookie.split(';')

    for (let cookie of cookies) {
      cookie = cookie.trim()
      if (cookie.startsWith(nameEQ)) {
        return decodeURIComponent(cookie.substring(nameEQ.length))
      }
    }

    return undefined
  },

  remove(name: string, options: Omit<CookieOptions, 'expires'> = {}): void {
    this.set(name, '', {
      ...options,
      expires: new Date(0), // data no passado
    })
  },

  getAll(): Record<string, string> {
    const cookies: Record<string, string> = {}
    const cookieArray = document.cookie.split(';')

    for (const cookie of cookieArray) {
      const [name, value] = cookie.split('=').map((c) => c.trim())
      if (name) {
        cookies[decodeURIComponent(name)] = decodeURIComponent(value || '')
      }
    }

    return cookies
  },
}
