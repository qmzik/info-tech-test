import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '@/shared/config'

export function readToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY)
}

export function writeToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY)
}

export function readStoredUser<T>(): T | null {
  const raw = localStorage.getItem(USER_STORAGE_KEY)
  if (!raw) {
    return null
  }
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function writeStoredUser(user: unknown): void {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export function clearStoredUser(): void {
  localStorage.removeItem(USER_STORAGE_KEY)
}
