<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toErrorMessages } from '@/shared/api'
import { ActionRow, StatusMessage } from '@/shared/ui'
import { useSessionStore } from '@/entities/session'
import { AuthorBooksTable, getAuthor } from '@/entities/author'
import type { Author } from '@/entities/author'
import { DeleteAuthorButton } from '@/features/author-delete'
import { SubscribeForm } from '@/features/author-subscribe'

const route = useRoute()
const router = useRouter()
const session = useSessionStore()

const author = ref<Author | null>(null)
const loading = ref(false)
const errors = ref<string[]>([])

async function load(): Promise<void> {
  loading.value = true
  errors.value = []

  try {
    author.value = await getAuthor(Number(route.params.id))
  } catch (error) {
    author.value = null
    errors.value = toErrorMessages(error)
  } finally {
    loading.value = false
  }
}

function onDeleted(): void {
  router.push({ name: 'authors' })
}

function onDeleteFailed(messages: string[]): void {
  errors.value = messages
}

watch(() => route.params.id, load, { immediate: true })
</script>

<template>
  <StatusMessage :loading="loading" :errors="errors" />

  <template v-if="author">
    <h1>{{ author.full_name }}</h1>

    <ActionRow class="author-details__actions">
      <RouterLink :to="{ name: 'authors' }">К списку авторов</RouterLink>
      <template v-if="session.isAuthenticated">
        <RouterLink :to="{ name: 'author-edit', params: { id: author.id } }">
          Редактировать
        </RouterLink>
        <DeleteAuthorButton :author="author" @deleted="onDeleted" @failed="onDeleteFailed" />
      </template>
    </ActionRow>

    <h2>Книги автора</h2>
    <AuthorBooksTable :books="author.books" />

    <SubscribeForm :author-id="author.id" />
  </template>
</template>

<style scoped>
.author-details__actions {
  margin-bottom: 16px;
}
</style>
