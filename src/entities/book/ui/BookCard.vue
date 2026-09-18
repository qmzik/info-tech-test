<script setup lang="ts">
import BookAuthorLinks from './BookAuthorLinks.vue'
import type { Book } from '../model/types'

defineProps<{ book: Book }>()
</script>

<template>
  <div class="book-card">
    <img class="book-card__cover" :src="book.cover_url" :alt="`Обложка книги «${book.title}»`" />
    <dl class="book-card__facts">
      <dt>Год выпуска</dt>
      <dd>{{ book.year }}</dd>
      <dt>ISBN</dt>
      <dd>{{ book.isbn || 'нету' }}</dd>
      <dt>Авторы</dt>
      <dd><BookAuthorLinks :authors="book.authors" /></dd>
      <dt>Описание</dt>
      <dd>{{ book.description || 'нету' }}</dd>
    </dl>
  </div>
</template>

<style scoped>
.book-card {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.book-card__cover {
  width: 200px;
  border: 1px solid var(--border);
}

.book-card__facts {
  margin: 0;
  flex: 1 1 320px;
}

.book-card__facts dt {
  font-weight: 600;
  margin-top: 8px;
}

.book-card__facts dd {
  margin: 0;
}
</style>
