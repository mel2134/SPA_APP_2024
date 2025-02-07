<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">Events</RouterLink>
    <RouterLink to="/create">People</RouterLink>
  </nav>
  <RouterView />  
</template>

<style scoped>
</style>
