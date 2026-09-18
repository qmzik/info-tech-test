<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toErrorMessages } from '@/shared/api'
import type { Pagination } from '@/shared/api'
import { ActionRow, HintText, PaginationNav, StatusMessage } from '@/shared/ui'
import { useSessionStore } from '@/entities/session'
import { AuthorsTable, getAuthors } from '@/entities/author'
import type { AuthorShort } from '@/entities/author'
import { AuthorSearch } from '@/features/author-search'

const route = useRoute()
const router = useRouter()
const session = useSessionStore()

const authors = ref<AuthorShort[]>([])
const pagination = ref<Pagination | null>(null)
const loading = ref(false)
const errors = ref<string[]>([])
const search = ref('')

async function load(): Promise<void> {
  loading.value = true
  errors.value = []

  try {
    const page = Number(route.query.page)
    const result = await getAuthors({
      page: Number.isFinite(page) && page > 0 ? page : 1,
      search: search.value || undefined
    })
    authors.value = result.items
    pagination.value = result.pagination
  } catch (error) {
    authors.value = []
    pagination.value = null
    errors.value = toErrorMessages(error)
  } finally {
    loading.value = false
  }
}

function applySearch(value: string): void {
  router.push({
    name: 'authors',
    query: { ...(value ? { search: value } : {}), page: 1 }
  })
}

function resetSearch(): void {
  router.push({ name: 'authors' })
}

function changePage(page: number): void {
  router.push({ name: 'authors', query: { ...route.query, page } })
}

watch(
  () => route.query,
  () => {
    search.value = typeof route.query.search === 'string' ? route.query.search : ''
    load()
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <h1>Авторы</h1>

  <ActionRow class="authors-page__actions">
    <RouterLink v-if="session.isAuthenticated" :to="{ name: 'author-create' }">
      Добавить автора
    </RouterLink>
    <HintText v-else>Войдите, чтобы добавлять и редактировать авторов</HintText>
  </ActionRow>

  <AuthorSearch :model-value="search" @apply="applySearch" @reset="resetSearch" />

  <StatusMessage
    :loading="loading"
    :errors="errors"
    :is-empty="authors.length === 0"
    empty-text="Авторы не найдены"
  />

  <AuthorsTable v-if="!loading && authors.length" :authors="authors" />

  <PaginationNav :pagination="pagination" @change="changePage" />
</template>

<style scoped>
.authors-page__actions {
  margin-bottom: 16px;
}
</style>
