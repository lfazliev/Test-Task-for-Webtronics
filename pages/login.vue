<template>
  <section>
    <form class="inputContainer" :onsubmit="(e: SubmitEvent) => { e.preventDefault(); login() }">


      <div class="text-field">
        <input class="text-input" type="text" id="name" name="name" placeholder="Ivan" autocomplete="off"
          v-model="username" error=''>
        <label for="name">Username</label>
      </div>


      <div class="text-field">
        <input class="text-input" :type="(!show) ? 'password' : 'text'" id="name" name="name" placeholder="Ivan"
          @input="error = ''" autocomplete="off" v-model="password">
        <label for="name">Password</label>
        <div :class="(!show) ? 'unshow' : ''" v-if="password" @click="show = !show" />
      </div>
      <button type="submit">enter</button>
      <span class="error" v-show="error">{{ error }}</span>
    </form>
  </section>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const { auth } = storeToRefs(userStore)
const { userData } = userStore
const username = ref('')
const password = ref('')
const show = ref(false)
const error = ref('')
const login = async () => {
  const data = { 'username': username.value.toLocaleLowerCase(), "password": password.value }
  await $fetch(`/api/login`, {
    method: "POST",
    body: data,
    onResponse({ response }) {
      if (response.status == 200) {
        if (process.client) {
          localStorage.setItem('token', response.headers.get('Authorization') as string)
        }
        auth.value = true;
        Object.assign(userData, response._data)

      } else {
        error.value = 'Incorrect data'
      }
    },
  })
}



const route = useRoute()
if (auth.value) {
  await navigateTo('/profile')
}
watch(() => auth.value, async () => {
  if (auth.value) {
    if (route.query.to) {
      await navigateTo(route.query.to as string)
      return
    }
    await navigateTo('/')
  }
})

</script>
<style scoped lang="scss">
.inputContainer {
  display: flex;
  flex-direction: column;
  gap: 0px;
  align-items: center;
  width: 40%;
  margin: 5vw auto;

  button {

    margin: 20px;

  }

  .error {
    color: red;
    font-size: 0.7rem;
  }

}

@media screen and (max-width: 736px) {
  .inputContainer {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>