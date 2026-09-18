<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { AUTHORS_SELECT_LIMIT, MIN_CATALOG_YEAR } from '@/shared/config'
import { maxCatalogYear } from '@/shared/lib'
import { BaseButton, BaseInput, BaseSelect, FilterBar, FormField } from '@/shared/ui'
import { getAuthors } from '@/entities/author'
import type { AuthorShort } from '@/entities/author'
import { emptyBookFilters, type BookFilterValues } from '../model/types'

const props = defineProps<{ modelValue: BookFilterValues }>()

const emit = defineEmits<{
  (event: 'apply', filters: BookFilterValues): void
  (event: 'reset'): void
}>()

const authors = ref<AuthorShort[]>([])
const maxYear = maxCatalogYear()
const filters = reactive<BookFilterValues>({ ...props.modelValue })

watch(
  () => props.modelValue,
  (value) => Object.assign(filters, value),
  { deep: true }
)

onMounted(async () => {
  try {
    const result = await getAuthors({ page: 1, perPage: AUTHORS_SELECT_LIMIT })
    authors.value = result.items
  } catch {
    authors.value = []
  }
})

function onReset(): void {
  Object.assign(filters, emptyBookFilters())
  emit('reset')
}
</script>

<template>
  <FilterBar @submit="emit('apply', { ...filters })">
    <FormField label="Поиск" label-for="search">
      <BaseInput
        id="search"
        v-model="filters.search"
        type="search"
        placeholder="Название, описание, ISBN"
      />
    </FormField>

    <FormField label="Автор" label-for="author">
      <BaseSelect id="author" v-model="filters.author_id">
        <option value="">Все авторы</option>
        <option v-for="author in authors" :key="author.id" :value="author.id">
          {{ author.full_name }}
        </option>
      </BaseSelect>
    </FormField>

    <FormField label="Год" label-for="year">
      <BaseInput
        id="year"
        v-model="filters.year"
        type="number"
        :min="MIN_CATALOG_YEAR"
        :max="maxYear"
      />
    </FormField>

    <BaseButton type="submit">Найти</BaseButton>
    <BaseButton @click="onReset">Сбросить</BaseButton>
  </FilterBar>
</template>
