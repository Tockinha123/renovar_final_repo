export const RISK_LEVEL = {
  EXCELENTE: 'EXCELENTE',
  BOM: 'BOM',
  REGULAR: 'REGULAR',
  ALTO_RISCO: 'ALTO_RISCO',
} as const

export const RISK_LEVEL_COLOR = {
  [RISK_LEVEL.EXCELENTE]: '#009580',
  [RISK_LEVEL.BOM]: '#22c55e',
  [RISK_LEVEL.REGULAR]: '#eab308',
  [RISK_LEVEL.ALTO_RISCO]: '#ef4444',
}

interface InfoUserResponseDTO {
  name: string
  currentScore: number
  riskLevel: keyof typeof RISK_LEVEL
  diasLimpos: number
  economiaAcumulada: number
  horasSalvas: number
  cleanDaysStreak: number
}

export type { InfoUserResponseDTO }
