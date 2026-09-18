import { DEFAULT_PER_PAGE, RESPONSE_DELAY } from '@/shared/config'
import { readToken } from '@/shared/lib/auth-token'
import { ApiError } from '../error'
import type { PagedList } from '../types'

export function delay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, RESPONSE_DELAY))
}

export function requireAuth(): void {
  if (!readToken()) {
    throw new ApiError(401, [{ field: '', message: 'Требуется авторизация' }])
  }
}

export function paginate<T>(items: T[], page = 1, perPage = DEFAULT_PER_PAGE): PagedList<T> {
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const currentPage = Math.min(Math.max(1, page), totalPages)
  const start = (currentPage - 1) * perPage

  return {
    items: items.slice(start, start + perPage),
    pagination: {
      total,
      page: currentPage,
      per_page: perPage,
      total_pages: totalPages
    }
  }
}
