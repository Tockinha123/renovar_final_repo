import { HttpError, NetworkError, TimeoutError } from '@/services/http/errors'
import { COOKIES_KEYS } from '@/shared/cookies'
import { cookies } from '@/utils/cookies'

export function mapHttpError(error: unknown) {
  if (error instanceof DOMException && error.name === 'AbortError') {
    throw new TimeoutError()
  }

  if (error instanceof HttpError) {
    const shouldRemoveToken = error.status === 401 || error.status === 403
    if (shouldRemoveToken) {
      cookies.remove(COOKIES_KEYS.authToken)
    }
    throw new HttpError(error.message, error.status)
  }

  if (error instanceof Error) {
    throw new NetworkError(error.message)
  }

  throw new NetworkError('Erro desconhecido ao realizar requisição')
}

export function isUnauthorized(status: number) {
  return status === 401 || status === 403
}
