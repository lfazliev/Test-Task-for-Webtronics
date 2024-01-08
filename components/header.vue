<template>
  <header>
    <div v-if="!auth">
      <p>Login</p>
    </div>
    <div v-else>
      <p>{{ namePage }}</p>
      <div>
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/profile">Profile</nuxt-link>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
const userStore = useUserStore()
const { auth } = storeToRefs(userStore)
const route = useRoute()
const namePage = computed(() => {
  switch (route.path) {
    case '/':
      return 'Home';
      break;
    case '/profile':
      return 'Profile';
      break;
    default:
      break;
  }
})
</script>
<style lang="scss" scoped>
header {
  margin: 10px;
  background: rgba(128, 128, 128, 0.394);
  padding: 20px;
  border-radius: 5px;

  >div {
    display: flex;
    justify-content: space-between;

    >div {
      display: flex;
      gap: 2vw;
      text-transform: uppercase;
      align-items: center;
    }
  }

  p {
    font-size: 2rem;
  }
}
</style>