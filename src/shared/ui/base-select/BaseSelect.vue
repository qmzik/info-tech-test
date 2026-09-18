<script setup lang="ts" generic="T extends string | number | number[]">
const model = defineModel<T>({ required: true })

withDefaults(defineProps<{ multiple?: boolean }>(), { multiple: false })
</script>

<template>
  <select v-model="model" :multiple="multiple" class="base-select">
    <slot />
  </select>
</template>

<style scoped>
.base-select {
  font: inherit;
  width: 100%;
  max-width: 420px;
  padding: 4px 6px;
  border: 1px solid var(--border);
  background: #fff;
}
</style>
