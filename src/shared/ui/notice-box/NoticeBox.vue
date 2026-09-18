<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'info' | 'success' }>(), { variant: 'info' })
</script>

<template>
  <p :class="['notice-box', `notice-box--${variant}`]"><slot /></p>
</template>

<style scoped>
.notice-box {
  margin: 0;
  padding: 8px 10px;
  border: 1px solid var(--border);
  background: var(--bg);
}

.notice-box--success {
  border-color: var(--success);
  color: var(--success);
}
</style>
