<script setup lang="ts">
import { DataTable, HintText } from '@/shared/ui'
import type { AuthorBook } from '../model/types'

defineProps<{ books: AuthorBook[] }>()
</script>

<template>
  <HintText v-if="!books.length">У автора пока нет книг в каталоге.</HintText>
  <DataTable v-else>
    <thead>
      <tr>
        <th>Название</th>
        <th>Год</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in books" :key="book.id">
        <td>
          <RouterLink :to="{ name: 'book', params: { id: book.id } }">{{ book.title }}</RouterLink>
        </td>
        <td>{{ book.year }}</td>
      </tr>
    </tbody>
  </DataTable>
</template>
