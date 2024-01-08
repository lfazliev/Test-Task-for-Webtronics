<template>
  <div v-if="curentTicket" class="ticketContainer">
    <h1>Ticket Details {{ curentTicket.id }}</h1>
    <div>
      <p><strong>Ticket author:</strong> <nuxt-link :to="`/profile&id=${curentTicket.authorId}`"> {{
        curentTicket.authorName }} </nuxt-link></p>
      <p><strong>Title:</strong> {{ curentTicket.title }}</p>
      <p><strong>Message:</strong> {{ curentTicket.message }}</p>
      <p><strong>Status:</strong> {{ curentTicket.status }}</p>
      <p><strong>Details:</strong> {{ curentTicket.details }}</p>
      <p><strong>Date of Creation:</strong> {{ new Date(curentTicket.createdAt).toLocaleString() }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const { auth } = storeToRefs(userStore)
const route = useRoute()
const mainStore = useMainStore()
const { curentTicket } = storeToRefs(mainStore)
const ticketFetch = async () => {
  if (!route.query.id) {
    showError(createError({
      statusCode: 404,
      statusMessage: 'Ticket Not Found',
      data: {
        myCustomField: true
      }
    }))
  }
  else {
    if (curentTicket.value.id == Number(route.query.id)) return
    let token
    if (process.client) {
      token = localStorage.getItem('token')
    }
    if (!token) { auth.value = false; navigateTo('/login'); return }
    curentTicket.value = useNuxtData(`ticket?id=${route.query.id}`).data.value
    clearNuxtData(`ticket?id=${route.query.id}`)
    const { data } = await useFetch(`/api/ticket?id=${route.query.id}`, {
      headers: {
        "Authorization": token,
      }, key: `ticket?id=${route.query.id}`
    })
    if (data.value) {
      curentTicket.value = data.value
    } else {
      showError(createError({
        statusCode: 404,
        statusMessage: 'Ticket Not Found',
        data: {
          myCustomField: true
        }
      }))
    }

  }
}
ticketFetch()
watch(() => route.fullPath, () => {
  ticketFetch()
})
definePageMeta({
  middleware: ["auth"]
})
</script>

<style scoped>
.ticketContainer {
  margin: 10px;

  >div {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
