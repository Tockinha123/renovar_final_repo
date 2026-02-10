const ApiRoutes = {
  AUTH: {
    REGISTER: 'auth/register',
    LOGIN: 'auth/login',
  },
  USER: {
    DASHBOARD: 'dashboard',
    ME: 'me',
  },
  BET: {
    RECENT_BETS: 'bets',
    CREATE_BET: 'bets',
    BET_DAYS: 'bets/calendar',
  },
  ASSESSMENTS: {
    DAILY: 'assessments/daily',
    MONTHLY: 'assessments/monthly',
  },
} as const

export { ApiRoutes }
