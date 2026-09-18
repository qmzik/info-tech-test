<script setup lang="ts" generic="T extends string | number">
const model = defineModel<T>({ required: true })

withDefaults(defineProps<{ type?: string }>(), { type: 'text' })
</script>

<template>
  <input v-model="model" :type="type" class="base-input" />
</template>

<style scoped>
.base-input {
  font: inherit;
  width: 100%;
  max-width: 420px;
  padding: 4px 6px;
  border: 1px solid var(--border);
  background: #fff;
}
</style>
