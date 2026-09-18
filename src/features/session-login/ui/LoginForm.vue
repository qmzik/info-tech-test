<script setup lang="ts">
import { ref } from 'vue'
import { toErrorMessages } from '@/shared/api'
import { ActionRow, BaseButton, BaseInput, ErrorList, FormField, FormLayout } from '@/shared/ui'
import { useSessionStore } from '@/entities/session'

const emit = defineEmits<{ (event: 'success'): void }>()

const session = useSessionStore()

const username = ref('')
const password = ref('')
const submitting = ref(false)
const errors = ref<string[]>([])

async function onSubmit(): Promise<void> {
  submitting.value = true
  errors.value = []

  try {
    await session.login(username.value, password.value)
    emit('success')
  } catch (error) {
    errors.value = toErrorMessages(error)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <FormLayout @submit="onSubmit">
    <ErrorList :messages="errors" />

    <FormField label="Логин" label-for="username">
      <BaseInput id="username" v-model="username" required autocomplete="username" />
    </FormField>

    <FormField label="Пароль" label-for="password">
      <BaseInput
        id="password"
        v-model="password"
        type="password"
        required
        autocomplete="current-password"
      />
    </FormField>

    <ActionRow>
      <BaseButton type="submit" :disabled="submitting">Войти</BaseButton>
      <slot name="actions" />
    </ActionRow>
  </FormLayout>
</template>
