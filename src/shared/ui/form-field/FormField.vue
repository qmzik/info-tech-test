<script setup lang="ts">
import ErrorList from '../error-list/ErrorList.vue'
import HintText from '../hint-text/HintText.vue'

withDefaults(
  defineProps<{
    label: string
    labelFor: string
    hint?: string
    errors?: string[]
  }>(),
  {
    hint: '',
    errors: () => []
  }
)
</script>

<template>
  <div class="form-field">
    <label :for="labelFor">{{ label }}</label>
    <slot />
    <HintText v-if="hint">{{ hint }}</HintText>
    <ErrorList :messages="errors" />
  </div>
</template>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

label {
  display: block;
}
</style>
