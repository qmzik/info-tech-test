<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toErrorMessages } from '@/shared/api'
import type { Pagination } from '@/shared/api'
import { ActionRow, HintText, PaginationNav, StatusMessage } from '@/shared/ui'
import { useSessionStore } from '@/entities/session'
import { BooksTable, getBooks } from '@/entities/book'
import type { Book } from '@/entities/book'
import { BookFilters, emptyBookFilters } from '@/features/book-filters'
import type { BookFilterValues } from '@/features/book-filters'

const route = useRoute()
const router = useRouter()
const session = useSessionStore()

const books = ref<Book[]>([])
const pagination = ref<Pagination | null>(null)
const loading = ref(false)
const errors = ref<string[]>([])
const filters = ref<BookFilterValues>(emptyBookFilters())

function queryNumber(value: unknown): number | '' {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : ''
}

function syncFiltersFromQuery(): void {
  filters.value = {
    search: typeof route.query.search === 'string' ? route.query.search : '',
    author_id: queryNumber(route.query.author_id),
    year: queryNumber(route.query.year)
  }
}

async function loadBooks(): Promise<void> {
  loading.value = true
  errors.value = []

  try {
    const result = await getBooks({
      page: queryNumber(route.query.page) || 1,
      search: filters.value.search || undefined,
      author_id: filters.value.author_id || undefined,
      year: filters.value.year || undefined
    })
    books.value = result.items
    pagination.value = result.pagination
  } catch (error) {
    books.value = []
    pagination.value = null
    errors.value = toErrorMessages(error)
  } finally {
    loading.value = false
  }
}

function applyFilters(value: BookFilterValues): void {
  router.push({
    name: 'books',
    query: {
      ...(value.search ? { search: value.search } : {}),
      ...(value.author_id ? { author_id: value.author_id } : {}),
      ...(value.year ? { year: value.year } : {}),
      page: 1
    }
  })
}

function resetFilters(): void {
  router.push({ name: 'books' })
}

function changePage(page: number): void {
  router.push({ name: 'books', query: { ...route.query, page } })
}

watch(
  () => route.query,
  () => {
    syncFiltersFromQuery()
    loadBooks()
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <h1>Каталог книг</h1>

  <ActionRow class="books-page__actions">
    <RouterLink v-if="session.isAuthenticated" :to="{ name: 'book-create' }">
      Добавить книгу
    </RouterLink>
    <HintText v-else>Войдите, чтобы добавлять и редактировать книги.</HintText>
  </ActionRow>

  <BookFilters :model-value="filters" @apply="applyFilters" @reset="resetFilters" />

  <StatusMessage
    :loading="loading"
    :errors="errors"
    :is-empty="books.length === 0"
    empty-text="Книги не найдены"
  />

  <BooksTable v-if="!loading && books.length" :books="books" />

  <PaginationNav :pagination="pagination" @change="changePage" />
</template>

<style scoped>
.books-page__actions {
  margin-bottom: 16px;
}
</style>
