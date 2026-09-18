<script setup lang="ts">
import { DataTable } from '@/shared/ui'
import BookAuthorLinks from './BookAuthorLinks.vue'
import type { Book } from '../model/types'

defineProps<{ books: Book[] }>()
</script>

<template>
  <DataTable>
    <thead>
      <tr>
        <th>Название</th>
        <th>Год</th>
        <th>Авторы</th>
        <th>ISBN</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in books" :key="book.id">
        <td>
          <RouterLink :to="{ name: 'book', params: { id: book.id } }">{{ book.title }}</RouterLink>
        </td>
        <td>{{ book.year }}</td>
        <td><BookAuthorLinks :authors="book.authors" /></td>
        <td>{{ book.isbn || 'нету' }}</td>
      </tr>
    </tbody>
  </DataTable>
</template>
