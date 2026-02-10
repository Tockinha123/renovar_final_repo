import { ApiRoutes } from '@/shared/route'
import { httpClient } from '../http/http-client'
import type {
  AuthLoginResponse,
  AuthRegisterResponse,
  CreateUserDTO,
  LoginDTO,
} from './types'

export const authService = {
  registerUser({ data }: { data: CreateUserDTO }) {
    return httpClient<AuthRegisterResponse>(ApiRoutes.AUTH.REGISTER, {
      method: 'POST',
      body: data,
    })
  },

  login({ data }: { data: LoginDTO }) {
    return httpClient<AuthLoginResponse>(ApiRoutes.AUTH.LOGIN, {
      method: 'POST',
      body: data,
    })
  },
}
