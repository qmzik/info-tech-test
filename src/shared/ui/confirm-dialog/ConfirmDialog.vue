<script setup lang="ts">
import { ref, watch } from 'vue'
import ActionRow from '../action-row/ActionRow.vue'
import BaseButton from '../base-button/BaseButton.vue'

const props = withDefaults(
  defineProps<{
    open: boolean
    title: string
    message: string
    busy?: boolean
    confirmText?: string
    cancelText?: string
  }>(),
  {
    busy: false,
    confirmText: 'Удалить',
    cancelText: 'Отмена'
  }
)

const emit = defineEmits<{
  (event: 'confirm'): void
  (event: 'cancel'): void
}>()

const dialog = ref<HTMLDialogElement | null>(null)

watch(
  () => props.open,
  (open) => {
    if (!dialog.value) {
      return
    }
    if (open && !dialog.value.open) {
      dialog.value.showModal()
    }
    if (!open && dialog.value.open) {
      dialog.value.close()
    }
  }
)
</script>

<template>
  <dialog ref="dialog" class="confirm-dialog" @cancel.prevent="emit('cancel')">
    <h2>{{ title }}</h2>
    <p>{{ message }}</p>
    <ActionRow>
      <BaseButton variant="danger" :disabled="busy" @click="emit('confirm')">
        {{ confirmText }}
      </BaseButton>
      <BaseButton :disabled="busy" @click="emit('cancel')">{{ cancelText }}</BaseButton>
    </ActionRow>
  </dialog>
</template>

<style scoped>
.confirm-dialog {
  max-width: 420px;
  padding: 16px;
  border: 1px solid var(--border);
}

.confirm-dialog::backdrop {
  background: rgba(0, 0, 0, 0.35);
}

.confirm-dialog h2 {
  margin-top: 0;
}
</style>
