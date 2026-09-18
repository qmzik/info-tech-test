export interface ErrorItem {
  field: string
  message: string
}

export interface Pagination {
  total: number
  page: number
  per_page: number
  total_pages: number
}

export interface PagedList<T> {
  items: T[]
  pagination: Pagination
}

export interface PageParams {
  page?: number
  perPage?: number
}
