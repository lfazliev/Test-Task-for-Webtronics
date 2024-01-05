export const useUserStore = defineStore('user', () => {
  const auth = ref(false)
  return {
    auth
  }
})
