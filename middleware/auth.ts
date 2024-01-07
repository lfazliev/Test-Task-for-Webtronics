export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  const { auth } = storeToRefs(userStore)
  if (!auth.value) {
    return navigateTo({ path: '/login', query: { to: to.fullPath } })
  }
})