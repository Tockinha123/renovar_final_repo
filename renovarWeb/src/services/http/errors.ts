export class HttpError extends Error {
  status: number
  data?: unknown

  constructor(message: string, status: number, data?: unknown) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.data = data
  }
}

export class NetworkError extends Error {
  constructor(message = 'Erro de rede') {
    super(message)
    this.name = 'NetworkError'
  }
}

export class TimeoutError extends Error {
  constructor(message = 'Tempo de requisição excedido') {
    super(message)
    this.name = 'TimeoutError'
  }
}
