<script setup lang="ts">
import { ref, watch } from 'vue'
import { toErrorMessages } from '@/shared/api'
import {
  ActionRow,
  BaseButton,
  BaseInput,
  ErrorList,
  FormField,
  FormLayout,
  NoticeBox
} from '@/shared/ui'
import { subscribeToAuthor } from '../api/subscribe-api'

const props = defineProps<{ authorId: number }>()

const phone = ref('')
const submitting = ref(false)
const errors = ref<string[]>([])
const successMessage = ref('')

watch(
  () => props.authorId,
  () => {
    phone.value = ''
    errors.value = []
    successMessage.value = ''
  }
)

async function onSubmit(): Promise<void> {
  submitting.value = true
  errors.value = []
  successMessage.value = ''

  try {
    const result = await subscribeToAuthor(props.authorId, phone.value)
    successMessage.value = result.message
    phone.value = ''
  } catch (error) {
    errors.value = toErrorMessages(error)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <FormLayout @submit="onSubmit">
    <fieldset class="subscribe-form">
      <legend>Подписка на новые книги автора</legend>

      <NoticeBox v-if="successMessage" variant="success">{{ successMessage }}</NoticeBox>
      <ErrorList :messages="errors" />

      <FormField
        label="Номер телефона"
        label-for="phone"
        hint="Уведомление о новой книге придёт по SMS."
      >
        <BaseInput
          id="phone"
          v-model="phone"
          type="tel"
          required
          placeholder="+79991234567"
          pattern="\+?[78][0-9]{10}"
        />
      </FormField>

      <ActionRow>
        <BaseButton type="submit" :disabled="submitting">Подписаться</BaseButton>
      </ActionRow>
    </fieldset>
  </FormLayout>
</template>

<style scoped>
.subscribe-form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  margin: 0;
  padding: 12px;
  border: 1px solid var(--border);
}

.subscribe-form legend {
  padding: 0 4px;
  font-weight: 600;
}
</style>
