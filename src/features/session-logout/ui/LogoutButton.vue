<script setup lang="ts">
import { useRouter } from 'vue-router'
import { BaseButton } from '@/shared/ui'
import { useSessionStore } from '@/entities/session'

const session = useSessionStore()
const router = useRouter()

function logout(): void {
  session.logout()
  router.push({ name: 'books' })
}
</script>

<template>
  <BaseButton @click="logout">Выйти</BaseButton>
</template>
