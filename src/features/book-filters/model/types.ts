export interface BookFilterValues {
  search: string
  author_id: number | ''
  year: number | ''
}

export function emptyBookFilters(): BookFilterValues {
  return { search: '', author_id: '', year: '' }
}
