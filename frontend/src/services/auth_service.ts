import api from './api'
import type { LoginRequest, LoginResponse, SignupDTO} from '../types/auth/auth'

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post('/api/v1/auth/login', data)
    return response.data
  },

  async signup(data: SignupDTO): Promise<LoginResponse> {
    const response = await api.post('/api/v1/users', data)
    return response.data
  }
}