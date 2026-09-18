import { ApiError } from '@/shared/api'
import type { PagedList } from '@/shared/api'
import { db, delay, paginate, requireAuth, takeAuthorId } from '@/shared/api/mock'
import type { AuthorRecord } from '@/shared/api/mock'
import { MIN_CATALOG_YEAR } from '@/shared/config'
import { maxCatalogYear } from '@/shared/lib/date'
import { toAuthor, toAuthorShort } from './mapper'
import { validateAuthor } from './validation'
import type {
  Author,
  AuthorInput,
  AuthorListParams,
  AuthorShort,
  TopAuthorsReport
} from '../model/types'

const TOP_AUTHORS_LIMIT = 10

export function findAuthorRecord(id: number): AuthorRecord {
  const author = db.authors.find((item) => item.id === id)
  if (!author) {
    throw new ApiError(404, [{ field: '', message: 'Автор не найден' }])
  }
  return author
}

export async function getAuthors(params: AuthorListParams = {}): Promise<PagedList<AuthorShort>> {
  await delay()

  const search = params.search?.trim().toLowerCase() ?? ''
  const filtered = db.authors
    .filter((author) => (search ? author.full_name.toLowerCase().includes(search) : true))
    .sort((a, b) => a.full_name.localeCompare(b.full_name, 'ru'))

  const page = paginate(filtered, params.page, params.perPage)
  return { items: page.items.map(toAuthorShort), pagination: page.pagination }
}

export async function getAuthor(id: number): Promise<Author> {
  await delay()
  return toAuthor(findAuthorRecord(id))
}

export async function createAuthor(input: AuthorInput): Promise<Author> {
  await delay()
  requireAuth()
  validateAuthor(input)

  const record: AuthorRecord = { id: takeAuthorId(), full_name: input.full_name.trim() }
  db.authors.push(record)

  return toAuthor(record)
}

export async function updateAuthor(id: number, input: AuthorInput): Promise<Author> {
  await delay()
  requireAuth()

  const record = findAuthorRecord(id)
  validateAuthor(input, id)
  record.full_name = input.full_name.trim()

  return toAuthor(record)
}

export async function deleteAuthor(id: number): Promise<void> {
  await delay()
  requireAuth()

  const record = findAuthorRecord(id)
  const linkedBooks = db.books.filter((book) => book.author_ids.includes(id))

  if (linkedBooks.some((book) => book.author_ids.length === 1)) {
    throw new ApiError(422, [
      { field: '', message: 'Нельзя удалить автора: есть книги, где он единственный автор' }
    ])
  }

  linkedBooks.forEach((book) => {
    book.author_ids = book.author_ids.filter((authorId) => authorId !== id)
  })

  db.authors.splice(db.authors.indexOf(record), 1)
}

export async function getTopAuthors(year: number): Promise<TopAuthorsReport> {
  await delay()

  if (!year || year < MIN_CATALOG_YEAR || year > maxCatalogYear()) {
    throw new ApiError(400, [{ field: 'year', message: 'Укажите корректный год' }])
  }

  const counters = new Map<number, number>()
  db.books
    .filter((book) => book.year === year)
    .forEach((book) => {
      book.author_ids.forEach((authorId) => {
        counters.set(authorId, (counters.get(authorId) ?? 0) + 1)
      })
    })

  const items = [...counters.entries()]
    .map(([authorId, booksCount]) => ({
      author_id: authorId,
      full_name: db.authors.find((author) => author.id === authorId)?.full_name ?? 'Неизвестный автор',
      books_count: booksCount
    }))
    .sort((a, b) => b.books_count - a.books_count || a.full_name.localeCompare(b.full_name, 'ru'))
    .slice(0, TOP_AUTHORS_LIMIT)
    .map((item, index) => ({ rank: index + 1, ...item }))

  return { year, items }
}
