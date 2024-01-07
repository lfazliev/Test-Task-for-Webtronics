<template>
  <section>
    <form class="inputContainer" :onsubmit="(e: SubmitEvent) => { e.preventDefault(); login() }">


      <div class="text-field">
        <input class="text-input" type="text" id="name" name="name" placeholder="Ivan" autocomplete="off"
          v-model="username">
        <label for="name">Username</label>
        <!-- <span class="str" v-show="errorsInput.name">{{ errorsInput.name }}</span> -->
      </div>


      <div class="text-field">
        <input class="text-input" :type="(!show) ? 'password' : 'text'" id="name" name="name" placeholder="Ivan"
          autocomplete="off" v-model="password">
        <label for="name">Password</label>
        <!-- <span class="str" v-show="errorsInput.name">{{ errorsInput.name }}</span> -->
        <div :class="(!show) ? 'unshow' : ''" v-if="password" @click="show = !show" />
      </div>
      <button type="submit">enter</button>
    </form>
  </section>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const { auth } = storeToRefs(userStore)
const username = ref('')
const password = ref('')
const show = ref(false)
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
      } else {
        console.log('ошибка');    //ВЫВЕСТИ

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
  transform: translate(0, -50%);
  width: 40%;
  margin: 20% auto;

  button {

    margin: 20px;

  }


}
</style>