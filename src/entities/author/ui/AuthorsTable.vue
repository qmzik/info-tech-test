<script setup lang="ts">
import { DataTable } from '@/shared/ui'
import type { AuthorShort } from '../model/types'

defineProps<{ authors: AuthorShort[] }>()
</script>

<template>
  <DataTable>
    <thead>
      <tr>
        <th>ФИО</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="author in authors" :key="author.id">
        <td>
          <RouterLink :to="{ name: 'author', params: { id: author.id } }">
            {{ author.full_name }}
          </RouterLink>
        </td>
      </tr>
    </tbody>
  </DataTable>
</template>
