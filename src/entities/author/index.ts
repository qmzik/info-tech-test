export {
  createAuthor,
  deleteAuthor,
  findAuthorRecord,
  getAuthor,
  getAuthors,
  getTopAuthors,
  updateAuthor
} from './api/author-api'
export { default as AuthorBooksTable } from './ui/AuthorBooksTable.vue'
export { default as AuthorsTable } from './ui/AuthorsTable.vue'
export { default as TopAuthorsTable } from './ui/TopAuthorsTable.vue'
export type {
  Author,
  AuthorBook,
  AuthorInput,
  AuthorListParams,
  AuthorShort,
  TopAuthor,
  TopAuthorsReport
} from './model/types'
