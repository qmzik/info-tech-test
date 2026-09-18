<script setup lang="ts">
const model = defineModel<string>({ required: true })
</script>

<template>
  <textarea v-model="model" class="base-textarea"></textarea>
</template>

<style scoped>
.base-textarea {
  font: inherit;
  width: 100%;
  max-width: 420px;
  min-height: 90px;
  padding: 4px 6px;
  border: 1px solid var(--border);
  background: #fff;
}
</style>
