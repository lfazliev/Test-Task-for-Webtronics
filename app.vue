<template>
  <Header></Header>
  <NuxtPage />
</template>
<script setup lang="ts">
const userStore = useUserStore()
const { auth } = storeToRefs(userStore)
const fetchUser = async () => {
  let token
  if (process.client) {
    token = localStorage.getItem('token')
  }
  if (!token) { return }
  await $fetch(`/api/auth`, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Authorization": token,
    },
    method: "POST",
    onResponse({ response }) {
      if (response.status == 200) {
        auth.value = true
        userStore.userData = response._data
        console.log(userStore.userData);

      }
      else {
        console.log('ошибка авторизации');    //ВЫВЕСТИ
      }
    }
  });
}
fetchUser()

</script>