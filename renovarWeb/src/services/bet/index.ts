import { ApiRoutes } from '@/shared/route'
import { httpClient } from '../http/http-client'

export type RecentBetsResponseDTO = {
  content: {
    id: string
    amount: number
    won: boolean
    category: string
    date: string
  }[]
}

export const BET_CATEGORIES = {
  CASSINO: 'CASSINO',
  ESPORTES: 'ESPORTES',
  CARTAS: 'CARTAS',
  OUTROS: 'OUTROS',
} as const

export const BET_SESSION_TIMES = {
  FIVE_MINUTES: 'FIVE_MINUTES',
  FIFTEEN_MINUTES: 'FIFTEEN_MINUTES',
  THIRTY_MINUTES: 'THIRTY_MINUTES',
  SIXTY_PLUS_MINUTES: 'SIXTY_PLUS_MINUTES',
} as const

export const DAY_STATUS = {
  LIMPO: 'LIMPO',
  APOSTOU: 'APOSTOU',
  FUTURO: 'FUTURO',
} as const

export type CreateBetDTO = {
  amount: number
  won: boolean
  category: keyof typeof BET_CATEGORIES
  sessionTime: keyof typeof BET_SESSION_TIMES
}

export type GetBetDaysDTO = {
  year: number
  month: number
}

export type GetBetDaysResponseDTO = {
  date: string
  status: keyof typeof DAY_STATUS
}

export const betService = {
  recentBets() {
    return httpClient<RecentBetsResponseDTO>(ApiRoutes.BET.RECENT_BETS, {
      method: 'GET',
      params: {
        page: 0,
        size: 3,
      },
    })
  },
  createBet(data: CreateBetDTO) {
    return httpClient<null>(ApiRoutes.BET.CREATE_BET, {
      method: 'POST',
      body: data,
    })
  },
  getBetDays(data: GetBetDaysDTO) {
    return httpClient<GetBetDaysResponseDTO[]>(ApiRoutes.BET.BET_DAYS, {
      method: 'GET',
      params: {
        year: String(data.year),
        month: String(data.month),
      },
    })
  },
}
