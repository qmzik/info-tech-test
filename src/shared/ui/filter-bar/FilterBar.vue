<script setup lang="ts">
const emit = defineEmits<{ (event: 'submit'): void }>()
</script>

<template>
  <form class="filter-bar" @submit.prevent="emit('submit')">
    <slot />
  </form>
</template>

<style scoped>
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: flex-end;
  margin-bottom: 16px;
}
</style>
