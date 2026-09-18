<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toErrorMessages } from '@/shared/api'
import { StatusMessage } from '@/shared/ui'
import { getAuthor } from '@/entities/author'
import type { Author } from '@/entities/author'
import { AuthorEditor } from '@/features/author-editor'

const route = useRoute()
const router = useRouter()

const authorId = computed(() => (route.params.id ? Number(route.params.id) : null))
const isEdit = computed(() => authorId.value !== null)

const author = ref<Author | null>(null)
const loading = ref(true)
const loadErrors = ref<string[]>([])
const ready = ref(false)

async function load(): Promise<void> {
  loading.value = true
  loadErrors.value = []

  try {
    if (authorId.value) {
      author.value = await getAuthor(authorId.value)
    }
    ready.value = true
  } catch (error) {
    loadErrors.value = toErrorMessages(error)
  } finally {
    loading.value = false
  }
}

function onSaved(saved: Author): void {
  router.push({ name: 'author', params: { id: saved.id } })
}

load()
</script>

<template>
  <h1>{{ isEdit ? 'Редактирование автора' : 'Новый автор' }}</h1>

  <StatusMessage :loading="loading" :errors="loadErrors" />

  <AuthorEditor v-if="ready" :author="author" @saved="onSaved">
    <template #actions>
      <RouterLink
        :to="isEdit && author ? { name: 'author', params: { id: author.id } } : { name: 'authors' }"
      >
        Отмена
      </RouterLink>
    </template>
  </AuthorEditor>
</template>
