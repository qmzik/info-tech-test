import { ApiError } from '@/shared/api'
import { delay } from '@/shared/api/mock'
import { DEMO_CREDENTIALS } from '@/shared/config'
import type { LoginResult } from '../model/types'

export async function login(username: string, password: string): Promise<LoginResult> {
  await delay()

  if (username.trim() !== DEMO_CREDENTIALS.username || password !== DEMO_CREDENTIALS.password) {
    throw new ApiError(401, [{ field: '', message: 'Неверный логин или пароль' }])
  }

  return {
    token: `token-${Date.now().toString(36)}`,
    expires_at: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    user: { id: 1, username: DEMO_CREDENTIALS.username, role: 'user' }
  }
}
