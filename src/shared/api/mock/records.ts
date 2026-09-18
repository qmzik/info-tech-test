export interface AuthorRecord {
  id: number
  full_name: string
}

export interface BookRecord {
  id: number
  title: string
  year: number
  description: string
  isbn: string
  cover_url: string
  author_ids: number[]
}

export interface SubscriptionRecord {
  author_id: number
  phone: string
}
