interface CreateUserDTO {
  email: string
  name: string
  password: string
  birthDate: string
  sessionTimeBaseline: number
  financialBaseline: number
}

interface LoginDTO {
  email: string
  password: string
}

interface UserData {
  email: string
  name: string
}

type AuthLoginResponse = UserData & {
  token: string
}

type AuthRegisterResponse = UserData & {
  token: string
}

export type {
  CreateUserDTO,
  LoginDTO,
  AuthLoginResponse,
  AuthRegisterResponse,
  UserData,
}
