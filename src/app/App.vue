<script setup lang="ts">
import { PageContainer } from '@/shared/ui'
import { AppHeader } from '@/widgets/app-header'
</script>

<template>
  <AppHeader />
  <PageContainer tag="main">
    <RouterView />
  </PageContainer>
</template>

<style>
:root {
  --border: darkgray;
  --muted: black;
  --bg: lightgray;
  --danger: red;
  --success: green;
}

* {
  box-sizing: border-box;
}
</style>
