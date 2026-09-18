<script setup lang="ts">
defineProps<{ messages: string[] }>()
</script>

<template>
  <ul v-if="messages.length" class="error-list">
    <li v-for="message in messages" :key="message">{{ message }}</li>
  </ul>
</template>

<style scoped>
.error-list {
  margin: 0;
  padding-left: 18px;
  color: var(--danger);
}
</style>
