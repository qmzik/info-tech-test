<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toErrorMessages } from '@/shared/api'
import { ActionRow, StatusMessage } from '@/shared/ui'
import { useSessionStore } from '@/entities/session'
import { BookCard, getBook } from '@/entities/book'
import type { Book } from '@/entities/book'
import { DeleteBookButton } from '@/features/book-delete'

const route = useRoute()
const router = useRouter()
const session = useSessionStore()

const book = ref<Book | null>(null)
const loading = ref(false)
const errors = ref<string[]>([])

async function load(): Promise<void> {
  loading.value = true
  errors.value = []

  try {
    book.value = await getBook(Number(route.params.id))
  } catch (error) {
    book.value = null
    errors.value = toErrorMessages(error)
  } finally {
    loading.value = false
  }
}

function onDeleted(): void {
  router.push({ name: 'books' })
}

function onDeleteFailed(messages: string[]): void {
  errors.value = messages
}

watch(() => route.params.id, load, { immediate: true })
</script>

<template>
  <StatusMessage :loading="loading" :errors="errors" />

  <template v-if="book">
    <h1>{{ book.title }}</h1>

    <ActionRow class="book-details__actions">
      <RouterLink :to="{ name: 'books' }">К списку книг</RouterLink>
      <template v-if="session.isAuthenticated">
        <RouterLink :to="{ name: 'book-edit', params: { id: book.id } }">Редактировать</RouterLink>
        <DeleteBookButton :book="book" @deleted="onDeleted" @failed="onDeleteFailed" />
      </template>
    </ActionRow>

    <BookCard :book="book" />
  </template>
</template>

<style scoped>
.book-details__actions {
  margin-bottom: 16px;
}
</style>
