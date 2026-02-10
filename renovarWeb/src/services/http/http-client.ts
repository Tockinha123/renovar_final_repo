import { env } from '@/config/env'
import { COOKIES_KEYS } from '@/shared/cookies'
import { cookies } from '@/utils/cookies'
import { HttpError } from './errors'
import { mapHttpError } from './map-error'
import type { RequestOptions } from './types'

function buildUrl(path: string, params?: RequestOptions['params']) {
  const url = new URL(path, env.API_BASE_URL)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value))
      }
    })
  }

  return url.toString()
}

export async function httpClient<TResponse>(
  path: string,
  options: RequestOptions = {},
): Promise<TResponse> {
  const {
    method = 'GET',
    body,
    headers,
    timeout = 15000,
    params,
    ...rest
  } = options

  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  try {
    const token = cookies.get(COOKIES_KEYS.authToken)
    const response = await fetch(buildUrl(path, params), {
      method,
      signal: controller.signal,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
      body: body ? JSON.stringify(body) : undefined,
      ...rest,
    })

    const contentType = response.headers.get('content-type')
    const data = contentType?.includes('application/json')
      ? await response.json()
      : await response.text()

    if (!response.ok) {
      throw new HttpError(
        data?.message ?? 'Erro na requisição',
        response.status,
        data,
      )
    }

    return data as TResponse
  } catch (error: unknown) {
    mapHttpError(error)
    throw error
  } finally {
    clearTimeout(id)
  }
}
