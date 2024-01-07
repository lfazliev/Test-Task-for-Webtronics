<template>
  <div v-if="ticket" class="ticketContainer">
    <h1>Ticket Details {{ ticket.id }}</h1>
    <div>
      <p><strong>Ticket author:</strong> <nuxt-link :to="`/profile&id=${ticket.authorId}`"> {{
        ticket.authorName }} </nuxt-link></p>
      <p><strong>Title:</strong> {{ ticket.title }}</p>
      <p><strong>Message:</strong> {{ ticket.message }}</p>
      <p><strong>Status:</strong> {{ ticket.status }}</p>
      <p><strong>Details:</strong> {{ ticket.details }}</p>
      <p><strong>Date of Creation:</strong> {{ new Date(ticket.createdAt).toLocaleString() }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const { auth } = storeToRefs(userStore)
const route = useRoute()
const ticket = ref()
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
    let token
    if (process.client) {
      token = localStorage.getItem('token')
    }
    if (!token) { auth.value = false; navigateTo('/login'); return }
    clearNuxtData()
    const { data } = await useFetch(`/api/ticket?id=${route.query.id}`, {
      headers: {
        "Authorization": token,
      }
    })
    if (data.value) {
      ticket.value = data.value
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
