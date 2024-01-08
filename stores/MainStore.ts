export const useMainStore = defineStore('main', () => {
  const curentTicket = ref({} as Ticket)
  return {
    curentTicket
  }
})
