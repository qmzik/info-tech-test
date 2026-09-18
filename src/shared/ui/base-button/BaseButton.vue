<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    variant?: 'default' | 'danger'
    disabled?: boolean
  }>(),
  {
    type: 'button',
    variant: 'default',
    disabled: false
  }
)
</script>

<template>
  <button :type="type" :class="['base-button', `base-button--${variant}`]" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  padding: 5px 12px;
  border: 1px solid var(--border);
  cursor: pointer;
}

.base-button:disabled {
  color: var(--muted);
  cursor: not-allowed;
}

.base-button--danger:not(:disabled) {
  color: var(--danger);
}
</style>
