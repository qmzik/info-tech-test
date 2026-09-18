import type { ErrorItem } from './types'

export class ApiError extends Error {
  readonly status: number
  readonly errors: ErrorItem[]

  constructor(status: number, errors: ErrorItem[]) {
    super(errors[0]?.message ?? 'Ошибка запроса')
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }

  fieldMessages(field: string): string[] {
    return this.errors.filter((item) => item.field === field).map((item) => item.message)
  }

  get commonMessages(): string[] {
    return this.errors.filter((item) => !item.field).map((item) => item.message)
  }
}

export function toErrorMessages(error: unknown): string[] {
  if (error instanceof ApiError) {
    return error.errors.map((item) => item.message)
  }
  if (error instanceof Error) {
    return [error.message]
  }
  return ['Неизвестная ошибка']
}
