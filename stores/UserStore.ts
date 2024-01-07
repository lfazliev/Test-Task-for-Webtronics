export const useUserStore = defineStore('user', () => {
  const auth = ref(false)
  const userData = reactive({} as User)
  return {
    auth, userData
  }
})
