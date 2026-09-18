import { ApiError } from '@/shared/api'
import type { ErrorItem } from '@/shared/api'
import { db } from '@/shared/api/mock'
import type { AuthorInput } from '../model/types'

export function validateAuthor(input: AuthorInput, excludeId?: number): void {
  const errors: ErrorItem[] = []
  const fullName = input.full_name?.trim() ?? ''

  if (!fullName) {
    errors.push({ field: 'full_name', message: 'Укажите ФИО автора' })
  } else if (fullName.length < 3) {
    errors.push({ field: 'full_name', message: 'ФИО должно содержать минимум 3 символа' })
  } else if (
    db.authors.some(
      (author) => author.id !== excludeId && author.full_name.toLowerCase() === fullName.toLowerCase()
    )
  ) {
    errors.push({ field: 'full_name', message: 'Такой автор уже есть в каталоге' })
  }

  if (errors.length) {
    throw new ApiError(422, errors)
  }
}
