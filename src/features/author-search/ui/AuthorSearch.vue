<script setup lang="ts">
import { ref, watch } from 'vue'
import { BaseButton, BaseInput, FilterBar, FormField } from '@/shared/ui'

const props = defineProps<{ modelValue: string }>()

const emit = defineEmits<{
  (event: 'apply', search: string): void
  (event: 'reset'): void
}>()

const search = ref(props.modelValue)

watch(
  () => props.modelValue,
  (value) => {
    search.value = value
  }
)

function onReset(): void {
  search.value = ''
  emit('reset')
}
</script>

<template>
  <FilterBar @submit="emit('apply', search)">
    <FormField label="Поиск по ФИО" label-for="author-search">
      <BaseInput id="author-search" v-model="search" type="search" />
    </FormField>
    <BaseButton type="submit">Найти</BaseButton>
    <BaseButton @click="onReset">Сбросить</BaseButton>
  </FilterBar>
</template>
