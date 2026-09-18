<script setup lang="ts">
import type { BookAuthor } from '../model/types'

defineProps<{ authors: BookAuthor[] }>()
</script>

<template>
  <template v-for="(author, index) in authors" :key="author.id">
    <RouterLink :to="{ name: 'author', params: { id: author.id } }">
      {{ author.full_name }}
    </RouterLink>
    <span v-if="index < authors.length - 1">, </span>
  </template>
</template>
