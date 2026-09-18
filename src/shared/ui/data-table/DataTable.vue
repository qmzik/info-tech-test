<template>
  <table class="data-table">
    <slot />
  </table>
</template>

<style scoped>
.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
}

.data-table :slotted(caption) {
  margin-bottom: 4px;
  text-align: left;
  color: var(--muted);
}

.data-table :slotted(th),
.data-table :slotted(td) {
  border: 1px solid var(--border);
  padding: 6px 8px;
  text-align: left;
  vertical-align: top;
}

.data-table :slotted(th) {
  background: var(--bg);
}
</style>
