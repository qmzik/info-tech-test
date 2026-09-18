import { authorSeed, bookSeed, subscriptionSeed } from './seed'
import type { AuthorRecord, BookRecord, SubscriptionRecord } from './records'

export const db = {
  authors: authorSeed.map((author) => ({ ...author })) as AuthorRecord[],
  books: bookSeed.map((book) => ({ ...book, author_ids: [...book.author_ids] })) as BookRecord[],
  subscriptions: subscriptionSeed.map((item) => ({ ...item })) as SubscriptionRecord[]
}

let nextAuthorId = Math.max(...db.authors.map((author) => author.id)) + 1
let nextBookId = Math.max(...db.books.map((book) => book.id)) + 1

export function takeAuthorId(): number {
  return nextAuthorId++
}

export function takeBookId(): number {
  return nextBookId++
}
