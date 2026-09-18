<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toErrorMessages } from '@/shared/api'
import { MIN_CATALOG_YEAR } from '@/shared/config'
import { currentYear, maxCatalogYear } from '@/shared/lib'
import { BaseButton, BaseInput, FilterBar, FormField, StatusMessage } from '@/shared/ui'
import { TopAuthorsTable, getTopAuthors } from '@/entities/author'
import type { TopAuthor } from '@/entities/author'

const route = useRoute()
const router = useRouter()

const maxYear = maxCatalogYear()
const year = ref<number | ''>(currentYear())
const items = ref<TopAuthor[]>([])
const loading = ref(false)
const errors = ref<string[]>([])
const reportYear = ref<number | null>(null)

async function load(): Promise<void> {
  loading.value = true
  errors.value = []

  try {
    const result = await getTopAuthors(Number(year.value))
    items.value = result.items
    reportYear.value = result.year
  } catch (error) {
    items.value = []
    reportYear.value = null
    errors.value = toErrorMessages(error)
  } finally {
    loading.value = false
  }
}

function applyYear(): void {
  router.push({ name: 'report', query: { year: year.value } })
}

watch(
  () => route.query.year,
  (value) => {
    const parsed = Number(value)
    year.value = Number.isFinite(parsed) && parsed > 0 ? parsed : currentYear()
    load()
  },
  { immediate: true }
)
</script>

<template>
  <h1>ТОП-10 авторов по количеству книг за год</h1>

  <FilterBar @submit="applyYear">
    <FormField label="Год" label-for="report-year">
      <BaseInput
        id="report-year"
        v-model="year"
        type="number"
        required
        :min="MIN_CATALOG_YEAR"
        :max="maxYear"
      />
    </FormField>
    <BaseButton type="submit">Показать</BaseButton>
  </FilterBar>

  <StatusMessage
    :loading="loading"
    :errors="errors"
    :is-empty="items.length === 0"
    empty-text="За выбранный год книг в каталоге нет"
  />

  <TopAuthorsTable v-if="!loading && items.length" :items="items" :year="reportYear" />
</template>
