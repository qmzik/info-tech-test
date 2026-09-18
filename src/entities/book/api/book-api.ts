import { ApiError } from '@/shared/api'
import type { PagedList } from '@/shared/api'
import { buildCoverUrl, db, delay, paginate, requireAuth, takeBookId } from '@/shared/api/mock'
import type { BookRecord } from '@/shared/api/mock'
import { toBook } from './mapper'
import { resolveCover, validateBook } from './validation'
import type { Book, BookFormData, BookInput, BookListParams } from '../model/types'

function findBook(id: number): BookRecord {
  const book = db.books.find((item) => item.id === id)
  if (!book) {
    throw new ApiError(404, [{ field: '', message: 'Книга не найдена' }])
  }
  return book
}

export async function getBooks(params: BookListParams = {}): Promise<PagedList<Book>> {
  await delay()

  const search = params.search?.trim().toLowerCase() ?? ''
  const filtered = db.books
    .filter((book) => (params.author_id ? book.author_ids.includes(params.author_id) : true))
    .filter((book) => (params.year ? book.year === params.year : true))
    .filter((book) => {
      if (!search) {
        return true
      }
      return [book.title, book.description, book.isbn].join(' ').toLowerCase().includes(search)
    })
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title, 'ru'))

  const page = paginate(filtered, params.page, params.perPage)
  return { items: page.items.map(toBook), pagination: page.pagination }
}

export async function getBook(id: number): Promise<Book> {
  await delay()
  return toBook(findBook(id))
}

export async function createBook(form: BookFormData): Promise<Book> {
  await delay()
  requireAuth()
  validateBook(form, true)

  const record: BookRecord = {
    id: takeBookId(),
    title: form.title.trim(),
    year: Number(form.year),
    description: form.description.trim(),
    isbn: form.isbn.trim(),
    cover_url: resolveCover(form, '', true, () => buildCoverUrl(form.title, form.year)),
    author_ids: [...form.author_ids]
  }

  db.books.push(record)
  return toBook(record)
}

export async function updateBook(id: number, form: BookFormData): Promise<Book> {
  await delay()
  requireAuth()

  const record = findBook(id)
  validateBook(form, true)

  record.title = form.title.trim()
  record.year = Number(form.year)
  record.description = form.description.trim()
  record.isbn = form.isbn.trim()
  record.author_ids = [...form.author_ids]
  record.cover_url = resolveCover(form, record.cover_url, false, () =>
    buildCoverUrl(form.title, form.year)
  )

  return toBook(record)
}

export async function patchBook(id: number, input: BookInput): Promise<Book> {
  await delay()
  requireAuth()

  const record = findBook(id)
  validateBook(input, false)

  if (input.title !== undefined) {
    record.title = input.title.trim()
  }
  if (input.year !== undefined) {
    record.year = Number(input.year)
  }
  if (input.description !== undefined) {
    record.description = input.description.trim()
  }
  if (input.isbn !== undefined) {
    record.isbn = input.isbn.trim()
  }
  if (input.author_ids !== undefined) {
    record.author_ids = [...input.author_ids]
  }

  return toBook(record)
}

export async function deleteBook(id: number): Promise<void> {
  await delay()
  requireAuth()

  const record = findBook(id)
  db.books.splice(db.books.indexOf(record), 1)
}
