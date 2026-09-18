<script setup lang="ts">
import type { Pagination } from '@/shared/api'
import BaseButton from '../base-button/BaseButton.vue'

const props = defineProps<{ pagination: Pagination | null }>()
const emit = defineEmits<{ (event: 'change', page: number): void }>()

function goTo(page: number): void {
  if (!props.pagination) {
    return
  }
  if (page < 1 || page > props.pagination.total_pages || page === props.pagination.page) {
    return
  }
  emit('change', page)
}
</script>

<template>
  <div v-if="pagination && pagination.total > 0" class="pagination-nav">
    <BaseButton :disabled="pagination.page <= 1" @click="goTo(pagination.page - 1)">
      Назад
    </BaseButton>
    <span>Страница {{ pagination.page }} из {{ pagination.total_pages }}</span>
    <BaseButton
      :disabled="pagination.page >= pagination.total_pages"
      @click="goTo(pagination.page + 1)"
    >
      Вперёд
    </BaseButton>
    <span>Всего: {{ pagination.total }}</span>
  </div>
</template>

<style scoped>
.pagination-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
  color: var(--muted);
}
</style>
