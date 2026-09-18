<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { HintText } from '@/shared/ui'
import { LoginForm } from '@/features/session-login'

const route = useRoute()
const router = useRouter()

function onSuccess(): void {
  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
  router.push(redirect)
}
</script>

<template>
  <h1>Вход</h1>

  <LoginForm @success="onSuccess">
    <template #actions>
      <RouterLink :to="{ name: 'books' }">Отмена</RouterLink>
    </template>
  </LoginForm>

  <HintText>Логин/Проль: admin / admin.</HintText>
</template>
