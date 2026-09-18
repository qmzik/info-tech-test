<script setup lang="ts">
import { ref } from 'vue'
import { toErrorMessages } from '@/shared/api'
import { BaseButton, ConfirmDialog } from '@/shared/ui'
import { deleteBook } from '@/entities/book'
import type { Book } from '@/entities/book'

const props = defineProps<{ book: Book }>()

const emit = defineEmits<{
  (event: 'deleted'): void
  (event: 'failed', messages: string[]): void
}>()

const confirmOpen = ref(false)
const removing = ref(false)

async function remove(): Promise<void> {
  removing.value = true

  try {
    await deleteBook(props.book.id)
    confirmOpen.value = false
    emit('deleted')
  } catch (error) {
    confirmOpen.value = false
    emit('failed', toErrorMessages(error))
  } finally {
    removing.value = false
  }
}
</script>

<template>
  <BaseButton variant="danger" @click="confirmOpen = true">Удалить</BaseButton>

  <ConfirmDialog
    :open="confirmOpen"
    :busy="removing"
    title="Удаление книги"
    :message="`Удалить книгу «${book.title}»?`"
    @confirm="remove"
    @cancel="confirmOpen = false"
  />
</template>
