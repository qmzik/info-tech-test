<script setup lang="ts">
const emit = defineEmits<{ (event: 'submit'): void }>()
</script>

<template>
  <form class="form-layout" @submit.prevent="emit('submit')">
    <slot />
  </form>
</template>

<style scoped>
.form-layout {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  margin-bottom: 16px;
}
</style>
