<script setup lang="ts">
import type { NuxtError } from 'nuxt/app';

const props = defineProps<{
  error: NuxtError
}>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div>
    <h2>{{ error.statusCode }}</h2>
    <h3>{{ error.message }}</h3>
    <button @click="handleError">Clear errors</button>
  </div>
</template>