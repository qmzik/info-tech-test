import { ApiError } from '@/shared/api'
import { db } from '@/shared/api/mock'
import type { ErrorItem } from '@/shared/api'
import { MIN_CATALOG_YEAR } from '@/shared/config'
import { maxCatalogYear } from '@/shared/lib/date'
import type { BookFormData, BookInput } from '../model/types'

export function validateBook(payload: BookInput, requireAll: boolean): void {
  const errors: ErrorItem[] = []
  const maxYear = maxCatalogYear()

  if (requireAll || payload.title !== undefined) {
    if (!payload.title?.trim()) {
      errors.push({ field: 'title', message: 'Укажите название книги' })
    }
  }

  if (requireAll || payload.year !== undefined) {
    const year = Number(payload.year)
    if (!year || year < MIN_CATALOG_YEAR || year > maxYear) {
      errors.push({
        field: 'year',
        message: `Год выпуска должен быть в диапазоне ${MIN_CATALOG_YEAR}-${maxYear}`
      })
    }
  }

  if (requireAll || payload.author_ids !== undefined) {
    if (!payload.author_ids?.length) {
      errors.push({ field: 'author_ids', message: 'Выберите хотя бы одного автора' })
    } else if (payload.author_ids.some((id) => !db.authors.some((author) => author.id === id))) {
      errors.push({ field: 'author_ids', message: 'Выбран несуществующий автор' })
    }
  }

  if (payload.isbn) {
    const symbols = payload.isbn.replace(/[^\dXx]/g, '')
    if (symbols.length !== 10 && symbols.length !== 13) {
      errors.push({ field: 'isbn', message: 'ISBN должен содержать 10 или 13 символов' })
    }
  }

  if (errors.length) {
    throw new ApiError(422, errors)
  }
}

export function resolveCover(
  form: BookFormData,
  currentCover: string,
  coverRequired: boolean,
  buildFallback: () => string
): string {
  if (form.cover) {
    return URL.createObjectURL(form.cover)
  }
  if (coverRequired && !currentCover) {
    throw new ApiError(422, [{ field: 'cover', message: 'Загрузите обложку книги' }])
  }
  return currentCover || buildFallback()
}
