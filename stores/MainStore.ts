export const useMainStore = defineStore('main', () => {
  const clientWidth = ref()
  const drawer = ref(false)
  const popUp = ref(false)
  return {
    drawer, clientWidth, popUp
  }
})
