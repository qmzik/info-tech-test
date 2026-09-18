<template>
  <div class="action-row">
    <slot />
  </div>
</template>

<style scoped>
.action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
</style>
