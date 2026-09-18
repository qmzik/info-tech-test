import { ApiError, sendSms } from '@/shared/api'
import { db, delay } from '@/shared/api/mock'
import { PHONE_PATTERN } from '@/shared/config'
import { findAuthorRecord } from '@/entities/author'
import type { Subscription } from '../model/types'

export async function subscribeToAuthor(authorId: number, phone: string): Promise<Subscription> {
  await delay()

  const author = findAuthorRecord(authorId)
  const normalizedPhone = phone.replace(/[\s()-]/g, '')

  if (!PHONE_PATTERN.test(normalizedPhone)) {
    throw new ApiError(422, [{ field: 'phone', message: 'Введите номер в формате +79991234567' }])
  }

  const isDuplicate = db.subscriptions.some(
    (item) => item.author_id === authorId && item.phone === normalizedPhone
  )
  if (isDuplicate) {
    throw new ApiError(422, [{ field: 'phone', message: 'Этот номер уже подписан на автора' }])
  }

  db.subscriptions.push({ author_id: authorId, phone: normalizedPhone })

  const text = `Вы подписались на новинки автора ${author.full_name}. Каталог книг.`
  const result = await sendSms(normalizedPhone.replace(/^\+/, ''), text)
  const status = result.sent ? 'SMS отправлена' : 'SMS поставлена в очередь'

  return {
    author_id: authorId,
    phone: normalizedPhone,
    message: `Подписка оформлена. ${status} на номер ${normalizedPhone}: «${text}»`
  }
}
