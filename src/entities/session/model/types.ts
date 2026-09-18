export interface SessionUser {
  id: number
  username: string
  role: string
}

export interface LoginResult {
  token: string
  expires_at: string
  user: SessionUser
}
