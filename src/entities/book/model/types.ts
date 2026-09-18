import type { PageParams } from '@/shared/api'

export interface BookAuthor {
  id: number
  full_name: string
}

export interface Book {
  id: number
  title: string
  year: number
  description: string
  isbn: string
  cover_url: string
  authors: BookAuthor[]
}

export interface BookListParams extends PageParams {
  author_id?: number
  year?: number
  search?: string
}

export interface BookFormData {
  title: string
  year: number
  description: string
  isbn: string
  author_ids: number[]
  cover: File | null
}

export interface BookInput {
  title?: string
  year?: number
  description?: string
  isbn?: string
  author_ids?: number[]
}
