<script setup lang="ts">
import { PageContainer } from '@/shared/ui'
import { useSessionStore } from '@/entities/session'
import { LogoutButton } from '@/features/session-logout'

const session = useSessionStore()
</script>

<template>
  <header class="app-header">
    <PageContainer>
      <div class="app-header__inner">
        <nav class="app-header__nav">
          <RouterLink :to="{ name: 'books' }">Книги</RouterLink>
          <RouterLink :to="{ name: 'authors' }">Авторы</RouterLink>
          <RouterLink :to="{ name: 'report' }">Отчёт</RouterLink>
        </nav>
        <div class="app-header__session">
          <template v-if="session.isAuthenticated">
            <span>{{ session.username }}</span>
            <LogoutButton />
          </template>
          <template v-else>
            <span>Гость</span>
            <RouterLink :to="{ name: 'login' }">Войти</RouterLink>
          </template>
        </div>
      </div>
    </PageContainer>
  </header>
</template>

<style scoped>
.app-header {
  border-bottom: 1px solid var(--border);
  background: var(--bg);
}

.app-header__inner {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.app-header__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.app-header__nav a.router-link-active {
  font-weight: 600;
}

.app-header__session {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--muted);
}
</style>
