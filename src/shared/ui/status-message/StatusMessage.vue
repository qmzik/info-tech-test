<script setup lang="ts">
import ErrorList from '../error-list/ErrorList.vue'
import HintText from '../hint-text/HintText.vue'

withDefaults(
  defineProps<{
    loading: boolean
    errors: string[]
    isEmpty?: boolean
    emptyText?: string
  }>(),
  {
    isEmpty: false,
    emptyText: 'Ничего не найдено'
  }
)
</script>

<template>
  <div v-if="loading || errors.length || isEmpty" class="status-message">
    <HintText v-if="loading">Загрузка…</HintText>
    <ErrorList v-else-if="errors.length" :messages="errors" />
    <HintText v-else-if="isEmpty">{{ emptyText }}</HintText>
  </div>
</template>

<style scoped>
.status-message {
  margin-bottom: 16px;
}
</style>
