import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import {
  clearStoredUser,
  clearToken,
  readStoredUser,
  readToken,
  writeStoredUser,
  writeToken
} from '@/shared/lib/auth-token'
import { login as loginRequest } from '../api/session-api'
import type { SessionUser } from './types'

export const useSessionStore = defineStore('session', () => {
  const token = ref<string | null>(readToken())
  const user = ref<SessionUser | null>(readStoredUser<SessionUser>())

  const isAuthenticated = computed(() => Boolean(token.value))
  const username = computed(() => user.value?.username ?? '')

  async function login(name: string, password: string): Promise<void> {
    const result = await loginRequest(name, password)
    token.value = result.token
    user.value = result.user
    writeToken(result.token)
    writeStoredUser(result.user)
  }

  function logout(): void {
    token.value = null
    user.value = null
    clearToken()
    clearStoredUser()
  }

  return { token, user, isAuthenticated, username, login, logout }
})
