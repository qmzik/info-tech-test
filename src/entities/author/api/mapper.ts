import { db } from '@/shared/api/mock'
import type { AuthorRecord } from '@/shared/api/mock'
import type { Author, AuthorBook, AuthorShort } from '../model/types'

export function toAuthorShort(record: AuthorRecord): AuthorShort {
  return { id: record.id, full_name: record.full_name }
}

function booksOfAuthor(authorId: number): AuthorBook[] {
  return db.books
    .filter((book) => book.author_ids.includes(authorId))
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title, 'ru'))
    .map((book) => ({ id: book.id, title: book.title, year: book.year }))
}

export function toAuthor(record: AuthorRecord): Author {
  return {
    id: record.id,
    full_name: record.full_name,
    books: booksOfAuthor(record.id)
  }
}
