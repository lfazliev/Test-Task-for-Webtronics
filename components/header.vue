<template>
  <header>
    <div v-if="!auth">
      <p>Login</p>
    </div>
  </header>
</template>
<script setup lang="ts">
const userStore = useUserStore()
const { auth } = storeToRefs(userStore)
</script>
<style lang="scss" scoped>
header {
  margin: 10px;
  background: rgba(128, 128, 128, 0.394);
  padding: 20px;
  border-radius: 5px;

  p {
    font-size: 2rem;
  }
}
</style>