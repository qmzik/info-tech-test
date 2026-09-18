<script setup lang="ts">
import { DataTable } from '@/shared/ui'
import type { TopAuthor } from '../model/types'

defineProps<{ items: TopAuthor[]; year: number | null }>()
</script>

<template>
  <DataTable>
    <caption>Отчёт за {{ year }} год</caption>
    <thead>
      <tr>
        <th>Место</th>
        <th>Автор</th>
        <th>Книг за год</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.author_id">
        <td>{{ item.rank }}</td>
        <td>
          <RouterLink :to="{ name: 'author', params: { id: item.author_id } }">
            {{ item.full_name }}
          </RouterLink>
        </td>
        <td>{{ item.books_count }}</td>
      </tr>
    </tbody>
  </DataTable>
</template>
