<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toErrorMessages } from '@/shared/api'
import { StatusMessage } from '@/shared/ui'
import { getBook } from '@/entities/book'
import type { Book } from '@/entities/book'
import { BookEditor } from '@/features/book-editor'

const route = useRoute()
const router = useRouter()

const bookId = computed(() => (route.params.id ? Number(route.params.id) : null))
const isEdit = computed(() => bookId.value !== null)

const book = ref<Book | null>(null)
const loading = ref(true)
const loadErrors = ref<string[]>([])
const ready = ref(false)

async function load(): Promise<void> {
  loading.value = true
  loadErrors.value = []

  try {
    if (bookId.value) {
      book.value = await getBook(bookId.value)
    }
    ready.value = true
  } catch (error) {
    loadErrors.value = toErrorMessages(error)
  } finally {
    loading.value = false
  }
}

function onSaved(saved: Book): void {
  router.push({ name: 'book', params: { id: saved.id } })
}

load()
</script>

<template>
  <h1>{{ isEdit ? 'Редактирование книги' : 'Новая книга' }}</h1>

  <StatusMessage :loading="loading" :errors="loadErrors" />

  <BookEditor v-if="ready" :book="book" @saved="onSaved">
    <template #actions>
      <RouterLink :to="isEdit && book ? { name: 'book', params: { id: book.id } } : { name: 'books' }">
        Отмена
      </RouterLink>
    </template>
  </BookEditor>
</template>
