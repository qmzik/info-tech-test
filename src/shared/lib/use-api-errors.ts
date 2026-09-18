import { computed, type ComputedRef, type Ref } from 'vue'
import { ApiError } from '@/shared/api'

export interface ApiErrorsView {
  commonMessages: ComputedRef<string[]>
  fieldMessages: (field: string) => string[]
}

export function useApiErrors(error: Ref<unknown> | (() => unknown)): ApiErrorsView {
  const source = computed(() => (typeof error === 'function' ? error() : error.value))
  const apiError = computed(() => (source.value instanceof ApiError ? source.value : null))

  const commonMessages = computed(() => {
    if (apiError.value) {
      return apiError.value.commonMessages
    }
    return source.value instanceof Error ? [source.value.message] : []
  })

  function fieldMessages(field: string): string[] {
    return apiError.value ? apiError.value.fieldMessages(field) : []
  }

  return { commonMessages, fieldMessages }
}
