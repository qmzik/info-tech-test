import type { PageParams } from '@/shared/api'

export interface AuthorShort {
  id: number
  full_name: string
}

export interface AuthorBook {
  id: number
  title: string
  year: number
}

export interface Author {
  id: number
  full_name: string
  books: AuthorBook[]
}

export interface AuthorListParams extends PageParams {
  search?: string
}

export interface AuthorInput {
  full_name: string
}

export interface TopAuthor {
  rank: number
  author_id: number
  full_name: string
  books_count: number
}

export interface TopAuthorsReport {
  year: number
  items: TopAuthor[]
}
