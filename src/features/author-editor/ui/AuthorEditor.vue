<script setup lang="ts">
import { ref } from 'vue'
import { useApiErrors } from '@/shared/lib'
import { ActionRow, BaseButton, BaseInput, ErrorList, FormField, FormLayout } from '@/shared/ui'
import { createAuthor, updateAuthor } from '@/entities/author'
import type { Author } from '@/entities/author'

const props = defineProps<{ author: Author | null }>()

const emit = defineEmits<{ (event: 'saved', author: Author): void }>()

const fullName = ref(props.author?.full_name ?? '')
const submitting = ref(false)
const submitError = ref<unknown>(null)
const { commonMessages, fieldMessages } = useApiErrors(submitError)

async function onSubmit(): Promise<void> {
  const payload = { full_name: fullName.value }

  submitting.value = true
  submitError.value = null

  try {
    const saved = props.author
      ? await updateAuthor(props.author.id, payload)
      : await createAuthor(payload)
    emit('saved', saved)
  } catch (error) {
    submitError.value = error
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <FormLayout @submit="onSubmit">
    <ErrorList :messages="commonMessages" />

    <FormField label="ФИО автора" label-for="full-name" :errors="fieldMessages('full_name')">
      <BaseInput id="full-name" v-model="fullName" required minlength="3" maxlength="150" />
    </FormField>

    <ActionRow>
      <BaseButton type="submit" :disabled="submitting">Сохранить</BaseButton>
      <slot name="actions" />
    </ActionRow>
  </FormLayout>
</template>
