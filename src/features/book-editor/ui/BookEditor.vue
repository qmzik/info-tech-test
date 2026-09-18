<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { AUTHORS_SELECT_LIMIT, MIN_CATALOG_YEAR } from '@/shared/config'
import { currentYear, maxCatalogYear, useApiErrors } from '@/shared/lib'
import {
  ActionRow,
  BaseButton,
  BaseInput,
  BaseSelect,
  BaseTextarea,
  ErrorList,
  FormField,
  FormLayout
} from '@/shared/ui'
import { getAuthors } from '@/entities/author'
import type { AuthorShort } from '@/entities/author'
import { createBook, updateBook } from '@/entities/book'
import type { Book, BookFormData } from '@/entities/book'

const props = defineProps<{ book: Book | null }>()

const emit = defineEmits<{ (event: 'saved', book: Book): void }>()

const maxYear = maxCatalogYear()

const form = reactive({
  title: props.book?.title ?? '',
  year: (props.book?.year ?? currentYear()) as number | '',
  description: props.book?.description ?? '',
  isbn: props.book?.isbn ?? '',
  author_ids: props.book?.authors.map((author) => author.id) ?? ([] as number[])
})

const authors = ref<AuthorShort[]>([])
const authorsError = ref<string[]>([])
const cover = ref<File | null>(null)
const coverPreview = ref<string>(props.book?.cover_url ?? '')
const createdPreview = ref<string>('')

const submitting = ref(false)
const submitError = ref<unknown>(null)
const { commonMessages, fieldMessages } = useApiErrors(submitError)

const errorMessages = computed(() => [...authorsError.value, ...commonMessages.value])

onMounted(async () => {
  try {
    const result = await getAuthors({ page: 1, perPage: AUTHORS_SELECT_LIMIT })
    authors.value = result.items
  } catch {
    authorsError.value = ['Не удалось загрузить список авторов']
  }
})

function onCoverChange(event: Event): void {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0] ?? null
  cover.value = file

  if (createdPreview.value) {
    URL.revokeObjectURL(createdPreview.value)
    createdPreview.value = ''
  }

  if (file) {
    createdPreview.value = URL.createObjectURL(file)
    coverPreview.value = createdPreview.value
  } else {
    coverPreview.value = props.book?.cover_url ?? ''
  }
}

async function onSubmit(): Promise<void> {
  const payload: BookFormData = {
    title: form.title,
    year: Number(form.year),
    description: form.description,
    isbn: form.isbn,
    author_ids: [...form.author_ids],
    cover: cover.value
  }

  submitting.value = true
  submitError.value = null

  try {
    const saved = props.book ? await updateBook(props.book.id, payload) : await createBook(payload)
    emit('saved', saved)
  } catch (error) {
    submitError.value = error
  } finally {
    submitting.value = false
  }
}

onBeforeUnmount(() => {
  if (createdPreview.value) {
    URL.revokeObjectURL(createdPreview.value)
  }
})
</script>

<template>
  <FormLayout @submit="onSubmit">
    <ErrorList :messages="errorMessages" />

    <FormField label="Название" label-for="title" :errors="fieldMessages('title')">
      <BaseInput id="title" v-model="form.title" required maxlength="255" />
    </FormField>

    <FormField label="Год выпуска" label-for="year" :errors="fieldMessages('year')">
      <BaseInput
        id="year"
        v-model="form.year"
        type="number"
        required
        :min="MIN_CATALOG_YEAR"
        :max="maxYear"
      />
    </FormField>

    <FormField
      label="Авторы"
      label-for="authors"
      hint="Несколько авторов выбираются с зажатой клавишей Ctrl или Shift."
      :errors="fieldMessages('author_ids')"
    >
      <BaseSelect id="authors" v-model="form.author_ids" multiple required size="6">
        <option v-for="author in authors" :key="author.id" :value="author.id">
          {{ author.full_name }}
        </option>
      </BaseSelect>
    </FormField>

    <FormField label="ISBN" label-for="isbn" :errors="fieldMessages('isbn')">
      <BaseInput id="isbn" v-model="form.isbn" maxlength="20" placeholder="978-5-4461-1234-1" />
    </FormField>

    <FormField label="Описание" label-for="description" :errors="fieldMessages('description')">
      <BaseTextarea id="description" v-model="form.description" maxlength="2000" />
    </FormField>

    <FormField
      label="Фото главной страницы"
      label-for="cover"
      :errors="fieldMessages('cover')"
    >
      <input
        id="cover"
        class="book-editor__file"
        type="file"
        accept="image/*"
        :required="!book"
        @change="onCoverChange"
      />
      <img v-if="coverPreview" class="book-editor__preview" :src="coverPreview" alt="Обложка книги" />
    </FormField>

    <ActionRow>
      <BaseButton type="submit" :disabled="submitting">Сохранить</BaseButton>
      <slot name="actions" />
    </ActionRow>
  </FormLayout>
</template>

<style scoped>
.book-editor__preview {
  display: block;
  margin-top: 4px;
  width: 120px;
  border: 1px solid var(--border);
}
</style>
