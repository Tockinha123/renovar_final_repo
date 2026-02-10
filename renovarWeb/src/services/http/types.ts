type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RequestOptions extends Omit<RequestInit, 'body' | 'method'> {
  method?: HttpMethod
  body?: unknown
  timeout?: number // ms
  params?: Record<string, string | number | boolean | undefined>
  skipAuth?: boolean
}

export type { RequestOptions, HttpMethod }
