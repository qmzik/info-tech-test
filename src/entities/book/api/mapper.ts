import { db } from '@/shared/api/mock'
import type { BookRecord } from '@/shared/api/mock'
import type { Book } from '../model/types'

export function toBook(record: BookRecord): Book {
  return {
    id: record.id,
    title: record.title,
    year: record.year,
    description: record.description,
    isbn: record.isbn,
    cover_url: record.cover_url,
    authors: record.author_ids
      .map((id) => db.authors.find((author) => author.id === id))
      .filter((author): author is { id: number; full_name: string } => Boolean(author))
      .map((author) => ({ id: author.id, full_name: author.full_name }))
  }
}
